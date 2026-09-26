import { channelLabels, concernLabels, statusLabels } from '@/lib/inquiries/labels';
import type { Inquiry } from '@/lib/inquiries/types';

// Quotes a cell and neutralises leading formula characters (CSV injection),
// since the content comes from untrusted form input.
const escape = (value: string) => {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
};

// Semicolon-separated with BOM so Excel (de-DE) opens umlauts and columns correctly.
export function inquiriesToCsv(inquiries: Inquiry[]) {
  const header = [
    'Eingang',
    'Status',
    'Name',
    'Telefon',
    'E-Mail',
    'Kontaktweg',
    'Marke',
    'Modell',
    'Baujahr',
    'Anliegen',
    'Wunschtermin',
    'Beschreibung',
  ];
  const rows = inquiries.map((i) => [
    new Date(i.createdAt).toLocaleString('de-DE'),
    statusLabels[i.status],
    i.contact.name,
    i.contact.phone,
    i.contact.email,
    channelLabels[i.contact.preferredChannel],
    i.vehicle.brand,
    i.vehicle.model,
    i.vehicle.year,
    concernLabels[i.concern],
    i.preferredDate,
    i.message,
  ]);
  return '﻿' + [header, ...rows].map((row) => row.map((cell) => escape(cell ?? '')).join(';')).join('\r\n');
}

export function downloadCsv(inquiries: Inquiry[]) {
  const blob = new Blob([inquiriesToCsv(inquiries)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dkf-anfragen-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
