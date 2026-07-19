import { defineCollection, z } from "astro:content"

// 작품 컬렉션 — 관리자 UI(Sveltia CMS)가 이 스키마대로 폼을 생성한다.
const works = defineCollection({
  type: "content", // 본문(마크다운)은 선택적 부가 설명
  schema: z.object({
    title: z.string(),
    year: z.string().optional().default(""),
    medium: z.string().optional().default(""),
    series: z
      .object({
        id: z.string(),
        label: z.string(),
      })
      .optional(),
    size: z.enum(["1col", "2col", "3col"]).default("2col"),
    category: z.enum(["work", "sound"]).default("work"),
    order: z.number().default(0),
    thumb: z.string().optional().default(""), // 홈 썸네일

    // 세부 페이지 텍스트 (레퍼런스처럼 EN/KR 2단)
    textEn: z.string().optional().default(""),
    textKr: z.string().optional().default(""),
    // 작품을 이해하는 데 필요한 공정·용어의 짧은 보충 설명
    processNote: z
      .object({
        label: z.string().optional().default("Process note"),
        textEn: z.string().optional().default(""),
        textKr: z.string().optional().default(""),
      })
      .optional(),
    // 작품이 선보인 전시 정보 — 후원 크레딧과 분리해 표기
    exhibition: z
      .object({
        label: z.string().optional().default("Presented as part of"),
        titleEn: z.string().optional().default(""),
        titleKr: z.string().optional().default(""),
        venue: z.string().optional().default(""),
        year: z.string().optional().default(""),
      })
      .optional(),
    // 인터뷰·비평 등 작품 맥락을 확장하는 외부 읽을거리
    externalLinks: z
      .array(
        z.object({
          label: z.string().optional().default("Further reading"),
          title: z.string(),
          url: z.string(),
        })
      )
      .optional()
      .default([]),
    // 대표 영상·이미지를 설명문보다 먼저 보여야 하는 작품에 사용
    mediaFirst: z.boolean().optional().default(false),

    // 세부 페이지 미디어 — 이미지/영상을 순서대로, 폭을 골라 배치
    media: z
      .array(
        z.object({
          type: z.enum(["image", "video"]).default("image"),
          src: z.string(), // 이미지 경로 또는 영상 URL(YouTube/Vimeo/mp4)
          width: z.enum(["full", "half", "third"]).default("full"),
          layout: z.enum(["hero", "wide", "standard", "detail", "portrait"]).optional(),
          align: z.enum(["left", "right"]).optional(),
          ratio: z.enum(["16:9", "4:3", "1:1", "21:9", "9:16"]).default("16:9"), // 영상 비율
          caption: z.string().optional().default(""),
          noteLabel: z.string().optional().default(""),
          noteEn: z.string().optional().default(""),
          noteKr: z.string().optional().default(""),
        })
      )
      .optional()
      .default([]),

    // 전시 협력·후원 기관 로고 (작품 갤러리와 분리된 크레딧 섹션)
    sponsors: z
      .array(
        z.object({
          name: z.string(),
          logo: z.string(),
          url: z.string().optional().default(""),
        })
      )
      .optional()
      .default([]),

    draft: z.boolean().optional().default(false),
  }),
})

// 사운드 컬렉션 — 자체 재생 가능한 사운드 아카이브
const sounds = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    year: z.string().optional().default(""),
    url: z.string().optional().default(""), // 기존 SoundCloud 기록 보존용 — 페이지에서는 사용하지 않음
    audio: z.string().optional().default(""), // R2 또는 public/의 직접 재생 가능한 오디오 파일
    section: z.enum(["works", "scores", "archive"]).default("archive"),
    project: z.string().optional().default(""), // 여러 버전을 하나의 작업으로 묶는 제목
    works: z.array(z.string()).optional().default([]), // 연결할 작품 slug
    backdrop: z.string().optional().default(""), // 해당 트랙 재생 시 보여 줄 배경 영상
    cover: z.string().optional().default(""), // 그리드 커버 이미지
    size: z.enum(["1col", "2col", "3col"]).default("2col"), // 그리드 카드 폭
    order: z.number().default(0),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { works, sounds }
