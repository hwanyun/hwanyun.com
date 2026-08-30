# 무제 TouchDesigner 구조 메모

터디 프로젝트를 다시 조사하지 않기 위한 기록. 2026-08-30 브리지로 실측.

## 파일

- Floor `~/Documents/HWANYUN/무제_이관_20260818/터디 비주얼/Floor/260816_Floor.7.toe`
- Wall  `~/Documents/HWANYUN/무제_이관_20260818/터디 비주얼/Wall/260816_Wall.12.toe`

## 브리지 붙이기

각 인스턴스의 Textport(Alt+T)에 **직접** 붙여넣는다. AppleScript 자동 입력은
같은 앱의 두 인스턴스를 구분하지 못해 한쪽으로 몰린다 — 반드시 손으로.

```python
# Floor 창에서
exec(open('/Users/hwanyun/.claude/mcp/touchdesigner/td_setup_floor.py', encoding='utf-8').read())
# Wall 창에서
exec(open('/Users/hwanyun/.claude/mcp/touchdesigner/td_setup_wall.py', encoding='utf-8').read())
```

`encoding='utf-8'` 필수 — 없으면 한글 주석에서 UnicodeDecodeError.
Floor=9980, Wall=9981. 저장하지 않으면 브리지 노드는 사라진다.

## Floor 구조

- 모든 TOP이 **1280×1280**. 논커머셜 상한(1280)에 이미 맞춰져 있다.
- `render1` ← `geo_particles`(내용물은 `rectangle1` 하나) + `cam1`
- `cam1`은 **직교 투영**, 위에서 수직으로 내려다봄, orthowidth 3.83
- 즉 3D 공간이 아니라 **평면에 그려지는 방식**. 설치 뷰를 만들려면 3D 씬을 새로 짜야 한다.
- 원형 만다라가 프레임의 **80%**만 차지하고 나머지는 검은 여백 → 웹 인코딩에서 0.82로 크롭

## Wall 구조 — 여기에 개선 여지가 있다

```
render2 1280×1280  (ortho, orthowidth 8.3)
  → glow_add_rim 1280×1280
  → transform3   1280×1280
  → crop1        1280×264   ← 세로의 20.6%만 남기고 버림
  → comp4 → out3 → out1     1280×264
```

**핵심: 벽면은 1280×1280으로 렌더된 뒤 세로 264px로 잘린다.**
논커머셜 한계가 아니라 **전시 프로젝터 비율에 맞춘 크롭**이다.
crop 설정: `cropbottom=0.3248`, `croptop=0.5312` (fraction)

웹용으로는 이 크롭을 완화해 세로를 더 남기면 **해상도를 그대로 얻을 수 있다**.
예: 세로 절반(640px)을 남기면 지금 대비 2.4배. 360° 전체 폭은 유지된다.
단, 전시 화면과 프레이밍이 달라지므로 시안을 확인받고 진행할 것.

## 논커머셜 제약

출력 1280 상한. 비율을 바꾸든 크기를 바꾸든 넘을 수 없다.
분할 렌더 후 외부 결합은 라이선스 제한 무력화이므로 하지 않는다.
대신 **1280을 어디에 쓸지**를 바꾼다 (위 Wall 크롭 완화가 그 예).

## 어제 사라진 것들

`claude_keys`, `claude_mfo`, `claude_mfi`, `claude_info` — 저장 안 해 소실.
`script_lidar_state`(scriptCHOP), `script1_callbacks`(textDAT),
`live_controls`(baseCOMP)는 원본 프로젝트 소속이라 그대로 있다.
상태머신은 `script1_callbacks`의 모듈 전역 `_state`로 돌아간다 —
**렌더 중 이 DAT을 편집하면 모듈이 재실행되어 상태가 날아간다.**

## 알려진 함정

- `stop_playback`은 토글이다.
- 실시간 캡처는 프레임을 유실한다(어제 8569/10800). 비실시간 렌더로 갈 것.
- `.cook(force=True)`로는 Movie File Out이 기록하지 않는다 — 타임라인이 실제로 전진해야 한다.

## 비실시간 프레임 정확 렌더 (2026-08-30 확립)

실시간 캡처는 프레임을 유실한다(어제 10800 중 8569만 기록). 아래 절차는
300프레임 시험에서 **정확히 300프레임 / 5.000s / 60fps**를 냈다.

핵심은 **순서**다. `record=True` 전에 첫 프레임을 세팅하고 쿡해야 한다 —
그러지 않으면 실시간 재생분이 앞뒤로 섞여 들어간다(2140프레임이 나왔었다).

```python
import time
root = op('/project1'); mfo = root.op('nr_mfo')
tl = op('/local/time'); out2 = root.op('out2')

prev_rt, prev_play, start_f = project.realTime, tl.par.play.eval(), tl.frame

tl.par.play = 0            # 재생 먼저 정지
project.realTime = False   # 주의: realTime (대문자 T)
mfo.par.record = False

tl.frame = start_f         # 첫 프레임 세팅 후
out2.cook(force=True)      # 쿡하고
mfo.par.record = True      # 그 다음 녹화 시작
for i in range(N):
    tl.frame = start_f + i
    out2.cook(force=True)
    mfo.cook(force=True)
mfo.par.record = False

project.realTime = prev_rt; tl.par.play = prev_play
```

