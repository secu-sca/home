import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

interface GlowOrb {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [glowOrbs] = useState<GlowOrb[]>([
    { id: 1, x: 20, y: 30, size: 400 },
    { id: 2, x: 80, y: 70, size: 300 },
    { id: 3, x: 50, y: 20, size: 350 },
  ]);
  
  // Parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Generate bubbles
  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 30 + 10,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 10,
        });
      }
      setBubbles(newBubbles);
    };
    generateBubbles();
  }, []);

  // Mouse move handler for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (e.clientX - centerX) / centerX;
    const y = (e.clientY - centerY) / centerY;
    mouseX.set(x * 30);
    mouseY.set(y * 30);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a14] via-[#1a0a1e] to-[#0f0c18]" />
      
      {/* Radial glow orbs with parallax */}
      {glowOrbs.map((orb, index) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: index === 0 
              ? 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)'
              : index === 1
              ? 'radial-gradient(circle, rgba(192, 132, 252, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, transparent 70%)',
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.x}%`,
            width: bubble.size,
            height: bubble.size,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}

      {/* Blur cloud layers */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, transparent 60%)',
          filter: 'blur(60px)',
          left: '10%',
          top: '60%',
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 60%)',
          filter: 'blur(80px)',
          right: '5%',
          top: '20%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Grid pattern (subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(244, 114, 182, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 114, 182, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
