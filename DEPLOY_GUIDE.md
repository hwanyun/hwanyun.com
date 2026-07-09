# 배포 & 업데이트 가이드 (HWANYUN 사이트)

이 사이트는 **GitHub(코드 저장) + Netlify(무료 호스팅) + Sveltia CMS(관리자 화면)** 조합으로 운영됩니다.
한 번 배포해두면, 이후엔 **관리자 화면에서 폼 입력만으로** 작품·사운드를 추가/수정할 수 있어요.

---

## A. 최초 배포 (한 번만)

### 1) GitHub 저장소 만들기
1. https://github.com 로그인 (계정 없으면 가입)
2. 우측 상단 **＋ → New repository**
3. 이름: `hwanyun-site` (원하는 이름) → **Private** 선택 가능 → **Create repository**
4. 이 `site` 폴더를 그 저장소에 올리기. 터미널에서 `site` 폴더 안에서:
   ```bash
   cd "site 폴더 경로"
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/<내아이디>/hwanyun-site.git
   git push -u origin main
   ```
   > ⚠️ `site` 폴더 자체가 저장소 루트가 되어야 합니다 (안에 package.json, src/, public/ 이 보이도록).

### 2) Netlify로 배포
1. https://app.netlify.com 접속 → GitHub 계정으로 로그인
2. **Add new site → Import an existing project → GitHub → `hwanyun-site` 선택**
3. 빌드 설정 (보통 자동 감지):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Deploy** → 1~2분 후 `랜덤이름.netlify.app` 주소로 사이트가 뜹니다. 여기까지면 사이트는 이미 라이브!

### 3) 관리자 설정에 저장소 연결
`public/admin/config.yml` 파일 6번째 줄을 실제 저장소로 수정:
```yaml
backend:
  name: github
  repo: 내아이디/hwanyun-site   # ← 여기
  branch: main
```
그리고 `astro.config.mjs`의 `site` 값을 최종 주소로 맞춘 뒤 다시 push.

### 4) 관리자 로그인(OAuth) 연결 — 한 번만
관리자 화면(`/admin`)에서 GitHub 로그인이 되려면 인증 중계가 필요해요. 무료 방법:
1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: 내 사이트 주소
   - Authorization callback URL: (아래 워커 주소)/callback
2. Sveltia 공식 무료 인증 워커를 Cloudflare에 배포 (5분):
   👉 https://github.com/sveltia/sveltia-cms-auth  (README의 "Deploy" 버튼)
3. 배포된 워커 주소를 `config.yml` backend에 `base_url`로 추가:
   ```yaml
   backend:
     name: github
     repo: 내아이디/hwanyun-site
     branch: main
     base_url: https://내워커주소.workers.dev
   ```
> 이 단계가 번거로우면, 아래 **업데이트 방법 2번(GitHub에서 직접)**을 쓰면 OAuth 없이도 됩니다.

### 5) 도메인 연결 (hwanyun.com)
Netlify → **Domain settings → Add custom domain → `www.hwanyun.com`** →
안내되는 DNS 레코드(CNAME/A)를 도메인 등록업체에 입력. `astro.config.mjs`의 `site`도 `https://www.hwanyun.com`으로.

---

## B. 앞으로 업데이트하는 방법

### 방법 1 — 관리자 화면 (권장, 코드 안 만짐)
1. 브라우저에서 `내사이트주소/admin` 접속 → GitHub 로그인
2. 좌측에서 **작품(Works)** 또는 **사운드(Sound)** 선택
3. **New** 버튼 → 폼 작성:
   - **작품**: 제목·연도·매체·카드크기·홈썸네일·세부 이미지/영상·설명
   - **사운드**: 제목·SoundCloud 주소·커버·카드크기
4. 우측 상단 **Publish** → 자동으로 GitHub에 저장되고 **1~2분 뒤 사이트에 반영**
- 순서 바꾸기: 각 항목의 **순서(order)** 숫자 (작을수록 앞)
- 잠시 숨기기: **비공개(draft)** 켜기

### 방법 2 — GitHub에서 직접 (OAuth 설정 없이)
1. github.com 의 내 저장소에서 `src/content/works/` (또는 `sounds/`) 폴더로 이동
2. 기존 `.md` 파일을 복사하거나 **Add file → Create new file** 로 새 파일 작성
   (형식은 아래 "작품 파일 예시" 참고)
3. 이미지는 `public/images/작품이름/` 폴더에 **Add file → Upload files** 로 업로드
4. **Commit** → Netlify가 자동으로 다시 빌드 → 반영

### 방법 3 — 내 컴퓨터에서 미리보기하며 편집
```bash
cd site
npm install      # 최초 1회
npm run dev       # http://localhost:4321 에서 확인하며 편집
```
편집 후 `git add . && git commit -m "update" && git push` 하면 반영.

---

## 작품 파일 예시 (`src/content/works/새작품.md`)
```markdown
---
title: "작품 제목"
year: "2026"
medium: "Interactive installation"
size: 3col            # 1col | 2col | 3col (홈 카드 폭)
category: work
order: 0              # 작을수록 홈 앞쪽
thumb: /images/새작품/01.jpg
textEn: |
  English description (선택)
textKr: |
  국문 설명 (선택)
media:
  - { type: image, src: /images/새작품/01.jpg, width: full }
  - { type: image, src: /images/새작품/02.jpg, width: half }
  - { type: video, src: "https://youtu.be/XXXX", width: full, ratio: "16:9" }
draft: false
---
```

## 사운드 파일 예시 (`src/content/sounds/새트랙.md`)
```markdown
---
title: "트랙 제목"
year: ""
url: "https://soundcloud.com/hwanyun/트랙주소"
cover: /images/sounds/새트랙.jpg
size: 2col
order: 10
draft: false
---
```

---

## 요약
- **사진/트랙 추가** → 관리자 화면(`/admin`)에서 폼 입력 → Publish → 자동 반영
- **큰 구조·디자인 변경**이 필요하면 그때 다시 도움 요청
- 배포는 GitHub push 또는 관리자 Publish → Netlify가 알아서 다시 빌드
