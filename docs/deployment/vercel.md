# Vercel Deployment Guide

This guide walks you through deploying the AI Self-Generating Blog platform on Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [GitHub account](https://github.com/signup)
- Claude API key from Anthropic

## Deployment Steps

### 1. Prepare Your Repository

1. **Fork or Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ai-self-generating-blog.git
   cd ai-self-generating-blog
   ```

2. **Push to Your GitHub**
   ```bash
   git remote set-url origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

### 2. Deploy to Vercel

1. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Project Name: `ai-self-generating-blog` (or your preference)
   - Framework Preset: `Next.js`
   - Root Directory: `./`

3. **Environment Variables**
   Add the following environment variables:
   ```env
   CLAUDE_API_KEY=your_claude_api_key_here
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### 3. Post-Deployment Configuration

1. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Configure DNS settings

2. **Environment Variables**
   - Verify environment variables are set correctly
   - Add any additional variables needed

3. **Monitoring Setup**
   - Enable Error Monitoring
   - Set up Usage Alerts
   - Configure Performance Monitoring

## Production Optimizations

### 1. Caching Strategy

```typescript
// pages/blog/[slug].tsx
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  
  return {
    props: { post },
    revalidate: 3600, // Revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: 'blocking',
  };
};
```

### 2. Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['your-image-cdn.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### 3. API Route Optimization

```typescript
// pages/api/generate.ts
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export default async function handler(req, res) {
  try {
    await limiter.check(res, 10, 'CACHE_TOKEN');
    // Handle request
  } catch {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
}
```

## Automatic Post Generation Setup

### 1. Vercel Cron Jobs

```typescript
// vercel.json
{
  "crons": [{
    "path": "/api/cron/generate-post",
    "schedule": "0 0 * * *"
  }]
}
```

### 2. Backup Generation System

```typescript
// lib/cron/backup.ts
import { Cron } from '@vercel/cron';

const cron = new Cron({
  timezone: 'UTC',
});

cron.schedule('0 0 * * *', async () => {
  try {
    await generatePost();
  } catch (error) {
    await notifyAdmin(error);
  }
});
```

## Monitoring and Logging

### 1. Error Tracking

```typescript
// lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.VERCEL_ENV,
});
```

### 2. Performance Monitoring

```typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

## Backup and Recovery

### 1. Database Backups

```bash
# Automated backup script
#!/bin/bash
curl -X POST $BACKUP_WEBHOOK_URL
```

### 2. Content Recovery

```typescript
// lib/backup/restore.ts
async function restoreContent() {
  const backup = await fetchLatestBackup();
  await restoreFromBackup(backup);
}
```

## Security Considerations

1. **API Protection**
   ```typescript
   // middleware.ts
   export function middleware(req: NextRequest) {
     if (req.nextUrl.pathname.startsWith('/api/')) {
       const apiKey = req.headers.get('authorization');
       if (!isValidApiKey(apiKey)) {
         return new Response('Unauthorized', { status: 401 });
       }
     }
   }
   ```

2. **Content Security Policy**
   ```typescript
   // next.config.js
   const securityHeaders = [
     {
       key: 'Content-Security-Policy',
       value: `
         default-src 'self';
         script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-analytics.com;
         style-src 'self' 'unsafe-inline';
         img-src 'self' blob: data:;
       `
     }
   ];
   ```

## Troubleshooting

Common deployment issues and solutions:

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs and ensure all dependencies are installed |
| API errors | Verify environment variables are set correctly |
| Slow performance | Enable caching and optimize image delivery |
| Generation fails | Check Claude API key and rate limits |

## Maintenance

Regular maintenance tasks:

1. **Weekly**
   - Monitor error logs
   - Check generation success rate
   - Review API usage

2. **Monthly**
   - Update dependencies
   - Backup database
   - Review performance metrics

3. **Quarterly**
   - Security audit
   - Infrastructure review
   - Cost optimization

## Support

For deployment support:
- Vercel Support: https://vercel.com/support
- Project Issues: https://github.com/yourusername/ai-self-generating-blog/issues
- Documentation: https://your-docs-url.com