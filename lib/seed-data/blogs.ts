export const seedBlogPosts = [
  {
    title: "Building RAG Systems with LangChain and Next.js",
    slug: "building-rag-systems-langchain-nextjs",
    content: `# Building RAG Systems with LangChain and Next.js

Retrieval-Augmented Generation (RAG) is a powerful technique for enhancing LLMs with external knowledge. In this post, I'll walk through building a production-ready RAG system.

## What is RAG?

RAG combines retrieval systems with generative models to provide accurate, up-to-date responses grounded in your data.

## Architecture

\`\`\`
User Query → Embedding → Vector Search → Context → LLM → Response
\`\`\`

## Implementation

Key components:
1. **Document Processing** - Split, chunk, and embed documents
2. **Vector Storage** - Store embeddings in a vector database
3. **Retrieval** - Find relevant chunks for user queries
4. **Generation** - Use LLM with retrieved context

## Code Example

\`\`\`typescript
const retriever = vectorStore.asRetriever();
const chain = RetrievalQAChain.fromLLM(llm, retriever);
const result = await chain.call({ query: userQuestion });
\`\`\`

## Best Practices

- Chunk size: 500-1000 tokens
- Overlap: 10-20%
- Use hybrid search (semantic + keyword)
- Implement reranking for better relevance`,
    excerpt: "Learn how to build production-ready RAG systems using LangChain and Next.js with vector databases.",
    category: "AI/ML",
    image: "/blog/rag-systems.jpg",
    authorId: "admin",
    authorName: "Soruj Mahmud",
    tags: ["AI", "RAG", "LangChain", "Next.js", "LLM"],
    published: true,
    readTime: "8 min read",
  },
  {
    title: "Scaling Next.js Applications with Edge Functions",
    slug: "scaling-nextjs-edge-functions",
    content: `# Scaling Next.js Applications with Edge Functions

Edge computing brings computation closer to users. Next.js 15 makes it easy to deploy API routes to the edge.

## Why Edge Functions?

- Lower latency (closer to users)
- Automatic scaling
- Reduced cold starts
- Global distribution

## Implementation

\`\`\`typescript
// app/api/edge-route/route.ts
export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify({ hello: 'world' }), {
    headers: { 'content-type': 'application/json' }
  });
}
\`\`\`

## Limitations

- No Node.js APIs (fs, path, etc.)
- Limited execution time
- Smaller bundle size limit
- No native modules

## When to Use

- API routes with low latency requirements
- Middleware for authentication/routing
- A/B testing and feature flags
- Geolocation-based responses`,
    excerpt: "Explore how to leverage Next.js Edge Functions for global, low-latency API routes.",
    category: "Full Stack",
    image: "/blog/edge-functions.jpg",
    authorId: "admin",
    authorName: "Soruj Mahmud",
    tags: ["Next.js", "Edge", "Performance", "Scaling"],
    published: true,
    readTime: "6 min read",
  },
  {
    title: "TypeScript Best Practices for Large Codebases",
    slug: "typescript-best-practices-large-codebases",
    content: `# TypeScript Best Practices for Large Codebases

As TypeScript projects grow, maintaining type safety and developer experience becomes crucial.

## Strict Configuration

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
\`\`\`

## Type Patterns

### Discriminated Unions
\`\`\`typescript
type Result<T, E> = 
  | { success: true; data: T }
  | { success: false; error: E };
\`\`\`

### Branded Types
\`\`\`typescript
type UserId = string & { __brand: 'UserId' };
function createUserId(id: string): UserId { return id as UserId; }
\`\`\`

## Architecture Patterns

- Repository pattern for data access
- Service layer for business logic
- Dependency injection for testability
- Module boundaries with explicit exports`,
    excerpt: "Essential TypeScript patterns and configurations for maintaining large-scale applications.",
    category: "TypeScript",
    image: "/blog/typescript-best-practices.jpg",
    authorId: "admin",
    authorName: "Soruj Mahmud",
    tags: ["TypeScript", "Architecture", "Best Practices", "Type Safety"],
    published: true,
    readTime: "10 min read",
  },
];