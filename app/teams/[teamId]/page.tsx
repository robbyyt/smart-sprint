import { redirect } from 'next/navigation';
import { TeamId } from '@/lib/db/entities/team';
import { getTeamById } from '@/lib/db/services/team.service';
import { columns } from '@/components/task-list/data-table/columns';
import { sampleTasks } from '@/components/task-list/mock-data';
import DataTable from '@/components/task-list/data-table';
import { setTeamId } from './context';

export default async function Page({ params }: { params: { teamId: string } }) {
  const numericTeamId: TeamId = Number(params.teamId);

  if (!numericTeamId) redirect('/not-found');

  const team = await getTeamById(numericTeamId);
  if (!team) redirect('/not-found');
  else {
    setTeamId(team.id);
  }
  return <DataTable columns={columns} data={sampleTasks} />;
}
