import { z } from 'zod';
import { SUPPORTED_TIMEZONES_SET } from '../constants/timezones';

export const MEETING_RECURRENCE_VALUES = [
  'NO_REPEAT',
  'EVERY_WEEKDAY',
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'CUSTOM',
] as const;

const CUSTOM_RECURRENCE_UNIT = ['DAY', 'WEEK', 'MONTH'] as const;

export type MeetingRecurrence = (typeof MEETING_RECURRENCE_VALUES)[number];

export const MEETING_RECURRENCE_LABELS: Record<MeetingRecurrence, string> = {
  NO_REPEAT: 'No repeat',
  EVERY_WEEKDAY: 'Every weekday',
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  CUSTOM: 'Custom',
};

const meetingSchema = z.object({
  name: z.string(),
  start: z.string(),
  end: z.string(),
  recurrence: z.enum(MEETING_RECURRENCE_VALUES),
  customRecurrenceDetails: z
    .object({
      unit: z.enum(CUSTOM_RECURRENCE_UNIT),
      value: z.number().int().positive(),
    })
    .optional(),
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
});
export type SetupCycleInput = z.infer<typeof setupCycleSchema>;
