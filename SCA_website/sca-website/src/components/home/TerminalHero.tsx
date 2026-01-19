import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalLine } from '../../types';

// ============================================
// 돌고래 ASCII 아트 - 우아하게 헤엄치며 점프하는 애니메이션
// ============================================
const DOLPHIN_FRAMES = [
  // Frame 1: 물속에서 헤엄치는 중
  `
                                               _
                                          _.-~~.)
                _.--~~~~~---....__  .' . .,'
              ,'. . . . . . . . . .~- ._ (
             ( .. .o. . . . . . . . . . .~-._
          .~__.-~    ~\`. . . . . . . . . . . -.
          \`----..._      ~-=~~-. . . . . . . . ~-.
                    ~-._   \`-._ ~=_~~--. . . . . .~.
                     | .~-.._  ~--._-.    ~-. . . . ~-.
                      \\ .(   ~~--.._~'       \`. . . . .~-.
                       \`._\\         ~~--.._    \`. . . . . ~-.
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         ~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~`,
  // Frame 2: 수면 가까이
  `
                                           _
                                      _.-~~.)
            _.--~~~~~---....__  .' . .,'
          ,'. . . . . . . . . .~- ._ (
         ( .. .o. . . . . . . . . . .~-._
      .~__.-~    ~\`. . . . . . . . . . . -.
      \`----..._      ~-=~~-. . . . . . . . ~-.
                ~-._   \`-._ ~=_~~--. . . . . .~.
                 | .~-.._  ~--._-.    ~-. . . . ~-.
                  \\ .(   ~~--.._~'       \`. . . . .~-.
                   \`._\\         ~~--.._    \`. . . . . ~-.
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         ~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~`,
  // Frame 3: 수면 위로 점프!
  `
                                       _
                                  _.-~~.)
        _.--~~~~~---....__  .' . .,'
      ,'. . . . . . . . . .~- ._ (
     ( .. .o. . . . . . . . . . .~-._
  .~__.-~    ~\`. . . . . . . . . . . -.
  \`----..._      ~-=~~-. . . . . . . . ~-.
            ~-._   \`-._ ~=_~~--. . . . . .~.
             | .~-.._  ~--._-.    ~-. . . . ~-.

      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         ~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~`,
  // Frame 4: 공중 최고점
  `
                                   _
                              _.-~~.)
    _.--~~~~~---....__  .' . .,'
  ,'. . . . . . . . . .~- ._ (
 ( .. .o. . . . . . . . . . .~-._
.~__.-~    ~\`. . . . . . . . . . . -.
\`----..._      ~-=~~-. . . . . . . . ~-.
          ~-._   \`-._ ~=_~~--. . . . . .~.


      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         ~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~`,
  // Frame 5: 내려오기 시작 (머리 아래로)
  `

                                   _.~~-._
                               _.-~       ~-._
                            .-~   .o.         ~-.
                          ,~                    ~.
                        .~                        ~.
                       /                            \\
                      ;              ___.            ;
                      ;         _.--~   ~--.___     ;
      ~~~~~~~~~~~~~~~~~\\~~~~~~~'~~~~~~~~~~~~~~~~~~~~/~~~~~
         ~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~`,
  // Frame 6: 다이빙 중 (꼬리가 위로)
  `


                                      /\\
                                     /  \\
                                    /    \\
                                   ;   o  ;
                                  ;        ;
                                 /          \\
      ~~~~~~~~~~~~~~~~~~~~~~~~~~;~~~~~~~~~~~~\\~~~~~~~~~~~~
         ~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~`,
  // Frame 7: 물속으로 들어가기
  `



                                       /\\
                                      /  \\
                                     /    \\
                                    /      \\
                                   /
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~/~~~~~~~~~~~~~~~~~~~~~~~~~~~
         ~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~`,
  // Frame 8: 완전히 물속 (물방울만)
  `


                                    o  o
                                  o      o
                                    o  o
                                      o


      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         ~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~`,
];

// 큰 돌고래 ASCII 아트 (화면 중앙 표시용)
const BIG_DOLPHIN = `
                                           _
                                      _.-~~.)
            _.--~~~~~---....__  .' . .,'
          ,'. . . . . . . . . .~- ._ (
         ( .. .o. . . . . . . . . . .~-._
      .~__.-~    ~\`. . . . . . . . . . . -.
      \`----..._      ~-=~~-. . . . . . . . ~-.
                ~-._   \`-._ ~=_~~--. . . . . .~.
                 | .~-.._  ~--._-.    ~-. . . . ~-.
                  \\ .(   ~~--.._~'       \`. . . . .~-.
                   \`._\\         ~~--.._    \`. . . . . ~-.

                  ~ SCA Pink Dolphin ~
`;

