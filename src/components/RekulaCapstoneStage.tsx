import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RekulaCapstoneStageProps {
  onProgressChange?: (progress: number) => void;
}

export const RekulaCapstoneStage: React.FC<RekulaCapstoneStageProps> = ({
  onProgressChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animStartTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    animStartTimeRef.current = performance.now();
  }, []);

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
    // 6. AUTOMATIC TIMED ANIMATION LOOP (MOVES ON ITS OWN ON OPEN)
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

      if (onProgressChange) {
        onProgressChange(ease);
      }

      // ─────────────────────────────────────────────────────────
      // 6A. SYNCHRONIZED CAP MOTION
      // Glides smoothly from launch showcase into palm position
      // ─────────────────────────────────────────────────────────
      const capStartX = isMobile ? 0.0 : 0.72;
      const capFinalX = -0.22;
      const capX = capStartX + (capFinalX - capStartX) * ease;

      const capStartY = 0.15;
      const capFinalY = 0.42;
      const capY =
        capStartY +
        (capFinalY - capStartY) * ease +
        Math.sin(time * 1.4) * 0.02 * (1 - ease * 0.4);

      cap.position.set(capX, capY, 0.08);

      // Subtle resting float (no mouse rotation)
      cap.rotation.z = Math.sin(time * 0.8) * 0.01 * (1 - ease);

      // ─────────────────────────────────────────────────────────
      // 6B. SYNCHRONIZED HAND MOTION
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
          Math.sin(time * 1.1) * 0.01 * ease;

        const handStartX = 0.18;
        const handFinalX = 0.12;
        const handX = handStartX + (handFinalX - handStartX) * ease;

        hand.position.set(handX, handY, 0.02);

        // Contact shadow darkens concurrently as they meet
        contactShadow.material.opacity = ease * 0.72;
        contactShadow.position.set(capX, handY + 0.52, 0.04);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─────────────────────────────────────────────────────────────
    // 7. CLEANUP
    // ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', fit);
      capTex.dispose();
      handTex.dispose();
      shadowTex.dispose();
      renderer.dispose();
    };
  }, [onProgressChange]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
