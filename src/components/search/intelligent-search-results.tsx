
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { intelligentSearch } from '@/ai/flows/intelligent-search-with-slugs';
import { getAllPosts } from '@/services/post-service';

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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            post && (
              <Card key={post.slug} className="group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    data-ai-hint={post.dataAiHint}
                    className="w-full rounded-t-lg object-cover aspect-video"
                  />
                </Link>
                <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
                  <span className="text-xs font-semibold text-primary uppercase">{post.category}</span>
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex-grow">{post.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                  <div className="flex items-center gap-2 pt-4 mt-auto text-xs text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.authorImage} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{post.author}</div>
                    <span>&middot;</span>
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      )}
    </div>
  );
}
