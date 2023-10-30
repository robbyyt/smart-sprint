import { getServerSession } from '@/lib/auth';
import { TeamRepo } from '@/lib/data/team/repos/team.repo';
import { TeamId } from '../entities/team';

// Methods exposed from this service should be thought of as API endpoints and thus check for the existence of a session.

export const getTeamMembership = async () => {
  const session = await getServerSession();
  if (!session) {
    return [];
  }
  return TeamRepo.getUserTeamMembership(session.user.id);
};

export const getTeamById = async (id: TeamId) => {
  const session = await getServerSession();
  if (!session) return null;

  return TeamRepo.getTeamForUserById(session.user.id, id);
};
