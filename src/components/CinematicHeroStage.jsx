import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HorizontalScrollSheet } from "./HorizontalScrollSheet";

const lerp = (n, e, t) => n + (e - n) * t;
const clamp = (n, e, t) => Math.max(e, Math.min(t, n));
function hexToVec3(n) {
  const e = parseInt(n.slice(1), 16);
  return new THREE.Vector3((e >> 16 & 255) / 255, (e >> 8 & 255) / 255, (e & 255) / 255);
}

const serviceCards = [
  {
    id: "01",
    num: "01 — BRAND STRATEGY",
    title: "Brand Strategy",
    description: "Building clear brand positioning, identities, and strategies that create lasting differentiation.",
    side: "left",
    containerClass: "left-6 sm:left-10 md:left-14 lg:left-20 top-[20%] text-left"
  },
  {
    id: "02",
    num: "02 — MARKETING STRATEGY",
    title: "Marketing Strategy",
    description: "Turning business objectives into focused marketing strategies designed to create measurable impact.",
    side: "right",
    containerClass: "right-6 sm:right-10 md:right-14 lg:right-20 top-[28%] text-right"
  },
  {
    id: "03",
    num: "03 — CREATIVE & DESIGN",
    title: "Creative & Design",
    description: "Creating compelling visual identities, campaigns, digital experiences, and communications.",
    side: "left",
    containerClass: "left-6 sm:left-10 md:left-14 lg:left-20 top-[60%] text-left"
  },
  {
    id: "04",
    num: "04 — DIGITAL & CONTENT",
    title: "Digital & Content",
    description: "Connecting brands with audiences through digital platforms, content, and meaningful experiences.",
    side: "right",
    containerClass: "right-6 sm:right-10 md:right-14 lg:right-20 top-[68%] text-right"
  }
];

const simplexNoiseGlsl = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const tunnelVertexShader = `
uniform float uTime; uniform float uSize; uniform float uSwirl; uniform float uScale;
uniform vec3 uColLow; uniform vec3 uColHigh;
uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
varying float vFade; varying vec3 vColor;
${simplexNoiseGlsl}
void main() {
  vec3 wp = vec3(position.x * 7.0, 0.0, position.z * 25.0);
  wp.x += position.y * 6.0;
  float wn = snoise(vec3(wp.x * 0.08, wp.z * 0.08, uTime * 0.12)) * 1.5;
  wn += snoise(vec3(wp.x * 0.16, wp.z * 0.16, uTime * 0.22)) * 0.5;

  float tunnelR = 12.0;
  float currentSliceRadius = sqrt(max(0.0, 17.64 - position.z * position.z));
  float maxSliceWidth = 9.2195 * currentSliceRadius;
  float normalizedX = wp.x / (maxSliceWidth + 0.001);
  float tunnelAngle = normalizedX * 3.14159265;

  float jitterAngle = snoise(vec3(position.x * 8.0, position.y * 8.0, uTime * 0.08)) * 0.15;
  float jitterZ = snoise(vec3(position.y * 8.0, position.z * 8.0, uTime * 0.08)) * 2.0;
  float ambientSwirl = snoise(vec3(position.x * 3.0, position.y * 3.0, uTime * 0.15)) * 2.0;
  tunnelAngle += jitterAngle + ambientSwirl * uSwirl;

  float dynamicR = tunnelR - wn;
  vec3 tunnelPos = vec3(dynamicR * sin(tunnelAngle), -dynamicR * cos(tunnelAngle), wp.z + jitterZ);

  vec3 finalPos = tunnelPos * uScale;
  vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
  vec3 toP = modelPosition.xyz - uCursor;
  float cd = length(toP);
  float fall = smoothstep(uRepelRadius, 0.0, cd);
  modelPosition.xyz += normalize(toP + vec3(0.0001)) * fall * uRepelStrength * uActivity;
  vec4 mvPosition = viewMatrix * modelPosition;

  float colMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
  vColor = mix(uColLow, uColHigh, clamp(colMix, 0.0, 1.0));
  vFade = 1.0;

  gl_PointSize = uSize * (6.0 / -mvPosition.z);
  gl_PointSize = clamp(gl_PointSize, 1.0, 2.5);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const tunnelFragmentShader = `
