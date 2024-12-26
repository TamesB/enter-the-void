'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Hi I&apos;m Tames!</h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400">WebDev</h2>
        
        <div className="max-w-2xl text-center sm:text-left">
          <p className="mb-4">
          Continuously researching and being fascinated by the field of autonomous AI and self-emerging systems. 
          Started off building web solutions with a single stack, now whole companies can be automated, with a single line of code, and someone with a vision.
          The insane rate AI is accelerating <i>real-time</i> is mind-blowing, and I&quot;d love to share my visions and exchange thoughts :&parentheses;
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="mailto:tamesboon@gmail.com"
          target="_blank"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Let&apos;s talk!
          </Link>
          <Link href="/blog">
            <Button
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              to="/blog/understanding-modern-web-development-with-autonomous-ai"
            >
              How bad is it really? ;&parentheses;
            </Button>
            </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/tamesb"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/tames-b-3b5305a9/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
      </footer>
    </div>
  );
}
