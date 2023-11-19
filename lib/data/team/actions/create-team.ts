'use server';
import 'server-only';
import { getServerSession } from '@/lib/auth';
import { CreateTeamInput, createTeamSchema } from '@/lib/schema/team';
import { redirect } from 'next/navigation';
import { TeamRepo } from '../repos/team.repo';
import { mapZodError } from '@/lib/utils/zod';
import { ActionError } from '@/lib/types/actions';

type CreateTeamOutput = { success: true; data: { id: number } } | ActionError;

export async function createTeam(teamInput: CreateTeamInput): Promise<CreateTeamOutput> {
  const session = await getServerSession();

  if (!session) {
    return redirect('/');
  }

  const parseResult = await createTeamSchema.safeParseAsync(teamInput);

  if (!parseResult.success) {
    return { success: false, error: mapZodError(parseResult.error) };
  }
  try {
    const insertResponse = await TeamRepo.create({ name: parseResult.data.name, ownerId: session.user.id });
    return { success: true, data: { id: Number(insertResponse.insertId) } };
  } catch (err) {
    console.error('Error creating team', err);
    return { success: false, error: 'unknown' };
  }
}
