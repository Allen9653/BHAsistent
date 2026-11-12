import React from 'react';
import { NewsArticle } from '../types';
export type { NewsArticle };
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
    id: "news-skilledbridge-radna-snaga-bih",
    title: "Rješenje za nedostatak radne snage u Vašoj firmi!",
    slug: "rjesenje-za-nedostatak-radne-snage-skilledbridge",
    category: "Biznis & Zapošljavanje",
    date: "23. Oktobar 2026.",
    author: "Alen Jusufović, SkilledBridge d.o.o. & B&H Assistant",
    excerpt: "Nedostatak kvalifikovanih i pouzdanih radnika u građevinarstvu, proizvodnji, ugostiteljstvu i uslužnim djelatnostima u BiH zahtijeva hitan i profesionalan odgovor. SkilledBridge d.o.o. nudi legalno rješenje 'ključ u ruke' za uvoz edukovane radne snage iz Azije uz brzu realizaciju, pravnu sigurnost i strogu selekciju.",
    content: `Tržište rada u Bosni i Hercegovini prolazi kroz najveću krizu radne snage u modernoj historiji. Masovni odliv stanovništva i odlazak stručnog kadra prema zemljama Zapadne Evrope doveli su domaće privrednike pred zid: građevinski projekti kasne, proizvodne linije smanjuju kapacitete, a ugostiteljski i turistički objekti primorani su skraćivati radno vrijeme ili odbijati goste.

Koji su sektori u Bosni i Hercegovini najteže pogođeni?

1. Građevinarstvo i niskogradnja: Izuzetno izražen deficit majstora svih profila — od zidara, tesara, armirača i keramičara do rukovalaca teškom građevinskom mehanizacijom i kranista.
2. Proizvodnja i prerađivačka industrija: Nedostatak operatera na CNC mašinama, certificiranih zavarivača, bravara, radnika u metalskom, drvnom i prehrambenom sektoru.
3. Ugostiteljstvo i turizam: Hronični manjak profesionalnih kuhara, pomoćnih radnika u kuhinji, konobara i sobarica u hotelima širom BiH.
4. Uslužne i logističke djelatnosti: Nedostatak skladištara, vozača teretnih vozila i radnika na održavanju objekata i komunalne infrastrukture.

Za mnoge domaće kompanije, nemogućnost pronalaska odgovarajućeg osoblja više ne predstavlja samo operativni problem — to je postalo direktno pitanje opstanka na tržištu i ispunjavanja ugovorenih obaveza.

Kako SkilledBridge d.o.o. rješava ovaj problem za poslodavce?

SkilledBridge d.o.o. je specijalizovana agencija koja pruža kompletne usluge međunarodne regrutacije, uvoza i pravne dokumentacije za provjerenu i edukovanu radnu snagu iz Azije (Filipini, Nepal, Indija, Vijetnam i druge regije sa visokom koncentracijom kvalifikovanih radnika). 

Umjesto da domaći poslodavac gubi mjesece u komplikovanim birokratskim procedurama, SkilledBridge d.o.o. preuzima cjelokupan proces po modelu "ključ u ruke":

Ključne prednosti saradnje sa SkilledBridge d.o.o.:

• BRZA I EFIKASNA REALIZACIJA: Od inicijalne analize potreba Vaše kompanije do organizovanog dolaska radnika na radno mjesto u BiH, vodimo kompletan vremenski raspored, uključujući logistiku letova i doček kandidata.
• POTPUNA PRAVNA SIGURNOST: Naš pravni tim preuzima pripremu i predaju sve potrebne dokumentacije pred nadležnim institucijama (kantonalne i entitetske službe za zapošljavanje, Ministarstvo sigurnosti BiH, Služba za poslove sa strancima, MUP). Obezbjeđujemo radne dozvole, privremeni boravak, rješenja i usklađenost sa zakonima o radu.
• PAŽLJIVA I RIGOROZNA SELEKCIJA KANDIDATA: Svaki kandidat prolazi višestepenu provjeru radnog iskustva, praktično testiranje vještina u struci, provjeru znanja engleskog jezika, detaljne medicinske preglede i obaveznu sigurnosnu provjeru nekažnjavanja.
• PODRŠKA PRI INTEGRACIJI: Pružamo mentorsku podršku radnicima pri dolasku u Bosnu i Hercegovinu, prilagođavanju lokalnoj kulturi i upoznavanju sa standardima zaštite na radu u Vašoj firmi.

Nemojte dozvoliti da nedostatak radnika zaustavi rast Vašeg biznisa. Osigurajte stabilnu, motivisanu i dugoročnu radnu snagu koja garantuje realizaciju Vaših ugovorenih poslova.

POZIV NA AKCIJU ZA PRIVREDNIKE I POSLODAVCE U BIH:

Prijavite potrebe Vaše firme direktno putem zvanične web stranice:
👉 https://www.skilledbridge.ba/kontakt

Ili pošaljite direktan upit za besplatne konsultacije i specifikaciju radnih mjesta:
📧 E-mail: alen.jusufovic@skilledbridge.ba

Zvanični vizuelni identitet i logotip: SkilledBridge d.o.o. (dostupan na https://archive.org/details/skilled-bridge-d.o.o.-logotype).`,
    imageUrl: IMAGES.skilledBridgeAdBanner,
    published: true,
    tags: [
      "SkilledBridge",
      "skilledbridge",
      "radna snaga",
      "nedostatak radne snage",
      "građevinarstvo",
      "proizvodnja",
      "ugostiteljstvo",
      "uvoz radnika",
      "radnici iz azije",
      "radne dozvole bih",
      "poslodavci bih",
      "Biznis Partnerstva",
      "Alen Jusufović"
    ]
  },
  {
    id: "news-bh-konver-glavna",
    title: "BH KONVER – Autorski softver za brze konverzije i pravne izjave u BiH",
    slug: "bh-konver-autorski-softver-pravne-izjave",
    category: "BH KONVER & IT",
    date: "13. August 2026.",
    author: "Alen Jusufović, Direktor & Softverski Inženjer",
    excerpt: "Predstavljamo BH KONVER — napredni domaći web alat za konverziju valuta, obračune taksi i automatsko generisanje službenih pravnih izjava spremnih za print i ovjeru pred notarom ili u općini.",
    content: `BH KONVER predstavlja vodeće autorsko softversko rješenje u tehnološkom portfoliju domaće IT kompanije B&H Assistant d.o.o. sa sjedištem u Zenici. Aplikacija je ciljano koncipirana i razvijena kako bi riješila svakodnevne administrativne, pravne i finansijske barijere sa kojima se suočavaju građani, preduzetnici i pravni subjekti širom Bosne i Hercegovine.

Ključna inovacija BH KONVER alata ogleda se u automatizovanom generatoru standardizovanih pravnih izjava pod punom materijalnom i krivičnom odgovornošću. Korisnici više ne moraju ručno sastavljati komplikovane pravne formulacije niti plaćati skupe advokatske nacrte za tipske dokumente. Kroz intuitivnu formu na web domeni www.bh-konver.com, građani unose osnovne podatke, a softver u realnom vremenu generiše pravno validne obrasce prilagođene zakonodavstvu Federacije Bosne i Hercegovine i Republike Srpske. Među najčešće korištenim obrascima nalaze se:
• Izjava o zajedničkom domaćinstvu (kućna lista) za potrebe stipendija, dječijih dodataka i socijalnih davanja;
• Izjava o izdržavanju članova uže i šire porodice;
• Izjava o neposjedovanju nepokretne imovine i stambenog prostora;
• Saglasnost roditelja za putovanje maloljetnog djeteta u inostranstvo;
• Standardizovane izjave za apliciranje na javne pozive i grantove.

Svaki generisani dokument automatski se formatira prema propisanim standardima općinskih šaltera i notarskih ureda, spreman za trenutni print ili preuzimanje u PDF formatu.

Pored pravnog modula, BH KONVER posjeduje i visoko precizni kalkulator valuta i finansijskih naknada. Konverzioni mehanizam usklađen je sa zvaničnim kursnim listama Centralne Banke Bosne i Hercegovine (CBBiH), omogućavajući trenutne i tačne preračune između konvertibilne marke (BAM), eura (EUR), američkog dolara (USD), švicarskog franka (CHF) i drugih vodećih svjetskih valuta. Za razliku od generičkih globalnih kalkulatora, BH KONVER automatski uračunava domaće bankarske provizije, administrativne takse i specifičnosti bh. platnog prometa.

Korištenje osnovnih funkcionalnosti aplikacije u potpunosti je besplatno za sve građane Bosne i Hercegovine i dijasporu. Aplikacija poštuje najviše standarde privatnosti korisničkih podataka: svi uneseni podaci obrađuju se isključivo u lokalnom pretraživaču (client-side) i ne pohranjuju se na udaljene servere bez izričitog odobrenja korisnika. Isprobajte aplikaciju na adresi https://www.bh-konver.com/.`,
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

S ciljem sistematskog rješavanja ovog problema, B&H Assistant d.o.o. Zenica razvio je BH PapirFinder — centralizovani registar i pametni vodič kroz e-upravu i općinsku dokumentaciju koji se priprema za lansiranje na oficijelnoj domeni www.papir-finder.com (dostupan na https://papir-finder.vercel.app/).

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
    imageUrl: IMAGES.bhKonverBanner,
    published: true,
    tags: ["BH Konver", "Aplikacija Sedmice", "Lovable", "iOS", "Android", "B&H Assistant", "Nagrada"]
  },
  {
    id: "news-vocal-chops-epic-hooks",
    title: "Produkcija Vokalnih Isječaka (Vocal Chop): Kako Bilo Koji Vokal Pretvoriti U Epsku Melodiju (Hook)",
    slug: "vokalni-chopovi-kreiranje-epskih-hookova-u-modernoj-produkciji",
    category: "Muzička Produkcija & Audio Dizajn",
    date: "9. Novembar 2026.",
    author: "W. A. Production",
    excerpt: "Naučite kako da sirove vokalne stemove pretvorite u hipnotičke vokalne isječke spremne za radio. Otkrijte tehnike sakupljanja uzoraka, štemanja i obrade koje će podići vaše trake na viši nivo.",
    content: `PRODUKCIJA VOKALNIH ISJEČAKA (VOCAL CHOP): KAKO BILO KOJI VOKAL PRETVORITI U EPSKU MELODIJU (HOOK)

Naučite kako da sirove vokalne stemove pretvorite u hipnotičke vokalne isječke spremne za radio. Otkrijte tehnike sakupljanja uzoraka, štemanja i obrade koje će podići vaše trake na viši nivo.

novembar 2026. · W. A. Production

Od future bassa i deep house-a do modernog popa i hip-hopa, melodični vokalni isječci (vocal chops) postali su neizostavan zaštitni znak u elektronskoj muzici. Dobro osmišljena vokalna melodija donosi emociju, ljudsku toplinu i nezaboravan potencijal "crva u uvu" (earworm) koji standardne sintisajzerske vodeće linije često teško uspijevaju da repliciraju. Međutim, ubacivanje nasumičnih vokalnih isječaka u sampler rijetko daje rezultate spremne za top-liste.

Stvaranje zadivljujućih vokalnih melodija zahtijeva ravnotežu promišljenog odabira uzoraka, ritmičke namjere, inventivne manipulacije visinom tona i uglađene prostorne obrade. U ovom praktičnom vodiču razložićemo tačan radni tok koji vam je potreban da obične suve vokale pretvorite u inspirativne, dinamične dionice koje će ostati u glavi vašeg slušaoca.

1. Pronalaženje i priprema sirovog materijala

Odlični vokalni isječci počinju na samom izvoru. Iako možete isijecati pune vokalne fraze, održavani zvukovi samoglasnika, čisti ad-libovi i zadihani produženi tonovi uglavnom vam daju najfleksibilniju paletu. Udarni suglasnici poput "k", "t" i "p" mogu pružiti prodoran tranzijentni napad, dok otvoreni samoglasnici poput "ah", "oh" i "ee" obezbjeđuju muzički sustain (održavanje).

Prije nego što počnete sa sječenjem, provjerite da li je vaš sirovi vokalni fajl čist. Primijenite blagi high-pass filter oko 100 Hz da uklonite tutnjavu, odstranite oštre sibilante pomoću de-essera i koristite transparentni gating ili ručno uređivanje da prigušite neželjenu sobnu buku između snimanja. Ako nemate pristup originalnoj studijskoj sesiji, istražite pažljivo odabrane pakete uzoraka (sample packs) ispunjene besplatnim vokalnim frazama, suvim snimcima i čistim one-shotovima dizajniranim posebno za isjecanje.

2. Mapiranje u sampleru naspram sječenja na vremenskoj liniji (Timeline)

Producenti obično pristupaju vokalnom sječenju na dva primarna načina: učitavanjem isječaka u klavijaturni sampler ili ručnim uređivanjem audio klipova direktno na DAW vremenskoj liniji.

Radni tok sa samplerom: Ubacite svoje isječke u izvorni sampler vašeg DAW-a (kao što su Abletonov Simpler ili FL Studio Slicex). Mapirajte različite tačke tranzijenata na vaš MIDI kontroler ili klavijaturu. Ova metoda vam omogućava da svirate isječke poput instrumenta, u hodu testirajući melodične varijacije, intervale i sinkopirane ritmove.

Uređivanje audio zapisa: Sječenje audio isječaka direktno na vašoj vremenskoj liniji daje vam detaljnu kontrolu nad kovertantima visine tona, pojedinačnim pojačanjima klipova, ukrštenim prelazima (crossfades) i obrtanjem elemenata. Mnogi vrhunski producenti kombinuju oboje: razrađuju ideje unutar samplera kako bi otkrili melodiju, prebacuju rezultat u audio i vrše mikro-izmjene direktno na mreži aranžmana.

Pobrinite se da primijenite male ukrštene prelaze (2 do 5 milisekundi) na početak i kraj svakog isječka. Ovo sprječava dosadne digitalne klikove i pucketanja svaki put kada se uzorak pokrene.

3. Štamanje, pomjeranje visine tona (Pitch Shifting) i igra sa formantima

Sirovi vokalni isječci zvuče najbolje kada se uklapaju u harmonijski okvir vaše pjesme. Kada izolujete jake samoglasnike, identifikujte njihove korijenske tonove (root pitches). Koristite tjuner plugin da provjerite da li svaki isječak čisto odgovara skali vaše pjesme.

Tajno oružje modernog vokalnog isječka je pomjeranje formanta (formant shifting). Standardna transpozicija visine tona mijenja i ton i percipiranu fizičku veličinu vokalnog trakta pjevača. Odvajanjem visine tona od formanta pomoću specijalizovanih pluginova za visinu tona i modulaciju (plugins), možete transponovati vokalne isječke za oktavu gore ili dole a da vokal ne pretvorite u neprirodnu crtanu vjevericu ili nerazumljivo čudovište.

Pokušajte da kreirate dva kontrastna sloja: jedan usredsređen na prirodnu isporuku formanta za melodijsku definiciju, i duplirani sloj spušten za oktavu sa sniženim formantima, suptilno izmiješan ispod za toplinu i grubost.

4. Razvijanje melodičnog pitanja i odgovora (Call-and-Response)

Uobičajena zamka kod vokalnih isječaka je nemilosrdno ponavljanje koje zamara uho. Da biste izgradili aranžman koji održava energiju, oslonite se na klasičnu frazeologiju pitanja i odgovora:

Pitanje (Taktovi 1-2): Predstavite svoj glavni sinkopirani motiv. Neka ritam bude udaran, ostavljajući prostor za disanje prije sljedeće fraze.

Odgovor (Taktovi 3-4): Odgovorite na početnu frazu koristeći varijaciju. Podignite ili spustite završni isječak kako biste razriješili muzičku misao.

Varijacija (Taktovi 5-8): Ponavljajte obrazac, ali izmijenite kraj 8. takta brzim zatajkivanjem (stutter), padom visine tona ili obrnutim isječkom kako biste glatko prešli u sljedeću sekciju.

Ako se zaglavite u kreativnoj rutini dok aranžirate melodije i harmonije, učenje strukturiranih kompozicionih radnih tokova kroz namjenske kurseve muzičke produkcije (courses) može dramatički da izoštri vaše fraziranje, interakciju akorda i trening sluha.

5. Miksanje i prostor: Stapanje isječaka u miks

Budući da se vokalni isječci sastoje od fragmentiranih audio segmenata, mogu zvučati nepovezano sa ostatkom vaše produkcije ako se ostave bez obrade. Njihovo stapanje u miks zahtijeva stratešku dinamiku i ambijentalnu obradu.

Zauzdajte dinamiku
Brzi tranzijenti iz isječenih slogova mogu agresivno da strše. Koristite prodoran kompresor sa srednjim napadom (attack) i brzim otpuštanjem (release) kako biste stegli dinamički opseg za 3 do 6 dB. Nakon toga primijenite blagu saturaciju trake ili cijevi kako biste uveli harmonijske prizvuke koji zaokružuju oštre digitalne vrhove.

Dizajnirajte dimenziju pomoću reverba i delay-a
Suvi vokalni isječci rijetko dobro leže preko gustih sintisajzera i bubnjeva. Pošaljite svoju sabirnicu vokalnih isječaka (vocal chop bus) na pomoćni povrat (aux return) na kojem rade 1/8 ping-pong delay i bujni pločasti reverb (plate reverb) sa srednjim vremenom raspada. Da biste spriječili da obrada uguši vaš ritam, ubacite ducking plugin ili sidechain kompresor na povratni kanal reverba vezan za suve vokalne isječke; ovo drži direktni tranzijent oštrim i u prvom planu, dopuštajući da atmosferski reverb procvjeta tokom pauza.

Izdubite spektralni prostor
Provjerite kako vaš vokalni isječak stupa u interakciju sa drugim vodećim instrumentima. Ako vaši akordi i sintisajzeri zauzimaju opseg od 1 kHz do 3 kHz, primijenite blage rezove dinamičkog EQ-a kako biste oslobodili prostor da vokalni isječci iskoče naprijed. Možete nabaviti sveobuhvatne pakete alata i radne setove u odabranim producentskim paketima (bundles) kako biste osigurali da vaš lanac miksanja ima precizne dinamičke ekvilajzere, kompresore i saturatore koji su vam potrebni.

Zaključak
Pretvaranje sirovih vokalnih stemova u živopisne vokalne isječke pune pamtljivih melodija jedna je od najkorisnijih vještina u modernoj produkciji. Pažljivim odabirom uzoraka samoglasnika, štamanjem isječaka sa namjenskom kontrolom formanta, kreiranjem dinamičnog fraziranja pitanja i odgovora, te smještanjem isječaka unutar kontrolisanog trodimenzionalnog stereo prostora, možete bilo koje obično vokalno pjevanje pretvoriti u ključnu melodiju vaše sljedeće trake. Upalite svoj DAW, otvorite sampler i počnite sa sječenjem!
`,

    imageUrl: IMAGES.vocalChopArticle,
    externalUrl: "https://www.waproduction.com/#x3a36xuougf0v",
    ctaText: "Preuzmi besplatne šablone, džinglove i muziku (WA Production) ↗",
    published: true,
    tags: ["WA Production", "Vocal Chops", "Music Production", "DAW", "MIDI", "Pitch Shifting", "Free Samples", "Hook"]
  },
  {
    id: "news-arrangement-secrets-8-bar-loop",
    title: "Tajne aranžiranja: Kako pretvoriti petlju od 8 taktova u gotovu muzičku traku",
    slug: "tajne-aranziranja-kako-pretvoriti-petlju-od-8-taktova-u-gotovu-muzicku-traku",
    category: "Muzička Produkcija & DAW Savjeti",
    date: "9. Novembar 2026.",
    author: "W. A. Production",
    excerpt: "Otkrijte provjerene tehnike i tajne aranžiranja (arrangement) koje će vam pomoći da savladate blokadu i pređete sa 8-taktne petlje (loop) na punu, gotovu muzičku traku.",
    content: `Tajne aranžiranja: Kako pretvoriti petlju od 8 taktova u gotovu muzičku traku

Otkrijte provjerene tehnike i tajne aranžiranja koje će vam pomoći da savladate blokadu i pređete sa 8-taktne petlje (loop) na punu, gotovu muzičku traku.

Svaki producent je prošao kroz ovo: napravite savršenu, nabrijanu petlju (loop) od 8 ili 16 taktova koja zvuči nevjerovatno. Bubnjevi udaraju jako, bas grize, melodija ulazi u uši. Pritisnete repeat i slušate je pola sata. Ali, kada dođe vrijeme da se ta petlja razvuče u cijelu pjesmu od 3 minute, magija nestaje, a aranžiranje (arrangement) postaje noćna mora.

Pretvaranje moćne petlje u kompletnu, gotovu pjesmu zahtijeva prelazak sa "kreativnog" na "strukturalni" način razmišljanja. Evo ključnih tajni aranžiranja koje će vam pomoći da savladate ovu prepreku.

1. Uklonite elemente umjesto što dodajete nove

Najčešća greška koju producenti prave kada pokušavaju da razviju aranžman jeste konstantno dodavanje novih instrumenata. Ako vam petlja već zvuči puno, dodavanje novih elemenata u strofi stvoriće haos i gužvu (tzv. mudiness).

Pravilo oduzimanja: Umjesto da gradite strofu dodavanjem, izgradite refren tako što ćete oduzeti ključne elemente (npr. uklonite glavni lead ili perkusije) u uvodnom dijelu ili strofi. Kada udari refren (drop/chorus) i vratite te elemente nazad, slušalac će osjetiti ogroman energetski udar bez dodavanja ijednog novog zvuka.

2. Kreirajte napetost pomoću prelaza i risera (Transitions & Risers)

Prelaz (transition) između sekcija (npr. iz introa u strofu, ili iz strofe u refren) ne smije biti nagao i prazan, osim ako to namjerno ne koristite kao efekat iznenađenja.

Koristite white noise (bijeli šum), filter sweepove, obrnute čingele (reverse cymbals) i automatizaciju glasnoće i cutoff filtera 2-4 takta prije početka nove sekcije. To drži pažnju slušaoca budnom i stvara prirodni momentum.

3. Razbijte monotoniju uz varijacije bubnjeva (Drum Fills)

Ponavljanje potpuno iste matrice bubnjeva 32 takta zaredom ubiće energiju svake pjesme.

Svakih 8 ili 16 taktova ubacite mali prelaz (fill), promijenite hi-hat pattern, dodajte udarac van takta (ghost note) na snare-u ili privremeno stišajte kick. Ove sitne promjene daju pjesmi "ljudski" osjećaj i pokret.

Zaključak

Aranžiranje nije misterija – to je putovanje energije. Vaš zadatak kao producenta je da vodite slušaoca kroz uzbudljivu vožnju: od uvodne zategnutosti, preko opuštanja u strofi, pa sve do vrhunca u refrenu. Iskoristite ove trikove na svojoj sljedećoj sesiji i pretvorite te tvrdoglave 8-taktne petlje u gotove hitove!
`,

    imageUrl: IMAGES.arrangementSecretsArticle,
    externalUrl: "https://www.waproduction.com/#x3a36xuougf0v",
    ctaText: "Preuzmi besplatne šablone, džinglove i muziku (WA Production) ↗",
    published: true,
    tags: ["WA Production", "Arrangement", "Loop", "DAW", "Music Production", "Intro", "Drop", "Transition", "Free Samples"]
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
    id: "news-kreativno-sampliranje",
    title: "Otključavanje moći kreativnog sampliranja u modernoj glazbenoj produkciji",
    slug: "otkljucavanje-moci-kreativnog-sampliranja-u-modernoj-glazbenoj-produkciji",
    category: "Muzička Produkcija & Audio Dizajn",
    date: "9. Novembar 2026.",
    author: "W. A. Production",
    excerpt: "Sampliranje je davno preraslo jednostavno kopiranje dijelova tuđih pjesama. U modernoj produkciji, sampliranje predstavlja duboku umjetnost transformacije neobičnih zvukova u jedinstvene elemente koji definiraju tvoje trake i pomjeraju zvučne granice.",
    metaTitle: "Otključavanje moći kreativnog sampliranja u modernoj glazbenoj produkciji | B&H Assistant",
    metaDescription: "Sampliranje je davno preraslo jednostavno kopiranje dijelova tuđih pjesama. U modernoj produkciji, sampliranje predstavlja duboku umjetnost transformacije neobičnih zvukova u jedinstvene elemente koji definiraju tvoje trake i pomjeraju zvučne granice.",
    ogTitle: "Otključavanje moći kreativnog sampliranja u modernoj glazbenoj produkciji",
    ogDescription: "Sampliranje je davno preraslo jednostavno kopiranje dijelova tuđih pjesama. U modernoj produkciji, sampliranje predstavlja duboku umjetnost transformacije neobičnih zvukova u jedinstvene elemente koji definiraju tvoje trake i pomjeraju zvučne granice.",
    ogLocale: "bs_BA",
    twitterTitle: "Otključavanje moći kreativnog sampliranja u modernoj glazbenoj produkciji",
    twitterDescription: "Sampliranje je davno preraslo jednostavno kopiranje dijelova tuđih pjesama. U modernoj produkciji, sampliranje predstavlja duboku umjetnost transformacije neobičnih zvukova u jedinstvene elemente koji definiraju tvoje trake i pomjeraju zvučne granice.",
    content: `Otključavanje moći kreativnog sampliranja u modernoj glazbenoj produkciji

Sampliranje je davno preraslo jednostavno kopiranje dijelova tuđih pjesama. U modernoj produkciji, sampliranje predstavlja duboku umjetnost transformacije neobičnih zvukova u jedinstvene elemente koji definiraju tvoje trake i pomjeraju zvučne granice.

1. Transformacija nepoznatih i opskurnih zvukova

Umjesto oslanjanja na standardne i već previše korištene zvukove iz tvorničkih setova, kreativno sampliranje potiče istraživanje okoline. Snimanje svakodnevnih zvukova (tzv. found sound ili foley) i njihova naknadna obrada omogućava stvaranje originalnih tekstura koje tvojoj produkciji daju poseban pečat i autentičnost.

2. Manipulacija pitchem, vremenom i granuliranom sintezom

Moderne DAW platforme i plug-inovi (poput pitch-shift i granularnih efekata) omogućavaju da običan zvuk potpuno promijeni oblik:

Time-stretching i pitch-shifting: Rastezanje ili skraćivanje zvukova uz očuvanje ili namjerno uništavanje tonova stvara dramatične atmosfere, usporavanjem vokala dobivaju se duboke i moćne teksture, dok se ubrzavanjem stvaraju zvučni efekti slični efektima zvijezda ili insekata.

Granularna obrada: Rezanje samplova na mikroskopske dijelove ("zrna") i njihovo spajanje u nove, lebdeće padove ili ambijentalne zvučne pejzaže.

3. Obrada kroz efekte i kreativno usmjeravanje (Routing)

Kada imaš zanimljiv sample, prava magija se događa u lancu efekata:

Filtriranje i EQ rezovi: Uklanjanje neželjenih frekvencija kako bi se sample savršeno uklopio u miks s bubnjevima i basom.

Zasićenje (Saturation) i distorzija: Dodavanje topline, prljavštine i karaktera sterilnim digitalnim snimkama kako bi zvučale punije i analogno.

Prostorni efekti (Reverb i Delay): Korištenje dugih reverba na obrnuti način (reverse reverb) ili unikatnih delay efekata unutar povratne petlje (feedback loop) za stvaranje dubine i pokreta.

Zaključak

Kreativno sampliranje je poziv na eksperimentiranje. Pravila ne postoje – cilj je uzeti običan ili neočekivan izvor zvuka i transformirati ga u ritmički ili melodijski element koji će tvoju glazbu izdvojiti iz mase i dati joj unikatnu energiju. Za više preuzimanje free samples, sounds tehnike i software posjetite: https://www.waproduction.com/#x3a36xuougf0v
`,

    imageUrl: IMAGES.wpProductionArticle,
    externalUrl: "https://www.waproduction.com/#x3a36xuougf0v",
    ctaText: "Preuzmi besplatne šablone, džinglove i muziku (WA Production) ↗",
    published: true,
    tags: ["WA Production", "Sampliranje", "Music Production", "DAW", "Pitch Shifting", "Granularna Sinteza", "Free Samples", "Hook"]
  },
  {

    id: "news-video-kao-dizajnerski-element",

    title: "4 načina da koristiš video kao dizajnerski element na web stranici",

    slug: "video-kao-dizajnerski-element",

    category: "Web Dizajn & Razvoj",

    date: "9. Novembar 2026.",

    author: "B&H Assistant",

    excerpt: "Naučite kako da integrišete video u pozadinu ili hero sekciju vaše web stranice uz savjete i praktične promptove za Bolt.",

    content: `Svaka web stranica ima svoju "hero" sliku. Ali danas samo one najmodernije i najprivlačnije stranice koriste video kao ključni dizajnerski element.



Integrisanje videa u pozadinu ili vrh (hero sekciju) tvoje stranice podiže estetski doživljaj na nivo dinamike, pokreta i energije. U nastavku su četiri načina kako možeš koristiti video kao dizajnerski element na web stranici, od kojih svaki sadrži promptove koje možeš kopirati i pokrenuti u Bolt-u.



U nedavnom video tutorijalu, Bolt stručnjak i dizajner Jakub Skrzypczak demonstrirao je kako kreirati četiri zadivljujuća efekta vođena videom:

- Invertovani naslov preko videa (tekst mijenja boje u pozadini)

- 3D nagnuta "prozorska kartica" sa otkrivanjem (video viri kroz maskirani otvor)

- Izrezani tekst (knockout) kroz bijeli sloj + blur (video se vidi kroz slova)

- Kombinacije videa i šejdera (za brzu promjenu atmosfere)



Ako nemaš vremena da gledaš video, ključne tačke sumiramo u nastavku.



Pogledaj Jakubovo demo okruženje: https://video-effects.bolt.host/

Eksperimentiši sa efektima sam: https://bolt.new/~/sb1-ief5nf8c



---



Izbor videa



Naravno, integrisanje videa u dizajn tvoje stranice zahtijeva da prvo izabereš video. Za to imaš dvije opcije:



Opcija A: Korištenje placeholder (zamjenskih) videa (najbrže)

Reci Bolt-u da koristi bilo koju besplatnu zamjensku petlju (loop) dok testiraš ideje za dizajn. Kasnije ga možeš zamijeniti videom koji zaista želiš kada dođe vrijeme za lansiranje stranice.



Opcija B: Upload tvojih vlastitih videa (više kontrole)

U Bolt-u:

- Otvori kod (Open Code)

- Kreiraj folder pod nazivom public/

- Dodaj svoje videe (npr. hero.mp4, forest.mp4, waves.mp4)

- Referenciraj ih u svojim komponentama kao /hero.mp4 itd.



Za najbolje rezultate:

- Neka budu kratki (petlje od 5-12 sekundi rade najbolje)

- Eksportuj u MP4 (H.264), utišano (muted)

- Drži se suptilnih pokreta (zbog čitljivosti teksta)



---



KORAK 1: Izgradnja osnovne stranice



Za potrebe ovog tutorijala, prvi korak je kreiranje osnovne stranice sa kojom možeš eksperimentisati.



Prompt (kopiraj/zalijepi ovo):

Create a single-page "Video Effects Playground" landing page in React + Tailwind.



- Headline style: Normal / Inverted / Framed / Knockout

- Card style: Simple Tilt / Masked Reveal

- Blur behind knockout text: On/Off

- Shader overlay: Off / Mesh / Dither / Dot Grid



Use shadcn UI components for the settings panel. Keep the design minimal and premium. (integrisi slike i video sa ovih Url: https://bolt.new/public-page-assets/media/blog/framer-import/9XkZCLxnHtjODo1AouN3GdAWjQ.webp



https://bolt.new/public-page-assets/media/blog/framer-import/c8J54bmjRwe5iDgTRVOxTGe78.webp



https://video-effects.bolt.host/ )



---



KORAK 2: Izgradnja 3D nagnute "prozorske kartice" sa otkrivanjem grafike(video viri kroz maskirani otvor)



Drugi korak je dodavanje 3D nagnute Oval prozorske kartice sa otkrivanjem grafike i video contentom i shaderima.



Prompt (kopiraj/zalijepi ovo):

Create an interactive video effects component using Three.js/WebGL and Reveal.js.



- Use the videos from the project (hero.mp4, forest.mp4, waves.mp4)

- Add an oval video frame with a 3D tilt that reveals a circle shader texture hidden behind it



Use shadcn UI components for the settings panel. Keep the design minimal and premium. (Prati demo iz: https://video-effects.bolt.host/ )



---



KORAK 3: Izrezani tekst (knockout) kroz bijeli sloj + blur



Treći korak je dodavanje izrezanog (knockout) tekstualnog sloja sa event listenerima i partiklama lišća i snijega i dodavanje blur sloja iza teksta.



Prompt (kopiraj/zalijepi ovo):

Create a single-page "Video Effects Playground" landing page in React + Tailwind.



"An interactive "circular image overlay" that reveals video and serif text stacked in the image's center []''"

Add an interactive "circular image overlay" that reveals video and serif text stacked in the image's center [  ] with a knockout-based text layer, with smooth reveal on scroll, subtle floating particles, and a customizable blur toggle



Use shadcn UI components for the settings panel. Keep the design minimal and premium. (Prati demo iz: https://video-effects.bolt.host/ )



---



KORAK 4: Kombinacije videa i šejdera (za brzu promjenu atmosfere)



Završni korak je dodavanje kombinacija videa sa varijacijama šejdera.



Prompt (kopiraj/zalijepi ovo):

Create a single-page "Video Effects Playground" landing page in React + Tailwind.



Include a "Video Effects Playground" with a "Mix" section, "Musical Sound Effects" and colour-mix functionality on your own video-loop, and Shadcn UI



Use shadcn UI components for the settings panel. Keep the design minimal and premium. (Prati demo iz: https://video-effects.bolt.host/ )

`,



    imageUrl: IMAGES.videoDesignArticle,

    published: true,

    tags: ["Web Dizajn", "Video Efekti", "Bolt", "React", "Tailwind", "Hero Sekcija", "UI/UX"]

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

    id: "news-bolt-app-prototype",

    title: "Kako izgraditi funkcionalni prototip aplikacije u Bolt.new bez kodiranja, korak po korak",

    slug: "kako-izgraditi-funkcionalni-prototip-aplikacije-u-bolt-new",

    category: "Web Dizajn & Razvoj",

    date: "9. Novembar 2026.",

    author: "Bolt.new — AI App Builder (via pxf.io)",

    excerpt: "Skicirajte ekrane, povežite ih u dizajnerskom alatu i predajte testerima nešto što izgleda kao aplikacija — sve dok ne dodirnu dugme i ništa se ne desi. Da izgradite prototip aplikacije u Bolt.new, opišite aplikaciju običnim jezikom i agent gradi radnu verziju dok gledate. Učite korak po korak: opis, klik kroz prvu verziju, dorada, podaci i prijava, pa publikacija.",

    metaTitle: "Kako izgraditi funkcionalni prototip aplikacije u Bolt.new bez kodiranja | B&H Assistant",

    metaDescription: "Skicirajte ekrane, povežite ih u dizajnerskom alatu i predajte testerima nešto što izgleda kao aplikacija — sve dok ne dodirnu dugme i ništa se ne desi. Da izgradite prototip aplikacije u Bolt.new, opišite aplikaciju običnim jezikom i agent gradi radnu verziju dok gledate. Učite korak po korak: opis, klik kroz prvu verziju, dorada, podaci i prijava, pa publikacija.",

    ogTitle: "Kako izgraditi funkcionalni prototip aplikacije u Bolt.new bez kodiranja",

    ogDescription: "Skicirajte ekrane, povežite ih u dizajnerskom alatu i predajte testerima nešto što izgleda kao aplikacija — sve dok ne dodirnu dugme i ništa se ne desi. Da izgradite prototip aplikacije u Bolt.new, opišite aplikaciju običnim jezikom i agent gradi radnu verziju dok gledate. Učite korak po korak: opis, klik kroz prvu verziju, dorada, podaci i prijava, pa publikacija.",

    ogLocale: "bs_BA",

    twitterTitle: "Kako izgraditi funkcionalni prototip aplikacije u Bolt.new bez kodiranja",

    twitterDescription: "Skicirajte ekrane, povežite ih u dizajnerskom alatu i predajte testerima nešto što izgleda kao aplikacija — sve dok ne dodirnu dugme i ništa se ne desi. Da izgradite prototip aplikacije u Bolt.new, opišite aplikaciju običnim jezikom i agent gradi radnu verziju dok gledate. Učite korak po korak: opis, klik kroz prvu verziju, dorada, podaci i prijava, pa publikacija.",

    content: `Skicirajte ekrane, povežite ih u dizajnerskom alatu i predajte testerima nešto što izgleda kao aplikacija — sve dok ne dodirnu dugme i ništa se ne desi.



Da izgradite prototip aplikacije u Bolt.new, opišite aplikaciju običnim jezikom i agent gradi radnu verziju dok gledate. Doradu vršite opisivanjem promjena, a zatim publikujte na živi URL sa stvarnim podacima i prijavom. Cijeli tok stane u jednu sesiju, i nijedan korak ne uključuje pisanje koda. (Izvor: https://boltai.pxf.io/3kK61A)



Šta se računa kao prototip aplikacije u Bolt.new?



U Bolt.new, AI app builderu, prototip aplikacije jeste radna aplikacija, a ne slika nje: od 2026. godine podaci koje testeri unesu završe u pravoj bazi podataka, prijava stvara prave naloge, a dugmad pokreću logiku aplikacije.



Testeri koriste prototip umjesto da zamišljaju, pa nailaze na probleme koje mockup koji se samo može kliknuti ne može pokazati. Za puni slučaj radnih prototipova naspram mockupa i usporedbu kategorija AI alata za prototipiranje, pogledajte AI vodič za prototipiranje na bolt.new/blog/ai-prototyping.



Za izgradnju ovakvog prototipa nije potrebna programska pozadina. 93% malih preduzetnika koji grade na Bolt.new nisu profesionalni programeri (podaci platforme Bolt.new, 2026.). Oni poznaju svoj biznis, opišu šta im treba i prepuste agentu izgradnju.



Šta vam treba prije početka?



Treba vam jedan workflow, tri do pet funkcija i jedna rečenica o tome ko koristi aplikaciju. Ne trebaju vam wireframeovi ni specifikacija.



Workflow je dio koji treba pogoditi. Prototip postoji da testira da li jedan posao funkcioniše za jednu vrstu korisnika, pa izaberite posao koji je najvažniji i ostalo preskočite. Za tutoring biznis to je "roditelj rezerviše termin". Poruke, računi i aplikacija za tutore mogu čekati kasniju verziju.



Zatim napišite prompt. Radni kostur koji funkcioniše:



> Build a [type of app] for [who will use it]. Users should be able to [core action]. It needs [three to five features]. Include sign-in, and start me on the [main] screen.



Ispunjeno: "Build a booking portal for my tutoring business. Parents should be able to sign in, book a session time, and see notes from past sessions. It needs a calendar, a booking form, and a simple dashboard for me. Start with the parent booking screen."



Ne specifikujte previše. Agent popunjava sve što izostavite, a svaki izbor možete kasnije promijeniti jednom rečenicom.



Kako izgraditi prototip aplikacije u Bolt.new, korak po korak?



Izrada teče u pet koraka, i svaki se dešava u istom chatu.



1. Opišite aplikaciju u jednom promptu. Nalijepite svoj ispunjeni kostur u Bolt.new i pošaljite. Agent planira aplikaciju, gradi je i otvara pregled pored chata, pa prototip vidite kako nastaje umjesto da čekate otkrivanje.

2. Kliknite kroz prvu verziju. Pregled je radna aplikacija od prvog builda: otvorite je, prođite kroz osnovni posao i zabilježite šta ne valja. Na ovom prolazu tražite rupe i ostavite uglađavanje za kasnije; grub ekran koji radi naučiće vas više od lijepog koji ne radi.

3. Doradite običnim jezikom. "Make the calendar show one week at a time." "Move the booking button to the top." "Parents should get a confirmation screen after booking." Svaki zahtjev revidira istu aplikaciju dok gledate. Sve odluke zadržavate, a revizija košta jednu rečenicu umjesto narudžbe izmjene.

4. Dodajte prave podatke i prijavu. Tražite isto: "Add user accounts so each parent sees only their own bookings." Bolt povezuje bazu podataka i autentikaciju, pa svaki tester prijavljuje naloge i njihove rezervacije su i dalje tu pri sljedećoj posjeti. Odavde vaši povratni komentari dolaze od ljudi koji koriste aplikaciju.

5. Publikujte i podijelite URL. Jedna radnja stavlja prototip na živi link. Pošaljite ga petorici ljudi koji odgovaraju vašim korisnicima. Otvoriće link u browseru; ništa se ne instalira.



Šta imate na kraju svakog koraka:



Korak 1 — Opis: planirani build koji nastaje u pregledu

Korak 2 — Klik kroz: lista rupa, izvučenih iz same aplikacije

Korak 3 — Dorada: aplikacija se ponaša kako ste opisali

Korak 4 — Podaci i prijava: testeri sa vlastitim nalozima i sačuvanim podacima

Korak 5 — Publikacija: živi URL koji svako može otvoriti



Kako testirati prototip aplikacije sa pravim korisnicima?



Da testirate prototip aplikacije, pošaljite živi URL nekolicini ljudi koji odgovaraju vašim korisnicima, a zatim više cijenite šta rade nego šta govore. Tester koji aplikaciju nazove "odličnom", a onda ne može završiti rezervaciju, pokazao vam je šta se računa.



Od svakog testera zabilježite da li je završio osnovni posao bez pomoći, gdje je zapeo ili se vraćao, i šta je očekivao da nađe a nije ga bilo. Ti odgovori govore šta sljedeći prompt treba popraviti.



Zatim popravite isti dan. Budući da revizije idu običnim jezikom, jaz između "tester se zbunio" i "zbunjujući ekran je nestao" je nekoliko minuta. Popravljenu verziju pošaljite natrag istim testerima i gledajte ponovo.



Od prototipa do proizvoda



Bolt prototip i proizvod u koji prerasta su ista aplikacija: ista baza podataka, isti nalozi, isti kod ispod, raste jedan zahtjev odjednom.



Tradicionalni put tretira prototip kao jednokratan: validirajte mockupom, pa platite američke freelance i small-shop cijene razvoja od $100 do $300 po satu da se pravi stvar gradi od nule (FullStack Labs, 2025.). U Bolt-u validacija i izgradnja su isti posao. Kada prototip izdrži, nastavljate: više funkcija, custom domen i GitHub sinkronizacija kada se pridruži developer ili tim, jer je aplikacija standardni kod koji mogu preuzeti i proširiti.



Charlie Revill, britanski proizvodni inženjer i samoproglašeni ne-programer, izgradio je E.L.I, lean-improvement aplikaciju na Bolt.new za oko četiri sedmice uz puno radno vrijeme inženjeringa, pa je u roku od mjesec dana osnovao kompaniju na njoj. "Imao sam svoju bazu podataka u Supabase-u. Imao sam Stripe podešen gdje ljudi mogu plaćati i pristupiti. I sve je radilo."



Opišite svoju aplikaciju i počnite graditi na Bolt.new besplatno.

`,



    translations: {

      en: {

        title: "How to Build a Working App Prototype in Bolt.new Without Writing Code, Step by Step",

        excerpt: "You sketch the screens, connect them in a design tool, and hand testers something that looks like an app, right up until they tap a button and nothing happens. To build an app prototype in Bolt.new, you describe the app in plain language and the agent builds a working version while you watch. Learn step by step: description, clicking through the first version, refinement, data and sign-in, then publishing.",

        content: `You sketch the screens, connect them in a design tool, and hand testers something that looks like an app, right up until they tap a button and nothing happens.



To build an app prototype in Bolt.new, you describe the app in plain language and the agent builds a working version while you watch. You refine it by describing changes, then publish it to a live URL with real data and sign-in included. The whole loop fits in one sitting, and no step involves writing code. (Source: https://boltai.pxf.io/3kK61A)



What counts as an app prototype in Bolt.new?



In Bolt.new, an AI app builder, an app prototype is a working application rather than a picture of one: as of 2026, the data testers enter lands in a real database, sign-in creates real accounts, and the buttons run the app's logic.



Testers use the prototype instead of imagining it, so they hit problems a clickable mockup can't show. For the full case on working prototypes versus mockups, and how the AI prototyping tool categories compare, see our AI prototyping guide at bolt.new/blog/ai-prototyping.



You don't need a software background to build this kind of prototype. 93% of small business owners building on Bolt.new aren't professional developers (Bolt.new platform data, 2026). They know their business, describe what they need, and let the agent handle the construction.



What do you need before you start?



You need one workflow, three to five features, and a sentence about who uses the app. You don't need wireframes or a spec.



The workflow is the part to get right. A prototype exists to test whether one job works for one kind of user, so pick the job that matters most and cut the rest. For a tutoring business, that's "a parent books a session." Messaging, invoices, and an app for tutors can wait for a later version.



Then write the prompt. A skeleton that works:



> Build a [type of app] for [who will use it]. Users should be able to [core action]. It needs [three to five features]. Include sign-in, and start me on the [main] screen.



Filled in: "Build a booking portal for my tutoring business. Parents should be able to sign in, book a session time, and see notes from past sessions. It needs a calendar, a booking form, and a simple dashboard for me. Start with the parent booking screen."



Don't over-specify. The agent fills in whatever you leave out, and you can change any of its choices later with one sentence.



How do you build an app prototype in Bolt.new, step by step?



The build runs in five steps, and each one happens in the same chat.



1. Describe the app in one prompt. Paste your filled-in skeleton into Bolt.new and send it. The agent plans the app, builds it, and opens a preview beside the chat, so you watch the prototype take shape instead of waiting on a reveal.

2. Click through the first version. The preview is a running app from the first build: open it, tap through the core job, and note what's off. Look for gaps on this pass and leave polish for later; a rough screen that works will teach you more than a pretty one that doesn't.

3. Refine in plain language. "Make the calendar show one week at a time." "Move the booking button to the top." "Parents should get a confirmation screen after booking." Each request revises the same app while you watch. You keep every decision, and a revision costs a sentence instead of a change order.

4. Add real data and sign-in. Ask for it the same way: "Add user accounts so each parent sees only their own bookings." Bolt wires up a database and authentication, so each tester signs in to their own account and their bookings are still there on the next visit. From here on, your feedback comes from people using the app.

5. Publish and share the URL. One action puts the prototype at a live link. Send it to five people who match your users. They open the link in a browser; there's nothing to install.



What you have at the end of each step:



Step 1 — Describe: A planned build taking shape in the preview

Step 2 — Click through: A list of gaps, drawn from the app itself

Step 3 — Refine: The app behaving the way you described

Step 4 — Data and sign-in: Testers with their own accounts and saved data

Step 5 — Publish: A live URL anyone can open



How do you test an app prototype with real users?



To test an app prototype, send the live URL to a handful of people who match your users, then weigh what they do above what they say. A tester who calls the app "great" and then can't finish a booking has shown you which one counts.



From each tester, note whether they finished the core job without help, where they stalled or backtracked, and what they expected to find that wasn't there. Those answers tell you what the next prompt should fix.



Then fix it the same day. Because revisions happen in plain language, the gap between "a tester got confused" and "the confusing screen is gone" is minutes. Send the fixed version back to the same testers and watch again.



From prototype to product



A Bolt prototype and the product it becomes are the same app: same database, same accounts, same code underneath, growing one request at a time.



The traditional path treats the prototype as disposable: validate with a mockup, then pay US freelance and small-shop development rates of $100 to $300 an hour to build the real thing from scratch (FullStack Labs, 2025). In Bolt, validation and construction are the same work. When the prototype proves out, you keep going: more features, a custom domain, and GitHub sync when a developer or team joins, since the app is standard code they can pick up and extend.



Charlie Revill, a UK manufacturing engineer and self-described non-coder, built E.L.I, a lean-improvement app on Bolt.new in about four weeks while holding a full-time engineering job, then founded a company on it within a month. "I had my own database in Supabase. I had Stripe set up where people could make payments and get access. And it all worked."



Describe your app and start building on Bolt.new for free.

`,

      },

      de: {

        title: "So baust du Schritt für Schritt einen funktionierenden App-Prototyp in Bolt.new ohne Code zu schreiben",

        excerpt: "Du skizzierst die Screens, verbindest sie in einem Design-Tool und gibst Testern etwas, das wie eine App aussieht — bis sie auf eine Schaltfläche tippen und nichts passiert. Um in Bolt.new einen App-Prototyp zu bauen, beschreibst du die App in Alltagssprache, und der Agent baut live eine funktionierende Version. Lerne Schritt für Schritt: Beschreibung, Durchklicken der ersten Version, Verfeinerung, Daten und Anmeldung, dann Veröffentlichung.",

        content: `Du skizzierst die Screens, verbindest sie in einem Design-Tool und gibst Testern etwas, das wie eine App aussieht — bis sie auf eine Schaltfläche tippen und nichts passiert.



Um in Bolt.new einen App-Prototyp zu bauen, beschreibst du die App in Alltagssprache, und der Agent baut live eine funktionierende Version. Du verfeinerst sie, indem du Änderungen beschreibst, und veröffentlichst sie dann auf einer Live-URL mit echten Daten und Anmeldung. Der ganze Kreislauf passt in eine Sitzung, und kein Schritt erfordert Code schreiben. (Quelle: https://boltai.pxf.io/3kK61A)



Was gilt als App-Prototyp in Bolt.new?



In Bolt.new, einem KI-App-Builder, ist ein App-Prototyp eine funktionierende Anwendung und kein Bild davon: Ab 2026 landen die Daten, die Tester eingeben, in einer echten Datenbank, die Anmeldung erstellt echte Konten, und die Schaltflächen führen die Logik der App aus.



Tester benutzen den Prototyp, statt ihn sich vorzustellen, und stoßen so auf Probleme, die ein klickbares Mockup nicht zeigen kann. Zum vollständigen Vergleich funktionierender Prototypen und Mockups sowie der Kategorien von KI-Prototyping-Tools siehe unseren KI-Prototyping-Leitfaden unter bolt.new/blog/ai-prototyping.



Du brauchst keinen Software-Hintergrund, um diese Art von Prototyp zu bauen. 93 % der Kleinunternehmer, die auf Bolt.new bauen, sind keine professionellen Entwickler (Plattformdaten von Bolt.new, 2026). Sie kennen ihr Geschäft, beschreiben, was sie brauchen, und lassen den Agenten bauen.



Was brauchst du, bevor du startest?



Du brauchst einen Workflow, drei bis fünf Funktionen und einen Satz darüber, wer die App nutzt. Wireframes oder Spezifikationen brauchst du nicht.



Der Workflow ist der Teil, den du richtig treffen musst. Ein Prototyp existiert, um zu testen, ob ein Job für eine Art von Nutzer funktioniert, also wähle den wichtigsten Job und schneide den Rest weg. Für ein Nachhilfeinstitut ist das "Ein Elternteil bucht eine Sitzung." Nachrichten, Rechnungen und eine App für Tutoren können auf eine spätere Version warten.



Dann schreibe den Prompt. Ein Gerüst, das funktioniert:



> Build a [type of app] for [who will use it]. Users should be able to [core action]. It needs [three to five features]. Include sign-in, and start me on the [main] screen.



Ausgefüllt: "Build a booking portal for my tutoring business. Parents should be able to sign in, book a session time, and see notes from past sessions. It needs a calendar, a booking form, and a simple dashboard for me. Start with the parent booking screen."



Spezifiziere nicht zu viel. Der Agent füllt alles aus, was du weglässt, und du kannst jede seiner Entscheidungen später mit einem Satz ändern.



Wie baust du einen App-Prototyp in Bolt.new, Schritt für Schritt?



Der Build läuft in fünf Schritten, und jeder passiert im selben Chat.



1. Beschreibe die App in einem Prompt. Füge dein ausgefülltes Gerüst in Bolt.new ein und sende es. Der Agent plant die App, baut sie und öffnet eine Vorschau neben dem Chat, sodass du dem Prototyp beim Entstehen zusiehst, statt auf die Enthüllung zu warten.

2. Klicke dich durch die erste Version. Die Vorschau ist eine laufende App ab dem ersten Build: Öffne sie, gehe den Kern-Job durch und notiere, was nicht stimmt. Suche bei diesem Durchlauf nach Lücken und lasse Politur für später; ein grober Bildschirm, der funktioniert, lehrt dich mehr als ein schöner, der nicht funktioniert.

3. Verfeinere in Alltagssprache. "Make the calendar show one week at a time." "Move the booking button to the top." "Parents should get a confirmation screen after booking." Jede Anfrage überarbeitet dieselbe App, während du zusiehst. Du behältst jede Entscheidung, und eine Überarbeitung kostet einen Satz statt einer Änderungsbestellung.

4. Füge echte Daten und Anmeldung hinzu. Bitte darum genauso: "Add user accounts so each parent sees only their own bookings." Bolt verbindet eine Datenbank und Authentifizierung, sodass jeder Tester sich in sein eigenes Konto anmeldet und seine Buchungen beim nächsten Besuch noch da sind. Von hier an kommt dein Feedback von Menschen, die die App benutzen.

5. Veröffentliche und teile die URL. Eine Aktion setzt den Prototyp auf einen Live-Link. Sende ihn an fünf Personen, die zu deinen Nutzern passen. Sie öffnen den Link im Browser; es gibt nichts zu installieren.



Was du am Ende jedes Schrittes hast:



Schritt 1 — Beschreibung: Ein geplanter Build, der in der Vorschau Gestalt annimmt

Schritt 2 — Durchklicken: Eine Liste von Lücken, gezogen aus der App selbst

Schritt 3 — Verfeinern: Die App verhält sich, wie du es beschrieben hast

Schritt 4 — Daten und Anmeldung: Tester mit eigenen Konten und gespeicherten Daten

Schritt 5 — Veröffentlichen: Eine Live-URL, die jeder öffnen kann



Wie testest du einen App-Prototyp mit echten Nutzern?



Um einen App-Prototyp zu testen, sende die Live-URL an eine Handvoll Personen, die zu deinen Nutzern passen, und wiege dann, was sie tun, höher als das, was sie sagen. Ein Tester, der die App "großartig" nennt und dann keine Buchung abschließen kann, hat dir gezeigt, was zählt.



Notiere bei jedem Tester, ob er den Kern-Job ohne Hilfe abgeschlossen hat, wo er feststeckte oder zurückging und was er zu finden erwartete, das nicht da war. Diese Antworten sagen dir, was der nächste Prompt beheben soll.



Dann behebe es noch am selben Tag. Da Überarbeitungen in Alltagssprache geschehen, beträgt die Lücke zwischen "ein Tester war verwirrt" und "der verwirrende Bildschirm ist weg" Minuten. Sende die korrigierte Version an dieselben Tester zurück und schaue erneut zu.



Vom Prototyp zum Produkt



Ein Bolt-Prototyp und das Produkt, zu dem er wird, sind dieselbe App: dieselbe Datenbank, dieselben Konten, derselbe Code darunter, wachsend ein Request nach dem anderen.



Der traditionelle Weg behandelt den Prototyp als Wegwerfware: validiere mit einem Mockup, dann zahle US-Freelance- und Small-Shop-Entwicklungspreise von $100 bis $300 pro Stunde, um das echte Ding von Grund auf zu bauen (FullStack Labs, 2025). In Bolt sind Validierung und Bau dieselbe Arbeit. Wenn der Prototyp sich bewährt, machst du weiter: mehr Funktionen, eine eigene Domain und GitHub-Sync, wenn ein Entwickler oder Team dazukommt, da die App Standardcode ist, den sie aufgreifen und erweitern können.



Charlie Revill, ein britischer Fertigungsingenieur und selbsternannter Nicht-Programmierer, baute E.L.I, eine Lean-Improvement-App auf Bolt.new in etwa vier Wochen neben seinem Vollzeit-Ingenieurjob und gründete innerhalb eines Monats ein Unternehmen darauf. "Ich hatte meine eigene Datenbank in Supabase. Ich hatte Stripe eingerichtet, wo Leute Zahlungen leisten und Zugang erhalten konnten. Und alles funktionierte."



Beschreibe deine App und beginne kostenlos auf Bolt.new zu bauen.

`,

      },

      tr: {

        title: "Bolt.new'de Kod Yazmadan Çalışan Bir Uygulama Prototipi Nasıl Oluşturulur, Adım Adım",

        excerpt: "Ekranları çizersiniz, bir tasarım aracında bağlarsınız ve testcilere uygulama gibi görünen bir şey verirsiniz — bir düğmeye dokunup hiçbir şey olmadığında. Bolt.new'de uygulama prototipi oluşturmak için uygulamayı sade bir dille tarif edersiniz ve agent izlerken çalışan bir sürüm oluşturur. Adım adım öğrenin: açıklama, ilk sürümü tıklayarak inceleme, iyileştirme, veri ve giriş, ardından yayınlama.",

        content: `Ekranları çizersiniz, bir tasarım aracında bağlarsınız ve testcilere uygulama gibi görünen bir şey verirsiniz — bir düğmeye dokunup hiçbir şey olmadığında.



Bolt.new'de uygulama prototipi oluşturmak için uygulamayı sade bir dille tarif edersiniz ve agent izlerken çalışan bir sürüm oluşturur. Değişiklikleri tarif ederek iyileştirirsiniz, ardından gerçek veriler ve giriş dahil canlı bir URL'ye yayınlarsınız. Tüm döngü tek bir oturuşa sığar ve hiçbir adım kod yazmayı içermez. (Kaynak: https://boltai.pxf.io/3kK61A)



Bolt.new'de uygulama prototipi ne sayılır?



Bolt.new'de, bir yapay zeka uygulama oluşturucuda, uygulama prototipi bir resmi değil çalışan bir uygulamadır: 2026 itibarıyla, testçilerin girdiği veriler gerçek bir veritabanına düşer, giriş gerçek hesaplar oluşturur ve düğmeler uygulamanın mantığını çalıştırır.



Testçiler prototipi hayal etmek yerine kullanır, bu yüzden tıklanabilir bir mockup'ın gösteremeyeceği sorunlara takılırlar. Çalışan prototipler ve mockup'lar arasındaki tam karşılaştırma ile yapay zeka prototipleme aracı kategorilerinin nasıl karşılaştırıldığı için AI prototipleme rehberimize bolt.new/blog/ai-prototyping adresinden bakın.



Bu tür bir prototipi oluşturmak için yazılım geçmişine ihtiyacınız yok. Bolt.new'de geliştirme yapan küçük işletme sahiplerinin %93'ü profesyonel geliştirici değildir (Bolt.new platform verileri, 2026). İşlerini bilirler, neye ihtiyaç duyduklarını tarif ederler ve agent'ın inşa etmesine izin verirler.



Başlamadan önce neye ihtiyacınız var?



Bir iş akışına, üç ila beş özelliğe ve uygulamayı kimin kullanacağına dair bir cümleye ihtiyacınız var. Wireframe'lere veya bir spesifikasyona ihtiyacınız yok.



İş akışı doğru yapmanız gereken kısımdır. Bir prototip, tek bir işin tek bir kullanıcı türü için çalışıp çalışmadığını test etmek için vardır, bu yüzden en önemli işi seçin ve gerisini kesin. Bir özel ders işletmesi için bu, "bir ebeveyn oturum rezervasyonu yapar." Mesajlaşma, faturalar ve öğretmenler için bir uygulama daha sonraki bir sürüme kalabilir.



Ardından prompt'u yazın. Çalışan bir iskelet:



> Build a [type of app] for [who will use it]. Users should be able to [core action]. It needs [three to five features]. Include sign-in, and start me on the [main] screen.



Doldurulmuş hali: "Build a booking portal for my tutoring business. Parents should be able to sign in, book a session time, and see notes from past sessions. It needs a calendar, a booking form, and a simple dashboard for me. Start with the parent booking screen."



Aşırı detaylandırmayın. Agent neyi bırakırsanız onu doldurur ve seçimlerinin herhangi birini sonra tek bir cümleyle değiştirebilirsiniz.



Bolt.new'de uygulama prototipi adım adım nasıl oluşturulur?



Oluşturma beş adımda ilerler ve her biri aynı sohbette gerçekleşir.



1. Uygulamayı tek bir prompt ile tarif edin. Doldurduğunuz iskeleti Bolt.new'e yapıştırın ve gönderin. Agent uygulamayı planlar, oluşturur ve sohbetin yanında bir önizleme açar, böylece prototipin şekillendiğini izlersiniz, ortaya çıkmasını beklemezsiniz.

2. İlk sürümü tıklayarak inceleyin. Önizleme ilk sürümden itibaren çalışan bir uygulamadır: açın, temel işi tıklayın ve nelerin yanlış olduğunu not alın. Bu geçişte boşluklara bakın ve cila işini sonraya bırakın; çalışan kaba bir ekran, çalışmayan güzel bir ekrandan size daha çok öğretir.

3. Sade bir dille iyileştirin. "Make the calendar show one week at a time." "Move the booking button to the top." "Parents should get a confirmation screen after booking." Her istek aynı uygulamayı izlerken revize eder. Her kararı siz saklarsınız ve bir revizyon değişiklik emri yerine bir cümleye mal olur.

4. Gerçek veri ve giriş ekleyin. Aynı şekilde isteyin: "Add user accounts so each parent sees only their own bookings." Bolt bir veritabanı ve kimlik doğrulama bağlar, böylece her testçi kendi hesabına giriş yapar ve rezervasyonları bir sonraki ziyarette hala oradadır. Buradan itibaren geri bildiriminiz, uygulamayı kullanan insanlardan gelir.

5. Yayınlayın ve URL'yi paylaşın. Tek bir işlem prototipi canlı bir bağlantıya koyar. Kullanıcılarınızla eşleşen beş kişiye gönderin. Bağlantıyı tarayıcıda açarlar; kurulacak bir şey yoktur.



Her adımın sonunda neye sahip olursunuz:



Adım 1 — Tarif: Önizlemede şekillenen planlı bir sürüm

Adım 2 — Tıklama: Uygulamanın kendisinden çıkarılan boşlukların listesi

Adım 3 — İyileştirme: Uygulama tarif ettiğiniz şekilde davranıyor

Adım 4 — Veri ve giriş: Kendi hesapları ve kaydedilen verileri olan testçiler

Adım 5 — Yayınlama: Herkesin açabileceği canlı bir URL



Uygulama prototipini gerçek kullanıcılarla nasıl test edersiniz?



Uygulama prototipini test etmek için canlı URL'yi kullanıcılarınızla eşleşen birkaç kişiye gönderin, ardından söylediklerinden çok yaptıklarını tartın. Uygulamayı "harika" adlandırıp sonra rezervasyonu bitiremeyen bir testçi, hangisinin önemli olduğunu göstermiştir.



Her testçiden, temel işi yardım almadan bitirip bitiremediğini, nerede takıldığını veya geri gittiğini ve orada olmadığını beklediği şeyi not edin. Bu yanıtlar, sonraki prompt'un neyi düzeltmesi gerektiğini söyler.



Ardından aynı gün düzeltin. Revizyonlar sade bir dille yapıldığı için, "bir testçi kafası karıştı" ile "kafa karıştıran ekran gitti" arasındaki boşluk dakikalardır. Düzeltilmiş sürümü aynı testçilere geri gönderin ve tekrar izleyin.



Prototipten ürüne



Bir Bolt prototipi ve dönüştüğü ürün aynı uygulamadır: aynı veritabanı, aynı hesaplar, altında aynı kod, tek tek bir istekle büyür.



Geleneksel yol prototipi tek kullanımlık sayar: mockup ile doğrulayın, sonra gerçek şeyi sıfırdan inşa etmek için ABD serbest ve küçük işletme geliştirme ücretleri olan saatte $100 ile $300 ödeyin (FullStack Labs, 2025). Bolt'ta doğrulama ve inşa aynı iştir. Prototip kendini kanıtladığında devam edersiniz: daha fazla özellik, özel bir alan adı ve bir geliştirici veya ekip katıldığında GitHub senkronizasyonu, çünkü uygulama bir geliştirici veya ekibin devralıp genişletebileceği standart koddur.



Kendini kodlamayan biri olarak tanımlayan, İngiltere merkezli bir üretim mühendisi olan Charlie Revill, Bolt.new'de yaklaşık dört haftada tam zamanlı mühendislik işini sürdürürken E.L.I, bir yalın iyileştirme uygulaması geliştirdi ve bir ay içinde üzerine bir şirket kurdu. "Supabase'de kendi veritabanım vardı. İnsanların ödeme yapıp erişim alabildiği Stripe kurulmuştu. Ve her şey çalışıyordu."



Uygulamanızı tarif edin ve Bolt.new'de ücretsiz oluşturmaya başlayın.

`,

      },

    },

    imageUrl: IMAGES.boltArticle,

    externalUrl: "https://boltai.pxf.io/3kK61A",

    ctaText: "Isprobaj Bolt.new — besplatno (Affiliate) ↗",

    published: true,

    tags: ["Bolt.new", "AI App Builder", "Prototip", "No-Code", "DAW", "Web Razvoj", "Affiliate"]

  },

  {
    id: "news-keeprix-video-downloader",
    title: "Šta je Keeprix i kako radi?",
    slug: "sta-je-keeprix",
    category: "Web Dizajn & Razvoj",
    date: "9. Novembar 2026.",
    author: "B&H Assistant",
    excerpt: "Keeprix nije platforma za streaming poput Netflixa ili HBO-a, niti je aplikacija koja u svom sučelju ima \"kanale\" ili ugrađeni TV vodič kroz koji se direktno prebacujete. Umjesto toga, Keeprix Video Downloader je softver za Windows i Mac koji služi kao univerzalni alat za skidanje i trajno čuvanje sadržaja s preko 1.000 platformi.",
    metaTitle: "Šta je Keeprix i kako radi? | B&H Assistant",
    metaDescription: "Keeprix nije platforma za streaming poput Netflixa ili HBO-a, niti je aplikacija koja u svom sučelju ima \"kanale\" ili ugrađeni TV vodič kroz koji se direktno prebacujete. Umjesto toga, Keeprix Video Downloader je softver za Windows i Mac koji služi kao univerzalni alat za skidanje i trajno čuvanje sadržaja s preko 1.000 platformi.",
    ogTitle: "Šta je Keeprix i kako radi?",
    ogDescription: "Keeprix nije platforma za streaming poput Netflixa ili HBO-a, niti je aplikacija koja u svom sučelju ima \"kanale\" ili ugrađeni TV vodič kroz koji se direktno prebacujete. Umjesto toga, Keeprix Video Downloader je softver za Windows i Mac koji služi kao univerzalni alat za skidanje i trajno čuvanje sadržaja s preko 1.000 platformi.",
    ogLocale: "bs_BA",
    twitterTitle: "Šta je Keeprix i kako radi?",
    twitterDescription: "Keeprix nije platforma za streaming poput Netflixa ili HBO-a, niti je aplikacija koja u svom sučelju ima \"kanale\" ili ugrađeni TV vodič kroz koji se direktno prebacujete. Umjesto toga, Keeprix Video Downloader je softver za Windows i Mac koji služi kao univerzalni alat za skidanje i trajno čuvanje sadržaja s preko 1.000 platformi.",
    content: `Šta je Keeprix i kako radi?

Keeprix nije platforma za streaming poput Netflixa ili HBO-a, niti je aplikacija koja u svom sučelju ima "kanale" ili ugrađeni TV vodič kroz koji se direktno prebacujete. Umjesto toga, Keeprix Video Downloader je softver za Windows i Mac koji služi kao univerzalni alat za skidanje i trajno čuvanje sadržaja s preko 1.000 platformi.

Evo precizno kako funkcionira i kako rješava pitanje dostupnosti u BiH:

1. Kako Keeprix zapravo radi?

Ugrađeni pretraživač: Kada pokrenete Keeprix na računaru, unutar aplikacije imate siguran pretraživač putem kojeg se prijavljujete (logirate) na svoje postojeće račune (Netflix, Prime Video, Disney+, Max, YouTube itd.).

Direktno preuzimanje: Kada pronađete film ili seriju koju želite, aplikacija skida video datoteku direktno na hard disk vašeg računara u MP4 ili MKV formatu (u visokoj rezoluciji do 4K, s HDR-om, željenim titlovima i audio zapisima).

Trajno vlasništvo: Jednom kada skinete sadržaj, on je tu zauvijek – nema datuma isteka, nema gašenja licence i ne treba vam internet da biste ga gledali.

2. Šta je s platformama koje "ne djeluju" ili su ograničene u BiH?

Ovo je ključna prednost ovakvih alata, ali uz jedno važno pravilo:

Ako servis uopće nema podršku za vašu regiju: Neke platforme (poput određenih regionalnih kataloga ili servisa) mogu blokirati pristup ako ste fizički u BiH. Međutim, s obzirom na to da Keeprix za prijavu koristi web sesije, ako je nekoj platformi potrebna VPN veza da biste joj uopće pristupili i vidjeli katalog, Keeprix će je prepoznati onoliko dobro koliko je i vaš računar vidi.

Zaobići ćete ograničenja samih aplikacija za preuzimanje: Mnoge streaming platforme (poput Netflixa ili Prime Video-a) u svojim službenim aplikacijama ograničavaju skidanje sadržaja (dozvoljavaju preuzimanje samo na mobitel, sadržaj se sam briše nakon nekoliko sedmica ili nakon što istekne pretplata). Keeprix te restrikcije u potpunosti uklanja jer skida čistu datoteku na računar.

Besplatne platforme: Za servise poput YouTube Downloader, TikTok-a ili Instagrama preuzimanje je potpuno besplatno i ne traži nikakve pretplate ni račune.

Keeprix funkcionira kao centralno čvorište koje preko jedinstvenog sučelja na računaru pokriva sve veće svjetske i društvene platforme.

1. Koje sve platforme Keeprix podržava?

Keeprix podržava preko 1.000 platformi, koje se dijele u dvije glavne kategorije:

Vodeći plaćeni (subscription) streaming servisi: Netflix, Amazon Prime Video, Disney+, Max (bivši HBO Max), Hulu, Apple TV+, Paramount+, Peacock i drugi.

Napomena za regiju: Preko Keeprixa se prijavljujete na vlastite (ili tuđe) aktivne račune. Ako servis ima geoblokadu za BiH, Keeprix će sadržaj moći povući onoliko uspješno koliko ga i vaš računar vidi (pa je u tim rijetkim slučajevima za pristup samom katalogu potrebna VPN konekcija tokom pretrage i pokretanja skidanja).

Besplatne društvene i video platforme: YouTube, TikTok, Instagram, Facebook, X (Twitter), Dailymotion i stotine drugih sličnih stranica (za ove besplatne izvore nije potrebna nikakva pretplata ni prijava).

2. Kako Keeprix upravlja preuzimanjem titlova i različitih audio zapisa?

Za razliku od klasičnog snimanja ekrana (screen recording) koje hvata samo ono što se u datom trenutku vidi i čuje na monitoru, Keeprix direktno komunicira sa izvorom datoteke i nudi napredne opcije za upravljanje tonom i tekstom:

Višejezični audio zapisi (Multi-Track Audio): Prije skidanja filma ili epizode serije, aplikacija detektira sve dostupne audio jezike i formate koje platforma nudi (uključujući napredne formate zvuka poput 5.1 surround zvuka i Dolby Atmos). Možete izabrati tačno koji vam audio zapis treba (npr. originalni ton ili sinhronizaciju na određenom jeziku) da se sačuva u datoteku.

Preuzimanje i upravljanje titlovima: Aplikacija povlači sve dostupne titlove u svim ponuđenim jezicima s originalne platforme.

Način spremanja titlova i tona: Prilikom izrade MP4 ili MKV fajla, imate fleksibilnost da titlove i dodatne audio kanale integrirate (ugradite/embedirate) direktno u video (tako da ih možete uključivati i isključivati po želji u bilo kojem playeru poput VLC-a) ili da ih sačuvate kao posebne eksterne fajlove (npr. zasebne .srt datoteke titlova).

Sve ovo dolazi u paketu sa podrškom za visoke rezolucije (sve do 4K UHD sa HDR10 i Dolby Vision formatima, zavisno od toga šta sama platforma podržava za dati naslov).
`,

    translations: {
      en: {
        title: "What Is Keeprix and How Does It Work?",
        excerpt: "Keeprix is not a streaming platform like Netflix or HBO, nor is it an app that has \"channels\" or a built-in TV guide in its interface that you switch through directly. Instead, Keeprix Video Downloader is software for Windows and Mac that serves as a universal tool for downloading and permanently storing content from over 1,000 platforms.",
        content: `What Is Keeprix and How Does It Work?

Keeprix is not a streaming platform like Netflix or HBO, nor is it an app that has "channels" or a built-in TV guide in its interface that you switch through directly. Instead, Keeprix Video Downloader is software for Windows and Mac that serves as a universal tool for downloading and permanently storing content from over 1,000 platforms.

Here's exactly how it works and how it solves the availability question in Bosnia and Herzegovina:

1. How does Keeprix actually work?

Built-in browser: When you run Keeprix on your computer, inside the app you have a secure browser through which you log in to your existing accounts (Netflix, Prime Video, Disney+, Max, YouTube, etc.).

Direct downloading: When you find the movie or series you want, the app downloads the video file directly to your computer's hard drive in MP4 or MKV format (in high resolution up to 4K, with HDR, desired subtitles and audio tracks).

Permanent ownership: Once you download content, it's there forever – no expiry dates, no license shutdown, and you don't need internet to watch it.

2. What about platforms that \"don't work\" or are restricted in Bosnia?

This is the key advantage of such tools, but with one important rule:

If a service has no support for your region at all: Some platforms (like certain regional catalogues or services) may block access if you're physically in Bosnia and Herzegovina. However, given that Keeprix uses web sessions for login, if a platform requires a VPN connection for you to even access it and see the catalogue, Keeprix will recognize it only as well as your computer sees it.

You bypass the restrictions of the apps themselves: Many streaming platforms (like Netflix or Prime Video) limit downloading content in their official apps (allowing downloads only on mobile, content auto-deletes after a few weeks or after the subscription expires). Keeprix completely removes these restrictions because it downloads the clean file to your computer.

Free platforms: For services like YouTube Downloader, TikTok or Instagram, downloading is completely free and requires no subscriptions or accounts.

Keeprix functions as a central hub that, through a single interface on your computer, covers all the major global and social platforms.

1. Which platforms does Keeprix support?

Keeprix supports over 1,000 platforms, divided into two main categories:

Leading paid (subscription) streaming services: Netflix, Amazon Prime Video, Disney+, Max (formerly HBO Max), Hulu, Apple TV+, Paramount+, Peacock and others.

Note for the region: Through Keeprix you log in to your own (or others') active accounts. If a service has geoblocking for Bosnia and Herzegovina, Keeprix will be able to pull content only as successfully as your computer sees it (so in those rare cases, a VPN connection is needed during browsing and starting the download to access the catalogue itself).

Free social and video platforms: YouTube, TikTok, Instagram, Facebook, X (Twitter), Dailymotion and hundreds of other similar pages (for these free sources no subscription or login is needed).

2. How does Keeprix manage subtitle and different audio track downloads?

Unlike classic screen recording which captures only what is seen and heard on the monitor at the given moment, Keeprix communicates directly with the file source and offers advanced options for managing tone and text:

Multi-track audio: Before downloading a movie or episode of a series, the app detects all available audio languages and formats the platform offers (including advanced audio formats like 5.1 surround sound and Dolby Atmos). You can choose exactly which audio track you need (e.g. original audio or dubbing in a specific language) to be saved in the file.

Subtitle download and management: The app pulls all available subtitles in all offered languages from the original platform.

How subtitles and audio are saved: When creating an MP4 or MKV file, you have the flexibility to integrate subtitles and additional audio channels directly into the video (so you can turn them on and off as you wish in any player like VLC) or save them as separate external files (e.g. separate .srt subtitle files).

All of this comes in a package with support for high resolutions (up to 4K UHD with HDR10 and Dolby Vision formats, depending on what the platform itself supports for a given title).
`,
      },
      de: {
        title: "Was ist Keeprix und wie funktioniert es?",
        excerpt: "Keeprix ist keine Streaming-Plattform wie Netflix oder HBO, noch ist es eine App, die in ihrer Oberfläche \"Kanäle\" oder einen eingebauten TV-Guide hat, durch den du direkt wechselst. Stattdessen ist Keeprix Video Downloader eine Software für Windows und Mac, die als universelles Tool zum Herunterladen und dauerhaften Speichern von Inhalten von über 1.000 Plattformen dient.",
        content: `Was ist Keeprix und wie funktioniert es?

Keeprix ist keine Streaming-Plattform wie Netflix oder HBO, noch ist es eine App, die in ihrer Oberfläche "Kanäle" oder einen eingebauten TV-Guide hat, durch den du direkt wechselst. Stattdessen ist Keeprix Video Downloader eine Software für Windows und Mac, die als universelles Tool zum Herunterladen und dauerhaften Speichern von Inhalten von über 1.000 Plattformen dient.

So funktioniert es genau und so löst es die Verfügbarkeitsfrage in Bosnien und Herzegowina:

1. Wie funktioniert Keeprix eigentlich?

Integrierter Browser: Wenn du Keeprix auf deinem Computer startest, hast du innerhalb der App einen sicheren Browser, über den du dich bei deinen bestehenden Konten anmeldest (Netflix, Prime Video, Disney+, Max, YouTube usw.).

Direkter Download: Wenn du einen Film oder eine Serie findest, die du willst, lädt die App die Videodatei direkt auf die Festplatte deines Computers in MP4- oder MKV-Format herunter (in hoher Auflösung bis 4K, mit HDR, gewünschten Untertiteln und Audiospuren).

Dauerhaftes Eigentum: Sobald du Inhalte heruntergeladen hast, sind sie für immer da – keine Ablaufdaten, keine Lizenzabschaltung und du brauchst kein Internet, um sie anzuschauen.

2. Was ist mit Plattformen, die in Bosnien "nicht funktionieren" oder eingeschränkt sind?

Dies ist der Hauptvorteil solcher Tools, aber mit einer wichtigen Regel:

Wenn ein Dienst gar keine Unterstützung für deine Region hat: Einige Plattformen (wie bestimmte regionale Kataloge oder Dienste) können den Zugriff blockieren, wenn du physisch in Bosnien und Herzegowina bist. Da Keeprix für die Anmeldung Web-Sessions verwendet, wird Keeprix eine Plattform nur so gut erkennen, wie dein Computer sie sieht, wenn für den Zugriff auf den Katalog eine VPN-Verbindung nötig ist.

Du umgehst die Einschränkungen der Apps selbst: Viele Streaming-Plattformen (wie Netflix oder Prime Video) beschränken in ihren offiziellen Apps das Herunterladen (nur auf dem Handy erlaubt, Inhalte löschen sich nach wenigen Wochen oder nach Ablauf des Abos automatisch). Keeprix entfernt diese Beschränkungen vollständig, weil es die saubere Datei auf deinen Computer lädt.

Kostenlose Plattformen: Für Dienste wie YouTube Downloader, TikTok oder Instagram ist der Download völlig kostenlos und erfordert keine Abos oder Konten.

Keeprix fungiert als zentrale Anlaufstelle, die über eine einzige Oberfläche auf deinem Computer alle großen globalen und sozialen Plattformen abdeckt.

1. Welche Plattformen unterstützt Keeprix?

Keeprix unterstützt über 1.000 Plattformen, die in zwei Hauptkategorien unterteilt sind:

Führende kostenpflichtige (Abo-) Streaming-Dienste: Netflix, Amazon Prime Video, Disney+, Max (ehemals HBO Max), Hulu, Apple TV+, Paramount+, Peacock und andere.

Hinweis zur Region: Über Keeprix meldest du dich bei deinen eigenen (oder fremden) aktiven Konten an. Wenn ein Dienst Geoblocking für Bosnien und Herzegowina hat, kann Keeprix Inhalte nur so erfolgreich abrufen, wie dein Computer sie sieht (so dass in diesen seltenen Fällen während des Stöberns und Startens des Downloads eine VPN-Verbindung zum Zugriff auf den Katalog selbst erforderlich ist).

Kostenlose Social- und Videoplattformen: YouTube, TikTok, Instagram, Facebook, X (Twitter), Dailymotion und Hunderte anderer ähnlicher Seiten (für diese kostenlosen Quellen ist kein Abo oder Login erforderlich).

2. Wie verwaltet Keeprix Untertitel- und verschiedene Audio-Spuren-Downloads?

Im Gegensatz zu klassischer Bildschirmaufnahme, die nur das festhält, was in dem Moment auf dem Monitor zu sehen und zu hören ist, kommuniziert Keeprix direkt mit der Datei-Quelle und bietet erweiterte Optionen zur Verwaltung von Ton und Text:

Mehrspuriges Audio (Multi-Track Audio): Vor dem Herunterladen eines Films oder einer Serienepisode erkennt die App alle verfügbaren Audiosprachen und Formate, die die Plattform anbietet (einschließlich erweiterter Audioformate wie 5.1 Surround und Dolby Atmos). Du kannst genau auswählen, welche Audiospur du brauchst (z. B. Originalton oder Synchronisation in einer bestimmten Sprache), die in der Datei gespeichert wird.

Untertitel-Download und Verwaltung: Die App zieht alle verfügbaren Untertitel in allen angebotenen Sprachen von der Originalplattform.

So werden Untertitel und Ton gespeichert: Beim Erstellen einer MP4- oder MKV-Datei hast du die Flexibilität, Untertitel und zusätzliche Audiokanäle direkt in das Video zu integrieren/einbetten (sodass du sie in jedem Player wie VLC nach Belieben ein- und ausschalten kannst) oder sie als separate externe Dateien zu speichern (z. B. separate .srt Untertiteldateien).

All dies kommt im Paket mit Unterstützung für hohe Auflösungen (bis 4K UHD mit HDR10- und Dolby-Vision-Formaten, je nachdem, was die Plattform selbst für einen Titel unterstützt).
`,
      },
      tr: {
        title: "Keeprix Nedir ve Nasıl Çalışır?",
        excerpt: "Keeprix, Netflix veya HBO gibi bir streaming platformu değildir, ne de arayüzünde doğrudan geçiş yaptığınız \"kanallar\" veya yerleşik bir TV rehberi olan bir uygulama değildir. Bunun yerine, Keeprix Video Downloader, 1.000'den fazla platformdan içerik indirmek ve kalıcı olarak saklamak için kullanılan evrensel bir araç olan Windows ve Mac için bir yazılımdır.",
        content: `Keeprix Nedir ve Nasıl Çalışır?

Keeprix, Netflix veya HBO gibi bir streaming platformu değildir, ne de arayüzünde doğrudan geçiş yaptığınız "kanallar" veya yerleşik bir TV rehberi olan bir uygulama değildir. Bunun yerine, Keeprix Video Downloader, 1.000'den fazla platformdan içerik indirmek ve kalıcı olarak saklamak için kullanılan evrensel bir araç olan Windows ve Mac için bir yazılımdır.

İşte tam olarak nasıl çalışır ve Bosna Hersek'te erişilebilirlik sorununu nasıl çözer:

1. Keeprix aslında nasıl çalışır?

Yerleşik tarayıcı: Keeprix'i bilgisayarınızda başlattığınızda, uygulama içinde mevcut hesaplarınıza (Netflix, Prime Video, Disney+, Max, YouTube vb.) giriş yaptığınız güvenli bir tarayıcınız olur.

Doğrudan indirme: İstediğiniz filmi veya diziyi bulduğunuzda, uygulama video dosyasını doğrudan bilgisayarınızın sabit diskine MP4 veya MKV formatında (yüksek çözünürlükte 4K'ya kadar, HDR ile, istenen altyazılar ve ses kayıtlarıyla) indirir.

Kalıcı sahiplik: İçeriği indirdiğinizde, sonsuza kadar oradadır — son kullanma tarihi yok, lisans kapatma yok ve izlemek için internete ihtiyacınız yok.

2. Bosna Hersek'te "çalışmayan" veya kısıtlı platformlara ne olur?

Bu, bu tür araçların temel avantajıdır, ancak önemli bir kural ile:

Bir hizmetin bölgenize hiç desteği yoksa: Bazı platformlar (belirli bölgesel kataloglar veya hizmetler gibi) fiziksel olarak Bosna Hersek'teyseniz erişimi engelleyebilir. Ancak Keeprix giriş için web oturumlarını kullandığı için, bir platformun kataloğuna erişmek için VPN bağlantısı gerekiyorsa, Keeprix onu yalnızca bilgisayarınızın gördüğü kadar iyi tanır.

Uygulamaların kendilerinin kısıtlamalarını aşarsınız: Birçok streaming platformu (Netflix veya Prime Video gibi) resmi uygulamalarında içerik indirmeyi kısıtlar (yalnızca mobilde indirmeye izin verir, içerik birkaç hafta sonra veya abonelik sona erdikten sonra kendiliğinden silinir). Keeprix bu kısıtlamaları tamamen ortadan kaldırır çünkü temiz dosyayı bilgisayara indirir.

Ücretsiz platformlar: YouTube Downloader, TikTok veya Instagram gibi hizmetler için indirme tamamen ücretsizdir ve hiçbir abonelik veya hesap gerektirmez.

Keeprix, bilgisayarınızda tek bir arayüz üzerinden tüm büyük küresel ve sosyal platformları kapsayan merkezi bir merkez olarak çalışır.

1. Keeprix hangi platformları destekler?

Keeprix, iki ana kategoriye ayrılan 1.000'den fazla platformu destekler:

Önde gelen ücretli (abonelikli) streaming hizmetleri: Netflix, Amazon Prime Video, Disney+, Max (eski adıyla HBO Max), Hulu, Apple TV+, Paramount+, Peacock ve diğerleri.

Bölge notu: Keeprix üzerinden kendi (veya başkalarının) aktif hesaplarınıza giriş yaparsınız. Bir hizmetin Bosna Hersek için coğrafi engeli varsa, Keeprix içeriği yalnızca bilgisayarınızın gördüğü kadar başarılı bir şekilde çekebilir (bu nadir durumlarda kataloğun kendisine erişim için arama ve indirme başlatma sırasında VPN bağlantısı gereklidir).

Ücretsiz sosyal ve video platformları: YouTube, TikTok, Instagram, Facebook, X (Twitter), Dailymotion ve yüzlerce benzer site (bu ücretsiz kaynaklar için hiçbir abonelik veya giriş gerekmez).

2. Keeprix altyazı ve farklı ses kayıtlarının indirilmesini nasıl yönetir?

Klasik ekran kaydının sadece o anda monitörde görüneni ve duyulanı yakalamasının aksine, Keeprix doğrudan dosya kaynağıyla iletişim kurar ve ton ile metin yönetiminde gelişmiş seçenekler sunar:

Çok kanallı ses (Multi-Track Audio): Bir filmi veya dizi bölümünü indirmeden önce, uygulama platformun sunduğu tüm mevcut ses dillerini ve formatlarını algılar (5.1 surround ve Dolby Atmos gibi gelişmiş ses formatları dahil). Dosyaya kaydedilecek ses kaydının tam olarak hangisine ihtiyacınız olduğunu seçebilirsiniz (ör. orijinal ses veya belirli bir dilde dublaj).

Altyazı indirme ve yönetimi: Uygulama orijinal platformdan sunulan tüm dillerdeki mevcut tüm altyazıları çeker.

Altyazı ve sesin kaydedilme şekli: MP4 veya MKV dosyası oluştururken, altyazıları ve ek ses kanallarını doğrudan videoya entegre edebilme (gömme) veya ayrı harici dosyalar (ör. ayrı .srt altyazı dosyaları) olarak kaydetme esnekliğine sahipsiniz, böylece VLC gibi herhangi bir oynatıcıda dilediğinizce açıp kapatabilirsiniz.

Tüm bunlar, yüksek çözünürlük desteğiyle (platformun kendisi belirli bir başlık için neyi destekliyorsa ona bağlı olarak 4K UHD'ye kadar HDR10 ve Dolby Vision formatlarıyla) bir pakette gelir.
`,
      },
    },
    imageUrl: IMAGES.keeprixArticle,
    externalUrl: "https://www.keeprix.io/?ref=bhassistant",
    ctaText: "Preuzmi Keeprix Video Downloader ↗",
    published: true,
    tags: ["Keeprix", "Video Downloader", "Streaming", "Netflix", "YouTube", "Software", "Affiliate"]
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
    id: "news-digital-playground-network",
    title: "Digital Playground Network: Novi Standardi Video Dinamike i Interaktivnih Medija",
    slug: "scena-magazin-print-izdanje-podjela",
    category: "Digitalni Mediji & Video",
    date: "11. Novembar 2026.",
    author: "Redakcija B&H Assistant & Digital Media Lab",
    excerpt: "Analiza inovativnih dinamičkih video formata i interaktivnog streaminga na mreži Digital Playground Network. Kako optimizovati video bez usporavanja web stranice uz visoku stopu angažmana.",
    content: `Digital Playground Network: Novi Standardi Video Dinamike i Interaktivnih Medija

Moderne digitalne platforme sve više prelaze sa statičkih vizuelnih elemenata na dinamičke video formate visokog angažmana. Prema najnovijim analitičkim studijama u oblasti web marketinga, ugrađeni interaktivni video sadržaji ostvaruju i do 400% veću stopu korisničkog zadržavanja i interakcije u poređenju sa klasičnim statičkim oglasnim formatima.

U sklopu našeg praćenja globalnih trendova u digitalnom oglašavanju i multimedijalnim prezentacijama, predstavljamo uvid u tehnološka rješenja kompanije Digital Playground Network. Ovaj sistem koristi naprednu tehnologiju optimizovanog video striminga prilagođenog svim vrstama uređaja — od ultra-brzih mobilnih pametnih telefona do desktop radnih stanica visoke rezolucije.

Ključne karakteristike dinamičkog video koncepta:

1. Trenutni Autoplay & Zero CLS: Video se pokreće automatski u mutiranom režimu uz fiksne proporcije okvira, eliminišući pomjeranje sadržaja (Cumulative Layout Shift) i osiguravajući besprijekorne Core Web Vitals rezultate.
2. Adaptivna kompresija: Dinamičko prilagođavanje bitrate-a propusnosti korisničke mreže, čime se postiže trenutni start bez neugodnog baferovanja.
3. Direktna konverzija i call-to-action: Integracija direktnih odredišnih linkova uz transparentnu analitiku posjeta i pregleda.

Za domaće i regionalne izdavače, implementacija responzivnih video elemenata predstavlja ključni korak u podizanju vizuelnog standarda digitalnih publikacija i maksimizaciji angažmana posjetilaca.

Isprobajte interaktivni video prikaz u nastavku i posjetite zvaničnu landing stranicu Digital Playground Network partnera.`,
    imageUrl: IMAGES.scenaCover,
    videoUrl: "https://hw-cdn2.contentabc.com/a7/creatives/24/124/819574/1107810/1107810_video.mp4",
    externalUrl: "https://landing.digitalplaygroundnetwork.com/tgp1?ad_id=819574&ata=alenj9653",
    ctaText: "Posjeti Digital Playground Network ↗",
    hasVideo: true,
    published: true,
    tags: ["Digital Playground Network", "Video Format", "Streaming", "Digitalni Mediji", "Interaktivni Video", "Marketing"]
  },
  {
    id: "news-wa-production-bundles-regija",
    title: "Kako podići muzičku produkciju na viši nivo: Zašto je W. A. Production nezaobilazan alat za producente u regiji",
    slug: "craft-pivare-ugostiteljstvo-uspon-domace-craft-scene-u-bih",
    category: "Muzička Produkcija & Audio Dizajn",
    date: "11. Novembar 2026.",
    author: "Alen Jusufović & W. A. Production Partnerstvo",
    excerpt: "Muzička industrija na Zapadnom Balkanu bilježi ogroman porast nezavisnih producenata i beatmakera. Otkrijte zašto je W. A. Production postao nezaobilazan resurs za profesionalni zvuk po pristupačnim cijenama.",
    content: `Kako podići muzičku produkciju na viši nivo: Zašto je W. A. Production nezaobilazan alat za producente u regiji

Muzička industrija na području Zapadnog Balkana posljednjih godina bilježi ogroman porast broja nezavisnih producenata, beatmakera i audio inženjera. S obzirom na to da moderna tehnologija omogućava kreiranje hitova direktno iz kućnog studija, potraga za kvalitetnim zvukovima, efektima i DAW predlošcima nikada nije bila veća.

U moru različitih platformi, jedno ime se već godinama ističe po inovacijama, pristupačnosti i nevjerovatnoj posvećenosti korisnicima – W. A. Production.

Šta W. A. Production čini posebnim?

Osnovana od strane strastvenih producenata i DJ-eva, ova globalno prepoznatljiva platforma izrasla je u neprocjenjiv resurs za muzičare širom svijeta. Njihova filozofija se temelji na jednostavnom, ali moćnom pitanju: „Kako učiniti vaš zvuk boljim?“

Za razliku od mnogih drugih brendova, W. A. Production se ističe po:
• Vrhunskoj korisničkoj podršci (human-to-human): Tim aktivno radi na tome da svaki korisnik dobije pravovremenu pomoć, rješenje i podršku bez robotskih skripti i čekanja.
• Inovativnim alatima i pluginovima: Od moćnih MIDI generatora do profesionalnih alata za miksanje i masteriranje koji "jednostavno rade" bez komplikacija.
• Bogatoj biblioteci zvukova: Zastupljeni su gotovo svi žanrovi – od elektronske muzike, hip-hopa i popa do modernih regionalnih trendova.

Prilagođeno sceni u BiH i Zapadnom Balkanu

Producentska scena u Bosni i Hercegovini, Srbiji, Hrvatskoj i široj regiji izuzetno je talentovana, ali često ograničena budžetima. Upravo tu W. A. Production nudi savršen balans – profesionalni kvalitet zvuka koji je cjenovno pristupačan, uz brojne besplatne resurse koji omogućavaju mladim i ambicioznim autorima da bez finansijskih prepreka započnu svoj put.

Bilo da radite na modernom trapu, klupskoj elektronici ili zvučnoj podlozi za film i reklame, njihovi paketi (bundles) nude nevjerovatnu vrijednost za uloženi novac.

Iskoristite aktuelne pogodnosti i unaprijedite svoj studio

Za sve producente koji žele profesionalizovati svoj zvuk, W. A. Production redovno nudi ekskluzivne popuste i pakete dodataka po posebnim cijenama.

Istražite aktuelne ponude i preuzmite svoje pakete putem zvaničnog partnerskog linka:
👉 Pogledajte W. A. Production Bundles Deals ovdje

Vaša muzika zaslužuje najbolji zvuk – vrijeme je da podignete svoje produkcijske vještine na viši nivo!`,
    imageUrl: IMAGES.wpProductionArticle,
    externalUrl: "https://www.waproduction.com/bundles#a_aid=x3a36xuougf0v&a_bid=11d8a200",
    ctaText: "Pogledajte W. A. Production Bundles Deals Ovdje ↗",
    published: true,
    tags: ["W. A. Production", "Muzička Produkcija", "Audio Inženjering", "Bundles Deals", "DAW", "Pluginovi", "Beatmaking", "Zapadni Balkan"]
  },
  {
    id: "news-mturbodelay-free-plugin",
    title: "MTurboDelay – Profesionalni studijski delay plugin dostupan besplatno za producente i kreatore",
    slug: "mturbodelay-profesionalni-studijski-delay-plugin-besplatno",
    category: "Muzička Produkcija & Audio Dizajn",
    date: "12. Novembar 2026.",
    author: "Alen Jusufović, Direktor & Softverski Inženjer",
    excerpt: "Istražite MTurboDelay – ultimativni delay plugin sa 100+ emulacija legendarnih analognih i digitalnih uređaja, naprednom multi-tap sekcijom i unikatnim modulacijama.",
    content: `MTurboDelay – Profesionalni studijski delay plugin dostupan besplatno za producente i kreatore

Muzička produkcija danas zahtijeva alate koji pružaju i vintage analognu toplinu i neograničenu digitalnu fleksibilnost. MTurboDelay donosi najbolje iz oba svijeta: preko 100 različitih delay uređaja u jednom jedinom moćnom pluginu (VST, AU, AAX).

Ključne mogućnosti MTurboDelay plugina:
• 100+ integrisanih delay uređaja: Od legendarnih analognih tape ehoa i BBD pedala do futurističkih multi-tap delayeva i ambijentalnih zvučnih pejzaža.
• Neograničene mogućnosti modulacije: Svaki parametar može se modulisati pomoću LFO-a, envelope followera, MIDI-ja ili pitch detekcije.
• Saturation, Bitcrushing i Filteri: Ugrađeni analogni saturatori i nelinearni filteri daju zvuk sa karakterom direktno u miksu.
• 64-bitni procesorski engine: Neuporediv kvalitet zvuka uz nisku potrošnju procesora i nultu latenciju.

B&H Assistant kroz partnerstvo sa globalnim audio platformama W. A. Production i MeldaProduction omogućava muzičkim autorima iz Bosne i Hercegovine i regije besplatan pristup profesionalnim audio resursima.

Preuzmite paket i istražite najbolje zvukove i efekte za vaše projekte putem zvaničnog partnerskog linka:
👉 https://www.waproduction.com/#x3a36xuougf0v`,
    imageUrl: "https://archive.org/download/w.-a.-production-bh-assistant/W.A.Production_BH_Assistant.png",
    externalUrl: "https://www.waproduction.com/#x3a36xuougf0v",
    ctaText: "Istražite W.A. Production i preuzmite pluginove ↗",
    published: true,
    tags: ["MTurboDelay", "MeldaProduction", "W. A. Production", "Audio Plugin", "Delay", "VST", "Muzička Produkcija", "Besplatni Resursi"]
  }
];

const STORAGE_KEY = 'bh_assistant_news_articles_v4';

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
