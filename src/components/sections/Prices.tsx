import { Info } from 'lucide-react';
import { prices, pricesNote } from '@/content/site';
import { SectionHeading } from '@/components/SectionHeading';

export function Prices() {
  return (
    <section id="preise" aria-labelledby="preise-title" className="bg-paper py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="preise-title"
          eyebrow="Faire Preise"
          title="Du weißt vorher, woran du bist."
          text="Für die wichtigsten Arbeiten nennen wir klare Ab-Preise. Alles darüber hinaus besprechen wir vorher mit dir."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {prices.map((item) => (
            <li key={item.title} className="flex flex-col rounded-xl border border-line bg-white p-6">
              <h3 className="font-semibold text-ink-soft">{item.title}</h3>
              <p className="mt-3 font-display text-4xl font-bold">{item.price}</p>
              <p className="mt-2 text-sm text-muted">{item.note}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex max-w-3xl items-start gap-2 text-sm leading-relaxed text-muted">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          {pricesNote}
        </p>
      </div>
    </section>
  );
}
