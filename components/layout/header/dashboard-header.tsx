import NavLinks from './nav-links';
import TeamSwitcher from './team-switcher';
import { UserProfileLinks } from './user-profile-links';
import HeaderContainer from './header-container';

export default function DashboardHeader() {
  return (
    <HeaderContainer>
      <TeamSwitcher />
      <NavLinks className='mx-6' />
      <div className='ml-auto flex items-center space-x-4'>
        <UserProfileLinks />
      </div>
    </HeaderContainer>
  );
}
