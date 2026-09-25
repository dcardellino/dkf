import Image from 'next/image';
import { about, photos } from '@/content/site';

export function About() {
  return (
    <section id="ueber-uns" aria-labelledby="ueber-uns-title" className="bg-paper py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-xl shadow-ink/10">
            <Image
              src={photos.workshop.src}
              alt={photos.workshop.alt}
              width={photos.workshop.width}
              height={photos.workshop.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="eyebrow">Über uns</p>
          <h2 id="ueber-uns-title" className="mt-3 heading-lg">
            {about.title}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-5 text-lg leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {about.team.map((person) => (
              <li key={person.name} className="rounded-lg border border-line bg-white p-5">
                <p className="font-display text-lg font-bold">{person.name}</p>
                <p className="text-sm text-muted">{person.role}</p>
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {about.values.map((value) => (
              <div key={value.title}>
                <dt className="font-semibold">{value.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
