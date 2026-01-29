import { Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Member } from '../../types';
import InteractiveCard from '../common/InteractiveCard';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const getRoleStyle = (role: string) => {
    switch (role) {
      case '부장':
        return {
          bg: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(245, 158, 11, 0.2))',
          color: '#fbbf24',
          border: 'rgba(250, 204, 21, 0.4)',
          glow: 'rgba(250, 204, 21, 0.3)',
        };
      case '부부장':
        return {
          bg: 'linear-gradient(135deg, rgba(192, 132, 252, 0.2), rgba(168, 85, 247, 0.2))',
          color: '#c084fc',
          border: 'rgba(192, 132, 252, 0.4)',
          glow: 'rgba(192, 132, 252, 0.3)',
        };
      default:
        return {
          bg: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(236, 72, 153, 0.2))',
          color: '#f472b6',
          border: 'rgba(244, 114, 182, 0.4)',
          glow: 'rgba(244, 114, 182, 0.3)',
        };
    }
  };

  const roleStyle = getRoleStyle(member.role);

  return (
    <InteractiveCard glowColor={roleStyle.glow}>
      {/* 상단 - 아바타 & 정보 */}
      <div className="flex items-start gap-4">
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
          style={{ 
            background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(192, 132, 252, 0.2))',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-border)',
          }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {member.name.charAt(0)}
        </motion.div>
        <div className="flex-1">
          <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
            {member.name}
          </h3>
          <motion.span
            className="inline-block mt-1 px-2.5 py-1 text-xs font-medium rounded-lg"
            style={{
              background: roleStyle.bg,
              color: roleStyle.color,
              border: `1px solid ${roleStyle.border}`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            {member.role}
          </motion.span>
        </div>
      </div>

      {/* 분야 */}
      <div className="mt-4">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>분야</span>
        <p className="text-sm font-medium gradient-text">{member.field}</p>
      </div>

      {/* 설명 */}
      {member.description && (
        <p 
          className="mt-3 text-sm line-clamp-2"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {member.description}
        </p>
      )}

      {/* 소셜 링크 */}
      <div 
        className="flex items-center gap-3 mt-4 pt-4"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        {member.github && (
          <motion.a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            whileHover={{ scale: 1.2, color: 'var(--color-primary)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </motion.a>
        )}
        {member.email && (
          <motion.a
            href={`mailto:${member.email}`}
            className="transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            whileHover={{ scale: 1.2, color: 'var(--color-primary)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="이메일"
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        )}
      </div>
    </InteractiveCard>
  );
}
