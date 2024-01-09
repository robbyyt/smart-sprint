import { redirect } from 'next/navigation';
import { TeamId } from '@/lib/db/entities/team';
import { getTeamById } from '@/lib/db/services/team.service';
import { columns } from '@/components/task-list/data-table/columns';
import { sampleTasks } from '@/components/task-list/mock-data';
import DataTable from '@/components/task-list/data-table';
import { setTeamId } from './context';
import SprintGridView from '@/components/sprint-capacity/sprint-grid-view';
import TaskWidget from '@/components/jira/task-widget';

export default async function Page({ params }: { params: { teamId: string } }) {
  const numericTeamId: TeamId = Number(params.teamId);

  if (!numericTeamId) redirect('/not-found');

  const team = await getTeamById(numericTeamId);
  if (!team) redirect('/not-found');
  else {
    setTeamId(team.id);
  }
  return (
    <div className='flex flex-col gap-4'>
      <SprintGridView />
      <TaskWidget />
    </div>
  );
}
