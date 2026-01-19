import { Target, BookOpen, Users, Clock, Code, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveCard from '../components/common/InteractiveCard';
import { DolphinIcon } from '../components/common/DolphinIcon';

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const activities = [
    {
      icon: Shield,
      title: '웹 해킹',
      description: 'OWASP Top 10, SQL Injection, XSS 등 웹 취약점 분석 및 모의해킹',
      color: '#f472b6',
    },
    {
      icon: Code,
      title: '리버스 엔지니어링',
      description: '바이너리 분석, 악성코드 분석, 크래킹 기법 연구',
      color: '#c084fc',
    },
    {
      icon: Target,
      title: '디지털 포렌식',
      description: '메모리 덤프 분석, 파일시스템 분석, 네트워크 포렌식',
      color: '#f472b6',
    },
    {
      icon: BookOpen,
      title: '암호학',
      description: '대칭키/비대칭키 암호, 해시 함수, 암호 분석',
      color: '#c084fc',
    },
  ];

  const schedule = [
    { day: '매주 화요일', content: '정기 스터디 (웹 해킹, 리버싱 등)' },
    { day: '매주 금요일', content: 'CTF 연습 및 워게임 풀이' },
    { day: '월 1회', content: '외부 CTF 대회 참가' },
    { day: '방학 중', content: '집중 프로젝트 및 합숙' },
  ];

  const goals = [
    {
      icon: Target,
      title: '실무 중심 교육',
      description: '이론보다 실습을 통해 실제 보안 업무에 필요한 기술을 습득합니다.',
    },
    {
      icon: Users,
      title: '협업과 성장',
      description: '선후배 간 멘토링과 팀 프로젝트를 통해 함께 성장합니다.',
    },
    {
      icon: BookOpen,
      title: '대회 참가',
      description: '국내외 CTF 대회에 적극 참가하여 실력을 검증합니다.',
    },
  ];

  return (
    <div className="pt-20 relative">
      {/* 히어로 섹션 */}
      <motion.section
        className="section-padding relative overflow-hidden"
        style={{ background: 'var(--color-surface-elevated)' }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* 배경 돌고래 */}
        <motion.div
          className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          animate={{ x: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <DolphinIcon size={300} />
        </motion.div>

        <div className="container-custom text-center relative z-10">
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <DolphinIcon size={80} />
            </motion.div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="gradient-text-animated">About SCA</span>
          </motion.h1>
          <motion.p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
            variants={itemVariants}
          >
            SCA(Security Cyber Academy)는 세명컴퓨터고등학교 스마트보안솔루션과의
            <br />
            <span className="gradient-text font-semibold">사이버보안 전문 동아리</span>입니다.
          </motion.p>
        </div>
      </motion.section>

      {/* 목표 섹션 */}
      <motion.section
        className="section-padding"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                <Sparkles className="inline-block w-8 h-8 mr-2" style={{ color: 'var(--color-primary)' }} />
                우리의 목표
              </h2>
              <div className="space-y-5">
                {goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300"
                    style={{ 
                      background: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-border)',
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      borderColor: 'var(--color-primary)',
                      boxShadow: '0 0 20px rgba(244, 114, 182, 0.2)',
                    }}
                    variants={itemVariants}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(192, 132, 252, 0.2))',
                      }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <goal.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                        {goal.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {goal.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 터미널 스타일 미션 */}
            <motion.div variants={itemVariants}>
              <InteractiveCard glowColor="rgba(244, 114, 182, 0.3)">
                <div className="font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div style={{ color: 'var(--color-terminal-prompt)' }}>
                    <span className="gradient-text">sca@dolphin</span>
                    <span>:</span>
                    <span style={{ color: 'var(--color-primary)' }}>~</span>
                    <span>$ cat mission.txt</span>
                  </div>
                  <motion.div
                    className="mt-4 leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="mb-4">
                      🐬 우리는 사이버 세계를 더 안전하게 만들기 위해 존재합니다.
                    </p>
                    <p className="mb-4">
                      호기심에서 시작하여 전문성으로 발전하고,
                      개인의 성장이 팀의 성장으로 이어지는 문화를 만들어갑니다.
                    </p>
                    <motion.p
                      className="gradient-text font-semibold"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      "핑크 돌고래처럼 자유롭게, 보안의 바다를 헤엄치다"
                    </motion.p>
                  </motion.div>
                </div>
              </InteractiveCard>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 활동 분야 */}
      <motion.section
        className="section-padding"
        style={{ background: 'var(--color-surface-elevated)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              <DolphinIcon size={36} className="inline-block mr-3" />
              활동 분야
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              다양한 사이버보안 분야를 탐구하고 연구합니다
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <motion.div key={index} variants={itemVariants} custom={index}>
                <InteractiveCard glowColor={`${activity.color}40`}>
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${activity.color}20, ${activity.color}10)`,
                      border: `1px solid ${activity.color}30`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <activity.icon className="w-7 h-7" style={{ color: activity.color }} />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                    {activity.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {activity.description}
                  </p>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 운영 방식 */}
      <motion.section
        className="section-padding"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: 'var(--color-text)' }}
            variants={itemVariants}
          >
            <Clock className="inline-block w-8 h-8 mr-2" style={{ color: 'var(--color-primary)' }} />
            운영 방식
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300"
                  style={{ 
                    background: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border)',
                  }}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'var(--color-primary)',
                    boxShadow: '0 0 25px rgba(244, 114, 182, 0.15)',
                  }}
                >
                  <motion.div
                    className="flex items-center gap-2 min-w-[140px]"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-sm font-medium gradient-text">
                      {item.day}
                    </span>
                  </motion.div>
                  <span style={{ color: 'var(--color-text)' }}>{item.content}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
