import { StepConfig, StepContent, StepContentProps } from '@/components/ui/stepper';
import { useStepper } from '@/components/ui/use-stepper';
import { SetupCycleInput } from '@/lib/schema/setup-cycle';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import GeneralInformationFormStep from './general-information-form-step';
import MeetingSetupStep from './meeting-setup-step';
import SubmitStep from './submit-step';

export const teamSetupSteps: StepConfig[] = [
  {
    label: 'General information',
    description: 'Needed for basic setup and calendar scheduling.',
  },
  {
    label: 'Meetings',
    description: 'The most common time consumers. Setup once and re-use in the future.',
  },
  {
    label: 'Start planning',
    description: 'Or save the information you filled in as a template for future sprints.',
  },
];

export default function useTeamSetupSteps(
  form: UseFormReturn<SetupCycleInput>
): ReturnType<typeof useStepper> & { stepContents: StepContent<StepContentProps>[] } {
  const stepper = useStepper({
    initialStep: 0,
    steps: teamSetupSteps,
  });

  const stepContents: StepContent<StepContentProps>[] = useMemo(
    () => [{ component: GeneralInformationFormStep }, { component: MeetingSetupStep }, { component: SubmitStep }],
    []
  );

  if (stepContents.length !== teamSetupSteps.length) {
    throw new Error('Please make sure to pass a content for each step!');
  }

  const nextStep = async (): Promise<void> => {
    switch (stepper.activeStep) {
      case 0:
        if (await form.trigger(['timezone', 'interval'])) stepper.nextStep();
        return;
      case 1:
        if (await form.trigger(['meetings'])) stepper.nextStep();
        return;
      default:
        stepper.nextStep();
        return;
    }
  };

  return {
    ...stepper,
    nextStep,
    stepContents,
  };
}
