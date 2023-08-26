import { cn } from '@/lib/utils/styles';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

function Navbar({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <Link href='/examples/dashboard' className='text-sm font-medium transition-colors hover:text-primary'>
        Overview
      </Link>
      <Link
        href='/examples/dashboard'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Customers
      </Link>
      <Link
        href='/examples/dashboard'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Products
      </Link>
      <Link
        href='/examples/dashboard'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Settings
      </Link>
    </nav>
  );
}

export default Navbar;
