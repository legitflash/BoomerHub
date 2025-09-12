import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import SearchBar from '@/components/search/search-bar';
import IntelligentSearchResults from '@/components/search/intelligent-search-results';

export const metadata = {
  title: 'Search Results',
};

function SearchResultsFallback() {
  return (
    <div className="text-center p-8">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      <p className="mt-4 text-muted-foreground">Our AI is searching for the best results...</p>
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const searchQuery = searchParams.q || '';

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
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">AI Search</h1>
        <div className="max-w-lg mx-auto mt-8">
          {/* Pass the current query to pre-fill the search bar */}
          <SearchBar initialQuery={searchQuery} />
        </div>
      </header>

      {searchQuery ? (
        // Use Suspense to handle the streaming/loading state of the AI search results
        <Suspense fallback={<SearchResultsFallback />}>
          <IntelligentSearchResults query={searchQuery} />
        </Suspense>
      ) : (
        <p className="text-center text-muted-foreground">
          Please enter a search term above to find relevant articles.
        </p>
      )}
    </div>
  );
}
