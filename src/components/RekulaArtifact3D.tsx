import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RekulaArtifact3DProps {
  className?: string;
  interactive?: boolean;
}

export const RekulaArtifact3D: React.FC<RekulaArtifact3DProps> = ({
  className = '',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0a1626, 2.5);
    scene.add(ambientLight);

    // Key Light (Warm Cream / Amber from upper right)
    const keyLight = new THREE.DirectionalLight(0xffedd7, 3.2);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    // Rim Light (Soft Blue from lower left)
    const rimLight = new THREE.DirectionalLight(0x4c86a8, 4.5);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    // Dynamic Cursor Point Light
    const cursorLight = new THREE.PointLight(0x72a3c0, 2.0, 12);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // 5. Artifact Group
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    // --- Part A: Outer Growth Ring (Torus) ---
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.045, 32, 128);
    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x14304a,
      emissive: 0x0a1828,
      metalness: 0.88,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    artifactGroup.add(ringMesh);

    // Secondary subtle nested ring (Hairline inner trajectory)
    const innerRingGeom = new THREE.TorusGeometry(1.85, 0.015, 16, 96);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x4c86a8,
      transparent: true,
      opacity: 0.45,
      wireframe: false,
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeom, innerRingMat);
    innerRingMesh.rotation.x = Math.PI / 6;
    artifactGroup.add(innerRingMesh);

    // --- Part B: Sculpted Sprout Leaf ---
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, -0.6);
    leafShape.bezierCurveTo(0.6, -0.2, 0.7, 0.6, 0, 1.3);
    leafShape.bezierCurveTo(-0.7, 0.6, -0.6, -0.2, 0, -0.6);

    const extrudeSettings = {
      steps: 2,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4,
    };

    const leafGeometry = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
    leafGeometry.center();

    const leafMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4c86a8,
      emissive: 0x183a54,
      emissiveIntensity: 0.4,
      metalness: 0.7,
      roughness: 0.25,
      clearcoat: 0.8,
      transmission: 0.15,
      ior: 1.5,
    });

    const leafMesh = new THREE.Mesh(leafGeometry, leafMaterial);
    leafMesh.scale.set(0.9, 0.9, 0.9);
    leafMesh.position.set(0, 0.25, 0);
    artifactGroup.add(leafMesh);

    // Leaf center stem / spine
    const stemCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -0.55, 0.06),
      new THREE.Vector3(0.04, -0.1, 0.07),
      new THREE.Vector3(-0.02, 0.4, 0.06),
      new THREE.Vector3(0, 1.1, 0.05)
    );
    const stemGeom = new THREE.TubeGeometry(stemCurve, 20, 0.018, 8, false);
    const stemMat = new THREE.MeshBasicMaterial({ color: 0xffedd7 });
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    leafMesh.add(stemMesh);

    // --- Part C: Floating Spore Particles (Knowledge Seeds) ---
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      scales[i / 3] = Math.random() * 0.03 + 0.01;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffedd7,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    artifactGroup.add(particleSystem);

    // 6. Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.2;
    let targetRotationY = 0.3;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();

      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Move point light with mouse
      cursorLight.position.x = mouseX * 3.5;
      cursorLight.position.y = mouseY * 3.5;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousPointerX = clientX;
        previousPointerY = clientY;
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener('mousemove', handlePointerMove);
      container.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mouseup', handlePointerUp);
      container.addEventListener('touchmove', handlePointerMove, { passive: true });
      container.addEventListener('touchstart', handlePointerDown, { passive: true });
      window.addEventListener('touchend', handlePointerUp);
    }

    // 7. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle idle rotation
      if (!isDragging) {
        targetRotationY += 0.0035;
        targetRotationX = 0.15 + Math.sin(elapsedTime * 0.6) * 0.08;
      }

      // Smooth interpolation
      artifactGroup.rotation.y += (targetRotationY - artifactGroup.rotation.y) * 0.06;
      artifactGroup.rotation.x += (targetRotationX - artifactGroup.rotation.x) * 0.06;

      // Gentle floating bob
      artifactGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.12;

      // Counter-rotate inner ring for gyroscopic depth
      innerRingMesh.rotation.y = -elapsedTime * 0.4;
      innerRingMesh.rotation.z = elapsedTime * 0.2;

      // Particle subtle swirl
      particleSystem.rotation.y = elapsedTime * 0.03;

      // Gentle leaf breath
      const breath = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
      leafMesh.scale.set(0.9 * breath, 0.9 * breath, 0.9);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('mousedown', handlePointerDown);
        window.removeEventListener('mouseup', handlePointerUp);
        container.removeEventListener('touchmove', handlePointerMove);
        container.removeEventListener('touchstart', handlePointerDown);
        window.removeEventListener('touchend', handlePointerUp);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      ringGeometry.dispose();
      ringMaterial.dispose();
      innerRingGeom.dispose();
      innerRingMat.dispose();
      leafGeometry.dispose();
      leafMaterial.dispose();
      stemGeom.dispose();
      stemMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Interactive Re:kula 3D Artifact • Drag to rotate"
    />
  );
};
