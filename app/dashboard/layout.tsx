import ServerSideRedirector from '@/components/auth/server-side-redirector';
import DashboardHeader from '@/components/layout/header/dashboard-header';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServerSideRedirector>
      {children}
      <Toaster />
    </ServerSideRedirector>
  );
}
