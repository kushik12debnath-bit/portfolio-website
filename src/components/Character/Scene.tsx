import { useRef, useEffect } from "react";
import * as THREE from "three";

const Scene = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1.4, 0.5, 180, 24);
    const material = new THREE.MeshPhysicalMaterial({
      color: "#c2a4ff",
      metalness: 0.3,
      roughness: 0.2,
      emissive: "#6b4fa0",
      emissiveIntensity: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
      transparent: true,
      opacity: 0.95,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xc2a4ff, 2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff88aa, 1, 20);
    pointLight.position.set(-4, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x88aaff, 1, 20);
    pointLight2.position.set(4, -2, 3);
    scene.add(pointLight2);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      mesh.rotation.x = elapsed * 0.2;
      mesh.rotation.y = elapsed * 0.4;
      mesh.position.y = Math.sin(elapsed * 0.5) * 0.3;
      pointLight.position.x = Math.sin(elapsed * 0.3) * 5;
      pointLight.position.z = Math.cos(elapsed * 0.3) * 5;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const r = container.getBoundingClientRect();
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasRef}>
        <div className="character-rim" />
      </div>
    </div>
  );
};

export default Scene;
