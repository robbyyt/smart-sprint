'use client';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { SUPPORTED_TIMEZONES, SUPPORTED_TIMEZONES_SET } from '@/lib/constants/timezones';
import { cn } from '@/lib/utils/styles';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useFormContext } from 'react-hook-form';
import { SetupCycleInput } from '@/lib/schema/cycle-template';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function GeneralInformationFormStep() {
  const { control, setValue } = useFormContext<SetupCycleInput>();
  return (
    <div className='flex flex-col gap-4'>
      <FormField
        control={control}
        name='timezone'
        render={({ field }) => (
          <FormItem className='inline-flex flex-col'>
            <FormLabel>Timezone</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                  >
                    {SUPPORTED_TIMEZONES_SET.has(field.value) ? field.value : 'Select timezone'}
                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput placeholder='Search timezones...' />
                  <CommandEmpty>No timezone found.</CommandEmpty>
                  <CommandGroup className='max-h-[200px] overflow-y-scroll'>
                    {SUPPORTED_TIMEZONES.map((timezone) => (
                      <CommandItem
                        value={timezone}
                        key={timezone}
                        onSelect={() => {
                          setValue('timezone', timezone);
                        }}
                      >
                        {timezone}
                        <CheckIcon
                          className={cn('ml-auto h-4 w-4', timezone === field.value ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>The timezone your meetings revolve around.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='interval'
        render={({ field }) => (
          <FormItem className='inline-flex flex-col'>
            <FormLabel>Date interval</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type='button'
                    variant='outline'
                    className={cn('w-[200px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                  >
                    {field.value ? (
                      <span>
                        {format(field.value.from, 'dd/M/yy')}
                        {field.value?.to ? ` - ${format(field.value.to, 'dd/M/yy')}` : ''}
                      </span>
                    ) : (
                      <span>Pick a range of dates</span>
                    )}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  disabled={{ before: new Date() }}
                  fromMonth={new Date()}
                  mode='range'
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>You will be able to change your mind later.</FormDescription>
            <FormMessage selector='from' />
            <FormMessage selector='to' />
          </FormItem>
        )}
      />
    </div>
  );
}
