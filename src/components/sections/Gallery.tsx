'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gallery } from '@/content/site';
import { SectionHeading } from '@/components/SectionHeading';

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const show = useCallback((index: number) => {
    setActive((index + gallery.length) % gallery.length);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') show(active + 1);
      if (e.key === 'ArrowLeft') show(active - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, show]);

  const current = active !== null ? gallery[active] : null;

  return (
    <section id="projekte" aria-labelledby="projekte-title" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="projekte-title"
          eyebrow="Projekte aus der Werkstatt"
          title="Umbauten, Restaurationen, Revisionen."
          text="Ein Auszug aus Projekten, die bei uns in Herrenberg entstanden sind – von der Harley Flathead bis zum BMW Café Racer."
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((photo, index) => (
            <li key={photo.src} className={index === 0 || index === 7 ? 'col-span-2 row-span-2' : ''}>
              <button
                type="button"
                onClick={() => show(index)}
                className="group relative block h-full w-full overflow-hidden rounded-lg bg-paper"
                aria-label={`Bild vergrößern: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && setActive(null)}
        aria-label="Bildansicht"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="relative flex w-[min(92vw,1200px)] flex-col items-center">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="92vw"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">{current.alt}</figcaption>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => show(active! - 1)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Schließen"
              >
                <X aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => show(active! + 1)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Nächstes Bild"
              >
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  );
}
