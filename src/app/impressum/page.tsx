import type { Metadata } from 'next';
import { company } from '@/content/site';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Impressum – DKF-Bikes Herrenberg',
  robots: { index: false },
};

// TODO(content): legal texts taken from the legacy site – have them reviewed before go-live.
export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {company.legalName}
          <br />
          Inhaber: {company.owner}
          <br />
          {company.street}
          <br />
          {company.zip} {company.city}
        </p>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={company.phoneHref}>{company.phoneDisplay}</a>
          <br />
          E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </section>
      <section>
        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {company.vatId}</p>
      </section>
      <section>
        <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          Berufsbezeichnung: Handwerksmeister (verliehen in Deutschland)
          <br />
          Zuständige Kammer: {company.chamber}
        </p>
      </section>
    </LegalPage>
  );
}
