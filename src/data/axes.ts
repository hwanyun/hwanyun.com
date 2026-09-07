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
    descKo: "재봉틀과 바람의 녹음, 신디사이저의 일곱 루프, 벽을 도는 빛. 소리와 빛이 공간에 있게 되는 단계.",
    descEn: "Recordings of a sewing machine and wind, seven synthesizer loops, light circling a wall. Where sound and light come to be in a space.",
    // 카드 미디어와 15초 발췌 — 작가가 바꿀 수 있게 여기 한 곳에 둔다.
    // 미디어는 해당 작품의 thumb/thumbVideo를 그대로 쓰고, 소리는 sounds 컬렉션의 slug다.
    work: "the-voice-of-stripes",
    sound: "the-voice-of-stripesfull-version",
  },
  {
    id: "contact",
    ko: "접촉",
    en: "Contact",
    descKo: "구리, 전도성 도료, 센서. 관객의 몸이 닿아야 회로가 닫히고 작품이 움직인다.",
    descEn: "Copper, conductive paint, sensors. The work moves only when a visitor's body makes contact and closes the circuit.",
    work: "atypical-circuit",
    sound: "atypical-circuit-proximity",
  },
  {
    id: "trace",
    ko: "흔적",
    en: "Trace",
    descKo: "빛이 종이에 남긴 자국, 손의 움직임이 굳은 선. 지나간 뒤에 남는 것.",
    descEn: "A mark light leaves on paper, a line where the hand's movement set. What remains after.",
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
