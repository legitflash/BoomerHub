
'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Loader2, Search } from 'lucide-react';
import { handleIntelligentSearch } from '@/app/actions';
import type { IntelligentSearchOutput } from '@/ai/flows/intelligent-search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllPosts } from '@/services/post-service';
import type { Post } from '@/lib/types';


const formSchema = z.object({
  query: z.string().min(3, { message: 'Search query must be at least 3 characters long.' }),
});

type FormValues = z.infer<typeof formSchema>;

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export default function IntelligentSearchForm() {
  const [results, setResults] = useState<IntelligentSearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  React.useEffect(() => {
    // Fetch all posts once on component mount to help with slug resolution
    async function fetchPosts() {
      const posts = await getAllPosts();
      setAllPosts(posts);
    }
    fetchPosts();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResults(null);
    try {
      const searchResults = await handleIntelligentSearch({ query: values.query });
      setResults(searchResults);
    } catch (e) {
      setError('An error occurred during the search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const findSlugByTitle = (title: string): string => {
    const item = allPosts.find(i => i.title.toLowerCase() === title.toLowerCase());
    return item ? item.slug : slugify(title);
  }

  return (
    <div className="w-full max-w-lg space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start space-x-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search articles..." className="pl-10 h-12 text-base" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="lg" className="h-12">
            {isLoading ? <Loader2 className="animate-spin" /> : 'Search'}
          </Button>
        </form>
      </Form>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {isLoading && (
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Loader2 className="animate-spin h-5 w-5" />
          <span>Searching for the best content for you...</span>
        </div>
      )}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Here's what we found for you:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.blogPosts.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Relevant Blog Posts</h3>
                <ul className="space-y-1 list-disc list-inside">
                  {results.blogPosts.map((post, index) => (
                    <li key={index} className="text-primary hover:underline">
                      <Link href={`/blog/${findSlugByTitle(post)}`}>{post}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(results.blogPosts.length === 0) && (
              <p className="text-muted-foreground">No specific recommendations found. Try a broader search term.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
