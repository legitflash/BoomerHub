
import { notFound } from 'next/navigation';
import { blogCategories } from '@/lib/data';
import type { Post } from '@/lib/types';
import BlogCategoryClientPage from '@/components/blog/category-client-page';
import { getAllPosts } from '@/services/post-service';

export default async function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (slug === 'betting-predictions') {
      // This is handled by a different page, so we can return null or a loader.
      return null; 
  }

  const category = blogCategories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const postsForCategory: Post[] = allPosts.filter((p) => p.category.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === slug);

  return <BlogCategoryClientPage category={category} initialPosts={postsForCategory} />;
}
