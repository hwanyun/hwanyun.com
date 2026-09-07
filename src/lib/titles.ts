/**
 * 제목 표기 규칙 — 보고 있는 언어가 주.
 *  EN: titleEn이 있으면 그것, 없으면 title (대부분의 작품은 영문 제목 하나뿐이다)
 *  KO: title
 * 무제 → EN "Mujae (無諸)" / KO "무제 (無諸)", 공존 → "Coexistence" / "공존",
 * 비정형의 회로 → "Atypical Circuit" / "비정형의 회로". 작품·이벤트·사운드·CV가 모두 이 규칙을 따른다(2026-09).
 */
export type Titled = { title: string; titleEn?: string }
export const tEn = (d: Titled) => d.titleEn || d.title
export const tKo = (d: Titled) => d.title
