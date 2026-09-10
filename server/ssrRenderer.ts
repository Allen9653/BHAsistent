import { COMPANY_INFO } from '../src/data/companyData';

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
}

export const ROUTE_METADATA: Record<string, RouteMeta> = {
  '/politika-privatnosti': {
    title: 'Politika Privatnosti i Zaštita Ličnih Podataka (GDPR) | B&H ASSISTANT d.o.o. Zenica',
    description: 'Zvanična Politika privatnosti i zaštita ličnih podataka društva B&H ASSISTANT d.o.o. Zenica. Usklađeno sa Zakonom o zaštiti ličnih podataka BiH i GDPR regulativom EU.',
    canonical: 'https://bh-assistant.ba/politika-privatnosti',
    keywords: 'politika privatnosti, gdpr bih, zaštita podataka, bh assistant zenica, prava korisnika',
  },
  '/uslovi-koristenja': {
    title: 'Opći Uslovi Korištenja Platforme | B&H ASSISTANT d.o.o. Zenica',
    description: 'Opći uslovi korištenja zvanične web platforme društva B&H ASSISTANT d.o.o. Zenica. Pravni okvir, autorska prava, intelektualno vlasništvo i nadležnost suda u Zenici.',
    canonical: 'https://bh-assistant.ba/uslovi-koristenja',
    keywords: 'uslovi korištenja, pravni uslovi, autorska prava, bh assistant, zenica pravila',
  },
  '/o-nama': {
    title: 'O Nama & Poslovni Profil | B&H ASSISTANT d.o.o. Zenica',
    description: 'Upoznajte B&H ASSISTANT d.o.o. Zenica — domaće IT društvo za razvoj softverskih alata, digitalno izdavaštvo i inovativne projekte u ZDK i BiH.',
    canonical: 'https://bh-assistant.ba/o-nama',
    keywords: 'o nama, bh assistant, it firma zenica, softver zdk, dženana beganović',
  },
  '/kontakt': {
    title: 'Kontakt & Lokacija | B&H ASSISTANT d.o.o. Zenica',
    description: 'Kontaktirajte B&H ASSISTANT d.o.o. Zenica. Službena adresa Ul. Bulevar Ezhera Eze Arnautovića 8, telefon +387 62 580 207, e-mail info@bh-assistant.ba, JIB 4219296620005.',
    canonical: 'https://bh-assistant.ba/kontakt',
    keywords: 'kontakt, adresa zenica, telefon, email info@bh-assistant.ba, jib 4219296620005',
  },
  '/alati': {
    title: 'BH Digitalni Alati & Kalkulatori | B&H ASSISTANT d.o.o. Zenica',
    description: 'Besplatni digitalni alati i kalkulatori za građane i privredu u BiH: BH Konverter (nagrađen od Lovable) i BH PapirFinder za općinske obrasce.',
    canonical: 'https://bh-assistant.ba/alati',
    keywords: 'bh konver, bh papirfinder, kalkulator bih, obrasci općina, digitalni alati',
  },
  '/scena-magazin': {
    title: 'SCENA+ Digitalni Magazin ZDK | B&H ASSISTANT d.o.o. Zenica',
    description: 'Digitalni magazin SCENA+ Zeničko-dobojskog kantona: kultura, umjetnost, privreda, intervjui, uspješne priče i inovacije.',
    canonical: 'https://bh-assistant.ba/scena-magazin',
    keywords: 'scena magazin zdk, magazin zenica, kultura zdk, privreda zdk',
  },
  '/novosti': {
    title: 'Novosti & Najave | B&H ASSISTANT d.o.o. Zenica',
    description: 'Najnovije vijesti, saopštenja za javnost, ažuriranja digitalnih alata i projekti B&H ASSISTANT d.o.o.',
    canonical: 'https://bh-assistant.ba/novosti',
    keywords: 'novosti, vijesti, saopštenja, it novosti bih',
  },
  '/projekti': {
    title: 'Inovativni Projekti & Partnerstva | B&H ASSISTANT d.o.o. Zenica',
    description: 'Projekti koji traže partnere: ZENTAXI, GUMMI, edukativna bojanka za djecu i digitalna rješenja.',
    canonical: 'https://bh-assistant.ba/projekti',
    keywords: 'projekti, zentaxi, gummi, partnerstva, inovacije',
  },
  '/shop': {
    title: 'Shop & Alison Besplatna Edukacija | B&H ASSISTANT d.o.o. Zenica',
    description: 'B&H Assistant online shop i Alison besplatni certifikovani online kursevi za profesionalno usavršavanje u BiH.',
    canonical: 'https://bh-assistant.ba/shop',
    keywords: 'shop, alison kursevi, edukacija, certifikati',
  },
  '/zajednica': {
    title: 'Zajednica & Društvene Mreže | B&H ASSISTANT d.o.o. Zenica',
    description: 'Povežite se sa B&H Assistant zajednicom na Instagramu i Facebooku. Spajamo kulture — stvaramo šanse.',
    canonical: 'https://bh-assistant.ba/zajednica',
    keywords: 'zajednica, društvene mreže, instagram bh.asst, facebook',
  },
  '/': {
    title: 'B&H ASSISTANT d.o.o. Zenica | Zvanična IT Platforma & Digitalna Rješenja',
    description: 'Zvanična web platforma društva B&H ASSISTANT d.o.o. Zenica. Domaći digitalni alati (BH Konver, BH PapirFinder), magazin SCENA+, edukacija i IT razvoj.',
    canonical: 'https://bh-assistant.ba/',
    keywords: 'bh assistant, it rješenja zenica, bh konver, bh papirfinder, scena magazin, softver bih',
  },
};

