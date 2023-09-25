import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

export interface MeetingTemplateTable extends BaseEntity {
  cycleTemplateId: number;
  day: number;
  startTime: string;
  endTime: string;
  timeZone: string;
}

export type MeetingTemplate = Selectable<MeetingTemplateTable>;
export type NewMeetingTemplate = Insertable<MeetingTemplateTable>;
export type MeetingTemplateUpdate = Updateable<MeetingTemplateTable>;
