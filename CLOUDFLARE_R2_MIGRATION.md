# Cloudflare Pages + R2 migration guide

This repository is an Astro static portfolio site for HWANYUN. GitHub (`main`) is the source of truth. Claude Code should follow this document when adding media or maintaining deployment.

> [!IMPORTANT]
> ## Cost-safety rule — notify before any free allowance is exceeded
>
> **Before the account reaches any Cloudflare free allowance, stop and notify HWANYUN. Do not continue automatically.** This applies to R2 storage, R2 Class A/B operations, Cloudflare Pages builds, and any other metered Cloudflare service.
>
> Before uploading media, activating a service, or starting a deployment, check the current Cloudflare Usage/Billing screen. If usage is near the free allowance (use 80% as the warning threshold), report the current usage, the free allowance, and the possible overage price in chat and wait for explicit approval. Never enable auto-recharge or authorize overage billing without explicit approval.
>
> If usage cannot be checked, treat it as unknown and pause the operation. A successful upload or build is not proof that it is free.

## Why large videos use R2

Cloudflare Pages has a 25 MiB limit for one static asset. Keep images and smaller videos in `public/`; store videos larger than 25 MiB in a Cloudflare R2 public bucket and reference their HTTPS URLs from the content files.

Current files that exceed the Pages asset limit:

- `public/videos/atypical-circuit.mp4` — approximately 43 MB
- `public/videos/coexistence-3.mp4` — approximately 61 MB

The remaining videos are currently below 25 MiB and can stay in `public/videos/` unless a later upload exceeds the limit.

## One-time Cloudflare setup

1. Create an R2 bucket (for example `hwanyun-media`).
2. Upload the two large MP4 files, preserving these object names:
   - `videos/atypical-circuit.mp4`
   - `videos/coexistence-3.mp4`
3. Enable a public R2 URL or connect a custom media domain such as `media.hwanyun.com`.
4. Copy the final public base URL. Do not commit API tokens or private bucket credentials.
5. In Cloudflare Pages, connect `hwanyun/hwanyun.com` and use:
   - Production branch: `main`
   - Build command: `npm run build`
   - Output directory: `dist`

Before clicking any subscription, activation, or billing button, confirm the current free allowance and overage terms with HWANYUN. The current R2 free allowance is 10GB storage per month, plus free Class A and Class B operation allowances; the exact live limits and prices must be checked in the Cloudflare dashboard before each billing-sensitive action.

## Content update after R2 is ready

Replace only the `src` values for the two large videos in the relevant Markdown content files. Example:

```yaml
- type: video
  src: "https://media.hwanyun.com/videos/atypical-circuit.mp4"
```

Do not remove the local MP4 files until the R2 URLs have been tested in a Cloudflare Pages preview. After verification, the local copies may be removed in a separate commit to keep the Git repository smaller.

## Normal workflow

1. Add or edit files locally.
2. Check Cloudflare Usage/Billing and apply the cost-safety rule above.
3. Run `npm run build` and check the generated `dist/` output.
4. Confirm every file in `public/` is under 25 MiB; large videos belong in R2.
5. Commit and push to `main`.
6. Cloudflare Pages automatically builds a preview and then production from `main`.
7. Verify the page and all media URLs before considering the change complete.

## Media checklist for Claude Code

- Never put an R2 access key, secret, or private URL in the repository.
- Never let usage silently approach or exceed a free allowance: check first, warn at 80%, and pause for approval.
- If a free allowance is projected to be exceeded, notify HWANYUN before the upload/build and include the estimated overage risk.
- Do not enable auto-recharge, add a paid plan, or accept overage billing without a fresh explicit approval.
- Preserve existing media order and captions unless the user asks for a layout change.
- Use stable, descriptive object names; do not rename an existing R2 object without updating every Markdown reference.
- For a new video, check its size before committing. Files over 25 MiB must be uploaded to R2 first.
- Keep GitHub as the source for code, Markdown, and small static assets; use R2 only for oversized media.

## Current migration status

- [x] Create the `hwanyun-media` R2 bucket and enable its public development URL
- [x] Upload `videos/atypical-circuit.mp4` (approximately 43 MB)
- [x] Upload `videos/coexistence-3.mp4` (approximately 61 MB)
- [x] Replace the two Markdown references with their R2 URLs
- [x] Deploy and verify the Cloudflare Pages production project at `https://hwanyun-com.pages.dev`
- [ ] Point the production domain to Cloudflare Pages
- [ ] Remove oversized local MP4s only after verification

Current public base URL (development URL):

```text
https://pub-d135883c0c1a4e13a4907d51d88bf5cf.r2.dev
```

The development URL is usable during this migration. Before launching the final public site,
connect a custom media domain such as `media.hwanyun.com` and replace this base URL in the two
Markdown files. Do not commit any R2 API token, Access Key ID, or Secret Access Key.

The two oversized local MP4 files have been removed from GitHub after the R2 URLs and Pages
deployment were verified. Keep the originals archived outside this repository if they are needed
for future re-uploading.
