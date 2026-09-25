'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  Car,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Cog,
  Gauge,
  Hammer,
  HelpCircle,
  Loader2,
  Search,
  Wrench,
} from 'lucide-react';
import { company } from '@/content/site';
import { ChoiceCard, Field, TextArea, TextInput, describedBy } from '@/components/form';
import { channelLabels, concernLabels, vehicleTypeLabels } from '@/lib/inquiries/labels';
import { inquiryStore } from '@/lib/inquiries/store';
import { concerns, emptyDraft, isConcern, type Concern, type InquiryDraft } from '@/lib/inquiries/types';
import { formatIsoDate, tomorrowIso, validateStep, type FieldErrors } from '@/lib/inquiries/validation';

const steps = [
  { title: 'Um welches Fahrzeug geht es?', short: 'Fahrzeug' },
  { title: 'Was dürfen wir für dich tun?', short: 'Anliegen' },
  { title: 'Erzähl uns mehr.', short: 'Details' },
  { title: 'Wie erreichen wir dich?', short: 'Kontakt' },
];

const concernIcons: Record<Concern, typeof Wrench> = {
  service: Wrench,
  hu_au: ClipboardCheck,
  reifen: CircleDot,
  reparatur: Search,
  motor_getriebe: Cog,
  umbau: Gauge,
  restauration: Hammer,
  sonstiges: HelpCircle,
};

const concernDescriptions: Record<Concern, string> = {
  service: 'Inspektion nach Herstellervorgabe',
  hu_au: 'Hauptuntersuchung & Abgasuntersuchung',
  reifen: 'Wechsel, Montage, neue Reifen',
  reparatur: 'Etwas stimmt nicht – wir finden es',
  motor_getriebe: 'Instandsetzen statt austauschen',
  umbau: 'Custom Bike, Individualisierung, mehr Leistung',
  restauration: 'Klassiker zurück auf die Straße',
  sonstiges: 'Beschreib es uns im nächsten Schritt',
};

const messagePlaceholders: Partial<Record<Concern, string>> = {
  umbau: 'Was schwebt dir vor? Stil, Vorbilder, Budgetrahmen …',
  restauration: 'Zustand des Fahrzeugs, was ist original, was fehlt …',
  reparatur: 'Was genau passiert? Seit wann? Geräusche, Warnleuchten …',
  motor_getriebe: 'Was ist passiert? Laufleistung, Symptome …',
};

