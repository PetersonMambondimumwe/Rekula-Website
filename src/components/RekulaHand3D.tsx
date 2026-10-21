import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RekulaHand3DProps {
  className?: string;
  interactive?: boolean;
}

export const RekulaHand3D: React.FC<RekulaHand3DProps> = ({
  className = '',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting (Oryzo Warm Darkroom Setup)
    const ambientLight = new THREE.AmbientLight(0x0a1420, 2.2);
    scene.add(ambientLight);

    // Warm Key Light (top-right, warm cream/amber #ffedd7)
    const keyLight = new THREE.DirectionalLight(0xffedd7, 3.8);
    keyLight.position.set(6, 7, 5);
    scene.add(keyLight);

    // Cool Rim Light (bottom-left, soft blue #4C86A8)
    const rimLight = new THREE.DirectionalLight(0x4c86a8, 4.2);
    rimLight.position.set(-6, -5, -3);
    scene.add(rimLight);

    // Top Overhead Focus Light
    const topLight = new THREE.SpotLight(0xfff5eb, 3.0, 15, Math.PI / 4, 0.5);
    topLight.position.set(0, 8, 3);
    scene.add(topLight);

    // Interactive Cursor Follow Light
    const cursorLight = new THREE.PointLight(0x72a3c0, 2.5, 10);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // 5. Materials
    // Hand Material: Matte dark ceramic / satin composite with subtle subsurface warm sheen
    const handMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x182635,
      emissive: 0x09121a,
      roughness: 0.32,
      metalness: 0.45,
      clearcoat: 0.65,
      clearcoatRoughness: 0.25,
      reflectivity: 0.7,
    });

    const jointMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22384c,
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 0.9,
    });

    // Re:kula Sprout Material
    const sproutMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4c86a8,
      emissive: 0x1f4e6d,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.6,
      clearcoat: 1.0,
      transmission: 0.2,
      ior: 1.52,
    });

    // 6. Master Hand Assembly
    const masterGroup = new THREE.Group();
    // Start position slightly below for the intro animation
    masterGroup.position.set(0, -3.2, 0);
    masterGroup.rotation.set(0.3, -0.2, -0.05);
    scene.add(masterGroup);

    const handGroup = new THREE.Group();
    masterGroup.add(handGroup);

    // --- Wrist & Forearm ---
    const forearmCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -3.2, -0.2),
      new THREE.Vector3(0, -2.2, -0.1),
      new THREE.Vector3(0, -1.2, 0),
      new THREE.Vector3(0, -0.5, 0.05)
    );
    const forearmGeom = new THREE.TubeGeometry(forearmCurve, 20, 0.48, 16, false);
    const forearmMesh = new THREE.Mesh(forearmGeom, handMaterial);
    handGroup.add(forearmMesh);

    // Wrist band / cuff ring
    const wristCuffGeom = new THREE.TorusGeometry(0.5, 0.04, 16, 64);
    const wristCuffMesh = new THREE.Mesh(wristCuffGeom, jointMaterial);
    wristCuffMesh.position.set(0, -0.65, 0.05);
    wristCuffMesh.rotation.x = Math.PI / 2;
    handGroup.add(wristCuffMesh);

    // --- Palm ---
    // Smooth trapezoidal palm box
    const palmGeom = new THREE.BoxGeometry(1.35, 1.3, 0.38, 4, 4, 4);
    // Smooth the vertices slightly
    const pos = palmGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const z = pos.getZ(i);
      if (y < 0) {
        pos.setX(i, pos.getX(i) * 0.88); // taper toward wrist
      }
      if (z > 0) {
        pos.setZ(i, z * 0.9 + 0.03); // slight natural cup
      }
    }
    palmGeom.computeVertexNormals();
    const palmMesh = new THREE.Mesh(palmGeom, handMaterial);
    palmMesh.position.set(0, 0.15, 0);
    handGroup.add(palmMesh);

    // --- Fingers Builder ---
    interface FingerJoints {
      base: THREE.Group;
      mid: THREE.Group;
      tip: THREE.Group;
    }

    const createFinger = (
      xOffset: number,
      yOffset: number,
      zOffset: number,
      lengthScale: number,
      rotZ: number
    ): FingerJoints => {
      const baseGroup = new THREE.Group();
      baseGroup.position.set(xOffset, yOffset, zOffset);
      baseGroup.rotation.z = rotZ;
      handGroup.add(baseGroup);

      // Knuckle sphere
      const knuckleGeom = new THREE.SphereGeometry(0.14, 16, 16);
      const knuckle = new THREE.Mesh(knuckleGeom, jointMaterial);
      baseGroup.add(knuckle);

      // Phalanx 1 (Base segment)
      const p1Len = 0.52 * lengthScale;
      const p1Geom = new THREE.CylinderGeometry(0.12, 0.13, p1Len, 16);
      p1Geom.translate(0, p1Len / 2, 0);
      const p1Mesh = new THREE.Mesh(p1Geom, handMaterial);
      baseGroup.add(p1Mesh);

      // Mid joint
      const midGroup = new THREE.Group();
      midGroup.position.set(0, p1Len, 0);
      baseGroup.add(midGroup);

      const midJoint = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), jointMaterial);
      midGroup.add(midJoint);

      // Phalanx 2 (Mid segment)
      const p2Len = 0.42 * lengthScale;
      const p2Geom = new THREE.CylinderGeometry(0.105, 0.115, p2Len, 16);
      p2Geom.translate(0, p2Len / 2, 0);
      const p2Mesh = new THREE.Mesh(p2Geom, handMaterial);
      midGroup.add(p2Mesh);

      // Tip joint
      const tipGroup = new THREE.Group();
      tipGroup.position.set(0, p2Len, 0);
      midGroup.add(tipGroup);

      const tipJoint = new THREE.Mesh(new THREE.SphereGeometry(0.10, 16, 16), jointMaterial);
      tipGroup.add(tipJoint);

      // Phalanx 3 (Fingertip)
      const p3Len = 0.32 * lengthScale;
      const p3Geom = new THREE.ConeGeometry(0.095, p3Len, 16);
      p3Geom.translate(0, p3Len / 2, 0);
      const p3Mesh = new THREE.Mesh(p3Geom, handMaterial);
      tipGroup.add(p3Mesh);

      return { base: baseGroup, mid: midGroup, tip: tipGroup };
    };

    // Index, Middle, Ring, Pinky
    const indexFinger = createFinger(-0.46, 0.8, 0.05, 0.95, 0.08);
    const middleFinger = createFinger(-0.15, 0.84, 0.06, 1.05, 0.02);
    const ringFinger = createFinger(0.18, 0.82, 0.05, 0.96, -0.05);
    const pinkyFinger = createFinger(0.48, 0.74, 0.03, 0.8, -0.14);

    // Thumb (Angled out laterally)
    const thumbBase = new THREE.Group();
    thumbBase.position.set(-0.65, -0.05, 0.12);
    thumbBase.rotation.set(0.3, 0.4, 0.75);
    handGroup.add(thumbBase);

    const thumbKnuckle = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), jointMaterial);
    thumbBase.add(thumbKnuckle);

    const t1Len = 0.48;
    const t1Geom = new THREE.CylinderGeometry(0.13, 0.14, t1Len, 16);
    t1Geom.translate(0, t1Len / 2, 0);
    const t1Mesh = new THREE.Mesh(t1Geom, handMaterial);
    thumbBase.add(t1Mesh);

    const thumbMid = new THREE.Group();
    thumbMid.position.set(0, t1Len, 0);
    thumbBase.add(thumbMid);

    const thumbMidJoint = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), jointMaterial);
    thumbMid.add(thumbMidJoint);

    const t2Len = 0.38;
    const t2Geom = new THREE.ConeGeometry(0.11, t2Len, 16);
    t2Geom.translate(0, t2Len / 2, 0);
    const t2Mesh = new THREE.Mesh(t2Geom, handMaterial);
    thumbMid.add(t2Mesh);

    // --- The Cradled Re:kula Sprout & Orb ---
    const relicGroup = new THREE.Group();
    relicGroup.position.set(0, 0.8, 0.4);
    handGroup.add(relicGroup);

    // Glowing orbital ring cradled in palm
    const ringGeom = new THREE.TorusGeometry(0.9, 0.025, 16, 64);
    const ringMesh = new THREE.Mesh(ringGeom, sproutMaterial);
    relicGroup.add(ringMesh);

    // Sculpted Sprout Leaf floating above the hand
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, -0.4);
    leafShape.bezierCurveTo(0.45, -0.1, 0.5, 0.5, 0, 1.0);
    leafShape.bezierCurveTo(-0.5, 0.5, -0.45, -0.1, 0, -0.4);

    const leafExtrude = new THREE.ExtrudeGeometry(leafShape, {
      steps: 1,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
    });
    leafExtrude.center();
    const leafMesh = new THREE.Mesh(leafExtrude, sproutMaterial);
    leafMesh.scale.set(0.65, 0.65, 0.65);
    relicGroup.add(leafMesh);

    // Golden Stem Accent
    const stemGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.9, 8);
    const stemMat = new THREE.MeshBasicMaterial({ color: 0xffedd7 });
    const stemMesh = new THREE.Mesh(stemGeom, stemMat);
    stemMesh.position.set(0, -0.05, 0.02);
    relicGroup.add(stemMesh);

    // Glowing Core Point Light inside the leaf
    const coreLight = new THREE.PointLight(0x72a3c0, 2.0, 4);
    coreLight.position.set(0, 0.2, 0);
    relicGroup.add(coreLight);

    // Floating Spores (Knowledge Seeds)
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 0.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = 0.6 + radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffedd7,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMat);
    handGroup.add(particleSystem);

    // 7. Interaction and Animation Parameters
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = -0.15;
    let targetRotX = 0.22;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let introProgress = 0; // 0 to 1 smooth arrival

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();

      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      cursorLight.position.x = mouseX * 4;
      cursorLight.position.y = mouseY * 4;

      if (isDragging) {
        const deltaX = clientX - prevX;
        const deltaY = clientY - prevY;
        targetRotY += deltaX * 0.007;
        targetRotX += deltaY * 0.007;
        prevX = clientX;
        prevY = clientY;
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = clientX;
      prevY = clientY;
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
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Intro Arrival on launch ("from start to finish")
      if (introProgress < 1.0) {
        introProgress += 0.015;
        const t = Math.min(introProgress, 1.0);
        // Smooth cubic ease out
        const ease = 1 - Math.pow(1 - t, 3);
        masterGroup.position.y = -3.2 + ease * 3.0; // rises from -3.2 to -0.2
      } else {
        // Idle floating bob
        masterGroup.position.y = -0.2 + Math.sin(elapsed * 0.9) * 0.08;
      }

      // Smooth rotation towards cursor / drag
      if (!isDragging) {
        targetRotY = -0.15 + mouseX * 0.35 + Math.sin(elapsed * 0.4) * 0.08;
        targetRotX = 0.22 - mouseY * 0.25 + Math.cos(elapsed * 0.5) * 0.05;
      }

      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05;

      // Finger articulation (gentle natural flexing / uncurling)
      const flex = Math.sin(elapsed * 1.2) * 0.06;
      const curlIntro = Math.max(0, 1 - introProgress); // uncurls on launch

      indexFinger.base.rotation.x = -0.25 - flex - curlIntro * 0.6;
      indexFinger.mid.rotation.x = -0.35 - flex * 1.2 - curlIntro * 0.7;
      indexFinger.tip.rotation.x = -0.25 - flex * 0.8;

      middleFinger.base.rotation.x = -0.22 - flex * 0.9 - curlIntro * 0.6;
      middleFinger.mid.rotation.x = -0.38 - flex * 1.1 - curlIntro * 0.7;
      middleFinger.tip.rotation.x = -0.28 - flex * 0.9;

      ringFinger.base.rotation.x = -0.28 - flex * 1.1 - curlIntro * 0.6;
      ringFinger.mid.rotation.x = -0.42 - flex * 1.3 - curlIntro * 0.7;
      ringFinger.tip.rotation.x = -0.32 - flex;

      pinkyFinger.base.rotation.x = -0.32 - flex * 1.2 - curlIntro * 0.7;
      pinkyFinger.mid.rotation.x = -0.45 - flex * 1.4 - curlIntro * 0.8;
      pinkyFinger.tip.rotation.x = -0.35 - flex * 1.1;

      thumbBase.rotation.x = 0.35 + flex * 0.5;
      thumbMid.rotation.x = -0.25 - flex * 0.7;

      // Cradled Leaf & Ring Motion
      ringMesh.rotation.y = elapsed * 0.4;
      ringMesh.rotation.x = Math.PI / 4 + Math.sin(elapsed * 0.6) * 0.15;
      leafMesh.rotation.y = -elapsed * 0.25;
      leafMesh.position.y = 0.05 + Math.sin(elapsed * 1.5) * 0.04;

      // Spores rotation
      particleSystem.rotation.y = elapsed * 0.04;

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
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Re:kula 3D Hand Experience · Drag to interact"
    />
  );
};
