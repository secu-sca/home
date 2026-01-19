// 멤버 타입 정의
export interface Member {
  id: string;
  name: string;
  role: string;
  grade: 1 | 2 | 3;
  field: string;
  description?: string;
  github?: string;
  email?: string;
}

// 수상 실적 타입 정의
export interface Award {
  id: string;
  title: string;
  competition: string;
  date: string;
  rank: string;
  category: 'awards' | 'presentation' | 'vulnerability' | 'certification';
  description?: string;
  prize?: string;
  organizer?: string;
}

// 프로젝트 타입 정의
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  image?: string;
  github?: string;
  demo?: string;
  members: string[];
}

// FAQ 타입 정의
export interface FAQ {
  question: string;
  answer: string;
}

// 터미널 히스토리 타입
export interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'ascii-art' | 'error';
  content: string;
}

// 테마 타입
export type Theme = 'dark' | 'light';
