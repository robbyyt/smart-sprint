import { StepConfig, StepContent, StepContentProps } from '@/components/ui/stepper';
import { useStepper } from '@/components/ui/use-stepper';
import { SetupCycleInput } from '@/lib/schema/cycle-template';
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
    description: 'The time killers. Setup once and re-use on each sprint start.',
  },
  {
    label: 'Start planning',
    description: 'Or save your preferences as a template for future use.',
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
        const isValid = await form.trigger(['timezone', 'interval']);
        if (isValid) stepper.nextStep();
        return;
      default:
        nextStep();
        return;
    }
  };

  return {
    ...stepper,
    nextStep,
    stepContents,
  };
}
