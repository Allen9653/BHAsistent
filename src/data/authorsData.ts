import { AuthorProfileData } from '../types';

export const AUTHORS_DATA: Record<string, AuthorProfileData> = {
  'alen-jusufovic': {
    id: 'alen-jusufovic',
    name: 'Alen Jusufović',
    role: 'Osnivač, Direktor & Glavni Softverski Inženjer',
    credentials: 'B.Sc. Računarstvo i Informatika • Glavni Urednik magazina SCENA+ • Inovator',
    bio: 'Tehnološki preduzetnik i softverski inženjer iz Zenice sa preko decenije iskustva u razvoju web i mobilnih platformi, digitalizaciji javne uprave (e-Uprava) i automatizaciji pravnih postupaka. Autor nagrađivanog digitalnog alata BH KONVER (izglasanog za Lovable App of the Week) i centralnog registra BH PapirFinder. Zagovornik transparentnosti, autorske odgovornosti i E-E-A-T standarda kvaliteta u digitalnom izdavaštvu u Bosni i Hercegovini.',
    experienceYears: '10+ godina',
    location: 'Zenica, Bosna i Hercegovina',
    avatarUrl: 'https://i.imgur.com/cXebP1B.jpg',
    verified: true,
    eeatBadge: 'E-E-A-T Verifikovani Inženjer & Urednik',
    specialties: [
      'Softverska Arhitektura & Web Aplikacije',
      'Pravna Tehnologija (LegalTech) & E-Uprava',
      'Izdavaštvo & Urbani Mediji (SCENA+)',
      'Digitalna Transformacija Lokalnih Zajednica',
      'Fintech & Sistemi Obračuna'
    ],
    contactEmail: 'alen.jusufovic@bh-assistant.ba',
    linkedinUrl: 'https://www.linkedin.com/in/alenjusufovic',
    websiteUrl: 'https://bh-assistant.ba',
    articlesCount: 14
  },
  'redakcija-bh-assistant': {
    id: 'redakcija-bh-assistant',
    name: 'Redakcija & Stručni Kolegij B&H Assistant',
    role: 'Urednički Odbor za Tehnologiju, Kulturu i Javnu Upravu',
    credentials: 'Kolektivni Urednički Tim • B&H Assistant d.o.o. Zenica (JIB: 4219296620005)',
    bio: 'Stručni kolegij i analitički tim kompanije B&H Assistant d.o.o. Zenica sastavljen od programera, pravnih konsultanata, dizajnera i novinara. Redakcija provodi rigorozne provjere činjenica, usklađenost sa zakonodavnim propisima u BiH i tehničku validaciju svakog objavljenog teksta, vodiča i analize.',
    experienceYears: 'Kontinuirani timski rad',
    location: 'Zenica, Bosna i Hercegovina',
    avatarUrl: 'https://i.imgur.com/cXebP1B.jpg',
    verified: true,
    eeatBadge: 'E-E-A-T Institucionalna Redakcija',
    specialties: [
      'Provjera Činjenica & Pravno Savjetovanje',
      'Lokalna Samouprava & Administrativni Obrasci',
      'Sajber Sigurnost & Edukacija Građana',
      'Kulturni Događaji & Kreativna Industrija ZDK'
    ],
    contactEmail: 'info@bh-assistant.ba',
    websiteUrl: 'https://bh-assistant.ba',
    articlesCount: 22
  },
  'kreativni-odjel': {
    id: 'kreativni-odjel',
    name: 'Kreativni & Edukativni Odjel B&H Assistant',
    role: 'Dizajneri, Ilustratori & Pedagoški Koordinatori',
    credentials: 'Autori serijala GUMMI i edukativnih publikacija za djecu i mlade',
    bio: 'Multidisciplinarni kreativni studio posvećen stvaranju visokokvalitetnih vizuelnih i edukativnih materijala za djecu, predškolske i školske ustanove. Tvorci animiranog junaka GUMMI i edukativnih bojanki distribuiranih u preko 1.000 besplatnih primjeraka širom ZDK.',
    experienceYears: '7+ godina u kreativnoj produkciji',
    location: 'Zenica, Bosna i Hercegovina',
    avatarUrl: 'https://i.imgur.com/l7CMGP8.jpg',
    verified: true,
    eeatBadge: 'E-E-A-T Verifikovani Autorski Studio',
    specialties: [
      'Edukativna Ilustracija & Animacija',
      'Razvoj Dječijih Kognitivnih Materijala',
      'Ekološka Svijest & Društvena Odgovornost',
      'Grafički Dizajn & Grafička Priprema'
    ],
    contactEmail: 'kreativni@bh-assistant.ba',
    websiteUrl: 'https://bh-assistant.ba/projekti',
    articlesCount: 6
  },
  'it-sigurnost-odjel': {
    id: 'it-sigurnost-odjel',
    name: 'Tim za IT Sigurnost & Sigurnosne Analize',
    role: 'Analitičari Kibernetičke Sigurnosti i Sistemičke Zaštite',
    credentials: 'Certifikovani Stručnjaci za Sigurnost Informacija & Mrežnu Arhitekturu',
    bio: 'Stručni tim zadužen za nadzor sajber prijetnji, zaštitu podataka korisnika digitalnih alata BH KONVER i BH PapirFinder, te edukaciju javnosti o prevenciji phishinga, ransomwarea i online prevara u Bosni i Hercegovini.',
    experienceYears: '8+ godina u mrežnoj i cloud zaštiti',
    location: 'Zenica / Sarajevo, BiH',
    avatarUrl: 'https://archive.org/download/remote_rocketship_logo/try_hackMe_logo.png',
    verified: true,
    eeatBadge: 'E-E-A-T Certifikovani Sigurnosni Analitičari',
    specialties: [
      'Sajber Sigurnost & Sigurnost Podataka',
      'Etičko Hakovanje & Penetracijsko Testiranje',
      'GDPR & Usklađenost sa Zakonom o Zaštiti Podataka BiH',
      'Cloud Infrastruktura & Enkripcija'
    ],
    contactEmail: 'security@bh-assistant.ba',
    websiteUrl: 'https://bh-assistant.ba',
    articlesCount: 5
  }
};

/**
 * Helper to resolve an author profile from a string (name or authorId)
 */
export function getAuthorProfile(authorIdentifier?: string): AuthorProfileData {
  if (!authorIdentifier) {
    return AUTHORS_DATA['redakcija-bh-assistant'];
  }

  const normalized = authorIdentifier.toLowerCase().trim();

  // Direct ID check
  if (AUTHORS_DATA[normalized]) {
    return AUTHORS_DATA[normalized];
  }

  // Check by name or partial match
  if (normalized.includes('alen') || normalized.includes('jusufović') || normalized.includes('jusufovic')) {
    return AUTHORS_DATA['alen-jusufovic'];
  }

  if (normalized.includes('kreativn') || normalized.includes('gummi') || normalized.includes('odjel')) {
    return AUTHORS_DATA['kreativni-odjel'];
  }

  if (normalized.includes('sigurnost') || normalized.includes('hackme') || normalized.includes('cyber') || normalized.includes('sajber')) {
    return AUTHORS_DATA['it-sigurnost-odjel'];
  }

  // Default fallback to company editorial board
  return AUTHORS_DATA['redakcija-bh-assistant'];
}
