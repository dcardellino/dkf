import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { company, inquiryHref, navigation, openingHours, services } from '@/content/site';
import { InquiryButton } from '@/components/InquiryButton';
import { FacebookIcon, InstagramIcon } from '@/components/SocialIcons';

const socialLinks = [
  { label: 'DKF-Bikes auf Facebook', href: company.social.facebook, Icon: FacebookIcon },
  { label: 'DKF-Bikes auf Instagram', href: company.social.instagram, Icon: InstagramIcon },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-lg font-bold text-ink">{children}</h2>;
}

const linkClass = 'text-ink-soft transition-colors hover:text-brand-700';

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper pb-28 sm:pb-10">
      <div className="container-page">
        <div className="flex flex-col gap-6 border-b border-line py-10 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="flex items-center gap-4" aria-label={`${company.name} – zum Seitenanfang`}>
            <Image src="/images/logo-dkf.png" alt="" width={271} height={191} className="h-16 w-auto" />
            <span>
              <span className="block font-display text-2xl font-bold">{company.brand}</span>
              <span className="block text-sm text-muted">
                {company.tagline} · seit {company.foundedYear}
              </span>
            </span>
          </a>
          <div className="flex flex-col gap-3 sm:flex-row">
            <InquiryButton />
            <a
              href={company.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-ink/15 bg-white px-6 font-semibold whitespace-nowrap hover:border-ink/40"
            >
              <Phone aria-hidden className="size-4 text-brand-600" />
              {company.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 text-sm lg:grid-cols-4">
          <nav aria-labelledby="footer-services">
            <ColumnHeading>
              <span id="footer-services">Leistungen</span>
            </ColumnHeading>
            <ul className="mt-4 grid gap-2.5">
              {services.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <a href="#leistungen" className={linkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-workshop">
            <ColumnHeading>
              <span id="footer-workshop">Werkstatt</span>
            </ColumnHeading>
            <ul className="mt-4 grid gap-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href={inquiryHref} className="font-semibold text-brand-700 hover:text-ink">
                  Anfrage stellen
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-1">
            <ColumnHeading>Öffnungszeiten</ColumnHeading>
            <dl className="mt-4 grid gap-2.5">
              {openingHours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4 sm:block">
                  <dt className="text-muted">{row.days}</dt>
                  <dd className="font-medium text-ink">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-muted">Termin nach Vereinbarung.</p>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <ColumnHeading>Kontakt</ColumnHeading>
            <ul className="mt-4 grid gap-3">
              <li className="flex gap-2.5">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <address className="text-ink-soft not-italic">
                  {company.street}
                  <br />
                  {company.zip} {company.city}
                  <br />
                  <a
                    href={company.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-ink"
                  >
                    <Navigation aria-hidden className="size-3.5" />
                    Route planen
                  </a>
                </address>
              </li>
              <li className="flex gap-2.5">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <a href={company.phoneHref} className={linkClass}>
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                <a href={`mailto:${company.email}`} className={`${linkClass} break-words`}>
                  {company.email}
                </a>
              </li>
            </ul>
            <ul className="mt-5 flex gap-2" aria-label="Social Media">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink-soft transition-colors hover:border-brand-500 hover:bg-brand-50 hover:text-ink"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName} · KFZ-Meisterbetrieb in {company.city}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/impressum/" className="hover:text-ink">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz/" className="hover:text-ink">
                Datenschutz
              </Link>
            </li>
            <li>
              <a href="#top" className="inline-flex items-center gap-1 font-semibold text-ink-soft hover:text-ink">
                <ArrowUp aria-hidden className="size-3.5" />
                Nach oben
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
