
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getAllPosts } from '@/services/post-service';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SearchBar from '@/components/search/search-bar';

export const metadata = {
  title: 'Search Results',
};

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const searchQuery = searchParams.q || '';
  const allPosts = await getAllPosts();

  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Search Results</h1>
        <div className="max-w-lg mx-auto mt-8">
            <SearchBar initialQuery={searchQuery} />
        </div>
        {searchQuery && (
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
            {filteredPosts.length > 0
                ? `Found ${filteredPosts.length} result(s) for "${searchQuery}"`
                : `No results found for "${searchQuery}". Try another search.`}
            </p>
        )}
      </header>

      {filteredPosts.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
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
                <div className="flex items-center gap-2 pt-4 mt-auto text-xs text-muted-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                  <span>&middot;</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
