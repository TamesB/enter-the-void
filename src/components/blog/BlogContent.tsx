import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { Options } from 'rehype-pretty-code';


const prettyCodeOptions: Options = {
    grid: true,
    theme: {
        dark: 'one-dark-pro',
        light: 'one-dark-pro',
    },
    onVisitLine(node) {
      if (node.children.length === 0) {
        node.children = [{ type: 'text', value: ' ' }];
      }
    },
    onVisitHighlightedLine(node) {
      // @ts-expect-error: `node` is not a `Parent` node, but it has a `properties` field.
      node.properties.className.push('highlighted');
    },
    // @ts-expect-error: `node` is not a `Parent` node, but it has a `properties` field.
    onVisitHighlightedWord(node) {
      node.properties.className = ['word'];
    },
    keepBackground: true,
    bypassInlineCode: false,
    defaultLang: {
        block: 'firacode',
        inline: 'firacode'
    },
  };

interface BlogContentProps {
  content: string;
}

export default async function BlogContent({ content }: BlogContentProps) {
      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, prettyCodeOptions)
        .use(rehypeStringify)
        .process(content);

  const html = String(processedContent);
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}