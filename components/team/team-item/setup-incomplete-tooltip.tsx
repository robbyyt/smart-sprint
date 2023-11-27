import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function SetupIncompleteTooltip() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <ExclamationTriangleIcon className='text-warning' />
        </TooltipTrigger>
        <TooltipContent className='p-2'>
          <p>Initial setup not completed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
