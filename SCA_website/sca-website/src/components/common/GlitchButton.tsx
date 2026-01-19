import { useState, useCallback, ReactNode, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function GlitchButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  size = 'md',
}: GlitchButtonProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [noiseOffset, setNoiseOffset] = useState({ x: 0, y: 0 });
  const [slicePositions, setSlicePositions] = useState<number[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glitchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const noiseIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 글리치 색상 배열
  const glitchColors = [
    '#ff0000', '#00ff00', '#0000ff',
    '#ff00ff', '#00ffff', '#ffff00',
    '#ff0080', '#80ff00', '#0080ff',
    '#39ff14', '#bf00ff', '#ff3366',
  ];

  const getRandomColor = useCallback(() => 
    glitchColors[Math.floor(Math.random() * glitchColors.length)], 
  []);

  // 도어즈 스타일 글리치 - 호버 시 강렬한 지지직거림 (살짝 느리게)
  useEffect(() => {
    if (isHovering) {
      // 노이즈 오프셋 변경 (빠른 지직거림)
      noiseIntervalRef.current = setInterval(() => {
        setNoiseOffset({
          x: (Math.random() - 0.5) * 12,
          y: (Math.random() - 0.5) * 6,
        });
        setGlitchIntensity(0.5 + Math.random() * 0.5);
        setSlicePositions([
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ]);
      }, 35);

      // 강한 글리치 발생
      glitchIntervalRef.current = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 60 + Math.random() * 100);
      }, 100 + Math.random() * 150);
    } else {
      if (noiseIntervalRef.current) clearInterval(noiseIntervalRef.current);
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
      setNoiseOffset({ x: 0, y: 0 });
      setGlitchIntensity(0);
      setIsGlitching(false);
    }

    return () => {
      if (noiseIntervalRef.current) clearInterval(noiseIntervalRef.current);
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, [isHovering]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      if (onClick) onClick();
      if (href) window.open(href, '_blank');
    }, 250);
  }, [onClick, href]);

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-pink-500 to-purple-500
      text-white font-bold
      shadow-lg shadow-pink-500/30
    `,
    outline: `
      border-2 border-pink-500
      text-pink-500
      hover:bg-pink-500/10
    `,
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        relative inline-flex items-center justify-center
        rounded-xl font-bold
        transition-all duration-300
        overflow-hidden
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      style={{
        transform: isHovering ? `translate(${noiseOffset.x * 0.2}px, ${noiseOffset.y * 0.2}px)` : 'none',
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 노이즈 배경 */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.12 + glitchIntensity * 0.15,
            mixBlendMode: 'overlay',
            transform: `translate(${noiseOffset.x}px, ${noiseOffset.y}px)`,
          }}
        />
      )}

      {/* 스캔라인 */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)`,
          }}
        />
      )}

      {/* RGB 분리 효과 - 더 강렬하게 */}
      {isHovering && (
        <>
          <span
            className="absolute inset-0 flex items-center justify-center font-bold pointer-events-none"
            style={{
              color: '#ff0000',
              mixBlendMode: 'screen',
              transform: `translate(${noiseOffset.x * 0.6}px, ${noiseOffset.y * 0.4}px) skewX(${noiseOffset.x * 0.3}deg)`,
              opacity: 0.8,
              filter: 'blur(0.3px)',
              textShadow: '0 0 10px #ff0000',
            }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center font-bold pointer-events-none"
            style={{
              color: '#00ff00',
              mixBlendMode: 'screen',
              transform: `translate(${-noiseOffset.x * 0.5}px, ${-noiseOffset.y * 0.3}px) skewX(${-noiseOffset.y * 0.2}deg)`,
              opacity: 0.8,
              filter: 'blur(0.3px)',
              textShadow: '0 0 10px #00ff00',
            }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center font-bold pointer-events-none"
            style={{
              color: '#0000ff',
              mixBlendMode: 'screen',
              transform: `translate(${noiseOffset.y * 0.4}px, ${noiseOffset.x * 0.3}px)`,
              opacity: 0.7,
              filter: 'blur(0.3px)',
              textShadow: '0 0 10px #0000ff',
            }}
          >
            {children}
          </span>
          {/* 추가 네온 컬러 레이어 */}
          <span
            className="absolute inset-0 flex items-center justify-center font-bold pointer-events-none"
            style={{
              color: '#ff00ff',
              mixBlendMode: 'screen',
              transform: `translate(${noiseOffset.x * 0.3}px, ${-noiseOffset.y * 0.5}px)`,
              opacity: 0.4 + glitchIntensity * 0.3,
              textShadow: '0 0 15px #ff00ff',
            }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center font-bold pointer-events-none"
            style={{
              color: '#00ffff',
              mixBlendMode: 'screen',
              transform: `translate(${-noiseOffset.y * 0.4}px, ${noiseOffset.x * 0.4}px)`,
              opacity: 0.3 + glitchIntensity * 0.3,
              textShadow: '0 0 15px #00ffff',
            }}
          >
            {children}
          </span>
        </>
      )}

      {/* 강한 글리치 슬라이스 - 더 많고 강렬하게 */}
      {isGlitching && (
        <>
          {slicePositions.map((pos, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 pointer-events-none overflow-hidden"
              style={{
                top: `${pos}%`,
                height: `${3 + Math.random() * 8}%`,
                background: `linear-gradient(90deg, 
                  ${getRandomColor()}80 0%,
                  transparent 20%,
                  ${getRandomColor()}60 40%,
                  transparent 60%,
                  ${getRandomColor()}70 80%,
                  transparent 100%
                )`,
                transform: `translateX(${(Math.random() - 0.5) * 40}px) scaleX(${0.8 + Math.random() * 0.4})`,
              }}
            />
          ))}
          {/* 가로 글리치 라인 */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: `${Math.random() * 80}%`,
              left: 0,
              right: 0,
              height: '2px',
              background: getRandomColor(),
              opacity: 0.8,
              transform: `translateX(${(Math.random() - 0.5) * 30}px)`,
            }}
          />
          {/* 색상 플래시 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `${getRandomColor()}30`,
              mixBlendMode: 'overlay',
            }}
          />
          {/* 노이즈 버스트 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              opacity: 0.3,
              mixBlendMode: 'overlay',
            }}
          />
        </>
      )}

      {/* 메인 텍스트 */}
      <span
        className="relative z-10 flex items-center gap-2"
        style={{
          transform: isGlitching 
            ? `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 2}px) skewX(${(Math.random() - 0.5) * 3}deg)` 
            : 'none',
          textShadow: isHovering ? '0 0 8px currentColor' : 'none',
        }}
      >
        {children}
      </span>

      {/* 글로우 테두리 */}
      {isHovering && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 ${10 + glitchIntensity * 10}px rgba(244, 114, 182, 0.3), 0 0 ${15 + glitchIntensity * 15}px rgba(244, 114, 182, 0.4)`,
          }}
        />
      )}
    </motion.button>
  );
}
