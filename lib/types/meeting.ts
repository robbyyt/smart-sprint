export const MEETING_RECURRENCE_VALUES = ['NO_REPEAT', 'EVERY_WEEKDAY', 'DAILY', 'WEEKLY', 'MONTHLY'] as const;

export type MeetingRecurrence = (typeof MEETING_RECURRENCE_VALUES)[number];
