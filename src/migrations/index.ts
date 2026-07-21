import * as migration_20260721_144630_initial from './20260721_144630_initial';

export const migrations = [
  {
    up: migration_20260721_144630_initial.up,
    down: migration_20260721_144630_initial.down,
    name: '20260721_144630_initial'
  },
];