- 속도: 실시간의 약 1.5배 시간. 3분(10765프레임)이면 **약 5분**.
- `absTime.frame`은 읽기 전용 — `/local/time`의 `.frame`을 쓴다.
- moviefileoutTOP `nr_mfo`: codec=hap, fps=60. 300프레임에 887MB(=3분이면 ~30GB)
  이므로 본 렌더는 디스크 여유를 먼저 확인할 것.

## OP 타입·파라미터 실제 이름 (헷갈림 주의)

- `geoCOMP`가 아니라 **`geometryCOMP`**. `create()`에 문자열 대신
  `getattr(td,'geometryCOMP')` 형태로 넘긴다.
- circleSOP: `divs`(divisions 아님), `radx/rady`
- tubeSOP: `rad1/rad2`(radx1 아님), `height`, `rows`, `cols`, `cap`
- `project.realTime` (realtime 아님)

## 설치 뷰 프로토타입 (미완, iv_ 접두어)

`iv_geo_floor`(circleSOP 반경1.85) + `iv_geo_wall`(tubeSOP 반경1.85 높이2.4)
+ `iv_cam`(perspective) + `iv_light` + `iv_render`(1280×720) + `iv_wall_movie`.
원본 노드는 건드리지 않았다. **미해결: 텍스처가 단색으로만 렌더된다** —
UV/머티리얼 설정을 더 봐야 한다. 구도 자체는 나왔다(관객 눈높이에서 휜 벽 + 바닥 원).


## 2026-08-31 진행 상황

**해결: 프레임 유실.** 비실시간 렌더로 10,765프레임 요청 → 10,765 기록,
179.417초, 유실 0. (어제는 10,800 요청에 8,569만 기록되어 1.26배 빨랐다.)
연속 프레임 추출로 움직임이 고른 것도 확인했다.

**규명: Wall 크롭 완화는 실익 없음.** crop 이전 원본(transform3)을 5장
받아 보니 입자가 화면 중앙의 좁은 띠에만 있고 위아래는 검은 여백이다.
크롭을 풀어도 여백만 늘어난다. 현재 crop이 이미 최적 — 건드리지 말 것.

**상태머신 구동 방법 (검증됨)**

`nr_keys`(constantCHOP)를 script_lidar_state의 input1에 연결해 두었다.
원래 입력은 `keyboardin_test`. 값 주입 규칙:

- **rising edge로만 인식한다.** 값을 계속 1로 두면 최초 한 번만 먹는다.
  모든 채널을 0으로 만들고 한 번 쿡한 뒤, 해당 채널만 1로 올려야 한다.
- **TD 내부 스레드에서 파라미터를 바꿀 수 없다.** threading으로 시나리오를
  돌리면 값이 반영되지 않는다(전부 0으로 남는다). 밖에서 HTTP로 주입할 것.
- k0~k5 = 존 안 인원수 0~5. `constant_test_active`가 1이어야 한다(이미 1).
- 검증: k3 주입 → people=3, mode=3, order=1.0 도달 확인.

**핵심 장애물: 시간 기준 불일치**

`script1_callbacks`의 onCook이 `now = absTime.seconds`(실제 벽시계)를 쓴다.
비실시간 렌더는 프레임을 임의 속도로 밀기 때문에 "15초 유지" 같은 조건이
영상 시간과 어긋난다. 이 때문에 시나리오 렌더가 "만개 고정"/"무질서 고정"
으로 두 번 실패했다.

**다음 단계 (C안): 상태 기록 → 재생**

1. 실시간 재생하며 밖에서 시나리오를 주입하고, 초당 1회 이상 상태 채널을
   HTTP로 읽어 CSV로 저장한다. (trailCHOP은 히스토리를 제대로 못 담았다 —
   12,000샘플이 전부 같은 값이었다. 파일로 빼는 쪽이 확실하다.)
2. 비실시간 렌더에서 그 CSV를 프레임마다 읽어 상태 채널에 그대로 먹인다.
   상태머신을 우회하므로 벽시계 문제가 사라진다.

기록할 채널 19개는 `nr_rec_sel`(selectCHOP)에 이미 골라 두었다:
mode order orderTarget atlasIndex people visibleRings transitionProgress
floorFadeElapsed wallFadeElapsed fadeInProgress floorFadeInProgress
wallFadeInProgress fadeInElapsed shake shakeAmp shakeElapsed timer3
resetIn phaseCode

**저장된 노드** (2026-08-31 저장, 버전 .7 / .12)
`nr_mfo`(moviefileout, prores/60fps), `nr_keys`, `nr_rec_sel`, `nr_rec`,
`iv_*`(설치 뷰 프로토타입, 텍스처 미해결).
