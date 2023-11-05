'use client';
import { useForm } from 'react-hook-form';
import { SetupCycleInput, setupCycleSchema } from '@/lib/schema/cycle-template';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TeamId } from '@/lib/db/entities/team';
import { Form } from '@/components/ui/form';

import { useEffect } from 'react';
import GeneralInformationFormStep from './general-information-form-step';
import { Step, StepConfig, Steps } from '@/components/ui/stepper';
import { useStepper } from '@/components/ui/use-stepper';
import { Separator } from '@/components/ui/separator';

type TeamSetupProps = { teamId: TeamId };

const getDefaultFormValues = (teamId: TeamId): Partial<SetupCycleInput> => ({
  teamId: teamId,
});

const steps = [
  {
    label: 'General information',
    description: 'Needed for basic setup and calendar scheduling.',
  },
  {
    label: 'Meetings',
    description: 'The time killers. Setup once and re-use on each sprint start.',
  },
  {
    label: 'Start planning',
    description: 'Or save your preferences as a template for future use.',
  },
] satisfies StepConfig[];

const stepContents = [GeneralInformationFormStep];

export default function TeamSetup({ teamId }: TeamSetupProps) {
  const form = useForm<SetupCycleInput>({
    resolver: zodResolver(setupCycleSchema),
    defaultValues: getDefaultFormValues(teamId),
  });

  const { nextStep, prevStep, resetSteps, activeStep, isDisabledStep, isLastStep, isOptionalStep } = useStepper({
    initialStep: 0,
    steps,
  });

  useEffect(() => {
    form.reset({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  }, [form]);

  const StepContent = stepContents[activeStep];

  return (
    <Form {...form}>
      <div>
        <h1 className='mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Setup your first development cycle
        </h1>
        <p className='mb-2 leading-7 '>...and start iterating towards your next big goal. ⭐️</p>
        <Separator />
      </div>
      <div className='mx-auto flex justify-between rounded-md bg-card px-4'>
        <form className='flex flex-1 pt-8'>
          <StepContent />
        </form>
        <div className='mr-8'>
          <Separator orientation='vertical' />
        </div>
        <div className='flex pt-8'>
          <Steps activeStep={activeStep} orientation='vertical'>
            {steps.map((step, index) => (
              <Step index={index} key={index} {...step}></Step>
            ))}
          </Steps>
        </div>
      </div>
    </Form>
  );
}
