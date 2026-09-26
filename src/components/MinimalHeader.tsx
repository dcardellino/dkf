import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';
import { company } from '@/content/site';

// Reduced header for the inquiry funnel and admin area: no navigation that
// could pull visitors out of the flow.
export function MinimalHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="border-b border-line bg-white">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={`${company.name} – Startseite`}>
          <Image src="/images/logo-dkf.png" alt="" width={271} height={191} className="h-9 w-auto" priority />
          <span className="hidden font-display text-lg font-bold sm:inline">{company.brand}</span>
        </Link>
        {right ?? (
          <div className="flex items-center gap-4 text-sm font-semibold">
            <a href={company.phoneHref} className="hidden items-center gap-2 text-ink-soft hover:text-ink sm:flex">
              <Phone aria-hidden className="size-4 text-brand-600" />
              {company.phoneDisplay}
            </a>
            <Link href="/" className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink">
              <ArrowLeft aria-hidden className="size-4" />
              Startseite
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