uniform float uOpacity; uniform float uBrightness; uniform float uAppear;
varying float vFade; varying vec3 vColor;
void main() {
  vec2 xy = gl_PointCoord - 0.5;
  float ll = length(xy);
  if (ll > 0.5) discard;
  float a = smoothstep(0.5, 0.15, ll);
  gl_FragColor = vec4(vColor * uBrightness, vFade * a * uOpacity * uAppear);
}
`;

const warpStarVertexShader = `
attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
varying float vA;
vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
  p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
  p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
  return cos(p+vec3(1,2,4)); }
void main(){
  vec3 v = position*4.0 + warp(position, uTime)*1.2;
  vec4 mv = modelViewMatrix * vec4(v, 1.0);
  float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
  vA = farF * nearF;
  gl_PointSize = size * uRes.y / 1200.0 / -mv.z; gl_PointSize = clamp(gl_PointSize, 1.0, 2.0);
  gl_Position = projectionMatrix * mv;
}
`;

const warpStarFragmentShader = `
uniform vec3 uColor; varying float vA;
void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
  float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.35); }
`;

const createWarpPostShader = () => ({
  uniforms: {
    iTime: { value: 0 },
    tDiffuse: { value: null },
    uBg: { value: hexToVec3("#080d0b") },
    uFlameA: { value: hexToVec3("#00DF81") },
    uFlameB: { value: hexToVec3("#00B368") },
    uFlameAmt: { value: 0.13 }
  },
  vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }",
  fragmentShader: `
uniform float iTime; uniform sampler2D tDiffuse;
uniform vec3 uBg; uniform vec3 uFlameA; uniform vec3 uFlameB; uniform float uFlameAmt;
varying vec2 vUv;
vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
  pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
  pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
  pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
  return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
