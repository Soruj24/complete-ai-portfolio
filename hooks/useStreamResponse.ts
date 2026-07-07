"use client";

import { useState, useRef, useCallback } from "react";

interface UseStreamResponseOptions {
  onChunk?: (content: string) => void;
  onComplete?: (content: string) => void;
  onError?: (error: string) => void;
}

interface UseStreamResponseReturn {
  stream: (url: string, body: Record<string, unknown>) => Promise<void>;
  content: string;
  loading: boolean;
  error: string | null;
  abort: () => void;
  reset: () => void;
}

export function useStreamResponse(
  options: UseStreamResponseOptions = {},
): UseStreamResponseReturn {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stream = useCallback(
    async (url: string, body: Record<string, unknown>) => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setLoading(true);
      setError(null);
      setContent("");

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.error?.message || json.error || `Request failed (${res.status})`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("Response body is not readable");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setContent(accumulated);
          options.onChunk?.(accumulated);
        }

        options.onComplete?.(accumulated);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        const message = e instanceof Error ? e.message : "Stream failed";
        setError(message);
        options.onError?.(message);
      } finally {
        setLoading(false);
      }
    },
    [options],
  );

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setContent("");
    setLoading(false);
    setError(null);
  }, []);

  return { stream, content, loading, error, abort, reset };
}
