import { sampleUsers } from '@/components/sprint-capacity/mock-data';
import { TeamData } from '@/lib/types/team';

export const teamData: TeamData[] = [
  {
    id: 1,
    name: 'Anazom',
    totalMembers: 2,
    membersToShowcase: sampleUsers,
  },
  {
    id: 2,
    name: 'Booble',
    totalMembers: 4,
    membersToShowcase: [...sampleUsers],
  },
];
