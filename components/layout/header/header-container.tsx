import React from 'react';

export default function HeaderContainer({ children }: { children: React.ReactNode }) {
  return (
    <header className='border-b'>
      <div className='mx-auto flex h-16 max-w-[1920px] items-center px-4'>{children}</div>
    </header>
  );
}
