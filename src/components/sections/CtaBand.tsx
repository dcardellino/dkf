import { Phone } from 'lucide-react';
import { company } from '@/content/site';
import { InquiryButton } from '@/components/InquiryButton';

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-white pb-20 sm:pb-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
          <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="font-display text-3xl font-bold text-balance sm:text-4xl">
                Reparatur, Service oder Umbau? Erzähl uns davon.
              </h2>
              <p className="mt-4 text-lg text-white/75">
                Stell eine unverbindliche Anfrage – wir melden uns persönlich mit einer ehrlichen Einschätzung.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <InquiryButton size="lg" />
              <a
                href={company.phoneHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-white/25 px-7 font-semibold whitespace-nowrap hover:bg-white/10"
              >
                <Phone aria-hidden className="size-4" />
                {company.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
