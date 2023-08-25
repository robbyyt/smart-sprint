import GridHeader from './GridHeader';
import { eachDayOfInterval } from 'date-fns';
import GridFrame from './GridFrame';
import { sampleStartDate, sampleEndDate, sampleUsers, events } from './mock-data';
import SprintEvent from './SprintEvent';

const SprintGridView = () => {
  const dayArray = eachDayOfInterval({
    start: sampleStartDate,
    end: sampleEndDate,
  });
  return (
    <div
      className='grid overflow-auto border-2'
      style={{
        gridTemplateColumns: `repeat(${dayArray.length + 1}, minmax(175px, 1fr))`,
        gridTemplateRows: `auto repeat(${sampleUsers.length}, 175px)`,
      }}
    >
      <GridHeader days={dayArray} />
      <GridFrame users={sampleUsers} totalDays={dayArray.length} />
      {events.map((event) => (
        <SprintEvent key={event.title} {...event} />
      ))}
    </div>
  );
};

export default SprintGridView;
