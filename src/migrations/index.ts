import * as migration_20241217_155344 from './20241217_155344';
import * as migration_20241218_192340 from './20241218_192340';
import * as migration_20241221_150432 from './20241221_150432';

export const migrations = [
  {
    up: migration_20241217_155344.up,
    down: migration_20241217_155344.down,
    name: '20241217_155344',
  },
  {
    up: migration_20241218_192340.up,
    down: migration_20241218_192340.down,
    name: '20241218_192340',
  },
  {
    up: migration_20241221_150432.up,
    down: migration_20241221_150432.down,
    name: '20241221_150432'
  },
];
