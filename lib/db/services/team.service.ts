import { getServerSession } from '@/lib/auth';
import { TeamRepo } from '@/lib/db/repos/team.repo';

// Methods exposed from this service should be thought of as API endpoints and thus check for the existence of a session.

export const getTeamMembership = async () => {
  const session = await getServerSession();
  if (!session) {
    return [];
  }
  return TeamRepo.getUserTeamMembership(session.user.id);
};
