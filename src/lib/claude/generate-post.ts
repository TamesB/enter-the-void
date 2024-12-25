import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

export default async function generateBlogPost(topic: string): Promise<{
  title: string;
  content: string;
  excerpt: string;
  previousPage: string;
  nextPage: string;
}> {
  const prompt = await process.env.CLAUDE_PROMPT || '';
  if (!prompt) {
    throw new Error('CLAUDE_PROMPT environment variable is not set');
  }

  const formattedPrompt = prompt.replace('{{topic}}', topic);

  const response = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: formattedPrompt,
      },
    ],
  });

  // @ts-expect-error: `content` is not a `string`. It is a `Content[]`.
  const htmltext = response.content.map((c) => c.text).join('\n');
  const content = htmltext.replace(/\\n/g, '\n');

  // Parse the response
  const titleMatch = content.match(/TITLE:([^]*?)(?=EXCERPT:)/);
  const excerptMatch = content.match(/EXCERPT:([^]*?)(?=CONTENT:)/);
  const contentMatch = content.match(/CONTENT:([^]*?)(?=PREVIOUS_PAGE:)/);
  const nextPage = content.match(/NEXT_PAGE:([^]*?)(?=PREVIOUS_PAGE:)/);
  const prevPage = content.match(/PREVIOUS_PAGE:([^]*)/);

  const title = titleMatch ? titleMatch[1].trim() : '';
  const excerpt = excerptMatch ? excerptMatch[1].trim() : '';
  const fullContent = contentMatch ? contentMatch[1].trim() : '';
  const previousPage = prevPage ? prevPage[1].trim() : '';
  const nextePage = nextPage ? nextPage[1].trim() : '';

  console.log('Title:', title);
  console.log('Excerpt:', excerpt);
  console.log('Content:', fullContent);
  console.log('Previous Page:', previousPage);
  console.log('Next Page:', nextePage);
  



  return {
    title,
    content: fullContent,
    excerpt,
    previousPage,
    nextPage: nextePage || '',
  };

}