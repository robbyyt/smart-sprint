'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CreateTeamInput, createTeamSchema } from '@/lib/schema/team';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { toast } from '../ui/use-toast';
import { processFormActionError } from '@/lib/utils/zod';
import { createTeam } from '@/lib/data/team/actions/create-team';

type CreateTeamDialogContentProps = {
  closeDialog: () => void;
};

type CreateTeamFormValues = CreateTeamInput;
const defaultValues: Partial<CreateTeamFormValues> = {
  name: '',
};

export default function CreateTeamDialogContent({ closeDialog }: CreateTeamDialogContentProps) {
  const form = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues,
  });
  const router = useRouter();

  const reset = useCallback(() => {
    form.reset();
    closeDialog();
  }, [form, closeDialog]);

  const onSubmit = useCallback(
    async (data: CreateTeamFormValues) => {
      const submitResponse = await createTeam(data);

      if (submitResponse.success) {
        toast({
          title: `Successfully created ${data.name}`,
          description: 'Well done!',
        });
        reset();
        router.refresh();
        router.push(`/teams/${submitResponse.data.id}/setup`);
        return;
      }

      processFormActionError(form, submitResponse.error);
    },
    [form, router, reset]
  );

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription>Add a new team to begin planning smartly!</DialogDescription>
          </DialogHeader>
          <div>
            <div className='space-y-4 py-2 pb-4'>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Acme Inc.' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type='reset' variant='outline' onClick={reset}>
              Cancel
            </Button>
            <Button type='submit' disabled={form.formState.isSubmitting}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
