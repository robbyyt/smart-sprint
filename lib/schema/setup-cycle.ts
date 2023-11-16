import { z } from 'zod';
import isTime from 'validator/lib/isTime';
import { SUPPORTED_TIMEZONES_SET } from '../constants/timezones';

export const MEETING_RECURRENCE_VALUES = ['NO_REPEAT', 'EVERY_WEEKDAY', 'DAILY', 'WEEKLY', 'MONTHLY'] as const;

export type MeetingRecurrence = (typeof MEETING_RECURRENCE_VALUES)[number];

export const MEETING_RECURRENCE_LABELS: Record<MeetingRecurrence, string> = {
  NO_REPEAT: 'No repeat',
  EVERY_WEEKDAY: 'Every weekday',
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
};

const MIN_MEETING_NAME_CHARS = 3;
const MAX_MEETING_NAME_CHARS = 45;

const meetingSchema = z
  .object({
    name: z
      .string()
      .min(MIN_MEETING_NAME_CHARS, `Meeting name must have a length of at least ${MIN_MEETING_NAME_CHARS}!`)
      .max(MAX_MEETING_NAME_CHARS, `Meeting name must not be longer than ${MAX_MEETING_NAME_CHARS}!`),
    startDate: z.coerce.date(),
    startTime: z.string().refine((val) => isTime(val), { message: 'Invalid time value!' }),
    endTime: z.string().refine((val) => isTime(val), { message: 'Invalid time value!' }),
    recurrence: z.enum(MEETING_RECURRENCE_VALUES),
  })
  .refine((meeting) => meeting.endTime > meeting.startTime, { message: 'End time has to be after the start time' });

export type MeetingInput = z.infer<typeof meetingSchema>;

export const setupCycleSchema = z.object({
  teamId: z.number(),
  interval: z
    .object({
      from: z.coerce.date(),
      to: z.coerce.date({ required_error: 'An end date is required!', invalid_type_error: 'An end date is required!' }),
    })
    .refine((data) => data.to > data.from, { message: 'End of interval should come after the beginning!' }),
  timezone: z
    .string()
    .refine((timezone) => SUPPORTED_TIMEZONES_SET.has(timezone), 'Must be one of the supported timezones!'),
  meetings: z.array(meetingSchema),
  saveOnlyTemplate: z.boolean(),
});
export type SetupCycleInput = z.infer<typeof setupCycleSchema>;
