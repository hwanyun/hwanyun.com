# Cloudflare Pages + R2 migration guide

This repository is an Astro static portfolio site for HWANYUN. GitHub (`main`) is the source of truth. Claude Code should follow this document when adding media or maintaining deployment.

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

## Content update after R2 is ready

Replace only the `src` values for the two large videos in the relevant Markdown content files. Example:

```yaml
- type: video
  src: "https://media.hwanyun.com/videos/atypical-circuit.mp4"
```

Do not remove the local MP4 files until the R2 URLs have been tested in a Cloudflare Pages preview. After verification, the local copies may be removed in a separate commit to keep the Git repository smaller.

## Normal workflow

1. Add or edit files locally.
2. Run `npm run build` and check the generated `dist/` output.
3. Confirm every file in `public/` is under 25 MiB; large videos belong in R2.
4. Commit and push to `main`.
5. Cloudflare Pages automatically builds a preview and then production from `main`.
6. Verify the page and all media URLs before considering the change complete.

## Media checklist for Claude Code

- Never put an R2 access key, secret, or private URL in the repository.
- Preserve existing media order and captions unless the user asks for a layout change.
- Use stable, descriptive object names; do not rename an existing R2 object without updating every Markdown reference.
- For a new video, check its size before committing. Files over 25 MiB must be uploaded to R2 first.
- Keep GitHub as the source for code, Markdown, and small static assets; use R2 only for oversized media.

## Current migration status

- [ ] Create the R2 bucket and public media URL
- [ ] Upload `atypical-circuit.mp4`
- [ ] Upload `coexistence-3.mp4`
- [ ] Replace Markdown references with the R2 URLs
- [ ] Verify a Cloudflare Pages preview
- [ ] Point the production domain to Cloudflare Pages
- [ ] Remove oversized local MP4s only after verification
