import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';
import { CycleTemplateId } from '../cycle';
import { MeetingRecurrence } from '@/lib/types/meeting';

export interface MeetingTemplateTable extends BaseEntity {
  name: string;
  originalStartDate: Date;
  recurrence: MeetingRecurrence;
  startTime: string;
  endTime: string;
  timezone: string;
  cycleTemplateId: CycleTemplateId;
}

export type MeetingTemplate = Selectable<MeetingTemplateTable>;
export type NewMeetingTemplate = Insertable<MeetingTemplateTable>;
export type MeetingTemplateUpdate = Updateable<MeetingTemplateTable>;
export type MeetingTemplateId = MeetingTemplate['id'];
