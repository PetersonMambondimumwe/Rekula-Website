import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RekulaCapstoneStageProps {
  onProgressChange?: (progress: number) => void;
  onRequestScrollDown?: () => void;
}

export const RekulaCapstoneStage: React.FC<RekulaCapstoneStageProps> = ({
  onProgressChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // ─────────────────────────────────────────────────────────────
    // 1. RENDERER SETUP (HIGH PERFORMANCE, ANTI-ALIASED, ALPHA)
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
    renderer.toneMappingExposure = 1.12;

    // ─────────────────────────────────────────────────────────────
    // 2. SCENE & PERSPECTIVE CAMERA
    // ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);

    // ─────────────────────────────────────────────────────────────
    // 3. STUDIO BACKLIGHT & LIGHTING FOR MAXIMUM CLARITY & VISIBILITY
    // ─────────────────────────────────────────────────────────────
    // Warm ambient light so colors pop vibrantly
    const ambientLight = new THREE.AmbientLight(0xfff2e3, 1.3);
    scene.add(ambientLight);

    // Warm Key Light (top right)
    const keyLight = new THREE.DirectionalLight(0xffedd7, 1.8);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    // Soft Blue Fill Light (brand accent)
    const fillLight = new THREE.PointLight(0x6098bc, 8, 15);
    fillLight.position.set(-3, 1, 4);
    scene.add(fillLight);

    // Soft Studio Glow Halo Disc behind the Cap and Hand
    // Guarantees crystal-clear silhouette separation and high visibility
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 512;
    haloCanvas.height = 512;
    const hCtx = haloCanvas.getContext('2d');
    if (hCtx) {
      const grad = hCtx.createRadialGradient(256, 256, 20, 256, 256, 250);
      grad.addColorStop(0, 'rgba(255, 237, 215, 0.22)');
      grad.addColorStop(0.35, 'rgba(76, 134, 168, 0.16)');
      grad.addColorStop(0.7, 'rgba(17, 29, 42, 0.08)');
      grad.addColorStop(1, 'rgba(7, 13, 20, 0)');
      hCtx.fillStyle = grad;
      hCtx.fillRect(0, 0, 512, 512);
    }
    const haloTex = new THREE.CanvasTexture(haloCanvas);
    haloTex.colorSpace = THREE.SRGBColorSpace;

    const haloMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8.5, 8.5),
      new THREE.MeshBasicMaterial({
        map: haloTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
    haloMesh.position.set(0, 0, -0.6);
    scene.add(haloMesh);

    // ─────────────────────────────────────────────────────────────
    // 4. LOAD HIGH-RESOLUTION CLEAN TEXTURES
    // ─────────────────────────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();

    // 4A. Crisp Graduation Cap (with Gold Silk Tassel)
    const capTex = textureLoader.load('/assets/rekula-cap-crisp.png');
    capTex.colorSpace = THREE.SRGBColorSpace;
    capTex.generateMipmaps = true;
    capTex.minFilter = THREE.LinearMipmapLinearFilter;
    capTex.magFilter = THREE.LinearFilter;

    // Cap geometry aspect ratio: 604 x 319 = 1.893
    const capWidth = 4.2;
    const capHeight = capWidth / (604 / 319); // 2.218
    const capGeom = new THREE.PlaneGeometry(capWidth, capHeight);
    const capMaterial = new THREE.MeshBasicMaterial({
      map: capTex,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const cap = new THREE.Mesh(capGeom, capMaterial);
    scene.add(cap);

    // 4B. Crisp Human Hand (Warm Skin, Open Palm, Cupped Fingers)
    const handTex = textureLoader.load('/assets/rekula-hand-crisp.png');
    handTex.colorSpace = THREE.SRGBColorSpace;
    handTex.generateMipmaps = true;
    handTex.minFilter = THREE.LinearMipmapLinearFilter;
    handTex.magFilter = THREE.LinearFilter;

    // Hand geometry aspect ratio: 857 x 340 = 2.520
    const handWidth = 5.6;
    const handHeight = handWidth / (857 / 340); // 2.222
    const handGeom = new THREE.PlaneGeometry(handWidth, handHeight);
    const handMaterial = new THREE.MeshBasicMaterial({
      map: handTex,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const hand = new THREE.Mesh(handGeom, handMaterial);
    scene.add(hand);

    // 4C. Organic Palm Contact Shadow (Breathes under the Cap)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      sGrad.addColorStop(0, 'rgba(6, 3, 2, 0.82)');
      sGrad.addColorStop(0.45, 'rgba(10, 5, 2, 0.38)');
      sGrad.addColorStop(1, 'rgba(10, 5, 2, 0.0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;

    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 0.8),
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
    const fit = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const d = w / h < 0.8 ? 11.0 : 7.0;
      camera.position.set(0, (2.8 * d) / 7.0, (5.4 * d) / 7.0 * 1.05);
      camera.lookAt(0, 0.15, 0);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', fit);
    fit();

    // ─────────────────────────────────────────────────────────────
    // 6. SCROLL PROGRESSION & SMOOTH INERTIA
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
    // 7. ANIMATION LOOP (CHOREOGRAPHED SCROLL PRESENTATION)
    // ─────────────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Silky inertia smoothing
      cur += (target - cur) * 0.08;
      const t = cur;

      setScrollProgress(t);
      if (onProgressChange) {
        onProgressChange(t);
      }

      // Smoothstep interpolation intervals
      const s1 = smoothstep(0.04, 0.35, t);
      const s2 = smoothstep(0.35, 0.85, t);
      const sh = smoothstep(0.10, 0.85, t);

      // Drag inertia interpolation
      dragRotY += (targetDragRotY - dragRotY) * 0.08;
      dragRotX += (targetDragRotX - dragRotX) * 0.08;

      // 7A. Capstone Motion:
      // Starts elevated and centered in the top spotlight (y = 1.3),
      // moves smoothly down to hover gracefully above the palm at y = 0.55
      const capStartX = 0.0;
      const capFinalX = -0.32;
      const capX = capStartX + (capFinalX - capStartX) * s2 + dragRotY * 0.4;

      const capStartY = 1.25;
      const capMidY = 1.85;
      const capFinalY = 0.58;
      const capY =
        capStartY +
        (capMidY - capStartY) * s1 -
        (capMidY - capFinalY) * s2 +
        Math.sin(time * 1.5) * 0.04 * (1 - s1 * 0.5);

      const capScale = 1.25 - 0.25 * sh;
      cap.scale.setScalar(capScale);
      cap.position.set(capX, capY, 0.08);

      // Subtle 3D perspective tilt
      cap.rotation.y = dragRotY * 0.5;
      cap.rotation.x = dragRotX * 0.4;
      cap.rotation.z = Math.sin(time * 0.8) * 0.015 * (1 - s2);

      // 7B. Hand Motion:
      // Rises up smoothly from below (y = -4.8 -> -0.58)
      const handRise = smoothstep(0.25, 0.82, t);
      const handStartX = 0.28;
      const handFinalX = 0.25;
      const handX = handStartX + (handFinalX - handStartX) * handRise + dragRotY * 0.3;

      const handY = -4.8 + 4.22 * handRise + Math.sin(time * 1.2) * 0.02 * handRise;
      hand.position.set(handX, handY, 0.02);

      // Subtle 3D parallax on hand
      hand.rotation.y = dragRotY * 0.4;
      hand.rotation.x = dragRotX * 0.3;

      // 7C. Contact Shadow Opacity:
      // Grows as cap approaches the palm
      contactShadow.material.opacity = smoothstep(0.65, 0.86, t) * 0.65;
      contactShadow.position.set(capX, handY + 0.62, 0.05);

      // 7D. Studio Halo Spotlight follows center of gravity
      haloMesh.position.y = (capY + handY) / 2;

      renderer.render(scene, camera);
    };

    animate();

    // ─────────────────────────────────────────────────────────────
    // 8. CLEANUP
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
      haloTex.dispose();
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
      title={scrollProgress > 0.72 ? 'Drag to rotate perspective' : undefined}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
