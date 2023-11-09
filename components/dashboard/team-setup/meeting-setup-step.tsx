import { FormField } from '@/components/ui/form';
import { SetupCycleInput } from '@/lib/schema/cycle-template';
import { useFieldArray, useFormContext } from 'react-hook-form';
import MeetingSetupRow from './meeting-setup-row';

export default function MeetingSetupStep() {
  const { control, register } = useFormContext<SetupCycleInput>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meetings',
  });
  return (
    <div className='flex flex-col gap-4'>
      <FormField
        control={control}
        name='meetings'
        render={() => (
          <>
            {fields.map((field, index) => (
              <MeetingSetupRow key={field.id} field={field} index={index} />
            ))}
          </>
        )}
      />
    </div>
  );
}
