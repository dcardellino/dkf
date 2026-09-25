import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main id="main" className="container-page max-w-3xl py-16 sm:py-24">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-ink">
        <ArrowLeft aria-hidden className="size-4" />
        Zur Startseite
      </Link>
      <h1 className="mt-6 heading-lg">{title}</h1>
      <div className="mt-8 grid gap-6 leading-relaxed text-ink-soft [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
        {children}
      </div>
    </main>
  );
}
