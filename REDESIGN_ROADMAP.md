# HWANYUN 사이트 리디자인 로드맵

> 작성: 2026-08-15 · 기준 커밋: `1bb0867` (origin/main)
> 목표: 5년 뒤에도 유효한 시스템 위에, 작품 문법을 인용한 인터랙션을 얹어
> 최고 수준의 작가 포트폴리오와 견주어도 손색없는 사이트를 만든다.

## 방향 (요약)

- 포지셔닝: **"방문자의 존재가 입력 신호가 되는 아카이브."**
  작품 12점의 공통 문법 = 보이지 않는 신호를 감각 가능하게 바꾸는 변환기(transducer).
  사이트의 모든 인터랙션은 이 문법의 인용이어야 한다.
- 원칙 1 — **장식적 인터랙션 금지.** 새 효과마다 "어느 작품의 문법인가"에 답할 것.
  답이 없으면 넣지 않는다. (스크롤 하이재킹, 인트로, 커서 교체, 배경 자동재생 오디오 금지)
- 원칙 2 — **모든 인터랙션은 무시 가능.** 큐레이터는 30초 안에 CV와 대표작을 찾는다.
  `prefers-reduced-motion`이면 전부 꺼지고 깨끗한 아카이브만 남는다.
- 원칙 3 — 콘텐츠는 MD + 스키마가 원본. 표시 레이어는 언제든 갈아끼울 수 있게 유지.

---

## 완료된 작업 (이 브랜치, 미커밋)

- [x] **홈 티커 방향 반전** (우→좌) + 구체 표면 체감 속도 동기화
  - `src/pages/index.astro` — 속도는 `SPEED_FACTOR`(현재 1)로 조절. 낮추면 느려짐 (0.4 권장 검토)
  - 진행 중 전시는 `NOW ON` 태그, 예정은 `UPCOMING`
- [x] **/events 작가 관행 구조** — 진행 중+예정 단일 리스트(진행 중은 `Until …` 표기 + 점 마커),
  지난 일정은 연도별 역순 그룹. 분류는 브라우저에서 오늘 날짜 기준 자동 (재배포 불필요)
  - `src/pages/events/index.astro`

## 보류

- [ ] ~~퍼시스턴트 사운드 플레이어~~ — **보류** (사용자 결정, 2026-08-15)

---

## Phase 1 — 기초 정리 (인터랙션의 선행 조건)

시스템이 흔들리면 그 위의 인터랙션은 유지비만 늘린다. 먼저 한다.

- [x] **1-1. 디자인 토큰 통합** — `src/layouts/Base.astro` `:root`에 정의, 11개 파일 244곳 치환
  - 텍스트 4단계 `--text` / `--text-2` / `--text-3` / `--text-4`
  - 면·선 `--surface` / `--surface-2` / `--line` / `--line-2`
  - 어두운 면(히어로) `--void` / `--void-text` / `--void-text-2` / `--void-label` / `--void-line`
  - 타입 스케일 7단계 `--fs-display` … `--fs-2xs`
  - 의도적으로 남긴 팔레트: `sound.astro` 카테고리 색 7종, `contact.astro` 웜톤 블롭(→ 5-3에서 처리)
- [x] **1-2. 메뉴 단일화** — 3벌 → `src/components/SiteMenu.astro` 하나
  - variant 3종: `page`(일반 페이지) / `hero`(홈 히어로, 데스크톱 숨김) / `grid`(홈 그리드 오버레이, 데스크톱 전용)
  - 스타일은 Base.astro 전역 한 곳, 동작 스크립트도 하나(`.site-menu` 전부에 위임)
  - 검색 차이는 variant로 흡수: `grid`는 `#search` 실시간 필터(WorkGrid 스크립트가 읽음),
    나머지는 `/?q=` 폼 전송. Works 서브메뉴는 id 충돌·중복 렌더 방지를 위해 `grid`에서 제외
  - ~~Search 입력 스타일 통일~~ → 확인 결과 이미 동일(박스형). 불필요
