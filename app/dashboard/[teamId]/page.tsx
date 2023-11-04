import { TeamId } from '@/lib/db/entities/team';
import { getTeamById } from '@/lib/db/services/team.service';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { setTeamId } from './context';
import TeamSetup from '@/components/dashboard/team-setup';

export default async function Page({ params }: { params: { teamId: string } }) {
  const numericTeamId: TeamId = Number(params.teamId);

  if (!numericTeamId) redirect('/not-found');

  const team = await getTeamById(numericTeamId);

  if (!team) redirect('/not-found');
  else {
    setTeamId(team.id);
  }

  return (
    <DashboardLayout currentTeamId={team.id}>
      <TeamSetup teamId={team.id} />
    </DashboardLayout>
  );
}