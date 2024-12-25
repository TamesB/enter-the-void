import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import BlogContent from '@/components/blog/BlogContent'
import generateBlogPost from '@/lib/claude/generate-post'
import Link from 'next/link'

interface LinksProps {
  previousPage: string | null;
  nextPage: string | null;
}

export async function Links({ previousPage, nextPage }: LinksProps) {

  return (
  <div className="flex gap-4 mt-8 justify-between text-xl font-bold text-gray-600">
  {previousPage && (
    <Link href={`/blog/${previousPage}`} className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
      Previous: {previousPage}
    </Link>
  ) || (null) }
  {nextPage && (
    <Link href={`/blog/${nextPage}`} className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
      Next: {nextPage}
    </Link>
  ) || (null)}
</div>
)
}

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
  const { title, content, excerpt, previousPage, nextPage } = await generateBlogPost(slug)

  if (!title) return notFound()

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-gray-600">{format(new Date(), 'MMMM dd, yyyy')}</p>
          <p className="text-gray-600">{excerpt}</p>
        </header>
        <Links previousPage={previousPage} nextPage={nextPage} />
        <BlogContent content={content} />
        <Links previousPage={previousPage} nextPage={nextPage} />

      </article>
    </div>
  )
}