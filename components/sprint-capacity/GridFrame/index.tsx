import FrameRow from './FrameRow';
import type { User } from '@/lib/types/user';

interface GridFrameProps {
  users: User[];
  totalDays: number;
}

const GridFrame = ({ users, totalDays }: GridFrameProps) => {
  return (
    <>
      {users.map((user, index) => (
        <FrameRow key={user.name + index} user={user} totalDays={totalDays} row={index + 2} />
      ))}
    </>
  );
};

export default GridFrame;
