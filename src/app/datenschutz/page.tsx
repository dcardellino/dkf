import type { Metadata } from 'next';
import { company } from '@/content/site';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Datenschutz – DKF-Bikes Herrenberg',
  robots: { index: false },
};

// TODO(content): placeholder – replace with a complete privacy policy (e.g. generated and legally reviewed)
// before go-live, especially once the inquiry form is added.
export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <section>
        <h2>Verantwortlicher</h2>
        <p>
          {company.legalName}, {company.owner}, {company.street}, {company.zip} {company.city}, E-Mail:{' '}
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </section>
      <section>
        <h2>Hinweis</h2>
        <p>
          Diese Website bindet keine externen Schriftarten, Karten oder Tracking-Dienste ein. Die vollständige
          Datenschutzerklärung wird vor dem Livegang ergänzt.
        </p>
      </section>
    </LegalPage>
  );
}
