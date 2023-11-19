import { cn } from '@/lib/utils/styles';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const h1Variants = cva('text-3xl font-bold text-primary', {
  variants: {
    variant: {
      default: 'md:text-4xl md:font-extrabold lg:text-5xl tracking-tight ',
      hero: 'sm:text-4xl md:text-5xl lg:text-6xl/none tracking-tighter',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof h1Variants> {}

export const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(({ className, variant, children, ...props }, ref) => (
  <h1 className={cn(h1Variants({ variant, className }))} ref={ref} {...props}>
    {children}
  </h1>
));

H1.displayName = 'H1';

const h2Variants = cva('font-bold text-primary', {
  variants: {
    variant: {
      default: 'text-xl md:text-2xl lg:text-3xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface H2Props extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof h2Variants> {}

export const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(({ className, variant, children, ...props }, ref) => (
  <h2 className={cn(h2Variants({ variant, className }))} ref={ref} {...props}>
    {children}
  </h2>
));

H2.displayName = 'H2';
