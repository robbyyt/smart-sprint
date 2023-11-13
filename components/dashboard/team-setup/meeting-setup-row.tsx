import { format } from 'date-fns';
import { FieldError, UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import { CalendarIcon, CaretSortIcon, CheckIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MEETING_RECURRENCE_LABELS, MEETING_RECURRENCE_VALUES, SetupCycleInput } from '@/lib/schema/cycle-template';
import { cn } from '@/lib/utils/styles';

type MeetingRowProps = { index: number; remove: UseFieldArrayRemove; cycleStartDate: Date; cycleEndDate: Date };

const isFieldError = (err: any): err is FieldError => !!err?.message;

export default function MeetingSetupRow({ index, remove, cycleStartDate, cycleEndDate }: MeetingRowProps) {
  const {
    control,
    setValue,
    formState: {
      errors: { meetings: meetingErrors },
    },
  } = useFormContext<SetupCycleInput>();

  const currentFieldError = meetingErrors?.[index];

  return (
    <>
      <div className='flex flex-col gap-2 lg:inline-flex lg:flex-row'>
        <FormField
          name={`meetings.${index}.name`}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className='lg:w-[200px]' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={`meetings.${index}.startDate`}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type='button'
                      variant='outline'
                      className={cn(
                        'flex w-full whitespace-nowrap pl-3 text-left font-normal lg:w-[200px]',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? <span>{format(field.value, 'dd/M/yy')}</span> : <span>Pick a date</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    fromMonth={cycleStartDate}
                    disabled={{ before: cycleStartDate, after: cycleEndDate }}
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <div className='inline-flex gap-2'>
          <FormField
            name={`meetings.${index}.startTime`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start time</FormLabel>
                <FormControl>
                  <Input style={{ colorScheme: 'dark' }} type='time' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={`meetings.${index}.endTime`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End time</FormLabel>
                <FormControl>
                  <Input style={{ colorScheme: 'dark' }} type='time' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='inline-flex gap-2'>
          <FormField
            name={`meetings.${index}.recurrence`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recurrence</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground',
                          'flex w-[200px] whitespace-nowrap'
                        )}
                      >
                        {field.value ? MEETING_RECURRENCE_LABELS[field.value] : 'Select recurrence'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandList>
                        <CommandInput placeholder='Search recurrences' />
                        <CommandEmpty>No recurrence found.</CommandEmpty>
                        <CommandGroup>
                          {MEETING_RECURRENCE_VALUES.map((recurrence) => (
                            <CommandItem
                              value={recurrence}
                              key={recurrence}
                              className='text-sm'
                              onSelect={() => {
                                setValue(`meetings.${index}.recurrence`, recurrence);
                              }}
                            >
                              <p>{MEETING_RECURRENCE_LABELS[recurrence]}</p>
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  recurrence === field.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <Button className='self-end' variant='destructive' type='button' onClick={() => remove(index)}>
            <TrashIcon />
            <span className='lg:hidden'>Remove</span>
          </Button>
        </div>
      </div>
      <div className='text-sm font-medium text-destructive'>
        {currentFieldError && (
          <ul>
            {Object.values(currentFieldError).map((err) => {
              if (typeof err === 'string') return <li>err</li>;

              return isFieldError(err) ? <li>{err.message}</li> : null;
            })}
          </ul>
        )}
      </div>
    </>
  );
}
