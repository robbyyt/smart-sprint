import SprintGridView from '@/components/sprint-capacity/sprint-grid-view';
import TeamListing from '@/components/teams/team-list';
import { teamData } from '@/components/teams/mock-data';

export default function Home() {
  return (
    <main className='p-12'>
      <SprintGridView />
      <TeamListing teams={teamData} />
    </main>
  );
}
