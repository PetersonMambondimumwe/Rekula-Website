import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface RekulaCapstoneStageProps {
  onProgressChange?: (progress: number) => void;
  onRequestScrollDown?: () => void;
}

export const RekulaCapstoneStage: React.FC<RekulaCapstoneStageProps> = ({
  onProgressChange,
  onRequestScrollDown,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // ─────────────────────────────────────────────────────────────
    // 1. RENDERER SETUP
    // ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ─────────────────────────────────────────────────────────────
    // 2. SCENE & CAMERA
    // ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);

    // ─────────────────────────────────────────────────────────────
    // 3. STUDIO LIGHTING (Cinematic Darkroom Setup)
    // ─────────────────────────────────────────────────────────────
    // Ambient light with warm undertone
    const ambientLight = new THREE.AmbientLight(0xffdfbe, 0.72);
    scene.add(ambientLight);

    // Key Directional Light (Warm Cream Key)
    const keyLight = new THREE.DirectionalLight(0xffedd7, 2.8);
    keyLight.position.set(4.5, 6.5, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.bias = -0.0006;
    keyLight.shadow.normalBias = 0.02;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 16;
    scene.add(keyLight);

    // Dual-tone Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0xffe2c4, 0x140a04, 0.75);
    scene.add(hemiLight);

    // Razor-Sharp Ember Rim Light (grazes silhouettes)
    const rimLight = new THREE.PointLight(0xdc5000, 36, 16);
    rimLight.position.set(-3.5, 2.2, -3.2);
    scene.add(rimLight);

    // Re:kula Soft Blue Fill Light
    const fillLight = new THREE.PointLight(0x5086a8, 16, 16);
    fillLight.position.set(-2.2, 1.2, 5.0);
    scene.add(fillLight);

    // ─────────────────────────────────────────────────────────────
    // 4. PROCEDURAL HIGH-RESOLUTION WOOL FELT TEXTURE
    // ─────────────────────────────────────────────────────────────
    const createFeltTexture = () => {
      const cv = document.createElement('canvas');
      cv.width = 1024;
      cv.height = 1024;
      const ctx = cv.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Deep obsidian-navy charcoal base
      ctx.fillStyle = '#141822';
      ctx.fillRect(0, 0, 1024, 1024);

      // Micro-wool weave fibers (criss-cross warp and weft)
      ctx.lineWidth = 1;
      for (let i = 0; i < 1024; i += 3) {
        ctx.strokeStyle = `rgba(32, 40, 56, ${0.15 + Math.random() * 0.15})`;
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1024, i);
        ctx.stroke();

        ctx.strokeStyle = `rgba(20, 26, 38, ${0.12 + Math.random() * 0.12})`;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 1024);
        ctx.stroke();
      }

      // Wool napping & grain noise stippling
      const imgData = ctx.getImageData(0, 0, 1024, 1024);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 36;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 1.2));
      }
      ctx.putImageData(imgData, 0, 0);

      const tex = new THREE.CanvasTexture(cv);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const feltTexture = createFeltTexture();

    // ─────────────────────────────────────────────────────────────
    // 5. MASTER MATERIALS FOR CAPSTONE ARTIFACT
    // ─────────────────────────────────────────────────────────────
    const feltMaterial = new THREE.MeshStandardMaterial({
      color: 0x111622,
      map: feltTexture,
      bumpMap: feltTexture,
      bumpScale: 0.95,
      roughness: 0.95,
      metalness: 0.02,
    });

    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf0c464,
      roughness: 0.24,
      metalness: 0.88,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
    });

    const tasselSilkMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8be5c,
      roughness: 0.38,
      metalness: 0.55,
    });

    // ─────────────────────────────────────────────────────────────
    // 6. 3D GRADUATION CAP (MORTARBOARD) ASSEMBLY
    // ─────────────────────────────────────────────────────────────
    const cap = new THREE.Group();

    // 6A. Mortarboard Square Plate (with Beveled Edges & Soft Rounded Corners)
    const roundedSquare = (w: number, r: number) => {
      const s = new THREE.Shape();
      const hw = w / 2;
      s.moveTo(-hw + r, -hw);
      s.lineTo(hw - r, -hw);
      s.quadraticCurveTo(hw, -hw, hw, -hw + r);
      s.lineTo(hw, hw - r);
      s.quadraticCurveTo(hw, hw, hw - r, hw);
      s.lineTo(-hw + r, hw);
      s.quadraticCurveTo(-hw, hw, -hw, hw - r);
      s.lineTo(-hw, -hw + r);
      s.quadraticCurveTo(-hw, -hw, -hw + r, -hw);
      return s;
    };

    const boardShape = roundedSquare(2.1, 0.04);
    const boardGeom = new THREE.ExtrudeGeometry(boardShape, {
      depth: 0.045,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4,
    });
    boardGeom.rotateX(-Math.PI / 2);
    boardGeom.translate(0, -0.02, 0);

    const boardMesh = new THREE.Mesh(boardGeom, feltMaterial);
    boardMesh.castShadow = true;
    boardMesh.receiveShadow = true;
    cap.add(boardMesh);

    // 6B. Anatomical Skull Cap (Crown / Beanie)
    const skullCapProfile = [
      new THREE.Vector2(0.58, -0.56),
      new THREE.Vector2(0.64, -0.50),
      new THREE.Vector2(0.69, -0.32),
      new THREE.Vector2(0.70, -0.12),
      new THREE.Vector2(0.62, 0.00),
    ];
    const skullCapGeom = new THREE.LatheGeometry(skullCapProfile, 56);
    const skullCapMat = feltMaterial.clone();
    skullCapMat.side = THREE.DoubleSide;
    const skullCapMesh = new THREE.Mesh(skullCapGeom, skullCapMat);
    skullCapMesh.castShadow = true;
    cap.add(skullCapMesh);

    // 6C. Fabric-Covered Center Dome Button
    const buttonGeom = new THREE.SphereGeometry(0.09, 24, 16);
    buttonGeom.scale(1, 0.55, 1);
    const buttonMesh = new THREE.Mesh(buttonGeom, feltMaterial);
    buttonMesh.position.set(0, 0.075, 0);
    buttonMesh.castShadow = true;
    cap.add(buttonMesh);

    // 6D. Golden Silk Tassel Cord
    const cordCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.08, 0),
      new THREE.Vector3(0.45, 0.075, 0.45),
      new THREE.Vector3(0.90, 0.07, 0.90),
      new THREE.Vector3(1.02, -0.02, 1.02),
      new THREE.Vector3(1.00, -0.28, 1.00),
    ]);
    const cordGeom = new THREE.TubeGeometry(cordCurve, 40, 0.014, 8);
    const cordMesh = new THREE.Mesh(cordGeom, goldMaterial);
    cordMesh.castShadow = true;
    cap.add(cordMesh);

    // Gold Tassel Ferrule & Knot
    const ferruleSphere = new THREE.Mesh(new THREE.SphereGeometry(0.048, 16, 16), goldMaterial);
    ferruleSphere.position.set(1.0, -0.26, 1.0);
    cap.add(ferruleSphere);

    const ferruleCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.052, 0.13, 20), goldMaterial);
    ferruleCylinder.position.set(1.0, -0.34, 1.0);
    cap.add(ferruleCylinder);

    // Gold Commemorative Re:kula "2026" Charm Medallion
    const charmGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.012, 24);
    charmGeom.rotateX(Math.PI / 2);
    const charmMesh = new THREE.Mesh(charmGeom, goldMaterial);
    charmMesh.position.set(1.06, -0.38, 1.04);
    charmMesh.rotation.y = 0.3;
    cap.add(charmMesh);

    // 6E. Full Silk Tassel Skirt (65 Individual Golden Threads)
    const tasselThreadsGroup = new THREE.Group();
    tasselThreadsGroup.position.set(1.0, -0.40, 1.0);
    cap.add(tasselThreadsGroup);

    const threadCount = 65;
    for (let i = 0; i < threadCount; i++) {
      const angle = (i / threadCount) * Math.PI * 2;
      const radius = 0.028 + Math.random() * 0.024;
      const length = 0.52 + Math.random() * 0.08;
      const threadGeom = new THREE.CylinderGeometry(0.006, 0.006, length, 5);
      threadGeom.translate(0, -length / 2, 0);

      const threadMesh = new THREE.Mesh(threadGeom, tasselSilkMaterial);
      threadMesh.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      threadMesh.rotation.set(
        Math.sin(angle) * 0.08 + (Math.random() - 0.5) * 0.05,
        0,
        -Math.cos(angle) * 0.08 + (Math.random() - 0.5) * 0.05
      );
      tasselThreadsGroup.add(threadMesh);
    }

    cap.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
      }
    });

    scene.add(cap);

    // ─────────────────────────────────────────────────────────────
    // 7. REAL PHOTOGRAPHIC HUMAN HAND & PALM CONTACT SHADOW
    // ─────────────────────────────────────────────────────────────
    const hand = new THREE.Group();

    // 7A. Load Clean High-Res De-fringed Real Hand Texture
    const textureLoader = new THREE.TextureLoader();
    const handTexture = textureLoader.load('/assets/rekula-hand-real.png');
    handTexture.colorSpace = THREE.SRGBColorSpace;
    handTexture.generateMipmaps = true;
    handTexture.minFilter = THREE.LinearMipmapLinearFilter;
    handTexture.magFilter = THREE.LinearFilter;

    // Aspect ratio: 1304 x 1120 = 1.1643
    const handWidth = 5.4;
    const handHeight = handWidth / (1304 / 1120); // 4.638
    const handGeom = new THREE.PlaneGeometry(handWidth, handHeight);

    const handMaterial = new THREE.MeshStandardMaterial({
      map: handTexture,
      transparent: true,
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const handMesh = new THREE.Mesh(handGeom, handMaterial);
    // Position the real hand so the palm hollow is aligned right under the cap landing point
    handMesh.position.set(0.68, -0.42, 0);
    hand.add(handMesh);

    // 7B. Organic Palm Contact Shadow (Darkens realistically as cap lands in the palm)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 128, 12, 128, 128, 120);
      sGrad.addColorStop(0, 'rgba(8, 4, 2, 0.85)');
      sGrad.addColorStop(0.4, 'rgba(12, 6, 3, 0.45)');
      sGrad.addColorStop(1, 'rgba(12, 6, 3, 0.0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const palmShadowTex = new THREE.CanvasTexture(shadowCanvas);
    palmShadowTex.colorSpace = THREE.SRGBColorSpace;

    const palmShadowMaterial = new THREE.MeshBasicMaterial({
      map: palmShadowTex,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const palmShadowGeom = new THREE.PlaneGeometry(1.5, 1.5);
    const palmShadowMesh = new THREE.Mesh(palmShadowGeom, palmShadowMaterial);
    // Located right in the cup of the palm:
    palmShadowMesh.position.set(-0.16, -0.16, 0.04);
    hand.add(palmShadowMesh);

    // Set initial hand position waiting below the frame
    hand.position.set(0, -5.2, 0);
    scene.add(hand);

    // ─────────────────────────────────────────────────────────────
    // 8. CAMERA & RESIZE HANDLING
    // ─────────────────────────────────────────────────────────────
    const fit = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const d = w / h < 0.8 ? 11.5 : 7.2;
      camera.position.set(0, (3.2 * d) / 7.2, (5.6 * d) / 7.2 * 1.1);
      camera.lookAt(0, 0.2, 0);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', fit);
    fit();

    // ─────────────────────────────────────────────────────────────
    // 9. SILKY SCROLL PROGRESSION & 3D INTERACTION
    // ─────────────────────────────────────────────────────────────
    let target = 0;
    let cur = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotY = 0;
    let dragRotX = 0;
    let targetDragRotY = 0;
    let targetDragRotX = 0;

    const smoothstep = (a: number, b: number, x: number) => {
      const v = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return v * v * (3 - 2 * v);
    };

    const handleScroll = () => {
      const trackEl = document.getElementById('rekula-track');
      if (trackEl) {
        const rect = trackEl.getBoundingClientRect();
        const maxScroll = trackEl.offsetHeight - window.innerHeight;
        const currentScroll = -rect.top;
        target = Math.min(1, Math.max(0, currentScroll / maxScroll));
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        target = Math.min(1, Math.max(0, window.scrollY / (maxScroll || 1)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Interactive Drag to Rotate in Final Reveal State
    const onMouseDown = (e: MouseEvent) => {
      if (cur > 0.72) {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        targetDragRotY += deltaX * 0.005;
        targetDragRotX += deltaY * 0.003;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile dragging
    const onTouchStart = (e: TouchEvent) => {
      if (cur > 0.72 && e.touches.length === 1) {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - dragStartX;
        const deltaY = e.touches[0].clientY - dragStartY;
        targetDragRotY += deltaX * 0.005;
        targetDragRotX += deltaY * 0.003;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // ─────────────────────────────────────────────────────────────
    // 10. CHOREOGRAPHED ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Silky inertia smoothing
      cur += (target - cur) * 0.08;
      const t = cur;

      // Update state for DOM overlays
      setScrollProgress(t);
      if (onProgressChange) {
        onProgressChange(t);
      }

      // Smoothstep interpolation intervals
      const s1 = smoothstep(0.05, 0.38, t);
      const s2 = smoothstep(0.38, 0.86, t);
      const sh = smoothstep(0.10, 0.86, t);

      // Drag Inertia Lerp
      dragRotY += (targetDragRotY - dragRotY) * 0.08;
      dragRotX += (targetDragRotX - dragRotX) * 0.08;

      // 10A. Cap Trajectory:
      // Starts floating in top spotlight, arcs across, and lands directly in the cupped palm
      const capX = 1.9 * s1 - 2.05 * s2;
      const capY = 0.2 + 2.6 * s1 - 2.92 * s2 + Math.sin(time * 1.2) * 0.05 * (1 - s1) * (1 - s2);
      const capZ = 0.35 * s2;
      cap.position.set(capX, capY, capZ);

      // Scale from Showcase Proportions (1.5x) to Palm Fit (0.74x)
      const capScale = 1.5 - 0.76 * sh;
      cap.scale.setScalar(capScale);

      // Tumbling Rotation & Presentation Pitch
      cap.rotation.set(
        0.38 * (1 - sh) + 0.06 + dragRotX * 0.4,
        time * 0.35 * (1 - sh) + (s1 + s2) * Math.PI * 3.2 + 0.38 * sh + dragRotY,
        Math.sin(time * 0.8) * 0.05 * (1 - sh)
      );

      // 10B. Real Human Hand Rising to Cradle Cap
      const handRise = smoothstep(0.28, 0.82, t);
      hand.position.y = -5.0 + 4.5 * handRise + Math.sin(time * 1.1) * 0.03 * handRise;
      hand.position.x = 0.12 * handRise;

      // Subtle lifelike 3D parallax tilt on the hand
      hand.rotation.y = Math.sin(time * 0.5) * 0.03 * smoothstep(0.70, 1.0, t) + dragRotY * 0.8;
      hand.rotation.x = -0.04 + dragRotX * 0.6;

      // 10C. Palm Contact Shadow Opacity (Grows as Cap Enters Palm)
      palmShadowMaterial.opacity = smoothstep(0.65, 0.85, t) * 0.78;

      // Silk tassel wind drift
      tasselThreadsGroup.rotation.z = Math.sin(time * 1.8) * 0.05 * (1 - s2);

      renderer.render(scene, camera);
    };

    animate();

    // ─────────────────────────────────────────────────────────────
    // 11. CLEANUP
    // ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', fit);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      feltTexture.dispose();
      handTexture.dispose();
      palmShadowTex.dispose();
      renderer.dispose();
    };
  }, [onProgressChange]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      title={scrollProgress > 0.72 ? 'Drag to rotate the graduation cap & hand' : undefined}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
