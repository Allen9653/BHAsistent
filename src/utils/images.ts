/**
 * Centralized Image Configuration for B&H Assistant d.o.o. Zenica
 * 
 * Direct Imgur CDN integration with local fallback support.
 */

// Helper to normalize image paths and Imgur links
export const getImagePath = (filename: string): string => {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:')) {
    // If it is an Imgur page link without file extension, convert to direct i.imgur image
    const imgurMatch = filename.match(/https?:\/\/(?:i\.)?imgur\.com\/([a-zA-Z0-9]+)(?:\.[a-zA-Z]+)?/);
    if (imgurMatch && !filename.includes('.')) {
      return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
    }
    return filename;
  }
  const cleanName = filename.replace(/^\/images\//, '').replace(/^\/+/, '');
  return `/images/${cleanName}`;
};

// Primary Brand & Corporate Logos (Imgur CDN)
export const COMPANY_LOGO = 'https://i.imgur.com/cXebP1B.jpg';
export const COMPANY_LOGO_PNG = 'https://i.imgur.com/cXebP1B.jpg';
export const COMPANY_LOGO_JPG = 'https://i.imgur.com/cXebP1B.jpg';
export const HERO_IMAGE = 'https://i.imgur.com/cXebP1B.jpg';
export const PRESENTATION_COVER = 'https://i.imgur.com/qI85OyS.jpg';
export const BUSINESS_PLAN = 'https://i.imgur.com/mkbxU6I.jpg';
export const DIGITALNI_SPAVAC = 'https://i.imgur.com/65sjyhp.jpg';
export const CONTACT_TEAM = 'https://i.imgur.com/sbCmVan.jpg';

// Digital Tools & Products (Imgur CDN)
export const BH_KONVER_MOCKUP = 'https://i.imgur.com/WIdimeI.jpg';
export const BH_KONVER_BANNER = 'https://i.imgur.com/WIdimeI.jpg';
export const BH_PAPIRFINDER_MOCKUP = 'https://i.imgur.com/QfHNQIV.jpg';
export const BH_PAPIRFINDER_BANNER = 'https://i.imgur.com/QfHNQIV.jpg';
export const ORNAMENTI_BOSNE = 'https://i.imgur.com/nWGl9Gf.jpg';
export const OKRUGLI_CVIJET = 'https://i.imgur.com/lfhiFqo.jpg';
export const FAUNA_BIH = 'https://i.imgur.com/lfhiFqo.jpg';
export const OUR_PRODUCTS = 'https://i.imgur.com/RGLT2Ls.jpg';

// Magazine & Media (Canva & Imgur CDN)
export const SCENA_COVER = 'https://i.imgur.com/jf337m3.jpg';
export const BRAVO_WINNER = 'https://i.imgur.com/kWsWhS5.jpg';
export const CRAFT_PIVARE = 'https://canva.link/jby4js35s2iizx7';
export const DANI_KESO_ART = 'https://canva.link/9kf68sd8mgd2p0f';
export const GAMING_PARIVANTANAM = 'https://canva.link/ozbqeb4w30s7nbp';
export const BCX_KRYPTO = 'https://i.imgur.com/q5dJ2Xh.jpg';

// Scena+ Mosaic Gallery Images (Imgur CDN)
export const SCENA_MOSAIC_1 = 'https://i.imgur.com/5nggK91.jpg';
export const SCENA_MOSAIC_2 = 'https://i.imgur.com/aJAQ3QQ.jpg';
export const SCENA_MOSAIC_3 = 'https://i.imgur.com/FAlBFNi.jpg';
export const SCENA_MOSAIC_4 = 'https://i.imgur.com/dEfRPek.jpg';
export const SCENA_MOSAIC_5 = 'https://i.imgur.com/Qaxqao8.jpg';
export const SCENA_MOSAIC_6 = 'https://i.imgur.com/S4HjbRh.jpg';

// Projects & Kids Initiatives (Imgur CDN)
export const GUMMI_BOJANKA = 'https://i.imgur.com/l7CMGP8.jpg';
export const GUMMI_VAS_JARAN = 'https://i.imgur.com/j5QDDA1.jpg';
export const ZENTAXI_LOGO = 'https://i.imgur.com/nyGuQYP.jpg';
export const ZENTAXI_BANNER = 'https://i.imgur.com/9xHhYZJ.jpg';