// 도움말 텍스트 (순수 ASCII로 정렬 고정)
const HELP_TEXT = `
+----------------------------------------------------------+
|  SCA Terminal v2.0              |
+----------------------------------------------------------+
|  Commands:                                               |
|                                                          |
|  help          ->  Show help                             |
|  whoami        ->  About SCA                             |
|  clear         ->  Clear terminal                        |
|  ls            ->  List pages                            |
|  open apply    ->  Open application form                 |
|  cat about     ->  About the club                        |
|  cat awards    ->  Award history                         |
|  cat projects  ->  Project list                          |
|  cd [page]     ->  Navigate to page                      |
|                                                          |
+----------------------------------------------------------+`;

const WHOAMI_TEXT = `
+----------------------------------------------------------+
|                                                          |
|     ####   ####    ##                                    |
|    ##     ##  ##  ####                                   |
|     ###   ##      ## ##                                  |
|       ##  ##  ##  ######                                 |
|    ####    ####   ##   ##                                |
|                                                          |
|                                                          |
|                                                          |
|    Semyung Computer High School                          |
|    Smart Security Solution                               |
|                                                          |
|                                                          |
|    Security Cyber Aegis                                  |
|    "Pink Dolphin, Security First"                        |
|                                                          |
+----------------------------------------------------------+
`;

const LS_TEXT = `
/pages
├── about      - 동아리 소개
├── members    - 부원 소개  
├── awards     - 수상 실적
├── projects   - 프로젝트
├── apply      - 지원하기
└── contact    - 연락처`;

const CAT_ABOUT_TEXT = `
=== SCA 동아리 소개 ===

SCA(Security Cyber Aegis)는 세명컴퓨터고등학교 
스마트보안솔루션과의 사이버보안 전문 동아리입니다.

목표:
- 실무 중심의 보안 기술 습득
- CTF 대회 참가 및 입상
- 보안 프로젝트 개발 및 연구

활동 분야:
- 웹 해킹 & 모의침투
- 리버스 엔지니어링
- 디지털 포렌식
- 네트워크 보안
- 암호학

마스코트: 핑크 돌고래`;

const CAT_AWARDS_TEXT = `
=== 수상 실적 (Recent) ===

2025-11 | 정보보안 경진대회 대상
2025-09 | Cyber Guardians CTF 2위
2025-08 | 화이트햇 콘테스트 장려상
2025-06 | 정보올림피아드 은상
2025-05 | 교내 해킹방어대회 1위`;

const CAT_PROJECTS_TEXT = `
=== 프로젝트 목록 ===

- SCA CTF Platform      [웹개발, CTF, 보안]
- Vulnerability Scanner [Python, 보안, 자동화]
- Network Packet Analyzer [네트워크, Python]
- Forensic Toolkit      [포렌식, Python]
- Secure Chat App       [암호학, React]
- Phishing Detection    [JavaScript, 보안]`;

const APPLY_LINK = '[여기에_구글폼_링크]';

interface TerminalHeroProps {
  onNavigate?: (path: string) => void;
}

