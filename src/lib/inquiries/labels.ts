import type { Concern, ContactChannel, InquiryStatus, VehicleType } from './types';

export const vehicleTypeLabels: Record<VehicleType, string> = {
  motorrad: 'Motorrad',
  pkw: 'PKW',
};

export const concernLabels: Record<Concern, string> = {
  service: 'Kundendienst / Inspektion',
  hu_au: 'HU & AU',
  reifen: 'Reifenservice',
  reparatur: 'Reparatur / Fehlersuche',
  motor_getriebe: 'Motor- oder Getriebeinstandsetzung',
  umbau: 'Custom-Umbau / Leistungssteigerung',
  restauration: 'Restauration',
  sonstiges: 'Etwas anderes',
};

export const statusLabels: Record<InquiryStatus, string> = {
  neu: 'Neu',
  in_bearbeitung: 'In Bearbeitung',
  erledigt: 'Erledigt',
};

export const channelLabels: Record<ContactChannel, string> = {
  telefon: 'Telefon',
  email: 'E-Mail',
};
