'use client';
import { useState, useEffect } from 'react';
import streamBlogPost from "./generate-post";


const BlogPostStream = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function streamContent() {
      try {
        setIsLoading(true);
        const stream = await streamBlogPost(postId);
        
        for await (const chunk of stream) {
          // @ts-expect-error Server-Sent Events have a `data` field that is a string
          setContent(prev => [...prev, chunk.delta?.text.toString()]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to stream blog post'));
      } finally {
        setIsLoading(false);
      }
    }

    streamContent();
  }, [postId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading && content.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      {content.map((chunk, index) => (
        <p key={index}>{chunk}</p>
      ))}
      {isLoading && <div>Loading more...</div>}
    </article>
  );
};

export default BlogPostStream;