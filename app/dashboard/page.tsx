import TeamList from '@/components/team/team-list';
import { H1, H2 } from '@/components/ui/typography';

export default async function Dashboard() {
  return (
    <div>
      <H1 className='mb-6'>Dashboard</H1>
      <section>
        <H2>Teams</H2>
        <TeamList />
      </section>
    </div>
  );
}
