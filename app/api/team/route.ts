import { UnauthorizedAccess } from '@/lib/api/standard-responses';
import { getServerSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return UnauthorizedAccess();
  }
}
