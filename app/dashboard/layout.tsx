import ServerSideRedirector from '@/components/auth/server-side-redirector';
import DashboardHeader from '@/components/layout/header/dashboard-header';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerSideRedirector>
      <DashboardHeader />
      <main className='p-6'>{children}</main>
      <Toaster />
    </ServerSideRedirector>
  );
}
