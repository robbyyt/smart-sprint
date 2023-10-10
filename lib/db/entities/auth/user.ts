import { BaseEntity } from '../../types';

export interface UserTable extends BaseEntity<string> {
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}
