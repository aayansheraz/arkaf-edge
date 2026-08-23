import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as THREE from "three";

interface CinematicScrollProps {
  onNavigate?: (view: string) => void;
}

export const CinematicScroll: React.FC<CinematicScrollProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroY, setHeroY] = useState(0);
  const [whoOpacity, setWhoOpacity] = useState(0);
  const [whoY, setWhoY] = useState(40);
  const [videoOpacity, setVideoOpacity] = useState(0.85);
  const [sheetTranslateY, setSheetTranslateY] = useState(100);
  const [horizontalScrollX, setHorizontalScrollX] = useState(0);
  const [cardOpacities, setCardOpacities] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => console.log("Autoplay:", err));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 10;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color("#00DF81"),
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  const horizontalProjects = [
    {
      id: "aura",
      title: "AURA Mobility",
      category: "Strategy • Branding • Digital",
      badge: "Featured Ecosystem",
      year: "2026",
      desc: "Comprehensive global brand repositioning and unified digital operating system for autonomous mobility.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "nexus",
      title: "NEXUS Capital",
      category: "Marketing Strategy • Growth",
      badge: "Institutional Scale",
      year: "2026",
      desc: "Transformative digital experience and brand positioning for tier-one sustainable investments.",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "vortex",
      title: "VORTEX Spatial",
      category: "Creative & Design • 3D",
      badge: "Spatial Innovation",
      year: "2025",
      desc: "Immersive architectural digital platform featuring real-time spatial interaction systems.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // 1. Hero text fade out (0.00 -> 0.15)
      if (progress <= 0.15) {
        const p = Math.min(1, progress / 0.12);
        setHeroOpacity(1 - p);
        setHeroY(-p * 30);
      } else {
        setHeroOpacity(0);
      }

      // 2. Who We Are crossfade (0.12 -> 0.32)
      if (progress > 0.10 && progress <= 0.32) {
        let wOp = 1;
        let wY = 0;
        if (progress < 0.20) {
          const inP = (progress - 0.10) / 0.10;
          wOp = inP;
          wY = 40 * (1 - inP);
        } else if (progress > 0.24) {
          const outP = (progress - 0.24) / 0.08;
          wOp = 1 - outP;
          wY = -outP * 30;
        }
        setWhoOpacity(Math.max(0, Math.min(1, wOp)));
        setWhoY(wY);
      } else {
        setWhoOpacity(0);
      }

      // 3. Flower video opacity
      if (progress > 0.20 && progress <= 0.34) {
        const p = (progress - 0.20) / 0.14;
        setVideoOpacity(0.85 * (1 - p));
      } else if (progress > 0.34) {
        setVideoOpacity(0);
      } else {
        setVideoOpacity(0.85);
      }

      // 4. Horizontal Sheet translateY (0.26 -> 0.36)
      if (progress > 0.26) {
        const p = Math.min(1, (progress - 0.26) / 0.10);
        setSheetTranslateY((1 - p) * 100);
      } else {
        setSheetTranslateY(100);
      }

      // 5. Horizontal Cards Scroll (0.36 -> 0.96)
      if (progress > 0.36) {
        const hp = Math.min(1, (progress - 0.36) / 0.58);
        setHorizontalScrollX(hp * 65);
        
        const c0 = Math.min(1, Math.max(0, (progress - 0.34) / 0.06));
        const c1 = Math.min(1, Math.max(0, (progress - 0.38) / 0.06));
        const c2 = Math.min(1, Math.max(0, (progress - 0.44) / 0.06));
        const c3 = Math.min(1, Math.max(0, (progress - 0.50) / 0.06));
        setCardOpacities([c0, c1, c2, c3]);
      } else {
        setHorizontalScrollX(0);
        setCardOpacities([0, 0, 0, 0]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[520vh] bg-rich-black select-none">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-60"
        />

        {/* Hero Mint Glass Flower Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-[2] pointer-events-none transition-opacity duration-200 will-change-transform"
          style={{ opacity: videoOpacity, transform: "translateZ(0)" }}
        >
          <source src="/videos/mint_flower.webm" type="video/webm" />
          <source src="/videos/mint_flower.mp4" type="video/mp4" />
        </video>

        {/* Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-rich-black/70 via-transparent to-rich-black/85 z-[3] pointer-events-none" />

        {/* 01. HERO VIEWPORT */}
        {heroOpacity > 0 && (
          <div
            className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-20 flex flex-col justify-between pt-32 pb-16 pointer-events-none transition-all duration-75"
            style={{
              opacity: heroOpacity,
              transform: `translateY(${heroY}px)`,
            }}
          >
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="px-4 py-1.5 rounded-full bg-rich-black/90 border border-caribbean-green/40 text-caribbean-green text-xs font-mono uppercase tracking-[0.25em] font-bold shadow-[0_0_20px_rgba(0,223,129,0.2)] flex items-center gap-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-caribbean-green animate-pulse" />
                <span>01. HERO — STRATEGY • CREATIVITY • IMPACT</span>
              </div>
            </div>

            <div className="space-y-6 max-w-4xl">
              <h1 className="text-[12vw] sm:text-[9vw] md:text-[7.2vw] font-black uppercase font-heading tracking-tight leading-[0.88] text-anti-flash-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                Creating an <br />
                <span className="text-caribbean-green drop-shadow-[0_0_35px_rgba(0,223,129,0.6)]">EDGE</span><br />
                For Brands That Matter.
              </h1>
              
              <p className="text-pistachio max-w-xl text-base sm:text-lg md:text-xl font-normal font-sans leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                ARKAF Edge helps businesses build stronger brands through strategic thinking, creative execution, and purposeful marketing.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 pointer-events-auto">
                <button
                  onClick={() => onNavigate && onNavigate("services")}
                  className="px-8 py-4 rounded-full bg-caribbean-green text-rich-black font-bold font-mono text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,223,129,0.5)] flex items-center gap-2 cursor-none clickable"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onNavigate && onNavigate("contact")}
                  className="px-8 py-4 rounded-full bg-rich-black/80 border border-caribbean-green/40 hover:border-caribbean-green text-anti-flash-white font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-none clickable backdrop-blur-md"
                >
                  <span>Let’s Talk</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-mountain-meadow uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-caribbean-green animate-ping" />
              <span>SCROLL DOWN TO REVEAL WHO WE ARE</span>
            </div>
          </div>
        )}

        {/* 02. WHO WE ARE */}
        {whoOpacity > 0 && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-20 pointer-events-none transition-all duration-75"
            style={{
              opacity: whoOpacity,
              transform: `translateY(${whoY}px)`,
            }}
          >
            <div className="max-w-4xl text-center space-y-8 bg-rich-black/90 p-8 sm:p-12 rounded-3xl border border-caribbean-green/30 backdrop-blur-xl pointer-events-auto shadow-2xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-dark-green border border-caribbean-green/40 text-caribbean-green text-xs font-mono uppercase tracking-[0.25em]">
                02. WHO WE ARE
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase font-heading text-anti-flash-white tracking-tight leading-none">
                Strategy with purpose. <br />
                <span className="text-caribbean-green">Creativity with impact.</span>
              </h2>
              <p className="text-pistachio text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto font-sans">
                ARKAF Edge brings together strategy, creativity, and business thinking to help brands navigate an increasingly competitive world. We believe meaningful growth comes from understanding people, identifying opportunities, and creating ideas that move businesses forward.
              </p>
              <div>
                <button
                  onClick={() => onNavigate && onNavigate("services")}
                  className="px-6 py-3 rounded-full border border-caribbean-green text-caribbean-green font-mono text-xs uppercase tracking-widest hover:bg-caribbean-green hover:text-rich-black transition-all cursor-none clickable inline-flex items-center gap-2"
                >
                  <span>More About ARKAF Edge</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 03. HORIZONTAL CAROUSEL SHEET */}
        <div
          className="absolute inset-0 z-20 bg-anti-flash-white text-rich-black overflow-hidden flex items-center shadow-2xl transition-transform duration-75 will-change-transform"
          style={{
            transform: `translateY(${sheetTranslateY}%)`,
            pointerEvents: sheetTranslateY >= 95 ? "none" : "auto",
          }}
        >
          {/* Giant Parallax Background Wordmark */}
          <div
            className="absolute top-1/2 left-0 whitespace-nowrap text-[26vw] font-black uppercase text-rich-black/5 font-heading pointer-events-none select-none z-0 transition-transform duration-75"
            style={{
              transform: `translate(-${horizontalScrollX * 1.5}%, -50%)`,
            }}
          >
            THE ARKAF EDGE THE ARKAF EDGE
          </div>

          <div className="absolute top-8 left-10 z-20 hidden md:flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-caribbean-green shadow-[0_0_10px_#00DF81]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-rich-black font-bold">
              04. THE ARKAF EDGE & SELECTED WORK
            </span>
          </div>

          {/* Horizontal Track of Cards */}
          <div
            className="flex gap-8 px-10 z-10 transition-transform duration-75 will-change-transform"
            style={{
              transform: `translateX(-${horizontalScrollX}%)`,
            }}
          >
            {/* Lead Statement Box */}
            <div
              className="flex h-[66vh] w-[85vw] md:w-[520px] shrink-0 flex-col justify-center px-10 sm:px-12 bg-rich-black text-anti-flash-white border border-dark-green rounded-3xl shadow-2xl relative overflow-hidden"
              style={{ opacity: cardOpacities[0] }}
            >
              <span className="inline-block px-3.5 py-1 rounded bg-caribbean-green text-rich-black font-mono text-[10px] uppercase font-bold tracking-[0.25em] mb-6 self-start shadow-[0_0_12px_rgba(0,223,129,0.3)]">
                04. THE ARKAF EDGE
              </span>
              <h3 className="text-4xl md:text-5xl font-black leading-none text-anti-flash-white font-heading uppercase mb-6 tracking-tight">
                Different <br />
                <span className="text-caribbean-green">Thinking.</span>
              </h3>
              <p className="text-pistachio leading-relaxed text-sm md:text-base font-normal font-sans mb-8">
                We look beyond conventional approaches to find the opportunities others overlook. By combining strategic insight, creative thinking, and a deep understanding of people and markets, we help brands discover their edge.
              </p>
              <button
                onClick={() => onNavigate && onNavigate("work")}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-caribbean-green hover:text-white transition-colors cursor-none clickable self-start"
              >
                <span>Explore All Work</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Showcase Cards */}
            {horizontalProjects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => onNavigate && onNavigate("work")}
                className="group relative h-[66vh] w-[85vw] md:w-[480px] shrink-0 overflow-hidden bg-white border border-stone/20 hover:border-caribbean-green rounded-3xl transition-all duration-500 shadow-xl cursor-none clickable"
                style={{ opacity: cardOpacities[idx + 1] }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                <div className="absolute top-6 left-6 z-20 px-3.5 py-1 rounded-full bg-rich-black/90 backdrop-blur-md border border-white/20">
                  <span className="font-mono text-xs text-caribbean-green font-bold">
                    {p.year}
                  </span>
                </div>

                <div className="absolute inset-0 z-10 grid place-content-center bg-rich-black/85 backdrop-blur-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-8 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-caribbean-green text-rich-black font-mono text-[10px] uppercase font-bold tracking-widest mb-4">
                    {p.badge}
                  </span>
                  <h4 className="text-3xl md:text-4xl font-black uppercase text-anti-flash-white font-heading mb-2">
                    {p.title}
                  </h4>
                  <p className="font-mono text-xs uppercase tracking-widest text-caribbean-green mb-4">
                    {p.category}
                  </p>
                  <p className="text-pistachio text-xs font-normal max-w-xs mx-auto mb-6">
                    {p.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-caribbean-green uppercase tracking-wider">
                    <span>Inspect Case Study</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-rich-black via-rich-black/80 to-transparent z-10 group-hover:opacity-0 transition-opacity">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-caribbean-green font-bold">
                    {p.category}
                  </span>
                  <h4 className="text-2xl font-black uppercase text-white font-heading mt-1">
                    {p.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
