"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Tipado de estado API
type APIState = {
  state: string;
  [key: string]: string | (() => void) | undefined;
};

export default function ThreeJSCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<Stats | null>(null);
  const guiRef = useRef<GUI | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const faceRef = useRef<THREE.Mesh | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  const previousActionRef = useRef<THREE.AnimationAction | null>(null);
  const api = useRef<APIState>({ state: "Idle" });

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let clock: THREE.Clock;

    const init = () => {
      clock = new THREE.Clock();
      const container = containerRef.current;
      if (!container) return;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xe0e0e0);
      scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.25,
        100
      );
      camera.position.set(-5, 3, 10);
      camera.lookAt(0, 2, 0);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 3);
      dirLight.position.set(0, 20, 10);
      scene.add(dirLight);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
      );
      ground.rotation.x = -Math.PI / 2;
      scene.add(ground);

      const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
      (grid.material as THREE.Material).opacity = 0.2;
      (grid.material as THREE.Material).transparent = true;
      scene.add(grid);

      const loader = new GLTFLoader();
      loader.load(
        "/RobotExpressive.glb",
        (gltf) => {
          const model = gltf.scene;
          modelRef.current = model;
          scene.add(model);
          createGUI(model, gltf.animations);
        },
        undefined,
        (error) => console.error(error)
      );

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setAnimationLoop(animate);
      container.appendChild(renderer.domElement);

      const stats = new Stats();
      statsRef.current = stats;
      container.appendChild(stats.dom);

      window.addEventListener("resize", onWindowResize);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const fadeToAction = (name: string, duration: number) => {
      const actions = actionsRef.current;
      previousActionRef.current = activeActionRef.current;
      activeActionRef.current = actions[name];

      if (
        previousActionRef.current &&
        previousActionRef.current !== activeActionRef.current
      ) {
        previousActionRef.current.fadeOut(duration);
      }

      activeActionRef.current
        ?.reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();
    };

    const createGUI = (
      model: THREE.Group,
      animations: THREE.AnimationClip[]
    ) => {
      const states = [
        "Idle",
        "Walking",
        "Running",
        "Dance",
        "Death",
        "Sitting",
        "Standing",
      ];
      const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];

      const gui = new GUI();
      guiRef.current = gui;
      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;

      const actions = actionsRef.current;

      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        actions[clip.name] = action;

        if (emotes.includes(clip.name) || states.indexOf(clip.name) >= 4) {
          action.clampWhenFinished = true;
          action.loop = THREE.LoopOnce;
        }
      });

      const statesFolder = gui.addFolder("States");
      const clipCtrl = statesFolder.add(api.current, "state", states);
      clipCtrl.onChange(() => fadeToAction(api.current.state, 0.5));
      statesFolder.open();

      const emoteFolder = gui.addFolder("Emotes");
      const restoreState = () => {
        mixer.removeEventListener("finished", restoreState);
        fadeToAction(api.current.state, 0.2);
      };

      emotes.forEach((name) => {
        api.current[name] = () => {
          fadeToAction(name, 0.2);
          mixer.addEventListener("finished", restoreState);
        };
        emoteFolder.add(api.current as Record<string, () => void>, name);
      });
      emoteFolder.open();

      const face = model.getObjectByName("Head_4") as THREE.Mesh;
      faceRef.current = face;
      const expressions = Object.keys(face.morphTargetDictionary!);
      const expressionFolder = gui.addFolder("Expressions");

      expressions.forEach((expr, i) => {
        expressionFolder
          .add(face.morphTargetInfluences!, i, 0, 1, 0.01)
          .name(expr);
        console.log(Object.keys(face.morphTargetDictionary!));
      });

      activeActionRef.current = actions["Walking"];
      activeActionRef.current.play();
      expressionFolder.open();
    };

    const animate = () => {
      const dt = clock.getDelta();
      mixerRef.current?.update(dt);
      renderer.render(scene, camera);
      statsRef.current?.update();
    };

    init();

    return () => {
      guiRef.current?.destroy();
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-screen" />;
}
