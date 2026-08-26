import { DigitalTool, DevelopmentProject, MagazineEdition, AffiliateCourse, CompanyDetails, SocialPost } from '../types';
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
    url: "https://bh-konver.lovable.app/",
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
      "Primarna zvanična domena u pripremi: www.bh-konver.ba"
    ]
  },
  {
    id: "bh-papirfinder",
    name: "BH PapirFinder",
    tagline: "Centralni registar i vodič za besplatne općinske obrasce",
    description: "Vaš centralni digitalni registar i pametni vodič za pronalaženje besplatnih obrazaca, zahtjeva i dokumenata lokalne samouprave u Bosni i Hercegovini. Pojednostavljuje i ubrzava administrativne procese za općine Olovo, Gračanica, Banja Luka, Jajce, Travnik i sve kantone u BiH.",
    url: "https://bhpapirfinder.atoms.world/",
    badge: "BESPLATNI OBRASCI & e-UPRAVA 🏛️",
    category: "Administracija & Javne Usluge",
    iconName: "FileText",
    image: IMAGES.bhPapirfinderMockup,
    bannerImage: IMAGES.bhPapirfinderBanner,
    mockupImage: IMAGES.bhPapirfinderMockup,
    deliveryBadge: "BESPLATNI OPĆINSKI OBRASCI & VODIČ",
    deliveryNotice: "Direktan pristup i preuzimanje službenih općinskih zahtjeva, taksi i obrazaca — ušteda vremena građanima, privredi i dijaspori.",
    features: [
      "Baza besplatnih službenih općinskih obrazaca i upravnih zahtjeva 📄",
      "Pametna pretraga po gradovima (Olovo, Gračanica, BL, Travnik, Jajce...)",
      "Pojednostavljeni e-Uprava koraci za fizička i pravna lica",
      "Direktno preuzimanje pripremljenih dokumenata i uputstava",
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
    id: "monday-com",
    title: "Monday.com - Vodeći Work OS & Upravljanje Projektima",
    provider: "monday.com Work OS Global Platform",
    badge: "WORK OS & PRODUKTIVNOST",
    description: "Jeste li probali monday.com?! Vodeća platforma za upravljanje projektima, zadacima, Kanban tablama i automatizaciju procesa za moderne timove.",
    bullets: [
      "Vizuelne Kanban table, vremenske linije i gantogrami",
      "Automatizacija radnih tokova i 200+ gotovih integracija (Slack, Teams, Google)",
      "Isprobajte besplatno putem našeg zvaničnog partnerskog linka"
    ],
    affiliateUrl: "https://try.monday.com/rzwizf4pspzc",
    category: "IT & Veb Dizajn",
    featured: true,
    image: IMAGES.mondayLogo
  },
  {
    id: "remote-rocketship",
    title: "Remote Rocketship - Remote Poslovi u BiH",
    provider: "Remote Rocketship Global Network",
    badge: "REMOTE POSLOVI U BiH",
    description: "Najbolja stranica za Remote Poslove u BiH! Pronađite rad od kuće i plaćene pozicije u IT-ju, marketingu, dizajnu i korisničkoj podršci sa fleksibilnim radnim vremenom.",
    bullets: [
      "Najbolja stranica za Remote Poslove u BiH i dijaspori",
      "Direktan kontakt sa vrhunskim poslodavcima iz EU, SAD i svijeta",
      "Redovno ažurirani oglasi i provjereni uslovi rada"
    ],
    affiliateUrl: "https://tolt.link/remote-poslovi",
    category: "Remote Poslovi",
    featured: true,
    image: IMAGES.remoteRocket
  },
  {
    id: "atoms-dev",
    title: "Atoms - Pretvori Ideju u Realnost",
    provider: "Atoms World AI & App Platform",
    badge: "AI & TECH PLATFORMA",
    description: "Inovativna AI i cloud platforma za brzo kreiranje, testiranje i skaliranje pametnih web aplikacija i samostalnih agenata bez komplicirane infrastrukture.",
    bullets: [
      "Gradite napredne AI agente i moderne veb aplikacije",
      "Pretvori svaku ideju u stvarni, operativni softverski proizvod",
      "Ekskluzivni partnerski pristup preko B&H Assistant mreže"
    ],
    affiliateUrl: "https://atoms.dev/?utm_source=affiliate&via=pretvori-ideju-u-realnost",
    category: "IT & Veb Dizajn",
    featured: true,
    image: IMAGES.atomsDev
  },
  {
    id: "alison-global",
    title: "Alison - Besplatni Certificirani Kursevi",
    provider: "Alison Global Education Platform Services",
    badge: "BESPLATNO & CERTIFICIRANO",
    description: "Ukoliko tražite korisne, certificirane edukativne kurseve iz raznih svjetskih oblasti — imate priliku da besplatno upišete kurseve koje Vam nudimo u saradnji sa Alison platformom. Predavanja i testiranja znanja su 100% online.",
    bullets: [
      "Predavanja i testiranje znanja su 100% online",
      "Predavači su stručnjaci i profesori sa svjetskih univerziteta",
      "Certifikati i diplome priznati u EU, SAD i širom svijeta",
      "Širok spektar oblasti: IT, Menadžment, Jezici, Zdravstvo, Dizajn"
    ],
    affiliateUrl: "https://alison.com/certificate-courses?utm_source=alison_user&utm_medium=affiliate&utm_campaign=56404529",
    category: "Online Edukacija",
    featured: true,
    image: IMAGES.alisonLogo
  },
  {
    id: "cloudtalk-partner",
    title: "CloudTalk AI - Telefonski Asistent",
    provider: "CloudTalk Global Voice & AI Solutions",
    badge: "AI TELEFONIJA & CALL CENTAR",
    description: "AI telefonski asistent za organizaciju, transkripciju i automatsko primanje poziva za call centre, online prodaju i korisničku podršku. Ubrzajte i optimizujte komunikaciju.",
    bullets: [
      "Pametni AI asistent za primanje i organizaciju poziva",
      "Savršeno za online trgovine, podršku i call centre",
      "Besplatna instalacija i probni period preko B&H Assistant-a"
    ],
    affiliateUrl: "https://cloudtalk.introw.io/r/bjT0sXh8",
    category: "IT & Veb Dizajn",
    featured: true,
    image: IMAGES.cloudtalkBanner
  },
  {
    id: "it-skills-boost",
    title: "TryHackMe & IT Cyber Security",
    provider: "TryHackMe Global Cyber Lab",
    badge: "PREPORUKA ZA MLADE",
    description: "Specijalizirani interaktivni moduli za učenje sajber sigurnosti, etičkog hakovanja, web dizajna i programiranja za početnike i napredne polaznike kroz praksu u pretraživaču.",
    bullets: [
      "Lična virtuelna mašina u pretraživaču na jedan klik",
      "Praktične laboratorije i stvarni scenariji bez komplicirane instalacije",
      "Besplatna registracija putem našeg zvaničnog linka"
    ],
    affiliateUrl: "https://tryhackme.com/",
    category: "IT & Veb Dizajn",
    featured: false,
    image: IMAGES.tryhackmeBanner
  },
  {
    id: "business-languages",
    title: "Poslovni Jezici & Menadžment",
    provider: "International Business Academy",
    badge: "POSLOVNE VJEŠTINE",
    description: "Unaprijedite svoje poslovne vještine uz međunarodno akreditovane besplatne kurseve engleskog, njemačkog, poslovnog komuniciranja i vođenja timova.",
    bullets: [
      "Priprema za međunarodne sertifikate",
      "Poslovna korespondencija i komunikacija",
      "Dostupno odmah na svim uređajima"
    ],
    affiliateUrl: "https://alison.com/certificate-courses?utm_source=alison_user&utm_medium=affiliate&utm_campaign=56404529",
    category: "Jezici & Poslovanje",
    featured: false,
    image: IMAGES.businessPlan
  },
  {
    id: "gurushots-yusufowych",
    title: "GuruShots Yusufowych Fotografija",
    provider: "GuruShots Global Photo Platform & Exhibitions",
    badge: "FOTOGRAFIJA & UMJETNOST",
    description: "Pogledajte ekskluzivni portfolio i autorske fotografije bh. autora Yusufowych na globalnoj platformi GuruShots. Učešće u svjetskim fotografskim izazovima i međunarodnim digitalnim izložbama.",
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

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "post-scena-1",
    image: IMAGES.scenaCover,
    caption: "Naslovnica I. izdanja magazina SCENA+! ✨ Istražujemo novu energiju Zenice i ZDK, od underground umjetnosti i vinila Danila Kese do digitalnih inovacija mladih. Čitajte potpuno besplatno na Canva linku! 📖🇧🇦",
    category: "scena",
    categoryLabel: "Magazin SCENA+",
    likes: 142,
    initialLiked: false,
    commentsCount: 18,
    date: "Prije 2 dana",
    postUrl: "https://www.instagram.com/bh.asst",
    location: "Zenica, Bosna i Hercegovina",
    tags: ["#SCENAPlus", "#ZenicaKultura", "#UrbaniMagazin", "#ZDK", "#BHAssistant"],
    comments: [
      {
        id: "c1",
        author: "zenica_creatives",
        text: "Sjajan format i odličan izbor tema za prvo izdanje! Svaka čast ekipi.",
        timeAgo: "1 dan"
      },
      {
        id: "c2",
        author: "haris_dev_ba",
        text: "Konačno magazin koji spaja kulturu i IT u našem kantonu! 👏",
        timeAgo: "18 sati"
      }
    ]
  },
  {
    id: "post-bravo-winner",
    image: IMAGES.bravoWinner,
    caption: "🏆 POBJEDA! BH KONVER je proglašen za pobjednika sedmice! Tim platforme Lovable preuzima kompletan razvoj i finansiranje zvaničnih mobilnih aplikacija za iOS i Android. Hvala svima na podršci! 📱🇧🇦",
    category: "alati",
    categoryLabel: "Priznanja & Nagrade",
    likes: 340,
    initialLiked: true,
    commentsCount: 42,
    date: "Prije 3 dana",
    postUrl: "https://www.instagram.com/bh.asst",
    location: "B&H Assistant Hub • Zenica",
    tags: ["#BHKonver", "#BravoWinner", "#LovableApp", "#PobjednikSedmice", "#StartupZenica"],
    comments: [
      {
        id: "c-bravo-1",
        author: "amar_zenica",
        text: "Ogroman uspjeh za domaći softver! Čestitke B&H Assistant timu.",
        timeAgo: "2 dana"
      }
    ]
  },
  {
    id: "post-konver-2",
    image: IMAGES.bhKonverMockup,
    caption: "Predstavljamo BH Konverter (Konver) ⚡ Vaš novi omiljeni alat za brze poslovne i devizne kalkulacije, prilagođen zakonima i valutama u BiH. Bez registracije, 100% besplatno i munjevito brzo. Isprobajte na bh-konver.lovable.app 💻🚀",
    category: "alati",
    categoryLabel: "BH Digitalni Alati",
    likes: 215,
    initialLiked: true,
    commentsCount: 29,
    date: "Prije 4 dana",
    postUrl: "https://www.instagram.com/bh.asst",
    location: "B&H Assistant Hub • Zenica",
    tags: ["#BHKonver", "#BHTech", "#DigitalniAlati", "#FinansijeBiH", "#StartupZenica"],
    comments: [
      {
        id: "c3",
        author: "mirza_finansije",
        text: "Ovo nam je nedostajalo za brze kalkulacije PDV-a i valuta u praksi.",
        timeAgo: "3 dana"
      }
    ]
  },
  {
    id: "post-zentaxi-reklama",
    image: IMAGES.zentaxiBanner,
    caption: "🚖 ZENTAXI — Spajamo vožnju, stvaramo udobnost! Nova pametna digitalna taksi platforma za grad Zenicu i Zeničko-dobojski kanton. Pozivamo licencirane taksi prevoznike i investitore na partnerstvo. 📍🚦",
    category: "projekti",
    categoryLabel: "Urbani Transport & Startup",
    likes: 289,
    initialLiked: false,
    commentsCount: 37,
    date: "Prije 5 dana",
    postUrl: "https://canva.link/xyqzerrxvkxbfy2",
    location: "Zenica • ZENTAXI Mreža",
    tags: ["#ZenTaxi", "#ZenicaPrijevoz", "#SmartCity", "#TaksiZenica", "#Investicije"],
    comments: [
      {
        id: "c-zt-1",
        author: "edis_taxi",
        text: "Odlična ideja za transparentan taksi prevoz u Zenici bez ogromnih provizija!",
        timeAgo: "4 dana"
      }
    ]
  },
  {
    id: "post-bojanka-3",
    image: IMAGES.gummiBojanka,
    caption: "🎨 Besplatna GUMMI Bojanka za najmlađe! Preuzmite PDF izdanje u 8 uzbudljivih ilustracija sa temom automobila, sigurnosti u saobraćaju i druženja. Razvijajte kreativnost svoje djece uz B&H Assistant tim! 🖍️🚙",
    category: "projekti",
    categoryLabel: "Projekti & Djeca",
    likes: 184,
    initialLiked: false,
    commentsCount: 24,
    date: "Prije 6 dana",
    postUrl: "https://www.instagram.com/bh.asst",
    location: "Zenica • ZEDP",
    tags: ["#GUMMIBojanka", "#DjecaBiH", "#Kreativnost", "#BesplatnoPreuzimanje"],
    comments: [
      {
        id: "c4",
        author: "leila_mami_blog",
        text: "Isprintali smo za vikend, djeca su oduševljena likom Gummia! ❤️",
        timeAgo: "5 dana"
      }
    ]
  },
  {
    id: "post-gummi-jaran",
    image: IMAGES.gummiVasJaran,
    caption: "📚 GUMMI VAŠ JARAN — 'Naučimo čitati i pisati latinicu i ćirilicu zajedno!' Originalni animirani i edukativni projekat za predškolce i školarce u Bosni i Hercegovini. 🧒🎈",
    category: "projekti",
    categoryLabel: "Edukacija & Djeca",
    likes: 210,
    initialLiked: true,
    commentsCount: 19,
    date: "Prije 7 dana",
    postUrl: "https://canva.link/vens28es43srfdw",
    location: "Zenica • Edukativni Centar",
    tags: ["#GummiVasJaran", "#UcenjeSlova", "#EdukacijaBiH", "#Djeca", "#Bojanka"],
    comments: [
      {
        id: "c-gj-1",
        author: "nastavnica_maja",
        text: "Prekrasan pristup učenju oba naša pisma kroz igru.",
        timeAgo: "6 dana"
      }
    ]
  },
  {
    id: "post-ornamenti-4",
    image: IMAGES.ornamentiBosne,
    caption: "Monumentalna baština srednjovjekovne Bosne u digitalnom kodu 🏛️✨ Digitalna kolekcija 'Ornamenti Bosne' donosi vektorske simbole stećaka za moderne dizajnere, veb projekte i edukaciju. Spoj tradicije i cyber tehnologije.",
    category: "stecak",
    categoryLabel: "Kultura & Stećci",
    likes: 268,
    initialLiked: true,
    commentsCount: 35,
    date: "Prije 1 sedmicu",
    postUrl: "https://www.instagram.com/bh.asst",
    location: "Radimlja & Zgošća • BiH",
    tags: ["#OrnamentiBosne", "#Stećak", "#KulturnaBaština", "#WebDesign", "#BiHHistory"],
    comments: [
      {
        id: "c5",
        author: "tarik_arch",
        text: "Fantastična inicijativa za očuvanje vizuelnog identiteta Bosne!",
        timeAgo: "6 dana"
      }
    ]
  },
  {
    id: "post-our-products",
    image: IMAGES.ourProducts,
    caption: "📱💻 Ekosistem B&H Assistant d.o.o. na svim uređajima! Naš suite obuhvata BH Konver, BH PapirFinder, Ornamente Bosne i SCENA+ magazin, optimizovane za računare, tablete i pametne telefone.",
    category: "alati",
    categoryLabel: "Digitalni Ekosistem",
    likes: 312,
    initialLiked: true,
    commentsCount: 22,
    date: "Prije 8 dana",
    postUrl: "https://bh-assistant.ba",
    location: "Zenica, BiH",
    tags: ["#OurProducts", "#ResponsiveDesign", "#TechBiH", "#DigitalTransformation"],
    comments: [
      {
        id: "c-op-1",
        author: "vedran_ui",
        text: "Svi proizvodi na jednom mjestu izgledaju vrlo ujednačeno i profesionalno.",
        timeAgo: "7 dana"
      }
    ]
  },
  {
    id: "post-gurushots-5",
    image: IMAGES.digitalniSpavac,
    caption: "Spavač iz kamena budi se u digitalnom dobu 🌌 Yusufowych fotografija na globalnoj GuruShots platformi. Ponosno predstavljamo bh. motive i konceptualnu umjetnost na svjetskim izložbama fotografije. 📸🌐",
    category: "stecak",
    categoryLabel: "Fotografija & Umjetnost",
    likes: 197,
    initialLiked: false,
    commentsCount: 16,
    date: "Prije 10 dana",
    postUrl: "https://gurushots.com/yusufowych",
    location: "GuruShots Global Exhibition",
    tags: ["#GuruShots", "#Yusufowych", "#DigitalArt", "#BosnianArt", "#Photography"],
    comments: [
      {
        id: "c6",
        author: "photo_enthusiast_eu",
        text: "Stunning composition and atmosphere! 🌟",
        timeAgo: "8 dana"
      }
    ]
  },
  {
    id: "post-papirfinder-6",
    image: IMAGES.bhPapirfinderMockup,
    caption: "Trebate općinski obrazac za Olovo, Gračanicu, Banja Luku ili Travnik? 📄🔍 BH PapirFinder štedi vaše vrijeme i novac — pronađite i preuzmite zvanične obrasce lokalne samouprave bez čekanja u redovima!",
    category: "alati",
    categoryLabel: "BH Digitalni Alati",
    likes: 156,
    initialLiked: false,
    commentsCount: 12,
    date: "Prije 2 sedmice",
    postUrl: "https://www.instagram.com/bh.asst",
    location: "Bosna i Hercegovina",
    tags: ["#PapirFinder", "#eUprava", "#LokalnaSamouprava", "#BiHServisi"],
    comments: [
      {
        id: "c7",
        author: "dzenan_bih",
        text: "Korisno i pregledno, posebno za ljude u dijaspori kojima trebaju formulari.",
        timeAgo: "12 dana"
      }
    ]
  },
  {
    id: "post-cloudtalk",
    image: IMAGES.cloudtalkBanner,
    caption: "🤖📞 CloudTalk AI — Vaš pametni asistent za pozive! Automatizujte korisničku podršku i prodaju uz naprednu AI telefoniju i VoIP sisteme. Isprobajte besplatno uz B&H Assistant partnerstvo.",
    category: "alati",
    categoryLabel: "AI & Tehnologija",
    likes: 178,
    initialLiked: false,
    commentsCount: 15,
    date: "Prije 2 sedmice",
    postUrl: "https://cloudtalk.introw.io/r/bjT0sXh8",
    location: "CloudTalk Partner Hub",
    tags: ["#CloudTalk", "#AITelefonija", "#CallCenter", "#PoslovnaRjesenja"],
    comments: [
      {
        id: "c-ct-1",
        author: "samir_sales",
        text: "Odličan alat za smanjenje propuštenih poziva u firmi.",
        timeAgo: "13 dana"
      }
    ]
  },
  {
    id: "post-tryhackme",
    image: IMAGES.tryhackmeBanner,
    caption: "🛡️💻 Jeste li spremni za karijeru u sajber sigurnosti? TryHackMe vam omogućava praktičan rad u virtuelnim laboratorijama direktno u pretraživaču. Učite etičko hakovanje od nule! 🚀",
    category: "alati",
    categoryLabel: "Sajber Sigurnost & Edukacija",
    likes: 245,
    initialLiked: true,
    commentsCount: 31,
    date: "Prije 2 sedmice",
    postUrl: "https://tryhackme.com/",
    location: "Global Cyber Lab",
    tags: ["#TryHackMe", "#CyberSecurity", "#EtičkoHakovanje", "#ITObuka"],
    comments: [
      {
        id: "c-thm-1",
        author: "kenan_sec",
        text: "Najbolja platforma za učenje pentestinga u praksi!",
        timeAgo: "14 dana"
      }
    ]
  }
];
