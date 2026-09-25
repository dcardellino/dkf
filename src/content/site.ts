// Central content for the landing page. Copy lives here so sections stay
// presentational and the business can review all texts in one place.
//
// TODO(content) markers flag facts taken from the legacy site that the
// business still has to confirm before go-live.

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Single switch for every "Anfrage" button on the page. The inquiry form is
// built in the next step; until then all buttons point here.
export const inquiryHref = '#';

export const company = {
  name: 'DKF-Bikes',
  brand: 'DKF Bikes & More',
  legalName: 'Dietmar Klittich Fahrzeuge',
  tagline: 'Freie Harley- & Meisterwerkstatt im Gäu',
  foundedYear: 1994,
  owner: 'Dietmar Klittich',
  chamber: 'Handwerkskammer Stuttgart',
  vatId: 'DE 178376477',
  street: 'Grünewaldstraße 4/1',
  zip: '71083',
  city: 'Herrenberg',
  region: 'Baden-Württemberg',
  phoneDisplay: '07032 77930',
  phoneHref: 'tel:+49703277930',
  // TODO(content): mail domain differs from web domain – confirm or switch to an @dkf-bikes.com address.
  email: 'kontakt@dkf-weltweit.de',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Gr%C3%BCnewaldstra%C3%9Fe+4%2F1%2C+71083+Herrenberg',
  social: {
    facebook: 'https://www.facebook.com/p/DKF-Bikes-More-100064288620786/',
  },
  serviceArea: [
    'Herrenberg',
    'Gäufelden',
    'Ammerbuch',
    'Nagold',
    'Böblingen',
    'Sindelfingen',
    'Tübingen',
    'Rottenburg',
  ],
};

export const yearsInBusiness = new Date().getFullYear() - company.foundedYear;

// TODO(content): legacy site says both "nur nach Terminvereinbarung" and fixed hours – confirm.
export const openingHours = [
  { days: 'Montag', hours: 'geschlossen' },
  { days: 'Dienstag – Freitag', hours: '10:00 – 18:00 Uhr' },
  { days: 'Samstag', hours: 'nach Vereinbarung' },
  { days: 'Sonntag', hours: 'geschlossen' },
];

export const openingHoursNote =
  'Am besten vorher einen Termin ausmachen – dann haben wir Zeit für dich und dein Fahrzeug.';

export const navigation = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Spezialgebiete', href: '#spezialgebiete' },
  { label: 'Projekte', href: '#projekte' },
  { label: 'Preise', href: '#preise' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Kontakt', href: '#kontakt' },
];

const img = (name: string, alt: string, width = 1000, height = 665): Photo => ({
  src: `/images/${name}.webp`,
  alt,
  width,
  height,
});

export const photos = {
  hero: img(
    'sportster-scrambler-rot',
    'Harley-Davidson Sportster als Scrambler-Umbau in Rot, aufgebaut von DKF-Bikes',
    1000,
    750,
  ),
  vRod: img('harley-v-rod-1', 'Harley-Davidson V-Rod in Silber nach dem Umbau'),
  bmw: img('bmw-cafe-racer-1', 'Klassische BMW-Boxer als Café Racer restauriert', 1600, 1064),
  engine: img(
    'harley-v-twin-revidiert-1',
    'Komplett revidierter Harley-Davidson V-Twin-Motor in der Werkstatt',
    1600,
    1200,
  ),
  workshop: img('harley-custom-creme', 'Harley-Davidson Custom Bike in Creme in der DKF-Werkstatt', 1000, 750),
};

export const hero = {
  eyebrow: `KFZ-Meisterbetrieb · seit ${company.foundedYear} in Herrenberg`,
  title: 'Deine freie Harley- & Meisterwerkstatt im Gäu.',
  text: 'Service, Reparatur und Umbau für Motorrad und PKW – vom Kundendienst bis zur kompletten Motorinstandsetzung. Persönlich, ehrlich und mit über 30 Jahren Erfahrung.',
  bullets: ['Alle Marken & Fabrikate', 'Harley-Davidson ohne Händlerbindung', 'Transparente Ab-Preise'],
};

export const trustItems = [
  { value: `${yearsInBusiness}+`, label: 'Jahre Erfahrung', detail: `seit ${company.foundedYear} in Herrenberg` },
  { value: 'Meister', label: 'KFZ-Meisterbetrieb', detail: company.chamber },
  { value: 'H-D', label: 'Harley-Spezialist', detail: 'Service, Umbau, Klassiker' },
  { value: '2 in 1', label: 'Motorrad & PKW', detail: 'alle Marken, Originalteile' },
];

export type Service = {
  icon: 'wrench' | 'clipboard' | 'tire' | 'engine' | 'gear' | 'bike' | 'restore' | 'gauge';
  title: string;
  text: string;
};

