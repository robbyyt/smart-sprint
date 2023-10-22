'use client';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createTeamSchema } from '@/lib/schema/team';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useToast } from '../ui/use-toast';
import { createTeam } from '@/lib/api/services/team.service';
import { mappedZodErrorSchema, setZodErrorsOnForm } from '@/lib/utils/zod';

type CreateTeamDialogContentProps = {
  closeDialog: () => void;
};

type CreateTeamFormValues = z.infer<typeof createTeamSchema>;
const defaultValues: Partial<CreateTeamFormValues> = {
  name: '',
};

export default function CreateTeamDialogContent({ closeDialog }: CreateTeamDialogContentProps) {
  const form = useForm<CreateTeamFormValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues,
  });
  const router = useRouter();

  const { toast } = useToast();

  const onSubmit = useCallback(
    async (data: CreateTeamFormValues) => {
      try {
        await createTeam(data.name);
        toast({
          title: `Successfully created ${data.name}`,
          description: 'Well done!',
        });
        closeDialog();
        router.refresh();
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status !== 400) {
            toast({
              title: `An unknown error occurred!`,
              variant: 'destructive',
            });
            return;
          }
          const mappedZodErrorParseResult = await mappedZodErrorSchema.safeParseAsync(err.response.data);

          if (!mappedZodErrorParseResult.success) {
            toast({
              title: `An unknown error occurred!`,
              variant: 'destructive',
            });
            return;
          }

          const formError = mappedZodErrorParseResult.data.error;
          setZodErrorsOnForm(form, formError);
        } else {
          toast({
            title: `An unknown error occurred!`,
            variant: 'destructive',
          });
        }
      }
    },
    [toast, form, closeDialog, router]
  );

  const onReset = useCallback(() => {
    form.reset();
    closeDialog();
  }, [form, closeDialog]);

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
            <Button type='reset' variant='outline' onClick={onReset}>
              Cancel
            </Button>
            <Button type='submit'>Continue</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
