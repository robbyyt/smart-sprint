import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

export interface MeetingTemplateParticipantsTable extends BaseEntity {
  meetingTemplateId: number;
  userId: number;
}

export type MeetingParticipant = Selectable<MeetingTemplateParticipantsTable>;
export type NewMeetingParticipant = Insertable<MeetingTemplateParticipantsTable>;
export type MeetingParticipantUpdate = Updateable<MeetingTemplateParticipantsTable>;
