'use server';
import 'server-only';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import { Transaction, db } from '@/lib/db';
import { SetupCycleInput, setupCycleSchema } from '@/lib/schema/setup-cycle';
import { MappedZodError, mapZodError } from '@/lib/utils/zod';
import { TransactionalCycleTemplateRepo } from '../repos/cycle-template.repo';
import { TransactionalMeetingTemplateRepo } from '../../meeting/repos/meeting-template.repo';
import { UserId } from '@/lib/db/entities/auth';
import { MeetingTemplate, NewMeeting, NewMeetingTemplate } from '@/lib/db/entities/meeting';
import { CycleId, CycleTemplateId } from '@/lib/db/entities/cycle';
import { TransactionalCycleRepo } from '../repos/cycle.repo';
import { TransactionalMeetingRepo } from '../../meeting/repos/meeting.repo';

type SetupCycleOutput = { success: true } | { success: false; error: MappedZodError['error'] | 'unknown' };

export async function setupCycle(setupCycleInput: SetupCycleInput): Promise<SetupCycleOutput> {
  const session = await getServerSession();

  if (!session) {
    return redirect('/');
  }

  const parseResult = await setupCycleSchema.safeParseAsync(setupCycleInput);

  if (!parseResult.success) {
    return { success: false, error: mapZodError(parseResult.error) };
  }

  try {
    db.transaction().execute(async (trx) => {
      const { cycleTemplateId, meetingTemplates } = await setupCycleAndMeetingTemplates(
        setupCycleInput,
        session.user.id,
        trx
      );
      if (setupCycleInput.saveOnlyTemplate) return;
      await setupCycleAndMeetings(cycleTemplateId, setupCycleInput, meetingTemplates, session.user.id, trx);
    });
  } catch (err) {
    console.error(err);
    return { success: false, error: 'unknown' };
  }

  return { success: true };
}

async function setupCycleAndMeetingTemplates(
  { interval, meetings, timezone, teamId }: SetupCycleInput,
  actingUserId: UserId,
  trx: Transaction
) {
  const cycleTemplateRepo = new TransactionalCycleTemplateRepo(trx);
  const meetingTemplateRepo = new TransactionalMeetingTemplateRepo(trx);

  const [cycleTemplate] = await cycleTemplateRepo.create({
    teamId,
    timezone,
    startDate: interval.from,
    endDate: interval.to,
    createdBy: actingUserId,
  });

  if (!cycleTemplate?.id) {
    throw new Error('No cycle template id was returned');
  }

  const meetingTemplateInputs = mapMeetingInputsToMeetingTemplates(meetings, cycleTemplate.id, timezone);

  const insertedMeetingTemplates = await meetingTemplateRepo.createMultiple(meetingTemplateInputs);

  return {
    cycleTemplateId: cycleTemplate.id,
    meetingTemplates: insertedMeetingTemplates,
  };
}

async function setupCycleAndMeetings(
  cycleTemplateId: CycleTemplateId,
  { interval, timezone, teamId }: SetupCycleInput,
  meetingTemplates: MeetingTemplate[],
  actingUserId: UserId,
  trx: Transaction
) {
  const cycleRepo = new TransactionalCycleRepo(trx);
  const meetingRepo = new TransactionalMeetingRepo(trx);

  const [cycle] = await cycleRepo.create({
    cycleTemplateId,
    startDate: interval.from,
    endDate: interval.to,
    timezone,
    createdBy: actingUserId,
    teamId,
  });

  if (!cycle?.id) {
    throw new Error('No cycle template id was returned');
  }

  const meetingsToInsert = mapTemplatesToMeetings(meetingTemplates, cycle.id);

  await meetingRepo.createMultiple(meetingsToInsert);
}

function mapMeetingInputsToMeetingTemplates(
  meetings: SetupCycleInput['meetings'],
  cycleTemplateId: CycleTemplateId,
  timezone: string
): NewMeetingTemplate[] {
  return meetings.map(({ startDate, startTime, endTime, ...meeting }) => ({
    ...meeting,
    originalStartDate: startDate,
    startTime: `${startTime}:00`,
    endTime: `${endTime}:00`,
    timezone,
    cycleTemplateId,
  }));
}

function mapTemplatesToMeetings(meetingTemplates: MeetingTemplate[], cycleId: CycleId): NewMeeting[] {
  return meetingTemplates.map(({ id: meetingTemplateId, timezone, originalStartDate, startTime, endTime }) => ({
    cycleId,
    meetingTemplateId,
    timezone,
    startDate: originalStartDate,
    startTime,
    endTime,
  }));
}
