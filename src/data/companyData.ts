import { DigitalTool, DevelopmentProject, MagazineEdition, AffiliateCourse, CompanyDetails, SocialPost, CompanyService } from '../types';
import { IMAGES } from '../utils/images';

export const COMPANY_INFO: CompanyDetails = {
  name: "B&H Assistant d.o.o.",
  fullLegalName: "B&H ASSISTANT d.o.o. Zenica",
  city: "Zenica",
  postalCode: "72000",
  jib: "4219296620005",
  mbs: "43-01-0177-25",
  motto: "SPAJAMO KULTURE - STVARAMO ŠANSE",
  email: "info@bh-assistant.ba",
  phone: "+387 62 580 207",
  address: "Ul. Bulevar Ezhera Eze Arnautovića 8, 72000 Zenica, Bosna i Hercegovina",
  facebookUrl: "https://www.facebook.com/SpajamoKultureStvaramoSanse",
  instagramHandle: "bh.asst",
  instagramUrl: "https://www.instagram.com/bh.asst"
};

export const DIGITAL_TOOLS: DigitalTool[] = [
  {
    id: "bh-konver",
    name: "BH Konverter (Konver)",
    tagline: "Univerzalni BH digitalni kalkulator i pravni generator",
    description: "Autorsko softversko rješenje za brze i precizne proračune poreza, valuta, građevinskih i mjernih jedinica, te automatizovano generisanje pravno važećih izjava pod punom krivičnom i materijalnom odgovornošću. U toku je izrada nativnih iOS i Android mobilnih aplikacija uz podršku platforme Lovable.",
    url: "https://www.bh-konver.com/",
    badge: "POBJEDNIK SEDMICE & NATIVNI APP 🏆",
    category: "Finansije & e-Pravni Alati",
    iconName: "Calculator",
    image: IMAGES.bhKonverMockup,
    bannerImage: IMAGES.bhKonverBanner,
    mockupImage: IMAGES.bhKonverMockup,
    deliveryBadge: "LOVABLE APP OF THE WEEK POBJEDNIK",
    deliveryNotice: "Nagrađeni softverski alat — tim Lovable gradi i finansira nativne iOS (App Store) i Android (Play Store) mobilne aplikacije za građane i dijasporu.",
    features: [
      "Generisanje ovjerenih pravnih izjava pod krivičnom odgovornošću 📜",
      "Nativne iOS & Android mobilne aplikacije (Lovable partnerstvo) 📱",
      "Kalkulatori valuta, poreza i mjernih jedinica usklađeni sa zakonima BiH 🇧🇦",
      "Brz izvoz dokumenata u PDF format spreman za printanje i potpis",
      "Zvanična javna web adresa: www.bh-konver.com"
    ]
  },
  {
    id: "bh-papirfinder",
    name: "BH PapirFinder",
    tagline: "Centralni registar i vodič za besplatne općinske obrasce",
    description: "Vaš centralni digitalni registar i pametni vodič za pronalaženje besplatnih obrazaca, zahtjeva i dokumenata lokalne samouprave u Bosni i Hercegovini. Dostupan online na adresi papir-finder.vercel.app (buduća oficijelna adresa: www.papir-finder.com). Pojednostavljuje i ubrzava administrativne procese za općine Olovo, Gračanica, Banja Luka, Jajce, Travnik i sve kantone u BiH.",
    url: "https://papir-finder.vercel.app/",
    badge: "BESPLATNI OBRASCI & e-UPRAVA 🏛️",
    category: "Administracija & Javne Usluge",
    iconName: "FileText",
    image: IMAGES.bhPapirfinderMockup,
    bannerImage: IMAGES.bhPapirfinderBanner,
    mockupImage: IMAGES.bhPapirfinderMockup,
    deliveryBadge: "AKTIVNO ONLINE: PAPIR-FINDER.VERCEL.APP",
    deliveryNotice: "Direktan pristup i preuzimanje službenih općinskih zahtjeva, taksi i obrazaca — ušteda vremena građanima, privredi i dijaspori na adresi papir-finder.vercel.app.",
    features: [
      "Baza besplatnih službenih općinskih obrazaca i upravnih zahtjeva 📄",
      "Pametna pretraga po gradovima (Olovo, Gračanica, BL, Travnik, Jajce...)",
      "Aktivna online adresa: papir-finder.vercel.app 🌐",
      "Pojednostavljeni e-Uprava koraci za fizička i pravna lica",
      "Eliminacija čekanja na šalterima i administrativnih nejasnoća"
    ]
  },
  {
    id: "ornamenti-bosne",
    name: "Ornamenti Bosne: Digitalna Kolekcija",
    tagline: "Jedini digitalni proizvod sa dostavom na USB Memory Sticku • Plaćanje po preuzimanju",
    description: "Prva digitalna kolekcija autentičnih i stiliziranih motiva sa bh. stećaka pripremljena za dizajn, edukaciju i kulturnu reinterpretaciju. Sadrži kodirane vektorske i veb strukture (SVG, PNG, HTML i CSS). JEDINI digitalni proizvod koji se dostavlja na Vašu fizičku adresu na USB Memory Sticku uz sigurno plaćanje po preuzimanju (pouzećem).",
    url: "https://canva.link/8dwxeack5cwn18l",
    videoUrl: "https://youtu.be/CyJx3h3nGyA",
    videoEmbedUrl: "https://www.youtube.com/embed/CyJx3h3nGyA?rel=0&modestbranding=1",
    englishVideoUrl: "https://youtu.be/VXc7aCa-Auc",
    englishVideoEmbedUrl: "https://www.youtube.com/embed/VXc7aCa-Auc?rel=0&modestbranding=1",
    deliveryBadge: "DOSTAVA NA USB MEMORY STICKU",
    deliveryNotice: "Jedini digitalni proizvod koji se dostavlja na Vašu kućnu ili poslovnu adresu na USB Memory Sticku, uz sigurno plaćanje po preuzimanju pošiljke (pouzećem).",
    badge: "KULTURNA BAŠTINA & USB DOSTAVA",
    category: "Dizajn & Kulturna Baština",
    iconName: "Compass",
    image: IMAGES.ornamentiBosne,
    bannerImage: IMAGES.ornamentiBosne,
    mockupImage: IMAGES.okrugliCvijet,
    features: [
      "Dostava na adresu na USB Memory Sticku 📦",
      "Plaćanje sigurno po preuzimanju pošiljke (pouzećem)",
      "Vektorski motivi sa stećaka (SVG, PNG format)",
      "HTML i CSS stilizirani kodovi za veb programere",
      "Zvanična video prezentacija & Engleski e-katalog 🇬🇧"
    ]
  }
];

