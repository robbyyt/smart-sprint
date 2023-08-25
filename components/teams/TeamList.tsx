import TeamListItem from './TeamListItem';
import { TeamData } from '@/lib/types/team';

interface TeamListingProps {
  teams: TeamData[];
}

const TeamListing = ({ teams }: TeamListingProps) => {
  return (
    <div>
      {teams.map((teamData) => (
        <TeamListItem key={teamData.id} {...teamData} />
      ))}
    </div>
  );
};

export default TeamListing;
