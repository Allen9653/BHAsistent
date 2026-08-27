import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AFFILIATE_COURSES } from '../data/companyData';
import { SafeImage } from './SafeImage';
import { IMAGES } from '../utils/images';
import { ExternalLink, Sparkles, GraduationCap, Award, BookOpen, CheckCircle, Search, Zap, ShieldAlert, ShoppingBag, ChevronLeft, ChevronRight, Briefcase, Cpu, PhoneCall, Globe, Terminal, Database, Radio, Layers, Camera, Smartphone, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ShopAffiliateSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Sve');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();

  const handleCategorySelect = (cat: string) => {
    if (cat === selectedCategory) return;
    setIsTransitioning(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  const categories = ['Sve', 'Elektronika & Tehnika', 'Remote Poslovi', 'Online Edukacija', 'IT & Veb Dizajn', 'Jezici & Poslovanje', 'Fotografija & Umjetnost'];

  const affiliateSlides = [
    {
      id: 'bh-konver-lovable',
      badge: 'LOVABLE & BH KONVER',
      shortName: '01. BH KONVER',
      tagColor: 'bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] text-[#0A1628] font-extrabold',
      title: 'BH KONVER – Kreira Pravne Dokumente, Prevodi i Konvertuje!',
      subtitle: 'Autorska web aplikacija B&H Assistant d.o.o. na domenu https://bh-konver.lovable.app',
      description: 'Automatizovana izrada ugovora, punomoći, izjava i prevoda u sekundi. Pobjednik natjecanja i izglasana Aplikacija Sedmice sa osiguranim razvojem iOS i Android nativnih aplikacija od tima Lovable.',
      url: 'https://bh-konver.lovable.app/',
      buttonText: 'Pokreni BH KONVER App',
      bannerImg: IMAGES.bhKonverBanner,
      icon: Sparkles,
      bullets: [
        'Kreira pravne dokumente, prevodi i konvertuje za Vas',
        'Zvanični pobjednik i izglasana Aplikacija Sedmice',
        'Finansiran i u izradi zvanični iOS & Android app od tima Lovable',
        'Brzo, sigurno i 100% besplatno za građane i pravna lica'
      ]
    },
    {
      id: 'touch-ecommerce',
      badge: 'TOP E-COMMERCE TECH 📱',
      shortName: '02. TOUCH Tech',
      tagColor: 'bg-gradient-to-r from-[#FF7A00] via-[#FFA500] to-[#00C9A7] text-[#0A1628] font-extrabold',
      title: 'TOUCH (touch.com.ua) – Pametni Telefoni, Računari i Elektronika',
      subtitle: 'Popularna ukrajinska e-commerce platforma i novi partner B&H Assistant d.o.o.',
      description: 'Veliki online retailer potrošačke elektronike specijaliziran za pametne telefone (Apple, Samsung, Xiaomi), laptope, Apple/Xiaomi ekosisteme, alternativno napajanje (EcoFlow, Bluetti generatori, Power Bank) i provjerenu outlet tehniku.',
      url: 'https://wbbsv.com/c/ynys1f2mjpfe02eff2310e81904d8b/',
      buttonText: 'Posjeti TOUCH Trgovinu',
      bannerImg: IMAGES.touchBanner,
      icon: Smartphone,
      bullets: [
        'Širok asortiman vodećih brendova: Apple iPhone, Samsung, Xiaomi, Pixel',
        'Fokus na originalni Apple & Xiaomi ekosistem i pametne domove',
        'Oprema za autonomiju i energiju: EcoFlow, Bluetti solarni/inverter generatori',
        'Audio, gejming oprema i provjerena outlet/polovna tehnika'
      ]
    },
    {
      id: 'bh-papirfinder-atoms',
      badge: 'ATOMS & E-UPRAVA',
      shortName: '03. PapirFinder',
      tagColor: 'bg-gradient-to-r from-[#C9A84C] via-[#FFD700] to-[#00C9A7] text-[#0A1628] font-extrabold',
      title: 'BH PapirFinder – Više Ne Ganjate Papire, Oni Dolaze Vama!',
      subtitle: 'E-Uprava i administrativni asistent na domenu https://bhpapirfinder.atoms.world',
      description: 'Zaboravite šaltere i čekanja u redovima! BH PapirFinder automatski pronalazi i priprema sve potrebne općinske, kantonalne i državne papire, takse i obrasce direktno za Vas.',
      url: 'https://bhpapirfinder.atoms.world',
      buttonText: 'Otvori BH PapirFinder',
      bannerImg: IMAGES.bhPapirfinderBanner,
      icon: Layers,
      bullets: [
        'Slogan: VIŠE NE GANJATE PAPIRE - ONI DOLAZE VAMA!',
        'Automatska baza obrazaca, taksi i općinskih zahtjeva',
        'Smanjuje birokratiju i štedi Vaše vrijeme i novac',
        'Povezano na Atoms platformi B&H Assistant ekosistema'
      ]
    },
    {
      id: 'aliexpress-admitad',
      badge: 'ADMITAD • ALIEXPRESS WW',
      shortName: '03. AliExpress WW',
      tagColor: 'bg-gradient-to-r from-[#FF4747] via-[#FF6A00] to-[#FFD700] text-white font-extrabold',
      title: 'AliExpress Worldwide – Ekskluzivne Ponude & Popusti',
      subtitle: 'Službena Admitad partnerska ponuda na domenu https://bh-assistant.ba',
      description: 'Kupujte milione artikala iz tehnologije, mode, doma i elektronike uz ekskluzivne kupone i besplatnu dostavu za Bosnu i Hercegovinu i regiju preko zvaničnog Admitad partnerstva B&H Assistant d.o.o.',
      url: 'https://rzekl.com/g/giqeddbbgxfe02eff23116525dc3e8/?i=4',
      buttonText: 'Otvori AliExpress Ponude',
      bannerImg: 'https://ad.admitad.com/b/giqeddbbgxfe02eff23116525dc3e8/',
      icon: ShoppingBag,
      bullets: [
        'Zvanični Admitad partnerski link za AliExpress Worldwide',
        'Globalni popusti, promo kodovi i posebne akcije za BiH',
        'Verifikovan preko Mitgo/Admitad mreže (ID: fe02eff231)',
        'Ekskluzivni povrat i sigurna kupovina preko zvaničnog kanala'
      ]
    },
    {
      id: 'mitgo-xpuvo',
      badge: 'MITGO GLOBAL DEALS & PARTNER 🌟',
      shortName: '03. Global Deals',
      tagColor: 'bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] text-[#0A1628] font-extrabold',
      title: 'Mitgo Global Deals – Ekskluzivni Popusti & Partnerski Program',
      subtitle: 'Ovlašteni partnerski kanal B&H Assistant d.o.o. na domeni https://bh-assistant.ba',
      description: 'Iskoristite provjerene pogodnosti, digitalne alate i globalne popuste vodećih svjetskih brendova kroz ovlaštenu partnersku mrežu B&H Assistant d.o.o. Zenica. Kupujte i koristite vodeće servise uz ekskluzivne pogodnosti.',
      url: 'https://xpuvo.com/g/ofc53p8nisfe02eff231e94db72a90/',
      buttonText: 'Otvori Partnerske Ponude',
      bannerImg: IMAGES.xpuvoLogo,
      icon: Globe,
      bullets: [
        'Zvanični B&H Assistant autorizovani partnerski kanal',
        'Ekskluzivni promo kodovi i globalni popusti',
        'Sigurna kupovina i provjereni brendovi širom svijeta',
        'Povezano sa B&H Assistant d.o.o. digitalnim ekosistemom'
      ]
    },
    {
      id: 'mitgo-admitad',
      badge: 'MITGO / ADMITAD OBNOVLJENI GATEWAY 🌐',
      shortName: '04. Mitgo Gateway',
      tagColor: 'bg-gradient-to-r from-[#C9A84C] via-[#FFD700] to-[#00C9A7] text-[#0A1628] font-extrabold',
      title: 'Mitgo & Admitad – Obnovljeni Partnerski Gateway',
      subtitle: 'Zvanično verifikovani izdavač i partner na domenu https://bh-assistant.ba',
      description: 'Pristupite stotinama vodećih svetskih e-commerce brendova, digitalnih servisa i CPA programa. Naš sajt bh-assistant.ba je zvanično verifikovan u Mitgo/Admitad mreži za monetizaciju i ekskluzivne partnerske popuste.',
      url: 'https://rzekl.com/g/1e8d114494fe02eff23116525dc3e8/',
      buttonText: 'Otvori Mitgo Partner Portal',
      bannerImg: IMAGES.rzeklLogo,
      icon: Globe,
      bullets: [
        'Zvanično obnovljen i verifikovan gateway (Mitgo ID: fe02eff231)',
        'Ekskluzivni popusti i promotivni kodovi globalnih brendova',
        'Transparentan obračun i direktne provizije za partnere',
        'Povezano sa B&H Assistant d.o.o. digitalnim ekosistemom'
      ]
    },
    {
      id: 'remote-rocketship',
      badge: 'REMOTE WORK BIH',
      shortName: '05. Remote Rocket',
      tagColor: 'bg-[#C9A84C] text-[#0A1628] font-extrabold',
      title: 'Remote Rocketship – Najbolji Poslovi od Kuće',
      subtitle: 'Pronađite plaćene poslove od kuće i globalne remote prilike za BiH i dijasporu',
      description: 'Pretražite stotine provjerenih remote pozicija u IT-ju, marketingu, dizajnu i podršci. Prilagođeno za stručnjake i kandidate iz Bosne i Hercegovine i dijaspore sa mogućnošću rada za kompanije iz EU i SAD.',
      url: 'https://remoterocketship.com/?ref=posaoodkuce',
      buttonText: 'Otvori Remote Poslove',
      bannerImg: IMAGES.remoteRocket,
      icon: Briefcase,
      bullets: [
        'Najbolja stranica za Remote Poslove u BiH i regiji',
        'Direktan kontakt sa vrhunskim inostranim poslodavcima',
        'Transparentne plate u EUR/USD, rad od kuće i fleksibilno radno vrijeme',
        'Ažurirane pozicije za developere, dizajnere i virtuelne asistente'
      ]
    },
    {
      id: 'atoms-dev',
      badge: 'AI AGENT MATRIX',
      shortName: '06. Atoms Dev AI',
      tagColor: 'bg-[#00C9A7] text-[#0A1628] font-extrabold',
      title: 'Atoms.dev – Pretvori Ideju u AI Proizvod',
      subtitle: 'Inovativna AI i cloud platforma za izradu pametnih aplikacija',
      description: 'Izgradite, testirajte i skalirajte napredne AI agente i moderne veb aplikacije u rekordnom roku. Prevorite svaku ideju u stvarni, operativni softverski proizvod uz podršku B&H Assistant partnerstva.',
      url: 'https://atoms.dev/?utm_source=affiliate&via=pretvori-ideju-u-realnost',
      buttonText: 'Isprobaj Atoms Platformu',
      bannerImg: IMAGES.atomsDev,
      icon: Cpu,
      bullets: [
        'Brzo kreiranje i samostalno skaliranje AI agenata',
        'Pristupačan interfejs bez komplicirane infrastrukture',
        'Ekskluzivni partnerski pristup za bh. programe i projekte',
        'Pretvori ideju u stvarni proizvod uz napredne alate'
      ]
    },
    {
      id: 'alison-global',
      badge: 'FREE GLOBAL DIPLOMA',
      shortName: '07. Alison Edu',
      tagColor: 'bg-gradient-to-r from-[#00C9A7] to-[#C9A84C] text-[#0A1628] font-extrabold',
      title: 'Alison – Besplatni Certificirani Kursevi',
      subtitle: '100% Online edukacija sa međunarodno priznatim diplomama',
      description: 'Ukoliko tražite korisne, certificirane edukativne kurseve iz raznih svjetskih oblasti — imate priliku da besplatno upišete tečajeve u saradnji sa Alison platformom. Predavači su profesori sa priznatih svjetskih univerziteta.',
      url: 'https://alison.com/?utm_source=alison_user&utm_medium=affiliate&utm_campaign=56404529',
      buttonText: 'Upiši Besplatne Kurseve',
      bannerImg: IMAGES.alisonLogo,
      icon: GraduationCap,
      bullets: [
        'Predavanja i testiranje znanja su 100% online',
        'Predavači su profesori sa priznatih svjetskih univerziteta',
        'Certifikati i diplome priznate u EU, SAD i širom svijeta',
        'Širok izbor: IT, Poslovanje, Jezici, Menadžment, Dizajn'
      ]
    },
    {
      id: 'bcx-crypto',
      badge: 'BLOCKCHAIN BIH',
      shortName: '06. BCX Krypto',
      tagColor: 'bg-gradient-to-r from-[#9333EA] to-[#C084FC] text-white font-extrabold',
      title: 'BCX.ba – Prva Domaća Kripto Platforma',
      subtitle: 'Sigurna kupovina, prodaja i pohrana digitalne imovine u BiH',
      description: 'Povežite se sa vodećom bh. kripto mrežom. Jednostavno kupujte i prodajte Bitcoin, Ethereum i druge digitalne valute sa podrškom za lokalne tekuće račune u BAM (konvertibilnim markama).',
      url: 'https://bcx.ba',
      buttonText: 'Pristupi BCX Mjenjačnici',
      icon: Database,
      bullets: [
        'Prva i najveća licencirana kripto platforma u BiH',
        'Brze uplate i isplate u konvertibilnim markama (BAM)',
        'Ekskluzivna partnerska podrška za B&H Assistant zajednicu',
        'Mogućnost plaćanja i trgovanja digitalnom imovinom'
      ]
    },
    {
      id: 'scena-magazin-promo',
      badge: 'SCENA+ PRINT & E-IZDANJE',
      shortName: '07. SCENA+ Magazin',
      tagColor: 'bg-gradient-to-r from-[#C9A84C] via-[#FFD700] to-[#00C9A7] text-[#0A1628] font-extrabold',
      title: 'SCENA+ Magazin – Spajamo Kulture, Stvaramo Šanse!',
      subtitle: 'Prvi urbani magazin ZDK sa ekskluzivnim pričama i video prezentacijom',
      description: 'Zavirite u prvo štampano i e-izdanje urbanog magazina SCENA+. Otkrijte autentične priče o umjetnosti Danila Kese, craft pivarama, esport gamingu, kripto revoluciji i privrednim sajmovima.',
      url: 'https://canva.link/vxekpnx0ow1xvt9',
      buttonText: 'Prelistaj Magazin na Canva',
      bannerImg: IMAGES.scenaCover,
      icon: BookOpen,
      bullets: [
        'Podijeljeno 300 besplatnih štampanih primjeraka u ZDK',
        'Interaktivni Canva e-čitač i multimedijalna video prezentacija',
        'Kultura, umjetnost, domaći biznis i tehnologija na jednom mjestu',
        'Zvanično izdanje B&H Assistant d.o.o. Zenica'
      ]
    }
  ];

  // Auto slide rotation every 5 seconds (5000ms)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % affiliateSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, affiliateSlides.length]);

  const filteredCourses = AFFILIATE_COURSES.filter((course) => {
    const matchesCat = selectedCategory === 'Sve' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeSlide = affiliateSlides[currentSlide];
  const IconComponent = activeSlide.icon;

  return (
    <section id="shop" className="py-24 bg-[#0A1628] relative overflow-hidden border-t border-[#1A3152]">
      {/* Energetic Fluid Neon Animated Glowing Mesh Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#00C9A7] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C9A84C] rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2038] border border-[#00C9A7]/50 text-[#00C9A7] text-xs font-mono tracking-wider uppercase shadow-lg shadow-[#00C9A7]/10">
            <Radio className="w-3.5 h-3.5 text-[#00C9A7] animate-ping" />
            <span>{t('shop.badge', 'SCI-FI AFFILIATE MATRIX • 6 PLATFORMI')}</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight">
            {t('shop.title', 'Affiliate Mreža & Preporučeni Kursevi')}
          </h2>

          <p className="text-[#F5F0E8]/70 text-base font-sans leading-relaxed">
            {t('shop.subtitle', 'Povezujemo vas sa provjerenim remote radnim mjestima, vodećim AI platformama, verifikovanim partnerima i globalnim online akademijama.')}
          </p>
        </div>

        {/* Dynamic High-Tech Sci-Fi Carousel for 6 Affiliated Links */}
        <div
          className="mb-16 rounded-3xl bg-gradient-to-br from-[#0B1A2F] via-[#0F2038] to-[#06101E] border-2 border-[#00C9A7]/80 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,201,167,0.2)] relative overflow-hidden group transition-all duration-500"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Futuristic Cyber Sci-Fi Frame Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00C9A7] z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00C9A7] z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00C9A7] z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00C9A7] z-20 pointer-events-none" />

          {/* HUD Top Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#00C9A7]/80 mb-6 pb-3 border-b border-[#1A3152] relative z-20">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0A1628] border border-[#00C9A7]/40 text-[#00C9A7] font-bold">
                <Terminal className="w-3 h-3 text-[#C9A84C]" />
                SYS.MATRIX: ACTIVE
              </span>
              <span className="hidden sm:inline text-[#F5F0E8]/40">| VERIFIED AFFILIATE PIPELINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#C9A84C] font-extrabold tracking-widest">[ 0{currentSlide + 1} / 0{affiliateSlides.length} ]</span>
            </div>
          </div>

          {/* Top Progress Bar for 5s Timer */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A3152] z-20">
            <div
              key={currentSlide}
              className="h-full bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] animate-[progress_5s_linear]"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            />
          </div>

          {/* Watermark Icon */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 pointer-events-none">
            <IconComponent className="w-80 h-80 text-[#00C9A7] animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full font-syne font-black text-xs uppercase tracking-wider ${activeSlide.tagColor}`}>
                  {activeSlide.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-mono font-bold">
                  AUTORIZOVANI LINK • PARTNER B&H ASSISTANT
                </span>
              </div>

              <div>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8]">
                  {activeSlide.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#00C9A7] mt-1 font-semibold">
                  {activeSlide.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#F5F0E8]/90 leading-relaxed font-sans bg-[#0A1628]/90 p-5 rounded-2xl border border-[#00C9A7]/30 backdrop-blur-md">
                {activeSlide.description}
              </p>

              {/* Verified Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#F5F0E8]">
                {activeSlide.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0A1628]/70 border border-[#1A3152]">
                    <CheckCircle className="w-4 h-4 text-[#00C9A7] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Launcher Box */}
            <div className="lg:col-span-4 flex flex-col justify-center items-center text-center space-y-5 bg-[#0A1628]/90 p-6 rounded-2xl border-2 border-[#00C9A7]/50 shadow-[0_0_30px_rgba(0,201,167,0.15)] relative">
              {activeSlide.bannerImg ? (
                <div className="w-full bg-[#0F2038] p-3 rounded-2xl border border-[#00C9A7]/60 flex flex-col items-center justify-center overflow-hidden shadow-lg">
                  <span className="text-[10px] font-mono text-[#00C9A7] font-bold mb-2">OFFICIAL ADMITAD BANNER</span>
                  <a href={activeSlide.url} target="_blank" rel="nofollow noreferrer" className="w-full hover:opacity-90 transition-opacity">
                    <SafeImage
                      src={activeSlide.bannerImg}
                      alt={activeSlide.title}
                      fallbackTitle={activeSlide.title}
                      fallbackSubtitle={activeSlide.subtitle}
                      className="max-w-full h-auto rounded border border-[#1A3152] shadow-md"
                    />
                  </a>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#0F2038] border border-[#00C9A7] p-4 shadow-lg flex items-center justify-center text-[#00C9A7] relative group-hover:scale-110 transition-transform">
                  <IconComponent className="w-10 h-10" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#00C9A7] animate-ping" />
                </div>
              )}
              
              <div>
                <h4 className="font-syne font-bold text-lg text-[#F5F0E8]">
                  Direktan Pristup
                </h4>
                <p className="text-xs text-[#F5F0E8]/70 mt-1 font-sans">
                  Klikom otvarate zvanični partnerski portal:
                </p>
              </div>

              <a
                href={activeSlide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#00C9A7] via-[#00E5BE] to-[#C9A84C] hover:from-[#C9A84C] hover:to-[#00C9A7] text-[#0A1628] font-syne font-extrabold text-xs tracking-wider shadow-[0_0_20px_rgba(0,201,167,0.4)] hover:scale-[1.03] transition-all flex items-center justify-center gap-2"
              >
                <span>{activeSlide.buttonText}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Prev / Next Controls */}
              <div className="flex items-center justify-between w-full pt-3 border-t border-[#1A3152]">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + affiliateSlides.length) % affiliateSlides.length)}
                  className="p-2 rounded-xl bg-[#0F2038] hover:bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#F5F0E8] transition-colors"
                  aria-label="Prethodni baner"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-[10px] font-mono text-[#F5F0E8]/60">
                  {currentSlide + 1} OD {affiliateSlides.length} BANERA
                </span>

                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % affiliateSlides.length)}
                  className="p-2 rounded-xl bg-[#0F2038] hover:bg-[#00C9A7]/20 border border-[#00C9A7]/40 text-[#F5F0E8] transition-colors"
                  aria-label="Sjedeći baner"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Sci-Fi Cyber Carousel Selector Buttons (8 Platforms) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-8 pt-6 border-t border-[#1A3152] relative z-20">
            {affiliateSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`py-2.5 px-3 rounded-xl text-left text-[11px] font-mono transition-all border ${
                  currentSlide === idx
                    ? 'bg-[#00C9A7] text-[#0A1628] border-[#00C9A7] font-extrabold shadow-[0_0_15px_rgba(0,201,167,0.5)] scale-105'
                    : 'bg-[#0A1628]/80 text-[#F5F0E8]/70 hover:text-[#00C9A7] border border-[#1A3152] hover:border-[#00C9A7]/50'
                }`}
              >
                <div className="truncate">{slide.shortName}</div>
              </button>
            ))}
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#0F2038] p-4 rounded-2xl border border-[#1A3152]">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#00C9A7] text-[#0A1628]'
                    : 'bg-[#0A1628] text-[#F5F0E8]/80 hover:text-[#00C9A7] border border-[#1A3152]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0E8]/50" />
            <input
              id="shop-course-search"
              name="courseSearch"
              aria-label="Pretraži kurseve"
              type="text"
              placeholder="Pretraži kurseve..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0A1628] border border-[#1A3152] text-xs text-[#F5F0E8] focus:border-[#00C9A7] outline-none"
            />
          </div>

        </div>

        {/* Courses Cards Grid with Shimmer */}
        {isTransitioning ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-3xl bg-[#0F2038] border border-[#1A3152] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden space-y-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full animate-shimmer" />
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-[#1A3152]/60 rounded-full w-24" />
                  <div className="h-4 bg-[#1A3152]/40 rounded-full w-20" />
                </div>
                <div className="h-28 bg-[#0A1628] rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full animate-shimmer" />
                </div>
                <div className="h-6 bg-[#1A3152]/70 rounded-md w-3/4" />
                <div className="h-4 bg-[#1A3152]/40 rounded-md w-full" />
                <div className="h-4 bg-[#1A3152]/40 rounded-md w-2/3" />
                <div className="pt-4 border-t border-[#1A3152]">
                  <div className="h-10 bg-[#1A3152]/60 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const isGuruShots = course.id === 'gurushots-yusufowych';

              return (
                <motion.div
                  key={course.id}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: isGuruShots 
                      ? "0 0 35px -5px rgba(201, 168, 76, 0.35)" 
                      : "0 0 35px -5px rgba(0, 201, 167, 0.3)",
                    borderColor: isGuruShots ? "rgba(201, 168, 76, 0.8)" : "rgba(0, 201, 167, 0.7)",
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    if (course.affiliateUrl) {
                      window.open(course.affiliateUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className={`rounded-3xl bg-[#0F2038] border ${
                    isGuruShots ? 'border-[#C9A84C]/50' : 'border-[#1A3152]'
                  } p-6 flex flex-col justify-between shadow-xl transition-all group cursor-pointer relative overflow-hidden`}
                >
                  {/* Subtle Shimmer Loading Effect Layer */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.035] to-transparent -translate-x-full animate-shimmer" />
                  </div>

                  {/* Subtle Glow Corner */}
                  <div
                    className={`absolute top-0 right-0 w-28 h-28 ${
                      isGuruShots ? 'bg-gradient-to-bl from-[#C9A84C]/15' : 'bg-gradient-to-bl from-[#00C9A7]/10'
                    } to-transparent rounded-bl-full pointer-events-none group-hover:opacity-100 transition-opacity`}
                  />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${
                        isGuruShots
                          ? 'bg-[#0A1628] text-[#C9A84C] border-[#C9A84C]/40'
                          : 'bg-[#0A1628] text-[#00C9A7] border-[#00C9A7]/30'
                      }`}
                    >
                      {course.badge}
                    </span>
                    <span className="text-[10px] font-mono text-[#C9A84C]">
                      {course.category}
                    </span>
                  </div>

                  {/* Visual Preview for Photography / Visual Cards */}
                  {course.image && (
                    <div className="rounded-2xl overflow-hidden border border-[#1A3152] bg-[#0A1628] aspect-video flex items-center justify-center p-2 group-hover:border-[#00C9A7]/40 transition-colors">
                      <SafeImage
                        src={course.image}
                        alt={course.title}
                        fallbackTitle={course.title}
                        fallbackSubtitle={course.provider}
                        className="max-h-full max-w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <h4
                    className={`font-syne font-bold text-lg text-[#F5F0E8] ${
                      isGuruShots ? 'group-hover:text-[#C9A84C]' : 'group-hover:text-[#00C9A7]'
                    } transition-colors flex items-center justify-between gap-2`}
                  >
                    <span>{course.title}</span>
                    {isGuruShots && <Camera className="w-4 h-4 text-[#C9A84C] shrink-0" />}
                  </h4>

                  <p className="text-xs text-[#F5F0E8]/70 font-sans leading-relaxed">
                    {course.description}
                  </p>

                  <ul className="space-y-1.5 text-[11px] text-[#F5F0E8]/80 font-sans pt-2 border-t border-[#1A3152]">
                    {course.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isGuruShots ? 'bg-[#C9A84C]' : 'bg-[#00C9A7]'
                          }`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 relative z-10">
                  <a
                    href={course.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full py-3 px-4 rounded-xl font-syne font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 ${
                      isGuruShots
                        ? 'bg-[#0A1628] hover:bg-[#C9A84C] border border-[#C9A84C]/40 text-[#C9A84C] hover:text-[#0A1628]'
                        : 'bg-[#0A1628] hover:bg-[#00C9A7] border border-[#00C9A7]/40 text-[#00C9A7] hover:text-[#0A1628]'
                    }`}
                  >
                    <span>{isGuruShots ? 'Otvori GuruShots Portfolio' : 'Pristupi Partnerskom Linku'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
        )}

      </div>
    </section>
  );
};
