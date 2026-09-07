/**
 * 세 축 — 작품을 매체가 아니라 신호가 지나는 단계로 나눈다.
 *
 * "소리 / 빛 / 몸" 같은 매체 명사는 수천 명이 똑같이 쓰는 분류표다
 * (BRANDING_ROADMAP.md 참조). 대신 이 작업 전체를 관통하는 문장,
 * "소리와 빛이 울리고, 몸이 닿고, 흔적이 남는다"의 세 단계를 축으로 삼는다.
 * 전도·감쇠·attenuate 같은 신호처리 용어는 쓰지 않는다 — 큐레이터가 읽는 말이 아니다.
 * 문장의 세 단어가 곧 홈의 세 섹션이고 Works 필터다 — 문장과 사이트맵이 같은 것이 된다.
 *
 * 한 작품이 두 축에 걸쳐도 된다(축은 폴더가 아니라 필터). 접촉에 작품이 몰리는 것은
 * 불균형이 아니라 이 작업의 무게중심이다 — materials.ts의 `interactive` 주석과 같은 판단.
 */
export const AXES = [
  {
    id: "sounding",
    ko: "울림",
    en: "Sounding",
    // 녹음이든 신디사이저든 프로젝션이든 — 소리와 빛이 공간에 있게 되는 단계.
    // "채집"은 마이크 든 사람의 말이라 Ableton으로 짓는 소리가 빠진다 (작가 지적, 2026-09-07).
    descKo: "관계는 먼저 들리는 것으로 온다. 무언가가 울린다는 것은 이미 다른 것과 닿아 있다는 뜻이다. 소리든 빛이든, 울림은 혼자 있을 수 없는 것들이 서로를 알아차리는 첫 순간이다.",
    descEn: "A relation arrives first as something heard. For a thing to resound is already to be touching something else. Sound or light, sounding is the first moment in which things that cannot be alone notice one another.",
    // 카드 미디어와 15초 발췌 — 작가가 바꿀 수 있게 여기 한 곳에 둔다.
    // 미디어는 해당 작품의 thumb/thumbVideo를 그대로 쓰고, 소리는 sounds 컬렉션의 slug다.
    work: "the-voice-of-stripes",
    sound: "the-voice-of-stripesfull-version",
  },
  {
    id: "contact",
    ko: "접촉",
    en: "Contact",
    descKo: "관계는 닿을 때 비로소 흐른다. 열린 회로는 아무것도 하지 않는다. 몸과 물질, 사람과 시스템 사이의 거리가 좁혀질 때 무엇이 흐르기 시작하고 무엇이 무너지는지, 그 경계를 보려고 작업한다.",
    descEn: "A relation flows only when it touches. An open circuit does nothing. The work looks at what begins to flow, and what gives way, when the distance between body and material, person and system, closes.",
    work: "atypical-circuit",
    sound: "atypical-circuit-proximity",
  },
  {
    id: "trace",
    ko: "흔적",
    en: "Trace",
    descKo: "관계는 끝난 뒤에도 남는다. 닿았던 것들은 서로에게 자국을 남기고, 그 자국은 다음 관계의 조건이 된다. 흔적은 지나간 시간이 아니라 아직 이어지고 있는 연결이다.",
    descEn: "A relation remains after it ends. Things that have touched leave marks on each other, and those marks become the condition for what touches next. A trace is not time gone by but a connection still being held.",
    // 손이 닿았던 자리에 남는 투사된 원 — 접촉이 남긴 흔적. 루프 영상이 있어 시아노타입 정지 사진보다 세다.
    work: "conductive-circles",
    // 흔적 축에는 아직 소리가 없다 — 없는 것을 지어내지 않는다. 잔열 프로토타입이 채울 자리.
    sound: "",
  },
] as const

export type AxisId = (typeof AXES)[number]["id"]

export const AXIS_IDS = AXES.map((a) => a.id) as [AxisId, ...AxisId[]]

const BY_ID = new Map(AXES.map((a) => [a.id, a]))
export function axisLabel(id: string, lang: "en" | "ko" = "en"): string {
  const a = BY_ID.get(id as AxisId)
  return a ? (lang === "ko" ? a.ko : a.en) : id
}

/* 문장 자체. 히어로와 메타 설명이 같은 원본을 쓴다. */
export const THESIS = {
  ko: { before: "소리와 빛이 ", parts: ["울리", "닿", "흔적"], joins: ["고, 몸이 ", "고, ", "이 남는다."] },
  en: { before: "Sound and light ", parts: ["begin", "touches", "trace"], joins: [", a body ", ", a ", " remains."] },
} as const
