import { MEETING_RECURRENCE_VALUES, MeetingInput } from '@/lib/schema/cycle-template';

export default function getDefaultMeetings(): MeetingInput[] {
  return [{ name: 'Daily standup', start: '10:00', end: '10:30', recurrence: MEETING_RECURRENCE_VALUES[1] }];
}
