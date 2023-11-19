import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';
import { UserId } from '../auth';
import { TeamId } from '../team';

export interface CycleTemplateTable extends BaseEntity {
  startDate: Date;
  endDate: Date;
  timezone: string;
  teamId: TeamId;
  createdBy: UserId;
}

export type CycleTemplate = Selectable<CycleTemplateTable>;
export type NewCycleTemplate = Insertable<CycleTemplateTable>;
export type CycleTemplateUpdate = Updateable<CycleTemplateTable>;
export type CycleTemplateId = CycleTemplate['id'];