export const SCENA_MAGAZINE: MagazineEdition = {
  title: "SCENA+",
  subtitle: "Prvi Urbani Magazin u ZDK",
  edition: "Prvo Izdanje",
  date: "Septembar / Rujan 2026",
  url: "https://canva.link/vxekpnx0ow1xvt9",
  topics: [
    {
      category: "Kultura & Umjetnost",
      title: "Danilo Keso Art: \"Mrak koji svijetli\" i Vinyl kultura",
      desc: "Mrak koji svijetli — Ekskluzivni uvid u radove i vinyl kolekcionarstvo Danila Kese.",
      image: IMAGES.daniKesoArt
    },
    {
      category: "Tehnologija & Kripto",
      title: "BCX Krypto & Vlada & WWW",
      desc: "Kripto ekosistem i digitalne inicijative u Bosni i Hercegovini.",
      image: IMAGES.bcxKrypto
    },
    {
      category: "Lokalna Scena & Biznis",
      title: "Craft Pivare & Ugostiteljstvo: Uspon domaće craft scene u BiH",
      desc: "Razvoj domaće craft industrije i inovativnih ugostiteljskih koncepata.",
      image: IMAGES.craftPivare
    },
    {
      category: "Priroda & Arheologija",
      title: "Endemska Fauna & BH Arheologija",
      desc: "Fascinantna povijest i prirodna bogatstva našeg regiona.",
      image: IMAGES.fauna
    },
    {
      category: "Biznis & Bankarstvo",
      title: "Žene u BiH Bank Sektoru & ZEPS",
      desc: "Inspirišuće priče liderki i privredna dešavanja u ZDK.",
      image: IMAGES.digitalniSpavac
    },
    {
      category: "Omladina & Mediji",
      title: "Gamin Parivantanam & Emisija Propuh: Urbani Glas Nove Generacije",
      desc: "Urbani glas mlade generacije izvan ustaljenih medijskih matrica.",
      image: IMAGES.gamingParivantanam
    }
  ]
};