export default function TerminalHero({ onNavigate }: TerminalHeroProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 0, type: 'output', content: 'SCA Terminal v2.0' },
    { id: 1, type: 'output', content: '"help"를 입력하여 명령어를 확인해주세요!\n' },
  ]);
  const [input, setInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<string | null>(null);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [pendingWhoami, setPendingWhoami] = useState(false);
  const [showDolphinFullscreen, setShowDolphinFullscreen] = useState(false);
  const [savedHistory, setSavedHistory] = useState<TerminalLine[]>([]);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lineIdRef = useRef(2);
  const animationRef = useRef<number | null>(null);

  // 터미널 스크롤 자동 이동
  useEffect(() => {
    if (terminalRef.current && !isAnimating) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isAnimating]);

  // whoami 애니메이션 완료 후 텍스트 표시 및 히스토리 복원
  useEffect(() => {
    if (pendingWhoami && !isAnimating) {
      // 저장된 히스토리 복원 + whoami 결과 추가
      setHistory([
        ...savedHistory, 
        { id: lineIdRef.current++, type: 'ascii-art', content: BIG_DOLPHIN },
        { id: lineIdRef.current++, type: 'ascii-art', content: WHOAMI_TEXT }
      ]);
      setPendingWhoami(false);
      setShowDolphinFullscreen(false);
    }
  }, [pendingWhoami, isAnimating, savedHistory]);

  // 돌고래 점프 애니메이션 (화면 중앙에서 점프)
  const runDolphinAnimation = useCallback(() => {
    // 현재 히스토리 저장
    setSavedHistory(history);
    
    // 화면 클리어 (돌고래만 표시)
    setShowDolphinFullscreen(true);
    setIsAnimating(true);
    setAnimationType('dolphin');
    setAnimationFrame(0);
    
    let frame = 0;
    const totalFrames = DOLPHIN_FRAMES.length;
    
    const animate = () => {
      frame = frame + 1;
      setAnimationFrame(frame % totalFrames);
      
      // 1회 완주 후 종료 (8프레임)
      if (frame >= totalFrames) {
        setIsAnimating(false);
        setAnimationType(null);
        return;
      }
      
      animationRef.current = window.setTimeout(animate, 300) as unknown as number;
    };
    
    animationRef.current = window.setTimeout(animate, 300) as unknown as number;
  }, [history]);

  // 애니메이션 정리
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const addLine = useCallback((type: TerminalLine['type'], content: string) => {
    setHistory(prev => [...prev, { id: lineIdRef.current++, type, content }]);
  }, []);

  const handleCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (isAnimating) return;

    // whoami는 특별 처리 (히스토리 저장 후 애니메이션)
    if (trimmedCmd === 'whoami') {
      const newHistory = [...history, { id: lineIdRef.current++, type: 'input' as const, content: `$ ${cmd}` }];
      setSavedHistory(newHistory);
      setHistory(newHistory);
      setPendingWhoami(true);
      runDolphinAnimation();
      return;
    }

    addLine('input', `$ ${cmd}`);

    switch (trimmedCmd) {
      case 'help':
        addLine('output', HELP_TEXT);
        break;

      case 'clear':
        setHistory([]);
        lineIdRef.current = 0;
        break;

      case 'ls':
        addLine('output', LS_TEXT);
        break;

      case 'open apply':
        addLine('output', '지원서 페이지를 새 탭에서 엽니다...');
        window.open(APPLY_LINK, '_blank');
        break;

      case 'cat about':
        addLine('output', CAT_ABOUT_TEXT);
        break;

      case 'cat awards':
        addLine('output', CAT_AWARDS_TEXT);
        break;

      case 'cat projects':
        addLine('output', CAT_PROJECTS_TEXT);
        break;

      case '':
        break;

      default:
        if (trimmedCmd.startsWith('cd ')) {
          const path = trimmedCmd.replace('cd ', '').trim();
          if (['about', 'members', 'awards', 'projects', 'apply', 'contact'].includes(path)) {
            addLine('output', `/${path} 페이지로 이동합니다...`);
            if (onNavigate) {
              setTimeout(() => onNavigate(`/${path}`), 500);
            }
          } else {
            addLine('error', `bash: cd: ${path}: No such directory`);
          }
        } else {
          addLine('error', `bash: ${trimmedCmd}: command not found. "help"를 입력해보세요.`);
        }
    }
  }, [addLine, isAnimating, onNavigate, runDolphinAnimation]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-4xl">
        {/* 터미널 헤더 */}
        <motion.div 
          className="flex items-center gap-2 px-4 py-3 rounded-t-xl border border-b-0"
          style={{ 
            background: 'var(--color-surface-elevated)',
            borderColor: 'var(--color-border)',
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
          </div>
          <span className="ml-4 text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
            sca@pink-dolphin:~
          </span>
        </motion.div>

        {/* 터미널 바디 */}
        <motion.div
          ref={terminalRef}
          className="terminal relative h-[400px] md:h-[500px] overflow-y-auto overflow-x-hidden p-4 rounded-b-xl cursor-text"
          onClick={focusInput}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            boxShadow: '0 0 60px rgba(244, 114, 182, 0.2), inset 0 0 60px rgba(244, 114, 182, 0.05)',
          }}
        >
          {/* 돌고래 풀스크린 애니메이션 (whoami) */}
          <AnimatePresence>
            {showDolphinFullscreen && isAnimating && animationType === 'dolphin' && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center overflow-hidden"
                style={{
                  background: 'var(--color-surface)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* 돌고래 - 헤엄치며 점프하는 애니메이션 */}
                <motion.div
                  className="font-mono"
                  style={{
                    color: 'var(--color-primary)',
                    textShadow: '0 0 15px var(--color-primary-glow), 0 0 30px rgba(244, 114, 182, 0.5)',
                    whiteSpace: 'pre',
                  }}
                >
                  <pre className="text-xs md:text-sm">
                    {DOLPHIN_FRAMES[animationFrame]}
                  </pre>
                </motion.div>

                {/* 로딩 텍스트 */}
                <motion.div
                  className="absolute bottom-6 text-lg font-bold font-mono"
                  style={{ color: 'var(--color-primary)' }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  Loading SCA...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 히스토리 출력 (애니메이션 중이 아닐 때만) */}
          {!showDolphinFullscreen && (
            <div className="space-y-1 relative z-10">
            {history.map((line) => (
              <motion.div
                key={line.id}
                className={`font-mono text-sm md:text-base whitespace-pre-wrap ${
                  line.type === 'input'
                    ? 'text-[var(--color-terminal-prompt)]'
                    : line.type === 'error'
                    ? 'text-red-400'
                    : line.type === 'ascii-art'
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-terminal-text)]'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={line.type === 'ascii-art' ? {
                  textShadow: '0 0 10px var(--color-primary-glow)',
                } : {}}
              >
                {line.content}
              </motion.div>
            ))}
          </div>
          )}

          {/* 입력 라인 */}
          {!isAnimating && !showDolphinFullscreen && (
            <div className="flex items-center mt-2 font-mono text-sm md:text-base relative z-10">
              <span style={{ color: 'var(--color-terminal-prompt)' }}>$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input ml-2"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
