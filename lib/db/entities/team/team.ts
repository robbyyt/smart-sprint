import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

export interface TeamTable extends BaseEntity {
  name: string;
  ownerId: number;
}

export type Team = Selectable<TeamTable>;
export type NewTeam = Insertable<TeamTable>;
export type TeamUpdate = Updateable<TeamTable>;
