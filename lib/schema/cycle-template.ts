import { z } from 'zod';
import { SUPPORTED_TIMEZONES } from '../constants/timezones';

export const createCycleTemplateSchema = z.object({
  durationInWorkDays: z.number({ required_error: 'Duration in work days is required!' }),
  startWeekDay: z.number({ required_error: 'You must pick a starting date!' }).min(1).max(5),
  timezone: z
    .string()
    .refine((timezone) => SUPPORTED_TIMEZONES.has(timezone), 'Must be one of the supported timezones!'),
  teamId: z.number(),
});

export type CreateCycleTemplateInput = z.infer<typeof createCycleTemplateSchema>;
