import { describe, expect, it } from 'vitest'
import { angleAt, createRepCounter } from './rep-counter.js'

// Feed a list of [angle, durationMs] segments, one frame every 50 ms.
function run(counter, segments) {
  let t = 0
  for (const [angle, ms] of segments) {
    for (let i = 0; i < ms / 50; i++) { counter.update(angle, t); t += 50 }
  }
  return counter.reps
}

describe('createRepCounter', () => {
  it('counts a full rep: down past the threshold, held, and back up', () => {
    expect(run(createRepCounter(), [[170, 300], [70, 400], [170, 400]])).toBe(1)
  })

  it('counts each full rep in a set', () => {
    const set = [[170, 300], [70, 400], [170, 400]]
    expect(run(createRepCounter(), [...set, ...set, ...set])).toBe(3)
  })

  it('does not count a half rep that never comes back up', () => {
    expect(run(createRepCounter(), [[170, 300], [70, 1000]])).toBe(0)
  })

  it('ignores a single noisy frame below the threshold', () => {
    expect(run(createRepCounter(), [[170, 300], [70, 50], [170, 300]])).toBe(0)
  })

  it('reports the phase so the screen can show it', () => {
    const c = createRepCounter()
    let last = null
    let t = 0
    for (const [angle, ms] of [[170, 300], [70, 300]]) {
      for (let i = 0; i < ms / 50; i++) { last = c.update(angle, t); t += 50 }
    }
    expect(last).toEqual({ reps: 0, phase: 'down' })
  })
})

describe('angleAt', () => {
  it('is 90 degrees for a right angle and 180 for a straight line', () => {
    expect(angleAt({ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 })).toBeCloseTo(90)
    expect(angleAt({ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 })).toBeCloseTo(180)
  })

  it('returns null when a point coincides with the vertex', () => {
    expect(angleAt({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 })).toBeNull()
  })
})
