export type AppCategory = 'Privacy' | 'Capture' | 'Productivity' | 'Safety' | 'Utilities' | 'Sports' | 'Lifestyle' | 'Create' | 'Audio';

export interface GalleryApp {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: AppCategory;
  icon: string;
  iconUrl: string;
  accent: string;
  number: string;
  appStoreUrl: string;
  tiktokUrl: string;
}