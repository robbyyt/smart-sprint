import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';
import { UserId } from '../auth';
import { TeamId } from '../team';
import { CycleTemplateId } from './cycle-template';

// TODO: Generate migration for this
export interface CycleTable extends BaseEntity {
  startDate: Date;
  endDate: Date;
  cycleTemplateId: CycleTemplateId;
  timezone: string;
  teamId: TeamId;
  createdBy: UserId;
}

export type Cycle = Selectable<CycleTable>;
export type NewCycle = Insertable<CycleTable>;
export type CycleUpdate = Updateable<CycleTable>;
export type CycleId = Cycle['id'];
