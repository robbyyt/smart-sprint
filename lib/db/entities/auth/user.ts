import { Insertable, Selectable, Updateable } from 'kysely';
import { BaseEntity } from '../../types';

export interface UserTable extends BaseEntity<string> {
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type UserId = User['id'];
