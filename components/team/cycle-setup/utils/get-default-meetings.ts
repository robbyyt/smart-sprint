import { MeetingInput } from '@/lib/schema/setup-cycle';
import { MEETING_RECURRENCE_VALUES } from '@/lib/types/meeting';

export default function getDefaultMeetings(startDate: Date): MeetingInput[] {
  return [
    {
      name: 'Daily standup',
      startDate,
      startTime: '10:00',
      endTime: '10:30',
      recurrence: MEETING_RECURRENCE_VALUES[1],
    },
  ];
}
