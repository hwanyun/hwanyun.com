# HWANYUN Project Context

이 문서는 다음 작업자가 현재 프로젝트의 실제 배포본과 콘텐츠 소스를 바로 확인하기 위한 기준 문서입니다.

## 기준 저장소

- Source repository: hwanyun/hwanyun.com
- Default branch: main
- 사이트는 Astro로 만들었고, GitHub 변경사항은 Cloudflare Pages가 배포합니다.

## 실제 최신 배포본 확인

고정된 도메인이나 로컬 개발 서버를 최신 배포본으로 가정하지 않습니다. 항상 최신 main 커밋에 연결된 배포 주소를 확인합니다.

```bash
npx wrangler pages deployment list --project-name hwanyun-com
```

1. 위 명령을 실행한다. 커밋 해시·환경(Production/Preview)·브랜치·배포 URL이 한 표에 나온다.
2. `Environment = Production`, `Branch = main`, `Source`가 방금 올린 커밋 해시인 행을 찾는다.
3. 그 행의 배포 URL이 지금 검증할 대상이다.
4. 그 커밋의 행이 아직 없으면 배포가 진행 중이다. 잠시 뒤 다시 실행한다.

- **GitHub의 Status checks는 이 확인에 쓰지 않는다.** Cloudflare Pages가 커밋 상태를 GitHub에 되보고하지 않아, 배포가 성공해도 `pending`으로 남는다(2026-08 확인). 상태가 pending인 것은 실패의 근거가 아니다. 되살리려면 GitHub → Settings → Applications → Cloudflare Pages에서 Commit statuses 쓰기 권한을 확인해야 하는데, 그 전까지는 위 명령이 유일하게 믿을 수 있는 확인 방법이다.
- www.hwanyun.com은 이 작업의 실제 최신 배포본을 확인하는 기준이 아니라 참고용이다.
- Cloudflare Pages의 Preview URL은 배포마다 바뀔 수 있으므로, 과거 URL을 재사용하지 말고 위 절차로 다시 확인한다.
- 이 문서에는 특정 배포 커밋이나 URL을 고정해 적지 않는다. 매 릴리스마다 위 명령으로 최신 `main` 커밋에 연결된 URL을 다시 확인한다.

## 콘텐츠 데이터 위치

- 작품: src/content/works/*.md
- 사운드: src/content/sounds/*.md
- 각 Markdown 파일의 frontmatter가 작품 카드와 상세 페이지의 텍스트, 미디어, 순서 등을 결정한다.
- 운영/배포 참고 문서: DEPLOY_GUIDE.md, WORK_MEDIA_GUIDE.md, CLOUDFLARE_R2_MIGRATION.md

## 메인 페이지 파티클 인트로

- 구현 위치: `src/pages/index.astro`
- 메인 페이지 최상단에는 캔버스 기반의 3D 파티클 구체가 한 화면 높이로 배치된다. 입자는 지구본처럼 한 방향으로 회전하며, 외곽 실루엣은 원형으로 유지한다.
- 포인터가 구체 안으로 들어오면 입자가 `HWANYUN` 글자로 모이고, 구체 밖으로 이동하면 다시 회전하는 점군으로 돌아간다.
- 인트로 아래에는 기존 `WorkGrid current="home"`을 그대로 둔다. 작품 그리드, 사이드 메뉴, 작품 순서와 콘텐츠를 이 효과 때문에 변경하지 않는다.
- 이 효과는 외부 미디어나 라이브러리에 의존하지 않는다. 파티클의 밀도·밝기·회전 속도를 조정할 때에도 원형 실루엣과 구체적인 깊이감을 우선 유지한다.

## 작업 및 검증 순서

1. 변경 대상 Markdown 파일과 연결된 이미지/영상 경로를 확인한다.
2. 로컬 작업본이 원격보다 오래됐을 수 있으므로, 기존 미반영 변경을 보존한 채 원격 main의 최신 상태를 확인한다.
3. 변경을 커밋한 뒤 Cloudflare Pages 상태가 성공인지 확인한다.
4. 해당 커밋의 Preview URL을 열어 홈 카드와 상세 페이지가 의도대로 표시되는지 검증한다.

이 순서를 따르면 로컬 화면, 참고 사이트, 이전 Preview URL을 최신 배포본으로 혼동하지 않는다.
