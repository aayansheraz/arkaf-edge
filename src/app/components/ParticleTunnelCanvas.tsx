import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowLeft, Sparkles, Sliders, Play, Pause } from "lucide-react";

export const ParticleTunnelCanvas: React.FC<{ onBack?: () => void; isStandalone?: boolean }> = ({ onBack, isStandalone = false }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [particleDensity] = useState(40000);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = particleDensity;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.pow(Math.random(), 1.6) * 3.2;
      const z = (Math.random() - 0.5) * 8.0;

      positions[idx] = Math.cos(theta) * radius;
      positions[idx + 1] = Math.sin(theta) * radius;
      positions[idx + 2] = z;

      sizes[i] = 1.0 + Math.random() * 2.0;
      seeds[i] = Math.random() * 100.0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(width, height) },
      uColor: { value: new THREE.Color("#52FF6E") },
      uSpeed: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        attribute float size;
        attribute float seed;
        uniform float uTime;
        uniform vec2 uRes;
        varying float vA;
        varying vec3 vPos;

        vec3 warp(vec3 p, float t){
          float c = 0.9, a = 1.9, b = 0.02, s = 0.05;
          p *= 2.0;
          p.x += c * sin(s * t + a * p.y) + t * b;
          p.y += c * cos(s * t + a * p.x);
          p.z += c * sin(s * t + a * p.z) + t * b;
          p.z += c * cos(s * t + a * p.y);
          p.x += c * sin(s * t + a * p.x) + t * b;
          p.x += c * cos(s * t + a * p.z);
          return cos(p + vec3(1.0, 2.0, 4.0));
        }

        void main(){
          vec3 v = position * 3.5 + warp(position, uTime) * 1.2;
          vPos = v;
          vec4 mv = modelViewMatrix * vec4(v, 1.0);
          float r = length(v);
          float farF = 1.0 - smoothstep(4.0, 7.5, r);
          float nearF = smoothstep(0.0, 0.4, -mv.z);
          vA = farF * nearF;

          gl_PointSize = size * (uRes.y / 1000.0) / -mv.z;
          gl_PointSize = clamp(gl_PointSize, 1.0, 3.5);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vA;
        varying vec3 vPos;

        void main(){
          vec2 p = gl_PointCoord - 0.5;
          float l = length(p);
          if (l > 0.5) discard;
          float tex = smoothstep(0.5, 0.0, l);

          vec3 finalColor = uColor;
          if (vPos.z > 0.0) {
            finalColor = mix(uColor, vec3(0.17, 0.76, 0.58), clamp(vPos.z * 0.2, 0.0, 1.0));
          }

          gl_FragColor = vec4(finalColor * tex * 1.4, tex * vA * 0.85);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let targetRotX = 0;
    let targetRotY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotX = y * 0.25;
      targetRotY = x * 0.25;
    };
    window.addEventListener("mousemove", onMouseMove);

    let reqId: number;
    let clock = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (isPlaying) {
        clock += 0.015 * speed;
        uniforms.uTime.value = clock;
      }

      particles.rotation.x += (targetRotX - particles.rotation.x) * 0.05;
      particles.rotation.y += (targetRotY - particles.rotation.y) * 0.05;
      particles.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      uniforms.uRes.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isPlaying, speed, particleDensity]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#021B1A] overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block transform-gpu will-change-transform" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {isStandalone && (
        <div className="absolute top-8 left-8 z-30 flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-full bg-rich-black/80 border border-caribbean-green/50 text-caribbean-green font-mono text-xs uppercase tracking-widest hover:bg-caribbean-green hover:text-rich-black transition-all flex items-center gap-2 backdrop-blur-md cursor-none clickable shadow-lg"
            >
              <ArrowLeft size={14} />
              <span>Back to Full Site</span>
            </button>
          )}

          <div className="px-4 py-2 rounded-full bg-pine/80 border border-basil text-xs font-mono text-anti-flash-white flex items-center gap-2 backdrop-blur-md">
            <Sparkles size={14} className="text-caribbean-green animate-pulse" />
            <span>3D Particle Tunnel Shader</span>
          </div>
        </div>
      )}

      {isStandalone && (
        <div className="absolute bottom-8 right-8 z-30 p-5 rounded-2xl bg-rich-black/85 border border-basil/60 backdrop-blur-xl text-anti-flash-white space-y-4 shadow-2xl w-72">
          <div className="flex justify-between items-center pb-3 border-b border-basil/40">
            <span className="font-mono text-xs uppercase text-caribbean-green font-bold flex items-center gap-2">
              <Sliders size={14} />
              <span>Shader Engine</span>
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-7 h-7 rounded-full bg-pine flex items-center justify-center hover:bg-caribbean-green hover:text-rich-black transition-colors"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-mountain-meadow mb-1">
              <span>Tunnel Velocity</span>
              <span>{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-caribbean-green cursor-pointer"
            />
          </div>

          <div className="pt-2 font-mono text-[10px] text-pistachio/80">
            • Realtime GPU Math: 40,000 Points<br />
            • 3D Perlin Warp Vortex
          </div>
        </div>
      )}
    </div>
  );
};
