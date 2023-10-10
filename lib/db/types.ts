import { ColumnType, Generated } from 'kysely';

export interface BaseEntity {
  id: Generated<number>;
  createdAt: ColumnType<Date, never, never>;
  updatedAt: ColumnType<Date, never, never>;
}
