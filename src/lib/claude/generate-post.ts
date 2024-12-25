import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
  dangerouslyAllowBrowser: true,
});



async function* generateBlogPost(topic: string) {
  const prompt = await process.env.CLAUDE_PROMPT || '';
  if (!prompt) {
    throw new Error('CLAUDE_PROMPT environment variable is not set');
  }

  const formattedPrompt = prompt.replace('{{topic}}', topic);

  const stream = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL_ID || '',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: formattedPrompt,
      },
    ],
    stream: true,
  });

  let buffer = '';
  const metadata = {
    title: '',
    excerpt: '',
    previousPage: '',
    nextPage: '',
  };

  for await (const chunk of stream) {
    // @ts-expect-error Server-Sent Events have a `data` field that is a string
    buffer += chunk.delta?.text;
    // Try to extract metadata if not already done
    if (!metadata.title) {
      const titleMatch = buffer.match(/TITLE:([^]*?)(?=EXCERPT:)/);
      if (titleMatch) metadata.title = titleMatch[1].trim();
    }
    if (!metadata.excerpt) {
      const excerptMatch = buffer.match(/EXCERPT:([^]*?)(?=CONTENT:)/);
      if (excerptMatch) metadata.excerpt = excerptMatch[1].trim();
    }

    yield {
      ...metadata,
      content: buffer,
      done: false,
    };

    // update
  }

  // Extract final metadata
  const prevPage = buffer.match(/PREVIOUS_PAGE:([^]*)/);
  const nextPage = buffer.match(/NEXT_PAGE:([^]*?)(?=PREVIOUS_PAGE:)/);
  const contentMatch = buffer.match(/CONTENT:([^]*?)(?=PREVIOUS_PAGE:)/);

  yield {
    title: metadata.title,
    excerpt: metadata.excerpt,
    content: contentMatch ? contentMatch[1].trim() : '',
    previousPage: prevPage ? prevPage[1].trim() : '',
    nextPage: nextPage ? nextPage[1].trim() : '',
    done: true,
  };
}

export default generateBlogPost;
