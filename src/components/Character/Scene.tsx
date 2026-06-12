import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { assetPath } from "../../utils";

const SKIN = "#d4a574";
const BLUE_OUTFIT = "#2563eb";
const BLUE_PANTS = "#1d4ed8";
const HAIR = "#1a1a2e";
const SHOES = "#1e1e2e";

function Character() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(assetPath("/models/character.glb"), assetPath("/draco/"));

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      const name = child.name.toLowerCase();
      const mat = child.material as THREE.MeshStandardMaterial;
      if (mat.color) {
        if (name.includes("head") || name.includes("face") || name.includes("skin") || name.includes("hand") || name.includes("neck") || name.includes("arm") || name.includes("ear")) {
          mat.color.set(SKIN);
          mat.emissive = new THREE.Color(SKIN);
          mat.emissiveIntensity = 0.05;
          mat.roughness = 0.6;
          mat.metalness = 0;
        } else if (name.includes("shirt") || name.includes("top") || name.includes("jacket") || name.includes("coat") || name.includes("body") || name.includes("torso") || name.includes("sweater") || name.includes("chest")) {
          mat.color.set(BLUE_OUTFIT);
          mat.emissive = new THREE.Color(BLUE_OUTFIT);
          mat.emissiveIntensity = 0.08;
          mat.roughness = 0.4;
          mat.metalness = 0.1;
        } else if (name.includes("pant") || name.includes("leg") || name.includes("trouser") || name.includes("jean") || name.includes("hip") || name.includes("belt")) {
          mat.color.set(BLUE_PANTS);
          mat.roughness = 0.5;
          mat.metalness = 0.05;
        } else if (name.includes("hair") || name.includes("brow") || name.includes("lash")) {
          mat.color.set(HAIR);
          mat.roughness = 0.8;
          mat.metalness = 0;
        } else if (name.includes("shoe") || name.includes("foot") || name.includes("boot") || name.includes("sock")) {
          mat.color.set(SHOES);
          mat.roughness = 0.7;
          mat.metalness = 0.2;
        } else if (name.includes("eye") || name.includes("glass")) {
          mat.roughness = 0.1;
          mat.metalness = 0.5;
        }
      }
    }
  });

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(Date.now() * 0.0008) * 0.08;
    ref.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={ref}>
      <primitive object={scene} scale={0.9} position={[0, -3.5, 0]} />
    </group>
  );
}

function BackgroundScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 12], fov: 40 }}
      gl={{ alpha: false, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }}
    >
      <color attach="background" args={["#0a080c"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 7]} intensity={2} color="#c2a4ff" />
      <pointLight position={[-4, 2, 3]} intensity={1.5} color="#ff6b9d" />
      <pointLight position={[4, -2, 3]} intensity={1.5} color="#6bcbff" />
      <Suspense fallback={null}>
        <Character />
        <Environment files={assetPath("/models/char_enviorment.hdr")} environmentIntensity={0.3} />
        <ContactShadows position={[0, -3.8, 0]} opacity={0.3} scale={8} blur={2.5} />
      </Suspense>
    </Canvas>
  );
}

const Scene = () => {
  return <BackgroundScene />;
};

export default Scene;