# API Endpoints Documentation

This document details all available API endpoints in the AI Self-Generating Blog platform.

## Base URL

```
https://your-domain.com/api
```

For local development:
```
http://localhost:3000/api
```

## Authentication

All API endpoints require an API key to be included in the request headers:

```typescript
headers: {
  'Authorization': 'Bearer your-api-key-here'
}
```

## Endpoints

### Generate Blog Post

Generate a new blog post using Claude 3.5 Sonnet.

```typescript
POST /generate
```

#### Request Body

```typescript
{
  "topic": string,           // Optional: Topic for the blog post
  "options": {              // Optional: Generation options
    "temperature": number,   // Controls randomness (0.0-1.0)
    "maxTokens": number,    // Maximum tokens to generate
    "format": "markdown"    // Output format
  }
}
```

#### Response

```typescript
{
  "success": boolean,
  "data": {
    "id": string,          // Unique post ID
    "title": string,       // Generated title
    "content": string,     // Main content
    "excerpt": string,     // Short summary
    "metadata": {
      "readingTime": number,
      "topics": string[],
      "seoDescription": string
    },
    "createdAt": string,   // ISO timestamp
    "status": "draft" | "published"
  }
}
```

#### Error Response

```typescript
{
  "success": false,
  "error": {
    "code": string,
    "message": string,
    "details": object
  }
}
```

#### Example

```bash
curl -X POST https://your-domain.com/api/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "topic": "Modern JavaScript Features",
    "options": {
      "temperature": 0.7,
      "maxTokens": 4000
    }
  }'
```

### Get Blog Posts

Retrieve a list of generated blog posts.

```typescript
GET /posts
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Posts per page (default: 10) |
| status | string | Filter by status (draft/published) |
| topic | string | Filter by topic |

#### Response

```typescript
{
  "success": true,
  "data": {
    "posts": [{
      "id": string,
      "title": string,
      "excerpt": string,
      "createdAt": string,
      "status": string,
      "slug": string
    }],
    "pagination": {
      "currentPage": number,
      "totalPages": number,
      "totalPosts": number
    }
  }
}
```

### Get Single Post

Retrieve a specific blog post by ID or slug.

```typescript
GET /posts/:identifier
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| identifier | string | Post ID or slug |

#### Response

```typescript
{
  "success": true,
  "data": {
    "post": {
      "id": string,
      "title": string,
      "content": string,
      "excerpt": string,
      "metadata": object,
      "createdAt": string,
      "updatedAt": string,
      "status": string,
      "slug": string
    }
  }
}
```

### Update Post Status

Update the status of a blog post.

```typescript
PATCH /posts/:id/status
```

#### Request Body

```typescript
{
  "status": "draft" | "published"
}
```

### Delete Post

Delete a blog post.

```typescript
DELETE /posts/:id
```

## Rate Limiting

- 100 requests per hour per API key
- Generation endpoints: 10 requests per hour
- Retrieval endpoints: 100 requests per hour

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Websocket Events

For real-time updates during post generation:

```typescript
// Connect to WebSocket
const ws = new WebSocket('wss://your-domain.com/ws');

// Generation progress events
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'generation.started':
      // Generation started
      break;
    case 'generation.progress':
      // Generation progress update
      break;
    case 'generation.completed':
      // Generation completed
      break;
    case 'generation.error':
      // Error occurred
      break;
  }
};
```

## SDK Example

Using the TypeScript SDK:

```typescript
import { BlogAPI } from '@your-domain/blog-sdk';

const api = new BlogAPI('your-api-key');

// Generate a post
const post = await api.generate({
  topic: 'TypeScript Best Practices',
  options: {
    temperature: 0.7
  }
});

// Get posts
const posts = await api.getPosts({
  page: 1,
  limit: 10,
  status: 'published'
});

// Get single post
const post = await api.getPost('post-slug');
```

## Best Practices

1. **Error Handling**
   ```typescript
   try {
     const post = await api.generate({ topic });
   } catch (error) {
     if (error instanceof RateLimitError) {
       // Handle rate limiting
     } else if (error instanceof AuthError) {
       // Handle auth errors
     }
   }
   ```

2. **Pagination**
   ```typescript
   // Fetch all pages
   async function getAllPosts() {
     const posts = [];
     let page = 1;
     let hasMore = true;
     
     while (hasMore) {
       const response = await api.getPosts({ page });
       posts.push(...response.data.posts);
       hasMore = page < response.data.pagination.totalPages;
       page++;
     }
     
     return posts;
   }
   ```

3. **Webhook Integration**
   ```typescript
   // Register webhook
   await api.registerWebhook({
     url: 'https://your-domain.com/webhook',
     events: ['post.generated', 'post.published']
   });
   ```

## Testing

Test endpoints using the provided test API key:

```typescript
TEST_API_KEY=test_key_12345
```

## Support

For API support:
- Email: api-support@your-domain.com
- Documentation: https://docs.your-domain.com
- Status: https://status.your-domain.com