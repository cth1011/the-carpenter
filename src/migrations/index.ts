import * as migration_20250816_092739 from './20250816_092739'

export const migrations = [
  {
    up: migration_20250816_092739.up,
    down: migration_20250816_092739.down,
    name: '20250816_092739',
  },
]