export const services: Service[] = [
  {
    icon: 'wrench',
    title: 'Kundendienst Motorrad & PKW',
    text: 'Inspektion nach Herstellervorgabe für Fahrzeuge aller Art und Fabrikate – mit Originalteilen, zum fairen Preis.',
  },
  {
    icon: 'clipboard',
    title: 'HU & AU',
    text: 'Hauptuntersuchung und Abgasuntersuchung – wir bereiten dein Fahrzeug vor, damit es ohne Mängel durchkommt.',
  },
  {
    icon: 'tire',
    title: 'Reifenservice',
    text: 'Sommer- und Winterreifen für Motorrad und PKW, Montage, Auswuchten – auch mit mitgebrachten Reifen.',
  },
  {
    icon: 'engine',
    title: 'Motoreninstandsetzung',
    text: 'Kolbenfresser oder Motorschaden? Wir setzen deinen Motor instand und bringen ihn zurück auf Originalleistung.',
  },
  {
    icon: 'gear',
    title: 'Getriebeinstandsetzung',
    text: 'Diagnose und Überholung von Getrieben – mit besonderer Erfahrung bei Harley-Davidson.',
  },
  {
    icon: 'bike',
    title: 'Custom Bikes & Umbauten',
    text: 'Von kleinen Änderungen bis zum Komplettumbau – TÜV-konform und genau nach deinen Vorstellungen.',
  },
  {
    icon: 'restore',
    title: 'Restauration',
    text: 'Klassiker wie BMW, Horex oder Zündapp bringen wir mit Sachverstand und Geduld zurück auf die Straße.',
  },
  {
    icon: 'gauge',
    title: 'Leistungssteigerung',
    text: 'Mehr Druck aus deinem Motorrad – sauber abgestimmt, eintragungsfähig und ohne Kompromisse bei der Haltbarkeit.',
  },
];

export const specialties = [
  {
    kicker: 'Harley-Davidson',
    title: 'Harley-Kompetenz ohne Vertragshändler-Bindung.',
    text: 'Ob Evo, Twin Cam, V-Rod oder Flathead: Wir kennen die Technik seit Jahrzehnten. Als freie Werkstatt beraten wir dich unabhängig – beim Service genauso wie beim Umbau deiner Harley.',
    points: ['Service & Reparatur aller Baujahre', 'Individualisierung & Komplettumbau', 'TÜV-konforme Umbauten'],
    photo: photos.vRod,
  },
  {
    kicker: 'Klassiker & Restauration',
    title: 'Alte Motorräder verdienen Sachverstand.',
    text: 'BMW-Boxer, Horex, Zündapp und viele mehr: Wir restaurieren Klassiker mit Liebe zum Detail – vom Motor bis zur Optik, als Original oder als Café Racer.',
    points: ['Teil- und Vollrestauration', 'Motor- und Fahrwerksüberholung', 'Umbau zum Café Racer oder Scrambler'],
    photo: photos.bmw,
  },
  {
    kicker: 'Motor & Getriebe',
    title: 'Instandsetzen statt austauschen.',
    text: 'Ein Tauschmotor ist teuer und nicht immer nötig. Wir zerlegen, vermessen und setzen deinen Motor oder dein Getriebe instand – mit Leistungs- und Qualitätskontrolle am Ende.',
    points: ['Befund & ehrliche Einschätzung vorab', 'Günstiger als ein Austauschmotor', 'Zurück auf Originalleistung'],
    photo: photos.engine,
  },
];

export const gallery: Photo[] = [
  img('sportster-scrambler-rot-seite', 'Harley-Davidson Sportster Scrambler in Rot, Seitenansicht', 1000, 750),
  img('harley-flathead-1', 'Historische Harley-Davidson Flathead mit Flammen-Lackierung'),
  img('bmw-cafe-racer-2', 'BMW-Boxer Café Racer mit Speichenrädern'),
  img('harley-fat-boy-2', 'Harley-Davidson Fat Boy Custom in Schwarz'),
  img('harley-softail-hellblau', 'Harley-Davidson Softail in Hellblau und Weiß', 1000, 750),
  img('harley-v-rod-3', 'Harley-Davidson V-Rod Custom in Silber'),
  img('harley-sportster-petrol-1', 'Harley-Davidson Sportster in Petrol'),
  img('harley-v-twin-revidiert-2', 'Revidierter Harley-Davidson V-Twin-Motor', 1600, 1200),
  img('harley-flathead-2', 'Tank-Detail der Harley-Davidson Flathead'),
  img('bmw-cafe-racer-3', 'BMW-Boxer Café Racer, Frontansicht'),
  img('harley-fat-boy-1', 'Harley-Davidson Fat Boy mit breitem Hinterrad'),
  img('getriebe-instandsetzung', 'Überholtes Motorradgetriebe auf der Werkbank', 1600, 1200),
  img('harley-v-rod-2', 'Harley-Davidson V-Rod, Detail von Motor und Auspuff'),
  img('klassiker-motor-detail', 'Motor eines klassischen Motorrads im Detail', 1000, 750),
];

