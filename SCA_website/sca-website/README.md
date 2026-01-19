# SCA 웹사이트

세명컴퓨터고등학교 스마트보안솔루션과 **SCA(사이버보안 동아리)** 공식 웹사이트입니다.

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM 6
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/          # 공통 컴포넌트 (Navbar, Footer, 등)
│   ├── home/            # 홈 페이지 전용 컴포넌트
│   ├── members/         # 멤버 관련 컴포넌트
│   ├── projects/        # 프로젝트 관련 컴포넌트
│   └── awards/          # 수상 관련 컴포넌트
├── pages/               # 페이지 컴포넌트
├── data/                # JSON 데이터 파일
├── hooks/               # 커스텀 훅
├── types/               # TypeScript 타입 정의
└── styles/              # 글로벌 스타일
```

## 🚀 시작하기

### 설치

```bash
cd sca-website
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프리뷰 (빌드된 버전)

```bash
npm run preview
```

## 📝 데이터 수정 방법

### 부원 정보 수정
`src/data/members.json` 파일을 수정하세요.

```json
{
  "id": "m1",
  "name": "홍길동",
  "role": "부원",
  "grade": 1,
  "field": "웹 보안",
  "description": "소개 문구",
  "github": "https://github.com/username",
  "email": "email@example.com"
}
```

### 수상 실적 수정
`src/data/awards.json` 파일을 수정하세요.

### 프로젝트 수정
`src/data/projects.json` 파일을 수정하세요.

## 🎨 커스터마이징

### 지원서 링크 변경
다음 파일들에서 `[여기에_구글폼_링크]`를 실제 링크로 변경하세요:
- `src/components/home/TerminalHero.tsx`
- `src/pages/Home.tsx`
- `src/pages/Apply.tsx`

### GitHub Pages 배포 설정
`vite.config.ts`에서 `base` 값을 실제 레포지토리 이름으로 변경하세요:

```typescript
export default defineConfig({
  base: '/your-repo-name/',  // 실제 레포지토리 이름으로 변경
  // ...
})
```

## 🚀 GitHub Pages 배포

### 방법 1: GitHub Actions (자동 배포)
1. 레포지토리 Settings > Pages로 이동
2. Source를 "GitHub Actions"로 설정
3. main 브랜치에 push하면 자동 배포

### 방법 2: 수동 배포
```bash
npm run deploy
```

## ✨ 주요 기능

- **터미널 UI**: 인터랙티브 가짜 터미널 (명령어: help, whoami, ls, clear 등)
- **돌고래 애니메이션**: whoami 명령 시 ASCII 돌고래가 헤엄침
- **글리치 버튼**: 클릭 시 글리치 효과 후 동작 실행
- **다크/라이트 모드**: CSS 변수 기반 테마 전환
- **반응형 디자인**: 모바일/태블릿/데스크탑 대응
- **태그 필터**: 프로젝트 태그 기반 필터링

## 📄 라이선스

© 2026 SCA - 세명컴퓨터고등학교 사이버보안 동아리. All rights reserved.
