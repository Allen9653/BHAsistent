import type { CompanyService, DigitalTool, DevelopmentProject } from '../types';
import { COMPANY_SERVICES, DIGITAL_TOOLS, DEVELOPMENT_PROJECTS } from './companyData';
import type { Language } from './translations';

/**
 * Lokalizovani sadržaj za 8 IT usluga i 3 digitalna alata.
 * - BS: originalni tekst iz companyData.ts (fallback)
 * - EN/DE/TR: prevodi sa ključnim razlikama
 *
 * Korištenje:
 *   const services = getLocalizedServices(language); // vraća CompanyService[]
 *   const tools = getLocalizedTools(language);
 */

type LocalText = Partial<Record<Language, string>>;
type LocalList = Partial<Record<Language, string[]>>;

interface LocalizedServiceOverride {
  title: LocalText;
  subtitle: LocalText;
  shortDescription: LocalText;
  description: LocalText;
  model: LocalText;
  category: LocalText;
  features: LocalList;
}

const SERVICE_I18N: Record<string, LocalizedServiceOverride> = {
  'lead-generation-target-market-mapping': {
    title: {
      en: 'B2B Lead Generation & Target Market Mapping',
      de: 'B2B Lead-Generierung & Zielmarkt-Analyse',
      tr: 'B2B Müşteri Adayı Oluşturma ve Hedef Pazar Haritalaması',
    },
    subtitle: { en: 'Target databases & client acquisition', de: 'Ziel-Datenbanken & Kundengewinnung', tr: 'Hedef veri tabanları ve müşteri kazanımı' },
    shortDescription: { en: 'Market research, target databases and B2B client acquisition in BiH and the region.', de: 'Marktforschung, Zieldatenbanken und B2B-Kundengewinnung in BiH und der Region.', tr: 'Bosna Hersek ve bölgede pazar araştırması, hedef veri tabanları ve B2B müşteri kazanımı.' },
    description: {
      en: 'Market research, mapping of specific industries, creation of precise and up-to-date databases of potential clients and customers in BiH and the Western Balkans, and preparation of personalised direct B2B offers.',
      de: 'Marktforschung, Zuordnung einzelner Branchen, Erstellung präziser und aktueller Datenbanken potenzieller Kunden in BiH und dem Westbalkan sowie Erstellung personalisierter B2B-Angebote.',
      tr: 'Pazar araştırması, belirli sektörlerin haritalaması, Bosna Hersek ve Batı Balkan\'da potansiyel müşteri veri tabanları oluşturulması ve kişiselleştirilmiş B2B tekliflerinin hazırlanması.',
    },
    model: { en: 'Remote (monthly retainer or project-based)', de: 'Remote (Monatsretainer oder projektbezogen)', tr: 'Uzaktan (aylık retainer veya projeye dayalı)' },
    category: { en: 'B2B Marketing & Sales', de: 'B2B Marketing & Vertrieb', tr: 'B2B Pazarlama ve Satış' },
    features: {
      en: ['In-depth mapping of industry verticals in BiH & the region', 'Verified contact databases of decision-makers (C-level, directors, procurement)', 'Direct outreach strategy & B2B offer preparation', 'Regular monthly reports & conversion analysis'],
      de: ['Tiefes Mapping von Branchen in BiH und der Region', 'Geprüfte Kontaktdatenbanken von Entscheidern (C-Level, Direktoren, Einkauf)', 'Outreach-Strategie und B2B-Angebote', 'Monatliche Berichte und Conversion-Analyse'],
      tr: ['Bosna Hersek ve bölgede sektör dikeylerinin derinlemesine haritalanması', 'Karar vericilerin doğrulanmış iletişim veri tabanları (C-level, yöneticiler, tedarik)', 'Doğrudan iletişim stratejisi ve B2B teklif hazırlığı', 'Düzenli aylık raporlar ve dönüşüm analizi'],
    },
  },
  'full-cycle-digital-pr-social-media': {
    title: { en: 'Full-Cycle Digital PR & Social Media Management', de: 'Full-Cycle Digital PR & Social Media Management', tr: 'Kapsamlı Dijital PR ve Sosyal Medya Yönetimi' },
    subtitle: { en: 'Complete management of digital presence & reputation', de: 'Komplette Betreuung von digitaler Präsenz & Reputation', tr: 'Dijital varlık ve itibar yönetim hizmeti' },
    shortDescription: { en: 'Complete management of digital PR, branding and multilingual social networks.', de: 'Komplette Betreuung von Digital-PR, Branding und mehrsprachigen Social Media.', tr: 'Dijital PR, markalaşma ve çok dilli sosyal medya yönetimi.' },
    description: { en: 'Complete management of digital presence for companies, brands and public figures. Includes professional PR releases, visual identity, multilingual copywriting (BHS + German & English) and strategic social media management.', de: 'Komplette Betreuung der digitalen Präsenz für Unternehmen, Marken und Privatpersonen. Umfasst professionelle PR-Texte, visuelle Identität, mehrsprachiges Copywriting (BHS + Deutsch & Englisch) und strategisches Social-Media-Management.', tr: 'Şirketler, markalar ve ünlü kişiler için dijital varlık yönetimi. Profesyonel PR metinleri, görsel kimlik, çok dilli metin yazarlığı (BHS + Almanca ve İngilizce) ve stratejik sosyal medya yönetimi içerir.' },
    model: { en: 'Remote / Hybrid', de: 'Remote / Hybrid', tr: 'Uzaktan / Hibrit' },
    category: { en: 'Digital PR & Communications', de: 'Digital-PR & Kommunikation', tr: 'Dijital PR ve İletişim' },
    features: {
      en: ['Press release writing and distribution', 'Visual posts and authored content for social media', 'Multilingual marketing: Bosnian/Croatian/Serbian, German and English', 'Crisis communication management & online reputation building'],
      de: ['Pressearbeit und Verteilung für Medien', 'Visuelle Beiträge und Autoreninhalte für Social Media', 'Mehrsprachiges Marketing: Bosnisch/Kroatisch/Serbisch, Deutsch und Englisch', 'Krisenkommunikation und Online-Reputation'],
      tr: ['Basın bülteni hazırlama ve dağıtımı', 'Sosyal medya için görsel gönderiler ve özgün içerikler', 'Çok dilli pazarlama: Boşnakça/Hırvatça/Sırpça, Almanca ve İngilizce', 'Kriz iletişimi ve çevrimiçi itibar yönetimi'],
    },
  },
  'custom-web-digital-tool-setup': {
    title: { en: 'Custom Web & Digital Tool Setup', de: 'Custom Web & Digital Tool Setup', tr: 'Özel Web ve Dijital Araç Kurulumu' },
    subtitle: { en: '"Turnkey" business digitalisation packages', de: '"Schlüsselfertige" Pakete zur Digitalisierung', tr: '"Anahtar teslim" işletme dijitalleşme paketleri' },
    shortDescription: { en: '"Turnkey" business digitalisation packages (from 900 BAM) with BH Konver integration.', de: '"Schlüsselfertige" Digitalisierungspakete (ab 900 KM) mit BH-Konver-Integration.', tr: 'BH Konver entegrasyonlu "anahtar teslim" dijitalleşme paketleri (900 BAM\'den başlayan).' },
    description: { en: 'Development of fast, modern web solutions (including popular start packages for digitalisation from 900 BAM) with integration of advanced tools like BH Konver, custom business calculators and legal declaration systems for SMEs.', de: 'Schnelle, moderne Weblösungen (inkl. beliebter Startpakete ab 900 KM) mit Integration moderner Tools wie BH Konver, maßgeschneiderter Geschäftsrechner und Systemen für rechtliche Erklärungen.', tr: 'BH Konver gibi gelişmiş araçların, özel işletme hesaplayıcılarının ve hukuki beyanname sistemlerinin entegrasyonu ile hızlı, modern web çözümleri (900 BAM\'den başlayan popüler başlangıç paketleri dahil).' },
    model: { en: 'Project-based (turnkey)', de: 'Projektbezogen (schlüsselfertig)', tr: 'Projeye dayalı (anahtar teslim)' },
    category: { en: 'Web Development & Tools', de: 'Webentwicklung & Tools', tr: 'Web Geliştirme ve Araçlar' },
    features: {
      en: ['Fast delivery of modern responsive websites (from 900 BAM)', 'Integration of interactive calculators for taxes, currencies and units', 'Automation of legal declarations and administrative forms', 'Complete domain, hosting, SSL and corporate email setup'],
      de: ['Schnelle Erstellung moderner responsiver Webseiten (ab 900 KM)', 'Integration interaktiver Rechner für Steuern, Währungen und Einheiten', 'Automatisierung rechtlicher Erklärungen und Formulare', 'Komplette Domain-, Hosting-, SSL- und Firmen-E-Mail-Einrichtung'],
      tr: ['Modern ve duyarlı web sitelerinin hızlı teslimi (900 BAM\'den başlayan)', 'Vergi, para birimi ve birim hesaplayıcılarının entegrasyonu', 'Hukuki beyanname ve idari form otomasyonu', 'Domain, hosting, SSL ve kurumsal e-posta kurulumu'],
    },
  },
  'multilingual-content-localization-copywriting': {
    title: { en: 'Multilingual Content Localization & Copywriting', de: 'Mehrsprachige Content-Lokalisierung & Copywriting', tr: 'Çok Dilli İçerik Yerelleştirme ve Metin Yazarlığı' },
    subtitle: { en: 'Professional texts & localisation for DACH and the region', de: 'Fachtexte & Lokalisierung für DACH und Region', tr: 'DACH ve bölge için profesyonel metinler ve yerelleştirme' },
    shortDescription: { en: 'Creation and professional localisation of software and texts for DACH and Western Balkan markets.', de: 'Erstellung und professionelle Lokalisierung von Software und Texten für DACH und Westbalkan.', tr: 'DACH ve Batı Balkan pazarları için yazılım ve metin oluşturma ve profesyonel yerelleştirme.' },
    description: { en: 'Creation and professional translation of specialised texts, advertisements, technical documentation and marketing materials adapted to the Western Balkans and German-speaking markets (Germany, Austria, Switzerland).', de: 'Erstellung und professionelle Übersetzung von Fachtexten, Werbetexten, technischer Dokumentation und Marketingmaterialien für den Westbalkan und den deutschsprachigen Raum.', tr: 'Batı Balkan ve Almanca konuşulan bölgeler (Almanya, Avusturya, İsviçre) pazarlarına uygun uzman metinler, reklamlar, teknik belgeler ve pazarlama materyalleri oluşturulması ve profesyonel çevirisi.' },
    model: { en: 'Remote per project or hour', de: 'Remote pro Projekt oder Stunde', tr: 'Projeye veya saate göre uzaktan' },
    category: { en: 'Localisation & Languages', de: 'Lokalisierung & Sprachen', tr: 'Yerelleştirme ve Diller' },
    features: {
      en: ['Professional translation and localisation into German and English', 'SEO-optimised articles and blog posts for foreign markets', 'Software interface and e-commerce catalogue localisation', 'High-conversion landing page copywriting'],
      de: ['Professionelle Übersetzung und Lokalisierung ins Deutsche und Englische', 'SEO-optimierte Artikel und Blogbeiträge für ausländische Märkte', 'Lokalisierung von Software-Oberflächen und E-Commerce-Katalogen', 'Verkaufsstarke Landingpages'],
      tr: ['Almanca ve İngilizceye profesyonel çeviri ve yerelleştirme', 'Yabancı pazarlar için SEO uyumlu makaleler ve blog yazıları', 'Yazılım arayüzleri ve e-ticaret katalog yerelleştirmesi', 'Yüksek dönüşümlü açılış sayfası metinleri'],
    },
  },
  'digitalizacija-arhive-poslovnih-dokumenata-saas': {
    title: { en: 'Business Archive Digitisation & SaaS Documents', de: 'Archivdigitalisierung & SaaS-Dokumentensuche', tr: 'İş Arşivi Dijitalleştirme ve SaaS Belge Arama' },
    subtitle: { en: 'Moving paper archives to secure cloud servers', de: 'Papierarchive auf sichere Cloud-Server migrieren', tr: 'Kâğıt arşivleri güvenli bulut sunucularına taşıma' },
    shortDescription: { en: 'Digitisation of tonnes of paper archives for companies & institutions and SaaS search.', de: 'Digitalisierung von Papierarchiven für Unternehmen & Institutionen und SaaS-Suche.', tr: 'Şirketler ve kurumlar için tonlarca kâğıt arşivin dijitalleştirilmesi ve SaaS araması.' },
    description: { en: 'Digitisation of tonnes of paper archives for companies and institutions, migration to secure servers and development of a SaaS platform for fast document search.', de: 'Digitalisierung von Papierarchiven, Migration auf sichere Server und Entwicklung einer SaaS-Plattform zur schnellen Dokumentensuche.', tr: 'Şirketler ve kurumlar için tonlarca kâğıt arşivin dijitalleştirilmesi, güvenli sunuculara taşınması ve hızlı belge arama için SaaS platformu geliştirilmesi.' },
    model: { en: 'Project-based & SaaS subscription (B2B & B2G)', de: 'Projektbezogen & SaaS-Abo (B2B & B2G)', tr: 'Proje bazlı ve SaaS aboneliği (B2B ve B2G)' },
    category: { en: 'SaaS & Archive Digitisation', de: 'SaaS & Archivdigitalisierung', tr: 'SaaS ve Arşiv Dijitalleştirme' },
    features: {
      en: ['Scanning and OCR digitisation of paper documentation', 'Storage on encrypted, secure servers compliant with archival law', 'Custom SaaS platform with instant full-text search & filtering', 'Strictly controlled access rights, audit log and regular backup'],
      de: ['Scannen und OCR-Digitalisierung von Papierdokumenten', 'Speicherung auf verschlüsselten, sicheren Servern', 'Maßgeschneiderte SaaS-Plattform mit Volltextsuche und Filter', 'Streng kontrollierte Zugriffsrechte, Audit-Log und Backup'],
      tr: ['Kâğıt belgelerin taranması ve OCR dijitalleştirilmesi', 'Şifreli, güvenli sunucularda saklama', 'Anında tam metin arama ve filtrelemeli özel SaaS platformu', 'Sıkı kontrol edilen erişim hakları, denetim izi ve düzenli yedekleme'],
    },
  },
  'web-performance-seo-deep-dive': {
    title: { en: 'Web Performance Optimisation & SEO Deep-Dive Analysis', de: 'Web-Performance-Optimierung & SEO-Analyse', tr: 'Web Performans Optimizasyonu ve SEO Detay Analizi' },
    subtitle: { en: 'Speed, Core Web Vitals and technical SEO optimisation', de: 'Geschwindigkeit, Core Web Vitals und technisches SEO', tr: 'Hız, Core Web Vitals ve teknik SEO iyileştirme' },
    shortDescription: { en: 'Page speed acceleration (Core Web Vitals), technical SEO audits and security hardening.', de: 'Seitenbeschleunigung (Core Web Vitals), technische SEO-Audits und Sicherheit.', tr: 'Sayfa hızlandırma (Core Web Vitals), teknik SEO denetimleri ve güvenlik güçlendirme.' },
    description: { en: 'Professional audit of existing client websites including detailed page-speed analysis (Core Web Vitals), technical SEO optimisation, security hardening, code refactoring and UI/UX optimisation for higher conversions.', de: 'Professionelle Prüfung bestehender Webseiten inkl. detaillierter Geschwindigkeitanalyse (Core Web Vitals), technischer SEO-Optimierung, Sicherheit und UI/UX-Optimierung für mehr Conversions.', tr: 'Mevcut web sitelerinin detaylı sayfa hızı analizi (Core Web Vitals), teknik SEO iyileştirmesi, güvenlik güçlendirme, kod düzenleme ve dönüşümler için UI/UX optimizasyonu içeren profesyonel denetim.' },
    model: { en: 'One-off optimisation or monthly maintenance contract', de: 'Einmalige Optimierung oder monatlicher Wartungsvertrag', tr: 'Tek seferlik optimizasyon veya aylık bakım sözleşmesi' },
    category: { en: 'SEO & Technical Optimisation', de: 'SEO & Technische Optimierung', tr: 'SEO ve Teknik Optimizasyon' },
    features: {
      en: ['Achieving 90+ on Google PageSpeed Insights and Lighthouse', 'Optimisation of LCP, INP and CLS (zero layout shift)', 'Technical SEO: robots.txt, sitemap.xml, Schema.org structured data', 'Code bottleneck removal and multimedia optimisation'],
      de: ['90+ bei Google PageSpeed Insights und Lighthouse anstreben', 'Optimierung von LCP, INP und CLS (kein Layout-Shift)', 'Technisches SEO: robots.txt, sitemap.xml, Schema.org', 'Bottleneck-Entfernung und Multimedia-Optimierung'],
      tr: ['Google PageSpeed Insights ve Lighthouse\'ta 90+ hedefi', 'LCP, INP ve CLS optimizasyonu (sıfır düzen kayması)', 'Teknik SEO: robots.txt, sitemap.xml, Schema.org yapılandırılmış veri', 'Kod dar boğazlarının giderilmesi ve multimedya optimizasyonu'],
    },
  },
  'custom-mobile-app-development': {
    title: { en: 'Custom Mobile App Development', de: 'Maßgeschneiderte Mobile App Entwicklung', tr: 'Özel Mobil Uygulama Geliştirme' },
    subtitle: { en: 'Native & hybrid mobile apps development (iOS & Android)', de: 'Native & hybride mobile Apps (iOS & Android)', tr: 'Native ve hibrit mobil uygulamalar (iOS ve Android)' },
    shortDescription: { en: 'Development of dedicated mobile apps for iOS and Android from concept to store publication.', de: 'Maßgeschneiderte mobile Apps für iOS und Android von der Idee bis zur Veröffentlichung.', tr: 'Konseptten mağaza yayınlamasına kadar iOS ve Android için özel mobil uygulamalar.' },
    description: { en: 'Mobile app development tailored to specific business needs — e-commerce platforms, internal tools for field work management, booking apps, transport or service apps (from concept to publication on stores).', de: 'Mobile Apps für spezifische Geschäftsanforderungen — E-Commerce-Plattformen, interne Tools, Buchungs-Apps, Transport- oder Service-Apps (von der Idee bis zur Veröffentlichung).', tr: 'Belirli iş ihtiyaçlarına uygun mobil uygulama geliştirme — e-ticaret platformları, iç araçlar, rezervasyon, nakliye veya hizmet uygulamaları (konseptten mağaza yayınlamasına kadar).' },
    model: { en: 'Project-based (concept to Google Play & Apple App Store)', de: 'Projektbezogen (Konzept bis Google Play & App Store)', tr: 'Proje bazlı (konseptten Google Play ve App Store\'a)' },
    category: { en: 'Mobile Development', de: 'Mobile Entwicklung', tr: 'Mobil Geliştirme' },
    features: {
      en: ['Modern mobile app development for iOS and Android', 'Push notifications, geolocation and secure payments integration', 'Connection to existing databases and ERP systems', 'Complete App Store and Google Play certification process'],
      de: ['Moderne mobile Apps für iOS und Android', 'Push-Benachrichtigungen, Geolocation und sichere Zahlungen', 'Anbindung an bestehende Datenbanken und ERP-Systeme', 'Komplette Zertifizierung bei App Store und Google Play'],
      tr: ['iOS ve Android için modern mobil uygulamalar', 'Push bildirimler, coğrafi konum ve güvenli ödemeler', 'Mevcut veritabanlarına ve ERP sistemlerine bağlantı', 'App Store ve Google Play sertifikasyon süreci'],
    },
  },
  'web-to-app-transformation': {
    title: { en: 'Web-to-App Transformation', de: 'Web-to-App Umwandlung', tr: 'Web\'den Uygulamaya Dönüşüm' },
    subtitle: { en: 'Turning existing websites into installable mobile apps', de: 'Bestehende Webseiten in installierbare mobile Apps umwandeln', tr: 'Mevcut web sitelerini kurulabilir mobil uygulamalara dönüştürme' },
    shortDescription: { en: 'Fast transformation of an existing website into an installable mobile PWA app.', de: 'Schnelle Umwandlung einer bestehenden Website in eine installierbare PWA.', tr: 'Mevcut web sitesini hızlıca kurulabilir bir mobil PWA uygulamasına dönüştürme.' },
    description: { en: 'Highly requested and cost-effective service for business owners who already own a functional website and want to turn it into a modern mobile app (PWA or hybrid) to be directly on their customers\' screens at minimal development cost.', de: 'Sehr gefragte und kosteneffektive Dienstleistung für Unternehmer, die ihre Website in eine moderne mobile App (PWA oder Hybrid) verwandeln möchten, um bei minimalen Entwicklungskosten direkt auf den Bildschirmen ihrer Kunden zu sein.', tr: 'Zaten işlevsel bir web sitesine sahip olan ve onu minimal geliştirme maliyetleriyle modern bir mobil uygulamaya (PWA veya hibrit) dönüştürmek isteyen işletme sahipleri için çok talep gören ve uygun maliyetli hizmet.' },
    model: { en: 'Project-based (fast & cost-effective)', de: 'Projektbezogen (schnell & kosteneffektiv)', tr: 'Proje bazlı (hızlı ve uygun maliyetli)' },
    category: { en: 'PWA & Mobile Transformation', de: 'PWA & Mobile Transformation', tr: 'PWA ve Mobil Dönüşüm' },
    features: {
      en: ['Fast transformation of existing website into an installable app', 'Home-screen icon without redeveloping code', 'Offline caching support and instant launch', 'Significantly lower costs than native code development'],
      de: ['Schnelle Umwandlung einer Website in eine installierbare App', 'Icon auf dem Startbildschirm ohne Code-Neuentwicklung', 'Offline-Caching und sofortiger Start', 'Deutlich niedrigere Kosten als native Entwicklung'],
      tr: ['Mevcut web sitesini hızlıca kurulabilir bir uygulamaya dönüştürme', 'Kodun yeniden geliştirilmesine gerek kalmadan ana ekran simgesi', 'Çevrimdışı önbellek desteği ve anında başlatma', 'Native kod geliştirmeye kıyasla önemli ölçüde düşük maliyet'],
    },
  },
};

