# HWANYUN — 포트폴리오 사이트

ayoungkim.com/wp 형식(메뉴가 그리드 첫 칸, 가변폭 메이슨리)을 재현한 **Astro 정적 사이트**.
작품은 **관리자 화면(/admin)** 또는 마크다운 파일로 추가하며, 추가하면 홈·Sound·상세 페이지가 자동 생성된다.

## 로컬 실행
```bash
cd site
npm install     # 최초 1회
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 파일 생성
```

## 구조
```
site/
├─ src/
│  ├─ content/works/*.md   ← 작품 데이터 (1작품 = 1파일)
│  ├─ content/config.ts     ← 작품 필드 스키마
│  ├─ components/WorkGrid.astro  ← 홈/사운드 메이슨리
│  ├─ layouts/Base.astro    ← 공통 메뉴·스타일
│  └─ pages/                ← index / sound / bio / works/[slug]
└─ public/
   ├─ admin/                ← 관리자 UI (Sveltia CMS)
   └─ images/               ← 업로드 이미지
```

## 작품 추가하는 두 가지 방법

### A) 관리자 화면 (코드 안 만짐, 권장)
1. 배포 후 `사이트주소/admin` 접속
2. GitHub 로그인 → "작품" 컬렉션 → **New 작품**
3. 제목·연도·매체·카드크기·이미지 입력 후 Publish
4. 자동으로 저장소에 커밋되고 사이트가 다시 빌드됨

### B) 파일 직접 추가
`src/content/works/새작품.md` 생성:
```markdown
---
title: "작품 제목"
year: "2026"
medium: "Interactive installation"
size: 3col          # 1col | 2col | 3col (홈 카드 폭)
category: work       # work | sound
order: 0             # 작을수록 홈 앞쪽
thumb: /images/thumb.jpg
textEn: |            # 세부 페이지 영문 설명 (선택)
  English description...
textKr: |            # 세부 페이지 국문 설명 (선택)
  국문 설명...
media:               # 세부 페이지 이미지·영상 (순서대로 흐름)
  - { type: video, src: "https://youtu.be/XXXX", width: full, ratio: "16:9", caption: "Doc" }
  - { type: image, src: "/images/a.jpg", width: half }
  - { type: image, src: "/images/b.jpg", width: half }
  - { type: image, src: "/images/c.jpg", width: full, caption: "Installation view" }
draft: false
---

추가 설명 (마크다운, 선택).
```

## 필드 의미
| 필드 | 역할 |
|---|---|
| `size` | 홈 카드 폭 (220 / 380 / 540px) |
| `category` | Sound 메뉴 필터 |
| `order` | 홈 배치 순서 |
| `thumb` | 홈 썸네일 (없으면 회색 박스) |
| `textEn` / `textKr` | 세부 페이지 상단 EN/KR 2단 텍스트 |
| `media` | 세부 페이지 이미지·영상 블록 (아래 참고) |
| `draft` | true면 사이트에서 숨김 |

### media 블록
레퍼런스처럼 이미지·영상을 폭을 달리하며 편집적으로 배치한다.
| 옵션 | 값 | 설명 |
|---|---|---|
| `type` | `image` / `video` | 종류 |
| `src` | 경로 또는 URL | 이미지 경로, 또는 YouTube·Vimeo·mp4 URL(일반 링크 그대로 붙여도 자동 임베드) |
| `width` | `full` / `half` / `third` | 전체폭 / 반폭 / 1/3폭 (반·1/3폭은 옆으로 나란히 흐름) |
| `ratio` | `16:9` `4:3` `1:1` `21:9` | **영상 비율** — 고르면 화면에 맞게 자동 크기 |
| `caption` | 텍스트 | 캡션(선택) |

## 배포 (무료, Netlify 예시)
1. 이 폴더를 GitHub 저장소로 push
2. Netlify에서 저장소 연결 → Build command `npm run build`, Publish dir `dist`
3. `public/admin/config.yml`의 `repo: OWNER/REPO`를 실제 저장소로 수정
4. GitHub OAuth 앱 연결 (관리자 로그인용) — Netlify/Sveltia 문서 참고
5. 커스텀 도메인 `www.hwanyun.com` 연결 → `astro.config.mjs`의 `site`도 맞추기

## 관리자 로컬 테스트
`public/admin/config.yml`에서 `local_backend: true` 주석 해제 후:
```bash
npx @sveltia/cms proxy   # 별도 터미널
npm run dev
# http://localhost:4321/admin 접속 (로그인 없이 로컬 파일 편집)
```
