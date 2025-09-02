
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SearchAdCard() {
  const adUrl = "https://your-smart-ad-link.com"; // Replace with your actual smart link

  return (
    <Card className="group flex flex-col">
      <Link href={adUrl} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative">
            <Image
                src="https://picsum.photos/seed/ad-tech/600/400"
                alt="Unlock Your Potential"
                width={600}
                height={400}
                data-ai-hint="technology abstract"
                className="w-full rounded-t-lg object-cover aspect-video"
            />
            <Badge variant="destructive" className="absolute top-2 right-2">Ad</Badge>
        </div>
      </Link>
      <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
        <Link href={adUrl} target="_blank" rel="noopener noreferrer" className="block">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex-grow">
            Discover a New Way to Boost Your Productivity
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          Find the tools and techniques you need to take your skills to the next level. Click to learn more.
        </p>
      </CardContent>
    </Card>
  );
}
