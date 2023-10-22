import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';
import { UserId } from '../auth';

export interface TeamTable extends BaseEntity {
  name: string;
  ownerId: UserId;
}

export type Team = Selectable<TeamTable>;
export type NewTeam = Insertable<TeamTable>;
export type TeamUpdate = Updateable<TeamTable>;
