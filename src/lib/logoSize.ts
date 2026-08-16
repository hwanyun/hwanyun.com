/**
 * 스폰서 로고를 "같은 크기"로 보이게 맞춘다.
 *
 * 박스 상한(max-width/max-height)만으로는 균일해지지 않는다. 가로로 긴 로고는
 * 폭 상한에 걸려 상한을 꽉 채우고, 정사각에 가까운 로고는 높이 상한에 먼저
 * 걸려 폭이 한참 남는다 — 같은 규칙을 적용해도 화면에서 차지하는 면적이 두 배
 * 넘게 벌어진다. 눈은 박스가 아니라 면적을 크기로 읽으므로, 면적을 맞춘다.
 *
 * 면적 A와 가로세로비 r에 대해  w = √(A·r),  h = √(A/r).
 * 다만 순수 면적 정규화는 극단적인 비율에서 무너진다(7.5:1 로고는 145px까지
 * 넓어지고, 1.3:1 로고는 46px까지 높아진다). 그래서 상·하한으로 가둔다.
 *
 * 크기는 빌드 시점에 파일 헤더에서 읽는다 — 원본 크기를 알아야 계산이 되고,
 * 손으로 적어 두면 로고를 교체할 때 낡는다.
 */
import { readFileSync } from "node:fs"
import { join } from "node:path"

/** 눈으로 맞춘 기준 면적. GlogauAIR(2.33:1)가 약 81×35로 떨어지는 값. */
const TARGET_AREA = 2800
/* 상한은 안전장치일 뿐 조판 값이 아니다. 현재 로고들(1.33:1 ~ 7.54:1)이 모두
   상한에 닿지 않도록 잡아, 전부 정확히 목표 면적에 떨어지게 한다. 상한이
   걸리면 그 로고만 작아져 균일함이 깨진다 — 실제로 38/124일 때 KalmaLab이
   1938, 시각장애인연합회가 1984로 혼자 작았다. */
const MAX_HEIGHT = 48
const MAX_WIDTH = 150

export type LogoBox = { width: number; height: number } | null

/** PNG·WebP·JPEG 헤더에서 픽셀 크기를 읽는다. 못 읽으면 null. */
function intrinsicSize(buf: Buffer): { w: number; h: number } | null {
  // PNG: 시그니처 8B + IHDR 길이/타입 8B 뒤에 width/height가 빅엔디언 4B씩
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
  }
  // WebP: RIFF 컨테이너 안의 청크 종류에 따라 크기 위치가 다르다
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16)
    if (chunk === "VP8X") {
      return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 }
    }
    if (chunk === "VP8 ") {
      return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff }
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21)
      return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 }
    }
  }
  // JPEG: SOF 마커(C0~CF, C4·C8·CC 제외)를 찾을 때까지 세그먼트를 건너뛴다
  if (buf.length > 4 && buf.readUInt16BE(0) === 0xffd8) {
    let i = 2
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue }
      const marker = buf[i + 1]
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) }
      }
      i += 2 + buf.readUInt16BE(i + 2)
    }
  }
  return null
}

const cache = new Map<string, LogoBox>()

/**
 * public/ 아래 로고 경로를 받아 렌더 크기를 돌려준다.
 * 파일을 못 찾거나 형식을 못 읽으면 null — 그때는 CSS 상한이 받는다.
 */
export function logoBox(src: string): LogoBox {
  if (!src || src.startsWith("http")) return null
  if (cache.has(src)) return cache.get(src)!

  let box: LogoBox = null
  try {
    const size = intrinsicSize(readFileSync(join(process.cwd(), "public", src)))
    if (size && size.w > 0 && size.h > 0) {
      const ratio = size.w / size.h
      let height = Math.sqrt(TARGET_AREA / ratio)
      let width = Math.sqrt(TARGET_AREA * ratio)
      // 상한에 걸리면 비율을 지키며 함께 줄인다
      if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT }
      if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH }
      box = { width: Math.round(width), height: Math.round(height) }
    }
  } catch {
    box = null
  }
  cache.set(src, box)
  return box
}
