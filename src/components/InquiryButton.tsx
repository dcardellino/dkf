import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { inquiryHref } from '@/content/site';
import type { Concern } from '@/lib/inquiries/types';

type Props = {
  variant?: 'primary' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  /** Preselects the concern in the inquiry funnel. */
  concern?: Concern;
};

const variants = {
  primary: 'bg-brand-500 text-ink hover:bg-brand-400 shadow-sm shadow-brand-900/10',
  dark: 'bg-ink text-white hover:bg-ink-soft',
  outline: 'border border-ink/15 bg-white text-ink hover:border-ink/40',
};

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-7 text-base sm:text-lg',
};

// Call to action for the inquiry flow. The target is configured once via
// `inquiryHref` in src/content/site.ts.
export function InquiryButton({
  variant = 'primary',
  size = 'md',
  label = 'Anfrage stellen',
  className = '',
  concern,
}: Props) {
  return (
    <Link
      href={concern ? `${inquiryHref}?anliegen=${concern}` : inquiryHref}
      data-cta="inquiry"
      className={`group inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {label}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
