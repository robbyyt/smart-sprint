'use client';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils/styles';
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getTeamMembership } from '@/lib/db/services/team.service';
import CreateTeamDialogContent from './create-team-dialog-content';
import { useRouter } from 'next/navigation';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  teams: Awaited<ReturnType<typeof getTeamMembership>>;
  currentTeamId: number | null;
}

export default function TeamSwitcher({ className, teams, currentTeamId }: TeamSwitcherProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const selectedTeam = teams.find((team) => team.id === currentTeamId);

  const closeTeamDialog = useCallback(() => {
    setShowNewTeamDialog(false);
  }, [setShowNewTeamDialog]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        {selectedTeam ? (
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              aria-label='Select a team'
              className={cn('w-[200px] justify-between truncate', className)}
            >
              <Avatar className='mr-2 h-5 w-5'>
                <AvatarImage src={`https://avatar.vercel.sh/${selectedTeam.name}.png`} alt={selectedTeam.name} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              {selectedTeam?.name}
              <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
        ) : (
          <DialogTrigger asChild>
            <Button
              variant='outline'
              onClick={() => {
                setOpen(false);
                setShowNewTeamDialog(true);
              }}
            >
              <PlusCircledIcon className='mr-2 h-5 w-5' />
              Create Team
            </Button>
          </DialogTrigger>
        )}
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              <CommandInput placeholder='Search...' />
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup key={''} heading='Team'>
                {teams.map((team) => (
                  <CommandItem
                    key={team.id}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/dashboard/${team.id}`);
                    }}
                    className='text-sm'
                  >
                    <Avatar className='mr-2 h-5 w-5'>
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team.name}.png`}
                        alt={team.name}
                        className={selectedTeam?.id !== team.id ? 'grayscale' : ''}
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <p className='hidden'>{team.id}</p>
                    <p className='overflow-hidden text-ellipsis'>{team.name}</p>
                    <CheckIcon
                      className={cn('ml-auto h-4 w-4', selectedTeam?.id === team.id ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className='mr-2 h-5 w-5' />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <CreateTeamDialogContent closeDialog={closeTeamDialog} />
    </Dialog>
  );
}