// TODO(content): prices taken from the legacy site – confirm they are current.
export const prices = [
  { title: 'Reifenwechsel', price: 'ab 30 €', note: 'pro Rad, bei mitgebrachten Reifen' },
  { title: 'HU & AU', price: 'ab 130 €', note: 'Motorrad oder PKW' },
  { title: 'Kleiner Kundendienst', price: 'ab 150 €', note: 'Motorrad oder PKW' },
  { title: 'Großer Kundendienst', price: 'ab 550 €', note: 'nach Herstellervorgabe' },
];

// TODO(content): confirm VAT statement.
export const pricesNote =
  'Alle Preise inkl. MwSt. Der Endpreis hängt vom Fahrzeug und vom Befund ab – du bekommst vorher eine ehrliche Einschätzung. Custom-Umbauten und Restaurationen kalkulieren wir individuell.';

export const processSteps = [
  { title: 'Anfrage', text: 'Schreib uns kurz, um welches Fahrzeug es geht und was ansteht – gern mit Foto.' },
  { title: 'Einschätzung', text: 'Wir melden uns persönlich mit einer ehrlichen Einschätzung und einem Kostenrahmen.' },
  { title: 'Termin', text: 'Du bringst dein Fahrzeug vorbei. Größere Arbeiten sprechen wir vorher mit dir ab.' },
  { title: 'Abholung', text: 'Du holst dein Fahrzeug ab und bekommst erklärt, was wir gemacht haben.' },
];

export const about = {
  title: 'Inhabergeführt. Persönlich. Seit 1994.',
  paragraphs: [
    'Hinter DKF-Bikes stehen Dietmar und Conny Klittich. Seit über 30 Jahren sind wir in Herrenberg der Ansprechpartner für alle, die ihr Fahrzeug in gute Hände geben wollen – vom Alltagsauto bis zur Harley mit Geschichte.',
    'Bei uns sprichst du direkt mit dem Meister, der auch an deinem Fahrzeug schraubt. Kein Callcenter, keine Standardantworten – sondern ehrliche Beratung und Arbeit, hinter der wir stehen.',
  ],
  // TODO(content): add a real team photo of Dietmar & Conny.
  team: [
    { name: 'Dietmar Klittich', role: 'Inhaber & KFZ-Meister' },
    { name: 'Conny Klittich', role: 'Geschäftsführung & Einkauf' },
  ],
  values: [
    { title: 'Fairness', text: 'Transparente Preise und keine Arbeiten ohne deine Freigabe.' },
    { title: 'Originalteile', text: 'Qualität, die hält – beim Kundendienst wie beim Umbau.' },
    { title: 'Erfahrung', text: 'Über drei Jahrzehnte Praxis mit Motorrad und PKW.' },
  ],
};

// TODO(content): FAQ answers are copy proposals – confirm with the business.
export const faqs = [
  {
    q: 'Macht ihr auch Service an Harleys, die nicht beim Vertragshändler gekauft wurden?',
    a: 'Ja. Als freie Werkstatt betreuen wir Harley-Davidson aller Baujahre – egal wo das Motorrad gekauft wurde. Auch ältere Modelle und Umbauten.',
  },
  {
    q: 'Repariert ihr nur Motorräder?',
    a: 'Nein. Wir sind KFZ-Meisterbetrieb für Motorrad und PKW und übernehmen Kundendienst, Reparaturen, Reifenservice sowie HU/AU für Fahrzeuge aller Marken.',
  },
  {
    q: 'Sind eure Custom-Umbauten TÜV-konform?',
    a: 'Ja. Wir planen Umbauten so, dass sie eintragungsfähig sind, und beraten dich vorab, was möglich ist und was nicht.',
  },
  {
    q: 'Lohnt sich eine Motorinstandsetzung statt eines Austauschmotors?',
    a: 'Oft ja – vor allem bei Klassikern und Harleys. Nach dem Befund sagen wir dir ehrlich, welche Variante für dein Fahrzeug wirtschaftlich sinnvoll ist.',
  },
  {
    q: 'Bekomme ich vorher einen Kostenvoranschlag?',
    a: 'Ja. Bei Reparaturen, Umbauten und Restaurationen besprechen wir den Kostenrahmen vorab. Zusätzliche Arbeiten führen wir nur nach deiner Freigabe durch.',
  },
  {
    q: 'Kann ich meine eigenen Reifen oder Teile mitbringen?',
    a: 'Reifen gern – die Montage kostet ab 30 € pro Rad. Bei Teilen sprechen wir kurz ab, ob sie passen, damit wir für die Arbeit geradestehen können.',
  },
  {
    q: 'Brauche ich einen Termin?',
    a: 'Ja, bitte. So haben wir Zeit für dich und dein Fahrzeug. Stell einfach eine Anfrage oder ruf uns an.',
  },
];
