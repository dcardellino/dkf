import Image from 'next/image';
import Link from 'next/link';
import { company, navigation } from '@/content/site';

export function Footer() {
  return (
    <footer className="bg-ink pb-28 text-white/70 sm:pb-12">
      <div className="container-page grid gap-10 pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo-dkf.png"
            alt="DKF Bikes & More Logo"
            width={271}
            height={191}
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {company.legalName} – KFZ-Meisterbetrieb für Motorrad und PKW in {company.city}. Harley-Davidson, Custom
            Bikes, Restauration und Instandsetzung seit {company.foundedYear}.
          </p>
        </div>
        <nav aria-label="Footer-Navigation">
          <p className="font-semibold text-white">Seite</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={`/${item.href}`} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-semibold text-white">Kontakt</p>
          <address className="mt-3 text-sm leading-relaxed not-italic">
            {company.street}
            <br />
            {company.zip} {company.city}
            <br />
            <a href={company.phoneHref} className="hover:text-white">
              {company.phoneDisplay}
            </a>
          </address>
          <a
            href={company.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm hover:text-white"
          >
            Facebook
          </a>
        </div>
      </div>
      <div className="container-page mt-12">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/impressum/" className="hover:text-white">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz/" className="hover:text-white">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
