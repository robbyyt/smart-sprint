import 'server-only';
import { UserId } from '@/lib/db/entities/auth';
import { db } from '@/lib/db';
import { NewTeam, TeamId } from '@/lib/db/entities/team';
import { sql, SqlBool } from 'kysely';

export class TeamRepo {
  static async getUserTeamMembership(userId: UserId) {
    return this.getTeamForUserBaseQuery(userId)
      .select(({ eb }) => [
        'team.id',
        'team.name',
        eb
          .exists(
            eb
              .selectFrom('cycleTemplate')
              .selectAll()
              .where('cycleTemplate.teamId', '=', sql`team.id`)
          )
          .as('setupComplete'),
      ])
      .execute();
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
