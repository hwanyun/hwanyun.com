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
 *
 * `interactive`는 밀도가 비슷한데도(12중 6) 넣었다. 이건 내비게이션이 아니라
 * 정체성의 문제다 — 관객의 개입으로 작품이 성립하는가는 이 작업 전체를 가르는
 * 축이고, 아카이브를 절반으로 나누는 유효한 질문이기도 하다. 그래서 맨 앞에 둔다.
 * (이 목록은 순수한 재료만이 아니다 — projection·light·moving image처럼
 * 매체와 방식도 이미 함께 있다.)
 */
export const MATERIALS = [
  { id: "interactive", en: "Interactive", ko: "인터랙티브" },
  { id: "copper", en: "Copper", ko: "구리" },
  { id: "sensor", en: "Sensor", ko: "센서" },
  { id: "polycarbonate", en: "Polycarbonate", ko: "폴리카보네이트" },
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
