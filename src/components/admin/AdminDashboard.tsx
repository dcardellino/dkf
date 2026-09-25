'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, Info, LogOut, Mail, Phone, RefreshCw, Search, Trash2 } from 'lucide-react';
import { channelLabels, concernLabels, statusLabels, vehicleTypeLabels } from '@/lib/inquiries/labels';
import { inquiryStore } from '@/lib/inquiries/store';
import { inquiryStatuses, type Inquiry, type InquiryStatus } from '@/lib/inquiries/types';
import { formatIsoDate } from '@/lib/inquiries/validation';
import { downloadCsv } from './csv';

const statusStyles: Record<InquiryStatus, string> = {
  neu: 'bg-brand-100 text-brand-900',
  in_bearbeitung: 'bg-sky-100 text-sky-900',
  erledigt: 'bg-emerald-100 text-emerald-900',
};

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' });

function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'alle'>('alle');
  const [query, setQuery] = useState('');

  const reload = useCallback(async () => {
    const list = await inquiryStore.list();
    setInquiries(list);
    setLoaded(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial load from the external store
    void reload();
    // Pick up inquiries submitted in another tab of this browser.
    const onStorage = () => void reload();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [reload]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inquiries.filter((i) => {
      if (statusFilter !== 'alle' && i.status !== statusFilter) return false;
      if (!q) return true;
      return [i.contact.name, i.contact.email, i.contact.phone, i.vehicle.brand, i.vehicle.model, i.message]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [inquiries, statusFilter, query]);

  const selected = inquiries.find((i) => i.id === selectedId) ?? null;
  const counts = {
    total: inquiries.length,
    neu: inquiries.filter((i) => i.status === 'neu').length,
    in_bearbeitung: inquiries.filter((i) => i.status === 'in_bearbeitung').length,
  };

  const changeStatus = async (id: string, status: InquiryStatus) => {
    await inquiryStore.updateStatus(id, status);
    await reload();
  };

  const remove = async (inquiry: Inquiry) => {
    if (!window.confirm(`Anfrage von ${inquiry.contact.name} endgültig löschen?`)) return;
    await inquiryStore.remove(inquiry.id);
    setSelectedId(null);
    await reload();
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 heading-lg">Anfragen</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void reload()}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/15 bg-white px-4 text-sm font-semibold hover:border-ink/40"
          >
            <RefreshCw aria-hidden className="size-4" />
            Aktualisieren
          </button>
          <button
            type="button"
            onClick={() => downloadCsv(filtered)}
            disabled={filtered.length === 0}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/15 bg-white px-4 text-sm font-semibold hover:border-ink/40 disabled:opacity-50"
          >
            <Download aria-hidden className="size-4" />
            CSV-Export
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white hover:bg-ink-soft"
          >
            <LogOut aria-hidden className="size-4" />
            Abmelden
          </button>
        </div>
      </div>

      <p className="mt-6 flex items-start gap-2 rounded-lg border border-brand-200 bg-brand-50 p-4 text-sm leading-relaxed text-brand-900">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
        <span>
          <strong>Prototyp:</strong> Anfragen werden nur im Local Storage dieses Browsers gespeichert. Du siehst hier
          ausschließlich Anfragen, die auf diesem Gerät in diesem Browser abgeschickt wurden. Für echten Betrieb ist ein
          Backend (z. B. Supabase) nötig.
        </span>
      </p>

      <dl className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: 'Gesamt', value: counts.total },
          { label: 'Neu', value: counts.neu },
          { label: 'In Bearbeitung', value: counts.in_bearbeitung },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col rounded-xl border border-line bg-white p-4 sm:p-5">
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="order-first font-display text-3xl font-bold">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Suchen</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, Kontakt, Fahrzeug …"
            className="h-11 w-full rounded-md border border-ink/15 bg-white pr-4 pl-9 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
          />
        </label>
        <label>
          <span className="sr-only">Status filtern</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as InquiryStatus | 'alle')}
            className="h-11 w-full rounded-md border border-ink/15 bg-white px-3 sm:w-48"
          >
            <option value="alle">Alle Status</option>
            {inquiryStatuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section aria-label="Anfrageliste">
          {loaded && filtered.length === 0 && (
            <p className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-muted">
              {inquiries.length === 0 ? 'Noch keine Anfragen eingegangen.' : 'Keine Anfragen für diesen Filter.'}
            </p>
          )}
          <ul className="grid gap-2">
            {filtered.map((inquiry) => (
              <li key={inquiry.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(inquiry.id)}
                  aria-current={inquiry.id === selectedId || undefined}
                  className={`w-full rounded-xl border bg-white p-4 text-left transition-colors ${
                    inquiry.id === selectedId
                      ? 'border-brand-500 ring-2 ring-brand-500/20'
                      : 'border-line hover:border-ink/25'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-semibold">{inquiry.contact.name}</span>
                    <StatusBadge status={inquiry.status} />
                  </div>
                  <p className="mt-1 truncate text-sm text-ink-soft">
                    {concernLabels[inquiry.concern]} · {inquiry.vehicle.brand} {inquiry.vehicle.model}
                  </p>
                  <p className="mt-1 text-xs text-muted">{formatDateTime(inquiry.createdAt)}</p>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Anfragedetails" className="lg:sticky lg:top-6 lg:self-start">
          {selected ? (
            <article className="rounded-xl border border-line bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold">{selected.contact.name}</h2>
                  <p className="text-sm text-muted">Eingegangen am {formatDateTime(selected.createdAt)}</p>
                </div>
                <label>
                  <span className="sr-only">Status ändern</span>
                  <select
                    value={selected.status}
                    onChange={(e) => void changeStatus(selected.id, e.target.value as InquiryStatus)}
                    className="h-10 rounded-md border border-ink/15 bg-white px-3 text-sm font-semibold"
                  >
                    {inquiryStatuses.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.contact.phone && (
                  <a
                    href={`tel:${selected.contact.phone.replace(/[^\d+]/g, '')}`}
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-brand-500 px-4 text-sm font-semibold text-ink hover:bg-brand-400"
                  >
                    <Phone aria-hidden className="size-4" />
                    {selected.contact.phone}
                  </a>
                )}
                {selected.contact.email && (
                  <a
                    href={`mailto:${selected.contact.email}`}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-ink/15 px-4 text-sm font-semibold hover:border-ink/40"
                  >
                    <Mail aria-hidden className="size-4" />
                    {selected.contact.email}
                  </a>
                )}
              </div>

              <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-line pt-6 text-sm sm:grid-cols-[9rem_1fr]">
                <dt className="text-muted">Bevorzugt</dt>
                <dd>{channelLabels[selected.contact.preferredChannel]}</dd>
                <dt className="text-muted">Fahrzeug</dt>
                <dd>
                  {vehicleTypeLabels[selected.vehicle.type]} · {selected.vehicle.brand} {selected.vehicle.model}
                  {selected.vehicle.year && ` (${selected.vehicle.year})`}
                </dd>
                <dt className="text-muted">Anliegen</dt>
                <dd>{concernLabels[selected.concern]}</dd>
                <dt className="text-muted">Wunschtermin</dt>
                <dd>{selected.preferredDate ? formatIsoDate(selected.preferredDate) : '—'}</dd>
                <dt className="text-muted">Beschreibung</dt>
                <dd className="whitespace-pre-wrap">{selected.message}</dd>
                <dt className="text-muted">Einwilligung</dt>
                <dd>{selected.consent ? 'Datenschutz bestätigt' : 'Nein'}</dd>
              </dl>

              <button
                type="button"
                onClick={() => void remove(selected)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-900"
              >
                <Trash2 aria-hidden className="size-4" />
                Anfrage löschen
              </button>
            </article>
          ) : (
            <p className="hidden rounded-xl border border-dashed border-line bg-white p-8 text-center text-muted lg:block">
              Wähle links eine Anfrage aus.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
