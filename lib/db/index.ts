import 'server-only';
import { Kysely, CamelCasePlugin } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

import { CycleTemplateTable } from './entities/cycle';
import { MeetingTemplateTable, MeetingTemplateParticipantsTable } from './entities/meeting';
import { TeamTable, TeamMembersTable } from './entities/team';

interface Database {
  cycleTemplate: CycleTemplateTable;

  meetingTemplate: MeetingTemplateTable;
  meetingTemplateParticipants: MeetingTemplateParticipantsTable;

  team: TeamTable;
  teamMembers: TeamMembersTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
  plugins: [new CamelCasePlugin()],
});
