export { generateEmbedding, generateEmbeddings } from "./embeddings";
export { chunkText, chunkPortfolioData } from "./chunker";
export type { Chunk } from "./chunker";
export { indexChunks, searchSimilar, retrieveContext, clearStore, isIndexed } from "./vector-store";
export { seedPortfolioData } from "./seed";
