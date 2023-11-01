import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

export interface CycleTemplateTable extends BaseEntity {
  durationInWorkDays: number;
  startWeekDay: number;
  timezone: string;
  teamId: number;
}

export type CycleTemplate = Selectable<CycleTemplateTable>;
export type NewCycleTemplate = Insertable<CycleTemplateTable>;
export type CycleTemplateUpdate = Updateable<CycleTemplateTable>;
