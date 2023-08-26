'use client';
import { User } from '@/lib/types/user';
import { Avatar } from '@/components/ui/Avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface UserDataColumnProps {
  row: number;
  user: User;
}

const UserDataColumn = ({ user, row }: UserDataColumnProps) => {
  return (
    <div
      style={{ gridRowStart: row }}
      className='sticky left-0 col-start-[1] flex flex-col items-center justify-center border-r bg-card p-1.5 text-xs font-medium uppercase'
    >
      <Avatar>
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      {user.name}
    </div>
  );
};

export default UserDataColumn;
