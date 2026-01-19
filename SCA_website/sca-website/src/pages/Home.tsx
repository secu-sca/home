import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Code, Trophy, Users, Sparkles } from 'lucide-react';
import TerminalHero from '../components/home/TerminalHero';
import GlitchButton from '../components/common/GlitchButton';
import InteractiveCard from '../components/common/InteractiveCard';
import { SwimmingDolphin } from '../components/common/DolphinIcon';

// 지원서 링크 (플레이스홀더)
const APPLY_LINK = '[여기에_구글폼_링크]';

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: '보안 연구',
      description: '웹 해킹, 시스템 보안, 네트워크 보안 등 다양한 분야 연구',
      color: '#f472b6',
    },
    {
      icon: Code,
      title: '프로젝트 개발',
      description: '보안 관련 도구 및 플랫폼 직접 개발',
      color: '#c084fc',
    },
    {
      icon: Trophy,
      title: 'CTF 대회',
      description: '국내외 CTF 대회 참가 및 입상',
      color: '#f472b6',
    },
    {
      icon: Users,
      title: '멘토링',
      description: '선후배 간 지식 공유 및 스터디 운영',
      color: '#c084fc',
    },
  ];

  const stats = [
    { value: '20+', label: '활동 부원', icon: Users },
    { value: '15+', label: '수상 실적', icon: Trophy },
    { value: '10+', label: '프로젝트', icon: Code },
    { value: '3+', label: '년 역사', icon: Sparkles },
  ];

  return (
    <div className="relative">
      {/* 배경 헤엄치는 돌고래 (선택적) */}
      <div className="fixed top-1/4 pointer-events-none z-0 opacity-20">
        <SwimmingDolphin />
      </div>

      {/* 터미널 히어로 섹션 */}
      <TerminalHero onNavigate={navigate} />

      {/* 특징 섹션 */}
      <motion.section
        className="section-padding relative z-10"
        style={{ background: 'var(--color-surface-elevated)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              SCA에서 무엇을 할 수 있나요?
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              다양한 분야에서 보안 전문성을 키울 수 있습니다
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
              >
                <InteractiveCard glowColor={`${feature.color}40`}>
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                      border: `1px solid ${feature.color}30`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <feature.icon 
                      className="w-7 h-7" 
                      style={{ color: feature.color }} 
                    />
                  </motion.div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {feature.description}
                  </p>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 통계 섹션 */}
      <motion.section
        className="section-padding relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(192, 132, 252, 0.2))',
                    border: '1px solid var(--color-border)',
                  }}
                  whileHover={{
                    boxShadow: '0 0 30px rgba(244, 114, 182, 0.4)',
                  }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <p style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 하단 CTA */}
      <motion.section
        className="section-padding relative z-10"
        style={{ background: 'var(--color-surface-elevated)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <motion.div
            className="relative p-8 md:p-12 rounded-2xl overflow-hidden text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.1), rgba(192, 132, 252, 0.1))',
              border: '1px solid var(--color-border)',
            }}
            variants={itemVariants}
            whileHover={{
              boxShadow: '0 0 60px rgba(244, 114, 182, 0.2)',
            }}
          >
            {/* 배경 돌고래들 */}
            <motion.div
              className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-20"
              animate={{ x: [0, 20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* 배경 효과 */}
            </motion.div>

            <motion.div
              className="relative z-10"
              variants={itemVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                핑크 돌고래와 함께할 준비가 되셨나요?
              </h2>
              <p className="mb-8" style={{ color: 'var(--color-text-muted)' }}>
                SCA의 새로운 멤버가 되어 함께 성장해요!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlitchButton href={APPLY_LINK} variant="primary" size="lg">
                  지원하기
                </GlitchButton>
                <GlitchButton onClick={() => navigate('/about')} variant="outline" size="lg">
                  더 알아보기
                </GlitchButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
