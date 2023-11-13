import { z } from 'zod';
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

const meetingSchema = z.object({
  name: z.string().min(3, `Meeting name must have a length of at least ${MIN_MEETING_NAME_CHARS}`),
  startDate: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  recurrence: z.enum(MEETING_RECURRENCE_VALUES),
});

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
