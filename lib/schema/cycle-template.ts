import { z } from 'zod';
import { SUPPORTED_TIMEZONES_SET } from '../constants/timezones';

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
});

export type SetupCycleInput = z.infer<typeof setupCycleSchema>;
