import NavLinks from './nav-links';
import TeamSwitcher from '../../team/team-switcher';
import { UserProfileLinks } from './user-profile-links';
import HeaderContainer from './header-container';
import { getTeamMembership } from '@/lib/db/services/team.service';

export default async function DashboardHeader() {
  const teams = await getTeamMembership();
  return (
    <HeaderContainer>
      <TeamSwitcher teams={teams} />
      <NavLinks className='mx-6' />
      <div className='ml-auto flex items-center space-x-4'>
        <UserProfileLinks />
      </div>
    </HeaderContainer>
  );
}
