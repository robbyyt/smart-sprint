'use client';
import { useForm } from 'react-hook-form';
import { SetupCycleInput, setupCycleSchema } from '@/lib/schema/cycle-template';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TeamId } from '@/lib/db/entities/team';
import { Form } from '@/components/ui/form';

import { useEffect, useMemo } from 'react';
import GeneralInformationFormStep from './general-information-form-step';
import { Step, Steps, StepContent, StepContentProps } from '@/components/ui/stepper';
import { Separator } from '@/components/ui/separator';
import useTeamSetupSteps, { teamSetupSteps } from './use-team-setup-steps';

type TeamSetupProps = { teamId: TeamId };

const getDefaultFormValues = (teamId: TeamId): Partial<SetupCycleInput> => ({
  teamId: teamId,
});

export default function TeamSetup({ teamId }: TeamSetupProps) {
  const form = useForm<SetupCycleInput>({
    resolver: zodResolver(setupCycleSchema),
    defaultValues: getDefaultFormValues(teamId),
  });

  const stepContents: StepContent<StepContentProps>[] = useMemo(() => [{ component: GeneralInformationFormStep }], []);

  const { activeStep } = useTeamSetupSteps();

  useEffect(() => {
    form.reset({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  }, [form]);

  const { component: StepContent, props: stepContentProps } = stepContents[activeStep];

  return (
    <Form {...form}>
      <div>
        <div>
          <h1 className='mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Setup your first development cycle
          </h1>
          <p className='mb-2 leading-7 '>...and start iterating towards your next big goal. ⭐️</p>
          <Separator />
        </div>
        <div className='mx-auto flex flex-col rounded-md bg-card md:flex-row md:justify-between md:px-4'>
          <form className='flex flex-1 pt-8'>
            <StepContent {...stepContentProps} />
          </form>
          <div className='md:mr-8'>
            <Separator className='hidden sm:block' orientation='vertical' />
          </div>
          <div className='flex pt-8'>
            <Steps className='hidden md:block' activeStep={activeStep} orientation='vertical'>
              {teamSetupSteps.map((step, index) => (
                <Step index={index} key={index} {...step} />
              ))}
            </Steps>
          </div>
        </div>
      </div>
    </Form>
  );
}
