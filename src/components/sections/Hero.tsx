import Image from 'next/image';
import { Check, Phone } from 'lucide-react';
import { company, hero, photos } from '@/content/site';
import { InquiryButton } from '@/components/InquiryButton';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-paper">
      <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-4 heading-xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.text}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <InquiryButton size="lg" />
            <a
              href={company.phoneHref}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-ink/15 bg-white px-7 font-semibold whitespace-nowrap hover:border-ink/40"
            >
              <Phone aria-hidden className="size-4 text-brand-600" />
              {company.phoneDisplay}
            </a>
          </div>

          <ul className="mt-8 grid gap-2 text-sm font-medium text-ink-soft sm:grid-cols-3 sm:gap-4">
            {hero.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-0 hidden rounded-2xl bg-brand-500/15 lg:block" aria-hidden />
          <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-ink/15">
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              width={photos.hero.width}
              height={photos.hero.height}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 rounded-lg border border-line bg-white px-4 py-3 shadow-lg sm:left-6">
            <p className="font-display text-2xl leading-none font-bold">seit {company.foundedYear}</p>
            <p className="mt-1 text-xs font-medium text-muted">in {company.city}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
