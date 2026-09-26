export const concerns = [
  'service',
  'hu_au',
  'reifen',
  'reparatur',
  'motor_getriebe',
  'umbau',
  'restauration',
  'sonstiges',
] as const;
export type Concern = (typeof concerns)[number];

export const inquiryStatuses = ['neu', 'in_bearbeitung', 'erledigt'] as const;
export type InquiryStatus = (typeof inquiryStatuses)[number];

export type ContactChannel = 'telefon' | 'email';

export type InquiryDraft = {
  vehicle: {
    brand: string;
    model: string;
    year: string;
  };
  concern: Concern | '';
  message: string;
  preferredDate: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    preferredChannel: ContactChannel;
  };
  consent: boolean;
};

export type Inquiry = Omit<InquiryDraft, 'concern'> & {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  concern: Concern;
};

export const emptyDraft = (): InquiryDraft => ({
  vehicle: { brand: '', model: '', year: '' },
  concern: '',
  message: '',
  preferredDate: '',
  contact: { name: '', email: '', phone: '', preferredChannel: 'telefon' },
  consent: false,
});

export const isConcern = (value: string | null): value is Concern =>
  value !== null && (concerns as readonly string[]).includes(value);
