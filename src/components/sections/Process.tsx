import { processSteps } from '@/content/site';
import { InquiryButton } from '@/components/InquiryButton';
import { SectionHeading } from '@/components/SectionHeading';

export function Process() {
  return (
    <section id="ablauf" aria-labelledby="ablauf-title" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="ablauf-title"
          eyebrow="So läuft's ab"
          title="In vier Schritten zum Termin."
          text="Unkompliziert und persönlich – du weißt jederzeit, was an deinem Fahrzeug passiert."
        />

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-xl font-bold text-white">
                  {index + 1}
                </span>
                {index < processSteps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-line lg:block" aria-hidden />
                )}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <InquiryButton size="lg" label="Jetzt Anfrage stellen" />
        </div>
      </div>
    </section>
  );
}
