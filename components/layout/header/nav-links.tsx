import { cn } from '@/lib/utils/styles';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

function Navbar({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...rest}>
      <Link href='/' className='text-sm font-medium transition-colors hover:text-primary'>
        Overview
      </Link>
      <Link href='/about' className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
        About us
      </Link>
    </nav>
  );
}

export default Navbar;
