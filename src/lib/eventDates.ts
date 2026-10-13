/**
 * 이벤트 날짜 표기 — 목록·상세·홈이 같은 규칙을 쓴다.
 * 날짜는 "2026-12-05"(일 단위)가 기본이고, 일정이 달까지만 정해졌으면
 * "2026-12"(월 단위)로 적는다. 월 단위는 "Dec 2026"으로만 찍는다 —
 * 정해지지 않은 날짜를 1일–31일로 지어내지 않는다.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const isMonthOnly = (date: string) => /^\d{4}-\d{2}$/.test(date)

// 분류(예정/진행 중/지난 일정)용 — 월 단위는 그 달의 첫날과 마지막 날로 편다
export const firstDay = (date: string) => (isMonthOnly(date) ? `${date}-01` : date)
export function lastDay(date: string) {
  if (!isMonthOnly(date)) return date
  const [y, m] = date.split("-").map(Number)
  return `${date}-${new Date(y, m, 0).getDate()}`
}

export function fmtOne(date: string) {
  const d = date.split("-").map(Number)
  if (!d[0]) return date
  if (isMonthOnly(date)) return `${MONTHS[d[1] - 1]} ${d[0]}`
  return `${d[2]} ${MONTHS[d[1] - 1]} ${d[0]}`
}

export function fmtRange(start: string, end: string) {
  const s = start.split("-").map(Number)
  if (!s[0]) return start
  if (isMonthOnly(start) || (end && isMonthOnly(end))) {
    return end && end !== start ? `${fmtOne(start)} – ${fmtOne(end)}` : fmtOne(start)
  }
  const sd = `${s[2]} ${MONTHS[s[1] - 1]}`
  if (end) {
    const e = end.split("-").map(Number)
    if (e[1] === s[1] && e[0] === s[0]) return `${s[2]}–${e[2]} ${MONTHS[s[1] - 1]} ${s[0]}`
    return `${sd} – ${e[2]} ${MONTHS[e[1] - 1]} ${e[0]}`
  }
  return `${sd} ${s[0]}`
}
