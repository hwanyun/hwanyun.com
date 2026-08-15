/**
 * 재료 통제 어휘 — 작품들을 잇는 그래프의 노드.
 *
 * 자유 입력이면 copper / Copper / 구리가 섞여 그래프가 깨지므로 여기서 고정한다.
 * 새 재료를 추가할 때는 이 파일만 고치면 스키마·CMS·표시가 함께 따라간다.
 *
 * 원칙: 2개 이상의 작품에 나타나는 재료만 태그로 삼는다(연결을 만들지 못하는
 * 태그는 그래프에서 죽은 노드가 된다). `hanji`는 예외 — 한 작품에만 쓰였지만
 * 작업에서 갖는 비중이 커서 작가 판단으로 포함했다.
 *
 * `sound`는 의도적으로 넣지 않았다. 12작품 중 7개에 해당해 거의 전부를 연결하므로
 * 내비게이션 기능을 못 한다. 사운드는 재료가 아니라 실천의 층위다.
 */
export const MATERIALS = [
  { id: "copper", en: "Copper", ko: "구리" },
  { id: "sensor", en: "Sensor", ko: "센서" },
  { id: "plastic-sheet", en: "Plastic sheet", ko: "플라스틱 시트" },
  { id: "speaker", en: "Speaker", ko: "스피커" },
  { id: "conductive-paint", en: "Conductive paint & tape", ko: "전도성 도료·테이프" },
  { id: "projection", en: "Projection", ko: "프로젝션" },
  { id: "3d-pen", en: "3D pen", ko: "3D펜" },
  { id: "field-recording", en: "Field recording", ko: "필드 레코딩" },
  { id: "moving-image", en: "Moving image", ko: "영상" },
  { id: "light", en: "Light", ko: "빛" },
  { id: "hanji", en: "Hanji", ko: "한지" },
] as const

export type MaterialId = (typeof MATERIALS)[number]["id"]

export const MATERIAL_IDS = MATERIALS.map((m) => m.id) as [MaterialId, ...MaterialId[]]

const BY_ID = new Map(MATERIALS.map((m) => [m.id, m]))

export function materialLabel(id: string): string {
  return BY_ID.get(id as MaterialId)?.en ?? id
}
export function materialLabelKo(id: string): string {
  return BY_ID.get(id as MaterialId)?.ko ?? id
}
