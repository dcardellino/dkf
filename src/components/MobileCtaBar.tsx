import { Phone } from 'lucide-react';
import { company } from '@/content/site';
import { InquiryButton } from '@/components/InquiryButton';

// Sticky bottom bar on small screens so call and inquiry stay one tap away.
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur sm:hidden">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <a
          href={company.phoneHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-ink/15 px-4 font-semibold"
          aria-label={`Anrufen: ${company.phoneDisplay}`}
        >
          <Phone aria-hidden className="size-4 text-brand-600" />
          Anrufen
        </a>
        <InquiryButton className="w-full" />
      </div>
    </div>
  );
}