void main(){
  vec2 uv = 2.*vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.2), vec3(1.5));
  vec3 flame = 1.2*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
  flame *= smoothstep(0.35, 1., abs(uv.y));
  float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
  vec3 bg = uBg * (1.0 - 0.5 * length(uv));
  vec3 sceneColor = texture2D(tDiffuse, vUv).xyz;
  gl_FragColor = vec4(bg + flame*uFlameAmt + sceneColor, 1.0);
}
`
});

export const CinematicHeroStage = ({ onNavigate }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // Direct DOM Refs for 0-rerender 60fps performance
  const heroRef = useRef(null);
  const whoRef = useRef(null);
  const servicesRefs = useRef([]);
  const sheetRef = useRef(null);
  const sheetComponentRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.playbackRate = 1.0;
      video.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080d0b);
    scene.fog = new THREE.Fog(0x080d0b, 0, 18);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 0, 20);
    scene.add(camera);

    const tunnelGroup = new THREE.Group();
    scene.add(tunnelGroup);

    const sphereGeometry = new THREE.SphereGeometry(4.2, 120, 320);
    const tunnelUniforms = {
      uTime: { value: 0 },
      uAppear: { value: 0 },
      uColLow: { value: hexToVec3("#03100A") },
      uColHigh: { value: hexToVec3("#00DF81") },
      uOpacity: { value: 0.90 },
      uSize: { value: 2.6 },
      uBrightness: { value: 0.28 },
      uSwirl: { value: 0.39 },
      uScale: { value: 0.17 },
      uCursor: { value: new THREE.Vector3() },
      uRepelRadius: { value: 2.4 },
      uRepelStrength: { value: 0.8 },
      uActivity: { value: 0 }
    };

    const tunnelMaterial = new THREE.ShaderMaterial({
      vertexShader: tunnelVertexShader,
      fragmentShader: tunnelFragmentShader,
      uniforms: tunnelUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const tunnelPoints = new THREE.Points(sphereGeometry, tunnelMaterial);
    tunnelPoints.frustumCulled = false;
    tunnelGroup.add(tunnelPoints);

    const starCount = 150;
    const starPos = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starSeeds = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = 2 * Math.random() - 1;
      starPos[i * 3 + 1] = 2 * Math.random() - 1;
      starPos[i * 3 + 2] = 2 * Math.random() - 1;
      starSizes[i] = 16 * (0.3 + Math.random());
      starSeeds[i] = Math.random();
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute("seed", new THREE.BufferAttribute(starSeeds, 1));

    const starUniforms = {
      uTime: { value: 0 },
      uColor: { value: hexToVec3("#00DF81") },
      uRes: { value: new THREE.Vector2(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio) }
    };

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: warpStarVertexShader,
      fragmentShader: warpStarFragmentShader,
      uniforms: starUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    starPoints.frustumCulled = false;
    scene.add(starPoints);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.48, 0.45, 0.1);
    composer.addPass(bloomPass);

    const warpShader = createWarpPostShader();
    const warpPass = new ShaderPass(warpShader);
    composer.addPass(warpPass);

    let targetProgress = 0;
    let currentProgress = 0;
    const mouseNorm = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    const mouseState = {
      active: false,
      lastMove: performance.now(),
      activity: 0,
      world: new THREE.Vector3()
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable > 0) {
        const scrolled = -rect.top;
        targetProgress = clamp(scrolled / scrollable, 0, 1);
      }
    };

    const handleMouseMove = (e) => {
      mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNorm.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseState.active = true;
      mouseState.lastMove = performance.now();
    };

    const handleMouseLeave = () => {
      mouseState.active = false;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    handleScroll();

    const mouseProjPoint = new THREE.Vector3();
    const rayDir = new THREE.Vector3();
    const hitPoint = new THREE.Vector3();

    function updateMouseWorld() {
      hitPoint.set(0, 0, 0);
      if (mouseState.active) {
        mouseProjPoint.set(smoothMouse.x, smoothMouse.y, 0.5).unproject(camera);
        rayDir.copy(mouseProjPoint).sub(camera.position).normalize();
        const dirZ = rayDir.z;
        if (Math.abs(dirZ) > 0.0001) {
          const dist = -camera.position.z / dirZ;
          if (dist > 0 && Number.isFinite(dist)) {
            hitPoint.copy(camera.position).addScaledVector(rayDir, dist);
          }
        }
      }
      mouseState.world.lerp(hitPoint, 0.12);
      const idleTime = (performance.now() - mouseState.lastMove) / 1000;
      mouseState.activity += ((mouseState.active && idleTime < 3 ? 1 : 0) - mouseState.activity) * 0.06;
    }

    let prevTime = performance.now() / 1000;
    const startTime = performance.now();
    let rotZ = 0;
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - prevTime);
      prevTime = now;

      currentProgress = lerp(currentProgress, targetProgress, 0.14);
      smoothMouse.x = lerp(smoothMouse.x, mouseNorm.x, 0.06);
      smoothMouse.y = lerp(smoothMouse.y, mouseNorm.y, 0.06);

      // --- CALCULATE OPACITIES & POSITIONS DIRECTLY (0 REACT RE-RENDERS) ---
      let hOp = 1, hY = 0;
      if (currentProgress <= 0.08) {
        const p = clamp(currentProgress / 0.06, 0, 1);
        hOp = 1 - p;
        hY = -p * 30;
      } else {
        hOp = 0;
      }

      let wOp = 0, wY = 60;
      if (currentProgress > 0.08 && currentProgress <= 0.22) {
        const pIn = clamp((currentProgress - 0.08) / 0.06, 0, 1);
        wOp = pIn;
        wY = 60 * (1 - pIn);
        if (currentProgress > 0.18) {
          const pOut = clamp((currentProgress - 0.18) / 0.04, 0, 1);
          wOp = 1 - pOut;
          wY = -pOut * 30;
        }
      } else {
        wOp = 0;
      }

      let vOp = 0.90;
      if (currentProgress <= 0.18) {
        vOp = 0.90;
      } else if (currentProgress <= 0.26) {
        vOp = 0.90 * (1 - clamp((currentProgress - 0.18) / 0.08, 0, 1));
      } else {
        vOp = 0;
      }

      const isMobile = window.innerWidth < 768;
      const sOps = [0, 0, 0, 0];
      if (isMobile) {
        // MOBILE: Reveal each of the 4 points one-by-one so they NEVER overlap
        if (currentProgress >= 0.26 && currentProgress <= 0.33) {
          const pIn = clamp((currentProgress - 0.26) / 0.025, 0, 1);
          const pOut = currentProgress > 0.305 ? clamp((currentProgress - 0.305) / 0.025, 0, 1) : 0;
          sOps[0] = pIn * (1 - pOut);
        }
        if (currentProgress > 0.33 && currentProgress <= 0.40) {
          const pIn = clamp((currentProgress - 0.33) / 0.025, 0, 1);
          const pOut = currentProgress > 0.375 ? clamp((currentProgress - 0.375) / 0.025, 0, 1) : 0;
          sOps[1] = pIn * (1 - pOut);
        }
        if (currentProgress > 0.40 && currentProgress <= 0.47) {
          const pIn = clamp((currentProgress - 0.40) / 0.025, 0, 1);
          const pOut = currentProgress > 0.445 ? clamp((currentProgress - 0.445) / 0.025, 0, 1) : 0;
          sOps[2] = pIn * (1 - pOut);
        }
        if (currentProgress > 0.47 && currentProgress <= 0.54) {
          const pIn = clamp((currentProgress - 0.47) / 0.025, 0, 1);
          const pOut = currentProgress > 0.515 ? clamp((currentProgress - 0.515) / 0.025, 0, 1) : 0;
          sOps[3] = pIn * (1 - pOut);
        }
      } else {
        // DESKTOP: Original simultaneous accumulation across 4 quadrant positions
        if (currentProgress > 0.26) {
          sOps[0] = clamp((currentProgress - 0.28) / 0.05, 0, 1);
          sOps[1] = clamp((currentProgress - 0.33) / 0.05, 0, 1);
          sOps[2] = clamp((currentProgress - 0.38) / 0.05, 0, 1);
          sOps[3] = clamp((currentProgress - 0.43) / 0.05, 0, 1);
        }
      }

      let shY = 100;
      if (currentProgress > 0.52) {
        shY = (1 - clamp((currentProgress - 0.52) / 0.08, 0, 1)) * 100;
      } else {
        shY = 100;
      }

      let shP = 0;
      if (currentProgress > 0.6) {
        shP = clamp((currentProgress - 0.6) / 0.36, 0, 1);
      } else {
        shP = 0;
      }

      let vidOpacity = 0;
      if (currentProgress < 0.18) {
        vidOpacity = 0;
      } else if (currentProgress <= 0.26) {
        const pIn = clamp((currentProgress - 0.18) / 0.08, 0, 1);
        vidOpacity = 0.85 * pIn;
      } else if (currentProgress <= 0.52) {
        vidOpacity = 0.85;
      } else if (currentProgress <= 0.60) {
        const pOut = clamp((currentProgress - 0.52) / 0.08, 0, 1);
        vidOpacity = 0.85 * (1 - pOut);
      } else {
        vidOpacity = 0;
      }

      // --- APPLY STYLES DIRECTLY TO DOM VIA GPU ACCELERATED TRANSFORMS ---
      if (heroRef.current) {
        heroRef.current.style.opacity = hOp;
        heroRef.current.style.transform = `translate3d(0, ${hY}px, 0)`;
        heroRef.current.style.pointerEvents = hOp > 0.1 ? "auto" : "none";
      }

      if (whoRef.current) {
        whoRef.current.style.opacity = wOp;
        whoRef.current.style.transform = `translate3d(0, ${wY}px, 0)`;
        whoRef.current.style.pointerEvents = wOp > 0.1 ? "auto" : "none";
      }

      servicesRefs.current.forEach((el, idx) => {
        if (el) {
          const op = sOps[idx];
          el.style.opacity = op;
          el.style.transform = `translate3d(0, ${(1 - op) * 30}px, 0)`;
        }
      });

      if (videoRef.current) {
        videoRef.current.style.opacity = vidOpacity;
        if (vidOpacity > 0.02) {
          if (videoRef.current.paused) videoRef.current.play().catch(() => {});
        } else {
          if (!videoRef.current.paused && currentProgress > 0.60) videoRef.current.pause();
        }
      }

      if (sheetRef.current) {
        sheetRef.current.style.transform = `translate3d(0, ${shY}%, 0)`;
      }

      if (sheetComponentRef.current) {
        sheetComponentRef.current.updateProgress(shP);
      }

      // --- OPTIMIZED THREE.JS RENDER PASS (PAUSES WHEN INVISIBLE) ---
      if (vOp > 0.01 && currentProgress < 0.55) {
        starUniforms.uTime.value = now * 5;
        starPoints.position.copy(camera.position);
        warpPass.uniforms.iTime.value = now * 1.3;
        tunnelUniforms.uTime.value = now * 1.4;

        const flyZProgress = clamp(currentProgress / 0.22, 0, 1);
        const camZ = 20 - flyZProgress * 44;
        camera.position.set(smoothMouse.x * 0.12, smoothMouse.y * 0.12, camZ);
        camera.lookAt(smoothMouse.x * 0.4, smoothMouse.y * 0.4, camera.position.z - 12);

        updateMouseWorld();
        tunnelUniforms.uSwirl.value = 0.39 * (1 + flyZProgress * 2.2);
        rotZ += dt * (0.1 + flyZProgress * 0.12);
        tunnelGroup.rotation.z = rotZ;
        tunnelUniforms.uCursor.value.copy(mouseState.world);
        tunnelUniforms.uActivity.value = mouseState.activity;
        tunnelUniforms.uOpacity.value = vOp;

        const elapsed = (performance.now() - startTime) / 1000;
        tunnelUniforms.uAppear.value = Math.max(0, Math.min(1, (elapsed - 0.2) / 1.4));

        composer.render();
      }
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const pr = Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      starUniforms.uRes.value.set(w * pr, h * pr);
      composer.setPixelRatio(pr);
      composer.setSize(w, h);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      sphereGeometry.dispose();
      tunnelMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[750vh] bg-rich-black select-none">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Particle Tunnel Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90 will-change-transform"
        />

        {/* 3D Mint Flower Background Video - Hardware Accelerated with 0-rerender opacity */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover z-[2] pointer-events-none will-change-transform"
          style={{ opacity: 0, transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
        >
          <source src="/videos/mint_flower.mp4" type="video/mp4" />
          <source src="/videos/mint_flower.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-rich-black/55 via-transparent to-rich-black/75 z-[3] pointer-events-none" />

        {/* 01. HERO OVERLAY */}
        <div
          ref={heroRef}
          className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-20 flex flex-col justify-center pointer-events-none will-change-transform"
          style={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        >
          <div className="max-w-4xl">
            <h1 className="text-[10vw] sm:text-[7vw] md:text-[6vw] font-black uppercase font-heading tracking-tighter leading-[0.9] text-anti-flash-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Strategy • <span className="text-caribbean-green drop-shadow-[0_0_25px_rgba(0,223,129,0.5)]">Creativity</span> • Impact
            </h1>

            <p className="text-lg md:text-2xl text-pistachio font-light max-w-2xl leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              We partner with visionary brands to design high-impact digital experiences, strategic identities, and scalable growth engines.
            </p>

            <div className="flex flex-wrap gap-4 pointer-events-auto">
              <button
                onClick={() => onNavigate && onNavigate("services")}
                className="px-8 py-4 rounded-full bg-caribbean-green text-rich-black font-bold text-sm uppercase tracking-widest hover:bg-anti-flash-white transition-all shadow-[0_0_30px_rgba(0,223,129,0.45)] cursor-none clickable inline-flex items-center gap-3 group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate && onNavigate("work")}
                className="px-8 py-4 rounded-full border border-caribbean-green/50 hover:border-caribbean-green bg-rich-black/80 backdrop-blur-md text-anti-flash-white font-bold text-sm uppercase tracking-widest transition-all cursor-none clickable inline-flex items-center gap-3 group shadow-lg"
              >
                <span>View Case Studies</span>
                <ArrowUpRight className="w-4 h-4 text-caribbean-green group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 02. WHO WE ARE OVERLAY */}
        <div
          ref={whoRef}
          className="absolute inset-0 z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col justify-center items-center text-center pointer-events-none will-change-transform"
          style={{ opacity: 0, transform: "translate3d(0,60px,0)" }}
        >
          <div className="space-y-6 max-w-4xl">
            <div className="inline-block px-3.5 py-1 rounded bg-[#a2e8bc] text-[#080d0b] text-[11px] font-mono font-bold tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(162,232,188,0.4)]">
              WHO WE ARE
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Strategy with purpose. <br />
              <span className="text-caribbean-green drop-shadow-[0_0_30px_rgba(0,223,129,0.5)]">
                Creativity with impact.
              </span>
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-pistachio/90 font-sans font-light max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              ARKAF Edge brings together strategy, creativity, and business thinking to help brands navigate an increasingly competitive world. We believe meaningful growth comes from understanding people, identifying opportunities, and creating ideas that move businesses forward.
            </p>
            <div className="pt-2 pointer-events-auto">
              <button
                onClick={() => onNavigate && onNavigate("services")}
                className="inline-flex items-center gap-3 text-xs md:text-sm font-mono text-caribbean-green uppercase tracking-[0.2em] font-bold hover:text-white transition-colors group"
              >
                <span>More About ARKAF Edge</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 03. WHAT WE DO (FLOATING SERVICE CARDS OVER MINT FLOWER VIDEO) */}
        {serviceCards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (servicesRefs.current[index] = el)}
            className={`absolute z-10 max-w-[320px] sm:max-w-[360px] md:max-w-[400px] pointer-events-none will-change-transform ${card.containerClass}`}
            style={{
              opacity: 0,
              transform: "translate3d(0,30px,0)"
            }}
          >
            <div
              className="font-mono text-xs text-caribbean-green font-bold tracking-[0.25em] uppercase mb-2 flex items-center gap-2"
              style={{ justifyContent: card.side === "right" ? "flex-end" : "flex-start" }}
            >
              <span className="w-2 h-2 rounded-full bg-caribbean-green shadow-[0_0_10px_#00DF81]" />
              <span>{card.num}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase font-heading text-white tracking-tight leading-[1.1] mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {card.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-pistachio/90 font-sans font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              {card.description}
            </p>
          </div>
        ))}

        {/* 04. HORIZONTAL SCROLL SHEET */}
        <div
          ref={sheetRef}
          className="absolute inset-0 z-30 bg-[#F1F7F6] text-[#0B0F0E] overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.5)] will-change-transform"
          style={{ transform: "translate3d(0, 100%, 0)" }}
        >
          <HorizontalScrollSheet ref={sheetComponentRef} />
        </div>
      </div>
    </div>
  );
};
