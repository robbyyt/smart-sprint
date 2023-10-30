import { TeamId } from '@/lib/db/entities/team';
import { getTeamById } from '@/lib/db/services/team.service';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';

export default async function Page({ params }: { params: { teamId: string } }) {
  const numericTeamId: TeamId = Number(params.teamId);

  if (!numericTeamId) redirect('/not-found');

  const team = await getTeamById(numericTeamId);

  if (!team) redirect('/not-found');

  return <DashboardLayout currentTeamId={team.id}>{JSON.stringify(team)}</DashboardLayout>;
}
