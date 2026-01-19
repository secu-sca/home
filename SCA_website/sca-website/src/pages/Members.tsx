import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import MemberCard from '../components/members/MemberCard';
import { DolphinIcon } from '../components/common/DolphinIcon';
import membersData from '../data/members.json';
import { Member } from '../types';

const members = membersData as Member[];

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.2 } 
  },
};

export default function Members() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  const grades = [3, 2, 1];

  const filteredMembers = selectedGrade
    ? members.filter((m) => m.grade === selectedGrade)
    : members;

  const getMembersByGrade = (grade: number) =>
    filteredMembers.filter((m) => m.grade === grade);

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
          className="absolute left-10 top-20 opacity-10 pointer-events-none"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <DolphinIcon size={100} />
        </motion.div>
        <motion.div
          className="absolute right-10 bottom-10 opacity-10 pointer-events-none -scale-x-100"
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <DolphinIcon size={80} />
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
              <Users className="w-10 h-10" style={{ color: 'var(--color-primary)' }} />
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="gradient-text-animated">Members</span>
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            🐬 SCA를 이끌어가는 열정적인 <span className="gradient-text font-semibold">핑크 돌고래들</span>을 소개합니다.
          </motion.p>
        </div>
      </motion.section>

      {/* 필터 */}
      <motion.section
        className="py-8"
        style={{ borderBottom: '1px solid var(--color-border)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            <motion.button
              onClick={() => setSelectedGrade(null)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: selectedGrade === null 
                  ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                  : 'var(--color-surface-elevated)',
                color: selectedGrade === null ? 'white' : 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(244, 114, 182, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              전체 ({members.length})
            </motion.button>
            {grades.map((grade) => (
              <motion.button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: selectedGrade === grade 
                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                    : 'var(--color-surface-elevated)',
                  color: selectedGrade === grade ? 'white' : 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(244, 114, 182, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {grade}학년 ({members.filter(m => m.grade === grade).length})
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 멤버 목록 */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {grades.map((grade) => {
              const gradeMembers = getMembersByGrade(grade);
              if (gradeMembers.length === 0) return null;

              return (
                <motion.div
                  key={`grade-${grade}-${selectedGrade}`}
                  className="mb-12 last:mb-0"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                >
                  <motion.h2
                    className="text-2xl font-bold mb-6 flex items-center gap-3"
                    style={{ color: 'var(--color-text)' }}
                    variants={itemVariants}
                  >
                    <motion.span
                      className="w-2 h-8 rounded-full"
                      style={{ background: 'linear-gradient(180deg, var(--color-primary), var(--color-secondary))' }}
                      whileHover={{ scale: 1.2 }}
                    />
                    {grade}학년
                    <span className="text-sm font-normal" style={{ color: 'var(--color-text-muted)' }}>
                      ({gradeMembers.length}명)
                    </span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🐬
                    </motion.span>
                  </motion.h2>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                  >
                    {gradeMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        variants={itemVariants}
                        custom={index}
                        layout
                      >
                        <MemberCard member={member} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
