import { Suspense } from 'react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import streamBlogPost from '@/lib/claude/generate-post';
import {Links} from '@/components/blog/Links';
import BlogStreamComponent from '@/lib/claude/blogpost-stream';

function LoadingContent() {
  return <div className="animate-pulse h-96 bg-gray-200 dark:bg-gray-800 rounded-lg" />;
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contentStream = streamBlogPost(slug)

  let title = '';
  let excerpt = '';
  let previousPage = '';
  let nextPage = '';
  let content = '';

  for await (const chunk of contentStream) {
    title = chunk.title || title
    excerpt = chunk.excerpt || excerpt
    previousPage = chunk.previousPage || previousPage
    nextPage = chunk.nextPage || nextPage
    content = chunk.content || content

  }

  
  if (!title) return notFound();

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="mx-auto max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-gray-600">{format(new Date(), 'MMMM dd, yyyy')}</p>
        <p className="text-gray-600">{excerpt}</p>
      </header>
        <Links previousPage={previousPage} nextPage={nextPage} />
        <Suspense fallback={<LoadingContent />}>
          <BlogStreamComponent topic={slug} />
        </Suspense>
        <Links previousPage={previousPage} nextPage={nextPage} />
      </article>
    </div>
  );
}