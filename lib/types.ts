// Product type definitions

export type ProductBadge = 'best-seller' | 'new' | 'popular' | 'sale';

export type ProductCategory =
  | 'bundles'
  | 'accounts'
  | 'menus'
  | 'tools'
  | 'codes'
  | 'email-accounts';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  features: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: ProductBadge;
  thumbnail: string;
  gallery: string[];
  videoPreview?: string;
  techStack: string[];
  downloads: number;
  lastUpdated: string;
  featured?: boolean;
}

export interface Category {
  id: ProductCategory;
  label: string;
  icon: string;
  description: string;
  count: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  server: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}