- [x] **1-3. 푸터 연도 자동화** — `2014–{현재연도}`, 브라우저에서 보정하므로 재배포 없이도 정확
- [ ] **1-4. 아카이브 내구성** (디자인과 독립, 병행 가능)
  - [x] ~~SoundCloud 의존 제거~~ — **이미 완료되어 있었음**. 22/22곡이 자체 R2 호스팅이고
    `sounds.url`은 기록 보존용으로만 남아 페이지에서 사용하지 않는다. YouTube/Vimeo 임베드도 0건.
    (앞선 분석에서 낡은 체크아웃의 스키마를 근거로 잘못 지적했던 항목)
  - [x] **`assets.zyrosite.com` 이전 완료** — 저장소 전체 외부 이미지 참조 0건
    - `intuition-ii/` — thumbnail, 01 (원본 `DSC02280.jpg`에서 생성), sponsors/listhus.webp
    - `the-voice-of-stripes/` — 02는 원본 `Live E_edited.jpg`에서 크롭, 03은 원본 무크롭 복사
    - `the-voice-of-stripes/` thumbnail·01은 **라이브 CDN본을 내려받아 사용**.
      원본 `_MG_6580-1.jpg`는 EXIF상 세로(upper-right)인데 웹빌더에서 상단 와이어 영역만
      16:9로 크롭한 별도 파일이 올라가 있어, 원본에서 기계적으로 재현할 수 없었다.
      더 높은 해상도가 필요하면 5184px 원본에서 같은 프레이밍으로 다시 크롭할 것.
    - 교훈: sips가 보고하는 픽셀 크기는 EXIF 방향을 반영하지 않는다. 이미지 이전 시
      `file`로 orientation을 먼저 확인하고, 회전을 픽셀에 반영한 뒤 EXIF를 제거해야
      브라우저가 이중으로 회전시키지 않는다.
  - [ ] Google Fonts → 셀프호스팅 검토 (외부 요청 0으로)

## Phase 2 — 무음 루프 썸네일 (체류 시간 최대 레버)

작품은 전부 시간 기반인데 썸네일이 정지 이미지 = 작품의 90%를 버리는 표현.
Zimoun 홈의 체류 시간이 여기서 나온다.

- [x] **2-1. `thumbVideo` 필드 추가** — `src/content/config.ts` + `public/admin/config.yml`
- [x] **2-2. WorkGrid 렌더링** — `thumb` 이미지 위에 `<video muted loop playsinline preload="none">`를
  겹치고, 재생이 시작되면 페이드인. 로드 전·실패·reduced-motion에서는 thumb이 그대로 보인다
- [x] **2-3. 루프 클립 3종** (`public/videos/loops/`, 각 4초, 합계 2.3MB)
  - atypical-circuit ← `atypical-circuit-2.mp4` 4.5s~ (형태가 터져 나오는 구간)
  - coexistence ← `coexistence-1.mp4` 9s~ (투사면이 크게 잡힌 구간)
  - conductive-circles ← `conductive-circles-intro.mp4` 18s~ (원형 그리드 = 작품 시그니처)
  - the-voice-of-stripes는 **의도적으로 제외** — 보유 영상이 오실로스코프 화면이라
    설치 사진 썸네일이 더 강하다. 나중에 설치 기록 영상이 생기면 추가할 것
- [x] 성능·접근성 규칙 — `IntersectionObserver`로 뷰포트 밖 정지, 동시 재생 상한
  (데스크톱 6 / 모바일 2), 탭 백그라운드 시 전체 정지, `prefers-reduced-motion`·
  `saveData`·2G에서는 아예 로드하지 않음
- 도구 메모: 이 기기에 `ffmpeg`이 없다. macOS 내장 `avconvert`로 만들었다.
  `avconvert --source X --output Y --preset Preset640x480 --start 4.5 --duration 4 --replace`
  (오디오 트랙 제거 옵션은 없음. 비트레이트 직접 제어도 불가 — 프리셋과 길이로만 조절)

