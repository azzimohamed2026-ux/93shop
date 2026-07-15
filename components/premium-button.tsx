import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const premiumButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden shine',
  {
    variants: {
      variant: {
        gold: 'bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold hover:shadow-gold-lg hover:scale-[1.02]',
        'gold-outline': 'border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/60',
        glass: 'glass text-white hover:bg-white/5 border border-white/10',
        'glass-gold': 'glass-gold text-gold-400 hover:bg-gold-500/10',
        ghost: 'text-white/70 hover:text-white hover:bg-white/5',
        destructive: 'bg-red-500/90 text-white hover:bg-red-500',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'gold', size: 'md' },
  }
);

export interface PremiumButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof premiumButtonVariants> {}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(premiumButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
PremiumButton.displayName = 'PremiumButton';
