'use client';
import { useForm } from 'react-hook-form';
import { SetupCycleInput, setupCycleSchema } from '@/lib/schema/cycle-template';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TeamId } from '@/lib/db/entities/team';
import { Form } from '@/components/ui/form';

import { useEffect } from 'react';
import GeneralInformationFormStep from './general-information-form-step';

type TeamSetupProps = { teamId: TeamId };

const getDefaultFormValues = (teamId: TeamId): Partial<SetupCycleInput> => ({
  teamId: teamId,
});

export default function TeamSetup({ teamId }: TeamSetupProps) {
  const form = useForm<SetupCycleInput>({
    resolver: zodResolver(setupCycleSchema),
    defaultValues: getDefaultFormValues(teamId),
  });

  useEffect(() => {
    form.reset({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  }, [form]);

  return (
    <Form {...form}>
      <GeneralInformationFormStep />
    </Form>
  );
}
