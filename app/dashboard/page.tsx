import SprintGridView from '@/components/sprint-capacity/sprint-grid-view';
import TeamListing from '@/components/teams/team-list';
import { teamData } from '@/components/teams/mock-data';
import DataTable from '@/components/task-list/data-table';
import { columns } from '@/components/task-list/data-table/columns';
import { sampleTasks } from '@/components/task-list/mock-data';

export default function Home() {
  return (
    <>
      <SprintGridView />
      <TeamListing teams={teamData} />
      <DataTable columns={columns} data={sampleTasks} />
    </>
  );
}
