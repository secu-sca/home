import { motion } from 'framer-motion';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export default function TagFilter({ tags, selectedTag, onSelectTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <motion.button
        onClick={() => onSelectTag(null)}
        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        style={{
          background: selectedTag === null 
            ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
            : 'var(--color-surface-elevated)',
          color: selectedTag === null ? 'white' : 'var(--color-text-muted)',
          border: '1px solid var(--color-border)',
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(244, 114, 182, 0.3)' }}
        whileTap={{ scale: 0.95 }}
      >
        전체
      </motion.button>
      {tags.map((tag) => (
        <motion.button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
          style={{
            background: selectedTag === tag 
              ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
              : 'var(--color-surface-elevated)',
            color: selectedTag === tag ? 'white' : 'var(--color-text-muted)',
            border: '1px solid var(--color-border)',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(244, 114, 182, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          {tag}
        </motion.button>
      ))}
    </div>
  );
}
