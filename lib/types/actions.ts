import { MappedZodError } from '@/lib/utils/zod';

export type ActionError = { success: false; error: MappedZodError['error'] | 'unknown' };
