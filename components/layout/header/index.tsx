import NavLinks from './NavLinks';
import TeamSwitcher from './TeamSwitcher';
import { UserProfileLinks } from './UserProfileLinks';

function Header() {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <TeamSwitcher />
        <NavLinks className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserProfileLinks />
        </div>
      </div>
    </div>
  );
}

export default Header;
