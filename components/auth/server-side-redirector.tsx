import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ServerSideRedirector({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return <>{children}</>;
}
