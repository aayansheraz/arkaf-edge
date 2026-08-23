import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });
  const dotX = useSpring(0, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target;
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
  }, [mouseX, mouseY, dotX, dotY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-caribbean-green rounded-full pointer-events-none z-[999] hidden md:block shadow-[0_0_15px_rgba(0,223,129,0.3)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "rgba(0, 223, 129, 0.15)" : "rgba(0, 223, 129, 0)",
          borderColor: isHovered ? "#00DF81" : "rgba(0, 223, 129, 0.6)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-caribbean-green rounded-full pointer-events-none z-[999] hidden md:block shadow-[0_0_10px_#00DF81]"
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
        @media (max-width: 768px) {
          body { cursor: auto !important; }
        }
      `}</style>
    </>
  );
};
