export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  industry: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  status: 'published' | 'draft';
  publishedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  cta?: {
    type: string;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
  featured?: boolean;
  views?: number;
}

export const STARTER_BLOGS: BlogPostData[] = [];