function pick<T>(local: LocalText | LocalList | undefined, lang: Language, fallback: T): T {
  if (!local) return fallback;
  const v = (local as Record<string, T | undefined>)[lang];
  return v !== undefined ? v : fallback;
}

/** Vrati lokalizovane COMPANY_SERVICES za dati jezik (fallback = BS original) */
export function getLocalizedServices(language: Language): CompanyService[] {
  return COMPANY_SERVICES.map((serv) => {
    const ov = SERVICE_I18N[serv.id];
    if (!ov) return serv;
    return {
      ...serv,
      title: pick(ov.title, language, serv.title),
      subtitle: pick(ov.subtitle, language, serv.subtitle),
      shortDescription: pick(ov.shortDescription, language, serv.shortDescription ?? serv.description),
      description: pick(ov.description, language, serv.description),
      model: pick(ov.model, language, serv.model),
      category: pick(ov.category, language, serv.category),
      features: pick(ov.features, language, serv.features ?? []) as string[],
    };
  });
}

interface LocalizedToolOverride {
  name: LocalText;
  tagline: LocalText;
  description: LocalText;
  badge: LocalText;
  deliveryNotice: LocalText;
}

const TOOL_I18N: Record<string, LocalizedToolOverride> = {
  'bh-konver': {
    name: { en: 'BH Konver – Converter & Legal Declarations', de: 'BH Konver – Umrechner & Rechtliche Erklärungen', tr: 'BH Konver – Dönüştürücü ve Hukuki Beyannameler' },
    tagline: { en: 'Universal BH digital calculator & legal generator', de: 'Universeller BH-Digitalrechner & Rechtsgenerator', tr: 'Evrensel BH dijital hesaplayıcı ve hukuki oluşturucu' },
    description: {
      en: 'Proprietary software for fast and precise calculations of taxes, currencies, construction and measurement units, with automatic generation of legally valid declarations under full criminal and material liability. Native iOS & Android apps in development via Lovable.',
      de: 'Eigene Software für schnelle und präzise Berechnungen von Steuern, Währungen sowie Bau- und Maßeinheiten mit automatischem Erstellen rechtsgültiger Erklärungen. Native iOS- & Android-Apps in Entwicklung (Lovable).',
      tr: 'Vergi, para birimi, inşaat ve ölçü birimlerinin hızlı ve hassas hesaplanması için özel yazılım, tam cezai ve maddi sorumluluk altında hukuken geçerli beyanların otomatik oluşturulması. Native iOS ve Android uygulamaları Lovable ile geliştiriliyor.',
    },
    badge: { en: 'APP OF THE WEEK & NATIVE APP 🏆', de: 'APP DER WOCHE & NATIVE APP 🏆', tr: 'HAFTANIN UYGULAMASI VE NATIVE UYGULAMA 🏆' },
    deliveryNotice: { en: 'Award-winning software tool — Lovable builds and finances native iOS and Android apps.', de: 'Preisgekröntes Softwaretool — Lovable baut und finanziert native iOS- und Android-Apps.', tr: 'Ödüllü yazılım aracı — Lovable native iOS ve Android uygulamalarını geliştiriyor ve finanse ediyor.' },
  },
  'bh-papirfinder': {
    name: { en: 'BH PapirFinder', de: 'BH PapirFinder', tr: 'BH PapirFinder' },
    tagline: { en: 'Central registry & guide for free municipal forms (In development)', de: 'Zentrales Register für kostenlose Formulare (In Entwicklung)', tr: 'Ücretsiz belediye formları için merkezi kayıt ve rehber (Geliştirmede)' },
    description: {
      en: 'Your central digital registry and smart guide for finding free forms, requests and documents of local self-government in Bosnia & Herzegovina. The tool is in active development (future domain: www.papir-finder.com).',
      de: 'Ihr zentrales digitales Register und smarter Leitfaden für kostenlose Formulare und Dokumente der lokalen Verwaltungen in Bosnien und Herzegowina. Das Tool ist in aktiver Entwicklung (künftige Domain: www.papir-finder.com).',
      tr: 'Bosna Hersek\'te yerel yönetimlerin ücretsiz formlarını, taleplerini ve belgelerini bulmak için merkezi dijital kaydınız ve akıllı rehberiniz. Araç aktif geliştirme aşamasında (gelecek domain: www.papir-finder.com).',
    },
    badge: { en: 'FREE FORMS & E-GOVERNMENT 🏛️', de: 'KOSTENLOSE FORMULARE & E-VERWALTUNG 🏛️', tr: 'ÜCRETSİZ FORMLAR VE E-DEVLET 🏛️' },
    deliveryNotice: { en: 'Available online at papir-finder.vercel.app (official domain soon: www.papir-finder.com).', de: 'Online verfügbar unter papir-finder.vercel.app (offizielle Domain bald: www.papir-finder.com).', tr: 'papir-finder.vercel.app adresinde çevrimiçi (yakında resmi domain: www.papir-finder.com).' },
  },
  'ornamenti-bosne': {
    name: { en: 'Ornaments of Bosnia: Digital Collection', de: 'Ornamente Bosniens: Digitale Sammlung', tr: 'Bosna Süslemeleri: Dijital Koleksiyon' },
    tagline: { en: 'The only digital product delivered on USB Memory Stick • Payment on delivery', de: 'Einziges digitales Produkt mit Lieferung auf USB-Stick • Zahlung bei Lieferung', tr: 'USB Memory Stick ile teslim edilen tek dijital ürün • Kapıda ödeme' },
    description: {
      en: 'The first digital collection of authentic and stylised motifs from B&H stećak tombstones, prepared for design, education and cultural reinterpretation. Contains coded vector and web structures (SVG, PNG, HTML, CSS). Delivered to your address on a USB Memory Stick with cash on delivery.',
      de: 'Erste digitale Sammlung authentischer und stilisierter Stećak-Motive für Design, Bildung und kulturelle Neuinterpretation. Enthält kodierte Vektor- und Web-Strukturen (SVG, PNG, HTML, CSS). Lieferung an Ihre Adresse auf USB-Stick mit Zahlung bei Lieferung.',
      tr: 'Bosna Hersek stećak mezar taşlarının gerçek ve stilize motiflerinin dijital koleksiyonu; tasarım, eğitim ve kültürel yeniden yorumlama için hazırlanmıştır. Kodlanmış vektör ve web yapıları (SVG, PNG, HTML, CSS) içerir. Kapıda ödeme ile USB Memory Stick üzerinde adresinize teslim edilir.',
    },
    badge: { en: 'CULTURAL HERITAGE & USB DELIVERY', de: 'KULTURERBE & USB-LIEFERUNG', tr: 'KÜLTÜREL MİRAS VE USB TESLİMAT' },
    deliveryNotice: { en: 'The only digital product delivered to your home or business address on a USB Memory Stick, with secure cash-on-delivery payment.', de: 'Das einzige digitale Produkt, das an Ihre Adresse auf USB-Stick geliefert wird, mit sicherer Zahlung bei Lieferung.', tr: 'Ev veya iş adresinize USB Memory Stick üzerinde teslim edilen tek dijital ürün, kapıda güvenli ödeme ile.' },
  },
};

