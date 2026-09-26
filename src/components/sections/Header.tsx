'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { company, navigation } from '@/content/site';
import { InquiryButton } from '@/components/InquiryButton';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur transition-colors ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={`${company.name} – zum Seitenanfang`}>
          <Image src="/images/logo-dkf.png" alt="" width={271} height={191} className="h-11 w-auto" priority />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg font-bold">{company.brand}</span>
            <span className="block text-xs text-muted">KFZ-Meisterbetrieb in {company.city}</span>
          </span>
        </a>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink-soft">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink xl:flex"
          >
            <Phone aria-hidden className="size-4 text-brand-600" />
            {company.phoneDisplay}
          </a>
          <InquiryButton size="sm" />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <nav aria-label="Mobile Navigation" className="container-page py-4">
          <ul className="grid gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium hover:bg-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
