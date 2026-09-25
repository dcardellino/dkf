import { ChevronDown } from 'lucide-react';
import { faqs } from '@/content/site';
import { SectionHeading } from '@/components/SectionHeading';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading
          id="faq-title"
          eyebrow="Häufige Fragen"
          title="Gut zu wissen."
          text="Deine Frage ist nicht dabei? Ruf einfach an oder stell eine Anfrage – wir melden uns persönlich."
        />

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold [&::-webkit-details-marker]:hidden">
                <span className="text-lg">{faq.q}</span>
                <ChevronDown
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
