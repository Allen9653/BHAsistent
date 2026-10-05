import { COMPANY_INFO } from '../src/data/companyData';
import { getRouteMeta, RouteMetaConfig, MULTILINGUAL_ROUTE_META, ROUTE_ALIASES } from '../src/data/seoData';

export const ROUTE_METADATA: Record<string, RouteMetaConfig> = Object.entries(MULTILINGUAL_ROUTE_META).reduce(
  (acc, [route, metaByLang]) => {
    acc[route] = metaByLang.bs;
    return acc;
  },
  {} as Record<string, RouteMetaConfig>
);

/**
 * Escapes characters for safe inclusion in HTML attributes
 */
function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Render complete semantic HTML markup for each route to satisfy search engines & crawlers
 */
export function generateRouteHtml(pathname: string): { meta: RouteMetaConfig; html: string } {
  const cleanPath = pathname.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  const resolvedPath = ROUTE_ALIASES[cleanPath] || cleanPath;
  const meta = getRouteMeta(resolvedPath, 'bs');

  let contentHtml = '';

  if (resolvedPath === '/politika-privatnosti') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-4xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Politika Privatnosti</span>
          </nav>
          
          <header class="space-y-3 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-2xl sm:text-4xl text-[#F5F0E8]">
              Politika Privatnosti & Zaštita Ličnih Podataka (GDPR)
            </h1>
            <p class="text-sm text-[#00C9A7] font-mono">
              Zvanični dokument društva ${COMPANY_INFO.fullLegalName} • Usklađeno sa Zakonom o zaštiti ličnih podataka BiH i GDPR
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
            <h2 class="font-syne font-bold text-lg text-[#F5F0E8]">2. Vrste podataka koje obrađujemo</h2>
            <p>
              Prikupljamo isključivo podatke neophodne za pružanje naših digitalnih usluga, zakonito poslovanje i odgovaranje na korisničke upite: kontakt podatke, tehničke posjete i neophodne kolačiće.
            </p>
            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">3. Vaša prava kao ispitanika</h2>
            <p>
              Korisnici imaju pravo na pristup podacima, ispravak, brisanje ("pravo na zaborav"), ograničenje obrade i prenosivost. Za ostvarivanje prava kontaktirajte nas na ${COMPANY_INFO.email}.
            </p>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/uslovi-koristenja') {
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
              Ovi Opći uslovi regulišu korištenje web stranice www.bh-assistant.ba i njenih servisa u vlasništvu ${COMPANY_INFO.fullLegalName}, JIB ${COMPANY_INFO.jib}, sa sjedištem u Zenici.
            </p>
          </section>

          <section class="space-y-4 text-xs text-[#F5F0E8]/85 leading-relaxed">
            <h2 class="font-syne font-bold text-lg text-[#F5F0E8]">1. Autorska prava i intelektualno vlasništvo</h2>
            <p>
              Sav sadržaj objavljen na ovoj platformi, uključujući autorske tekstove magazina SCENA+, dizajn, izvorni kod, softverske alate (BH Konver, BH PapirFinder), logotipe i grafička rješenja, zaštićen je Zakonom o autorskom i srodnim pravima BiH.
            </p>
            <h2 class="font-syne font-bold text-lg text-[#F5F0E8] pt-4">2. Nadležnost suda</h2>
            <p>
              Za sve sporove koji se ne mogu riješiti sporazumno, nadležan je stvarni sud u Zenici.
            </p>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/o-nama') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-5xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">O Nama</span>
          </nav>

          <header class="space-y-4 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              O Nama — Poslovni Profil & Misija
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed">
              ${meta.description}
            </p>
          </header>

          <section class="p-6 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/30 space-y-4">
            <h2 class="font-syne font-bold text-xl text-[#00C9A7]">IT Kompanija B&H Assistant d.o.o. Zenica</h2>
            <p class="text-xs sm:text-sm text-[#F5F0E8]/90 leading-relaxed">
              B&H Assistant d.o.o. je registrovano domaće IT društvo sa sjedištem u Zenici posvećeno razvoju savremenih digitalnih alata, automatizaciji poslovnih procesa, digitalnom izdavaštvu kroz magazin SCENA+ i kreiranju partnerskih rješenja za građane, privredu i dijasporu.
            </p>
            <div class="p-4 rounded-xl bg-[#0A1628] border border-[#1A3152] font-mono text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
              <p><strong>Društvo:</strong> ${COMPANY_INFO.fullLegalName}</p>
              <p><strong>Motto:</strong> ${COMPANY_INFO.motto}</p>
              <p><strong>Sjedište:</strong> ${COMPANY_INFO.address}</p>
              <p><strong>JIB:</strong> ${COMPANY_INFO.jib} • <strong>MBS:</strong> ${COMPANY_INFO.mbs}</p>
            </div>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/alati') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-5xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Digitalni Alati</span>
          </nav>

          <header class="space-y-4 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              BH Digitalni Alati & Softverska Rješenja
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed">
              ${meta.description}
            </p>
          </header>

          <section class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <article class="p-6 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/40 space-y-3">
              <h2 class="font-syne font-bold text-xl text-[#00C9A7]">BH Konverter (Konver)</h2>
              <p class="text-xs text-[#F5F0E8]/85 leading-relaxed">
                Nagrađeni univerzalni kalkulator za poreze, valute i građevinske proračune u BiH, uz generisanje ovjerenih pravnih izjava. Pobjednik sedmice platforme Lovable.
              </p>
              <a href="https://bh-konver.lovable.app/" target="_blank" rel="noopener noreferrer" class="text-xs text-[#00C9A7] font-semibold underline block">
                Pokreni BH Konverter ↗
              </a>
            </article>

            <article class="p-6 rounded-2xl bg-[#0F2038] border border-[#C9A84C]/40 space-y-3">
              <h2 class="font-syne font-bold text-xl text-[#C9A84C]">BH PapirFinder</h2>
              <p class="text-xs text-[#F5F0E8]/85 leading-relaxed">
                Centralni registar i pametni vodič za pronalaženje besplatnih obrazaca i zahtjeva lokalne samouprave u Bosni i Hercegovini.
              </p>
              <a href="https://bhpapirfinder.atoms.world/" target="_blank" rel="noopener noreferrer" class="text-xs text-[#C9A84C] font-semibold underline block">
                Pokreni BH PapirFinder ↗
              </a>
            </article>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/scena-magazin') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-5xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">SCENA+ Magazin</span>
          </nav>

          <header class="space-y-4 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              SCENA+ Magazin — Kultura, Umjetnost & ZDK
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed">
              ${meta.description}
            </p>
          </header>

          <section class="p-6 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-3">
            <h2 class="font-syne font-bold text-xl text-[#00C9A7]">Kulturna Baština i Inovativni Glas Zenice</h2>
            <p class="text-xs sm:text-sm text-[#F5F0E8]/85 leading-relaxed">
              SCENA+ donosi ekskluzivne intervjue, kulturne reportaže, priče o uspješnim privrednicima, predstavljanje historijskih spomenika i digitalno čitanje e-izdanja.
            </p>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/novosti') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-5xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Novosti</span>
          </nav>

          <header class="space-y-4 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              Novosti & Saopštenja za Javnost
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed">
              ${meta.description}
            </p>
          </header>

          <section class="p-6 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-3">
            <h2 class="font-syne font-bold text-xl text-[#00C9A7]">Aktivnosti i Tehnološka Partnerstva</h2>
            <p class="text-xs sm:text-sm text-[#F5F0E8]/85 leading-relaxed">
              Pratite nova saopštenja za javnost, medijska gostovanja, integracije radnih tokova i ažuriranja softverskih servisa.
            </p>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/projekti') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-5xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Projekti</span>
          </nav>

          <header class="space-y-4 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              Inovativni Projekti & Partnerstva
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed">
              ${meta.description}
            </p>
          </header>

          <section class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <article class="p-5 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-2">
              <h2 class="font-syne font-bold text-lg text-[#00C9A7]">ZENTAXI Platforma</h2>
              <p class="text-xs text-[#F5F0E8]/80 leading-relaxed">
                Pametna dispečerska mreža i moderna taxi aplikacija za građane i turiste.
              </p>
            </article>
            <article class="p-5 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-2">
              <h2 class="font-syne font-bold text-lg text-[#C9A84C]">GUMMI Reciklaža</h2>
              <p class="text-xs text-[#F5F0E8]/80 leading-relaxed">
                Ekološki projekat pametnog zbrinjavanja i reciklaže automobilskih guma.
              </p>
            </article>
            <article class="p-5 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-2">
              <h2 class="font-syne font-bold text-lg text-[#00C9A7]">Dječija Bojanka</h2>
              <p class="text-xs text-[#F5F0E8]/80 leading-relaxed">
                Edukativna interaktivna bojanka "Sretno djetinjstvo" za najmlađe.
              </p>
            </article>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/shop') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-5xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Shop & Edukacija</span>
          </nav>

          <header class="space-y-4 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              Shop & Edukativni Centar
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed">
              ${meta.description}
            </p>
          </header>

          <section class="p-6 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/30 space-y-3">
            <h2 class="font-syne font-bold text-xl text-[#00C9A7]">Besplatni Alison Certifikovani Kursevi</h2>
            <p class="text-xs sm:text-sm text-[#F5F0E8]/85 leading-relaxed">
              Pristupite međunarodno priznatim online obukama iz IT-ja, menadžmenta, marketinga i stranih jezika prilagođenim polaznicima u Bosni i Hercegovini.
            </p>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/zajednica') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-5xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Zajednica</span>
          </nav>

          <header class="space-y-4 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              Zajednica & Društvene Mreže
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed">
              ${meta.description}
            </p>
          </header>

          <section class="p-6 rounded-2xl bg-[#0F2038] border border-[#1A3152] space-y-3">
            <h2 class="font-syne font-bold text-xl text-[#00C9A7]">Povežite se s nama na Instagramu i Facebooku</h2>
            <p class="text-xs sm:text-sm text-[#F5F0E8]/85 leading-relaxed">
              Pratite naš zvanični Instagram profil <strong>@bh.asst</strong> za dnevne savjete, infografike i novosti iz svijeta tehnologije i preduzetništva.
            </p>
          </section>
        </div>
      </main>
    `;
  } else if (resolvedPath === '/kontakt') {
    contentHtml = `
      <main class="min-h-screen bg-[#0A1628] text-[#F5F0E8] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-5xl mx-auto space-y-8">
          <nav aria-label="Breadcrumb" class="text-xs font-mono text-[#00C9A7]">
            <a href="/" class="hover:underline">Početna</a> / <span class="text-[#F5F0E8]/70">Kontakt</span>
          </nav>

          <header class="space-y-4 border-b border-[#1A3152] pb-6">
            <h1 class="font-syne font-extrabold text-3xl sm:text-5xl text-[#F5F0E8] tracking-tight">
              Kontakt & Impressum
            </h1>
            <p class="text-base sm:text-lg text-[#F5F0E8]/80 leading-relaxed">
              ${meta.description}
            </p>
          </header>

          <section class="p-6 rounded-2xl bg-[#0F2038] border border-[#00C9A7]/40 space-y-4">
            <h2 class="font-syne font-bold text-xl text-[#00C9A7]">Službeni Podaci o Društvu</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div class="p-4 rounded-xl bg-[#0A1628] border border-[#1A3152] space-y-1">
                <p><strong>Društvo:</strong> ${COMPANY_INFO.fullLegalName}</p>
                <p><strong>Adresa:</strong> ${COMPANY_INFO.address}</p>
                <p><strong>Telefon:</strong> ${COMPANY_INFO.phone}</p>
                <p><strong>E-mail:</strong> ${COMPANY_INFO.email}</p>
              </div>
              <div class="p-4 rounded-xl bg-[#0A1628] border border-[#1A3152] space-y-1">
                <p><strong>JIB:</strong> ${COMPANY_INFO.jib}</p>
                <p><strong>MBS:</strong> ${COMPANY_INFO.mbs}</p>
                <p><strong>Registarski sud:</strong> Općinski sud u Zenici</p>
                <p><strong>Djelatnost:</strong> 62.01 - Računarsko programiranje</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    `;
  } else {
    // Homepage / default
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
 * Inject SSR HTML, unique title, unique meta descriptions, and clean social cards into index.html
 */
export function injectSsrIntoTemplate(template: string, pathname: string): string {
  const { meta, html } = generateRouteHtml(pathname);

  let result = template;

  const escapedTitle = meta.title;
  const escapedDesc = escapeHtmlAttr(meta.description);
  const escapedCanonical = escapeHtmlAttr(meta.canonical || 'https://bh-assistant.ba/');

  // 1. Replace or inject Document Title
  if (/<title>.*?<\/title>/i.test(result)) {
    result = result.replace(/<title>.*?<\/title>/i, `<title>${escapedTitle}</title>`);
  } else {
    result = result.replace('</head>', `  <title>${escapedTitle}</title>\n</head>`);
  }

  // 2. Replace or inject Meta Description
  if (/<meta\s+name="description"\s+content=".*?"\s*\/?>/i.test(result)) {
    result = result.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${escapedDesc}" />`
    );
  } else {
    result = result.replace('</head>', `  <meta name="description" content="${escapedDesc}" />\n</head>`);
  }

  // 3. Replace or inject Canonical Link
  if (/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i.test(result)) {
    result = result.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${escapedCanonical}" />`
    );
  } else {
    result = result.replace('</head>', `  <link rel="canonical" href="${escapedCanonical}" />\n</head>`);
  }

  // 4. Cleanly replace OpenGraph Tags (never leave duplicates)
  if (/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i.test(result)) {
    result = result.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapedTitle}" />`
    );
  } else {
    result = result.replace('</head>', `  <meta property="og:title" content="${escapedTitle}" />\n</head>`);
  }

  if (/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i.test(result)) {
    result = result.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapedDesc}" />`
    );
  } else {
    result = result.replace('</head>', `  <meta property="og:description" content="${escapedDesc}" />\n</head>`);
  }

  if (/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i.test(result)) {
    result = result.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${escapedCanonical}" />`
    );
  }

  // 5. Cleanly replace Twitter Tags
  if (/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i.test(result)) {
    result = result.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapedTitle}" />`
    );
  } else {
    result = result.replace('</head>', `  <meta name="twitter:title" content="${escapedTitle}" />\n</head>`);
  }

  if (/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i.test(result)) {
    result = result.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapedDesc}" />`
    );
  } else {
    result = result.replace('</head>', `  <meta name="twitter:description" content="${escapedDesc}" />\n</head>`);
  }

  if (/<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i.test(result)) {
    result = result.replace(
      /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:url" content="${escapedCanonical}" />`
    );
  }

  // 6. Inject Structured Data JSON-LD Schema for the page
  const jsonLd = `
  <script type="application/ld+json" id="bh-ssr-jsonld">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bh-assistant.ba/#organization",
        "name": "B&H Assistant d.o.o. Zenica",
        "url": "https://bh-assistant.ba",
        "logo": "https://i.imgur.com/cXebP1B.jpg",
        "email": "${COMPANY_INFO.email}",
        "telephone": "${COMPANY_INFO.phone}",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bulevar Ezhera Eze Arnautovića 8",
          "addressLocality": "Zenica",
          "postalCode": "72000",
          "addressCountry": "BA"
        }
      },
      {
        "@type": "WebPage",
        "@id": "${escapedCanonical}#webpage",
        "url": "${escapedCanonical}",
        "name": "${escapedTitle}",
        "description": "${escapedDesc}",
        "isPartOf": {
          "@id": "https://bh-assistant.ba/#website"
        },
        "inLanguage": "bs-BA"
      }
    ]
  }
  </script>
  `;
  result = result.replace('</head>', `${jsonLd}\n</head>`);

  // 7. Inject semantic HTML into root div
  result = result.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  return result;
}
