import { getCollection } from "astro:content"
import type { APIRoute } from "astro"

// 검색엔진에 사이트의 전체 지도를 준다 — 크롤러가 링크를 따라가며 추측하게
// 두지 않고, 어떤 페이지가 존재하는지 직접 선언한다. 외부 패키지 없이
// 정적 엔드포인트로 생성하므로 빌드 환경에 아무것도 추가하지 않는다.
const SITE = "https://www.hwanyun.com"

export const GET: APIRoute = async () => {
  const works = await getCollection("works", ({ data }) => !data.draft)
  const events = await getCollection("events", ({ data }) => !data.draft)

  const staticPaths = [
    "/",
    "/works/",
    "/sound/",
    "/events/",
    "/prototypes/",
    "/about/",
    "/about/ko/",
    "/cv/",
    "/cv/ko/",
    "/contact/",
  ]

  const urls = [
    ...staticPaths,
    ...works.map((w) => `/works/${w.slug}/`),
    ...events.map((e) => `/events/${e.slug}/`),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join("\n")}
</urlset>
`
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
