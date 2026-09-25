import type { Inquiry, InquiryDraft, InquiryStatus } from './types';

// Persistence boundary for inquiries. The prototype stores everything in the
// visitor's browser (localStorage); a server-backed adapter (e.g. Supabase)
// only needs to implement this interface and be exported as `inquiryStore`.
export interface InquiryStore {
  list(): Promise<Inquiry[]>;
  create(draft: InquiryDraft): Promise<Inquiry>;
  updateStatus(id: string, status: InquiryStatus): Promise<void>;
  remove(id: string): Promise<void>;
}

const STORAGE_KEY = 'dkf.inquiries.v1';

function read(): Inquiry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
}

function write(inquiries: Inquiry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch {
    throw new Error('Die Anfrage konnte in diesem Browser nicht gespeichert werden.');
  }
}

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export const localStorageStore: InquiryStore = {
  async list() {
    return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async create(draft) {
    if (!draft.vehicle.type || !draft.concern) throw new Error('Unvollständige Anfrage.');
    const inquiry: Inquiry = {
      ...draft,
      vehicle: { ...draft.vehicle, type: draft.vehicle.type },
      concern: draft.concern,
      id: newId(),
      createdAt: new Date().toISOString(),
      status: 'neu',
    };
    write([...read(), inquiry]);
    return inquiry;
  },
  async updateStatus(id, status) {
    write(read().map((inquiry) => (inquiry.id === id ? { ...inquiry, status } : inquiry)));
  },
  async remove(id) {
    write(read().filter((inquiry) => inquiry.id !== id));
  },
};

export const inquiryStore: InquiryStore = localStorageStore;
