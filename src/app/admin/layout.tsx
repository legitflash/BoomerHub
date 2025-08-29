
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
  const { user, isAdmin, isEditor, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth is done loading and the user is not an admin or an editor, redirect them.
    if (!isLoading && !isAdmin && !isEditor) {
      // If there's no user at all, send to login. Otherwise, to home.
      if (!user) {
        router.push('/login');
      } else {
        router.push('/');
      }
    }
  }, [user, isAdmin, isEditor, isLoading, router]);

  // While checking auth, show a loader.
  if (isLoading || (!isAdmin && !isEditor)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If user is an admin or editor, render the children.
  return <>{children}</>;
}
