'use client';
import React, { useEffect, useState } from 'react';
import streamBlogPost from './generate-post';

const BlogStreamComponent = ({ topic }: { topic: string }) => {
  const [chunks, setChunks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stream = streamBlogPost(topic)
        for await (const chunk of stream) {
          console.log(chunk);
          setChunks((prevChunks) => [...prevChunks, chunk.content]);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }
  , [topic]);
  if (error) {
    return <div>Error loading blog post: {error}</div>;
  }

  if (isLoading && chunks.length === 0) {
    return <div>Loading blog post...</div>;
  }

  return (
    <div className="blog-content">
      {chunks.map((chunk, index) => (
        <div key={index} className="blog-chunk">
          {chunk}
        </div>
      ))}
    </div>
  );
};

export default BlogStreamComponent;