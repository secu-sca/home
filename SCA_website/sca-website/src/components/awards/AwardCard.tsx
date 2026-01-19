import { Award } from '../../types';
import { Trophy, Calendar, Mic, Bug, GraduationCap, Medal, Award as AwardIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveCard from '../common/InteractiveCard';

interface AwardCardProps {
  award: Award;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'awards': return Medal;
    case 'presentation': return Mic;
    case 'vulnerability': return Bug;
    case 'certification': return GraduationCap;
    default: return Trophy;
  }
};

const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'awards':
      return {
        bg: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
        color: '#fbbf24',
        border: 'rgba(251, 191, 36, 0.4)',
        glow: 'rgba(251, 191, 36, 0.3)',
      };
    case 'presentation':
      return {
        bg: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(59, 130, 246, 0.2))',
        color: '#60a5fa',
        border: 'rgba(96, 165, 250, 0.4)',
        glow: 'rgba(96, 165, 250, 0.3)',
      };
    case 'vulnerability':
      return {
        bg: 'linear-gradient(135deg, rgba(248, 113, 113, 0.2), rgba(239, 68, 68, 0.2))',
        color: '#f87171',
        border: 'rgba(248, 113, 113, 0.4)',
        glow: 'rgba(248, 113, 113, 0.3)',
      };
    case 'certification':
      return {
        bg: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.2))',
        color: '#34d399',
        border: 'rgba(52, 211, 153, 0.4)',
        glow: 'rgba(52, 211, 153, 0.3)',
      };
    default:
      return {
        bg: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(192, 132, 252, 0.2))',
        color: '#f472b6',
        border: 'rgba(244, 114, 182, 0.4)',
        glow: 'rgba(244, 114, 182, 0.3)',
      };
  }
};

export default function AwardCard({ award }: AwardCardProps) {
  const getRankStyle = (rank: string) => {
    if (rank.includes('대상') || rank === '1위') {
      return {
        bg: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
        color: '#fbbf24',
        border: 'rgba(251, 191, 36, 0.4)',
      };
    }
    if (rank.includes('금') || rank === '2위' || rank.includes('최우수')) {
      return {
        bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2))',
        color: '#f59e0b',
        border: 'rgba(245, 158, 11, 0.4)',
      };
    }
    if (rank.includes('은') || rank === '3위') {
      return {
        bg: 'linear-gradient(135deg, rgba(156, 163, 175, 0.2), rgba(107, 114, 128, 0.2))',
        color: '#9ca3af',
        border: 'rgba(156, 163, 175, 0.4)',
      };
    }
    if (rank.includes('동')) {
      return {
        bg: 'linear-gradient(135deg, rgba(234, 88, 12, 0.2), rgba(194, 65, 12, 0.2))',
        color: '#ea580c',
        border: 'rgba(234, 88, 12, 0.4)',
      };
    }
    // CVE, KVE, LVE
    if (rank.includes('CVE') || rank.includes('KVE') || rank.includes('LVE')) {
      return {
        bg: 'linear-gradient(135deg, rgba(248, 113, 113, 0.2), rgba(239, 68, 68, 0.2))',
        color: '#f87171',
        border: 'rgba(248, 113, 113, 0.4)',
      };
    }
    // 발표, 초청
    if (rank === '발표' || rank === '초청') {
      return {
        bg: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(59, 130, 246, 0.2))',
        color: '#60a5fa',
        border: 'rgba(96, 165, 250, 0.4)',
      };
    }
    // 합격
    if (rank === '합격') {
      return {
        bg: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.2))',
        color: '#34d399',
        border: 'rgba(52, 211, 153, 0.4)',
      };
    }
    return {
      bg: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(236, 72, 153, 0.2))',
      color: '#f472b6',
      border: 'rgba(244, 114, 182, 0.4)',
    };
  };

  const rankStyle = getRankStyle(award.rank);
  const categoryStyle = getCategoryStyle(award.category);
  const CategoryIcon = getCategoryIcon(award.category);

  return (
    <InteractiveCard glowColor={categoryStyle.glow}>
      {/* 상단 - 카테고리 아이콘 & 랭크 */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ 
            background: categoryStyle.bg,
          }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <CategoryIcon className="w-6 h-6" style={{ color: categoryStyle.color }} />
        </motion.div>
        <motion.span
          className="px-3 py-1.5 text-sm font-bold rounded-lg"
          style={{
            background: rankStyle.bg,
            color: rankStyle.color,
            border: `1px solid ${rankStyle.border}`,
          }}
          whileHover={{ scale: 1.05 }}
        >
          {award.rank}
        </motion.span>
      </div>

      {/* 제목 */}
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
        {award.title}
      </h3>

      {/* 대회명/기관명 */}
      {award.competition && (
        <p className="text-sm mb-2 gradient-text">
          {award.competition}
        </p>
      )}

      {/* 상/상금 */}
      {award.prize && (
        <p className="text-sm mb-2" style={{ color: '#fbbf24' }}>
          🏅 {award.prize}
        </p>
      )}

      {/* 설명 */}
      {award.description && (
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          {award.description}
        </p>
      )}

      {/* 메타 정보 */}
      {award.date && (
        <div 
          className="flex flex-wrap items-center gap-4 pt-4 text-xs"
          style={{ 
            borderTop: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
          }}
        >
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ color: 'var(--color-primary)' }}
          >
            <Calendar className="w-3.5 h-3.5" />
            {award.date}
          </motion.div>
        </div>
      )}
    </InteractiveCard>
  );
}
