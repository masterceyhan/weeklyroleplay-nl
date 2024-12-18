import * as migration_20241217_155344 from './20241217_155344';
import * as migration_20241218_192340 from './20241218_192340';

export const migrations = [
  {
    up: migration_20241217_155344.up,
    down: migration_20241217_155344.down,
    name: '20241217_155344',
  },
  {
    up: migration_20241218_192340.up,
    down: migration_20241218_192340.down,
    name: '20241218_192340'
  },
];
