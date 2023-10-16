import { Button } from '@/components/ui/button';
import HeaderContainer from './header-container';
import NavLinks from './nav-links';
import Link from 'next/link';
import { getServerSession } from '@/lib/auth';

export default async function MarketingHeader() {
  const session = await getServerSession();

  return (
    <HeaderContainer>
      <NavLinks className='mx-6' />
      <div className='ml-auto flex items-center space-x-4'>
        <Button variant='outline' asChild>
          <Link href={session ? '/dashboard' : '/api/auth/signin'}>{session ? 'Dashboard' : 'Log in'}</Link>
        </Button>
      </div>
    </HeaderContainer>
  );
}
