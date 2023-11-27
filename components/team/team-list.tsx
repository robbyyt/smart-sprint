import { getTeamMembership } from '@/lib/db/services/team.service';
import TeamItem from './team-item';
import { castToBool } from '@/lib/db/utils/conversion';

export default async function TeamList() {
  const teams = await getTeamMembership();
  return (
    <div className='grid grid-cols-1 gap-20 pt-4 md:grid-cols-2 lg:grid-cols-3'>
      {teams.map((team) => (
        <TeamItem key={team.id} {...team} setupComplete={castToBool(team.setupComplete)} />
      ))}
    </div>
  );
}
