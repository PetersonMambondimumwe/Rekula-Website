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
    // 3. STUDIO LIGHTING (Cinematic Darkroom with Warm Key & Cool Rim)
    // ─────────────────────────────────────────────────────────────
    // Soft warm ambient base
    const ambientLight = new THREE.AmbientLight(0xffdfbe, 0.65);
    scene.add(ambientLight);

    // Warm Directional Key Light (casts realistic soft shadows)
    const keyLight = new THREE.DirectionalLight(0xffedd7, 2.6);
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
    const hemiLight = new THREE.HemisphereLight(0xffe2c4, 0x140a04, 0.7);
    scene.add(hemiLight);

    // Ember Orange Accent Rim Light (grazes the silhouettes)
    const rimLight = new THREE.PointLight(0xdc5000, 32, 16);
    rimLight.position.set(-3.5, 2.2, -3.2);
    scene.add(rimLight);

    // Re:kula Soft Blue Fill Light (brand identity shadow tone)
    const fillLight = new THREE.PointLight(0x5086a8, 14, 16);
    fillLight.position.set(-2.2, 1.2, 5.0);
    scene.add(fillLight);

    // ─────────────────────────────────────────────────────────────
    // 4. PROCEDURAL HIGH-RESOLUTION TEXTURES
    // ─────────────────────────────────────────────────────────────

    // 4A. Felt Cloth Texture Generator (1024x1024)
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
      if ('colorSpace' in tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
      }
      return tex;
    };

    // 4B. Human Skin Texture Generator (1024x1024)
    // Includes epidermal stippling, dermatoglyphic micro-ridges, palmar crease lines, and vascular radial warmth
    const createSkinTexture = () => {
      const cv = document.createElement('canvas');
      cv.width = 1024;
      cv.height = 1024;
      const ctx = cv.getContext('2d');
      if (!ctx) return new THREE.Texture();

      // Warm natural skin tone foundation
      ctx.fillStyle = '#deb496';
      ctx.fillRect(0, 0, 1024, 1024);

      // Micro-pores and cellular stippling
      const imgData = ctx.getImageData(0, 0, 1024, 1024);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 22;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.9));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.7));
      }
      ctx.putImageData(imgData, 0, 0);

      // Vascular warmth in palmar pads and fingertips (Rosy hemoglobin flush)
      for (let i = 0; i < 48; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const r = 40 + Math.random() * 120;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, 'rgba(215, 105, 80, 0.12)');
        grad.addColorStop(0.5, 'rgba(210, 115, 90, 0.05)');
        grad.addColorStop(1, 'rgba(210, 115, 90, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Palmar flexion creases and dermatoglyphic lines
      ctx.strokeStyle = 'rgba(135, 62, 42, 0.22)';
      ctx.lineWidth = 1.6;
      for (let i = 0; i < 350; i++) {
        ctx.beginPath();
        const ax = Math.random() * 1024;
        const ay = Math.random() * 1024;
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + (Math.random() - 0.5) * 45, ay + (Math.random() - 0.5) * 12);
        ctx.stroke();
      }

      // Major Hand Creases (Thenar, Head, and Heart flexion lines)
      ctx.strokeStyle = 'rgba(115, 48, 30, 0.28)';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(150, 480);
      ctx.bezierCurveTo(350, 520, 650, 680, 880, 850);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(220, 400);
      ctx.bezierCurveTo(450, 430, 720, 520, 950, 620);
      ctx.stroke();

      const tex = new THREE.CanvasTexture(cv);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
      if ('colorSpace' in tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
      }
      return tex;
    };

    const feltTexture = createFeltTexture();
    const skinTexture = createSkinTexture();

    // ─────────────────────────────────────────────────────────────
    // 5. MASTER MATERIALS
    // ─────────────────────────────────────────────────────────────

    // Mortarboard Felt Material
    const feltMaterial = new THREE.MeshStandardMaterial({
      color: 0x111622,
      map: feltTexture,
      bumpMap: feltTexture,
      bumpScale: 0.95,
      roughness: 0.95,
      metalness: 0.02,
    });

    // Human Skin Material (Physical Material with Subsurface Scattering Glow)
    const skinMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: skinTexture,
      bumpMap: skinTexture,
      bumpScale: 0.42,
      roughness: 0.52,
      metalness: 0.0,
      clearcoat: 0.16,
      clearcoatRoughness: 0.38,
      emissive: 0x481508,
      emissiveIntensity: 0.32,
      reflectivity: 0.5,
    });

    // Translucent Fingernail Keratin Material
    const nailMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5cfc4,
      roughness: 0.16,
      metalness: 0.0,
      clearcoat: 0.88,
      clearcoatRoughness: 0.12,
      transmission: 0.14,
      ior: 1.48,
    });

    // Metallic Gold Tassel & Fitting Material
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf0c464,
      roughness: 0.24,
      metalness: 0.88,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
    });

    // Silk Tassel Threads
    const tasselSilkMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8be5c,
      roughness: 0.38,
      metalness: 0.55,
    });

    // Academic Gown Sleeve Material (Deep Midnight Wool)
    const sleeveMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c1119,
      map: feltTexture,
      bumpMap: feltTexture,
      bumpScale: 1.1,
      roughness: 0.98,
      metalness: 0.0,
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

    // 6D. Golden Silk Tassel Cord (Catmull-Rom Curve Draping Across the Board)
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

    // Gold Tassel Ferrule / Ring & Knot
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

    // 6E. Full Silk Tassel Skirt (60+ Individual Golden Strands)
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
    // 7. REALISTIC HUMAN HAND & ACADEMIC GOWN SLEEVE
    // ─────────────────────────────────────────────────────────────
    const hand = new THREE.Group();

    // Finger Segment Builder
    const createFingerSegment = (
      parent: THREE.Group,
      length: number,
      rBottom: number,
      rTop: number,
      isDistal: boolean
    ) => {
      const segGroup = new THREE.Group();
      parent.add(segGroup);

      // Phalanx Cylinder
      const cyGeom = new THREE.CylinderGeometry(rTop, rBottom, length, 24);
      cyGeom.rotateX(-Math.PI / 2);
      cyGeom.translate(0, 0, -length / 2);
      const cyMesh = new THREE.Mesh(cyGeom, skinMaterial);
      cyMesh.castShadow = true;
      cyMesh.receiveShadow = true;
      segGroup.add(cyMesh);

      // Knuckle Joint Sphere (Condyle)
      const jointGeom = new THREE.SphereGeometry(rBottom * 1.06, 20, 16);
      jointGeom.scale(1, 0.94, 1);
      const jointMesh = new THREE.Mesh(jointGeom, skinMaterial);
      jointMesh.castShadow = true;
      jointMesh.receiveShadow = true;
      segGroup.add(jointMesh);

      // Fingertip Pulp Pad & Fingernail (Only on Distal Phalanx)
      if (isDistal) {
        const tipPadGeom = new THREE.SphereGeometry(rTop, 20, 16);
        const tipPadMesh = new THREE.Mesh(tipPadGeom, skinMaterial);
        tipPadMesh.position.z = -length;
        tipPadMesh.castShadow = true;
        tipPadMesh.receiveShadow = true;
        segGroup.add(tipPadMesh);

        // Realistic Curved Fingernail Plate
        const nailGeom = new THREE.SphereGeometry(1, 18, 14);
        nailGeom.scale(rTop * 0.74, rTop * 0.22, rTop * 1.02);
        const nailMesh = new THREE.Mesh(nailGeom, nailMaterial);
        nailMesh.position.set(0, rTop * 0.78, -length + rTop * 0.12);
        nailMesh.rotation.x = 0.14;
        nailMesh.castShadow = true;
        segGroup.add(nailMesh);
      }

      return segGroup;
    };

    // Finger Chain Builder
    const buildFinger = (
      x: number,
      z: number,
      lengths: [number, number, number],
      baseRadius: number,
      curls: [number, number, number],
      yaw: number,
      y: number = 0
    ) => {
      let currentAnchor = new THREE.Group();
      currentAnchor.position.set(x, y, z);
      currentAnchor.rotation.y = yaw;
      hand.add(currentAnchor);

      lengths.forEach((len, idx) => {
        const taper = 1 - idx * 0.13;
        const isLast = idx === lengths.length - 1;
        const seg = createFingerSegment(
          currentAnchor,
          len,
          baseRadius * taper,
          baseRadius * (taper - 0.13),
          isLast
        );
        seg.rotation.x = curls[idx];

        const nextAnchor = new THREE.Group();
        nextAnchor.position.z = -len;
        seg.add(nextAnchor);
        currentAnchor = nextAnchor;
      });
    };

    // 7A. Anatomically Contoured Palm
    const palmGeom = new THREE.SphereGeometry(1, 48, 36);
    palmGeom.scale(0.92, 0.22, 1.04);
    const palmMesh = new THREE.Mesh(palmGeom, skinMaterial);
    palmMesh.position.z = 0.25;
    palmMesh.castShadow = true;
    palmMesh.receiveShadow = true;
    hand.add(palmMesh);

    // Thenar Eminence (Thumb Base Mound)
    const thenarGeom = new THREE.SphereGeometry(1, 28, 20);
    thenarGeom.scale(0.44, 0.22, 0.58);
    const thenarMesh = new THREE.Mesh(thenarGeom, skinMaterial);
    thenarMesh.position.set(-0.52, 0.08, 0.52);
    thenarMesh.rotation.y = 0.48;
    thenarMesh.castShadow = true;
    thenarMesh.receiveShadow = true;
    hand.add(thenarMesh);

    // Hypothenar Eminence (Pinky Lateral Cushion)
    const hypothenarGeom = new THREE.SphereGeometry(1, 28, 20);
    hypothenarGeom.scale(0.30, 0.16, 0.64);
    const hypothenarMesh = new THREE.Mesh(hypothenarGeom, skinMaterial);
    hypothenarMesh.position.set(0.62, 0.06, 0.42);
    hypothenarMesh.castShadow = true;
    hypothenarMesh.receiveShadow = true;
    hand.add(hypothenarMesh);

    // 7B. Forearm & Carpal Bones
    const wristGeom = new THREE.CylinderGeometry(0.52, 0.58, 3.2, 32);
    wristGeom.rotateX(Math.PI / 2);
    wristGeom.translate(0, 0, 2.2);
    const wristMesh = new THREE.Mesh(wristGeom, skinMaterial);
    wristMesh.scale.y = 0.72; // natural flattened anatomical wrist
    wristMesh.castShadow = true;
    wristMesh.receiveShadow = true;
    hand.add(wristMesh);

    // 7C. Academic Gown Sleeve Cuff (Midnight Navy Wool Fabric with Gold Accent Trim)
    const sleeveGeom = new THREE.CylinderGeometry(0.76, 0.84, 2.8, 40);
    sleeveGeom.rotateX(Math.PI / 2);
    sleeveGeom.translate(0, 0, 3.55);
    const sleeveMesh = new THREE.Mesh(sleeveGeom, sleeveMaterial);
    sleeveMesh.castShadow = true;
    sleeveMesh.receiveShadow = true;
    hand.add(sleeveMesh);

    // Gold Trim Ring around the Sleeve Cuff Rim
    const cuffGoldRing = new THREE.TorusGeometry(0.76, 0.016, 16, 64);
    cuffGoldRing.rotateX(Math.PI / 2);
    cuffGoldRing.translate(0, 0, 2.15);
    const cuffRingMesh = new THREE.Mesh(cuffGoldRing, goldMaterial);
    hand.add(cuffRingMesh);

    // 7D. Build the 4 Primary Fingers (Natural Anatomical Curl & Lengths)
    // Index Finger
    buildFinger(-0.60, -0.70, [0.62, 0.40, 0.30], 0.165, [0.14, 0.36, 0.30], -0.07, 0.0);
    // Middle Finger (Longest)
    buildFinger(-0.20, -0.70, [0.68, 0.44, 0.33], 0.170, [0.14, 0.36, 0.30], -0.02, 0.0);
    // Ring Finger
    buildFinger(0.20, -0.70, [0.62, 0.42, 0.31], 0.160, [0.14, 0.36, 0.30], 0.03, 0.0);
    // Pinky Finger
    buildFinger(0.58, -0.70, [0.50, 0.30, 0.26], 0.135, [0.14, 0.36, 0.30], 0.10, 0.0);

    // 7E. Thumb (Opposable Angled Forward & Curled Inward)
    buildFinger(-0.78, 0.40, [0.50, 0.42, 0.32], 0.200, [0.06, 0.20, 0.26], 0.85, 0.02);

    // Set initial hand position waiting below viewport
    hand.position.set(0, -4.5, 0);
    hand.rotation.x = -0.08;

    hand.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.receiveShadow = true;
      }
    });

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
    // 9. SILKY SCROLL PROGRESSION & INTERACTION
    // ─────────────────────────────────────────────────────────────
    let target = 0;
    let cur = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragRotY = 0;
    let targetDragRotY = 0;

    const smoothstep = (a: number, b: number, x: number) => {
      const v = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return v * v * (3 - 2 * v);
    };

    const handleScroll = () => {
      // Find parent track element or use window scroll
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
      if (cur > 0.75) {
        isDragging = true;
        dragStartX = e.clientX;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const delta = e.clientX - dragStartX;
        targetDragRotY += delta * 0.005;
        dragStartX = e.clientX;
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
      if (cur > 0.75 && e.touches.length === 1) {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const delta = e.touches[0].clientX - dragStartX;
        targetDragRotY += delta * 0.005;
        dragStartX = e.touches[0].clientX;
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

      // Smoothstep interpolation intervals exactly from Capstone
      const s1 = smoothstep(0.05, 0.38, t);
      const s2 = smoothstep(0.38, 0.86, t);
      const sh = smoothstep(0.10, 0.86, t);

      // 10A. Cap Trajectory (Float -> Arc -> Soft Landing into Palm)
      cap.position.set(
        2.4 * s1 - 2.4 * s2,
        0.2 + 3.2 * s1 - 3.15 * s2 + Math.sin(time * 1.2) * 0.06 * (1 - s1) * (1 - s2),
        -0.1 * s2
      );

      // Scale from Showcase Proportions (1.5x) to Life-size Hand Fit (0.75x)
      const capScale = 1.5 - 0.75 * sh;
      cap.scale.setScalar(capScale);

      // Multi-Axis Tumbling & Presentation Rotation
      cap.rotation.set(
        0.38 * (1 - sh) + 0.04,
        time * 0.35 * (1 - sh) + (s1 + s2) * Math.PI * 3.2 + 0.5 * sh + dragRotY,
        Math.sin(time * 0.8) * 0.05 * (1 - sh)
      );

      // 10B. Hand Rising & Receiving Cap
      hand.position.y = -4.6 + 4.2 * smoothstep(0.30, 0.78, t);
      hand.rotation.y = Math.sin(time * 0.6) * 0.05 * smoothstep(0.70, 1.0, t) + dragRotY;

      // Drag Inertia Lerp
      dragRotY += (targetDragRotY - dragRotY) * 0.08;

      // Subtle silk tassel wind drift
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
      skinTexture.dispose();
      renderer.dispose();
    };
  }, [onProgressChange]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      title={scrollProgress > 0.75 ? 'Drag to rotate the graduation cap & hand' : undefined}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
