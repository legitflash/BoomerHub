
import { notFound } from 'next/navigation';
import type { Post } from '@/lib/types';
import BlogCategoryClientPage from '@/components/blog/category-client-page';
import { getAllPosts } from '@/services/post-service';
import { getCategoryBySlug } from '@/services/category-service';

export default async function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (slug === 'betting-predictions') {
      // This is handled by a different page, so we can return null or a loader.
      return null; 
  }

  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const postsForCategory: Post[] = allPosts.filter((p) => p.categorySlug === slug);

  return <BlogCategoryClientPage category={category} initialPosts={postsForCategory} />;
}
