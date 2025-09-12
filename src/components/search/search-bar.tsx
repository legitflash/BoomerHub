'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  initialQuery?: string;
}

export default function SearchBar({ initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    
    // Use router.push for client-side navigation to the search results page.
    // This avoids a full-page reload and provides a smoother user experience.
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-start space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Ask me anything..."
          className="pl-10 h-12 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" size="lg" className="h-12">
        Search
      </Button>
    </form>
  );
}
