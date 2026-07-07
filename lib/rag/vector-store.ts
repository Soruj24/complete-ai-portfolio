import { generateEmbedding, generateEmbeddings } from "./embeddings";
import type { Chunk } from "./chunker";

interface StoredChunk extends Chunk {
  embedding: number[];
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

let store: StoredChunk[] = [];

export async function indexChunks(chunks: Chunk[]): Promise<void> {
  const texts = chunks.map((c) => c.content);
  const embeddings = await generateEmbeddings(texts);

  store = chunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i],
  }));
}

export function isIndexed(): boolean {
  return store.length > 0;
}

export function clearStore(): void {
  store = [];
}

export async function searchSimilar(
  query: string,
  topK = 5,
  filterType?: string
): Promise<(Chunk & { score: number })[]> {
  const queryEmbedding = await generateEmbedding(query);

  const filtered = filterType
    ? store.filter((c) => c.metadata.type === filterType)
    : store;

  const scored = filtered.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ embedding: _, ...rest }) => rest);
}

export async function retrieveContext(
  query: string,
  topK = 3,
  filterType?: string
): Promise<string> {
  const results = await searchSimilar(query, topK, filterType);
  return results
    .map((r) => `[${r.metadata.source}] ${r.content}`)
    .join("\n\n");
}
