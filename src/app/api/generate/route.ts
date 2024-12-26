import { NextResponse } from 'next/server';
import streamBlogPost from '@/lib/claude/generate-post';

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const post = await streamBlogPost(topic);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}