
import { notFound } from 'next/navigation';
import { blogPosts, blogCategories } from '@/lib/data';
import type { Post } from '@/lib/types';
import BlogCategoryClientPage from '@/components/blog/category-client-page';

export default function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (slug === 'betting-predictions') {
      // This is handled by a different page, so we can return null or a loader.
      return null; 
  }

  const category = blogCategories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const postsForCategory: Post[] = blogPosts.filter((p) => p.category.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === slug);

  return <BlogCategoryClientPage category={category} initialPosts={postsForCategory} />;
}
