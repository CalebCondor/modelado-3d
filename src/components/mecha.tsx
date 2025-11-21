"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GUI } from "lil-gui";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

function CuberMechaModel() {
  // ✅ Inicialización tipada correctamente
  const group = useRef<THREE.Group | null>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const gui = useRef<GUI | null>(null);

  const gltf = useGLTF("/cyber_mecha.glb") as unknown as GLTFResult;
  const { scene, animations } = gltf;

  useEffect(() => {
    // ✅ Animaciones
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }

    // ✅ Morph targets con chequeo de existencia
    scene.traverse((child: THREE.Object3D) => {
      if (
        child instanceof THREE.Mesh &&
        child.morphTargetDictionary &&
        child.morphTargetInfluences
      ) {
        const mesh = child;
        const expressions = Object.keys(mesh.morphTargetDictionary ?? {});
        console.log("🎭 Morph targets encontrados:", expressions);

        // Crear GUI una sola vez
        if (!gui.current) gui.current = new GUI();
        const folder = gui.current.addFolder(mesh.name || "Expresiones");
        expressions.forEach((expr, i) => {
          folder.add(mesh.morphTargetInfluences!, i, 0, 1, 0.01).name(expr);
        });
        folder.open();
      }
    });

    return () => {
      gui.current?.destroy();
    };
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    <primitive ref={group} object={scene} scale={1.5} position={[0, -1, 0]} />
  );
}

export default function CuberMechaScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 50 }}
      className="rounded-xl shadow-2xl bg-gradient-to-b from-[#0f172a] to-[#1e293b]"
    >
      <ambientLight intensity={0.4} color="#00ffff" />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#00ccff" />
      <CuberMechaModel />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
