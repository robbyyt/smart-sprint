import DashboardHeader from '@/components/layout/header/dashboard-header';
import MainContainer from '@/components/layout/main-container';

export default async function TeamLayout({
  params,
  children,
}: {
  params: { teamId: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader currentTeamId={Number(params.teamId)} />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
