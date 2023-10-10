import { ColumnType, GeneratedAlways } from 'kysely';

export interface BaseEntity<T = number> {
  id: GeneratedAlways<T>;
  createdAt: ColumnType<Date, never, never>;
  updatedAt: ColumnType<Date, never, never>;
}