/** Vrati lokalizovane DIGITAL_TOOLS za dati jezik (fallback = BS original) */
export function getLocalizedTools(language: Language): DigitalTool[] {
  return DIGITAL_TOOLS.map((tool) => {
    const ov = TOOL_I18N[tool.id];
    if (!ov) return tool;
    return {
      ...tool,
      name: pick(ov.name, language, tool.name),
      tagline: pick(ov.tagline, language, tool.tagline),
      description: pick(ov.description, language, tool.description),
      badge: pick(ov.badge, language, tool.badge),
      deliveryNotice: pick(ov.deliveryNotice, language, tool.deliveryNotice ?? ''),
    };
  });
}

interface LocalizedProjectOverride {
  description: LocalText;
  status: LocalText;
  targetAudience: LocalText;
  highlights: LocalList;
}

const PROJECT_I18N: Record<string, LocalizedProjectOverride> = {
  zentaxi: {
    description: {
      en: 'Innovative digital platform for local urban and intercity transport created by B&H Assistant Ltd. Zenica. Connects passengers and licensed drivers with maximum transparency, fast ordering, automatic route calculation, digital fiscalisation and top ride comfort.',
      de: 'Innovative digitale Plattform für den lokalen Stadt- und Überlandverkehr von B&H Assistant GmbH Zenica. Verbindet Fahrgäste und lizenzierte Fahrer mit maximaler Transparenz, schneller Bestellung und automatischer Routenberechnung.',
      tr: 'B&H Assistant Ltd. Şti. Zenica tarafından oluşturulan yerel şehir içi ve şehirlerarası ulaşım için yenilikçi dijital platform. Yolcular ve lisanslı sürücüleri maksimum şeffaflıkla bağlar.',
    },
    status: { en: 'In development & network expansion', de: 'In Entwicklung & Netzerausbau', tr: 'Geliştirme ve ağ genişletme aşamasında' },
    targetAudience: { en: 'Investors, taxi drivers, cities & users', de: 'Investoren, Taxifahrer, Städte & Nutzer', tr: 'Yatırımcılar, taksiciler, şehirler ve kullanıcılar' },
    highlights: {
      en: ['Smart location and real-time fare estimation', 'Secure digital payments, fiscalisation and ratings', 'Localised and affordable solution for the B&H market', 'Partnership model for licensed taxi operators'],
      de: ['Intelligente Positionierung und Echtzeit-Schätzung', 'Sichere digitale Zahlungen, Fiskalisierung und Bewertung', 'Lokalisierte Lösung für den BH-Markt', 'Partnermodell für lizenzierte Taxifahrer'],
      tr: ['Akıllı konum ve gerçek zamanlı ücret tahmini', 'Güvenli dijital ödemeler, mali fiş ve puanlama', 'BH pazarı için yerelleştirilmiş ve uygun fiyatlı çözüm', 'Lisanslı taksi sürücüleri için ortaklık modeli'],
    },
  },
  gummi: {
    description: {
      en: 'Original B&H educational project for the youngest. Through the beloved hero Gummi and his adventures, children in a fun, methodically adapted way learn printed and cursive letters through play, laughter and socialising.',
      de: 'Originales BH-Bildungsprojekt für die Jüngsten. Durch den geliebten Helden Gummi lernen Kinder auf spielerische und methodisch angepasste Weise Druck- und Schreibbuchstaben.',
      tr: 'En küçükler için orijinal Bosna eğitim projesi. Sevimli kahraman Gummi ve maceraları aracılığıyla çocuklar eğlenceli ve metodolojik bir şekilde harfleri öğrenir.',
    },
    status: { en: 'Development & production', de: 'Entwicklung & Produktion', tr: 'Geliştirme ve Prodüksiyon' },
    targetAudience: { en: 'Parents, educators, primary schools, sponsors', de: 'Eltern, Erzieher, Grundschulen, Sponsoren', tr: 'Ebeveynler, eğitimciler, ilkokullar, sponsorlar' },
    highlights: {
      en: ['Content adapted to curriculum and preschool age', 'Education through animation and visual exercises', 'Free printable colouring book for all children on Archive.org'],
      de: ['Inhalte an Lehrplan und Vorschulalter angepasst', 'Lernen durch Animation und visuelle Übungen', 'Kostenlos druckbares Malbuch für alle Kinder auf Archive.org'],
      tr: ['Müfredata ve okul öncesi yaşa uygun içerik', 'Animasyon ve görsel egzersizlerle eğitim', 'Archive.org\'da tüm çocuklar için ücretsiz yazdırılabilir boyama kitabı'],
    },
  },
  'scena-magazine': {
    description: {
      en: 'The first printed and interactive digital edition of the SCENA+ e-magazine. The project gathers young artists, craft producers, IT innovators and researchers of B&H cultural heritage in ZDK and beyond.',
      de: 'Erste gedruckte und interaktive digitale Ausgabe des E-Magazins SCENA+. Das Projekt bringt junge Künstler, Craft-Produzenten, IT-Innovatoren und Forscher des BH-Kulturerbes zusammen.',
      tr: 'SCENA+ e-dergisinin basılı ve interaktif dijital ilk sayısı. Proje, genç sanatçıları, zanaat üreticilerini, BT yenilikçilerini ve Bosna kültürel mirası araştırmacılarını bir araya getirir.',
    },
    status: { en: 'Published & distribution', de: 'Veröffentlicht & Vertrieb', tr: 'Yayınlandı ve dağıtım' },
    targetAudience: { en: 'Readers, creatives, advertisers, sponsors & partners', de: 'Leser, Kreative, Werbekunden, Sponsoren & Partner', tr: 'Okuyucular, yaratıcılar, reklamverenler, sponsorlar ve ortaklar' },
    highlights: {
      en: ['300 free printed copies distributed', 'Exclusive stories: Danilo Keso Art, BCX Crypto, Craft Breweries, Propuh Show', 'Interactive digital Canva video and e-magazine reader'],
      de: ['300 kostenlose Druckexemplare verteilt', 'Exklusive Geschichten: Danilo Keso Art, BCX Crypto, Craft-Brauereien, Sendung Propuh', 'Interaktiver digitaler Canva-Video- und E-Magazin-Leser'],
      tr: ['300 ücretsiz basılı kopya dağıtıldı', 'Özel hikâyeler: Danilo Keso Art, BCX Kripto, Craft Bira Fabrikaları, Propuh Programı', 'İnteraktif dijital Canva video ve e-dergi okuyucu'],
    },
  },
};

/** Vrati lokalizovane DEVELOPMENT_PROJECTS za dati jezik (fallback = BS original) */
export function getLocalizedProjects(language: Language): DevelopmentProject[] {
  return DEVELOPMENT_PROJECTS.map((proj) => {
    const ov = PROJECT_I18N[proj.id];
    if (!ov) return proj;
    return {
      ...proj,
      description: pick(ov.description, language, proj.description),
      status: pick(ov.status, language, proj.status),
      targetAudience: pick(ov.targetAudience, language, proj.targetAudience),
      highlights: pick(ov.highlights, language, proj.highlights ?? []) as string[],
    };
  });
}

/**
 * Pozivajuće ime (callable object). Omogućava i:
 *   getLocalizedServices(language)        // funkcijski stil
 *   getLocalizedServices.services(...)    // namespace stil (kompatibilnost)
 */
export const getLocalizedServicesFn = Object.assign(getLocalizedServices, { services: getLocalizedServices, tools: getLocalizedTools, projects: getLocalizedProjects });
