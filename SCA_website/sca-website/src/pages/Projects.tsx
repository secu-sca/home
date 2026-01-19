import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Folder, Search } from 'lucide-react';
import ProjectCard from '../components/projects/ProjectCard';
import TagFilter from '../components/projects/TagFilter';
import { DolphinIcon } from '../components/common/DolphinIcon';
import projectsData from '../data/projects.json';
import { Project } from '../types';

const projects = projectsData as Project[];

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.2 } 
  },
};

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 모든 태그 추출 (중복 제거)
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  // 필터링된 프로젝트
  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((p) => p.tags.includes(selectedTag));
  }, [selectedTag]);

  // 날짜순 정렬 (최신순)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
          className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Code className="w-48 h-48" style={{ color: 'var(--color-primary)' }} />
        </motion.div>
        <motion.div
          className="absolute right-10 bottom-10 opacity-10 pointer-events-none -scale-x-100"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <DolphinIcon size={100} />
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
              <Folder className="w-10 h-10" style={{ color: 'var(--color-primary)' }} />
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="gradient-text-animated">Projects</span>
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            💻 SCA 부원들이 직접 개발한 <span className="gradient-text font-semibold">보안 관련 프로젝트</span>들입니다.
          </motion.p>
        </div>
      </motion.section>

      {/* 태그 필터 */}
      <motion.section
        className="py-8"
        style={{ borderBottom: '1px solid var(--color-border)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-custom">
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
              <Search className="w-4 h-4" />
              태그로 필터링:
            </span>
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
            />
          </div>
        </div>
      </motion.section>

      {/* 프로젝트 목록 */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {sortedProjects.length > 0 ? (
              <motion.div
                key={selectedTag || 'all'}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
              >
                {sortedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    custom={index}
                    layout
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <DolphinIcon size={80} className="mx-auto mb-4 opacity-50" />
                </motion.div>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  해당 태그의 프로젝트가 없습니다.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