export const DEVELOPMENT_PROJECTS: DevelopmentProject[] = [
  {
    id: "zentaxi",
    title: "ZENTAXI",
    subtitle: "Spajamo vožnju, stvaramo udobnost",
    description: "Inovativna digitalna platforma za lokalni gradski i međugradski prijevoz kreirana od strane B&H Assistant d.o.o. Zenica. Povezuje putnike i licencirane vozače uz maksimalnu transparentnost, brzu narudžbu, automatski proračun optimalnih ruta, digitalnu fiskalizaciju i vrhunsku udobnost vožnje.",
    detailedSummary: "ZENTAXI je pametna dispečerska mreža i mobilna aplikacija razvijena da transformiše urbani taksi prevoz u Zenici i gradovima BiH. Projekat rješava ključne izazove lokalnog transporta: eliminiše čekanje na slobodna vozila, pruža unaprijed poznatu cijenu prije početka vožnje, omogućava GPS praćenje u realnom vremenu te nudi transparentan partnerski model za samostalne taksiste i registrovana taksi udruženja bez visokih posredničkih provizija.",
    url: "https://canva.link/xyqzerrxvkxbfy2",
    status: "U fazi razvoja & Širenja mreže",
    image: IMAGES.zentaxiBanner,
    bannerImage: IMAGES.zentaxiBanner,
    secondaryImage: IMAGES.zentaxiLogo,
    videoUrl: "https://youtu.be/oJNF1YU1XVQ",
    videoEmbedUrl: "https://www.youtube.com/embed/oJNF1YU1XVQ?rel=0&modestbranding=1",
    targetAudience: "Investitori, Taksisti, Gradovi & Korisnici",
    highlights: [
      "Pametna lokacija i procjena vožnje u realnom vremenu",
      "Sigurna digitalna plaćanja, fiskalizacija i ocjenjivanje",
      "Lokalizovano i pristupačno rješenje za BH tržište",
      "Partnerski model za licencirane taksi prevoznike"
    ],
    features: [
      {
        title: "Dispečerski Algoritam",
        desc: "Automatsko uparivanje putnika sa najbližim slobodnim taksi vozilom uz minimalno vrijeme odziva."
      },
      {
        title: "Transparentne Cijene",
        desc: "Jasan proračun cijene vožnje unaprijed prema zvaničnom gradskom cjenovniku, bez skrivenih troškova."
      },
      {
        title: "Sigurnost & Nadzor",
        desc: "Verifikovani vozači, digitalni računi, ocjene korisnika i 24/7 SOS podrška tokom vožnje."
      },
      {
        title: "Lokalna Integracija",
        desc: "Potpuno prilagođeno zakonodavstvu ZDK i FBiH uz podršku za lokalne platne kartice i gotovinu."
      }
    ]
  },
  {
    id: "gummi",
    title: "GUMMI - Vaš Jaran",
    subtitle: "Animirani edukativni film i interaktivna platforma za djecu",
    description: "Originalni bh. edukativni projekat za najmlađe. Kroz lik voljenog junaka Gummija i njegove avanture, djeca na zabavan i metodički prilagođen način uče štampana i pisana slova uz igru, smijeh i druženje.",
    url: "https://canva.link/tna306bm8p462xm",
    status: "Razvoj & Produkcija",
    image: IMAGES.gummiVasJaran,
    bannerImage: IMAGES.gummiVasJaran,
    secondaryImage: IMAGES.gummiBojanka,
    videoUrl: "https://youtu.be/SxWVktly_vA",
    videoEmbedUrl: "https://www.youtube.com/embed/SxWVktly_vA?rel=0&modestbranding=1",
    hasFreeDownload: true,
    downloadUrl: "https://archive.org/details/gummi-bojanka",
    downloadTitle: "Edukativna Bojanka GUMMI (Archive.org PDF)",
    targetAudience: "Roditelji, Odgajatelji, Osnovne škole, Sponzori",
    highlights: [
      "Sadržaj prilagođen kurikulumu i predškolskom uzrastu",
      "Edukacija kroz animaciju i vizuelne vježbe",
      "Besplatna printabilna bojanka za svu djecu na Archive.org"
    ]
  },
  {
    id: "scena-magazine",
    title: "MAGAZIN SCENA+ (I. IZDANJE)",
    subtitle: "Spajamo Kulture • Stvaramo Šanse • Urbani Medijski Glas",
    description: "Prvo štampano i interaktivno digitalno izdanje e-magazina SCENA+. Projekat okuplja mlade umjetnike, craft proizvođače, IT inovatore i istraživače bh. kulturne baštine u ZDK i šire.",
    detailedSummary: "Magazin SCENA+ je strateški izdavački projekat B&H Assistant d.o.o. Zenica kreiran sa ciljem afirmacije lokalnih kreativaca, mladih talenata i poduzetničkih poduhvata. Prvo izdanje podijeljeno je u 300 fizičkih primjeraka, dok je digitalna verzija dostupna širom svijeta putem interaktivnog Canva čitača i video prezentacije.",
    url: "https://canva.link/vxekpnx0ow1xvt9",
    status: "Objavljeno & Distribucija",
    image: IMAGES.scenaCover,
    bannerImage: IMAGES.scenaCover,
    secondaryImage: IMAGES.daniKesoArt,
    videoUrl: "https://canva.link/vxekpnx0ow1xvt9",
    videoEmbedUrl: "https://canva.link/vxekpnx0ow1xvt9",
    targetAudience: "Čitaoci, Kreativci, Oglašivači, Sponzori & Partneri",
    highlights: [
      "Podijeljeno 300 besplatnih štampanih primjeraka",
      "Ekskluzivne priče: Danilo Keso Art, BCX Krypto, Craft Pivare, Emisija Propuh",
      "Interaktivni digitalni Canva video i e-magazin čitač"
    ],
    features: [
      {
        title: "Urbana Kultura & Umjetnost",
        desc: "Promocija alternativne scene, vinyl kolekcionarstva, mladih muzičara i vizuelnih stvaralaca."
      },
      {
        title: "Tehnologija & Kripto Ekonomija",
        desc: "Stručni osvrti na fintech inovacije, digitalnu upravu i regulatorne okvire u BiH."
      },
      {
        title: "Lokalno Poduzetništvo",
        desc: "Afirmacija domaćih mikro-proizvođača craft piva, inovativnih ugostitelja i sajamskih manifestacija poput ZEPS-a."
      },
      {
        title: "Multimedijalna Distribucija",
        desc: "Sinergija fizičkog printa, digitalnog e-izdanja i video prezentacijskog kanala."
      }
    ]
  }
];

