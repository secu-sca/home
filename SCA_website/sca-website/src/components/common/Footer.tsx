import { Github, Mail, Heart, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DolphinIcon } from './DolphinIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkHoverVariants = {
    hover: { x: 5, color: 'var(--color-primary)' },
  };

  return (
    <footer 
      className="relative overflow-hidden"
      style={{ 
        background: 'var(--color-surface-elevated)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* 배경 웨이브 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-10 left-0 right-0 opacity-5"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Waves className="w-full h-32" style={{ color: 'var(--color-primary)' }} />
        </motion.div>
      </div>

      <div className="container-custom py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 & 소개 */}
          <div className="md:col-span-2">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  y: [0, -3, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <DolphinIcon size={32} />
              </motion.div>
              <span className="text-xl font-bold gradient-text">SCA</span>
            </motion.div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
              세명컴퓨터고등학교 스마트보안솔루션과<br />
              사이버보안 동아리 (Security Cyber Aegis)
            </p>
            <p className="text-sm italic" style={{ color: 'var(--color-primary)' }}>
              "Pink Dolphin, Security First"
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>바로가기</h3>
            <ul className="space-y-3">
              {[
                { to: '/about', label: '동아리 소개' },
                { to: '/projects', label: '프로젝트' },
                { to: '/awards', label: '수상 실적' },
                { to: '/apply', label: '지원하기' },
              ].map((link) => (
                <motion.li key={link.to} whileHover="hover">
                  <motion.div variants={linkHoverVariants}>
                    <Link
                      to={link.to}
                      className="text-sm flex items-center gap-2 transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-primary)' }} />
                      {link.label}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>연락처</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ scale: 1.05, x: 5 }}>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-primary)]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05, x: 5 }}>
                <a
                  href="mailto:sca@example.com"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-primary)]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <Mail className="w-4 h-4" />
                  이메일 문의
                </a>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              © {currentYear} SCA - 세명컴퓨터고등학교 사이버보안 동아리. All rights reserved.
            </p>
            <motion.p 
              className="text-xs flex items-center gap-1"
              style={{ color: 'var(--color-text-muted)' }}
              whileHover={{ scale: 1.05 }}
            >
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 inline" style={{ color: 'var(--color-primary)', fill: 'var(--color-primary)' }} />
              </motion.span>
              {' '}by SCA Members
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
