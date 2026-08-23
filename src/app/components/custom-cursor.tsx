import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });
  
  const dotX = useSpring(0, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-caribbean-green rounded-full pointer-events-none z-[999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: isHovered ? "0 0 20px rgba(0, 223, 129, 0.4)" : "none",
        }}
        animate={{
          scale: isClicked ? 0.75 : (isHovered ? 1.6 : 1),
          borderColor: isHovered ? "#00DF81" : "rgba(0, 223, 129, 0.6)",
          borderWidth: isHovered ? "2px" : "1.5px",
          backgroundColor: isHovered ? "rgba(0, 223, 129, 0.08)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-caribbean-green rounded-full pointer-events-none z-[999] hidden md:block shadow-[0_0_8px_#00DF81]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
      />
      
      <style>{`
        body { cursor: none !important; }
        a, button, input, select, textarea { cursor: none !important; }
        @media (max-width: 768px) {
          body, a, button, input, select, textarea { cursor: auto !important; }
        }
      `}</style>
    </>
  );
};
