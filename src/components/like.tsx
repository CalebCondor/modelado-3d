"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

// 🔹 Tipo GLTF tipado
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

function LikeModel() {
  const group = useRef<THREE.Group | null>(null);
  const gltf = useGLTF("/like.glb") as unknown as GLTFResult;

  return <primitive ref={group} object={gltf.scene} scale={1.8} />;
}

export default function LikeViewer() {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 50 }}
      className="rounded-xl shadow-2xl bg-gradient-to-b from-[#0f172a] to-[#1e293b]"
    >
      {/* 💡 Luces */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ff80bf" />
      <directionalLight
        position={[-5, -3, -2]}
        intensity={0.6}
        color="#00ffff"
      />

      {/* 🧱 Modelo */}
      <LikeModel />

      {/* 🎮 Controles de cámara */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
