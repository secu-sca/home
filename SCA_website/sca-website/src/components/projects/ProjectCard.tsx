import { Github, ExternalLink, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import InteractiveCard from '../common/InteractiveCard';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <InteractiveCard glowColor="rgba(244, 114, 182, 0.3)" className="overflow-hidden">
      {/* 썸네일 (선택적) */}
      {project.image ? (
        <motion.div 
          className="h-40 -mx-6 -mt-6 mb-4 overflow-hidden"
          style={{ background: 'var(--color-surface)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ) : (
        <motion.div 
          className="h-32 -mx-6 -mt-6 mb-4 flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.1), rgba(192, 132, 252, 0.1))',
          }}
          whileHover={{ scale: 1.02 }}
        >
          <Code className="w-12 h-12" style={{ color: 'var(--color-primary)', opacity: 0.5 }} />
        </motion.div>
      )}

      {/* 제목 */}
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
        {project.title}
      </h3>

      {/* 설명 */}
      <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
        {project.description}
      </p>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <motion.span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium rounded-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.15), rgba(192, 132, 252, 0.15))',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-border)',
            }}
            whileHover={{ scale: 1.05 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* 참여 멤버 */}
      <div className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
        <span className="gradient-text font-medium">참여:</span> {project.members.join(', ')}
      </div>

      {/* 링크 */}
      <div 
        className="flex items-center gap-4 pt-4"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            whileHover={{ scale: 1.05, color: 'var(--color-primary)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4" />
            코드 보기
          </motion.a>
        )}
        {project.demo && (
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            whileHover={{ scale: 1.05, color: 'var(--color-primary)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
            데모 보기
          </motion.a>
        )}
      </div>

      {/* 날짜 */}
      <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>
        🗓 {project.date}
      </p>
    </InteractiveCard>
  );
}
