import { MEETING_RECURRENCE_VALUES, MeetingInput } from '@/lib/schema/cycle-template';

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
