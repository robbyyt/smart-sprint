import ServerSideRedirector from '@/components/auth/server-side-redirector';
import DashboardHeader from '@/components/layout/header/dashboard-header';
import MainContainer from '@/components/layout/main-container';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ServerSideRedirector>
      <DashboardHeader currentTeamId={null} />
      <MainContainer>{children}</MainContainer>
      <Toaster />
    </ServerSideRedirector>
  );
}
