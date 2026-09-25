import type { InquiryDraft } from './types';

export type FieldErrors = Partial<Record<string, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s/-]{6,}$/;

export function tomorrowIso() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

// Validates a single funnel step and returns errors keyed by field name.
export function validateStep(step: number, draft: InquiryDraft): FieldErrors {
  const errors: FieldErrors = {};
  const currentYear = new Date().getFullYear();

  if (step === 0) {
    if (!draft.vehicle.type) errors['vehicle.type'] = 'Bitte wähle Motorrad oder PKW.';
    if (!draft.vehicle.brand.trim()) errors['vehicle.brand'] = 'Bitte gib die Marke an.';
    if (draft.vehicle.year) {
      const year = Number(draft.vehicle.year);
      if (!Number.isInteger(year) || year < 1900 || year > currentYear + 1) {
        errors['vehicle.year'] = `Bitte ein Baujahr zwischen 1900 und ${currentYear + 1} angeben.`;
      }
    }
  }

  if (step === 1 && !draft.concern) errors.concern = 'Bitte wähle aus, worum es geht.';

  if (step === 2) {
    if (draft.message.trim().length < 10) errors.message = 'Beschreib dein Anliegen bitte kurz (mind. 10 Zeichen).';
    if (draft.preferredDate && draft.preferredDate < tomorrowIso()) {
      errors.preferredDate = 'Der Wunschtermin muss in der Zukunft liegen.';
    }
  }

  if (step === 3) {
    const { name, email, phone, preferredChannel } = draft.contact;
    if (name.trim().length < 2) errors['contact.name'] = 'Bitte gib deinen Namen an.';
    if (!email.trim() && !phone.trim())
      errors['contact.email'] = 'Bitte gib eine E-Mail-Adresse oder Telefonnummer an.';
    if (email.trim() && !EMAIL_PATTERN.test(email.trim()))
      errors['contact.email'] = 'Bitte gib eine gültige E-Mail-Adresse an.';
    if (phone.trim() && !PHONE_PATTERN.test(phone.trim()))
      errors['contact.phone'] = 'Bitte gib eine gültige Telefonnummer an.';
    if (preferredChannel === 'telefon' && !phone.trim() && !errors['contact.phone']) {
      errors['contact.phone'] = 'Für einen Rückruf brauchen wir deine Telefonnummer.';
    }
    if (preferredChannel === 'email' && !email.trim() && !errors['contact.email']) {
      errors['contact.email'] = 'Für eine Antwort per E-Mail brauchen wir deine E-Mail-Adresse.';
    }
    if (!draft.consent) errors.consent = 'Bitte bestätige die Datenschutzhinweise.';
  }

  return errors;
}

// Formats a YYYY-MM-DD date without timezone shifts.
export function formatIsoDate(iso: string) {
  const [year, month, day] = iso.split('-');
  return year && month && day ? `${day}.${month}.${year}` : iso;
}
