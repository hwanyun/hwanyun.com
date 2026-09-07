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
    // 영문은 Resonance — Sounding은 소리에만 걸린다. 울림은 빛·이미지에도 쓰는 말(시각적 울림).
    en: "Resonance",
    // 녹음이든 신디사이저든 프로젝션이든 — 소리와 빛이 공간에 있게 되는 단계.
    // "채집"은 마이크 든 사람의 말이라 Ableton으로 짓는 소리가 빠지고, "Sounding"은 소리에만 걸려
    // 빛·영상 작업(커리어의 절반)이 빠진다 (작가 지적, 2026-09-07).
    // 카드용 한 문장 — 문단의 마지막 문장(명제). 긴 문단은 Works 페이지에서 축을 골랐을 때 읽힌다.
    lineKo: "보이고 들린다는 것은 이미 함께 있다는 증거다.",
    lineEn: "To be seen or heard is proof of being with.",
    descKo: "혼자서 울리는 것은 없다. 소리든 빛이든, 무언가가 감지된다면 이미 무언가가 다른 무언가를 흔들고 있는 것이다. 공기와 벽, 재료와 몸이 같은 떨림을 잠시 나눠 갖는 그 순간에서 작업은 시작한다. 보이고 들린다는 것은 이미 함께 있다는 증거다.",
    descEn: "Nothing resonates alone. Sound or light, if something can be sensed, something has already set something else in motion. For a moment, air and wall, material and body share one tremor, and that moment is where the work begins. To be seen or heard is proof of being with.",
    // 카드 미디어와 15초 발췌 — 작가가 바꿀 수 있게 여기 한 곳에 둔다.
    // 미디어는 해당 작품의 thumb/thumbVideo를 그대로 쓰고, 소리는 sounds 컬렉션의 slug다.
    work: "the-voice-of-stripes",
    sound: "the-voice-of-stripesfull-version",
  },
  {
    id: "contact",
    ko: "접촉",
    en: "Contact",
    lineKo: "만지는 쪽과 만져지는 쪽이 자리를 바꾸는 곳.",
    lineEn: "Where touching and being touched change places.",
    descKo: "가까이 간다는 것은 작은 일이 아니다. 거리가 사라지는 순간 보던 사람은 보이는 것의 일부가 되고, 닫혀 있던 것이 열리거나 멀쩡하던 것이 무너진다. 손이 닿는 그 경계에 머물며 무엇이 시작되고 무엇이 그만두는지를 본다. 만지는 쪽과 만져지는 쪽이 자리를 바꾸는 곳.",
    descEn: "To come close is no small thing. When distance is gone, the one who was looking becomes part of what is looked at; something closed opens, or something intact gives way. The work stays at that edge where a hand lands, watching what starts and what stops, where touching and being touched change places.",
    work: "atypical-circuit",
    sound: "atypical-circuit-proximity",
  },
  {
    id: "trace",
    ko: "흔적",
    en: "Trace",
    lineKo: "작업의 절반은 끝난 뒤에 있다.",
    lineEn: "Half of the work happens after it ends.",
    descKo: "무언가가 지나간 자리는 비어 있지 않다. 닿았던 것들은 서로에게 자국을 남기고, 다음 만남은 그 자국 위에서 일어난다. 남은 것은 기록이 아니라 아직 식지 않은 상태다. 작업의 절반은 끝난 뒤에 있다.",
    descEn: "Where something has passed is not empty. What has touched leaves a mark on what it touched, and the next meeting happens on top of that mark. What remains is not a record but a state not yet cooled. Half of the work happens after it ends.",
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
