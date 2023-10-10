import { BaseEntity } from '../../types';

export interface SessionTable extends BaseEntity<string> {
  userId: string;
  sessionToken: string;
  expires: Date;
}
