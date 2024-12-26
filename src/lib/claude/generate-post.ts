import Anthropic from '@anthropic-ai/sdk';


// Validate and sanitize topic
function validateTopic(topic: string) {
  if (!topic || typeof topic !== 'string') {
    return "No topic provided";
  }
  
  
  // Basic sanitization - remove any control characters
  return topic.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
}
const apiKey = await process.env['CLAUDE_API_KEY'];

async function* streamBlogPost(topic: string) {
  // Validate topic
  const a = await new Anthropic({apiKey, dangerouslyAllowBrowser: true});

  const sanitizedTopic = validateTopic(topic);
  let formattedPrompt = '';

  // Format prompt with error handling
  try {
    formattedPrompt = (await process.env['CLAUDE_PROMPT'])?.replace('{{topic}}', sanitizedTopic).replace(/\\n/g, '\n') || '';
  } catch (error) {
    throw new Error(`Failed to format prompt: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  const stream = a.messages.stream({
    model: process.env['CLAUDE_MODEL_ID'] || '',
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

    // update hook
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

export default streamBlogPost;