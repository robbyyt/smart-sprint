import { redirect } from 'next/navigation';
import CycleSetup from '@/components/team/cycle-setup';
import { TeamId } from '@/lib/db/entities/team';
import { getTeamById } from '@/lib/db/services/team.service';
import { setTeamId } from './context';

export default async function Page({ params }: { params: { teamId: string } }) {
  const numericTeamId: TeamId = Number(params.teamId);

  if (!numericTeamId) redirect('/not-found');

  const team = await getTeamById(numericTeamId);
  if (!team) redirect('/not-found');
  else {
    setTeamId(team.id);
  }
  return <CycleSetup teamId={numericTeamId} />;
}
