import { motion } from 'framer-motion';

interface DolphinIconProps {
  className?: string;
  size?: number;
}

// 핑크 돌고래 SVG 아이콘
export function DolphinIcon({ className = '', size = 24 }: DolphinIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* 돌고래 몸통 */}
      <motion.path
        d="M12 32C12 32 16 24 28 24C40 24 48 28 52 32C48 36 40 40 28 40C16 40 12 32 12 32Z"
        fill="url(#dolphinGradient)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      {/* 돌고래 머리 */}
      <motion.path
        d="M48 32C48 32 54 30 58 32C54 34 48 32 48 32Z"
        fill="url(#dolphinGradient)"
      />
      {/* 돌고래 지느러미 (위) */}
      <motion.path
        d="M30 24L34 16L38 24"
        fill="url(#dolphinGradient)"
      />
      {/* 돌고래 꼬리 */}
      <motion.path
        d="M12 32L6 26L8 32L6 38L12 32Z"
        fill="url(#dolphinGradient)"
      />
      {/* 눈 */}
      <circle cx="50" cy="31" r="2" fill="#0c0a14" />
      {/* 배 (밝은 부분) */}
      <motion.path
        d="M20 34C20 34 24 36 32 36C40 36 44 34 44 34C44 34 40 38 32 38C24 38 20 34 20 34Z"
        fill="rgba(255,255,255,0.3)"
      />
      <defs>
        <linearGradient id="dolphinGradient" x1="6" y1="32" x2="58" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f472b6" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

// 헤엄치는 돌고래 애니메이션
export function SwimmingDolphin({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ position: 'absolute', left: 0 }}
      animate={{
        x: [-100, window.innerWidth + 100],
        y: [0, -20, 0, 20, 0],
        rotate: [0, -5, 0, 5, 0],
      }}
      transition={{
        x: { duration: 15, repeat: Infinity, ease: 'linear' },
        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <DolphinIcon size={48} />
    </motion.div>
  );
}

// 돌고래 로고 (네비게이션용) - SCA_Icon.png 이미지 사용
export function DolphinLogo({ className = '', size = 40 }: DolphinIconProps) {
  const basePath = import.meta.env.BASE_URL || '/';
  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <motion.img 
        src={`${basePath}SCA_Icon.png`}
        alt="SCA Logo"
        style={{ width: size, height: size }}
        animate={{
          y: [0, -3, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <span className="text-xl font-bold gradient-text">SCA</span>
    </motion.div>
  );
}
