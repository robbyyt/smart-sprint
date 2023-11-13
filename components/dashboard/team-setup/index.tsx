'use client';
import { useForm } from 'react-hook-form';
import { SetupCycleInput, setupCycleSchema } from '@/lib/schema/cycle-template';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TeamId } from '@/lib/db/entities/team';
import { Form } from '@/components/ui/form';

import { useEffect } from 'react';
import { Step, Steps } from '@/components/ui/stepper';
import { Separator } from '@/components/ui/separator';
import useTeamSetupSteps, { teamSetupSteps } from './use-team-setup-steps';
import { Button } from '@/components/ui/button';
import { DoubleArrowRightIcon } from '@radix-ui/react-icons';

type TeamSetupProps = { teamId: TeamId };

const getDefaultFormValues = (teamId: TeamId): Partial<SetupCycleInput> => ({
  teamId: teamId,
  saveOnlyTemplate: false,
});

export default function TeamSetup({ teamId }: TeamSetupProps) {
  const form = useForm<SetupCycleInput>({
    resolver: zodResolver(setupCycleSchema),
    defaultValues: getDefaultFormValues(teamId),
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  const { activeStep, nextStep, prevStep, isLastStep, stepContents } = useTeamSetupSteps(form);

  useEffect(() => {
    form.setValue('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
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
          <form onSubmit={onSubmit} className='flex flex-1 flex-col pt-8'>
            <StepContent {...stepContentProps} />
            <div className='mt-4 flex gap-4'>
              {activeStep > 1 && (
                <Button className='w-[100px]' type='button' variant='secondary' onClick={prevStep}>
                  Back
                </Button>
              )}
              {!isLastStep && (
                <Button className='w-[100px]' type='button' onClick={nextStep}>
                  Next
                  <DoubleArrowRightIcon />
                </Button>
              )}
              {isLastStep && (
                <Button type='submit' className='w-[100px]'>
                  Submit
                </Button>
              )}
            </div>
          </form>
          <div className='md:mx-8'>
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
