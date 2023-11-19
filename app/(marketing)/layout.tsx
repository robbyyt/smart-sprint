import MarketingHeader from '@/components/layout/header/marketing-header';
import MainContainer from '@/components/layout/main-container';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