## Phase 3 — 커서 = 센서 (근접 반응 그리드)

기존 호버 글리치(이진 스위치)를 **거리 함수**로 진화.
초음파 센서가 거리를 연속값으로 읽듯이 — Atypical Circuit / Voice of Stripes 인용.

- [ ] **3-1.** 마우스 위치 ↔ 각 카드 중심 거리 계산 → CSS 변수(`--proximity` 0~1)로 주입
- [ ] **3-2.** 글리치 강도·스캔라인 불투명도를 `--proximity`에 비례시켜 점진 반응으로
- [ ] 터치 기기는 기존 호버 동작 유지, reduced-motion이면 완전 정적

## Phase 4 — 재료 회로 내비게이션 (차별화의 핵심)

구리가 12점 중 5점에 등장 — 재료가 작품들을 잇는 실제 그래프다.
어떤 메이저 작가 사이트에도 없는 기능이면서, 재료 중심 사고의 구조화라 완전히 정당하다.
막다른 골목 문제(작품 페이지에서 다음 클릭이 없음)도 이것이 푼다.

- [ ] **4-1. works 스키마에 `materials: string[]` 추가** — 통제 어휘로 시작:
  `copper`, `sensor`, `sound`, `hanji`, `3d-pen`, `light`, `conductive-ink`, `video`, `polycarbonate`
  - 12개 작품 MD에 수동 태깅 (medium 문자열에서 추출)
  - CMS(config.yml)에도 select-multiple 위젯 추가
- [ ] **4-2. 작품 상세 페이지** — 재료 표기를 클릭 가능한 태그로
- [ ] **4-3. 재료 뷰** — 태그 클릭 시 같은 재료의 작품들이 가는 구리선 트레이스로 연결된
  뷰로 전환 (`/works?material=copper` 또는 인페이지 필터). SVG 라인 + 기존 그리드 재배치
- [ ] **4-4. 작품 페이지 하단** — "같은 재료의 작품" 내부 링크 (막다른 골목 제거)

## Phase 5 — 그리드 ↔ 필드 토글 + 방문의 흔적

- [ ] **5-1. Works 인덱스 뷰 토글** — 정연한 테이블(현재) ↔ 작품이 입자로 흩어져
  연도·재료 축으로 재정렬되는 필드 뷰. 홈 구체의 입자 시스템 재사용 (같은 언어의 확장)
- [ ] **5-2. 방문의 흔적** — 시아노타입(감광지) 인용: 본 작품이 그리드에서 미묘하게
  "노출된 흔적"(살짝 다른 톤)을 남김. `sessionStorage`, 세션 한정
- [ ] **5-3. Contact 블롭 교체** — 크림색 라디얼 블롭을 입자 언어로 재해석 (톤 통일 마무리)

---

## 페이즈 공통 완료 기준

1. `astro build` 통과
2. 데스크톱 + 모바일(700px) 스크린샷 검증
3. `prefers-reduced-motion: reduce`에서 정적 아카이브로 완전 폴백
4. 새 hex 색상·font-size 추가 금지 — Phase 1 토큰만 사용
5. 커밋 전 임시 테스트 데이터(`zztmp-*`) 제거 확인

## 참고

- 로컬 dev: `node node_modules/astro/astro.js dev --port 4330`
  (node는 `~/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`)
- 패키지 매니저: pnpm (`pnpm-lock.yaml` 커밋 여부 결정 필요 — 기존 `package-lock.json`과 중복)
- 벤치마크 근거: Zimoun(움직이는 썸네일·Next Exhibitions 단일 리스트), Ikeda(메타데이터 규율),
  Bernier(Until 날짜 표기), Nicolai(연도 아카이브), Anadol(반면교사 — 스펙터클 과잉)
- 배포 검증 절차는 `PROJECT_CONTEXT.md` 기준
