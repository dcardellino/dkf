import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { company, openingHours, openingHoursNote } from '@/content/site';
import { InquiryButton } from '@/components/InquiryButton';
import { SectionHeading } from '@/components/SectionHeading';

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="bg-paper py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="kontakt-title"
          eyebrow="Kontakt & Anfahrt"
          title="Wir sind für dich da – mitten im Gäu."
          text={`Aus ${company.serviceArea.slice(0, -1).join(', ')} und ${company.serviceArea.at(-1)} schnell erreichbar.`}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-line bg-white p-7">
            <MapPin aria-hidden className="size-6 text-brand-600" />
            <h3 className="mt-4 font-display text-xl font-bold">Adresse</h3>
            <address className="mt-2 leading-relaxed text-ink-soft not-italic">
              {company.legalName}
              <br />
              {company.street}
              <br />
              {company.zip} {company.city}
            </address>
            <a
              href={company.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-ink"
            >
              <Navigation aria-hidden className="size-4" />
              Route planen
            </a>
          </div>

          <div className="rounded-xl border border-line bg-white p-7">
            <Phone aria-hidden className="size-6 text-brand-600" />
            <h3 className="mt-4 font-display text-xl font-bold">Telefon & E-Mail</h3>
            <ul className="mt-2 grid gap-2 text-ink-soft">
              <li>
                <a href={company.phoneHref} className="font-semibold text-ink hover:text-brand-700">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 break-all hover:text-ink">
                  <Mail aria-hidden className="size-4 shrink-0" />
                  {company.email}
                </a>
              </li>
            </ul>
            <InquiryButton className="mt-6" />
          </div>

          <div className="rounded-xl border border-line bg-white p-7">
            <Clock aria-hidden className="size-6 text-brand-600" />
            <h3 className="mt-4 font-display text-xl font-bold">Öffnungszeiten</h3>
            <dl className="mt-2 grid gap-1.5">
              {openingHours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4 text-ink-soft">
                  <dt>{row.days}</dt>
                  <dd className="text-right font-medium text-ink">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-muted">{openingHoursNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
