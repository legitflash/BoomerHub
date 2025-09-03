
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/services/post-service'
import { getAllCategories } from '@/services/category-service'
import { getAllTeamMembers } from '@/services/team-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boomerhub.com';
  
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms-of-use`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/advertise-with-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/write-for-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Blog posts
  const posts = await getAllPosts();
  const postRoutes = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date), // Use post date as last modified
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Categories
  const categories = await getAllCategories();
  const categoryRoutes = categories.map(category => ({
    url: `${siteUrl}/blog/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

   // Authors
  const authors = await getAllTeamMembers();
  const authorRoutes = authors.map(author => ({
    url: `${siteUrl}/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
      ...staticRoutes,
      ...postRoutes,
      ...categoryRoutes,
      ...authorRoutes,
    ];
}
