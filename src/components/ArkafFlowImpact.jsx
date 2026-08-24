import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const lerp = (n, e, t) => n + (e - n) * t;
const clamp = (n, e, t) => Math.max(e, Math.min(t, n));
function hexToVec3(n) {
  const e = parseInt(n.slice(1), 16);
  return new THREE.Vector3((e >> 16 & 255) / 255, (e >> 8 & 255) / 255, (e & 255) / 255);
}

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

const createWarpPostShader = () => ({
  uniforms: {
    iTime: { value: 0 },
    tDiffuse: { value: null },
    uBg: { value: hexToVec3("#080d0b") },
    uFlameA: { value: hexToVec3("#59FF75") },
    uFlameB: { value: hexToVec3("#3DFA5E") },
    uFlameAmt: { value: 0.10 }
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

export const FlowWaveCanvas = ({ progress, className = "", style = {} }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (typeof progress === "number") {
      progressRef.current = progress;
    } else if (progress && typeof progress.get === "function") {
      progressRef.current = progress.get();
      return progress.on("change", (latest) => {
        progressRef.current = latest;
      });
    }
  }, [progress]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080d0b, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 400);
    camera.position.set(0, 7, 16);
    scene.add(camera);

    const waveGroup = new THREE.Group();
    scene.add(waveGroup);

    const waveUniforms = {
      uTime: { value: 0 },
      uStream: { value: 0 },
      uAppear: { value: 1 },
      uColLow: { value: hexToVec3("#0E541E") },
      uColHigh: { value: hexToVec3("#52FF6E") },
      uOpacity: { value: 0.90 },
      uSize: { value: 3.2 },
      uBrightness: { value: 0.26 },
      uWaveHeight: { value: 3.5 },
      uFlow: { value: 1 },
      uScale: { value: 0.275 },
      uCursor: { value: new THREE.Vector3() },
      uRepelRadius: { value: 5.0 },
      uRepelStrength: { value: 0.8 },
      uActivity: { value: 0 }
    };

    const waveMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: waveUniforms,
      vertexShader: `
        uniform float uTime; uniform float uStream; uniform float uSize; uniform float uWaveHeight; uniform float uFlow; uniform float uScale;
        uniform vec3 uColLow; uniform vec3 uColHigh;
        uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
        varying float vFade; varying vec3 vColor;
        ${simplexNoiseGlsl}
        void main() {
          vec3 wp = vec3(position.x * 13.0, 0.0, position.z * 25.0);
          wp.x += position.y * 6.0;
          float zc = wp.z + uStream;
          float wn = snoise(vec3(wp.x * 0.08, zc * 0.08, uTime * 0.15 * uFlow)) * 2.0;
          wn += snoise(vec3(wp.x * 0.16, zc * 0.16, uTime * 0.3 * uFlow)) * 0.8;
          wp.y += wn * uWaveHeight;

          vec3 finalPos = wp * uScale;
          vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
          vec3 toP = modelPosition.xyz - uCursor;
          float cd = length(toP);
          float fall = smoothstep(uRepelRadius, 0.0, cd);
          modelPosition.xyz += normalize(toP + vec3(0.0001)) * fall * uRepelStrength * uActivity;
          vec4 mvPosition = viewMatrix * modelPosition;

          float colMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
          vColor = mix(uColLow, uColHigh, clamp(colMix, 0.0, 1.0));
          vFade = 1.0;

          gl_PointSize = uSize * (8.0 / -mvPosition.z);
          gl_PointSize = max(gl_PointSize, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uOpacity; uniform float uBrightness; uniform float uAppear;
        varying float vFade; varying vec3 vColor;
        void main() {
          vec2 xy = gl_PointCoord - 0.5;
          float ll = length(xy);
          if (ll > 0.5) discard;
          float a = smoothstep(0.5, 0.15, ll);
          gl_FragColor = vec4(vColor * uBrightness, vFade * a * uOpacity * uAppear);
        }
      `
    });

    const waveGeometry = new THREE.SphereGeometry(4.2, 160, 480);
    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    wavePoints.frustumCulled = false;
    waveGroup.add(wavePoints);

    const mouseRaw = { x: 0, y: 0 };
    const mouseSmooth = { x: 0, y: 0 };
    const mouseTrack = {
      world: new THREE.Vector3(),
      activity: 0,
      active: false,
      lastMove: performance.now()
    };

    const handleMouseMove = (e) => {
      mouseRaw.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRaw.y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseTrack.active = true;
      mouseTrack.lastMove = performance.now();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.48, 0.45, 0.1));
    const warpPass = new ShaderPass(createWarpPostShader());
    composer.addPass(warpPass);

    let animId;
    let streamOffset = 0;
    let prevSec = performance.now() / 1000;
    let smoothProgress = 0;

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const pr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      composer.setPixelRatio(pr);
      composer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const loop = () => {
      animId = requestAnimationFrame(loop);
      if (!isVisible) return;

      const pClamped = clamp(progressRef.current, 0, 1);
      smoothProgress = lerp(smoothProgress, pClamped, 0.15);
      mouseSmooth.x = lerp(mouseSmooth.x, mouseRaw.x, 0.08);
      mouseSmooth.y = lerp(mouseSmooth.y, mouseRaw.y, 0.08);

      const sec = performance.now() / 1000;
      const deltaSec = Math.min(0.05, sec - prevSec);
      prevSec = sec;

      waveUniforms.uTime.value = sec;
      streamOffset += deltaSec * 8;
      waveUniforms.uStream.value = streamOffset;
      waveUniforms.uWaveHeight.value = 3.5 * (1 + smoothProgress * 0.8);

      const pNorm = Math.min(smoothProgress / 0.35, 1);
      const easeCurv = pNorm * pNorm * (3 - 2 * pNorm);
      const camY = lerp(7, 1.2, easeCurv);
      const camZ = lerp(16, 2, easeCurv);

      camera.position.set(mouseSmooth.x * 0.8, camY + mouseSmooth.y * 0.3, camZ);
      camera.lookAt(mouseSmooth.x * 0.4, lerp(0, 0.4, easeCurv), lerp(2, -10, easeCurv));

      warpPass.uniforms.iTime.value = sec * 1.3;
      composer.render();
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`} style={style}>
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-auto cursor-crosshair" />
    </div>
  );
};

const approachSteps = [
  {
    id: "01",
    word: "THINK",
    num: "01 — THINK",
    headline: "Understand the business, audience, market, and opportunity.",
    desc: "We analyze the business, audience, and market opportunity to define a strategy that creates lasting differentiation and stakeholder alignment.",
    side: "right"
  },
  {
    id: "02",
    word: "CREATE",
    num: "02 — CREATE",
    headline: "Turn insight into strategies, ideas, identities, and experiences.",
    desc: "We turn strategic insight into compelling visual identities, campaigns, digital experiences, and communications people trust and use.",
    side: "left"
  },
  {
    id: "03",
    word: "TRANSFORM",
    num: "03 — TRANSFORM",
    headline: "Launch, evolve, and create measurable impact.",
    desc: "We launch, evolve, and execute marketing systems for predictable, scalable, long-term business growth.",
    side: "right"
  }
];

const stats = [
  { value: "25+", label: "Projects Delivered" },
  { value: "12+", label: "Brands Transformed" },
  { value: "8", label: "Markets Reached" },
  { value: "∞", label: "Ideas in Motion" }
];

const WordTransition = ({ word, index, scrollYProgress }) => {
  let inputDomain = [0.0, 0.28, 0.35, 1.0];
  let opacityRange = [1.0, 1.0, 0.2, 0.2];
  let scaleRange = [1.06, 1.06, 0.95, 0.95];

  if (index === 1) {
    inputDomain = [0.0, 0.28, 0.35, 0.62, 0.68, 1.0];
    opacityRange = [0.2, 0.2, 1.0, 1.0, 0.2, 0.2];
    scaleRange = [0.95, 0.95, 1.06, 1.06, 0.95, 0.95];
  } else if (index === 2) {
    inputDomain = [0.0, 0.62, 0.68, 1.0];
    opacityRange = [0.2, 0.2, 1.0, 1.0];
    scaleRange = [0.95, 0.95, 1.06, 1.06];
  }

  const opacity = useTransform(scrollYProgress, inputDomain, opacityRange);
  const scale = useTransform(scrollYProgress, inputDomain, scaleRange);

  return (
    <motion.h2
      style={{ opacity, scale }}
      className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none my-2 transition-colors text-white whitespace-nowrap text-center"
    >
      {word}
    </motion.h2>
  );
};

const StepPreviewCard = ({ step, index, scrollYProgress }) => {
  let inputDomain = [0.0, 0.26, 0.34, 1.0];
  let opacityRange = [1.0, 1.0, 0.0, 0.0];
  let yRange = [0, 0, -40, -40];

  if (index === 1) {
    inputDomain = [0.0, 0.28, 0.35, 0.60, 0.67, 1.0];
    opacityRange = [0.0, 0.0, 1.0, 1.0, 0.0, 0.0];
    yRange = [40, 40, 0, 0, -40, -40];
  } else if (index === 2) {
    inputDomain = [0.0, 0.61, 0.68, 1.0];
    opacityRange = [0.0, 0.0, 1.0, 1.0];
    yRange = [40, 40, 0, 0];
  }

  const y = useTransform(scrollYProgress, inputDomain, yRange);
  const opacity = useTransform(scrollYProgress, inputDomain, opacityRange);
  const isLeft = step.side === "left";

  return (
    <motion.div
      style={{ y, opacity }}
      className={`absolute z-20 top-[62%] sm:top-[60%] md:top-1/2 md:-translate-y-1/2 left-4 right-4 sm:left-8 sm:right-8 md:inset-auto w-auto md:w-[320px] lg:w-[350px] pointer-events-auto text-center md:text-left ${
        isLeft ? "md:left-6 lg:left-10 md:right-auto" : "md:right-6 lg:right-10 md:left-auto"
      }`}
    >
      <div className="max-w-md mx-auto md:max-w-none">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-white mb-1.5 md:mb-2 leading-snug tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {step.headline}
        </h3>

        <p className="text-pistachio/90 font-light text-xs sm:text-sm md:text-base leading-relaxed font-sans drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
};

export const ArkafFlowImpact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-rich-black text-anti-flash-white border-b border-forest/20 relative select-none">
      <div ref={containerRef} className="relative h-[360vh] w-full">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-rich-black px-4">
          <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
            <FlowWaveCanvas progress={scrollYProgress} />
          </div>

          <div className="absolute top-24 md:top-28 left-6 md:left-20 right-6 md:right-20 z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl space-y-1.5"
            >
              <div
                style={{ color: "#149C77", textShadow: "0 0 15px rgba(20, 156, 119, 0.4)" }}
                className="font-mono text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-2"
              >
                <span
                  style={{ backgroundColor: "#149C77", boxShadow: "0 0 10px rgba(20, 156, 119, 0.6)" }}
                  className="w-2 h-2 rounded-full"
                />
                <span>05. OUR APPROACH — FLOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase font-heading text-white tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Think. Create. <span style={{ color: "#149C77", textShadow: "0 0 25px rgba(20, 156, 119, 0.65)" }}>Transform.</span>
              </h2>
            </motion.div>
          </div>

          <div className="relative h-full w-full flex items-center justify-center z-10 px-4">
            <div className="flex flex-col items-center justify-center text-center z-10 select-none max-w-[340px] sm:max-w-[400px] md:max-w-[440px] mx-auto pointer-events-none -translate-y-8 sm:-translate-y-6 md:translate-y-0">
              {approachSteps.map((step, index) => (
                <WordTransition
                  key={step.id}
                  word={step.word}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}

              <div className="mt-6 md:mt-8 font-sans text-sm sm:text-base md:text-xl text-pistachio font-light tracking-wide flex items-center justify-center gap-2">
                <span>Each essential. Each in</span>
                <span
                  style={{
                    backgroundColor: "#074239",
                    border: "1.5px solid #149C77",
                    color: "#FFFFFF",
                    boxShadow: "0 0 15px rgba(20, 156, 119, 0.4)"
                  }}
                  className="inline-block px-3.5 py-0.5 rounded-full font-medium text-xs sm:text-sm backdrop-blur-md"
                >
                  motion.
                </span>
              </div>
            </div>

            {approachSteps.map((step, index) => (
              <StepPreviewCard
                key={step.id}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 07. IMPACT & NUMBERS */}
      <div
        style={{ backgroundColor: "#52FF6E" }}
        className="relative z-20 w-full py-44 border-t border-black/10 select-none"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-24">
            <span
              style={{ color: "#021B1A" }}
              className="font-mono text-xs uppercase tracking-[0.3em] block mb-3 font-bold"
            >
              07. IMPACT & NUMBERS
            </span>
            <h3
              style={{ color: "#FFFFFF", textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)" }}
              className="text-4xl md:text-6xl font-black uppercase font-heading"
            >
              Measured by <span style={{ color: "#074239", textShadow: "none" }}>Results.</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  backgroundColor: "#074239",
                  border: "1.5px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 20px 45px rgba(2, 27, 26, 0.25)"
                }}
                className="p-8 rounded-3xl text-center hover:scale-[1.02] transition-transform duration-300"
              >
                <div
                  style={{ color: "#FFFFFF", textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)" }}
                  className="text-5xl md:text-7xl font-black font-heading mb-2"
                >
                  {item.value}
                </div>
                <div
                  style={{ color: "#FFFFFF" }}
                  className="font-mono text-xs uppercase font-medium tracking-wider"
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const OurApproach = ArkafFlowImpact;
