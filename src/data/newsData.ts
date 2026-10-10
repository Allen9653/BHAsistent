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
    id: "news-bh-konver-glavna",
    title: "BH KONVER – Autorski softver za brze konverzije i pravne izjave u BiH",
    slug: "bh-konver-autorski-softver-pravne-izjave",
    category: "BH KONVER & IT",
    date: "13. August 2026.",
    author: "Alen Jusufović, Direktor & Softverski Inženjer",
    excerpt: "Predstavljamo BH KONVER — napredni domaći web alat za konverziju valuta, obračune taksi i automatsko generisanje službenih pravnih izjava spremnih za print i ovjeru pred notarom ili u općini.",
    content: `BH KONVER predstavlja vodeće autorsko softversko rješenje u tehnološkom portfoliju domaće IT kompanije B&H Assistant d.o.o. sa sjedištem u Zenici. Aplikacija je ciljano koncipirana i razvijena kako bi riješila svakodnevne administrativne, pravne i finansijske barijere sa kojima se suočavaju građani, preduzetnici i pravni subjekti širom Bosne i Hercegovine.

Ključna inovacija BH KONVER alata ogleda se u automatizovanom generatoru standardizovanih pravnih izjava pod punom materijalnom i krivičnom odgovornošću. Korisnici više ne moraju ručno sastavljati komplikovane pravne formulacije niti plaćati skupe advokatske nacrte za tipske dokumente. Kroz intuitivnu formu na web domeni bh-konver.lovable.app, građani unose osnovne podatke, a softver u realnom vremenu generiše pravno validne obrasce prilagođene zakonodavstvu Federacije Bosne i Hercegovine i Republike Srpske. Među najčešće korištenim obrascima nalaze se:
• Izjava o zajedničkom domaćinstvu (kućna lista) za potrebe stipendija, dječijih dodataka i socijalnih davanja;
• Izjava o izdržavanju članova uže i šire porodice;
• Izjava o neposjedovanju nepokretne imovine i stambenog prostora;
• Saglasnost roditelja za putovanje maloljetnog djeteta u inostranstvo;
• Standardizovane izjave za apliciranje na javne pozive i grantove.

Svaki generisani dokument automatski se formatira prema propisanim standardima općinskih šaltera i notarskih ureda, spreman za trenutni print ili preuzimanje u PDF formatu.

Pored pravnog modula, BH KONVER posjeduje i visoko precizni kalkulator valuta i finansijskih naknada. Konverzioni mehanizam usklađen je sa zvaničnim kursnim listama Centralne Banke Bosne i Hercegovine (CBBiH), omogućavajući trenutne i tačne preračune između konvertibilne marke (BAM), eura (EUR), američkog dolara (USD), švicarskog franka (CHF) i drugih vodećih svjetskih valuta. Za razliku od generičkih globalnih kalkulatora, BH KONVER automatski uračunava domaće bankarske provizije, administrativne takse i specifičnosti bh. platnog prometa.

Korištenje osnovnih funkcionalnosti aplikacije u potpunosti je besplatno za sve građane Bosne i Hercegovine i dijasporu. Aplikacija poštuje najviše standarde privatnosti korisničkih podataka: svi uneseni podaci obrađuju se isključivo u lokalnom pretraživaču (client-side) i ne pohranjuju se na udaljene servere bez izričitog odobrenja korisnika. Isprobajte aplikaciju na adresi https://bh-konver.lovable.app/.`,
    imageUrl: IMAGES.bhKonverMockup,
    published: true,
    tags: ["BH Konver", "Softver", "Pravne Izjave", "Digitalni Alati", "B&H Assistant", "Zenica"]
  },
  {
    id: "news-papirfinder-glavna",
    title: "BH PapirFinder – Vaš pametni digitalni vodič kroz općinske obrasce i takse",
    slug: "bh-papirfinder-digitalni-vodic-opcinski-obrasci",
    category: "BH PapirFinder & e-Uprava",
    date: "12. August 2026.",
    author: "B&H Assistant Istraživački Tim",
    excerpt: "Pronađite sve potrebne općinske obrasce, takse i instrukcije za Zenicu, Sarajevo, Banja Luku, Tuzlu, Mostar i druge gradove u BiH bez lutanja po šalterima.",
    content: `Administrativni labirint i dugotrajna čekanja pred šalterima lokalnih samouprava u Bosni i Hercegovini godinama predstavljaju jedan od najvećih izvora frustracije za građane i preduzetnike. Da bi se izvadila obična građevinska dozvola, uvjerenje o slobodnom bračnom stanju ili registracija obrta, građani su često primorani višestruko posjećivati općinske zgrade samo da bi saznali koji im obrasci trebaju i na koji račun uplatiti administrativnu taksu.

S ciljem sistematskog rješavanja ovog problema, B&H Assistant d.o.o. Zenica lansirao je BH PapirFinder — centralizovani registar i pametni vodič kroz e-upravu i općinsku dokumentaciju na web domeni bhpapirfinder.atoms.world.

BH PapirFinder funkcioniše kao jedinstvena kontakt tačka koja objedinjuje službene obrasce, uputstva i tarifnike općinskih i kantonalnih organa. Platforma trenutno pokriva ključne gradove i administrativne centre u Bosni i Hercegovini, uključujući Zenicu, Sarajevo (općine Centar, Stari Grad, Novo Sarajevo, Novi Grad), Banja Luku, Tuzlu, Mostar, Bihać, kao i manje lokalne zajednice poput Olova, Travnika i Gračanice.

Sistem korisnicima pruža tri ključne pogodnosti:
1. Brzo pronalaženje tačnog obrasca: Kroz pametnu tražilicu građani kucaju naziv usluge (npr. 'izvod iz matične knjige rođenih', 'dozvola za gradnju', 'promjena prebivališta') i u jednom kliku preuzimaju originalni i ažurirani PDF obrazac.
2. Transparentan uvid u takse i račune: Za svaki administrativni postupak naveden je tačan iznos općinske ili kantonalne takse, broj žiro-računa primaoca, vrsta prihoda i model poziva na broj, što eliminiše greške pri popunjavanju uplatnica u bankama i poštama.
3. Spisak prateće dokumentacije: Korisnik unaprijed dobija jasan kontrolni spisak svih priloženih uvjerenja i potvrda koje mora prikupiti, sprečavajući vraćanje sa šaltera zbog nedostajućeg papira.

Baza podataka se redovno ažurira i usklađuje sa službenim glasnicima općina i gradova. BH PapirFinder je dio šire inicijative B&H Assistant-a za modernizaciju javne uprave i pružanje besplatnih, društveno korisnih alata građanima Bosne i Hercegovine.`,
    imageUrl: IMAGES.bhPapirfinderMockup,
    published: true,
    tags: ["BH PapirFinder", "e-Uprava", "Općinski Obrasci", "BiH", "Digitalizacija", "Lokalna Uprava"]
  },
  {
    id: "news-lovable-app-of-week",
    title: "BH KONVER izglasana za Aplikaciju Sedmice! Lovable gradi i finansira iOS & Android app",
    slug: "bh-konver-aplikacija-sedmice-lovable-podrska",
    category: "BH KONVER & Priznanja",
    date: "12. August 2026.",
    author: "Redakcija B&H Assistant",
    excerpt: "Novi fantastičan uspjeh za B&H Assistant d.o.o. Zenica! Naš autorski softverski alat BH KONVER izglasan je za Aplikaciju Sedmice, pri čemu tim Lovable u potpunosti preuzima i finansira izradu nativnih iOS i Android aplikacija.",
    content: `Sa velikim ponosom i zadovoljstvom obavještavamo poslovnu zajednicu, korisnike i javnost u Bosni i Hercegovini o izuzetnom međunarodnom priznanju koje je osvojila naša domaća aplikacija BH KONVER. U konkurenciji stotina inovativnih softverskih rješenja iz cijelog svijeta, BH KONVER je zvanično izglasana za 'Aplikaciju Sedmice' (App of the Week) na globalnoj tehnološkoj platformi Lovable!

Ovo priznanje ne predstavlja samo simboličnu plaketu, već sa sobom nosi strateško partnerstvo od ogromnog značaja za naš dalji tehnološki razvoj: globalni inženjerski tim Lovable u potpunosti je preuzeo obavezu finansiranja, razvoja i plasiranja nativnih mobilnih aplikacija za BH KONVER na Apple App Store i Google Play Store platformama!

Razvoj mobilnih aplikacija za operativne sisteme iOS i Android omogućiće građanima BiH, kao i brojnoj dijaspori širom Evrope i Amerike, da direktno sa svojih pametnih telefona:
• Generišu i digitalno potpisuju pravne izjave u nekoliko dodira;
• Prate i primaju notifikacije o promjenama službenih kurseva valuta i poreznih stopa;
• Preuzimaju gotove PDF formulare sa QR verifikacionim kodom za brzu provjeru na šalterima.

"Pobjeda na Lovable takmičenju je potvrda da bosanskohercegovačka pamet, inovativnost i fokus na rješavanje stvarnih problema zajednice mogu parirati vodećim svjetskim projektima. Činjenica da tim Lovable investira svoje inženjerske resurse u plasiranje našeg alata na vodeće mobilne prodavnice dokazuje autentičnu vrijednost onoga što gradimo u Zenici", istakao je Alen Jusufović, osnivač i direktor B&H Assistant d.o.o.

Zahvaljujemo se svim našim korisnicima, kolegama iz IT zajednice i sugrađanima koji su dali svoj glas i podržali domaći softverski ekosistem.`,
    imageUrl: IMAGES.bravoWinner,
    published: true,
    tags: ["BH Konver", "Aplikacija Sedmice", "Lovable", "iOS", "Android", "B&H Assistant", "Nagrada"]
  },
  {
    id: "news-bravo-winner",
    title: "BH KONVER – Pobjednik prvog Bravo takmičenja inovatora",
    slug: "bh-konver-pobjednik-prvog-bravo-takmicenja",
    category: "BH KONVER & Priznanja",
    date: "12. August 2026.",
    author: "Alen Jusufović, Direktor B&H Assistant",
    excerpt: "BH KONVER, aplikacija koju razvija B&H Assistant d.o.o., proglašena je pobjednikom prvog Bravo takmičenja! Priznanje da naš rad na digitalnim alatima ima međunarodni odjek.",
    content: `Na nedavno završenom regionalnom takmičenju inovativnih digitalnih projekata Bravo, aplikacija BH KONVER proglašena je ukupnim pobjednikom prvog ciklusa takmičenja. Stručni žiri sastavljen od međunarodnih stručnjaka za digitalnu transformaciju, pravne tehnologije (LegalTech) i korisničko iskustvo (UX) jednoglasno je prepoznao specifičnu vrijednost ovog zeničkog softvera.

Tokom evaluacije projekata ocjenjivano je nekoliko strogih kriterija:
1. Autentičnost i originalnost ideje: Za razliku od kopiranja postojećih inostranih alata, BH KONVER je precizno prilagođen kompleksnom zakonodavnom i administrativnom sistemu Bosne i Hercegovine.
2. Mjerljiv društveni i ekonomski uticaj: Mogućnost da običan građanin besplatno i za manje od dvije minute dobije standardizovan pravni dokument štedi hiljade radnih sati i značajna finansijska sredstva.
3. Tehnološka stabilnost i jednostavnost: Brz odziv aplikacije, responzivni dizajn prilagođen svim tipovima ekrana i robusna zaštita privatnosti korisnika.

Ova nagrada predstavlja vjetar u leđa za kompaniju B&H Assistant d.o.o. i potvrđuje da Zenica izrasta u prepoznatljiv centar domaće softverske industrije koji njeguje društveno odgovorne i praktično primjenjive digitalne proizvode. Nastavljamo sa širenjem baze dokumenata i uvođenjem novih funkcionalnosti u konsultaciji sa domaćim pravnim stručnjacima.`,
    imageUrl: IMAGES.bhKonverBanner,
    published: true,
    tags: ["BH Konver", "Bravo Winner", "Priznanje", "B&H Assistant", "Nagrađena Aplikacija", "Inovacije"]
  },
  {
    id: "news-papirfinder-launch",
    title: "BH PapirFinder – Više ne ganjate papire, oni dolaze Vama!",
    slug: "bh-papirfinder-vise-ne-ganjate-papire",
    category: "BH Digitalni Alati",
    date: "11. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "Predstavljamo pametnog administrativnog vodiča i centralni registar općinskih zahtjeva i taksi u BiH. Štedi sate čekanja na šalterima.",
    content: `Pod prepoznatljivim sloganom 'Više ne ganjate papire, oni dolaze Vama!', B&H Assistant d.o.o. Zenica zvanično je pustio u javni rad platformu BH PapirFinder na namjenskoj domeni bhpapirfinder.atoms.world.

Projekat je nastao kao odgovor na realnu potrebu građana za centralizovanim, provjerenim i lako pretraživim informacijama o općinskim i kantonalnim procedurama. U praksi, građani često gube sate na šalterima samo da bi saznali koji im dokumenti nedostaju, koje taksene marke moraju kupiti ili na koje podračune uplatiti komunalne naknade.

BH PapirFinder sistematski prikuplja, digitalizuje i kategorizuje:
• Obrasce za matične knjige (rođeni, vjenčani, umrli);
• Zahtjeve za urbanističke i građevinske saglasnosti;
• Prijave za osnivanje obrta i samostalnih djelatnosti;
• Zahtjeve za boračko-invalidsku zaštitu i socijalnu pomoć;
• Obrasce za komunalne priključke i stambena pitanja.

Platforma je u potpunosti optimizovana za mobilne telefone, tablete i računare, a dizajnirana je sa jasnim kontrastima i pristupačnim fontovima kako bi je jednostavno koristili građani svih starosnih dobi. Posjetite https://bhpapirfinder.atoms.world i iskusite moderno, rasterećeno upravljanje administrativnim obavezama.`,
    imageUrl: IMAGES.bhPapirfinderBanner,
    published: true,
    tags: ["BH PapirFinder", "e-Uprava", "Općinski Obrasci", "BiH", "Digitalizacija", "Servis Građanima"]
  },
  {
    id: "news-zentaxi-launch",
    title: "ZENTAXI — Pametna taksi platforma za grad Zenicu i ZDK",
    slug: "zentaxi-pametna-taksi-platforma-zenica",
    category: "Projekti & Startupi",
    date: "10. August 2026.",
    author: "B&H Assistant Razvojni Tim",
    excerpt: "Spajamo vožnju, stvaramo udobnost! Nova digitalna taksi platforma koja povezuje licencirane taksi vozače i građane Zenice uz unaprijed poznate cijene.",
    content: `Urbani transport u industrijskim centrima poput Zenice zahtijeva modernu koordinaciju koja štiti dostojanstvo licenciranih vozača, a putnicima pruža sigurnost, tačnost i transparentnost. Upravo iz te vizije rodio se projekat ZENTAXI, inovativna dispečerska mreža i platforma za pametnu gradsku mobilnost koju razvija tim B&H Assistant d.o.o.

Za razliku od multinacionalnih 'ride-sharing' konglomerata koji uzimaju visoke provizije od vozača i nerijetko operišu u sivoj zoni propisa, ZENTAXI je građen u uskoj saradnji sa lokalnim licenciranim taksi prevoznicima Zeničko-dobojskog kantona.

Glavne karakteristike platforme ZENTAXI obuhvataju:
• Unaprijed poznate i transparentne tarife: Putnik prije ulaska u vozilo ima preciznu procjenu cijene vožnje, bez skrivenih doplata i nepredviđenih skokova u cijeni tokom saobraćajnih gužvi.
• GPS praćenje dolaska vozila: Putnici u realnom vremenu na mapi prate kretanje svog taksija, uz procjenu vremena dolaska (ETA).
• Podrška lokalnoj ekonomiji: Platforma omogućava pošteniji model raspodjele prihoda, zadržavajući stvorenu vrijednost unutar lokalne zajednice Zenice.
• Standardi sigurnosti: Svi vozači u mreži prolaze provjeru licenci, tehničke ispravnosti vozila i službene registracije.

ZENTAXI je trenutno u fazi pilot testiranja sa odabranim taksi udruženjima i partnerima, a javno lansiranje aplikacije za putnike planirano je kroz faze tokom tekuće godine.`,
    imageUrl: IMAGES.zentaxiBanner,
    published: true,
    tags: ["ZENTAXI", "Zenica", "Taksi", "Urbani Prijevoz", "Mobilna Aplikacija", "Smart City"]
  },
  {
    id: "news-gummi-bojanka",
    title: "GUMMI Bojanka & Animirani Film – Besplatno za djecu BiH!",
    slug: "gummi-bojanka-animirani-film-edukacija",
    category: "Projekti & Djeca",
    date: "10. August 2026.",
    author: "Kreativni Odjel B&H Assistant",
    excerpt: "Originalni lik GUMMI i edukativna bojanka pomažu mališanima u savladavanju slova i sigurnosti u saobraćaju uz smijeh i igru.",
    content: `Društvena odgovornost i ulaganje u najmlađe predstavljaju fundamentalne vrijednosti kompanije B&H Assistant d.o.o. Zenica. U sklopu našeg autorskog edukativno-ekološkog serijala 'GUMMI - Vaš Jaran', kreirali smo jedinstvenu printabilnu edukativnu bojanku pod nazivom 'Sretno djetinjstvo' koja je stavljena na raspolaganje roditeljima, vrtićima i osnovnim školama potpuno besplatno.

Lik GUMMI je simpatični animirani junak stvoren iz ideje o reciklaži starih auto guma i očuvanju čiste prirode u Bosni i Hercegovini. Kroz 8 pažljivo ilustrovanih tabli, djeca predškolskog i ranog školskog uzrasta uče:
• Osnovna pravila saobraćajne kulture i bezbjednog prelaska preko pješačkog prelaza;
• Važnost ekologije, razvrstavanja otpada i očuvanja bh. rijeka i planina;
• Prepoznavanje slova bosanskohercegovačke latinice i ćirilice kroz kreativno bojanje i spajanje linija;
• Razvijanje fine motorike i timskog rada kroz interaktivne zadatke.

Bojanka je dizajnirana u visokoj rezoluciji prilagođenoj standardnom kućnom štampaču (A4 format). Građani i pedagoške ustanove mogu je direktno preuzeti u PDF formatu sa naše stranice u rubrici Projekti, bez ikakve registracije ili naknade. B&H Assistant nastavlja rad na razvoju kratkometražnog animiranog serijala koji će uskoro biti premijerno prikazan na našem zvaničnom YouTube kanalu.`,
    imageUrl: IMAGES.gummiBojanka,
    published: true,
    tags: ["GUMMI", "Bojanka", "Edukacija", "Djeca", "Crtani Film", "Ekologija", "Društvena Odgovornost"]
  },
  {
    id: "news-hackme",
    title: "Jeste li čuli za HackMe?! Sajber sigurnost za sve generacije",
    slug: "jeste-li-culi-za-hackme-tryhackme",
    category: "Sajber Sigurnost & IT",
    date: "9. August 2026.",
    author: "B&H Assistant Redakcija & IT Sigurnost",
    excerpt: "TryHackMe je platforma za obuku iz sajber sigurnosti bazirana na pretraživaču, sa edukativnim sadržajem koji pokriva sve nivoe znanja — od potpunih početnika do prekaljenih stručnjaka.",
    content: `U eri galopirajuće digitalizacije, sajber napadi, krađa identiteta i ransomware prijetnje više ne pogađaju samo velike multinacionalne korporacije, već svakodnevno ugrožavaju mala domaća preduzeća, javne ustanove i pojedince u Bosni i Hercegovini. Nažalost, formalni obrazovni sistem u našoj zemlji često kaska za realnim potrebama IT industrije kada je riječ o praktičnoj edukaciji iz informacione sigurnosti.

U našoj stalnoj edukativnoj rubrici predstavljamo vodeću globalnu platformu TryHackMe, koja je napravila pravu revoluciju u načinu na koji se uči kibernetička sigurnost. Osnivači platforme, Ben Spring i Ashu Savani, pokrenuli su projekat s jasnom vizijom: učiniti sajber sigurnost pristupačnom, zabavnom i praktičnom za svakoga, bez potrebe za skupim hardverom ili komplikovanim instalacijama virtuelnih mašina.

Šta TryHackMe čini idealnim resursom za bh. učenike, studente i prekvalifikante?
• Virtuelna mašina jednim klikom: Korisnik direktno unutar svog web pretraživača pokreće pravu Linux ili Windows instancu sa svim alatima (Kali Linux, Wireshark, Nmap, Burp Suite), bez opterećenja vlastitog računara.
• Gejmifikovane učionice (Rooms): Kroz interaktivne zadatke i scenarije tipa 'uhvati zastavicu' (Capture The Flag - CTF), polaznici rješavaju stvarne bezbjednosne ranjivosti.
• Putevi učenja (Learning Paths): Strukturisani programi vode polaznika od apsolutnog početnika ('Pre-Security', 'Introduction to Cyber Security') do naprednih uloga ('Jr Penetration Tester', 'SOC Level 1 Analyst').

Kompanija B&H Assistant d.o.o. toplo preporučuje mladim talentima u Zenici i BiH da iskoriste ove besplatne i pristupačne resurse kako bi stekli vještine koje su danas među najtraženijima i najplaćenijima na globalnom IT tržištu rada.`,
    imageUrl: IMAGES.tryhackmeBanner,
    published: true,
    tags: ["TryHackMe", "Sajber Sigurnost", "IT Obuka", "Hakeri", "Edukacija", "Tehnologija"]
  },
  {
    id: "news-scena-print",
    title: "Podijeljeno prvih 300 printanih primjeraka urbanog magazina SCENA+",
    slug: "scena-magazin-print-izdanje-podjela",
    category: "SCENA+ Magazin",
    date: "25. Juli 2026.",
    author: "Alen Jusufović, Glavni urednik",
    excerpt: "Prvo štampano izdanje SCENA+ magazina sa temama iz bh. kulture, umjetnosti i arheologije uspješno je podijeljeno čitaocima u Zeničko-dobojskom kantonu i šire.",
    content: `Veliki izdavački poduhvat kompanije B&H Assistant d.o.o. Zenica — premijerno štampano izdanje magazina SCENA+ (Broj 1 / 2026) — doživjelo je izuzetan uspjeh! Kompletan pripremljeni tiraž od prvih 300 besplatnih printanih primjeraka uspješno je distribuiran čitaocima, kulturnim radnicima, omladinskim udruženjima i poslovnim partnerima širom Zeničko-dobojskog kantona.

Magazin SCENA+ pokrenut je pod sloganom 'Spajamo kulture - stvaramo šanse' kao odgovor na deficit kvalitetnog, nezavisnog i vizuelno raskošnog štampanog medija koji afirmiše autentični urbani identitet Zenice i Bosne i Hercegovine. Na 40 bogato opremljenih stranica, prvo izdanje donosi:
• Ekskluzivni intervju i vizuelni esej sa zeničkim vizuelnim umjetnikom Danilom Kesom pod nazivom 'Mrak koji svijetli', posvećen underground kulturi i kolekcionarstvu gramofonskih ploča;
• Stručni arheološki pregled srednjovjekovnih stećaka i kulturne baštine Bosne i Hercegovine;
• Analitički osvrt na uspon domaćih mikro-pivara i craft gastronomije u centralnoj Bosni;
• Tehnološki pregled regulacije kripto-imovine i prve domaće licencirane mjenjačnice digitalne imovine BCX;
• Analizu učešća i liderskih pozicija žena u bankarskom i finansijskom sektoru BiH.

Pored fizičkog izdanja koje je podijeljeno u kulturnim centrima, bibliotekama i kultnim gradskim kafeterijama, magazin je u potpunosti digitalizovan. Svi građani i ljubitelji pisane riječi mogu besplatno prelistati interaktivno e-izdanje u visokoj rezoluciji putem zvanične Canva platforme integrisane na našem portalu www.bh-assistant.ba. Uredništvo već intenzivno priprema materijale za predstojeće jesenje izdanje magazina SCENA+.`,
    imageUrl: IMAGES.scenaCover,
    published: true,
    tags: ["SCENA+", "Kultura", "Print", "Zenica", "Izdavaštvo", "Umjetnost"]
  },
  {
    id: "news-dani-keso-art",
    title: 'Danilo Keso Art: "Mrak koji svijetli" i Vinyl kultura Zenice',
    slug: "danilo-keso-art-mrak-koji-svijetli",
    category: "SCENA+ Magazin",
    date: "16. August 2026.",
    author: "Alen Jusufović, Glavni urednik magazina SCENA+",
    excerpt: "Ekskluzivni intervju i vizuelni esej o radovima i vinyl kolekciji Danila Kese u prvom izdanju magazina SCENA+.",
    content: `U centralnom tematu rubrike Kultura & Umjetnost prvog izdanja magazina SCENA+, uredništvo donosi opširan analitički osvrt na stvaralački opus zeničkog autora Danila Kese. Pod konceptualnim nazivom 'Mrak koji svijetli', Keso kroz specifičnu likovnu poetiku, eksperimentalnu grafiku i analogne medije dekonstruiše industrijsku prošlost Zenice i pretvara je u univerzalni umjetnički krik.

Posebno poglavlje intervjua posvećeno je Kesinoj impresivnoj kolekciji gramofonskih ploča (vinyla) koja broji više od hiljadu rijetkih izdanja jazz, rock, funk i jugoslovenske underground muzike. U vremenu kada digitalni algoritmi i kompresovani audio formati diktiraju površnu konzumaciju zvuka, vinyl kultura predstavlja čin otpora i povratak istinskoj posvećenosti slušanju muzike.

"Gramofonska ploča traži ritual. Traži da uzmete omot u ruke, pročitate ko je svirao bas, pogledate artwork i posvetite 45 minuta albumu kao cjelini. Zenica ima nevjerovatno bogatu muzičku i vizuelnu tradiciju koja je nepravedno zapostavljena, i kroz magazin SCENA+ želimo taj duh prenijeti novim generacijama", ističe autor u razgovoru.

Kompletan esej, popraćen fotografijama radova u visokoj rezoluciji i audio preporukama, dostupan je čitaocima unutar digitalnog izdanja magazina SCENA+ na našem web portalu.`,
    imageUrl: IMAGES.daniKesoArt,
    externalUrl: "https://canva.link/9kf68sd8mgd2p0f",
    published: true,
    tags: ["Danilo Keso", "SCENA+", "Vinyl", "Umjetnost", "Zenica", "Kultura"]
  },
  {
    id: "news-craft-pivare",
    title: "Craft Pivare & Ugostiteljstvo: Uspon domaće craft scene u BiH",
    slug: "craft-pivare-ugostiteljstvo-uspon-domace-craft-scene-u-bih",
    category: "Lokalna Scena & Biznis",
    date: "15. August 2026.",
    author: "B&H Assistant Redakcija",
    excerpt: "Kako domaći mikro-proizvođači i inovativni ugostitelji kreiraju novu gastronomsku i turističku ponudu u regiji.",
    content: `Craft pivarstvo u Bosni i Hercegovini posljednjih godina prošlo je fascinantan put od entuzijastičnih kućnih eksperimenata u podrumima i garažama do profesionalno uređenih mikro-pivara koje proizvode piva vrhunskog svjetskog kvaliteta. U novoj privrednoj reportaži magazina SCENA+, istražujemo kako domaći craft pivari mijenjaju kulturu ugostiteljstva i otvaraju nova radna mjesta u Zeničko-dobojskom kantonu i šire.

Za razliku od masovnih industrijskih piva koja se fokusiraju na jeftine sirovine i agresivni marketing, domaći zanatski pivari koriste isključivo kvalitetan ječmeni i pšenični slad, odabrane sorte hmelja, kvasce vrhunskog vrenja i čistu izvorsku bosansku vodu. Od osvježavajućih Pale Ale i IPA stilova do punih crnih Stout i Porter piva, ponuda se odlikuje slojevitim aromama citrusa, borovine, čokolade i pržene kafe.

Pored samog proizvodnog procesa, reportaža se bavi i ekonomskim izazovima sa kojima se susreću mali domaći proizvođači:
• Visoka akcizna opterećenja i komplicirane administrativne procedure za registraciju malih pogona;
• Ovisnost o uvozu specijalnih hmeljeva i sladova;
• Nelojalna konkurencija velikih multinacionalnih pivarskih grupacija na policama trgovačkih lanaca.

Ipak, zahvaljujući strasti, beskompromisnom kvalitetu i direktnoj vezi sa publikom kroz craft festivale i tematske pubove, domaća craft scena u BiH nastavlja rasti i privlačiti turiste željne autentičnih lokalnih doživljaja.`,
    imageUrl: IMAGES.craftPivare,
    externalUrl: "https://canva.link/jby4js35s2iizx7",
    published: true,
    tags: ["Craft Pivare", "Ugostiteljstvo", "Lokalna Scena", "BiH", "Poduzetništvo", "Privreda"]
  },
  {
    id: "news-gaming-parivantanam",
    title: "Gaming Parivantanam & Emisija Propuh: Urbani Glas Nove Generacije",
    slug: "gamin-parivantanam-emisija-propuh-urbani-glas-nove-generacije",
    category: "Omladina & Mediji",
    date: "14. August 2026.",
    author: "B&H Assistant Omladinska Redakcija",
    excerpt: "Gaming kultura, streaming i nezavisni radijski eter koji okuplja mlade stvaraoce i gamere u ZDK.",
    content: `Tradicionalni mediji u Bosni i Hercegovini decenijama ignorišu interese, govor i stvaralačke platforme mladih generacija. Mladi danas ne gledaju televizijske dnevnike; njihova pažnja usmjerena je na Twitch streamove, YouTube formate, Discord zajednice i interaktivni svijet video igara.

Prepoznajući ovaj medijski jaz, magazin SCENA+ u partnerstvu sa projektom Gaming Parivantanam i kultnom radijskom emisijom 'Propuh' otvorio je vrata mladim autorima iz Zenice i regije. Kroz ovaj serijal istražujemo:
• E-sport kao legitimnu industriju: Kako domaći timovi i gejmeri postižu zapažene rezultate na regionalnim takmičenjima u naslovima poput Counter-Strike 2, Dota 2 i Rocket League;
• Razvoj video igara (Game Development): Prve korake mladih programera i 3D modelara iz BiH koji u Unity i Unreal pogonima kreiraju vlastite igre;
• Nezavisni radijski eter: Značaj emisije 'Propuh' koja već godinama u eteru njeguje alternativni zvuk, omladinski aktivizam i beskompromisnu kritiku društvene stvarnosti.

Kroz sinergiju sa digitalnim platformama B&H Assistant-a, ovaj projekat pruža mentorstvo mladima koji žele savladati osnove video montaže, digitalnog marketinga i zvučnog dizajna.`,
    imageUrl: IMAGES.gamingParivantanam,
    externalUrl: "https://canva.link/vxekpnx0ow1xvt9",
    published: true,
    tags: ["Gaming Parivantanam", "Emisija Propuh", "Gaming", "Mladi", "E-Sport", "Zenica"]
  },
  {
    id: "news-bcx-krypto",
    title: "BCX Krypto & Zakonodavni Okvir: Razvoj Digitalne Imovine u BiH",
    slug: "bcx-krypto-vlada-digitalne-inicijative",
    category: "Tehnologija & Kripto",
    date: "13. August 2026.",
    author: "IT Analitika B&H Assistant",
    excerpt: "Pregled regulatornih i tehnoloških koraka ka integraciji blockchain rješenja i licencirane mjenjačnice digitalne imovine u Bosni i Hercegovini.",
    content: `Tržište digitalne imovine (kriptovaluta) u Bosni i Hercegovini u posljednjih nekoliko godina doživljava značajnu transformaciju iz neregulisanog prostora u institucionalno uređen finansijski ekosistem. Ključni nosilac ove digitalne tranzicije jeste Balkan Crypto Exchange (BCX.ba) — prva zvanična i licencirana platforma za trgovanje digitalnom imovinom sa sjedištem u Bosni i Hercegovini.

Za domaće privrednike, programere i građane, postojanje regulisane domaće berze nosi krucijalne prednosti:
1. Direktne BAM uplate i isplate: Korisnici ne moraju prolaziti kroz komplikovane inostrane posrednike i plaćati visoke naknade za međunarodne doznake (SWIFT). Kupovina i prodaja Bitcoina, Ethereuma, Tethera i drugih digitalnih valuta odvija se direktno putem domaćih bankovnih računa u konvertibilnim markama.
2. Pravna sigurnost i AML/KYC usklađenost: Platforma posluje u strogom skladu sa zakonima o sprečavanju pranja novca i finansiranja terorizma, pružajući klijentima transparentne izvode i fiskalno validne potvrde o transakcijama.
3. Zaštita potrošača: Sredstva korisnika čuvaju se na sigurnim 'cold storage' novčanicima uz višestruke sigurnosne protokole.

U analitičkom članku magazina SCENA+ detaljno se razmatraju i predstojeće zakonodavne inicijative u Parlamentu FBiH i institucijama BiH koje imaju za cilj donošenje cjelovitog Zakona o digitalnoj imovini, po uzoru na evropsku MiCA regulativu. Time će se omogućiti legalno privlačenje stranog kapitala, razvoj Web3 kompanija i nova radna mjesta u sektoru finansijskih tehnologija (FinTech).`,
    imageUrl: IMAGES.bcxKrypto,
    published: true,
    tags: ["BCX Krypto", "Blockchain", "Fintech", "BiH", "Digitalna Imovina", "Regulativa"]
  },
  {
    id: "news-ornaments-of-bosnia-video",
    title: "ORNAMENTI BOSNE: Objavljena video prezentacija — Jedini digitalni proizvod sa dostavom na USB sticku!",
    slug: "ornamenti-bosne-video-prezentacija-usb-dostava",
    category: "Dizajn & Kulturna Baština",
    date: "14. August 2026.",
    author: "Kreativni Odjel B&H Assistant",
    excerpt: "Objavljena je zvanična video prezentacija kolekcije 'ORNAMENTI BOSNE' (https://youtu.be/CyJx3h3nGyA). Jedini digitalni proizvod koji se dostavlja direktno na Vašu adresu na USB Memory Sticku uz sigurno plaćanje po preuzimanju (pouzećem).",
    content: `B&H Assistant d.o.o. Zenica sa izuzetnim ponosom predstavlja zvaničnu video prezentaciju kapitalnog projekta digitalizacije kulturno-historijskog naslijeđa: 'ORNAMENTI BOSNE' (I. Izdanje 2026).

Srednjovjekovni bosanski stećci, uvršteni na UNESCO-vu listu svjetske kulturne baštine, predstavljaju neprocjenjivo blago klesarske umjetnosti, filozofije i duhovnosti drevne Bosne. Međutim, autentični ornamenti — poput ljiljana, stilizovanih polumjeseca, rozeta, spirala, jelena i prepoznatljive figure viteza sa podignutom rukom — do sada nisu bili sistematski preneseni u savremene vektorske i računarske formate prilagođene modernom web i grafičkom dizajnu.

Kolekcija 'ORNAMENTI BOSNE' sadrži stotine precizno precrtanih, matematički kodiranih i optimizovanih motiva u formatima:
• SVG (Scalable Vector Graphics) za bezgubitno skaliranje u dizajnu;
• PNG visoke rezolucije sa transparentnom pozadinom za brzu upotrebu;
• Gotove HTML i CSS kodove za brzu implementaciju na modernim web stranicama i aplikacijama.

Posebnost i unikatna vrijednost ovog proizvoda jeste u distribucijskom modelu: ORNAMENTI BOSNE su JEDINI digitalni proizvod na domaćem tržištu koji se kupcima ne šalje putem sumnjivih linkova za preuzimanje, već se fizički isporučuje na visokokvalitetnom brendiranom USB Memory Sticku direktno na kućnu ili poslovnu adresu širom Bosne i Hercegovine. Plaćanje se vrši sigurno i jednostavno — po preuzimanju pošiljke od kurirske službe (pouzećem).

Zvanični video u visokoj rezoluciji možete pogledati na našem kanalu:
• Bosanska verzija prezentacije: https://youtu.be/CyJx3h3nGyA
• Međunarodni digitalni katalog na engleskom jeziku: https://youtu.be/VXc7aCa-Auc

Prezentaciju i katalog možete naručiti ili pregledati putem našeg odjeljka za digitalne resurse ili kontaktiranjem našeg prodajnog tima na info@bh-assistant.ba.`,
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
    content: `Kao mlada, inovativna i zvanično registrovana domaća IT firma u Zenici (JIB 4219296620005, MBS 43-01-0177-25), B&H Assistant d.o.o. izgradila je jedinstven digitalni ekosistem koji spaja privredni razvoj, praktičnu pomoć građanima, očuvanje kulturne baštine i nezavisno izdavaštvo.

Naš suite trenutno obuhvata sljedeće integrisane platforme i usluge:
1. BH KONVER (bh-konver.lovable.app): Nagrađivani kalkulator poreza, valuta i generator službenih pravnih izjava. Pobjednik Bravo takmičenja i Aplikacija Sedmice na Lovable platformi, sa predstojećim nativnim iOS i Android aplikacijama.
2. BH PapirFinder (bhpapirfinder.atoms.world): Centralni registar i digitalni vodič za administrativne takse, obrasce i e-upravu koji štedi sate čekanja na općinskim šalterima.
3. Ornamenti Bosne: Digitalizovana kolekcija stećaka i kulturne baštine na USB memorijskom sticku sa sigurnom dostavom na adresu i plaćanjem pouzećem.
4. SCENA+ Magazin: Prvi urbani magazin Zeničko-dobojskog kantona sa printanim izdanjem (podijeljeno 300 besplatnih primjeraka) i interaktivnim e-čitačem.
5. ZENTAXI & GUMMI: Inovativna gradska dispečerska mreža i besplatna edukativna bojanka za djecu.
6. Usluge po mjeri: Profesionalna izrada modernih web stranica, optimizacija za pretraživače (SEO), hosting i korporativni e-mail sistemi.

Pozivamo domaće kompanije, općinske službe i omladinske organizacije da nam se jave za zajedničke projekte i digitalna partnerstva. Spajamo kulture — stvaramo šanse!`,
    imageUrl: IMAGES.ourProducts,
    published: true,
    tags: ["Our Products", "Digitalni Ekosistem", "Mobilne Aplikacije", "Zenica", "IT Usluge"]
  }
];

