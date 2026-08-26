import React from 'react';
import { NewsArticle } from '../types';
import { IMAGES } from '../utils/images';

export function normalizeImageUrl(url?: string): string {
  if (!url) return IMAGES.scenaCover;
  let clean = url.trim();
  if (clean.startsWith('./images/')) {
    clean = clean.replace(/^\.\/images\//, '/images/');
  } else if (clean.startsWith('images/')) {
    clean = '/' + clean;
  }
  return clean;
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl?: string) {
  const target = e.currentTarget;
  if (!target.dataset.fallbackApplied) {
    target.dataset.fallbackApplied = 'true';
    target.src = fallbackUrl || IMAGES.logo;
  }
}

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "news-monday-com",
    title: "JESTE LI PROBALI MONDAY.COM?! Vodeća platforma za upravljanje projektima i timovima",
    slug: "jeste-li-probali-monday-com-work-os",
    category: "IT & Produktivnost",
    date: "26. August 2026. 🔥",
    author: "B&H Assistant Redakcija",
    excerpt: "Monday.com je jedna od vodećih svjetskih Work OS platformi za vizuelno upravljanje zadacima, planiranje projekata, automatizaciju procesa i besprijekornu timsku saradnju. Isprobajte besplatno putem našeg partnerskog linka!",
    content: `JESTE LI PROBALI MONDAY.COM?

Monday.com je jedna od najpopularnijih i najmoćnijih svjetskih Work OS platformi koja omogućava timovima i kompanijama svih veličina da kreiraju prilagođene radne tokove, efikasno prate projekte i automatizuju svakodnevne poslovne procese.

Bilo da vodite IT razvoj, marketinšku agenciju, operativni sektor, prodaju ili građevinske projekte, monday.com pruža fleksibilno, intuitivno i pregledno radno okruženje prilagođeno Vašim specifičnim potrebama.

Glavne prednosti i funkcionalnosti:
• 📊 Pregledne vizuelne Kanban table, Gantogrami i vremenske linije za jasan uvid u sve faze projekta
• ⚡ Moćne automatizacije: automatsko delegiranje zadataka, slanje notifikacija i promjena statusa
• 🔗 Više od 200+ gotovih integracija (Slack, Google Workspace, Zoom, Jira, Microsoft Teams, Gmail)
• 📈 Analitika i prilagodljivi kontrolni dashboardi u realnom vremenu za donošenje pametnih odluka
• 📱 Dostupnost na svim uređajima (Web, iOS, Android) za efikasan timski rad bilo kada i bilo gdje

👉 Isprobajte Monday.com besplatno i unaprijedite poslovanje svog tima putem našeg zvaničnog partnerskog linka:
https://try.monday.com/rzwizf4pspzc`,
    imageUrl: IMAGES.mondayLogo,
    videoUrl: "https://www.youtube.com/watch?v=_z1ssf9ycqA",
    externalUrl: "https://try.monday.com/rzwizf4pspzc",
    hasVideo: true,
    published: true,
    tags: ["monday.com", "Work OS", "Produktivnost", "Upravljanje Projektima", "Affiliate", "Timski Rad", "Automatizacija"]
  },
  {
    id: "news-bh-konver-glavna",
    title: "BH KONVER – Autorski softver za brze konverzije i pravne izjave u BiH",
    slug: "bh-konver-autorski-softver-pravne-izjave",
    category: "BH KONVER & IT",
    date: "13. August 2026.",
    author: "B&H Assistant Razvojni Tim",
    excerpt: "Predstavljamo BH KONVER — napredni domaći web alat za konverziju valuta, obračune taksi i automatsko generisanje službenih pravnih izjava spremnih za print i ovjeru.",
    content: "BH KONVER je vodeći softverski alat u portfoliju firme B&H Assistant d.o.o. Zenica.\n\nAlat omogućava građanima, preduzećima i pravnicima trenutno generisanje standardizovanih pravnih izjava (izjave o zajedničkom domaćinstvu, izjave o izdržavanju, saglasnosti), kao i precizne finansijske proračune prilagođene bh. propisima.\n\nIsprobajte BH KONVER direktno na našem portalu ili putem zvanične mobilne verzije!",
    imageUrl: IMAGES.bhKonverMockup,
    published: true,
    tags: ["BH Konver", "Softver", "Pravne Izjave", "Digitalni Alati", "B&H Assistant"]
  },
  {
    id: "news-papirfinder-glavna",
    title: "BH PapirFinder – Vaš pametni digitalni vodič kroz općinske obrasce i takse",
    slug: "bh-papirfinder-digitalni-vodic-opcinski-obrasci",
    category: "BH PapirFinder & e-Uprava",
    date: "12. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "Pronađite sve potrebne općinske obrasce, takse i instrukcije za Zenicu, Sarajevo, Banja Luku, Tuzlu, Mostar i druge gradove u BiH bez lutanja po šalterima.",
    content: "BH PapirFinder rješava dugogodišnji problem administracije u Bosni i Hercegovini. Kroz centralizovani pretraživač, korisnici mogu jednim klikom preuzeti službene općinske zahtjeve, saznati tačan iznos administrativnih taksi i uplatiti ih prema jasnim uputama.\n\nSve informacije se redovno verifikuju i usklađuju sa službenim općinskim glasilima.",
    imageUrl: IMAGES.bhPapirfinderMockup,
    published: true,
    tags: ["BH PapirFinder", "e-Uprava", "Općinski Obrasci", "BiH", "Digitalizacija"]
  },
  {
    id: "news-lovable-app-of-week",
    title: "BH KONVER izglasana za Aplikaciju Sedmice! Lovable gradi i finansira iOS & Android app",
    slug: "bh-konver-aplikacija-sedmice-lovable-podrska",
    category: "BH KONVER & Priznanja",
    date: "12. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "Novi fantastičan uspjeh za B&H Assistant d.o.o. Zenica! Naš autorski softverski alat BH KONVER izglasan je za Aplikaciju Sedmice, pri čemu tim Lovable u potpunosti preuzima i finansira izradu nativnih iOS i Android aplikacija.",
    content: "Zadovoljstvo nam je objaviti izuzetne vijesti za našu firmu B&H Assistant d.o.o. Zenica i sve korisnike naših digitalnih alata!\n\nBH KONVER je zvanično izglasan za Aplikaciju Sedmice! Kao rezultat ove pobjede i prepoznavanja kvaliteta našeg softvera, renomirana platforma i tim Lovable osiguraće kompletan razvoj i finansiranje zvaničnih mobilnih aplikacija za iOS (Apple App Store) i Android (Google Play Store) uređaje.\n\nOvo partnerstvo će omogućiti da BH KONVER postane još pristupačniji građanima u BiH i dijaspori, nudeći brz i siguran rad pri generisanju pravnih izjava i proračuna direktno na pametnim telefonima.\n\nZahvaljujemo se svim korisnicima na podršci i glasovima!",
    imageUrl: IMAGES.bravoWinner,
    published: true,
    tags: ["BH Konver", "Aplikacija Sedmice", "Lovable", "iOS", "Android", "B&H Assistant"]
  },
  {
    id: "news-bravo-winner",
    title: "BH KONVER – Pobjednik prvog Bravo takmičenja!",
    slug: "bh-konver-pobjednik-prvog-bravo-takmicenja",
    category: "BH KONVER & Priznanja",
    date: "12. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "BH KONVER, aplikacija koju razvija B&H Assistant d.o.o., proglašena je pobjednikom prvog Bravo takmičenja! Priznanje da naš rad na digitalnim alatima ima međunarodni odjek.",
    content: "BH KONVER, aplikacija koju razvija B&H Assistant d.o.o., proglašena je pobjednikom prvog Bravo takmičenja.\n\nOvo priznanje je dokaz da naš rad na digitalnim alatima, prilagođenim socio-ekonomskom i kulturnom kontekstu BiH, ima međunarodni odjek.\n\nBravo nam je omogućio da pokažemo snagu domaćih ideja i da ih pretvorimo u globalno relevantne aplikacije.\n\n👉 Saznajte više o BH KONVER i našim projektima na www.bh-assistant.ba",
    imageUrl: IMAGES.bhKonverBanner,
    published: true,
    tags: ["BH Konver", "Bravo Winner", "Priznanje", "B&H Assistant", "Nagrađena Aplikacija"]
  },
  {
    id: "news-papirfinder-launch",
    title: "BH PapirFinder – Više ne ganjate papire, oni dolaze Vama!",
    slug: "bh-papirfinder-vise-ne-ganjate-papire",
    category: "BH Digitalni Alati",
    date: "11. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "Predstavljamo pametnog administrativnog vodiča i centralni registar općinskih zahtjeva i taksi u BiH. Štedi sate čekanja na šalterima.",
    content: "Zaboravite gubljenje vremena po šalterima i nejasne administrativne procedure! BH PapirFinder je pametna platforma razvijena na Atoms platformi koja za Vas automatski pronalazi potrebne obrasce, takse i dokumentaciju za gradove i općine širom BiH (Olovo, Gračanica, Banja Luka, Travnik, Jajce i drugi).\n\nPosjetite https://bhpapirfinder.atoms.world i ubrzajte svoje administrativne poslove!",
    imageUrl: IMAGES.bhPapirfinderBanner,
    published: true,
    tags: ["BH PapirFinder", "e-Uprava", "Općinski Obrasci", "BiH", "Digitalizacija"]
  },
  {
    id: "news-zentaxi-launch",
    title: "ZENTAXI — Pametna taksi platforma za grad Zenicu i ZDK",
    slug: "zentaxi-pametna-taksi-platforma-zenica",
    category: "Projekti & Startupi",
    date: "10. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "Spajamo vožnju, stvaramo udobnost! Nova digitalna taksi platforma koja povezuje licencirane taksi vozače i građane Zenice uz unaprijed poznate cijene.",
    content: "B&H Assistant d.o.o. Zenica predstavlja projekat ZENTAXI — modernu dispečersku mrežu i mobilnu aplikaciju koja rješava probleme gradskog prijevoza. Platforma nudi transparentne cijene, GPS praćenje i fer model za lokalne prevoznike bez skupih posrednika.",
    imageUrl: IMAGES.zentaxiBanner,
    published: true,
    tags: ["ZENTAXI", "Zenica", "Taksi", "Urbani Prijevoz", "Mobilna Aplikacija"]
  },
  {
    id: "news-gummi-bojanka",
    title: "GUMMI Bojanka & Animirani Film – Besplatno za djecu BiH!",
    slug: "gummi-bojanka-animirani-film-edukacija",
    category: "Projekti & Djeca",
    date: "10. August 2026.",
    author: "Kreativni Odjel B&H Assistant",
    excerpt: "Originalni lik GUMMI i edukativna bojanka pomažu mališanima u savladavanju slova i sigurnosti u saobraćaju uz smijeh i igru.",
    content: "U sklopu edukativnog projekta 'GUMMI - Vaš Jaran', pripremili smo besplatnu printabilnu bojanku sa 8 originalnih ilustracija koje djeci približavaju slova latinice i ćirilice te osnovna pravila saobraćajne kulture. Preuzmite bojanku besplatno direktno na našem sajtu!",
    imageUrl: IMAGES.gummiBojanka,
    published: true,
    tags: ["GUMMI", "Bojanka", "Edukacija", "Djeca", "Crtani Film"]
  },
  {
    id: "news-hackme",
    title: "Jeste li čuli za HackMe?! Sajber sigurnost za sve generacije",
    slug: "jeste-li-culi-za-hackme-tryhackme",
    category: "Sajber Sigurnost & IT",
    date: "9. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "TryHackMe je platforma za obuku iz sajber sigurnosti bazirana na pretraživaču, sa edukativnim sadržajem koji pokriva sve nivoe znanja — od potpunih početnika do prekaljenih hakera.",
    content: "TryHackMe je platforma za obuku iz sajber sigurnosti bazirana na pretraživaču, sa edukativnim sadržajem koji pokriva sve nivoe znanja — od potpunih početnika do prekaljenih hakera.\n\nNaši suosnivači, Ben Spring i Ashu Savani, pokrenuli su TryHackMe nakon što su shvatili koliko je ova industrija nepristupačna. Korisnicima dajemo sopstvenu ličnu virtuelnu mašinu — koja se pokreće jednim klikom na dugme. Istražite na : https://tryhackme.com/",
    imageUrl: IMAGES.tryhackmeBanner,
    published: true,
    tags: ["TryHackMe", "Sajber Sigurnost", "IT Obuka", "Hakeri", "Edukacija"]
  },
  {
    id: "news-job-media-buyer",
    title: "Oglas za posao: Media Buyer (Europe – Remote | $2.5k - $3.5k / mjesečno)",
    slug: "oglas-za-posao-media-buyer-remote",
    category: "Posao & Karijera",
    date: "Prije 2 sata 🔥",
    author: "B&H Assistant Karijere",
    excerpt: "Planiraj, pokreni i skaliraj plaćene kampanje za generisanje leadova na Meta platformama, Google Ads, TikTok i nativnim mrežama (Taboola, Outbrain). Cloaking i Keitaro tracker ekspertiza ($2.5k - $3.5k/mj).",
    content: "OGLAS ZA POSAO: MEDIA BUYER\n\n📌 Osnovne informacije:\n• 🔥 Objavljeno: Prije 2 sata (Job not on LinkedIn)\n• 🇪🇺 Lokacija: Europe – Remote (Rad od kuće)\n• 💵 Plata: $2,500 – $3,500 / mjesečno ($2.5k - $3.5k / month)\n• ⏰ Radno vrijeme: Full Time (Puno radno vrijeme)\n• 🟡 Nivo iskustva: Mid-level / 🟠 Senior\n• 🎡 Industrija: Marketing & Lead Generation\n• 🔗 Link za prijavu: https://tolt.link/posaoodkuce\n\nOpis posla i ključne odgovornosti:\n1. Planiraj, pokreni i skaliraj plaćene kampanje za generisanje leadova na Meta platformama (Facebook/Instagram), Google Ads Search, TikTok, kao i na nativnim mrežama poput Taboola i Outbrain.\n2. Izgradi i upravljaj kompletnim sistemom za praćenje i cloaking – od oglasnog računa, preko trackera, landing stranice, CRM‑a, pa sve do povratnog signala sa platforme.\n\n👉 Prijavite se direktno putem linka: https://tolt.link/posaoodkuce",
    imageUrl: IMAGES.remoteRocket,
    externalUrl: "https://tolt.link/posaoodkuce",
    isJobPosting: true,
    jobDetails: {
      salary: "$2.5k - $3.5k / month",
      location: "Europe – Remote",
      type: "Full Time",
      level: "Mid-level / Senior",
      department: "Marketing",
      source: "Job not on LinkedIn",
      postedAgo: "2 hours ago"
    },
    published: true,
    tags: ["Media Buyer", "Remote Posao", "Marketing", "Meta Ads", "Google Ads", "Keitaro", "Lead Gen"]
  },
  {
    id: "news-scena-print",
    title: "Podijeljeno prvih 300 printanih primjeraka urbanog magazina SCENA+",
    slug: "scena-magazin-print-izdanje-podjela",
    category: "SCENA+ Magazin",
    date: "25. Juli 2026.",
    author: "Alen Jusufović, Glavni urednik",
    excerpt: "Prvo štampano izdanje SCENA+ magazina sa temama iz bh. kulture, umjetnosti i arheologije uspješno je podijeljeno čitaocima u Zeničko-dobojskom kantonu i šire.",
    content: "Prvo fizičko štampano izdanje e-urban magazina SCENA+ naišlo je na izuzetan prijem publike. Podijeljeno je svih 300 pripremljenih printanih primjeraka!\n\nMagazin donosi priče o arheološkoj baštini BiH, umjetnosti Danila Kese ('Mrak koji svijetli'), craft pivarama, BCX krypto ekosistemu, kao i stručnim analizama učešća žena u bankarskom sektoru BiH.\n\nE-izdanje magazina ostaje besplatno dostupno za čitanje na našoj zvaničnoj platformi bh-assistant.ba.",
    imageUrl: IMAGES.scenaCover,
    published: true,
    tags: ["SCENA+", "Kultura", "Print", "Zenica"]
  },
  {
    id: "news-dani-keso-art",
    title: 'Danilo Keso Art: "Mrak koji svijetli" i Vinyl kultura',
    slug: "danilo-keso-art-mrak-koji-svijetli",
    category: "SCENA+ Magazin",
    date: "16. August 2026.",
    author: "Alen Jusufović, Glavni urednik",
    excerpt: "Ekskluzivni intervju i vizuelni esej o radovima i vinyl kolekciji Danila Kese u prvom izdanju magazina SCENA+.",
    content: "U rubrici Kultura & Umjetnost magazina SCENA+, istražujemo stvaralački opus Danila Kese pod nazivom 'Mrak koji svijetli'. Uz fascinantnu kolekciju gramofonskih ploča i unikatne umjetničke radove, ovaj članak otkriva autentični underground puls Zenice.",
    imageUrl: IMAGES.daniKesoArt,
    externalUrl: "https://canva.link/9kf68sd8mgd2p0f",
    published: true,
    tags: ["Danilo Keso", "SCENA+", "Vinyl", "Umjetnost", "Zenica"]
  },
  {
    id: "news-craft-pivare",
    title: "Craft Pivare & Ugostiteljstvo: Uspon domaće craft scene u BiH",
    slug: "craft-pivare-ugostiteljstvo-uspon-domace-craft-scene-u-bih",
    category: "Lokalna Scena & Biznis",
    date: "15. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "Kako domaći mikro-proizvođači i inovativni ugostitelji kreiraju novu gastronomsku i turističku ponudu u regiji.",
    content: "Craft revolucija u Bosni i Hercegovini doživljava pravi procvat. Od autorskih IPA i Stout piva do modernih pubova koji nude jedinstveno iskustvo, lokalni preduzetnici dokazuju da se kvalitetom i strašću može parirati globalnim brendovima.",
    imageUrl: IMAGES.craftPivare,
    externalUrl: "https://canva.link/jby4js35s2iizx7",
    published: true,
    tags: ["Craft Pivare", "Ugostiteljstvo", "Lokalna Scena", "BiH"]
  },
  {
    id: "news-gaming-parivantanam",
    title: "Gamin Parivantanam & Emisija Propuh: Urbani Glas Nove Generacije",
    slug: "gamin-parivantanam-emisija-propuh-urbani-glas-nove-generacije",
    category: "Omladina & Mediji",
    date: "14. August 2026.",
    author: "B&H Assistant Mladi",
    excerpt: "Gaming kultura, streaming i nezavisni radijski eter koji okuplja mlade stvaraoce i gamere u ZDK.",
    content: "Gaming Parivantanam u saradnji sa kultnom emisijom 'Propuh' otvara prostor za mlade kreativce, e-sport entuzijaste i sve one koji kreiraju digitalni sadržaj van ustaljenih medijskih matrica. Cijeli članak i e-prezentacija dostupni su na SCENA+ platformi.",
    imageUrl: IMAGES.gamingParivantanam,
    externalUrl: "https://canva.link/vxekpnx0ow1xvt9",
    published: true,
    tags: ["Gamin Parivantanam", "Emisija Propuh", "Gaming", "Mladi"]
  },
  {
    id: "news-bcx-krypto",
    title: "BCX Krypto & Vlada & WWW: Kripto ekosistem u BiH",
    slug: "bcx-krypto-vlada-digitalne-inicijative",
    category: "Tehnologija & Kripto",
    date: "13. August 2026.",
    author: "IT Analitika B&H Assistant",
    excerpt: "Pregled regulatornih i tehnoloških koraka ka integraciji blockchain rješenja i digitalne imovine na tržištu Bosne i Hercegovine.",
    content: "Balkan Crypto Exchange (BCX) i regionalne digitalne inicijative postavljaju temelje za savremeno kripto poslovanje, usklađeno sa zakonodavnim okvirom i potrebama domaće privrede.",
    imageUrl: IMAGES.bcxKrypto,
    published: true,
    tags: ["BCX Krypto", "Blockchain", "Fintech", "BiH"]
  },
  {
    id: "news-ornaments-of-bosnia-video",
    title: "ORNAMENTI BOSNE: Objavljena video prezentacija — Jedini digitalni proizvod sa dostavom na USB sticku!",
    slug: "ornamenti-bosne-video-prezentacija-usb-dostava",
    category: "Dizajn & Kulturna Baština",
    date: "14. August 2026.",
    author: "Kreativni Odjel B&H Assistant",
    excerpt: "Objavljena je zvanična video prezentacija kolekcije 'ORNAMENTI BOSNE' (https://youtu.be/CyJx3h3nGyA). Ovo je jedini digitalni proizvod koji se dostavlja direktno na Vašu adresu na USB Memory Sticku uz sigurno plaćanje po preuzimanju (pouzećem).",
    content: "B&H Assistant d.o.o. Zenica s ponosom predstavlja zvaničnu video prezentaciju autorskog digitalnog projekta 'ORNAMENTI BOSNE'.\n\nOva jedinstvena kolekcija donosi digitalizovane i kodirane motive sa srednjovjekovnih bosanskih stećaka (SVG, PNG, HTML i CSS). Posebnost ovog proizvoda jeste što je to JEDINI digitalni proizvod koji se dostavlja direktno na Vašu kućnu ili poslovnu adresu na USB Memory Sticku, uz sigurno plaćanje tek po preuzimanju pošiljke (pouzećem).\n\nPogledajte zvanični video na YouTube-u:\n• Zvanična prezentacija (Bosanski): https://youtu.be/CyJx3h3nGyA\n• Engleski digitalni katalog 🇬🇧: https://youtu.be/VXc7aCa-Auc",
    imageUrl: IMAGES.ornamentiBosne,
    published: true,
    tags: ["ORNAMENTI BOSNE", "USB Dostava", "Plaćanje Pouzećem", "Stećci", "Kulturna Baština", "Video Prezentacija", "YouTube"]
  },
  {
    id: "news-our-products-suite",
    title: "Naši Proizvodi – B&H Assistant predstavlja digitalni ekosistem",
    slug: "nasi-proizvodi-bh-assistant-digitalni-ekosistem",
    category: "BH Digitalni Alati",
    date: "8. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "Kompletan suite modernih alata za privredu, građane i kulturu optimizovan za sve ekrane i uređaje.",
    content: "Predstavljamo jedinstvenu liniju B&H Assistant digitalnih alata: BH Konver za kalkulacije i pravne obrasce, BH PapirFinder za e-Upravu, Ornamenti Bosne za dizajn i baštinu, te SCENA+ magazin za promociju urbane kulture Zenice i BiH.",
    imageUrl: IMAGES.ourProducts,
    published: true,
    tags: ["Our Products", "Digitalni Ekosistem", "Mobilne Aplikacije", "Zenica"]
  }
];

