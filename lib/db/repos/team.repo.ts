import { UserId } from '@/lib/db/entities/auth';
import { db } from '..';
import { NewTeam } from '../entities/team';

export class TeamRepo {
  static async getUserTeamMembership(userId: UserId) {
    return db.selectFrom('team').where('team.ownerId', '=', userId).select(['team.id', 'team.name']).execute();
  }

  static async createTeam({ name, ownerId }: NewTeam) {
    return db
      .insertInto('team')
      .values({
        ownerId,
        name,
      })
      .executeTakeFirst();
  }
}
