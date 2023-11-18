import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';
import { UserId } from '../auth';

export interface CycleTemplateTable extends BaseEntity<string> {
  startDate: Date;
  endDate: Date;
  timezone: string;
  teamId: number;
  createdBy: UserId;
}

export type CycleTemplate = Selectable<CycleTemplateTable>;
export type NewCycleTemplate = Insertable<CycleTemplateTable>;
export type CycleTemplateUpdate = Updateable<CycleTemplateTable>;
export type CycleTemplateId = CycleTemplate['id'];
