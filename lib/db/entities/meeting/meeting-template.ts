import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

// TODO: Generate migration for this
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
