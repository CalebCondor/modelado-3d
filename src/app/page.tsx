import Image from "next/image";
import ThreeJSCharacter from "@/components/robot";
import CuberMechaScene from "@/components/mecha";
import LikeViewer from "@/components/like";

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', background: '#cfe8fa' }}>
      <LikeViewer />
    </main>
  );
}
