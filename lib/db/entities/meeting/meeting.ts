import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

export interface MeetingTable extends BaseEntity<string> {
  cycleId: number;
  startDate: Date;
  startTime: string;
  endTime: string;
  timeZone: string;
  meetingTemplateId: string | null;
}

export type Meeting = Selectable<MeetingTable>;
export type NewMeeting = Insertable<MeetingTable>;
export type MeetingUpdate = Updateable<MeetingTable>;