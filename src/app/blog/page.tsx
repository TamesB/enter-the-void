import { format } from 'date-fns'
import BlogContent from '@/components/blog/BlogContent'
import generateBlogPost from '@/lib/claude/generate-post'

import Link from 'next/link'

export default async function Posts() {
  const topic = 'Next.js'

  const {title,content,excerpt, previousPage, nextPage} = await generateBlogPost(topic)


  return (
    <div className="container mx-auto px-4 py-16">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
        <Link className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href={`/blog/${previousPage}`}>Previous: {previousPage} </Link> | <Link className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href={`/blog/${nextPage}`}>Next: {nextPage}</Link>

          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-gray-600">{format(new Date(), 'MMMM dd, yyyy')}</p>
          <p className="text-gray-600">{excerpt}</p>
        </header>
        <BlogContent content={content} />
        <Link className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href={`/blog/${previousPage}`}>Previous: {previousPage} </Link> | <Link className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href={`/blog/${nextPage}`}>Next: {nextPage}</Link>
      </article>
    </div>
    )
}