export function InquiryFunnel() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<InquiryDraft>(emptyDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Preselect the concern when linked from a specific CTA (?anliegen=umbau).
  useEffect(() => {
    const concern = new URLSearchParams(window.location.search).get('anliegen');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only available after hydration
    if (isConcern(concern)) setDraft((d) => ({ ...d, concern }));
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    window.scrollTo({ top: 0 });
  }, [step, submitted]);

  const update = (patch: (d: InquiryDraft) => InquiryDraft, field?: string) => {
    setDraft(patch);
    if (field && errors[field]) {
      setErrors((current) => {
        const rest = { ...current };
        delete rest[field];
        return rest;
      });
    }
  };

  const next = async (event: FormEvent) => {
    event.preventDefault();
    const stepErrors = validateStep(step, draft);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      const firstField = Object.keys(stepErrors)[0].replace('.', '-');
      document.getElementById(firstField)?.focus();
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      await inquiryStore.create(draft);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unbekannter Fehler.');
    } finally {
      setSubmitting(false);
    }
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center sm:py-16">
        <CheckCircle2 aria-hidden className="mx-auto size-14 text-brand-600" />
        <h1 ref={headingRef} tabIndex={-1} className="mt-6 heading-lg outline-none">
          Danke, {draft.contact.name.split(' ')[0]}! Deine Anfrage ist eingegangen.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Wir schauen sie uns an und melden uns persönlich per {channelLabels[draft.contact.preferredChannel]} bei dir –
          in der Regel innerhalb von zwei Werktagen.
        </p>
        <p className="mt-4 text-muted">
          Eilig? Ruf uns an:{' '}
          <a href={company.phoneHref} className="font-semibold text-ink hover:text-brand-700">
            {company.phoneDisplay}
          </a>
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-6 font-semibold text-white hover:bg-ink-soft"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;
  const errorCount = Object.keys(errors).length;

  return (
    <form noValidate onSubmit={next} className="mx-auto max-w-2xl">
      <div>
        <div className="flex items-center justify-between text-sm font-medium text-muted">
          <span>
            Schritt {step + 1} von {steps.length}
          </span>
          <span>{steps[step].short}</span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-label="Fortschritt"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={step + 1}
        >
          <div
            className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h1 ref={headingRef} tabIndex={-1} className="mt-8 heading-lg outline-none">
        {steps[step].title}
      </h1>

      <div aria-live="polite" className="sr-only">
        {errorCount > 0 ? `${errorCount} Eingabe${errorCount > 1 ? 'n' : ''} bitte prüfen.` : ''}
      </div>

      <div className="mt-8 grid gap-6">
        {step === 0 && (
          <>
            <fieldset>
              <legend className="sr-only">Fahrzeugart</legend>
              <div className="grid gap-3 sm:grid-cols-2" id="vehicle-type" tabIndex={-1}>
                <ChoiceCard
                  name="vehicleType"
                  value="motorrad"
                  checked={draft.vehicle.type === 'motorrad'}
                  onChange={() =>
                    update((d) => ({ ...d, vehicle: { ...d.vehicle, type: 'motorrad' } }), 'vehicle.type')
                  }
                  title="Motorrad"
                  description="Harley, Klassiker, alle Marken"
                  icon={<Bike aria-hidden className="size-5" />}
                />
                <ChoiceCard
                  name="vehicleType"
                  value="pkw"
                  checked={draft.vehicle.type === 'pkw'}
                  onChange={() => update((d) => ({ ...d, vehicle: { ...d.vehicle, type: 'pkw' } }), 'vehicle.type')}
                  title="PKW"
                  description="Alle Marken & Fabrikate"
                  icon={<Car aria-hidden className="size-5" />}
                />
              </div>
              {errors['vehicle.type'] && (
                <p className="mt-2 text-sm font-medium text-red-700">{errors['vehicle.type']}</p>
              )}
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="vehicle-brand" label="Marke" error={errors['vehicle.brand']}>
                <TextInput
                  id="vehicle-brand"
                  autoComplete="off"
                  placeholder={draft.vehicle.type === 'pkw' ? 'z. B. VW' : 'z. B. Harley-Davidson'}
                  value={draft.vehicle.brand}
                  invalid={!!errors['vehicle.brand']}
                  aria-describedby={describedBy('vehicle-brand', errors['vehicle.brand'])}
                  onChange={(e) =>
                    update((d) => ({ ...d, vehicle: { ...d.vehicle, brand: e.target.value } }), 'vehicle.brand')
                  }
                />
              </Field>
              <Field id="vehicle-model" label="Modell" optional>
                <TextInput
                  id="vehicle-model"
                  autoComplete="off"
                  placeholder={draft.vehicle.type === 'pkw' ? 'z. B. Golf VII' : 'z. B. Sportster 1200'}
                  value={draft.vehicle.model}
                  onChange={(e) => update((d) => ({ ...d, vehicle: { ...d.vehicle, model: e.target.value } }))}
                />
              </Field>
            </div>
            <Field id="vehicle-year" label="Baujahr" optional error={errors['vehicle.year']}>
              <TextInput
                id="vehicle-year"
                inputMode="numeric"
                maxLength={4}
                placeholder="z. B. 2004"
                className="sm:max-w-40"
                value={draft.vehicle.year}
                invalid={!!errors['vehicle.year']}
                aria-describedby={describedBy('vehicle-year', errors['vehicle.year'])}
                onChange={(e) =>
                  update(
                    (d) => ({ ...d, vehicle: { ...d.vehicle, year: e.target.value.replace(/\D/g, '') } }),
                    'vehicle.year',
                  )
                }
              />
            </Field>
          </>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="sr-only">Anliegen</legend>
            <div className="grid gap-3 sm:grid-cols-2" id="concern" tabIndex={-1}>
              {concerns.map((concern) => {
                const Icon = concernIcons[concern];
                return (
                  <ChoiceCard
                    key={concern}
                    name="concern"
                    value={concern}
                    checked={draft.concern === concern}
                    onChange={() => update((d) => ({ ...d, concern }), 'concern')}
                    title={concernLabels[concern]}
                    description={concernDescriptions[concern]}
                    icon={<Icon aria-hidden className="size-5" />}
                  />
                );
              })}
            </div>
            {errors.concern && <p className="mt-2 text-sm font-medium text-red-700">{errors.concern}</p>}
          </fieldset>
        )}

        {step === 2 && (
          <>
            <Field
              id="message"
              label="Beschreibung"
              hint="Je genauer, desto besser können wir dir eine ehrliche Einschätzung geben."
              error={errors.message}
            >
              <TextArea
                id="message"
                maxLength={2000}
                placeholder={
                  (draft.concern && messagePlaceholders[draft.concern]) ||
                  'Was steht an? Kilometerstand, Besonderheiten, Fragen …'
                }
                value={draft.message}
                invalid={!!errors.message}
                aria-describedby={describedBy(
                  'message',
                  errors.message,
                  'Je genauer, desto besser können wir dir eine ehrliche Einschätzung geben.',
                )}
                onChange={(e) => update((d) => ({ ...d, message: e.target.value }), 'message')}
              />
            </Field>
            <Field
              id="preferredDate"
              label="Wunschtermin"
              optional
              hint="Wir bestätigen den Termin persönlich."
              error={errors.preferredDate}
            >
              <TextInput
                id="preferredDate"
                type="date"
                min={tomorrowIso()}
                className="sm:max-w-60"
                value={draft.preferredDate}
                invalid={!!errors.preferredDate}
                aria-describedby={describedBy(
                  'preferredDate',
                  errors.preferredDate,
                  'Wir bestätigen den Termin persönlich.',
                )}
                onChange={(e) => update((d) => ({ ...d, preferredDate: e.target.value }), 'preferredDate')}
              />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <Field id="contact-name" label="Name" error={errors['contact.name']}>
              <TextInput
                id="contact-name"
                autoComplete="name"
                value={draft.contact.name}
                invalid={!!errors['contact.name']}
                aria-describedby={describedBy('contact-name', errors['contact.name'])}
                onChange={(e) =>
                  update((d) => ({ ...d, contact: { ...d.contact, name: e.target.value } }), 'contact.name')
                }
              />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="contact-phone" label="Telefon" error={errors['contact.phone']}>
                <TextInput
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={draft.contact.phone}
                  invalid={!!errors['contact.phone']}
                  aria-describedby={describedBy('contact-phone', errors['contact.phone'])}
                  onChange={(e) =>
                    update((d) => ({ ...d, contact: { ...d.contact, phone: e.target.value } }), 'contact.phone')
                  }
                />
              </Field>
              <Field id="contact-email" label="E-Mail" error={errors['contact.email']}>
                <TextInput
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={draft.contact.email}
                  invalid={!!errors['contact.email']}
                  aria-describedby={describedBy('contact-email', errors['contact.email'])}
                  onChange={(e) =>
                    update((d) => ({ ...d, contact: { ...d.contact, email: e.target.value } }), 'contact.email')
                  }
                />
              </Field>
            </div>
            <fieldset>
              <legend className="text-sm font-semibold">Wie sollen wir uns melden?</legend>
              <div className="mt-2 flex gap-3">
                {(['telefon', 'email'] as const).map((channel) => (
                  <label
                    key={channel}
                    className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border-2 px-4 font-medium has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600 ${
                      draft.contact.preferredChannel === channel
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-line hover:border-ink/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredChannel"
                      value={channel}
                      checked={draft.contact.preferredChannel === channel}
                      onChange={() => update((d) => ({ ...d, contact: { ...d.contact, preferredChannel: channel } }))}
                      className="sr-only"
                    />
                    {channelLabels[channel]}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="rounded-xl border border-line bg-paper p-5 text-sm">
              <p className="font-semibold">Deine Anfrage</p>
              <dl className="mt-3 grid gap-2 sm:grid-cols-[8rem_1fr]">
                <dt className="text-muted">Fahrzeug</dt>
                <dd>
                  {draft.vehicle.type && vehicleTypeLabels[draft.vehicle.type]} · {draft.vehicle.brand}{' '}
                  {draft.vehicle.model}
                  {draft.vehicle.year && ` (${draft.vehicle.year})`}
                </dd>
                <dt className="text-muted">Anliegen</dt>
                <dd>{draft.concern && concernLabels[draft.concern]}</dd>
                {draft.preferredDate && (
                  <>
                    <dt className="text-muted">Wunschtermin</dt>
                    <dd>{formatIsoDate(draft.preferredDate)}</dd>
                  </>
                )}
              </dl>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mt-3 font-semibold text-brand-700 hover:text-ink"
              >
                Angaben ändern
              </button>
            </div>

            <div>
              <label className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={draft.consent}
                  aria-invalid={!!errors.consent || undefined}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  onChange={(e) => update((d) => ({ ...d, consent: e.target.checked }), 'consent')}
                  className="mt-1 size-5 shrink-0 accent-brand-600"
                />
                <span className="text-sm leading-relaxed text-ink-soft">
                  Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert und
                  verwendet werden. Details in der{' '}
                  <Link href="/datenschutz/" target="_blank" className="font-semibold underline hover:text-ink">
                    Datenschutzerklärung
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && (
                <p id="consent-error" className="mt-2 text-sm font-medium text-red-700">
                  {errors.consent}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {submitError && (
        <p role="alert" className="mt-6 rounded-md bg-red-50 p-4 text-sm font-medium text-red-800">
          {submitError}
        </p>
      )}

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md px-4 font-semibold text-ink-soft hover:bg-paper hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Zurück
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-brand-500 px-7 text-base font-semibold text-ink shadow-sm hover:bg-brand-400 disabled:opacity-70 sm:text-lg"
        >
          {submitting && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {step < steps.length - 1 ? 'Weiter' : 'Anfrage absenden'}
          {!submitting && <ArrowRight aria-hidden className="size-4" />}
        </button>
      </div>
    </form>
  );
}
