import { Kysely, CamelCasePlugin } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';
import * as dotenv from 'dotenv';

import { CycleTemplateTable, CycleTable } from './entities/cycle';
import { MeetingTemplateTable, MeetingTemplateParticipantsTable } from './entities/meeting';
import { TeamTable, TeamMembersTable } from './entities/team';

dotenv.config();

interface Database {
  cycleTemplate: CycleTemplateTable;
  cycle: CycleTable;

  meetingTemplate: MeetingTemplateTable;
  meetingTemplateParticipants: MeetingTemplateParticipantsTable;

  team: TeamTable;
  teamMembers: TeamMembersTable;
}

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),

  plugins: [new CamelCasePlugin()],
});
