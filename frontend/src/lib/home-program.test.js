import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { HOME_PROGRAM_ROUTINES } from './home-program.js'

const exercisesDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'catalogue', 'exercises')

describe('HOME_PROGRAM_ROUTINES', () => {
  const entries = HOME_PROGRAM_ROUTINES.flatMap(r => r.ex)

  it('every exercise id exists in the catalogue', () => {
    for (const e of entries) expect(existsSync(join(exercisesDir, `${e.id}.json`)), e.id).toBe(true)
  })

  it('no equipment: every entry is reps or a timed hold with positive values', () => {
    for (const e of entries) {
      expect(['reps', 'time']).toContain(e.mode)
      expect(e.sets).toBeGreaterThan(0)
      if (e.mode === 'reps') expect(e.reps).toBeGreaterThan(0)
      else expect(e.sec).toBeGreaterThan(0)
    }
  })

  it('each routine has a unique id and at least one exercise', () => {
    const ids = HOME_PROGRAM_ROUTINES.map(r => r.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const r of HOME_PROGRAM_ROUTINES) expect(r.ex.length).toBeGreaterThan(0)
  })
})
