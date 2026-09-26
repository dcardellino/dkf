import Image from 'next/image';
import { Check } from 'lucide-react';
import { specialties } from '@/content/site';
import { InquiryButton } from '@/components/InquiryButton';
import { SectionHeading } from '@/components/SectionHeading';

export function Specialties() {
  return (
    <section id="spezialgebiete" aria-labelledby="spezialgebiete-title" className="bg-paper py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="spezialgebiete-title"
          eyebrow="Spezialgebiete"
          title="Wofür man zu uns ins Gäu fährt."
          text="Neben dem Werkstattalltag gibt es drei Dinge, für die uns Kunden aus der ganzen Region ansteuern."
        />

        <div className="mt-14 grid gap-16 lg:gap-24">
          {specialties.map((item, index) => (
            <article
              key={item.kicker}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              aria-labelledby={`specialty-${index}`}
            >
              <div className={index % 2 === 1 ? 'lg:order-last' : ''}>
                <div className="overflow-hidden rounded-xl shadow-xl shadow-ink/10">
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    width={item.photo.width}
                    height={item.photo.height}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="eyebrow">{item.kicker}</p>
                <h3 id={`specialty-${index}`} className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{item.text}</p>
                <ul className="mt-6 grid gap-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-ink">
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                      <span className="font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-xl font-bold sm:text-2xl">Du hast ein Projekt im Kopf?</p>
            <p className="mt-1 text-muted">Umbau, Restauration oder Motorschaden – erzähl uns, worum es geht.</p>
          </div>
          <InquiryButton size="lg" label="Projekt anfragen" concern="umbau" />
        </div>
      </div>
    </section>
  );
}
