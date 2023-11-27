import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/context/auth-provider';
import { cn } from '@/lib/utils/styles';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Sprint',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'm-0 p-0')}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
