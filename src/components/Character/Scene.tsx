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

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    const colors = [
      new THREE.Color("#c2a4ff"),
      new THREE.Color("#ff6b9d"),
      new THREE.Color("#6bcbff"),
      new THREE.Color("#a78bfa"),
    ];

    const geometry = new THREE.TorusKnotGeometry(1.4, 0.5, 200, 24);
    const material = new THREE.MeshPhysicalMaterial({
      color: colors[0],
      metalness: 0.2,
      roughness: 0.15,
      emissive: colors[0],
      emissiveIntensity: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.95,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 32, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colors[0],
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.015, 32, 64),
      new THREE.MeshBasicMaterial({
        color: colors[1],
        transparent: true,
        opacity: 0.2,
      })
    );
    ring2.rotation.z = Math.PI / 3;
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);

    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = 0.02 + Math.random() * 0.06;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: "#c2a4ff",
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xc2a4ff, 2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight("#ff6b9d", 1.5, 20);
    pointLight.position.set(-4, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight("#6bcbff", 1.5, 20);
    pointLight2.position.set(4, -2, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight("#c2a4ff", 1, 20);
    pointLight3.position.set(0, 5, -2);
    scene.add(pointLight3);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const colorIdx = Math.floor(elapsed * 0.15) % colors.length;
      const nextIdx = (colorIdx + 1) % colors.length;
      const t = (elapsed * 0.15) % 1;
      const currentColor = colors[colorIdx].clone().lerp(colors[nextIdx], t);

      material.color.copy(currentColor);
      material.emissive.copy(currentColor);

      mesh.rotation.x = elapsed * 0.2;
      mesh.rotation.y = elapsed * 0.4;
      mesh.position.y = Math.sin(elapsed * 0.5) * 0.3;

      ring.rotation.z = elapsed * 0.15;
      ring.material.color.copy(currentColor);
      ring.material.opacity = 0.2 + Math.sin(elapsed * 0.5) * 0.1;

      ring2.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.2) * 0.2;
      ring2.rotation.y = elapsed * 0.1;

      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = Math.sin(elapsed * 0.02) * 0.1;
      particleMat.color.copy(currentColor);

      pointLight.position.x = Math.sin(elapsed * 0.3) * 5;
      pointLight.position.z = Math.cos(elapsed * 0.3) * 5;
      pointLight2.position.x = Math.sin(elapsed * 0.3 + 2) * 5;
      pointLight2.position.z = Math.cos(elapsed * 0.3 + 2) * 5;
      pointLight3.position.y = Math.sin(elapsed * 0.4) * 3 + 2;

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