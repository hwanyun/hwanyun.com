# 배포 가이드 — Cloudflare Pages

이 사이트는 GitHub와 Cloudflare Pages로 운영한다. 이전 Netlify 방식은 폐기되었으며 사용하지 않는다.

## 브랜치 규칙

- `draft`: 여러 컴퓨터에서 안전하게 작업을 동기화하는 기본 작업 브랜치. 자동 Pages 빌드 없음.
- `review/<topic>`: 승인 전 검토용. 필요한 경우에만 Pages 미리보기 빌드를 생성.
- `main`: 승인된 라이브 릴리스 전용. Cloudflare Pages 프로덕션 배포가 실행됨.

## 일반 작업

1. `origin/draft`를 기준으로 작업한다.
2. 콘텐츠는 `src/content/works/*.md` 또는 `src/content/sounds/*.md`에서 수정한다.
3. `npm run build`로 로컬 빌드를 확인한다.
4. 진행 중 변경은 `draft`에 커밋·푸시한다.

## 검토와 라이브 배포

1. Cloudflare Billing/Usage를 열어 Pages와 R2의 현재 사용량을 확인한다.
2. 무료 한도의 80% 이상이거나 사용량을 확인할 수 없으면, 배포를 멈추고 HWANYUN에게 알린다.
3. 검토 요청이 있을 때만 `review/<topic>`을 만들고 Pages URL을 공유한다.
4. HWANYUN이 라이브 배포를 승인하면, 승인된 변경을 `main`에 병합·푸시한다.
5. Cloudflare Pages 상태가 성공인지 확인하고, **해당 최신 커밋에 연결된 URL**에서 실제 페이지와 미디어를 검수한다.

## 대용량 영상

Cloudflare Pages의 정적 파일 한도는 파일당 25 MiB다.

- 25 MiB 이하: `public/`에 둔다.
- 25 MiB 초과: public Cloudflare R2에 업로드하고, 콘텐츠 Markdown의 `media.src`에 HTTPS URL을 넣는다.
- 현재 R2 전환 상태와 URL은 `CLOUDFLARE_R2_MIGRATION.md`를 기준으로 한다.
- R2 액세스 키, API 토큰, private URL은 저장소에 넣지 않는다.

## 빠른 점검

```bash
npm run build
find dist -type f -size +25M -print
```

출력이 없고 Billing 사용량이 안전 범위일 때만 Pages 배포를 진행한다.
