
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function SearchAdCard() {
  return (
    <Card className="flex flex-col items-center justify-center text-center p-6 bg-secondary/50 border-2 border-dashed">
      <CardContent className="flex flex-col items-center justify-center">
        <Search className="h-10 w-10 text-primary mb-4" />
        <h3 className="font-bold text-lg mb-2">Looking for something else?</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Use our AI-powered search to find the perfect article.
        </p>
        <Button asChild>
          <Link href="/#hero-search">Search Articles</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