const STORAGE_KEY = 'bh_assistant_news_articles';

const AFFILIATE_ARTICLE_IDS = new Set([
  'news-job-media-buyer',
  'news-touch-ecommerce',
  'news-monday-com',
  'news-atoms-dev',
  'news-kaspersky-security-partner',
  'news-alison-partner',
  'news-xpuvo-partner',
  'news-rzekl-partner',
  'news-remoterocketship-partner',
  'news-1',
  'news-3',
  'news-4'
]);

export const getStoredNews = (): NewsArticle[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed: NewsArticle[] = JSON.parse(data);
      const filteredParsed = parsed.filter(a => {
        if (AFFILIATE_ARTICLE_IDS.has(a.id)) return false;
        if (a.id.includes('remoterocket')) return false;
        if (a.externalUrl && (
          a.externalUrl.includes('wbbsv.com') ||
          a.externalUrl.includes('dhwnh.com') ||
          a.externalUrl.includes('rzekl.com') ||
          a.externalUrl.includes('xpuvo.com') ||
          a.externalUrl.includes('try.monday.com') ||
          a.externalUrl.includes('tolt.link') ||
          a.externalUrl.includes('admitad') ||
          a.externalUrl.includes('affiliate') ||
          a.externalUrl.includes('remoterocket')
        )) return false;
        if (a.tags && a.tags.some(t => t.toLowerCase() === 'affiliate')) return false;
        if (a.title && (
          a.title.toLowerCase().includes('remote rocketship') ||
          a.title.toLowerCase().includes('gummi učenje je zabava') ||
          a.title.toLowerCase().includes('touch.com.ua') ||
          a.title.toLowerCase().includes('media buyer') ||
          a.title.toLowerCase().includes('monday.com') ||
          a.title.toLowerCase().includes('kaspersky')
        )) return false;
        return true;
      });
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
