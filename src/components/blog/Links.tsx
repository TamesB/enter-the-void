import Link from 'next/link';
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