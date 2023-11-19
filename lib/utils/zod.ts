import { toast } from '@/components/ui/use-toast';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ZodError, z } from 'zod';

export type MappedZodError = z.infer<typeof mappedZodErrorSchema>;

export const mapZodError = <T = any>(parseError: ZodError<T>): MappedZodError['error'] => {
  return parseError.issues.map((e) => ({ path: e.path[0], message: e.message }));
};

export const mappedZodErrorSchema = z.object({
  error: z.array(
    z.object({
      path: z.string().or(z.number()),
      message: z.string(),
    })
  ),
});

export const setZodErrorsOnForm = <TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  zodError: MappedZodError['error']
) => {
  const values = form.getValues();
  const fields: Set<Path<TFieldValues>> = new Set(Object.keys(values) as Path<TFieldValues>[]);

  const isField = (value: string): value is Path<TFieldValues> => {
    return fields.has(value as Path<TFieldValues>);
  };

  for (const { path, message } of zodError) {
    const stringifiedPath = String(path);
    if (isField(stringifiedPath)) {
      form.setError(stringifiedPath, { message: message });
    }
  }
};

export const processFormActionError = async <TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  error: unknown
) => {
  const mappedZodErrorParseResult = await mappedZodErrorSchema.safeParseAsync(error);

  if (!mappedZodErrorParseResult.success) {
    toast({
      title: `An unknown error occurred!`,
      variant: 'destructive',
    });
    return;
  }
  const formError = mappedZodErrorParseResult.data.error;
  setZodErrorsOnForm(form, formError);
};
