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
    // 1. RENDERER SETUP (ALPHA TRANSPARENT, HIGH PERFORMANCE)
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
    renderer.toneMappingExposure = 1.08;

    // ─────────────────────────────────────────────────────────────
    // 2. SCENE & CAMERA (TUNED FRUSTUM & HEADROOM)
    // ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);

    // ─────────────────────────────────────────────────────────────
    // 3. STUDIO LIGHTING (VIVID, NATURAL, ZERO WHITE SEAMS)
    // ─────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xfff5eb, 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd7, 1.9);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x6098bc, 6, 16);
    fillLight.position.set(-3, 1, 4);
    scene.add(fillLight);

    // ─────────────────────────────────────────────────────────────
    // 4. LOAD HIGH-RESOLUTION CRISP TEXTURES
    // ─────────────────────────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();

    // 4A. Graduation Cap (Complete, Beveled Diamond, Gold Tassel)
    const capTex = textureLoader.load('/assets/rekula-cap-crisp.png');
    capTex.colorSpace = THREE.SRGBColorSpace;
    capTex.generateMipmaps = true;
    capTex.minFilter = THREE.LinearMipmapLinearFilter;
    capTex.magFilter = THREE.LinearFilter;

    // Cap natural proportions: 604 x 319 (aspect = 1.893)
    // Sized comfortably so it NEVER clips browser borders
    const capWidth = 3.35;
    const capHeight = capWidth / (604 / 319); // 1.77
    const capGeom = new THREE.PlaneGeometry(capWidth, capHeight);
    const capMaterial = new THREE.MeshBasicMaterial({
      map: capTex,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const cap = new THREE.Mesh(capGeom, capMaterial);
    scene.add(cap);

    // 4B. Human Hand (Photographic Warm Skin, Open Palm, Cupped Fingers)
    const handTex = textureLoader.load('/assets/rekula-hand-crisp.png');
    handTex.colorSpace = THREE.SRGBColorSpace;
    handTex.generateMipmaps = true;
    handTex.minFilter = THREE.LinearMipmapLinearFilter;
    handTex.magFilter = THREE.LinearFilter;

    // Hand natural proportions: 857 x 340 (aspect = 2.52)
    const handWidth = 5.2;
    const handHeight = handWidth / (857 / 340); // 2.06
    const handGeom = new THREE.PlaneGeometry(handWidth, handHeight);
    const handMaterial = new THREE.MeshBasicMaterial({
      map: handTex,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const hand = new THREE.Mesh(handGeom, handMaterial);
    // Hidden initially at launch
    hand.visible = false;
    hand.position.set(0.3, -10.0, 0);
    scene.add(hand);

    // 4C. Organic Palm Contact Shadow (Fades in softly as cap lands)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      sGrad.addColorStop(0, 'rgba(4, 2, 1, 0.78)');
      sGrad.addColorStop(0.5, 'rgba(8, 4, 2, 0.32)');
      sGrad.addColorStop(1, 'rgba(8, 4, 2, 0.0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;

    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 0.75),
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
    // 5. RESPONSIVE RESIZE HANDLING & VIEWPORT BOUNDS
    // ─────────────────────────────────────────────────────────────
    let isMobile = false;

    const fit = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      isMobile = w / h < 0.9;
      const d = isMobile ? 10.5 : 7.2;
      camera.position.set(0, (2.8 * d) / 7.2, (5.6 * d) / 7.2 * 1.05);
      camera.lookAt(0, 0.15, 0);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', fit);
    fit();

    // ─────────────────────────────────────────────────────────────
    // 6. SILKY SCROLL TRACKING & 3D INTERACTION
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

    // Mouse & Touch Drag to Rotate in Final State
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

      // Drag inertia interpolation
      dragRotY += (targetDragRotY - dragRotY) * 0.08;
      dragRotX += (targetDragRotX - dragRotX) * 0.08;

      // ─────────────────────────────────────────────────────────
      // 7A. CAP POSITION & SCALE
      // At launch (t=0):
      // - Placed comfortably in view (y = 0.15) with generous headroom
      // - Sized cleanly so top board is NEVER cut off
      // - On desktop: positioned slightly to the right (x = 0.85)
      //   to harmoniously balance with the left-hand hero text
      // - On mobile: centered (x = 0)
      // As user scrolls:
      // - Glides smoothly into the center palm hover position
      // ─────────────────────────────────────────────────────────
      const capStartX = isMobile ? 0.0 : 0.82;
      const capFinalX = -0.30;
      const capX = capStartX + (capFinalX - capStartX) * s2 + dragRotY * 0.4;

      const capStartY = 0.18;
      const capPeakY = 0.75;
      const capFinalY = 0.48;
      const capY =
        capStartY +
        (capPeakY - capStartY) * s1 -
        (capPeakY - capFinalY) * s2 +
        Math.sin(time * 1.4) * 0.035 * (1 - s1 * 0.4);

      cap.position.set(capX, capY, 0.08);

      // Subtle 3D tilt
      cap.rotation.y = dragRotY * 0.5;
      cap.rotation.x = dragRotX * 0.4;
      cap.rotation.z = Math.sin(time * 0.8) * 0.012 * (1 - s2);

      // ─────────────────────────────────────────────────────────
      // 7B. HAND POSITION & VISIBILITY
      // At launch (t=0):
      // - Hand is strictly invisible and positioned far below (-10.0)
      // - ZERO part of any finger or palm can be seen
      // Only when user actually scrolls (t > 0.12):
      // - Hand becomes visible and glides gracefully up to meet cap
      // ─────────────────────────────────────────────────────────
      if (t < 0.12) {
        hand.visible = false;
        hand.position.set(0.3, -10.0, 0);
      } else {
        hand.visible = true;
        const handRise = smoothstep(0.15, 0.82, t);
        const handStartX = 0.28;
        const handFinalX = 0.22;
        const handX = handStartX + (handFinalX - handStartX) * handRise + dragRotY * 0.3;

        const handY = -5.8 + 5.15 * handRise + Math.sin(time * 1.1) * 0.02 * handRise;
        hand.position.set(handX, handY, 0.02);

        hand.rotation.y = dragRotY * 0.4;
        hand.rotation.x = dragRotX * 0.3;

        // Contact shadow darkens under cap as hand arrives
        contactShadow.material.opacity = smoothstep(0.68, 0.88, t) * 0.72;
        contactShadow.position.set(capX, handY + 0.55, 0.04);
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
      window.removeEventListener('scroll', handleScroll);
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
      title={scrollProgress > 0.72 ? 'Drag to rotate perspective' : undefined}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
