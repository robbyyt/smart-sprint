import MarketingHeader from '@/components/layout/header/marketing-header';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main>{children}</main>
    </>
  );
}
