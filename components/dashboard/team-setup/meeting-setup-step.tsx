import { FormField } from '@/components/ui/form';
import { SetupCycleInput } from '@/lib/schema/cycle-template';
import { useFieldArray, useFormContext } from 'react-hook-form';
import MeetingSetupRow from './meeting-setup-row';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Fragment, useEffect } from 'react';
import getDefaultMeetings from './utils/get-default-meetings';
import { Separator } from '@/components/ui/separator';

export default function MeetingSetupStep() {
  const { control, setValue, watch, getFieldState } = useFormContext<SetupCycleInput>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meetings',
  });

  const cycleStartDate = watch('interval.from');
  const cycleEndDate = watch('interval.to');

  useEffect(() => {
    const state = getFieldState('meetings');
    if (state.isDirty || state.isTouched) {
      return;
    }
    setValue('meetings', getDefaultMeetings(cycleStartDate));
  }, [setValue, cycleStartDate, getFieldState]);

  return (
    <div className='flex flex-col gap-4'>
      <Button
        type='button'
        variant='secondary'
        className='w-[200px]'
        onClick={() =>
          append({ name: '', startDate: cycleStartDate, startTime: '10:00', endTime: '10:30', recurrence: 'NO_REPEAT' })
        }
      >
        <PlusCircledIcon className='mr-2 h-5 w-5' />
        Add meeting
      </Button>
      <FormField
        control={control}
        name='meetings'
        render={() => (
          <>
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <MeetingSetupRow
                  index={index}
                  remove={remove}
                  cycleStartDate={cycleStartDate}
                  cycleEndDate={cycleEndDate}
                />
                <Separator className='lg:hidden' />
              </Fragment>
            ))}
          </>
        )}
      />
    </div>
  );
}
