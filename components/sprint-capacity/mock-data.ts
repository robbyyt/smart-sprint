import { addWeeks } from 'date-fns';
import { EventType } from '@/lib/types/sprint';
import { User } from '@/lib/types/user';
import { SprintEventProps } from './SprintEvent';

export const sampleStartDate = new Date();
export const sampleEndDate = addWeeks(sampleStartDate, 2);

export const sampleUsers: User[] = [
  {
    name: 'John',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Joelandro',
    imageUrl:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
];

export const events: SprintEventProps[] = [
  {
    title: 'Very important task',
    type: EventType.TASK_DEVELOPMENT,
    description: 'Important',
    duration: '3h',
    row: 2,
    column: 3,
  },
  {
    title: 'Very important review',
    type: EventType.TASK_REVIEW,
    description: 'Important',
    duration: '3h',
    row: 3,
    column: 4,
  },
  {
    title: 'Very important test',
    type: EventType.TASK_TESTING,
    description: 'Important',
    duration: '3h',
    row: 3,
    column: 5,
  },
  {
    title: 'Daily',
    type: EventType.DAILY_SCRUM,
    description: 'Also Important',
    duration: '3h',
    row: 2,
    column: 4,
  },
];
