import { range } from '@/lib/utils/array';
import type { User } from '@/lib/types/user';
import UserDataColumn from './UserDataColumn';

interface FrameRowProps {
  row: number;
  totalDays: number;
  user: User;
}

const FrameRow = ({ row, totalDays, user }: FrameRowProps) => {
  const columnsToDecorate = range(totalDays, 2);

  return (
    <>
      <UserDataColumn user={user} row={row} />
      {columnsToDecorate.map((column, index) => (
        <div
          style={{ gridColumnStart: column, gridRowStart: row }}
          key={`frame-row-col-${column}`}
          className={`border-b ${index !== columnsToDecorate.length - 1 && 'border-r'}`}
        ></div>
      ))}
    </>
  );
};

export default FrameRow;
