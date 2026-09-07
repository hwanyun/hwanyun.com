/**
 * 세 축 — 작품을 매체가 아니라 신호가 지나는 단계로 나눈다.
 *
 * "소리 / 빛 / 몸" 같은 매체 명사는 수천 명이 똑같이 쓰는 분류표다
 * (BRANDING_ROADMAP.md 참조). 대신 이 작업 전체를 관통하는 문장,
 * "신호가 발생하고, 전도되고, 감쇠한다"의 세 동사를 축으로 삼는다.
 * 문장의 세 단어가 곧 홈의 세 섹션이고 Works 필터다 — 문장과 사이트맵이 같은 것이 된다.
 *
 * 한 작품이 두 축에 걸쳐도 된다(축은 폴더가 아니라 필터). 전도에 작품이 몰리는 것은
 * 불균형이 아니라 이 작업의 무게중심이다 — materials.ts의 `interactive` 주석과 같은 판단.
 */
export const AXES = [
  {
    id: "emit",
    ko: "발생",
    en: "Emit",
    // 축 카드에 붙는 한 줄. 원리를 말하되 재료로 말한다 — 추상어만 남으면 차갑게 읽힌다.
    descKo: "재봉틀, 바람, 파도. 세상에서 채집한 소리가 작품의 원료가 된다.",
    descEn: "A sewing machine, wind, waves. Sound gathered from the world becomes the raw material of the work.",
    // 카드 미디어와 15초 발췌 — 작가가 바꿀 수 있게 여기 한 곳에 둔다.
    // 미디어는 해당 작품의 thumb/thumbVideo를 그대로 쓰고, 소리는 sounds 컬렉션의 slug다.
    work: "the-voice-of-stripes",
    sound: "the-voice-of-stripesfull-version",
  },
  {
    id: "conduct",
    ko: "전도",
    en: "Conduct",
    descKo: "구리, 전도성 도료, 센서. 관객의 몸이 회로를 닫아야 소리가 난다.",
    descEn: "Copper, conductive paint, sensors. Sound happens only when a visitor's body closes the circuit.",
    work: "atypical-circuit",
    sound: "atypical-circuit-proximity",
  },
  {
    id: "decay",
    ko: "감쇠",
    en: "Decay",
    descKo: "빛이 종이에 남긴 자국, 손의 움직임이 굳은 선. 신호가 지나간 뒤의 잔여물.",
    descEn: "A mark light leaves on paper, a line where the hand's movement set. What remains after the signal has passed.",
    work: "three-pieces-iii",
    // 감쇠 축에는 아직 소리가 없다 — 없는 것을 지어내지 않는다. 잔열 프로토타입이 채울 자리.
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
  ko: { before: "신호가 ", parts: ["발생", "전도", "감쇠"], joins: ["하고, ", "되고, ", "한다."] },
  en: { before: "A signal is ", parts: ["emitted", "conducted", "attenuated"], joins: [", ", ", and ", "."] },
} as const
