/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WuzBMBNLxxJ
 */
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center text-primary-foreground'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl/none'>
              Welcome to SmartSprint
            </h1>
            <p className='mx-auto max-w-[700px] text-xl text-primary md:text-2xl lg:text-3xl'>
              Streamline software iteration. Integrated with your favorite tools
            </p>
          </div>
          <div className='space-x-4'>
            <Button asChild>
              <Link href='/dashboard'>Get Started</Link>
            </Button>
            <Button asChild variant='secondary'>
              <Link href='#'>Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
