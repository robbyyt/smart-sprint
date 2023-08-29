import { format } from 'date-fns';
import HeaderItem from './header-item';

interface GridHeaderProps {
  days: Date[];
}

const GridHeader = ({ days }: GridHeaderProps) => {
  return (
    <>
      <HeaderItem />
      {days.map((day, index) => (
        <HeaderItem key={`header-day-${index}`} text={format(day, 'EEE')} />
      ))}
    </>
  );
};

export default GridHeader;
