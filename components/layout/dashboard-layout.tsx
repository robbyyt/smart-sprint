import DashboardHeader, { DashboardHeaderProps } from './header/dashboard-header';

type DashboardLayoutProps = DashboardHeaderProps & { children?: React.ReactNode };

export default function DashboardLayout({ currentTeamId, children }: DashboardLayoutProps) {
  return (
    <>
      <DashboardHeader currentTeamId={currentTeamId} />
      <main className='p-6'>{children}</main>
    </>
  );
}
