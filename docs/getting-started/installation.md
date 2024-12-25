# Installation Guide

This guide will walk you through the process of setting up the AI Self-Generating Blog platform on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.17.0 or higher)
- npm (v9.0.0 or higher)
- Git

## Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ai-self-generating-blog.git
   cd ai-self-generating-blog
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   CLAUDE_API_KEY=your_claude_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Verify Installation**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Check that the landing page loads correctly
   - Verify that the blog section is accessible
   - Test the dark mode toggle

## Troubleshooting

### Common Issues

1. **Node Version Mismatch**
   ```bash
   # Check your Node version
   node --version
   
   # If needed, install the correct version using nvm
   nvm install 18.17.0
   nvm use 18.17.0
   ```

2. **Missing Dependencies**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

3. **Environment Variables Not Loading**
   - Ensure `.env.local` is in the root directory
   - Restart the development server
   - Check for typos in variable names

### Error Messages

| Error | Solution |
|-------|----------|
| `Error: Cannot find module '@anthropic-ai/sdk'` | Run `npm install @anthropic-ai/sdk` |
| `Invalid API key` | Check your Claude API key in `.env.local` |
| `Port 3000 is already in use` | Kill the process using port 3000 or use a different port |

## Post-Installation Setup

1. **Customize Configuration**
   - Update `src/config/site.ts` with your site details
   - Modify `src/config/blog.ts` for blog settings
   - Adjust AI generation settings in `src/lib/claude/config.ts`

2. **Set Up Git Hooks (Optional)**
   ```bash
   npm run prepare
   ```

3. **Configure VSCode (Recommended)**
   Install the following extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

## Next Steps

- Read the [Configuration Guide](./configuration.md)
- Learn about [Environment Setup](./environment.md)
- Explore [Features](../features/README.md)

## Support

If you encounter any issues not covered in this guide:
1. Check the [GitHub Issues](https://github.com/yourusername/ai-self-generating-blog/issues)
2. Join our [Discord Community](https://discord.gg/your-server)
3. Create a new issue with detailed information about your problem