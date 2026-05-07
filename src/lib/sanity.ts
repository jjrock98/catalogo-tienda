import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'hwujeebe';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface SanityProduct {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  category: SanityCategory;
  price?: number;
  inStock: boolean;
  images: Array<{
    _key: string;
    asset: {
      _id: string;
      url?: string;
    };
    alt?: string;
  }>;
  sizes?: string[];
  colors?: Array<{
    name: string;
    hex: string;
  }>;
  material?: string;
  origin?: string;
  collection?: string;
  rating?: number;
  tags?: string[];
  featured?: boolean;
  seo?: {
    metaDescription?: string;
    keywords?: string[];
  };
  _createdAt: string;
  _updatedAt: string;
}

export const PRODUCTS_QUERY = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    category->,
    price,
    inStock,
    images[] {
      _key,
      asset,
      alt
    },
    sizes,
    colors[] {
      name,
      hex
    },
    material,
    origin,
    collection,
    rating,
    tags,
    featured,
    seo,
    _createdAt,
    _updatedAt
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    category->,
    price,
    inStock,
    images[] {
      _key,
      asset,
      alt
    },
    sizes,
    colors[] {
      name,
      hex
    },
    material,
    origin,
    collection,
    rating,
    tags,
    featured,
    seo,
    _createdAt,
    _updatedAt
  }
`;

export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(_createdAt desc)[0...6] {
    _id,
    name,
    slug,
    description,
    category->,
    price,
    inStock,
    images[] {
      _key,
      asset,
      alt
    },
    sizes,
    colors[] {
      name,
      hex
    },
    material,
    origin,
    collection,
    rating,
    tags,
    featured,
    _createdAt
  }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    category->,
    price,
    inStock,
    images[] {
      _key,
      asset,
      alt
    },
    sizes,
    colors[] {
      name,
      hex
    },
    material,
    origin,
    collection,
    rating,
    tags,
    featured,
    _createdAt
  }
`;

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

export async function getProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(PRODUCTS_QUERY);
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  return sanityClient.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(FEATURED_PRODUCTS_QUERY);
}

export async function getProductsByCategory(category: string): Promise<SanityProduct[]> {
  return sanityClient.fetch(PRODUCTS_BY_CATEGORY_QUERY, { category });
}

export async function getCategories(): Promise<SanityCategory[]> {
  return sanityClient.fetch(CATEGORIES_QUERY);
}