// Affiliate & Strategic Tech Partners (Imgur CDN)
export const ATOMS_DEV_LOGO = 'https://i.imgur.com/4aXGBJy.jpg';
export const REMOTE_ROCKET_LOGO = 'https://i.imgur.com/XZpyxty.jpg';
export const ALISON_LOGO = 'https://i.imgur.com/qb26j1I.jpg';
export const CLOUDTALK_BANNER = 'https://i.imgur.com/5rTpp9F.jpg';
export const TRYHACKME_BANNER = 'https://i.imgur.com/7GCX5oO.jpg';

// Full Structured Dictionary for easy property lookup
export const IMAGES = {
  // Brand & Corporate Logos
  logo: 'https://i.imgur.com/cXebP1B.jpg',
  logoPng: 'https://i.imgur.com/cXebP1B.jpg',
  logoJpeg: 'https://i.imgur.com/cXebP1B.jpg',
  presentation: 'https://i.imgur.com/qI85OyS.jpg',
  businessPlan: 'https://i.imgur.com/mkbxU6I.jpg',
  contactTeam: 'https://i.imgur.com/sbCmVan.jpg',
  posaljitePoruku: 'https://i.imgur.com/sbCmVan.jpg',
  digitalniSpavac: 'https://i.imgur.com/65sjyhp.jpg',

  // Digital Tools & Products
  bhKonverMockup: 'https://i.imgur.com/WIdimeI.jpg',
  bhKonverBanner: 'https://i.imgur.com/WIdimeI.jpg',
  bhPapirfinderMockup: 'https://i.imgur.com/QfHNQIV.jpg',
  bhPapirfinderBanner: 'https://i.imgur.com/QfHNQIV.jpg',
  ornamentiBosne: 'https://i.imgur.com/nWGl9Gf.jpg',
  okrugliCvijet: 'https://i.imgur.com/lfhiFqo.jpg',
  fauna: 'https://i.imgur.com/lfhiFqo.jpg',
  ourProducts: 'https://i.imgur.com/RGLT2Ls.jpg',

  // Magazine & Media
  scenaCover: 'https://i.imgur.com/jf337m3.jpg',
  bravoWinner: 'https://i.imgur.com/kWsWhS5.jpg',
  craftPivare: 'https://canva.link/jby4js35s2iizx7',
  daniKesoArt: 'https://canva.link/9kf68sd8mgd2p0f',
  gamingParivantanam: 'https://canva.link/ozbqeb4w30s7nbp',
  bcxKrypto: 'https://i.imgur.com/q5dJ2Xh.jpg',
  scenaMosaic1: 'https://i.imgur.com/5nggK91.jpg',
  scenaMosaic2: 'https://i.imgur.com/aJAQ3QQ.jpg',
  scenaMosaic3: 'https://i.imgur.com/FAlBFNi.jpg',
  scenaMosaic4: 'https://i.imgur.com/dEfRPek.jpg',
  scenaMosaic5: 'https://i.imgur.com/Qaxqao8.jpg',
  scenaMosaic6: 'https://i.imgur.com/S4HjbRh.jpg',

  // Projects & Kids
  gummiBojanka: 'https://i.imgur.com/l7CMGP8.jpg',
  gummiVasJaran: 'https://i.imgur.com/j5QDDA1.jpg',
  zentaxiLogo: 'https://i.imgur.com/nyGuQYP.jpg',
  zentaxiBanner: 'https://i.imgur.com/9xHhYZJ.jpg',

  // Affiliate & Tech Partners
  atomsDev: 'https://i.imgur.com/4aXGBJy.jpg',
  remoteRocket: 'https://i.imgur.com/XZpyxty.jpg',
  alisonLogo: 'https://i.imgur.com/qb26j1I.jpg',
  cloudtalkBanner: 'https://i.imgur.com/5rTpp9F.jpg',
  tryhackmeBanner: 'https://i.imgur.com/7GCX5oO.jpg',
} as const;

export type ImageKey = keyof typeof IMAGES;

export default IMAGES;
