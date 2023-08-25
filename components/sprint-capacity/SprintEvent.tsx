import { EventType } from '@/lib/types/sprint';
import { cn } from '@/lib/utils/styles';

export interface SprintEventProps {
  title: string;
  description?: string;
  type: EventType | string;
  duration: string;
  row: number;
  column: number;
}

const getColorClassesForType = (eventType: EventType | string) => {
  switch (eventType) {
    case EventType.TASK_DEVELOPMENT:
      return 'bg-blue-400/20 border-blue-700/10 text-blue-600';
    case EventType.TASK_REVIEW:
      return 'bg-pink-400/20 border-pink-700/10 text-pink-600';
    case EventType.TASK_TESTING:
      return 'bg-purple-400/20 border-purple-700/10 text-purple-600';
    default:
      return 'bg-gray-400/20 border-gray-700/10 text-gray-600';
  }
};

const SprintEvent = ({ title, description, type, duration, row, column }: SprintEventProps) => {
  return (
    <div
      style={{
        gridColumnStart: column,
        gridRowStart: row,
      }}
      className={cn('m-1 flex flex-col rounded-lg border p-1', getColorClassesForType(type))}
    >
      <span className='text-xs'>{duration}</span>
      <span className='text-xs font-medium'>{title}</span>
      {description && <span className='text-xs'>{description}</span>}
    </div>
  );
};

export default SprintEvent;
