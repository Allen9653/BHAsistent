export interface DigitalTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  englishVideoUrl?: string;
  englishVideoEmbedUrl?: string;
  deliveryBadge?: string;
  deliveryNotice?: string;
  badge: string;
  category: string;
  iconName: string;
  logoUrl?: string;
  image?: string;
  bannerImage?: string;
  mockupImage?: string;
  features: string[];
}

export interface DevelopmentProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedSummary?: string;
  url: string;
  status: string;
  image: string;
  bannerImage?: string;
  secondaryImage?: string;
  hasFreeDownload?: boolean;
  downloadUrl?: string;
  downloadTitle?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  targetAudience: string;
  highlights: string[];
  features?: { title: string; desc: string }[];
}

export interface MagazineEdition {
  title: string;
  subtitle: string;
  edition: string;
  date: string;
  url: string;
  coverImage?: string;
  topics: {
    category: string;
    title: string;
    desc: string;
    image?: string;
  }[];
}

export interface AffiliateCourse {
  id: string;
  title: string;
  provider: string;
  badge: string;
  description: string;
  bullets: string[];
  affiliateUrl: string;
  category: string;
  featured: boolean;
  image: string;
}

export interface CompanyDetails {
  name: string;
  fullLegalName: string;
  city: string;
  postalCode: string;
  jib: string;
  mbs: string;
  motto: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  instagramHandle: string;
  instagramUrl: string;
}

export interface SocialComment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  timeAgo: string;
}

export interface SocialPost {
  id: string;
  image: string;
  caption: string;
  category: 'scena' | 'alati' | 'stecak' | 'edukacija' | 'projekti';
  categoryLabel: string;
  likes: number;
  initialLiked?: boolean;
  commentsCount: number;
  date: string;
  postUrl: string;
  location?: string;
  tags: string[];
  comments?: SocialComment[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  tags?: string[];
  hasVideo?: boolean;
  videoFileName?: string;
  videoUrl?: string;
  externalUrl?: string;
  isJobPosting?: boolean;
  jobDetails?: {
    salary?: string;
    location?: string;
    type?: string;
    level?: string;
    department?: string;
    source?: string;
    postedAgo?: string;
  };
}
