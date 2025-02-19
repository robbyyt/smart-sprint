import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

// TODO: Generate migration for this once user setup is done
export interface TeamMembersTable extends BaseEntity {
  teamId: number;
  userId: number;
}

export type TeamMember = Selectable<TeamMembersTable>;
export type NewTeamMembers = Insertable<TeamMembersTable>;
export type TeamMembersUpdate = Updateable<TeamMembersTable>;
