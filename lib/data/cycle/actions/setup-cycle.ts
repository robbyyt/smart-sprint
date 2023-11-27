'use server';
import 'server-only';
import { redirect } from 'next/navigation';
import { InsertResult } from 'kysely';
import { getServerSession } from '@/lib/auth';
import { Transaction, db } from '@/lib/db';
import { SetupCycleInput, setupCycleSchema } from '@/lib/schema/setup-cycle';
import { mapZodError } from '@/lib/utils/zod';
import { TransactionalCycleTemplateRepo } from '../repos/cycle-template.repo';
import { TransactionalMeetingTemplateRepo } from '../../meeting/repos/meeting-template.repo';
import { UserId } from '@/lib/db/entities/auth';
import { MeetingTemplate, NewMeeting, NewMeetingTemplate } from '@/lib/db/entities/meeting';
import { CycleId, CycleTemplateId } from '@/lib/db/entities/cycle';
import { TransactionalCycleRepo } from '../repos/cycle.repo';
import { TransactionalMeetingRepo } from '../../meeting/repos/meeting.repo';
import { ActionError } from '@/lib/types/actions';

type SetupCycleOutput = { success: true } | ActionError;

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

  const { insertId: cycleTemplateInsertId } = await cycleTemplateRepo.create({
    teamId,
    timezone,
    startDate: interval.from,
    endDate: interval.to,
    createdBy: actingUserId,
  });

  if (!cycleTemplateInsertId) {
    throw new Error('No cycle template id was returned');
  }

  const cycleTemplateId = Number(cycleTemplateInsertId);

  const meetingTemplateInputs = mapMeetingInputsToMeetingTemplates(meetings, cycleTemplateId, timezone);

  const meetingTemplateInsertResult = await meetingTemplateRepo.createMultiple(meetingTemplateInputs);

  return {
    cycleTemplateId: cycleTemplateId,
    meetingTemplates: appendIdsToMeetingTemplateInputs(meetingTemplateInputs, meetingTemplateInsertResult),
  };
}

async function setupCycleAndMeetings(
  cycleTemplateId: CycleTemplateId,
  { interval, timezone, teamId }: SetupCycleInput,
  meetingTemplates: Omit<MeetingTemplate, 'createdAt' | 'updatedAt'>[],
  actingUserId: UserId,
  trx: Transaction
) {
  const cycleRepo = new TransactionalCycleRepo(trx);
  const meetingRepo = new TransactionalMeetingRepo(trx);

  const { insertId: cycleInsertId } = await cycleRepo.create({
    cycleTemplateId,
    startDate: interval.from,
    endDate: interval.to,
    timezone,
    createdBy: actingUserId,
    teamId,
  });

  if (!cycleInsertId) {
    throw new Error('No cycle id was returned');
  }

  const cycleId = Number(cycleInsertId);

  const meetingsToInsert = mapTemplatesToMeetings(meetingTemplates, cycleId);

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

function mapTemplatesToMeetings(
  meetingTemplates: Omit<MeetingTemplate, 'createdAt' | 'updatedAt'>[],
  cycleId: CycleId
): NewMeeting[] {
  return meetingTemplates.map(
    ({ id: meetingTemplateId, originalStartDate: startDate, cycleTemplateId: _cycleTemplateId, ...template }) => ({
      cycleId,
      meetingTemplateId,
      startDate,
      ...template,
    })
  );
}

function appendIdsToMeetingTemplateInputs(
  meetingTemplateInputs: NewMeetingTemplate[],
  insertResults: InsertResult[]
): Omit<MeetingTemplate, 'createdAt' | 'updatedAt'>[] {
  if (meetingTemplateInputs.length !== insertResults.length) {
    throw new Error('Input arrays should have the same length');
  }
  return meetingTemplateInputs.map((template, index) => ({
    ...template,
    id: Number(insertResults[index].insertId),
  }));
}
