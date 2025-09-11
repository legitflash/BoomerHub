
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminRedirect() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-xl mx-auto text-center">
                 <Card>
                    <CardHeader>
                        <CardTitle>Access Removed</CardTitle>
                        <CardDescription>
                            This page was part of the Firebase authentication and admin system, which has been removed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/">Return to Homepage</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
