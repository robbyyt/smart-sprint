import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SetupCycleInput } from '@/lib/schema/setup-cycle';
import { Checkbox } from '@/components/ui/checkbox';
import { H2 } from '@/components/ui/typography';

export default function SubmitStep() {
  const { control } = useFormContext<SetupCycleInput>();
  return (
    <div className='flex flex-col gap-2'>
      <H2>Congratulations! 🎉</H2>
      <p className='leading-7'>
        Now that you have defined all of your meetings, it is time to save your changes.
        <br /> You can schedule your sprint now or save your changes as a standalone template for future use.
      </p>
      <FormField
        control={control}
        name='saveOnlyTemplate'
        render={({ field }) => (
          <FormItem className='my-2 flex items-center space-x-2 space-y-0'>
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel>Save only as template</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
