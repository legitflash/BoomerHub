
// src/app/api/revalidate/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {revalidatePath} from 'next/cache';
import {parseBody} from 'next-sanity/webhook';

// Pull the secret from the environment variables
const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Safety check for build time - return early if this is a build environment
    if (process.env.NODE_ENV === 'production' && !process.env.NETLIFY_DEPLOY_ID) {
      return NextResponse.json({ 
        message: 'Webhook not available during build', 
        status: 'disabled' 
      }, { status: 200 });
    }

    // Add safety check for missing secret during build time
    if (!revalidateSecret) {
      console.warn('SANITY_REVALIDATE_SECRET not configured. Webhook validation disabled.');
      return NextResponse.json({ 
        message: 'Revalidate secret not configured' 
      }, { status: 200 });
    }

    let body: any;
    let isValidSignature: boolean | null;

    try {
      const result = await parseBody<{
        _type: string;
        slug?: {current?: string};
      }>(req, revalidateSecret);
      body = result.body;
      isValidSignature = result.isValidSignature;
    } catch (parseError) {
      console.error('parseBody error:', parseError);
      // If parsing fails, it might be a build-time issue - return gracefully
      return NextResponse.json({ 
        message: 'Error parsing webhook body',
        error: parseError instanceof Error ? parseError.message : 'Unknown error'
      }, { status: 400 });
    }

    // Only validate signature if secret is available
    if (revalidateSecret && !isValidSignature) {
      const message = 'Invalid signature';
      return new NextResponse(JSON.stringify({message, isValidSignature, body}), {status: 401});
    }

    if (!body?._type) {
      return new NextResponse(JSON.stringify({message: 'Bad Request: Missing _type'}), {status: 400});
    }

    // Based on the content type, revalidate the appropriate paths
    const { _type, slug } = body;
    const pathsToRevalidate: string[] = ['/']; // Always revalidate homepage

    switch (_type) {
      case 'post':
        if (slug?.current) {
          pathsToRevalidate.push(`/blog/${slug.current}`);
        }
        pathsToRevalidate.push('/blog');
        break;
      case 'author':
        // When an author is updated, revalidate the about page where they are listed.
        pathsToRevalidate.push('/about');
        break;
      case 'category':
        if (slug?.current) {
          pathsToRevalidate.push(`/blog/category/${slug.current}`);
        }
        pathsToRevalidate.push('/blog');
        break;
      case 'page':
        if (slug?.current) {
          pathsToRevalidate.push(`/p/${slug.current}`);
        }
        break;
    }
    
    // Revalidate all identified paths
    for (const path of pathsToRevalidate) {
        revalidatePath(path);
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error('Revalidate API error:', error);
    // During build time, we want to fail gracefully instead of throwing
    if (process.env.NODE_ENV === 'production' && !process.env.NETLIFY_DEPLOY_ID) {
      return NextResponse.json({ 
        message: 'Build-time revalidate error', 
        status: 'error' 
      }, { status: 200 });
    }
    return new NextResponse(error.message || 'Internal server error', {status: 500});
  }
}
