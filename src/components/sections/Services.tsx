import { Bike, CircleDot, ClipboardCheck, Cog, Gauge, Hammer, Settings, Wrench } from 'lucide-react';
import { services, type Service } from '@/content/site';
import { SectionHeading } from '@/components/SectionHeading';

const icons: Record<Service['icon'], typeof Wrench> = {
  wrench: Wrench,
  clipboard: ClipboardCheck,
  tire: CircleDot,
  engine: Cog,
  gear: Settings,
  bike: Bike,
  restore: Hammer,
  gauge: Gauge,
};

export function Services() {
  return (
    <section id="leistungen" aria-labelledby="leistungen-title" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="leistungen-title"
          eyebrow="Leistungen"
          title="Alles für Motorrad und PKW – aus einer Hand."
          text="Vom regelmäßigen Kundendienst bis zur Motorrevision: Als Meisterbetrieb kümmern wir uns um Fahrzeuge aller Marken und Fabrikate."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <li key={service.title} className="bg-white p-6 sm:p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{service.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