export const AFFILIATE_COURSES: AffiliateCourse[] = [
  {
    id: "bh-konver-tool",
    title: "BH KONVER – Kalkulator & Pravne Izjave",
    provider: "B&H Assistant d.o.o. Zenica",
    badge: "AUTORSKI SOFTVER • POBJEDNIK 🏆",
    description: "Nagrađeni bh. digitalni kalkulator za brze konverzije valuta, poreza i automatsko kreiranje pravnih izjava pod materijalnom odgovornošću.",
    bullets: [
      "Pobjednik takmičenja i Aplikacija Sedmice",
      "Automatsko generisanje standardizovanih pravnih izjava",
      "Besplatno za građane i preduzeća u BiH"
    ],
    affiliateUrl: "https://www.bh-konver.com/",
    category: "IT & Veb Dizajn",
    featured: true,
    image: IMAGES.bhKonverBanner
  },
  {
    id: "bh-papirfinder-tool",
    title: "BH PapirFinder – Pametni Registar e-Uprave",
    provider: "B&H Assistant d.o.o. Zenica",
    badge: "E-UPRAVA VODIČ 🏛️",
    description: "Centralni registar i digitalni vodič za pronalaženje općinskih obrazaca, zahtjeva i administrativnih taksi u Bosni i Hercegovini.",
    bullets: [
      "Slogan: Više ne ganjate papire, oni dolaze Vama!",
      "Baza općinskih i kantonalnih obrazaca i uputstava",
      "Štedi sate čekanja na administrativnim šalterima"
    ],
    affiliateUrl: "https://papir-finder.vercel.app/",
    category: "IT & Veb Dizajn",
    featured: true,
    image: IMAGES.bhPapirfinderBanner
  },
  {
    id: "stecak-ornamenti-tool",
    title: "Ornamenti Bosne – Kodirani Motivi sa Stećaka",
    provider: "B&H Assistant Izdavaštvo",
    badge: "USB DOSTAVA & POUZEĆE 📦",
    description: "Stilizirani i kodirani vektorski motivi bh. kulturne baštine (SVG, PNG, HTML i CSS). Jedini digitalni proizvod sa dostavom na USB sticku i plaćanjem pouzećem.",
    bullets: [
      "Vektorski formati (SVG, PNG, kodovi)",
      "Sigurna dostava na USB memorijskom sticku",
      "Plaćanje po preuzimanju pošiljke na adresi"
    ],
    affiliateUrl: "https://canva.link/8dwxeack5cwn18l",
    category: "Fotografija & Umjetnost",
    featured: true,
    image: IMAGES.ornamentiBosne
  },
  {
    id: "scena-magazin-edition",
    title: "SCENA+ Magazin – Urbano Izdanje ZDK",
    provider: "B&H Assistant d.o.o. Zenica",
    badge: "KULTURA & PRIVREDA 📖",
    description: "Prvo štampano i e-izdanje urbanog magazina sa temama iz arheologije, kulture, savremene umjetnosti, privrede i tehnologije.",
    bullets: [
      "Podijeljeno 300 besplatnih printanih primjeraka",
      "Interaktivno digitalno čitanje na Canva platformi",
      "Ekskluzivni intervjui i priče iz Zenice i regije"
    ],
    affiliateUrl: "https://canva.link/vxekpnx0ow1xvt9",
    category: "Fotografija & Umjetnost",
    featured: true,
    image: IMAGES.scenaCover
  },
  {
    id: "zentaxi-platform-tool",
    title: "ZENTAXI – Pametna Dispečerska Mreža",
    provider: "B&H Assistant Razvojni Tim",
    badge: "MOBILNOST & STARTUP 🚖",
    description: "Digitalna taksi dispečerska mreža i moderna platforma za povezivanje licenciranih taksista i putnika u gradu Zenici.",
    bullets: [
      "Unaprijed poznate cijene i GPS praćenje vožnje",
      "Podrška za samostalne licencirane vozače",
      "Moderna dispečerska infrastruktura"
    ],
    affiliateUrl: "https://canva.link/xyqzerrxvkxbfy2",
    category: "IT & Veb Dizajn",
    featured: true,
    image: IMAGES.zentaxiBanner
  },
  {
    id: "bcx-crypto-platform",
    title: "BCX Krypto – Prva Domaća Kripto Platforma",
    provider: "Balkan Crypto Exchange (BCX.ba)",
    badge: "FINTECH & BLOCKCHAIN 🪙",
    description: "Licencirana mjenjačnica digitalne imovine u Bosni i Hercegovini sa direktnim uplatama i isplatama u BAM valuti.",
    bullets: [
      "Sigurna kupovina i prodaja digitalnih valuta",
      "Lokalni bankovni računi u konvertibilnim markama",
      "Regulisan domaći kripto ekosistem"
    ],
    affiliateUrl: "https://bcx.ba",
    category: "IT & Veb Dizajn",
    featured: false,
    image: IMAGES.bcxKrypto
  },
  {
    id: "it-skills-boost",
    title: "TryHackMe – Cyber Security & IT Labs",
    provider: "tryhackme.com Global Cyber Lab",
    badge: "CYBER LABS & PRAKSA 🛡️",
    description: "Interaktivni moduli za učenje sajber sigurnosti, etičkog hakovanja, mreža i programiranja za početnike i napredne polaznike kroz praksu u pretraživaču.",
    bullets: [
      "Lična virtuelna mašina u pretraživaču na jedan klik",
      "Praktične laboratorije i stvarni scenariji bez instalacije",
      "Besplatna registracija na zvaničnom portalu"
    ],
    affiliateUrl: "https://tryhackme.com/",
    category: "Digitalna Sigurnost",
    featured: false,
    image: IMAGES.tryhackmeBanner
  },
  {
    id: "gurushots-yusufowych",
    title: "GuruShots Yusufowych Fotografija",
    provider: "GuruShots Global Photo Platform & Exhibitions",
    badge: "FOTOGRAFIJA & UMJETNOST 📷",
    description: "Pogledajte autorski portfolio i umjetničke fotografije bh. autora Yusufowych na globalnoj platformi GuruShots. Učešće u svjetskim fotografskim izazovima.",
    bullets: [
      "Autorska umjetnička i pejsažna fotografija",
      "Međunarodna takmičenja i globalne izložbe",
      "Direktan pristup zvaničnoj GuruShots galeriji"
    ],
    affiliateUrl: "https://gurushots.com/yusufowych",
    category: "Fotografija & Umjetnost",
    featured: false,
    image: IMAGES.digitalniSpavac
  }
];

