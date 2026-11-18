import React, { useEffect, useRef } from 'react';

export const RekulaShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth || 1280;
      const h = canvas.clientHeight || window.innerHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      return () => {
        if (resizeObserver) resizeObserver.disconnect();
      };
    }

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Simplex/smooth noise utility
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Normalized mouse with smooth fallback
    vec2 mouse = u_mouse / u_resolution;
    vec2 mouseOffset = (mouse - 0.5) * 0.15;
    p += mouseOffset;

    float t = u_time * 0.12;

    // Palette: Rekula deep navy luxury branding with amplified luminous cyan
    vec3 bgDeep = vec3(0.012, 0.028, 0.052);
    vec3 bgMid = vec3(0.024, 0.058, 0.11);
    vec3 cyanGlow = vec3(0.12, 0.58, 0.95);
    vec3 electricCyan = vec3(0.28, 0.82, 1.0);
    vec3 neonCyanCore = vec3(0.65, 0.94, 1.0);
    vec3 goldAccent = vec3(0.78, 0.58, 0.22);

    // Slow ambient wave & organic fluid field
    float n1 = snoise(vec2(p.x * 0.75 + t * 0.4, p.y * 0.8 - t * 0.3));
    float n2 = snoise(vec2(p.x * 1.5 - t * 0.2 + n1 * 0.5, p.y * 1.5 + t * 0.25));
    float flow = snoise(vec2(p.x * 0.5 + n2 * 0.4, p.y * 0.5 - t * 0.15));

    // Base subtle radial gradient centered towards top-left / center
    float dist = length(uv - vec2(0.25, 0.45));
    vec3 col = mix(bgMid, bgDeep, smoothstep(0.1, 1.3, dist));

    // Luminous celestial/silk veil echoing the hero's gentle arc
    float arcPath = p.x * 0.45 + p.y * 0.85 + sin(p.x * 1.2 + t * 0.5) * 0.25;
    float distToArc = abs(arcPath - 0.1 + flow * 0.1);

    // Multi-tiered vibrant cyan arc & bloom
    float arcCore = smoothstep(0.012, 0.0, distToArc);
    float arcLine = smoothstep(0.035, 0.0, distToArc);
    float arcInnerGlow = smoothstep(0.25, 0.0, distToArc);
    float arcOuterGlow = smoothstep(0.65, 0.0, distToArc);

    // Secondary subtle gold/amber warmth floating near the right (hand & tassel zone)
    float rightWarmth = smoothstep(0.8, 0.1, length(uv - vec2(0.85, 0.45) - vec2(sin(t)*0.05, cos(t*0.7)*0.05)));
    col += goldAccent * rightWarmth * 0.035;

    // Atmospheric flow blend with boosted vibrancy
    col += cyanGlow * max(0.0, flow * 0.32 + 0.12);
    col += cyanGlow * arcOuterGlow * 0.45;
    col += electricCyan * arcInnerGlow * 0.75;
    col += electricCyan * arcLine * 0.95;
    col += neonCyanCore * arcCore * 0.85;

    // Soft elegant vignette
    float vignette = smoothstep(1.6, 0.35, length(p));
    col *= vignette;

    // Tactile micro-grain texture
    float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453) - 0.5) * 0.02;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
}`;

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vShader = compileShader(gl.VERTEX_SHADER, vs);
    const fShader = compileShader(gl.FRAGMENT_SHADER, fs);
    const prog = gl.createProgram();
    if (!vShader || !fShader || !prog) {
      return () => {
        if (resizeObserver) resizeObserver.disconnect();
      };
    }

    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let rafId = 0;
    const render = (t: number) => {
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        id="shader-canvas-ANIMATION_5"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};
