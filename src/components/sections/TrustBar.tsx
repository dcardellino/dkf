import { trustItems } from '@/content/site';

export function TrustBar() {
  return (
    <section aria-label="Warum DKF-Bikes" className="border-b border-line bg-white">
      <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col border-line px-2 py-8 sm:px-6 lg:border-l lg:py-10 lg:first:border-l-0"
          >
            <dt className="text-sm font-semibold text-ink">{item.label}</dt>
            <dd className="order-first mb-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              <span className="mb-3 block h-1 w-8 rounded-full bg-brand-500" aria-hidden />
              {item.value}
            </dd>
            <dd className="mt-1 text-sm text-muted">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
