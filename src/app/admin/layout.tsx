
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and user is not an admin, redirect them.
    if (!isLoading && !isAdmin) {
      // If there's no user at all, send to login. Otherwise, to home.
      if (!user) {
        router.push('/login');
      } else {
        router.push('/');
      }
    }
  }, [user, isAdmin, isLoading, router]);

  // While checking auth, show a loader.
  if (isLoading || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If user is an admin, render the children.
  return <>{children}</>;
}
