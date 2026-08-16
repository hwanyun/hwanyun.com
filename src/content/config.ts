import { defineCollection, z } from "astro:content"
import { MATERIAL_IDS } from "../data/materials"

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
        // 연작 안에서의 순번. order는 홈 그리드 패킹 순서라 연작의 차례와 무관하다
        // (Three Pieces가 II, III, I 순으로 읽히던 이유).
        index: z.number().optional(),
      })
      .optional(),
    size: z.enum(["1col", "2col", "3col"]).default("2col"),
    category: z.enum(["work", "sound"]).default("work"),
    order: z.number().default(0),
    thumb: z.string().optional().default(""), // 홈 썸네일
    // 홈 그리드용 무음 루프 영상. 작품이 대부분 시간 기반이라 정지 이미지로는
    // 절반도 전달되지 않는다. 지정하면 thumb 자리에서 재생하고, 없으면 thumb으로 폴백.
    // thumb은 항상 채워 둔다 — 포스터 프레임이자 reduced-motion·저사양 폴백이다.
    thumbVideo: z.string().optional().default(""),
    // 재료 태그 — 작품들을 잇는 그래프의 간선. 어휘는 src/data/materials.ts에서 고정한다.
    materials: z.array(z.enum(MATERIAL_IDS)).optional().default([]),

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
          span: z.number().optional(), // 사진 모듈 그리드에서 차지할 칸 수(1~3). 없으면 비율로 자동
          // 도록의 부록. true면 본문 흐름에서 빠지고 하단 "Archive"에 작게 접힌다.
          // 본문은 역할이 있는 5–8장만 남긴다 — 장수가 늘수록 한 장의 무게가 준다.
          archive: z.boolean().optional().default(false),
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
    // 재생 길이(초). 16초부터 20분까지 섞여 있는데 표시가 없으면
    // 무엇을 클릭하는 건지 알 수 없다. 실측값을 넣어 둔다.
    duration: z.number().optional().default(0),
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

// 이벤트 컬렉션 — 전시·공연 등 일정. 날짜가 지나면 프론트에서 자동으로 '지난 일정'으로 이동.
const events = defineCollection({
  type: "content", // 본문(마크다운) = 상세 설명
  schema: z.object({
    // 제목은 언어와 무관하게 하나로 둔다 — 〈무제 (無諸)〉처럼 번역이
    // 작품을 훼손하는 경우가 있어 작가가 영문 제목을 두지 않기로 했다.
    title: z.string(),
    dateStart: z.string(), // "2026-09-10" (필수)
    dateEnd: z.string().optional().default(""), // 종료일(기간 전시)
    // 시간·장소는 언어별로 갈린다. 비워 두면 한국어 값을 그대로 쓴다.
    timeNote: z.string().optional().default(""), // 예: "19:00 오프닝"
    timeNoteEn: z.string().optional().default(""),
    venue: z.string().optional().default(""),
    venueEn: z.string().optional().default(""),
    city: z.string().optional().default(""),
    cityEn: z.string().optional().default(""),
    // 장르 — 목록이 아니라 상세에서 한 줄로 성격을 알린다
    genre: z.string().optional().default(""),
    genreEn: z.string().optional().default(""),
    summary: z.string().optional().default(""), // 한 줄 소개(국문)
    summaryEn: z.string().optional().default(""),
    // 상세 본문 — works 컬렉션과 같은 방식으로 언어별 필드에 담는다.
    // 마크다운 본문에 두 언어를 함께 쓰면 언어 전환이 닿지 못한다.
    textKr: z.string().optional().default(""),
    textEn: z.string().optional().default(""),
    // 팀 작업에서 내가 맡은 자리
    roleKr: z.string().optional().default(""),
    roleEn: z.string().optional().default(""),
    thumb: z.string().optional().default(""), // 카드/하이라이트 이미지
    externalUrl: z.string().optional().default(""), // 예매·기관 외부 링크
    externalLabel: z.string().optional().default(""), // 버튼 문구(비우면 기본값)
    // 공식 안내와 보도 — 같은 형식으로 모아 둔다.
    // kind로 '공식'과 '보도'만 구분하고 나머지 표기는 동일하게 간다.
    links: z
      .array(
        z.object({
          kind: z.enum(["official", "press"]).default("press"),
          publisher: z.string(), // 매체 또는 기관
          title: z.string(),
          url: z.string(),
          date: z.string().optional().default(""), // "2026-08-10"
        })
      )
      .optional()
      .default([]),
    images: z
      .array(
        z.object({
          src: z.string(),
          caption: z.string().optional().default(""),
          captionEn: z.string().optional().default(""),
        })
      )
      .optional()
      .default([]),
    order: z.number().default(100), // 같은 날짜 내 정렬 보조
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { works, sounds, events }