/**
 * AFFILIATE REKLAME — Zajednica (12 blokova: slika + PR txt + URL)
 * ----------------------------------------------------------------
 * Ukupno: 12 novih affiliate objava (zamjenjuju prethodnih 12 objava).
 * Slike:   public/images/affiliate/ad-01.png ... ad-12.png
 * PR tekst: caption (teksti sa "PR TEKST 01." ...)
 * URL:      postUrl (CIA affiliate link — zamjenjujte "https://affiliate-link-01.example.com")
 * Oznaka:   isAffiliate: true → prikazuje "Posjeti ponudu" dugme na postu.
 */
export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "ad-01",
    image: "/images/affiliate/ad-01.png",
    caption: "PR TEKST 01 — [Unesite PR tekst za affiliate partnera 01 ovdje.]",
    category: "alati",
    categoryLabel: "Affiliate Partner 01",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-01.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner01"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-02",
    image: "/images/affiliate/ad-02.png",
    caption: "PR TEKST 02 — [Unesite PR tekst za affiliate partnera 02 ovdje.]",
    category: "alati",
    categoryLabel: "Affiliate Partner 02",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-02.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner02"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-03",
    image: "/images/affiliate/ad-03.png",
    caption: "PR TEKST 03 — [Unesite PR tekst za affiliate partnera 03 ovdje.]",
    category: "projekti",
    categoryLabel: "Affiliate Partner 03",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-03.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner03"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-04",
    image: "/images/affiliate/ad-04.png",
    caption: "PR TEKST 04 — [Unesite PR tekst za affiliate partnera 04 ovdje.]",
    category: "edukacija",
    categoryLabel: "Affiliate Partner 04",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-04.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner04"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-05",
    image: "/images/affiliate/ad-05.png",
    caption: "PR TEKST 05 — [Unesite PR tekst za affiliate partnera 05 ovdje.]",
    category: "scena",
    categoryLabel: "Affiliate Partner 05",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-05.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner05"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-06",
    image: "/images/affiliate/ad-06.png",
    caption: "PR TEKST 06 — [Unesite PR tekst za affiliate partnera 06 ovdje.]",
    category: "stecak",
    categoryLabel: "Affiliate Partner 06",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-06.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner06"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-07",
    image: "/images/affiliate/ad-07.png",
    caption: "PR TEKST 07 — [Unesite PR tekst za affiliate partnera 07 ovdje.]",
    category: "alati",
    categoryLabel: "Affiliate Partner 07",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-07.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner07"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-08",
    image: "/images/affiliate/ad-08.png",
    caption: "PR TEKST 08 — [Unesite PR tekst za affiliate partnera 08 ovdje.]",
    category: "alati",
    categoryLabel: "Affiliate Partner 08",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-08.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner08"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-09",
    image: "/images/affiliate/ad-09.png",
    caption: "PR TEKST 09 — [Unesite PR tekst za affiliate partnera 09 ovdje.]",
    category: "projekti",
    categoryLabel: "Affiliate Partner 09",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-09.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner09"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-10",
    image: "/images/affiliate/ad-10.png",
    caption: "PR TEKST 10 — [Unesite PR tekst za affiliate partnera 10 ovdje.]",
    category: "edukacija",
    categoryLabel: "Affiliate Partner 10",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-10.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner10"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-11",
    image: "/images/affiliate/ad-11.png",
    caption: "PR TEKST 11 — [Unesite PR tekst za affiliate partnera 11 ovdje.]",
    category: "scena",
    categoryLabel: "Affiliate Partner 11",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-11.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner11"],
    comments: [],
    isAffiliate: true
  },
  {
    id: "ad-12",
    image: "/images/affiliate/ad-12.png",
    caption: "PR TEKST 12 — [Unesite PR tekst za affiliate partnera 12 ovdje.]",
    category: "stecak",
    categoryLabel: "Affiliate Partner 12",
    likes: 0,
    initialLiked: false,
    commentsCount: 0,
    date: "Danas",
    postUrl: "https://affiliate-link-12.example.com",
    location: "B&H Assistant Partneri",
    tags: ["#Affiliate", "#Partner12"],
    comments: [],
    isAffiliate: true
  }
];

