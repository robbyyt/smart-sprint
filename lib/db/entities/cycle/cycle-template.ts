import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

export interface CycleTemplateTable extends BaseEntity<string> {
  startDate: Date;
  endDate: Date;
  timezone: string;
  teamId: number;
  createdBy: number;
}

export type CycleTemplate = Selectable<CycleTemplateTable>;
export type NewCycleTemplate = Insertable<CycleTemplateTable>;
export type CycleTemplateUpdate = Updateable<CycleTemplateTable>;
