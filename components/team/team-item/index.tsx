'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { TeamId } from '@/lib/db/entities/team';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { H3 } from '@/components/ui/typography';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

export type TeamItemProps = {
  id: TeamId;
  name: string;
  setupComplete: boolean;
};

export default function TeamItem({ id, name, setupComplete }: TeamItemProps) {
  const teamItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = teamItemRef.current;
    if (element) {
      const mouseMoveHandler = (e: MouseEvent) => {
        const { x, y } = element.getBoundingClientRect();
        element.style.setProperty('--x', `${e.clientX - x}`);
        element.style.setProperty('--y', `${e.clientY - y}`);
      };

      element.addEventListener('mousemove', mouseMoveHandler);

      return () => element.removeEventListener('mousemove', mouseMoveHandler);
    }
  }, [teamItemRef]);
  return (
    <div className='flex flex-col gap-4 rounded-md border-2 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Avatar className='mr-2 h-5 w-5'>
            <AvatarImage src={`https://avatar.vercel.sh/${name}.png`} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <H3>{name}</H3>
        </div>
        {!setupComplete && <ExclamationTriangleIcon className='text-warning' />}
      </div>
      <div className='flex justify-end'>
        <Button asChild>
          <Link href={`/teams/${id}`}>Manage</Link>
        </Button>
      </div>
    </div>
  );
}
