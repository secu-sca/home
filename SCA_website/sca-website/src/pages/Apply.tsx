import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchButton from '../components/common/GlitchButton';
import InteractiveCard from '../components/common/InteractiveCard';
import { DolphinIcon } from '../components/common/DolphinIcon';
import { ChevronDown, ChevronUp, Calendar, Clock, CheckCircle, Rocket, HelpCircle } from 'lucide-react';
import { FAQ } from '../types';

// 지원서 링크 (플레이스홀더)
const APPLY_LINK = '[여기에_구글폼_링크]';

const faqs: FAQ[] = [
  {
    question: '지원 자격이 어떻게 되나요?',
    answer:
      '세명컴퓨터고등학교 스마트보안솔루션과 1, 2학년 학생이라면 누구나 지원할 수 있습니다. 보안에 대한 관심과 열정이 가장 중요합니다.',
  },
  {
    question: '프로그래밍을 못해도 지원할 수 있나요?',
    answer:
      '네, 가능합니다. 기초적인 프로그래밍 지식이 있으면 좋지만, 열정과 배우려는 의지가 더 중요합니다. 입부 후 기초부터 함께 배울 수 있습니다.',
  },
  {
    question: '활동 시간은 어떻게 되나요?',
    answer:
      '주 2회(화, 금) 방과 후 정기 활동이 있습니다. 대회 기간이나 프로젝트 진행 시에는 추가 모임이 있을 수 있습니다.',
  },
  {
    question: '선발 과정은 어떻게 되나요?',
    answer:
      '지원서 제출 → 서류 검토 → 면접 → 최종 발표 순으로 진행됩니다. 면접에서는 지원 동기와 보안에 대한 관심도를 확인합니다.',
  },
  {
    question: '회비가 있나요?',
    answer:
      '별도의 회비는 없습니다. 다만 외부 대회 참가 시 교통비 등은 개인 부담일 수 있습니다.',
  },
];

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

export default function Apply() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const requirements = [
    '보안/해킹에 대한 관심과 열정',
    '책임감 있는 활동 참여 의지',
    '팀원과의 협업 능력',
    '새로운 것을 배우려는 자세',
  ];

  return (
    <div className="pt-20 relative">
      {/* 히어로 섹션 */}
      <motion.section
        className="section-padding relative overflow-hidden"
        style={{ background: 'var(--color-surface-elevated)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* 배경 돌고래들 */}
        <motion.div
          className="absolute -right-20 top-10 opacity-10 pointer-events-none"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <DolphinIcon size={200} />
        </motion.div>
        <motion.div
          className="absolute left-10 bottom-10 opacity-10 pointer-events-none -scale-x-100"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <DolphinIcon size={120} />
        </motion.div>

        <div className="container-custom text-center relative z-10">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(192, 132, 252, 0.2))',
                border: '2px solid var(--color-border)',
              }}
            >
              <Rocket className="w-10 h-10" style={{ color: 'var(--color-primary)' }} />
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="gradient-text-animated">Join SCA</span>
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            🐬 SCA와 함께 <span className="gradient-text font-semibold">사이버 보안의 바다</span>를 헤엄쳐보세요!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlitchButton href={APPLY_LINK} size="lg">
              🚀 지원서 작성하기
            </GlitchButton>
          </motion.div>
        </div>
      </motion.section>

      {/* 모집 일정 */}
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
            <Calendar className="inline-block w-8 h-8 mr-2" style={{ color: 'var(--color-primary)' }} />
            모집 일정
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <InteractiveCard glowColor="rgba(244, 114, 182, 0.3)">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(192, 132, 252, 0.2))',
                      }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Calendar className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    </motion.div>
                    <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                      지원 기간
                    </h3>
                  </div>
                  <p className="gradient-text font-medium">
                    2026년 3월 2일 ~ 3월 15일
                  </p>
                </InteractiveCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <InteractiveCard glowColor="rgba(192, 132, 252, 0.3)">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.2), rgba(244, 114, 182, 0.2))',
                      }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Clock className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                    </motion.div>
                    <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                      면접 일정
                    </h3>
                  </div>
                  <p className="gradient-text font-medium">
                    2026년 3월 18일 ~ 3월 20일
                  </p>
                </InteractiveCard>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 지원 자격 */}
      <motion.section
        className="section-padding"
        style={{ background: 'var(--color-surface-elevated)' }}
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
            <DolphinIcon size={32} className="inline-block mr-2" />
            이런 분을 찾습니다
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300"
                  style={{
                    background: 'var(--color-surface)',
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
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                  </motion.div>
                  <span style={{ color: 'var(--color-text)' }}>{req}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
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
            <HelpCircle className="inline-block w-8 h-8 mr-2" style={{ color: 'var(--color-primary)' }} />
            자주 묻는 질문
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border)',
                  }}
                  variants={itemVariants}
                  whileHover={{ 
                    borderColor: openFaq === index ? 'var(--color-primary)' : 'var(--color-border)',
                  }}
                >
                  <motion.button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                    whileHover={{ backgroundColor: 'rgba(244, 114, 182, 0.05)' }}
                  >
                    <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                      ) : (
                        <ChevronDown className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                      )}
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="section-padding"
        style={{ background: 'var(--color-surface-elevated)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container-custom text-center">
          <motion.div
            className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.1), rgba(192, 132, 252, 0.1))',
              border: '1px solid var(--color-border)',
            }}
            variants={itemVariants}
            whileHover={{
              boxShadow: '0 0 60px rgba(244, 114, 182, 0.2)',
            }}
          >
            {/* 배경 돌고래 */}
            <motion.div
              className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-20"
              animate={{ x: [0, 20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <DolphinIcon size={120} />
            </motion.div>
            <motion.div
              className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-20 -scale-x-100"
              animate={{ x: [0, -20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <DolphinIcon size={120} />
            </motion.div>

            <motion.div className="relative z-10" variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                🐬 준비되셨나요?
              </h2>
              <p className="mb-8" style={{ color: 'var(--color-text-muted)' }}>
                핑크 돌고래들과 함께 보안 전문가로의 첫 걸음을 시작하세요!
              </p>
              <GlitchButton href={APPLY_LINK} variant="primary" size="lg">
                📝 지원서 작성하기
              </GlitchButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
