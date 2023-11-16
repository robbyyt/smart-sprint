import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

// TODO: Generate migration for this
export interface CycleTable extends BaseEntity<string> {
  startDate: Date;
  endDate: Date;
  cycleTemplateId: number;
  timezone: string;
  teamId: number;
  createdBy: number;
}

export type Cycle = Selectable<CycleTable>;
export type NewCycle = Insertable<CycleTable>;
export type CycleUpdate = Updateable<CycleTable>;
