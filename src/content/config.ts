import { defineCollection, z } from "astro:content"

// 작품 컬렉션 — 관리자 UI(Sveltia CMS)가 이 스키마대로 폼을 생성한다.
const works = defineCollection({
  type: "content", // 본문(마크다운)은 선택적 부가 설명
  schema: z.object({
    title: z.string(),
    year: z.string().optional().default(""),
    medium: z.string().optional().default(""),
    size: z.enum(["1col", "2col", "3col"]).default("2col"),
    category: z.enum(["work", "sound"]).default("work"),
    order: z.number().default(0),
    thumb: z.string().optional().default(""), // 홈 썸네일

    // 세부 페이지 텍스트 (레퍼런스처럼 EN/KR 2단)
    textEn: z.string().optional().default(""),
    textKr: z.string().optional().default(""),

    // 세부 페이지 미디어 — 이미지/영상을 순서대로, 폭을 골라 배치
    media: z
      .array(
        z.object({
          type: z.enum(["image", "video"]).default("image"),
          src: z.string(), // 이미지 경로 또는 영상 URL(YouTube/Vimeo/mp4)
          width: z.enum(["full", "half", "third"]).default("full"),
          ratio: z.enum(["16:9", "4:3", "1:1", "21:9", "9:16"]).default("16:9"), // 영상 비율
          caption: z.string().optional().default(""),
        })
      )
      .optional()
      .default([]),

    draft: z.boolean().optional().default(false),
  }),
})

// 사운드 컬렉션 — SoundCloud 링크 기반 실제 사운드 작업
const sounds = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    year: z.string().optional().default(""),
    url: z.string(), // SoundCloud 트랙/셋 URL
    cover: z.string().optional().default(""), // 그리드 커버 이미지
    size: z.enum(["1col", "2col", "3col"]).default("2col"), // 그리드 카드 폭
    order: z.number().default(0),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { works, sounds }
