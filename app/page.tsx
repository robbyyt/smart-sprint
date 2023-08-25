import SprintGridView from '@/components/sprint-capacity/SprintGridView';
import TeamListing from '@/components/teams/TeamList';
import { teamData } from '@/components/teams/mock-data';

export default function Home() {
  return (
    <main className='p-12'>
      <SprintGridView />
      <TeamListing teams={teamData} />
    </main>
  );
}
