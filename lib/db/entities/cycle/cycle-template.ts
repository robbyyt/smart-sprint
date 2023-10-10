import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

// TODO: Generate migration for this
export interface CycleTemplateTable extends BaseEntity {
  durationInDays: number;
  hoursInWorkDay: number;
  dayStart: string;
  includeWeekends: boolean;
  timeZone: string;
  teamId: number;
}

export type CycleTemplate = Selectable<CycleTemplateTable>;
export type NewCycleTemplate = Insertable<CycleTemplateTable>;
export type CycleTemplateUpdate = Updateable<CycleTemplateTable>;