export const COMPANY_SERVICES: CompanyService[] = [
  {
    id: "lead-generation-target-market-mapping",
    number: 1,
    title: "B2B Lead Generation & Target Market Mapping",
    subtitle: "Izrada ciljnih baza i akvizicija klijenata",
    shortDescription: "Istraživanje tržišta, izrada ciljnih baza i akvizicija B2B klijenata u BiH i regiji.",
    description: "Istraživanje tržišta, mapiranje specifičnih industrija, kreiranje preciznih i ažurnih baza podataka potencijalnih klijenata i kupaca u BiH i regiji Zapadnog Balkana, te priprema personalizovanih direktnih B2B ponuda.",
    model: "Remote (mjesečni retainer ili projektno)",
    category: "B2B Marketing & Prodaja",
    iconName: "Target",
    tags: ["B2B", "Lead Generation", "Tržišne Baze", "Akvizicija", "Direktna Prodaja"],
    features: [
      "Dubinsko mapiranje industrijskih vertikala u BiH i regiji",
      "Verifikovane kontakt baze donosilaca odluka (C-level, direktori, nabavka)",
      "Kreiranje strategije direktnog outreach-a i priprema B2B ponuda",
      "Redovni mjesečni izvještaji i analiza konverzije"
    ]
  },
  {
    id: "full-cycle-digital-pr-social-media",
    number: 2,
    title: "Full-Cycle Digital PR & Social Media Management",
    subtitle: "Sveobuhvatno vođenje digitalnog prisustva i reputacije",
    shortDescription: "Sveobuhvatno vođenje digitalnog PR-a, brendinga i višejezičnih društvenih mreža.",
    description: "Sveobuhvatno vođenje digitalnog prisustva za firme, brendove i javne ličnosti. Uključuje kreiranje profesionalnih PR saopštenja, vizuelnog identiteta, višejezični copywriting (BHS + njemački i engleski jezik) i strateško vođenje društvenih mreža.",
    model: "Remote / Hibridno",
    category: "Digital PR & Komunikacije",
    iconName: "Megaphone",
    tags: ["Digital PR", "Social Media", "Copywriting", "Brending", "Višejezičnost"],
    features: [
      "Pisanje i distribucija novinarskih PR saopštenja za medije",
      "Kreiranje vizuelnih objava i autorskog sadržaja za društvene mreže",
      "Višejezični marketing: Bosanski/Hrvatski/Srpski, Njemački i Engleski",
      "Upravljanje kriznim komunikacijama i jačanje online reputacije"
    ]
  },
  {
    id: "custom-web-digital-tool-setup",
    number: 3,
    title: "Custom Web & Digital Tool Setup",
    subtitle: "Paketi za digitalizaciju poslovanja 'ključ u ruke'",
    shortDescription: "Paketi za digitalizaciju poslovanja 'ključ u ruke' (od 900 KM) uz integraciju BH Konver alata.",
    description: "Izrada brzih, modernih web rješenja (uključujući popularne startne pakete za digitalizaciju od 900 KM) uz integraciju naprednih alata poput BH Konvera, prilagođenih poslovnih kalkulatora i sistema za pravne izjave za mala i srednja preduzeća.",
    model: "Projektni rad (ključ u ruke)",
    category: "Web Razvoj & Alati",
    iconName: "Code",
    tags: ["Web Razvoj", "Digitalizacija", "BH Konver Integracija", "Kalkulatori", "Ključ u Ruke"],
    features: [
      "Brza izrada modernih responzivnih web stranica (od 900 KM)",
      "Integracija interaktivnih kalkulatora poreza, valuta i mjernih jedinica",
      "Automatizacija pravnih izjava i administrativnih obrazaca",
      "Kompletno postavljanje domena, hostinga, SSL-a i korporativnih e-mailova"
    ]
  },
  {
    id: "multilingual-content-localization-copywriting",
    number: 4,
    title: "Multilingual Content Localization & Copywriting",
    subtitle: "Stručni tekstovi i lokalizacija za DACH i regiju",
    shortDescription: "Kreiranje i stručna lokalizacija softvera i tekstova za tržišta DACH i Zapadnog Balkana.",
    description: "Kreiranje i profesionalno prevođenje stručnih tekstova, oglasa, tehničke dokumentacije i marketinških materijala prilagođenih tržištu Zapadnog Balkana i njemačkog govornog područja (Njemačka, Austrija, Švicarska).",
    model: "Remote po projektu ili satu",
    category: "Lokalizacija & Jezici",
    iconName: "Globe",
    tags: ["Lokalizacija", "Njemački Jezik", "Engleski", "DACH Tržište", "Tehnički Tekstovi"],
    features: [
      "Stručni prijevodi i lokalizacija na njemački i engleski jezik",
      "SEO optimizirani članci i blog objave za inostrana tržišta",
      "Lokalizacija softverskih interfejsa i e-commerce kataloga",
      "Izrada prodajnih 'landing' stranica sa visokom stopom konverzije"
    ]
  },
  {
    id: "digitalizacija-arhive-poslovnih-dokumenata-saas",
    number: 5,
    title: "Digitalizacija Arhive i Poslovnih Dokumenta (SaaS)",
    subtitle: "Prelazak papirne arhive na sigurne cloud servere",
    shortDescription: "Digitalizacija stotina tona papirne arhive za firme i institucije i izrada SaaS pretrage.",
    description: "Digitalizacija stotina tona papirne arhive za firme i institucije, prelazak na sigurne servere i izrada SaaS platforme za brzu pretragu dokumenata.",
    model: "Projektno i SaaS pretplata (B2B i B2G – javni i privatni sektor)",
    category: "SaaS & Digitalizacija Arhive",
    iconName: "Archive",
    tags: ["Digitalizacija Arhive", "SaaS", "Pretraga Dokumenata", "Arhiviranje", "Sigurni Serveri", "B2B & B2G"],
    features: [
      "Skeniranje i OCR digitalizacija stotina tona papirne dokumentacije",
      "Pohrana na enkriptovanim, sigurnim serverima u skladu sa zakonom o arhivskoj građi",
      "Izrada namjenske SaaS platforme sa instantnom full-text pretragom i filtriranjem",
      "Strogo kontrolisana prava pristupa, revizioni trag (audit log) i redovni backup"
    ]
  },
  {
    id: "web-performance-seo-deep-dive",
    number: 6,
    title: "Web Performance Optimization & SEO Deep-Dive Analysis",
    subtitle: "Optimizacija brzine, Core Web Vitals i tehnički SEO",
    shortDescription: "Ubrzanje učitavanja stranica (Core Web Vitals), tehnički SEO auditi i jačanje sigurnosti.",
    description: "Profesionalna revizija postojećih web stranica klijenata. Obuhvata detaljnu analizu brzine učitavanja (Core Web Vitals), tehničku SEO optimizaciju, jačanje sigurnosti, refaktorisanje koda i prilagođavanje korisničkog interfejsa (UI/UX) radi veće konverzije.",
    model: "Jednokratna optimizacija ili mjesečni ugovor o održavanju",
    category: "SEO & Tehnička Optimizacija",
    iconName: "Zap",
    tags: ["Core Web Vitals", "SEO Optimizacija", "Brzina Web Stranice", "UI/UX Audit", "Održavanje"],
    features: [
      "Postizanje 90+ rezultata na Google PageSpeed Insights i Lighthouse",
      "Optimizacija LCP, FID/INP i CLS (nulti pomak rasporeda)",
      "Tehnički SEO: robots.txt, sitemap.xml, Schema.org strukturirani podaci",
      "Uklanjanje uskih grla u kodu i optimizacija multimedijalnih resursa"
    ]
  },
  {
    id: "custom-mobile-app-development",
    number: 7,
    title: "Custom Mobile App Development",
    subtitle: "Izrada nativnih i hibridnih mobilnih aplikacija po mjeri",
    shortDescription: "Razvoj namjenskih mobilnih aplikacija za iOS i Android od koncepta do objave na store-u.",
    description: "Razvoj mobilnih aplikacija prilagođenih specifičnim poslovnim potrebama klijenata — e-commerce platforme, interni alati za upravljanje terenskim radom, aplikacije za rezervacije, transport ili servise (od koncepta do objave na store-ovima).",
    model: "Projektni rad (od koncepta do Google Play & Apple App Store)",
    category: "Mobilni Razvoj",
    iconName: "Smartphone",
    tags: ["Mobilne Aplikacije", "iOS", "Android", "React Native", "Google Play & App Store"],
    features: [
      "Razvoj modernih mobilnih aplikacija za iOS i Android",
      "Integracija push notifikacija, geolokacije i sigurnih plaćanja",
      "Povezivanje sa postojećim bazama podataka i ERP sistemima",
      "Kompletno vođenje procesa certifikacije na App Store i Google Play"
    ]
  },
  {
    id: "web-to-app-transformation",
    number: 8,
    title: "Web-to-App Transformation",
    subtitle: "Pretvaranje postojećih web stranica u mobilne aplikacije",
    shortDescription: "Brza transformacija postojeće web stranice u instalabilnu mobilnu PWA aplikaciju.",
    description: "Izuzetno tražena i isplativa usluga za vlasnike biznisa koji već posjeduju funkcionalnu web stranicu, a žele je pretvoriti u modernu mobilnu aplikaciju (PWA ili hibridnu aplikaciju) kako bi bili direktno na ekranu svojih kupaca uz minimalne troškove razvoja.",
    model: "Projektni rad (brza i isplativa realizacija)",
    category: "PWA & Mobilna Transformacija",
    iconName: "Layers",
    tags: ["Web-to-App", "PWA", "Mobilna Transformacija", "Optimizacija Troškova", "Offline Rad"],
    features: [
      "Brza transformacija postojeće web stranice u instalabilnu aplikaciju",
      "Ikonica na ekranu telefona kupca bez potrebe za ponovnim razvojem koda",
      "Podrška za rad bez interneta (Offline caching) i instantno pokretanje",
      "Znatno niži troškovi u poređenju sa izradom zasebnog nativnog koda"
    ]
  }
];

