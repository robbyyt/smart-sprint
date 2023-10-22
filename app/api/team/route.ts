import { BadRequest, UnauthorizedAccess } from '@/lib/api/standard-responses';
import { getServerSession } from '@/lib/auth';
import { TeamRepo } from '@/lib/db/repos/team.repo';
import { createTeamSchema } from '@/lib/schema/team';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return UnauthorizedAccess();
  }

  const body = await request.json();

  const parseResult = await createTeamSchema.safeParseAsync(body);

  if (!parseResult.success) {
    return BadRequest(parseResult.error);
  }

  const insertResponse = await TeamRepo.createTeam({ name: parseResult.data.name, ownerId: session.user.id });
  return Response.json({ id: Number(insertResponse.insertId) }, { status: 201 });
}
