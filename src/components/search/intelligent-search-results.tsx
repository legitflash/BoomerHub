
import { intelligentSearch } from '@/ai/flows/intelligent-search-with-slugs';
import { getAllPosts } from '@/services/post-service';
import PostGrid from '../blog/post-grid';

export default async function IntelligentSearchResults({ query }: { query: string }) {
  // Fetch AI-powered search results
  const searchResults = await intelligentSearch({ query });
  
  // As a fallback or enrichment, get all posts to find details AI might not have
  const allPosts = await getAllPosts();

  const posts = searchResults.blogPosts.map(result => {
    // Find the full post details from our database using the slug returned by the AI
    return allPosts.find(post => post.slug === result.slug);
  }).filter(post => post !== undefined); // Filter out any potential mismatches

  return (
    <div>
      <h2 className="text-center text-muted-foreground mb-8">
        {posts.length > 0
          ? `AI found ${posts.length} result(s) for "${query}"`
          : `Our AI couldn't find any results for "${query}". Try another search.`}
      </h2>

      {posts.length > 0 && (
        <PostGrid posts={posts as any} includeAd={true} />
      )}
    </div>
  );
}
