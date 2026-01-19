import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Mic, Bug, GraduationCap, Calendar } from 'lucide-react';
import AwardCard from '../components/awards/AwardCard';
import { DolphinIcon } from '../components/common/DolphinIcon';
import awardsData from '../data/awards.json';
import { Award } from '../types';

const awards = awardsData as Award[];

type CategoryType = 'all' | 'awards' | 'presentation' | 'vulnerability' | 'certification';

const categories: { key: CategoryType; label: string; icon: typeof Trophy; color: string }[] = [
  { key: 'all', label: '전체', icon: Trophy, color: '#f472b6' },
  { key: 'awards', label: '수상', icon: Medal, color: '#fbbf24' },
  { key: 'presentation', label: '발표', icon: Mic, color: '#60a5fa' },
  { key: 'vulnerability', label: '취약점', icon: Bug, color: '#f87171' },
  { key: 'certification', label: '교육', icon: GraduationCap, color: '#34d399' },
];

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' } 
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

export default function Awards() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // 연도 목록 추출
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    awards.forEach(award => {
      const year = award.date.split('-')[0];
      if (year) yearSet.add(year);
    });
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, []);

  // 필터링된 항목
  const filteredAwards = useMemo(() => {
    return awards
      .filter(award => {
        const categoryMatch = selectedCategory === 'all' || award.category === selectedCategory;
        const year = award.date.split('-')[0];
        const yearMatch = selectedYear === 'all' || year === selectedYear;
        return categoryMatch && yearMatch;
      })
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [selectedCategory, selectedYear]);

  // 연도별 그룹화
  const groupedByYear = useMemo(() => {
    const groups: { [key: string]: Award[] } = {};
    filteredAwards.forEach(award => {
      const year = award.date.split('-')[0] || '기타';
      if (!groups[year]) groups[year] = [];
      groups[year].push(award);
    });
    return Object.entries(groups).sort((a, b) => {
      if (a[0] === '기타') return 1;
      if (b[0] === '기타') return -1;
      return Number(b[0]) - Number(a[0]);
    });
  }, [filteredAwards]);

  // 카테고리별 통계
  const stats = useMemo(() => [
    {
      icon: Trophy,
      value: awards.length,
      label: '총 실적',
      color: '#f472b6',
    },
    {
      icon: Medal,
      value: awards.filter(a => a.category === 'awards').length,
      label: '수상',
      color: '#fbbf24',
    },
    {
      icon: Mic,
      value: awards.filter(a => a.category === 'presentation').length,
      label: '발표',
      color: '#60a5fa',
    },
    {
      icon: Bug,
      value: awards.filter(a => a.category === 'vulnerability').length,
      label: '취약점',
      color: '#f87171',
    },
    {
      icon: GraduationCap,
      value: awards.filter(a => a.category === 'certification').length,
      label: '교육',
      color: '#34d399',
    },
  ], []);

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
        {/* 배경 장식 */}
        <motion.div
          className="absolute -right-20 top-10 opacity-10 pointer-events-none"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Trophy className="w-64 h-64" style={{ color: 'var(--color-primary)' }} />
        </motion.div>
        <motion.div
          className="absolute left-10 bottom-10 opacity-10 pointer-events-none"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <DolphinIcon size={100} />
        </motion.div>

        <div className="container-custom text-center relative z-10">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
                border: '2px solid rgba(251, 191, 36, 0.4)',
              }}
            >
              <Trophy className="w-10 h-10" style={{ color: '#fbbf24' }} />
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="gradient-text-animated">Awards & Achievements</span>
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            🏆 SCA가 걸어온 <span className="gradient-text font-semibold">도전과 성취</span>의 기록입니다.
          </motion.p>
        </div>
      </motion.section>

      {/* 통계 */}
      <motion.section
        className="py-12"
        style={{ borderBottom: '1px solid var(--color-border)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 px-8 py-5 rounded-xl transition-all duration-300"
                style={{ 
                  background: 'var(--color-surface-elevated)',
                  border: '1px solid var(--color-border)',
                }}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 0 30px ${stat.color}40`,
                  borderColor: stat.color,
                }}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </motion.div>
                <div>
                  <motion.div
                    className="text-3xl font-bold"
                    style={{ color: stat.color }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 필터 섹션 */}
      <motion.section
        className="py-8 sticky top-16 z-20"
        style={{ 
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          backdropFilter: 'blur(10px)',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-custom">
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                style={{
                  background: selectedCategory === cat.key 
                    ? `linear-gradient(135deg, ${cat.color}30, ${cat.color}20)`
                    : 'var(--color-surface-elevated)',
                  border: `1px solid ${selectedCategory === cat.key ? cat.color : 'var(--color-border)'}`,
                  color: selectedCategory === cat.key ? cat.color : 'var(--color-text-muted)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ 
                    background: `${cat.color}20`,
                    color: cat.color,
                  }}
                >
                  {cat.key === 'all' 
                    ? awards.length 
                    : awards.filter(a => a.category === cat.key).length}
                </span>
              </motion.button>
            ))}
          </div>

          {/* 연도 필터 */}
          <div className="flex flex-wrap justify-center gap-2">
            <motion.button
              onClick={() => setSelectedYear('all')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300"
              style={{
                background: selectedYear === 'all' 
                  ? 'linear-gradient(135deg, rgba(244, 114, 182, 0.3), rgba(192, 132, 252, 0.3))'
                  : 'var(--color-surface-elevated)',
                border: `1px solid ${selectedYear === 'all' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                color: selectedYear === 'all' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-3.5 h-3.5" />
              전체 연도
            </motion.button>
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  background: selectedYear === year 
                    ? 'linear-gradient(135deg, rgba(244, 114, 182, 0.3), rgba(192, 132, 252, 0.3))'
                    : 'var(--color-surface-elevated)',
                  border: `1px solid ${selectedYear === year ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  color: selectedYear === year ? 'var(--color-primary)' : 'var(--color-text-muted)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 수상 목록 */}
      <motion.section
        className="section-padding"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container-custom">
          {/* 결과 요약 */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p style={{ color: 'var(--color-text-muted)' }}>
              총 <span className="gradient-text font-bold text-lg">{filteredAwards.length}</span>개의 실적
            </p>
          </motion.div>

          {/* 연도별 그룹 */}
          <AnimatePresence mode="wait">
            {groupedByYear.map(([year, yearAwards]) => (
              <motion.div 
                key={year}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* 연도 헤더 */}
                <motion.div 
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="px-4 py-2 rounded-lg font-bold text-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(192, 132, 252, 0.2))',
                      border: '1px solid var(--color-primary)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {year === '기타' ? '📅 기타' : `📅 ${year}년`}
                  </div>
                  <div 
                    className="flex-1 h-px"
                    style={{ background: 'linear-gradient(to right, var(--color-primary), transparent)' }}
                  />
                  <span 
                    className="text-sm px-3 py-1 rounded-full"
                    style={{ 
                      background: 'var(--color-surface-elevated)',
                      color: 'var(--color-text-muted)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {yearAwards.length}개
                  </span>
                </motion.div>

                {/* 해당 연도 카드 그리드 */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {yearAwards.map((award, index) => (
                    <motion.div
                      key={award.id}
                      variants={itemVariants}
                      custom={index}
                      layout
                    >
                      <AwardCard award={award} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 결과 없음 */}
          {filteredAwards.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: 'var(--color-text-muted)' }} />
              <p style={{ color: 'var(--color-text-muted)' }}>해당 조건의 실적이 없습니다.</p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