/**
 * Render complete semantic HTML markup for each route to satisfy crawlers (Googlebot, AdSense, etc.)
 */
export function generateRouteHtml(pathname: string): { meta: RouteMeta; html: string } {
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const meta = ROUTE_METADATA[normalizedPath] || ROUTE_METADATA['/'];

  let contentHtml = '';

  if (normalizedPath === '/politika-privatnosti') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-4xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Politika Privatnosti</span>
          </nav>
          
          <header class="space-y-3 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-2xl sm:text-4xl text-[#F5F0E8]">
              Politika Privatnosti i Zaštita Ličnih Podataka (GDPR)
            </h1>
            <p class="text-sm text-[#00C9A7] font-mono">
              Zvanični dokument društva ${COMPANY_INFO.fullLegalName} • Posljednje ažuriranje: Mart 2026.
            </p>
          </header>

          <section class="p-6 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/40 space-y-4">
            <h2 class="font-syne font-bold text-lg text-[#00C9A7]">1. Voditelj obrade ličnih podataka</h2>
            <p class="text-xs text-[#F5F0E8]/90 leading-relaxed">
              Voditelj obrade ličnih podataka u skladu sa Zakonom o zaštiti ličnih podataka Bosne i Hercegovine (Službeni glasnik BiH br. 49/06, 76/11 i 89/11) i Općom uredbom o zaštiti podataka Evropske unije (GDPR 2016/679) jeste:
            </p>
            <div class="p-4 rounded-xl bg-[#0A1628] border border-[#1A3152] font-mono text-xs space-y-1">
              <p><strong>Puni pravni naziv:</strong> ${COMPANY_INFO.fullLegalName}</p>
              <p><strong>Sjedište i adresa:</strong> ${COMPANY_INFO.address}</p>
              <p><strong>JIB (Jedinstveni identifikacioni broj):</strong> ${COMPANY_INFO.jib}</p>
              <p><strong>MBS (Matični broj subjekta):</strong> ${COMPANY_INFO.mbs}</p>
              <p><strong>Zvanični kontakt e-mail:</strong> ${COMPANY_INFO.email}</p>
              <p><strong>Službeni telefon:</strong> ${COMPANY_INFO.phone}</p>
            </div>
          </section>

          <section class="space-y-4 text-xs text-[#F5F0E8]/85 leading-relaxed">
            <h2 class="font-syne font-bold text-lg text-[#F5F0E8]">2. Vrste podataka koje prikupljamo</h2>
            <p>
              Prikupljamo isključivo podatke neophodne za pružanje naših digitalnih usluga, zakonito poslovanje i odgovaranje na korisničke upite:
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>Kontakt podaci:</strong> Ime, prezime, e-mail adresa i broj telefona koje korisnici dobrovoljno unose putem kontakt formi ili narudžbi.</li>
              <li><strong>Tehnički podaci i logovi:</strong> IP adresa, tip preglednika, operativni sistem i vrijeme pristupa, koji se prikupljaju isključivo radi tehničke sigurnosti i prevencije zloupotreba.</li>
              <li><strong>Kolačići (Cookies):</strong> Neophodni tehnički kolačići za rad stranice i opcionalni analitički kolačići uz prethodnu saglasnost korisnika.</li>
            </ul>

            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">3. Svrha i pravni osnov obrade</h2>
            <p>
              Vaše lične podatke obrađujemo na osnovu:
            </p>
            <ul class="list-disc pl-5 space-y-2">
              <li>Pristanka korisnika (član 6. stav 1. tačka a GDPR-a).</li>
              <li>Izvršenja ugovora ili poduzimanja radnji prije sklapanja ugovora (član 6. stav 1. tačka b GDPR-a).</li>
              <li>Ispunjavanja pravnih obaveza društva prema propisima Bosne i Hercegovine.</li>
              <li>Legitimnog interesa za očuvanje sigurnosti i unapređenje funkcionalnosti web platforme.</li>
            </ul>

            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">4. Kolačići i analitički alati</h2>
            <p>
              Web stranica koristi kolačiće radi optimizacije korisničkog iskustva. Korisnik u svakom trenutku može promijeniti ili povući pristanak za korištenje kolačića putem linka "Postavke Kolačića" u podnožju stranice.
            </p>

            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">5. Vaša prava kao ispitanika</h2>
            <p>
              Korisnici imaju pravo na pristup podacima, ispravak netačnih podataka, brisanje ("pravo na zaborav"), ograničenje obrade, prenosivost podataka i pravo na prigovor. Za ostvarivanje prava obratite se na ${COMPANY_INFO.email}.
            </p>

            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">6. Kontakt službenika za zaštitu podataka</h2>
            <p>
              Za sva pitanja u vezi privatnosti obratite se na: <strong>${COMPANY_INFO.email}</strong> ili poštom na adresu <strong>${COMPANY_INFO.address}</strong>.
            </p>
          </section>
        </div>
      </main>
    `;
  } else if (normalizedPath === '/uslovi-koristenja') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-4xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Uslovi Korištenja</span>
          </nav>
          
          <header class="space-y-3 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-2xl sm:text-4xl text-[#F5F0E8]">
              Opći Uslovi Korištenja Platforme
            </h1>
            <p class="text-sm text-[#C9A84C] font-mono">
              Pravni okvir i uslovi korištenja • ${COMPANY_INFO.fullLegalName} • Zenica, BiH
            </p>
          </header>

          <section class="p-6 rounded-2xl bg-[#0F2038] border border-[#C9A84C]/40 space-y-4">
            <h2 class="font-syne font-bold text-lg text-[#C9A84C]">Pravni Identitet Izdavača</h2>
            <p class="text-xs text-[#F5F0E8]/90 leading-relaxed">
              Ovi Opći uslovi regulišu korištenje web stranice www.bh-assistant.ba, njenih poddomena i povezanih digitalnih alata u vlasništvu:
            </p>
            <div class="p-4 rounded-xl bg-[#0A1628] border border-[#1A3152] font-mono text-xs space-y-1">
              <p><strong>Društvo:</strong> ${COMPANY_INFO.fullLegalName}</p>
              <p><strong>JIB:</strong> ${COMPANY_INFO.jib} • <strong>MBS:</strong> ${COMPANY_INFO.mbs}</p>
              <p><strong>Adresa:</strong> ${COMPANY_INFO.address}</p>
              <p><strong>Registarski sud:</strong> Općinski sud u Zenici</p>
              <p><strong>Kontakt:</strong> ${COMPANY_INFO.email}</p>
            </div>
          </section>

          <section class="space-y-4 text-xs text-[#F5F0E8]/85 leading-relaxed">
            <h2 class="font-syne font-bold text-lg text-[#F5F0E8]">1. Autorska prava i intelektualno vlasništvo</h2>
            <p>
              Sav sadržaj objavljen na ovoj platformi, uključujući autorske tekstove magazina SCENA+, dizajn, izvorni kod, softverske alate (BH Konver, BH PapirFinder), baze podataka, logotipe i grafička rješenja, zaštićen je Zakonom o autorskom i srodnim pravima Bosne i Hercegovine. Svako neovlašteno kopiranje, distribucija ili modifikacija bez izričite pismene saglasnosti je zabranjena.
            </p>

            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">2. Korištenje digitalnih alata i e-Usluga</h2>
            <p>
              Digitalni alati namijenjeni su informisanju građana, privrednih subjekata i javnosti. Društvo ulaže maksimalne napore kako bi osiguralo tačnost podataka, proračuna i važećih općinskih propisa.
            </p>

            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">3. Ograničenje odgovornosti</h2>
            <p>
              Sadržaj na platformi pruža se "u viđenom stanju" (as-is). Društvo B&H ASSISTANT d.o.o. ne snosi odgovornost za eventualne indirektne štete koje mogu nastati korištenjem ili nemogućnošću korištenja informacija sa web stranice.
            </p>

            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">4. Nadležnost suda i rješavanje sporova</h2>
            <p>
              Na sve odnose i sporove koji proisteknu iz korištenja ove platforme primjenjuju se važeći zakoni Bosne i Hercegovine i Federacije Bosne i Hercegovine. U slučaju spora koji se ne može riješiti mirnim putem, nadležan je stvarni sud u Zenici.
            </p>

            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">5. Pitanja i pravni upiti</h2>
            <p>
              Za sve pravne upite, autorska prava ili saradnje kontaktirajte nas putem e-maila: <strong>${COMPANY_INFO.email}</strong>.
            </p>
          </section>
        </div>
      </main>
    `;
  } else {
    // Generic high-quality SSR fallback for index and subpages
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-7xl mx-auto space-y-12">
          <header class="text-center space-y-4 max-w-3xl mx-auto">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              ${meta.title.split('|')[0].trim()}
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed font-sans">
              ${meta.description}
            </p>
            <div class="flex items-center justify-center gap-3 pt-2">
              <a href="/alati" class="px-5 py-2.5 rounded-xl bg-[#00C9A7] text-[#0A1628] font-syne font-bold text-xs shadow-lg">
                Istraži Digitalne Alate
              </a>
              <a href="/scena-magazin" class="px-5 py-2.5 rounded-xl bg-[#0F2038] border border-[#1A3152] text-[#F5F0E8] font-syne font-bold text-xs hover:border-[#C9A84C]">
                Magazin SCENA+ ZDK
              </a>
            </div>
          </header>

          <section class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <article class="p-6 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-3">
              <h2 class="font-syne font-bold text-xl text-[#00C9A7]">BH Konverter (Konver)</h2>
              <p class="text-xs text-[#F5F0E8]/80 leading-relaxed">
                Nagrađeni univerzalni kalkulator za poreze, valute i građevinske proračune u BiH, uz generisanje ovjerenih pravnih izjava. Pobjednik sedmice platforme Lovable.
              </p>
              <a href="/alati" class="text-xs text-[#00C9A7] font-semibold inline-block">Detaljnije o alatu →</a>
            </article>

            <article class="p-6 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-3">
              <h2 class="font-syne font-bold text-xl text-[#C9A84C]">BH PapirFinder</h2>
              <p class="text-xs text-[#F5F0E8]/80 leading-relaxed">
                Centralni registar i pametni vodič za pronalaženje besplatnih obrazaca i zahtjeva lokalne samouprave u Bosni i Hercegovini.
              </p>
              <a href="/alati" class="text-xs text-[#C9A84C] font-semibold inline-block">Pregledaj obrasce →</a>
            </article>
          </section>

          <footer class="p-6 rounded-2xl bg-[#0F2038]/60 border border-[#1A3152] text-xs text-[#F5F0E8]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong>${COMPANY_INFO.fullLegalName}</strong> • JIB: ${COMPANY_INFO.jib} • MBS: ${COMPANY_INFO.mbs}
            </div>
            <div class="flex items-center gap-4 text-[#00C9A7]">
              <a href="/politika-privatnosti" class="hover:underline">Politika Privatnosti</a>
              <a href="/uslovi-koristenja" class="hover:underline">Uslovi Korištenja</a>
              <a href="/kontakt" class="hover:underline">Kontakt</a>
            </div>
          </footer>
        </div>
      </main>
    `;
  }

  return { meta, html: contentHtml };
}

/**
 * Inject SSR HTML, title, meta descriptions, and JSON-LD schema into index.html
 */
export function injectSsrIntoTemplate(template: string, pathname: string): string {
  const { meta, html } = generateRouteHtml(pathname);

  let result = template;

  // Replace title
  result = result.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace or inject meta description
  if (result.includes('<meta name="description"')) {
    result = result.replace(
      /<meta name="description" content=".*?"\s*\/?>/i,
      `<meta name="description" content="${meta.description}" />`
    );
  } else {
    result = result.replace(
      '</head>',
      `  <meta name="description" content="${meta.description}" />\n</head>`
    );
  }

  // Inject Canonical link
  if (result.includes('<link rel="canonical"')) {
    result = result.replace(
      /<link rel="canonical" href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${meta.canonical}" />`
    );
  } else {
    result = result.replace(
      '</head>',
      `  <link rel="canonical" href="${meta.canonical}" />\n</head>`
    );
  }

  // Inject OpenGraph tags
  const ogTags = `
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:url" content="${meta.canonical}" />
  <meta property="og:type" content="website" />
  <meta name="author" content="${COMPANY_INFO.fullLegalName}" />
`;
  result = result.replace('</head>', `${ogTags}\n</head>`);

  // Inject into root div
  result = result.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  return result;
}
