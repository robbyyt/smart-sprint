import 'server-only';
import { UserId } from '@/lib/db/entities/auth';
import { db } from '@/lib/db';
import { NewTeam, TeamId } from '@/lib/db/entities/team';

export class TeamRepo {
  static async getUserTeamMembership(userId: UserId) {
    return this.getTeamForUserBaseQuery(userId).select(['team.id', 'team.name']).execute();
  }

  static async create({ name, ownerId }: NewTeam) {
    return db
      .insertInto('team')
      .values({
        ownerId,
        name,
      })
      .executeTakeFirst();
  }

  static async getTeamForUserById(userId: UserId, id: TeamId) {
    return this.getTeamForUserBaseQuery(userId)
      .select(['team.id', 'team.name'])
      .where('id', '=', id)
      .executeTakeFirst();
  }

  private static getTeamForUserBaseQuery(userId: UserId) {
    return db.selectFrom('team').where('team.ownerId', '=', userId);
  }
}
