import { CamelCasePlugin, Kysely, KyselyConfig, Transaction as KyselyTransaction } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';
import * as dotenv from 'dotenv';

import { CycleTemplateTable, CycleTable } from './entities/cycle';
import { MeetingTemplateTable, MeetingTemplateParticipantsTable, MeetingTable } from './entities/meeting';
import { TeamTable, TeamMembersTable } from './entities/team';
import { AccountTable, SessionTable, UserTable, VerificationTokenTable } from './entities/auth';

dotenv.config();

interface Database {
  cycle: CycleTable;
  cycleTemplate: CycleTemplateTable;

  meeting: MeetingTable;
  meetingTemplate: MeetingTemplateTable;
  meetingTemplateParticipants: MeetingTemplateParticipantsTable;

  team: TeamTable;
  teamMembers: TeamMembersTable;

  User: UserTable;
  Account: AccountTable;
  Session: SessionTable;
  VerificationToken: VerificationTokenTable;
}

export const KYSELY_OPTIONS: KyselyConfig = {
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),

  plugins: [new CamelCasePlugin()],
};

export const db = new Kysely<Database>(KYSELY_OPTIONS);

export type Transaction = KyselyTransaction<Database>;
