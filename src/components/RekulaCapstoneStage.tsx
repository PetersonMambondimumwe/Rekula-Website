import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface RekulaCapstoneStageProps {
  onProgressChange?: (progress: number) => void;
  replaySignal?: number;
}

export const RekulaCapstoneStage: React.FC<RekulaCapstoneStageProps> = ({
  onProgressChange,
  replaySignal = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // References to communicate reset between React renders and Three.js loop
  const animStartTimeRef = useRef<number>(performance.now());
  const resetTriggerRef = useRef<number>(replaySignal);

  useEffect(() => {
    animStartTimeRef.current = performance.now();
    setAnimationCompleted(false);
  }, [replaySignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // ─────────────────────────────────────────────────────────────
    // 1. RENDERER SETUP (TRANSPARENT, ANTI-ALIASED, HIGH PERFORMANCE)
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
    renderer.toneMappingExposure = 1.06;

    // ─────────────────────────────────────────────────────────────
    // 2. SCENE & CAMERA (PRECISE CINEMATIC CALIBRATION)
    // ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);

    // ─────────────────────────────────────────────────────────────
    // 3. STUDIO LIGHTING (WARM, CINEMATIC, GENTLE CONTRAST)
    // ─────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xfff5eb, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd7, 1.8);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x6098bc, 5, 16);
    fillLight.position.set(-3, 1, 4);
    scene.add(fillLight);

    // ─────────────────────────────────────────────────────────────
    // 4. LOAD HIGH-RESOLUTION PURIFIED TEXTURES
    // ─────────────────────────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();

    // 4A. Purified Graduation Cap (Zero stray skin pixels)
    const capTex = textureLoader.load('/assets/rekula-cap-crisp.png');
    capTex.colorSpace = THREE.SRGBColorSpace;
    capTex.generateMipmaps = true;
    capTex.minFilter = THREE.LinearMipmapLinearFilter;
    capTex.magFilter = THREE.LinearFilter;

    // Natural aspect ratio: 598 x 319 = 1.8746
    const capWidth = 2.85;
    const capHeight = capWidth / 1.8746; // 1.52
    const capGeom = new THREE.PlaneGeometry(capWidth, capHeight);
    const capMaterial = new THREE.MeshBasicMaterial({
      map: capTex,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const cap = new THREE.Mesh(capGeom, capMaterial);
    scene.add(cap);

    // 4B. Purified Human Hand (Complete, Natural Warm Skin)
    const handTex = textureLoader.load('/assets/rekula-hand-crisp.png');
    handTex.colorSpace = THREE.SRGBColorSpace;
    handTex.generateMipmaps = true;
    handTex.minFilter = THREE.LinearMipmapLinearFilter;
    handTex.magFilter = THREE.LinearFilter;

    // Natural aspect ratio: 857 x 404 = 2.121
    const handWidth = 4.0;
    const handHeight = handWidth / 2.121; // 1.886
    const handGeom = new THREE.PlaneGeometry(handWidth, handHeight);
    const handMaterial = new THREE.MeshBasicMaterial({
      map: handTex,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const hand = new THREE.Mesh(handGeom, handMaterial);
    // Explicitly hidden at launch so no part of hand is ever visible at start
    hand.visible = false;
    hand.position.set(0.12, -12.0, 0);
    scene.add(hand);

    // 4C. Soft Palm Contact Shadow (Fades in softly as cap hovers over palm)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      sGrad.addColorStop(0, 'rgba(4, 2, 1, 0.75)');
      sGrad.addColorStop(0.5, 'rgba(8, 4, 2, 0.30)');
      sGrad.addColorStop(1, 'rgba(8, 4, 2, 0.0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;

    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 0.65),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
      })
    );
    contactShadow.position.set(-0.25, -0.05, 0.01);
    scene.add(contactShadow);

    // ─────────────────────────────────────────────────────────────
    // 5. RESPONSIVE RESIZE HANDLING
    // ─────────────────────────────────────────────────────────────
    let isMobile = false;

    const fit = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      isMobile = w / h < 0.95;
      const d = isMobile ? 10.2 : 7.2;
      camera.position.set(0, (2.8 * d) / 7.2, (5.6 * d) / 7.2 * 1.05);
      camera.lookAt(0, 0.15, 0);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', fit);
    fit();

    // ─────────────────────────────────────────────────────────────
    // 6. INTERACTIVE 3D PERSPECTIVE DRAG (ACTIVE ONCE SETTLED)
    // ─────────────────────────────────────────────────────────────
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotY = 0;
    let dragRotX = 0;
    let targetDragRotY = 0;
    let targetDragRotX = 0;
    let curProgress = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (curProgress > 0.6) {
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

    const onTouchStart = (e: TouchEvent) => {
      if (curProgress > 0.6 && e.touches.length === 1) {
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
    // 7. AUTOMATIC TIMED ANIMATION LOOP (MOVES ON ITS OWN ON OPEN)
    // ─────────────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();
    const START_DELAY_MS = 650; // Pause at launch to let user see Re:kula cap
    const DURATION_MS = 2200;    // Silky smooth glide duration

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const elapsed = now - animStartTimeRef.current;
      const time = clock.getElapsedTime();

      // Compute raw progress 0 -> 1 based on elapsed time
      let rawT = 0;
      if (elapsed > START_DELAY_MS) {
        rawT = Math.min(1, (elapsed - START_DELAY_MS) / DURATION_MS);
      }

      // Cubic Ease-In-Out for natural, physical momentum
      const ease = rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;
      curProgress = ease;

      if (onProgressChange) {
        onProgressChange(ease);
      }

      if (rawT >= 1 && !animationCompleted) {
        setAnimationCompleted(true);
      }

      // Drag inertia
      dragRotY += (targetDragRotY - dragRotY) * 0.08;
      dragRotX += (targetDragRotX - dragRotX) * 0.08;

      // ─────────────────────────────────────────────────────────
      // 7A. SYNCHRONIZED CAP MOTION
      // Glides smoothly from launch showcase into palm position
      // ─────────────────────────────────────────────────────────
      const capStartX = isMobile ? 0.0 : 0.72;
      const capFinalX = -0.22;
      const capX = capStartX + (capFinalX - capStartX) * ease + dragRotY * 0.35;

      const capStartY = 0.15;
      const capFinalY = 0.42;
      const capY =
        capStartY +
        (capFinalY - capStartY) * ease +
        Math.sin(time * 1.4) * 0.025 * (1 - ease * 0.4);

      cap.position.set(capX, capY, 0.08);

      // Subtle 3D tilt
      cap.rotation.y = dragRotY * 0.45;
      cap.rotation.x = dragRotX * 0.35;
      cap.rotation.z = Math.sin(time * 0.8) * 0.01 * (1 - ease);

      // ─────────────────────────────────────────────────────────
      // 7B. SYNCHRONIZED HAND MOTION
      // - At launch (ease = 0), strictly hidden so no finger is visible
      // - The instant transition begins (ease > 0.01), hand glides
      //   smoothly upward in unison with cap, meeting seamlessly!
      // ─────────────────────────────────────────────────────────
      if (ease < 0.01) {
        hand.visible = false;
        hand.position.set(0.12, -12.0, 0);
        contactShadow.material.opacity = 0;
      } else {
        hand.visible = true;
        const handStartY = -4.8;
        const handFinalY = -0.52;
        const handY =
          handStartY +
          (handFinalY - handStartY) * ease +
          Math.sin(time * 1.1) * 0.015 * ease;

        const handStartX = 0.18;
        const handFinalX = 0.12;
        const handX = handStartX + (handFinalX - handStartX) * ease + dragRotY * 0.25;

        hand.position.set(handX, handY, 0.02);

        hand.rotation.y = dragRotY * 0.35;
        hand.rotation.x = dragRotX * 0.25;

        // Contact shadow darkens concurrently as they meet
        contactShadow.material.opacity = ease * 0.72;
        contactShadow.position.set(capX, handY + 0.52, 0.04);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─────────────────────────────────────────────────────────────
    // 8. CLEANUP
    // ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', fit);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      capTex.dispose();
      handTex.dispose();
      shadowTex.dispose();
      renderer.dispose();
    };
  }, [onProgressChange]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      title={animationCompleted ? 'Drag to rotate perspective' : undefined}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
