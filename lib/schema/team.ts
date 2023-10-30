import { type } from 'os';
import { z } from 'zod';

const MIN_TEAM_NAME_CHARS = 3;

const MAX_TEAM_NAME_CHARS = 20;

const teamNameSchema = z
  .string()
  .min(MIN_TEAM_NAME_CHARS, {
    message: `Team name must be at least ${MIN_TEAM_NAME_CHARS}`,
  })
  .max(MAX_TEAM_NAME_CHARS, { message: `Team name must not be longer than ${MAX_TEAM_NAME_CHARS}` });

export const createTeamSchema = z.object({
  name: teamNameSchema,
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
