# AI Self-Generating Blog Platform

A modern, Vercel-styled blog platform that automatically generates high-quality technical content using Claude 3.5 Sonnet. Built with Next.js 14, TypeScript, and Tailwind CSS, featuring automatic daily blog post generation.

![Vercel-style Design](https://your-screenshot-url.com) <!-- Add your screenshot here -->

## ✨ Key Features

- 🤖 **Autonomous Content Generation**: Leverages Claude 3.5 Sonnet for daily self-generated blog posts
- 🎨 **Vercel-Inspired Design**: Modern, minimalist aesthetic with responsive layouts
- 💻 **Technical Content Focus**: Auto-generates in-depth technical articles with proper code formatting
- 🌓 **Dark Mode**: Seamless dark/light mode switching
- ⚡ **Performance**: Built on Next.js 14 App Router for optimal performance
- 🔒 **Type Safety**: Full TypeScript implementation
- 📱 **Responsive**: Mobile-first design approach

## 🧠 AI Content Generation

This blog platform uses Claude 3.5 Sonnet to autonomously generate technical content. The AI model:

- Generates daily blog posts on various technical topics
- Creates properly formatted markdown content
- Includes syntax-highlighted code examples
- Maintains consistent technical depth and accuracy
- Generates meta descriptions and SEO-friendly titles

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Anthropic's Claude 3.5 Sonnet
- **Content Formatting**: MDX with rehype-pretty-code
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes for blog generation
│   ├── blog/              # Blog pages and slugs
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── blog/             # Blog-specific components
│   │   └── BlogContent.tsx
│   ├── layout/           # Layout components
│   │   └── Header.tsx
│   └── ui/              # Reusable UI components
├── lib/                  # Utility functions
│   ├── claude/          # Claude AI integration
│   │   └── generate-post.ts
│   └── utils/           # Helper functions
├── styles/              # Global styles
└── types/               # TypeScript types
    └── blog.ts
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-self-generating-blog.git
   cd ai-self-generating-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   CLAUDE_API_KEY=your_claude_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Visit [http://localhost:3000](http://localhost:3000)**

## ⚙️ Configuration

### Content Generation Settings

The blog post generation can be configured in `src/lib/claude/generate-post.ts`:

```typescript
export const GENERATION_CONFIG = {
  model: 'claude-3-sonnet-20240229',
  maxTokens: 4000,
  topics: [
    'Web Development',
    'AI/ML',
    'System Design',
    // Add your preferred topics
  ]
};
```

### Automatic Post Generation

Posts are automatically generated using the Claude 3.5 Sonnet model:
- Daily generation schedule
- Smart topic selection
- Consistent formatting
- Code block integration
- SEO optimization

## 🔄 API Routes

### Generate New Post
```typescript
POST /api/generate
Body: {
  "topic": string  // Optional - will auto-select if not provided
}
Response: {
  "title": string,
  "content": string,
  "excerpt": string
}
```

## 🎯 Usage

### Manual Post Generation
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic":"Modern JavaScript Features"}'
```

### Automatic Generation
The system automatically generates new posts daily using the Claude 3.5 Sonnet model. You can modify the generation schedule in the configuration.

## 🎨 Styling

- Vercel-inspired minimalist design
- Syntax highlighting for code blocks
- Responsive layout
- Dark mode support
- Custom typography

## 📈 SEO

Each generated post includes:
- Meta descriptions
- SEO-friendly URLs
- OpenGraph tags
- Structured data
- Optimized headers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com) for Claude 3.5 Sonnet API
- [Vercel](https://vercel.com) for design inspiration
- [Next.js](https://nextjs.org) team for the amazing framework

## ⚠️ Important Notes

- Ensure your Claude API key has sufficient credits for daily content generation
- Review generated content before publishing
- Configure topic selection based on your blog's focus
- Customize the generation prompts as needed

## 🔗 Links

- [Demo](https://your-demo-url.com)
- [Documentation](https://your-docs-url.com)
- [Bug Report](https://github.com/yourusername/ai-self-generating-blog/issues)

---

Built with ❤️ using Next.js and Claude 3.5 Sonnet