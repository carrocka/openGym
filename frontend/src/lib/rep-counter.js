// Rep counter for one exercise, fed with a joint angle over time. Pure: the camera layer
// (iOS Vision, later) computes the angle and passes it here; no AI model runs in the count.
//
// A rep is one trip down past `down` and back up past `up`. Each end has to hold for `minHoldMs`,
// so a single noisy frame never changes phase, and a half rep (down, never back up) never counts.

export function createRepCounter({ down = 90, up = 160, minHoldMs = 150 } = {}) {
  const state = { phase: 'up', reps: 0, since: null }
  // True once the condition has held for minHoldMs; resets the moment it breaks.
  const held = (ok, t) => {
    if (!ok) { state.since = null; return false }
    if (state.since === null) state.since = t
    return t - state.since >= minHoldMs
  }
  return {
    update(angle, t) {
      if (state.phase === 'up') {
        if (held(angle < down, t)) { state.phase = 'down'; state.since = null }
      } else if (held(angle > up, t)) {
        state.phase = 'up'; state.reps += 1; state.since = null
      }
      return { reps: state.reps, phase: state.phase }
    },
    get reps() { return state.reps },
  }
}

// Angle at vertex b formed by points a-b-c, in degrees, from {x, y} landmarks (image coordinates).
export function angleAt(a, b, c) {
  const v1 = { x: a.x - b.x, y: a.y - b.y }
  const v2 = { x: c.x - b.x, y: c.y - b.y }
  const dot = v1.x * v2.x + v1.y * v2.y
  const norm = Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y)
  if (norm === 0) return null
  return Math.acos(Math.min(1, Math.max(-1, dot / norm))) * 180 / Math.PI
}
