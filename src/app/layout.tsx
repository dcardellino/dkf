import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import { company } from '@/content/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const title = 'DKF-Bikes Herrenberg – Freie Harley- & KFZ-Meisterwerkstatt für Motorrad und PKW';
const description =
  'KFZ-Meisterbetrieb in Herrenberg seit 1994: Kundendienst, HU/AU, Reifen, Motor- und Getriebeinstandsetzung, Harley-Davidson Custom Bikes und Restauration klassischer Motorräder.';

export const metadata: Metadata = {
  metadataBase: new URL('https://dkf-bikes.com'),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: '/',
    siteName: company.brand,
    title,
    description,
    images: [{ url: '/images/sportster-scrambler-rot.webp', width: 1000, height: 750 }],
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MotorcycleRepair', 'AutoRepair'],
  name: company.brand,
  legalName: company.legalName,
  url: 'https://dkf-bikes.com',
  logo: 'https://dkf-bikes.com/images/logo-dkf.png',
  image: 'https://dkf-bikes.com/images/sportster-scrambler-rot.webp',
  telephone: '+49 7032 77930',
  email: company.email,
  foundingDate: String(company.foundedYear),
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.street,
    postalCode: company.zip,
    addressLocality: company.city,
    addressRegion: company.region,
    addressCountry: 'DE',
  },
  areaServed: company.serviceArea,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  sameAs: [company.social.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
