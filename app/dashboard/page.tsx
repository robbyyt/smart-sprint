import DashboardLayout from '@/components/layout/dashboard-layout';
import { getTeamMembership } from '@/lib/db/services/team.service';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const teams = await getTeamMembership();
  if (teams.length) {
    redirect(`/dashboard/${teams[0].id}`);
  }
  return <DashboardLayout currentTeamId={null}></DashboardLayout>;
}
