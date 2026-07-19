# HWANYUN Project Context

이 문서는 다음 작업자가 현재 프로젝트의 실제 배포본과 콘텐츠 소스를 바로 확인하기 위한 기준 문서입니다.

## 기준 저장소

- Source repository: hwanyun/hwanyun.com
- Default branch: main
- 사이트는 Astro로 만들었고, GitHub 변경사항은 Cloudflare Pages가 배포합니다.

## 실제 최신 배포본 확인

고정된 도메인이나 로컬 개발 서버를 최신 배포본으로 가정하지 않습니다. 항상 GitHub의 최신 main 커밋에서 배포 주소를 확인합니다.

1. GitHub 저장소에서 main의 최신 커밋을 연다.
2. Status checks를 열고 Cloudflare Pages - Deployed successfully를 확인한다.
3. Details를 열어 Preview URL을 연다.
4. 해당 URL이 지금 배포된 검증 대상이다.

- www.hwanyun.com은 이 작업의 실제 최신 배포본을 확인하는 기준이 아니라 참고용이다.
- Cloudflare Pages의 Preview URL은 배포마다 바뀔 수 있으므로, 과거 URL을 재사용하지 말고 위 절차로 다시 확인한다.
- 이 문서를 작성한 시점의 배포 커밋은 cc5c87c이며, Cloudflare Pages 상태는 성공이었다.

## 콘텐츠 데이터 위치

- 작품: src/content/works/*.md
- 사운드: src/content/sounds/*.md
- 각 Markdown 파일의 frontmatter가 작품 카드와 상세 페이지의 텍스트, 미디어, 순서 등을 결정한다.
- 운영/배포 참고 문서: DEPLOY_GUIDE.md, WORK_MEDIA_GUIDE.md, CLOUDFLARE_R2_MIGRATION.md

## 작업 및 검증 순서

1. 변경 대상 Markdown 파일과 연결된 이미지/영상 경로를 확인한다.
2. 로컬 작업본이 원격보다 오래됐을 수 있으므로, 기존 미반영 변경을 보존한 채 원격 main의 최신 상태를 확인한다.
3. 변경을 커밋한 뒤 Cloudflare Pages 상태가 성공인지 확인한다.
4. 해당 커밋의 Preview URL을 열어 홈 카드와 상세 페이지가 의도대로 표시되는지 검증한다.

이 순서를 따르면 로컬 화면, 참고 사이트, 이전 Preview URL을 최신 배포본으로 혼동하지 않는다.
