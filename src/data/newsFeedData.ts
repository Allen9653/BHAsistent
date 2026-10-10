import { NewsFeedUpdate } from '../types';

export const INITIAL_NEWS_FEED_UPDATES: NewsFeedUpdate[] = [
  {
    id: "feed-lovable-winner",
    title: "BH KONVER proglašen pobjednikom sedmice na globalnoj platformi Lovable",
    summary: "Autorski alat B&H Assistant tima iz Zenice prepoznat je među hiljadama aplikacija širom svijeta. Pokrenut je razvoj nativnih mobilnih aplikacija za iOS i Android.",
    fullContent: `Sa ponosom objavljujemo da je naš softverski alat BH KONVER odnio pobjedu u kategoriji "App of the Week" na globalnoj AI razvojnoj platformi Lovable.

Ovo prestižno priznanje dolazi kao potvrda višemjesečnog rada našeg razvojnog tima iz Zenice na kreiranju preciznog digitalnog kalkulatora poreza, valuta i građevinskih mjera, uz automatizovano generisanje pravnih izjava pod materijalnom i krivičnom odgovornošću u skladu sa zakonima FBiH i BiH.

U sklopu ovog partnerstva, inženjerski tim Lovable-a finansira i razvija nativne mobilne aplikacije za App Store (iOS) i Google Play Store (Android), što će građanima Bosne i Hercegovine i našoj brojnoj dijaspori omogućiti još brži i jednostavniji pristup pravnim i finansijskim kalkulatorima bez potrebe za kompliciranom birokratijom.

Zahvaljujemo svim korisnicima koji su testirali rane verzije alata i doprinijeli njegovom usavršavanju.`,
    category: "achievements",
    categoryLabel: "Postignuća Firme",
    badge: "POBJEDNIK SEDMICE 🏆",
    date: "10. Oktobar 2026.",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    author: "B&H Assistant Razvojni Tim",
    readTime: "2 min",
    linkUrl: "https://bh-konver.lovable.app/",
    linkText: "Isprobaj BH Konver",
    tags: ["BH Konver", "Lovable", "Priznanje", "Mobilne Aplikacije"],
    source: "Zvanično Saopštenje"
  },
  {
    id: "feed-it-ai-dev",
    title: "Evolucija AI agenata i no-code arhitekture: Trendovi za bh. IT sektor u 2026.",
    summary: "Analiza ubrzanog prelaska lokalnih IT kompanija na hibridna rješenja: od prototipiranja u oblaku do integracije lokalnih zakonskih regulativa.",
    fullContent: `Godina 2026. donosi temeljnu promjenu u načinu na koji bh. softverske firme i samostalni programeri grade digitalne servise. Vrijeme višemjesečnog razvoja osnovnih CRUD aplikacija zamijenjeno je agilnim ciklusima u kojima AI modeli asistiraju pri pisanju koda, automatskom testiranju i generisanju API integracija.

Za domaće tržište u Bosni i Hercegovini ključni izazov više nije brzina kodiranja, već prilagodba digitalnih servisa složenom administrativnom aparatu (različiti nivoi vlasti, specifične poreske stope i propisi o e-potpisu). 

B&H Assistant aktivno implementira najnovije programske paradigme kroz Vite, React 19 i Edge servise, dokazujući da domaći proizvodi mogu postići svjetsku brzinu odziva uz stopostotnu usklađenost sa zakonodavstvom BiH.`,
    category: "it-trends",
    categoryLabel: "IT Trendovi",
    badge: "ANALIZA 💡",
    date: "09. Oktobar 2026.",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    author: "Redakcija B&H Assistant",
    readTime: "3 min",
    linkUrl: "/alati",
    linkText: "Pogledaj Naša Rješenja",
    tags: ["AI Agenti", "React 19", "Softverski Razvoj", "IT Trendovi"],
    source: "Tehnološki Osvrt"
  },
  {
    id: "feed-gummi-distribution",
    title: "Završena distribucija prvog kontingenta od 1.000 primjeraka bojanke GUMMI",
    summary: "Besplatna edukativna bojanka o sigurnosti djece u saobraćaju podijeljena predškolskim i školskim ustanovama u ZDK u sklopu društvene odgovornosti.",
    fullContent: `U sklopu naše misije "Spajamo Kulture, Stvaramo Šanse", B&H Assistant d.o.o. Zenica uspješno je realizovao podjelu 1.000 primjeraka edukativne bojanke "GUMMI – Sigurnost u Saobraćaju za Najmlađe".

Projekat je namijenjen djeci predškolskog uzrasta i učenicima nižih razreda osnovnih škola u Zenici i okolnim općinama Zeničko-dobojskog kantona. Bojanka kroz ilustrovane likove i interaktivne zadatke uči djecu osnovnim pravilima kretanja pješaka, značenju saobraćajne signalizacije i važnosti nošenja sigurnosnih pojaseva.

Digitalna verzija bojanke ostaje trajno dostupna za besplatno preuzimanje na našoj platformi, a u pripremi je i drugo prošireno izdanje sa tematikom zaštite okoliša i reciklaže.`,
    category: "community",
    categoryLabel: "Događaji & Zajednica",
    badge: "DRUŠTVENA ODGOVORNOST ❤️",
    date: "07. Oktobar 2026.",
    timestamp: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
    author: "Tim za Društvenu Odgovornost",
    readTime: "2 min",
    linkUrl: "/projekti",
    linkText: "Preuzmi Digitalnu Bojanku",
    tags: ["GUMMI", "Sigurnost Djece", "Zenica", "Zajednica"],
    source: "Lokalna Inicijativa"
  },
  {
    id: "feed-scena-edition",
    title: "Magazin SCENA+ zabilježio 1.500 čitalaca: Spoj bh. arheologije, kripta i umjetnosti",
    summary: "Prvi urbani magazin u ZDK bilježi sjajan prijem kod čitalaca. Otvorene su prijave za autorske tekstove i fotoreportaže za nadolazeće jesenje izdanje.",
    fullContent: `Prvo izdanje urbanog magazina SCENA+, pokrenutog od strane B&H Assistant tima, ostvarilo je izvanredan uspjeh sa preko 1.500 pregleda digitalnog interaktivnog formata i distribucijom štampanih primjeraka kulturnim centrima u ZDK.

Izdanje donosi ekskluzivne priče o srednjovjekovnim bosanskim utvrdama, analizu kretanja kripto tržišta i poslovanja domaće BCX platforme, reportažu o procvatu craft pivarstva u Zenici i intervju sa akademskim slikarom Danilom Kesom.

Pozivamo mlade autore, fotografe, istoričare umjetnosti i studente da pošalju svoje prijedloge za rubrike u drugom broju magazina putem emaila info@bh-assistant.ba.`,
    category: "achievements",
    categoryLabel: "Postignuća Firme",
    badge: "NOVO IZDANJE 📖",
    date: "05. Oktobar 2026.",
    timestamp: Date.now() - 1000 * 60 * 60 * 120,
    author: "Uredništvo SCENA+ Magazina",
    readTime: "3 min",
    linkUrl: "/scena-magazin",
    linkText: "Prelistaj Magazin SCENA+",
    tags: ["SCENA+", "Kultura", "ZDK", "Urbani Magazin"],
    source: "Kulturna Redakcija"
  },
  {
    id: "feed-e-uprava-standardi",
    title: "e-Uprava u BiH: Nova rješenja za eliminaciju šaltera i birokratskih prepreka",
    summary: "Kako BH PapirFinder i digitalni katalozi općinskih obrazaca pomažu građanima da prepolove vrijeme potrebno za rješavanje upravnih postupaka.",
    fullContent: `Birokratske prepreke i nedostatak transparentnih uputstava decenijama su predstavljali jedan od najvećih problema za građane i privredu u Bosni i Hercegovini. Prema podacima analitičkih servisa, građani prosječno izgube i do 4 radna dana godišnje čekajući u redovima za standardne uvjerenja i formulare.

BH PapirFinder, naš centralni vodič za besplatne općinske obrasce, demonstrira kako privatna IT inicijativa može premostiti jaz između javne uprave i građana. Baza sada pokriva ključne obrasce za općine Olovo, Gračanica, Banja Luka, Jajce, Travnik i sve kantone.

Nastavljamo sa redovnim ažuriranjem baze podataka u saradnji sa pravnim stručnjacima kako bi svaki obrazac bio u skladu sa trenutno važećim tarifama administrativnih taksi.`,
    category: "it-trends",
    categoryLabel: "IT Trendovi",
    badge: "E-UPRAVA 🏛️",
    date: "03. Oktobar 2026.",
    timestamp: Date.now() - 1000 * 60 * 60 * 168,
    author: "Pravno-tehnički Desk",
    readTime: "3 min",
    linkUrl: "/alati",
    linkText: "Istraži BH PapirFinder",
    tags: ["BH PapirFinder", "e-Uprava", "Općinski Obrasci", "BiH"],
    source: "Istraživački Centar"
  },
  {
    id: "feed-danilo-keso-event",
    title: "Likovna izložba 'Linije i Sjene' Danila Kesa u Muzeju grada Zenice",
    summary: "U saradnji sa B&H Assistantom, u Zenici je predstavljena nova serija radova inspirisana industrijskim naslijeđem i post-apokaliptičnim motivima.",
    fullContent: `U prostoru Muzeja grada Zenice otvorena je izložba akademskog slikara Danila Kesa pod nazivom "Linije i Sjene". Izložbu prati multimedijalna prezentacija koju je tehnički pripremio tim B&H Assistant d.o.o.

Keso u svojim najnovijim radovima istražuje fuziju industrijskih elemenata zeničke čeličane sa organskim formama, stvarajući snažan vizuelni narativ o transformaciji radničkog grada u digitalnu eru.

Izložba ostaje otvorena za posjetioce do kraja tekućeg mjeseca, a ulaz za studente i učenike je slobodan. B&H Assistant nastavlja podržavati lokalne autore koji svojim radom obogaćuju kulturnu scenu Bosne i Hercegovine.`,
    category: "community",
    categoryLabel: "Događaji & Zajednica",
    badge: "IZLOŽBA 🎨",
    date: "01. Oktobar 2026.",
    timestamp: Date.now() - 1000 * 60 * 60 * 216,
    author: "Kulturni Desk Zenica",
    readTime: "2 min",
    linkUrl: "/scena-magazin",
    linkText: "Pročitaj Intervju u SCENI+",
    tags: ["Danilo Keso", "Izložba", "Zenica", "Umjetnost"],
    source: "Kulturni Vodič"
  },
  {
    id: "feed-cybersecurity-standards",
    title: "Sigurnost podataka i zaštita privatnosti na webu prema standardima 2026.",
    summary: "Implementacija strogih mjera zaštite ličnih podataka (GDPR i zakon BiH o zaštiti ličnih podataka) u svim alatima B&H Assistant platforme.",
    fullContent: `Kao registrovano privredno društvo u Zenici (JIB: 4219296620005, MBS: 43-01-0177-25), B&H Assistant posvećuje maksimalnu pažnju integritetu korisničkih podataka i etičkom oglašavanju.

Naša platforma ne skladišti osjetljive finansijske parametre unesene u BH Konver kalkulator, već se sve kalkulacije izvršavaju isključivo na strani klijentskog pretraživača (client-side execution). 

Također, strogo se pridržavamo smjernica Google AdSense programa i IAB standarda: ne koristimo obmanjujuće banere, agresivne skočne prozore (pop-up) niti neovlašteno dijeljenje korisničkih kolačića. Transparentnost je temelj dugoročnog povjerenja naših korisnika.`,
    category: "security",
    categoryLabel: "Sigurnost & Zakon",
    badge: "SIGURNOST 🔒",
    date: "28. Septembar 2026.",
    timestamp: Date.now() - 1000 * 60 * 60 * 280,
    author: "Sektor za Sajber Sigurnost",
    readTime: "3 min",
    linkUrl: "/politika-privatnosti",
    linkText: "Pročitaj Politiku Privatnosti",
    tags: ["Privatnost", "GDPR", "Sigurnost", "AdSense Standardi"],
    source: "Pravni & Sigurnosni Bilten"
  },
  {
    id: "feed-craft-beer-meetup",
    title: "Regionalni skup nezavisnih preduzetnika i craft pivara Centralne Bosne",
    summary: "U Zenici održan okrugli sto o digitalnom marketingu, brendiranju i plasmanu lokalnih zanatskih proizvoda na regionalno tržište.",
    fullContent: `U organizaciji privrednog foruma Zenice i uz medijsku podršku magazina SCENA+, održan je susret malih zanatskih preduzetnika i craft pivara iz ZDK i Srednjobosanskog kantona.

Fokus susreta bio je na prevazilaženju logističkih izazova, legalizaciji malih proizvodnih pogona te korištenju modernih web alata i e-trgovine za plasman vrhunskih domaćih proizvoda bez posrednika.

B&H Assistant je predstavio mogućnosti digitalne promocije kroz autorske reportaže u magazinu SCENA+ i razvoj prilagođenih web prezentacija za lokalne proizvođače.`,
    category: "community",
    categoryLabel: "Događaji & Zajednica",
    badge: "PREDUZETNIŠTVO 🍻",
    date: "25. Septembar 2026.",
    timestamp: Date.now() - 1000 * 60 * 60 * 350,
    author: "Privredni Desk SCENA+",
    readTime: "2 min",
    linkUrl: "/scena-magazin",
    linkText: "Čitaj Reportažu o Craft Sceni",
    tags: ["Craft Pivare", "Zanati", "Preduzetništvo", "ZDK"],
    source: "Privredni Forum"
  }
];

const STORAGE_KEY = 'bh_assistant_news_feed_v1';

export function getStoredNewsFeed(): NewsFeedUpdate[] {
  if (typeof window === 'undefined') return INITIAL_NEWS_FEED_UPDATES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NEWS_FEED_UPDATES));
      return INITIAL_NEWS_FEED_UPDATES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return INITIAL_NEWS_FEED_UPDATES;
    }
    return parsed;
  } catch {
    return INITIAL_NEWS_FEED_UPDATES;
  }
}

export function saveNewsFeed(updates: NewsFeedUpdate[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updates));
  } catch (e) {
    console.error('Failed to save news feed to localStorage:', e);
  }
}
