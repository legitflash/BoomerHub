
// src/app/api/revalidate/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {revalidatePath} from 'next/cache';
import {parseBody} from 'next-sanity/webhook';

// Pull the secret from the environment variables
const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  try {
    const {body, isValidSignature} = await parseBody<{
      _type: string;
      slug?: {current?: string};
    }>(req, revalidateSecret);

    if (!isValidSignature) {
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
    console.error(error);
    return new NextResponse(error.message, {status: 500});
  }
}
