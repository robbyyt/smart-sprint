import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { mapZodError } from '../utils/zod';

export const UnauthorizedAccess = (customMessage?: string) =>
  NextResponse.json({ message: customMessage ?? 'Cannot access this resource while unauthenticated' }, { status: 401 });

export const BadRequest = <T>(parseError: ZodError<T>) => {
  const mappedError = mapZodError(parseError);
  return NextResponse.json({ error: mappedError }, { status: 400 });
};
