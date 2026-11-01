// Starter home program: no equipment, bodyweight and timed holds only. Ids are catalogue
// exercise ids (catalogue/exercises/<id>.json). Shape matches the app's routines: `ex` entries
// with mode 'reps' (sets, reps) or 'time' (sets, sec).
export const HOME_PROGRAM_ROUTINES = [
  {
    id: 'home-a', name: 'Home A: push and core', prog: 'linear',
    ex: [
      { id: '0662', mode: 'reps', sets: 3, reps: 8, repsMin: 6 },   // push-up
      { id: '0463', mode: 'time', sets: 3, sec: 30 },              // front plank
      { id: '0274', mode: 'reps', sets: 3, reps: 15 },             // crunch floor
    ],
  },
  {
    id: 'home-b', name: 'Home B: core and legs', prog: 'linear',
    ex: [
      { id: '3948', mode: 'reps', sets: 3, reps: 12 },             // air squat
      { id: '0145', mode: 'reps', sets: 3, reps: 12 },             // butt bridge
      { id: '0715', mode: 'time', sets: 2, sec: 20 },              // side plank
      { id: '6211', mode: 'reps', sets: 3, reps: 14 },             // bicycle crunch
    ],
  },
]
