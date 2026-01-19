import { motion } from 'framer-motion';
import { Mail, Github, MapPin, MessageCircle, Send, Clock } from 'lucide-react';
import InteractiveCard from '../components/common/InteractiveCard';
import { DolphinIcon } from '../components/common/DolphinIcon';
import GlitchButton from '../components/common/GlitchButton';

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

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: '이메일',
      description: '공식 문의 채널',
      value: 'sca@example.com',
      link: 'mailto:sca@example.com',
      color: '#f472b6',
    },
    {
      icon: Github,
      title: 'GitHub',
      description: '프로젝트 및 코드',
      value: 'github.com/sca-smcc',
      link: 'https://github.com',
      color: '#c084fc',
    },
    {
      icon: MessageCircle,
      title: '카카오톡 오픈채팅',
      description: '실시간 질문 및 소통',
      value: 'SCA 오픈채팅방',
      link: 'https://open.kakao.com',
      color: '#fbbf24',
    },
    {
      icon: MapPin,
      title: '위치',
      description: '세명컴퓨터고등학교',
      value: '서울특별시 OO구 OO로 123',
      link: 'https://maps.google.com',
      color: '#60a5fa',
    },
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
        {/* 배경 돌고래 */}
        <motion.div
          className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          animate={{ x: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <DolphinIcon size={200} />
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
              <Send className="w-10 h-10" style={{ color: 'var(--color-primary)' }} />
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="gradient-text-animated">Contact</span>
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            🐬 궁금한 점이 있으시면 언제든 <span className="gradient-text font-semibold">핑크 돌고래들</span>에게 연락해주세요!
          </motion.p>
        </div>
      </motion.section>

      {/* 연락처 카드 */}
      <motion.section
        className="section-padding"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  variants={itemVariants}
                >
                  <InteractiveCard glowColor={`${method.color}40`}>
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ 
                          background: `linear-gradient(135deg, ${method.color}20, ${method.color}10)`,
                          border: `1px solid ${method.color}30`,
                        }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <method.icon className="w-7 h-7" style={{ color: method.color }} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                          {method.title}
                        </h3>
                        <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
                          {method.description}
                        </p>
                        <p className="text-sm font-medium gradient-text">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </InteractiveCard>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 빠른 문의 */}
      <motion.section
        className="section-padding"
        style={{ background: 'var(--color-surface-elevated)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                <Mail className="inline-block w-7 h-7 mr-2" style={{ color: 'var(--color-primary)' }} />
                빠른 문의
              </h2>
              <p className="mb-8" style={{ color: 'var(--color-text-muted)' }}>
                이메일로 문의사항을 보내주시면 빠르게 답변드리겠습니다.
              </p>
              <GlitchButton href="mailto:sca@example.com?subject=[SCA 문의]" size="lg">
                <Mail className="w-5 h-5" />
                이메일 보내기
              </GlitchButton>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 운영 시간 */}
      <motion.section
        className="section-padding"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={itemVariants}>
              <InteractiveCard glowColor="rgba(244, 114, 182, 0.3)" className="text-center">
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(192, 132, 252, 0.2))',
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Clock className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                </motion.div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                  답변 가능 시간
                </h3>
                <div className="space-y-2" style={{ color: 'var(--color-text-muted)' }}>
                  <p>
                    <span className="gradient-text font-medium">평일:</span> 09:00 - 18:00
                  </p>
                  <p>
                    <span className="gradient-text font-medium">주말/공휴일:</span> 휴무
                  </p>
                </div>
                <p className="mt-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  ※ 학교 일정에 따라 답변이 지연될 수 있습니다. 🐬
                </p>
              </InteractiveCard>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
