import { StepConfig } from '@/components/ui/stepper';
import { useStepper } from '@/components/ui/use-stepper';

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

export default function useTeamSetupSteps(): ReturnType<typeof useStepper> {
  const stepper = useStepper({
    initialStep: 0,
    steps: teamSetupSteps,
  });

  return stepper;
}
