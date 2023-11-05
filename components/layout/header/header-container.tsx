import React from 'react';

export default function HeaderContainer({ children }: { children: React.ReactNode }) {
  return (
    <header className='border-b'>
      <div className='flex h-16 items-center px-4'>{children}</div>
    </header>
  );
}
