import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { assetPath } from "../../utils";

function Character() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(assetPath("/models/character.glb"), assetPath("/draco/"));

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    ref.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={ref}>
      <primitive object={scene} scale={2.5} position={[0, -3, 0]} />
    </group>
  );
}

function BackgroundScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ alpha: false, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }}
    >
      <color attach="background" args={["#0a080c"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={2} color="#c2a4ff" />
      <pointLight position={[-4, 2, 3]} intensity={1.5} color="#ff6b9d" />
      <pointLight position={[4, -2, 3]} intensity={1.5} color="#6bcbff" />
      <Suspense fallback={null}>
        <Character />
        <Environment files={assetPath("/models/char_enviorment.hdr")} environmentIntensity={0.3} />
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} />
      </Suspense>
    </Canvas>
  );
}

const Scene = () => {
  return <BackgroundScene />;
};

export default Scene;