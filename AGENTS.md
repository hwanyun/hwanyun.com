# HWANYUN site — operating rules

Read this file before changing or deploying the site.

## Source of truth and branches

- Repository: `hwanyun/hwanyun.com`; Cloudflare Pages deploys GitHub changes.
- Begin ordinary edits from the latest `origin/draft`; commit and push only to `draft` while work is in progress.
- Use `review/<topic>` only when HWANYUN asks for a shareable Cloudflare Pages review build.
- Merge an approved batch to `main` only when HWANYUN explicitly asks for a live release.
- Do not treat a local server, `www.hwanyun.com`, or an old hashed `*.pages.dev` URL as the current release. Verify the deployment associated with the newest `main` commit.
- Do not read GitHub commit status checks as deployment truth. Cloudflare Pages does not report status back to GitHub, so successful deploys stay `pending` (confirmed 2026-08). Use the wrangler command in the checklist instead.

## Required release checklist

1. Preserve unrelated local work; first compare the current worktree with `origin/draft` and `origin/main`.
2. Run `npm run build` and confirm `dist/` has no file larger than 25 MiB.
3. Before a Cloudflare Pages review or production build, inspect Cloudflare Usage/Billing. At 80% of a free allowance, or when usage is unavailable, stop and ask HWANYUN before deploying.
4. After deployment, find the released commit with `npx wrangler pages deployment list --project-name hwanyun-com` — take the row where `Environment` is `Production`, `Branch` is `main`, and `Source` is the commit you pushed. If that row is missing, the build is still running; re-run the command.
5. Open that row's deployment URL and verify the changed content and referenced media there.

## Media

- Keep images and video files up to 25 MiB in `public/`.
- Videos over 25 MiB belong in the public R2 bucket and must be referenced by HTTPS URL in the relevant content Markdown file.
- Current R2 development base URL: `https://pub-d135883c0c1a4e13a4907d51d88bf5cf.r2.dev`.
- Never commit R2 credentials, API tokens, or private bucket URLs.

For the detailed rationale and current migration state, read `CLOUDFLARE_R2_MIGRATION.md`; for deployment verification, read `PROJECT_CONTEXT.md`.
