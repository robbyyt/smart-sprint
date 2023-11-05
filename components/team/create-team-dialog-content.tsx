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
import { useToast } from '../ui/use-toast';
import { mappedZodErrorSchema, setZodErrorsOnForm } from '@/lib/utils/zod';
import { createTeam } from '@/lib/data/team/actions/team';

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

  const { toast } = useToast();

  const reset = useCallback(() => {
    form.reset();
    closeDialog();
  }, [form, closeDialog]);

  const onSubmit = useCallback(
    async (data: CreateTeamFormValues) => {
      const response = await createTeam(data);

      if (response.success) {
        toast({
          title: `Successfully created ${data.name}`,
          description: 'Well done!',
        });
        reset();
        router.push(`/dashboard/${response.data.id}`);
        return;
      }

      const mappedZodErrorParseResult = await mappedZodErrorSchema.safeParseAsync(response.error);
      if (!mappedZodErrorParseResult.success) {
        toast({
          title: `An unknown error occurred!`,
          variant: 'destructive',
        });
        return;
      }
      const formError = mappedZodErrorParseResult.data.error;
      setZodErrorsOnForm(form, formError);
    },
    [toast, form, router, reset]
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
