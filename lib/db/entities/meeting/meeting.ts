import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';
import { CycleId } from '../cycle';
import { MeetingTemplateId } from './meeting-template';
import { MeetingRecurrence } from '@/lib/types/meeting';

export interface MeetingTable extends BaseEntity {
  name: string;
  startDate: Date;
  recurrence: MeetingRecurrence;
  startTime: string;
  endTime: string;
  timezone: string;
  meetingTemplateId: MeetingTemplateId | null;
  cycleId: CycleId;
}

export type Meeting = Selectable<MeetingTable>;
export type NewMeeting = Insertable<MeetingTable>;
export type MeetingUpdate = Updateable<MeetingTable>;
