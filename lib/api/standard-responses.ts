import { NextResponse } from 'next/server';

export const UnauthorizedAccess = (customMessage?: string) =>
  NextResponse.json({ message: customMessage ?? 'Cannot access this resource while unauthenticated' }, { status: 401 });
