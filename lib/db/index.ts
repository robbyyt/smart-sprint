import { CamelCasePlugin, Kysely, KyselyConfig } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';
import * as dotenv from 'dotenv';

import { CycleTemplateTable, CycleTable } from './entities/cycle';
import { MeetingTemplateTable, MeetingTemplateParticipantsTable } from './entities/meeting';
import { TeamTable, TeamMembersTable } from './entities/team';
import { AccountTable, SessionTable, UserTable, VerificationTokenTable } from './entities/auth';

dotenv.config();

interface Database {
  cycleTemplate: CycleTemplateTable;
  cycle: CycleTable;

  meetingTemplate: MeetingTemplateTable;
  meetingTemplateParticipants: MeetingTemplateParticipantsTable;

  team: TeamTable;
  teamMembers: TeamMembersTable;

  User: UserTable;
  Account: AccountTable;
  Session: SessionTable;
  VerificationToken: VerificationTokenTable;
}

const KYSELY_OPTIONS: KyselyConfig = {
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),

  plugins: [new CamelCasePlugin()],
};

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),

  plugins: [new CamelCasePlugin()],
});