const STORAGE_KEY = 'bh_assistant_news_articles';

export const getStoredNews = (): NewsArticle[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed: NewsArticle[] = JSON.parse(data);
      const filteredParsed = parsed.filter(a => 
        a.id !== 'news-4' && 
        a.id !== 'news-1' &&
        a.id !== 'news-3' &&
        !a.title.toLowerCase().includes('gummi učenje je zabava') &&
        // Filter out old or duplicate monday.com articles from localStorage so only one canonical exists
        !(a.id !== 'news-monday-com' && (a.title.toLowerCase().includes('monday.com') || a.title.toLowerCase().includes('monday')))
      );
      const parsedIds = new Set(filteredParsed.map(a => a.id));
      const missingInitial = INITIAL_NEWS.filter(a => !parsedIds.has(a.id));
      const combined = [...missingInitial, ...filteredParsed];

      // Always synchronize and ensure valid image paths
      const cleaned = combined.map(art => {
        const initialMatch = INITIAL_NEWS.find(i => i.id === art.id);
        if (initialMatch) {
          return {
            ...initialMatch,
            imageUrl: normalizeImageUrl(initialMatch.imageUrl)
          };
        }
        return {
          ...art,
          imageUrl: normalizeImageUrl(art.imageUrl)
        };
      });

      // Deduplicate by ID and slug to guarantee single articles
      const seenIds = new Set<string>();
      const deduped: NewsArticle[] = [];
      for (const art of cleaned) {
        if (!seenIds.has(art.id)) {
          seenIds.add(art.id);
          deduped.push(art);
        }
      }

      // Persist deduplicated list back to storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deduped));
      return deduped;
    }
  } catch (e) {
    console.error("Greška pri učitavanju novosti iz local storage:", e);
  }
  return INITIAL_NEWS.map(art => ({ ...art, imageUrl: normalizeImageUrl(art.imageUrl) }));
};

export const saveNewsArticles = (articles: NewsArticle[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error("Greška pri spremanju novosti:", e);
  }
};

export const exportNewsForJoomla = (articles: NewsArticle[]) => {
  const exportData = {
    cms: "Joomla 5 / 4 Compatible Content",
    domain: "https://bh-assistant.ba",
    exportedAt: new Date().toISOString(),
    itemsCount: articles.length,
    articles: articles.map(art => ({
      title: art.title,
      alias: art.slug,
      category: art.category,
      created: art.date,
      created_by_alias: art.author,
      introtext: art.excerpt,
      fulltext: art.content,
      image: art.imageUrl,
      state: art.published ? 1 : 0,
      tags: art.tags || []
    }))
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bh_assistant_joomla_articles_export_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
