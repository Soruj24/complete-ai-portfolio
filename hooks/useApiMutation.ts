import { useState, useCallback, useRef } from "react";

interface UseApiMutationOptions<TInput> {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
  formatBody?: (input: TInput) => BodyInit | FormData;
  signal?: AbortSignal;
}

interface UseApiMutationReturn<TInput, TOutput> {
  mutate: (input: TInput) => Promise<TOutput | null>;
  data: TOutput | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useApiMutation<TInput = Record<string, unknown>, TOutput = unknown>(
  url: string,
  options: UseApiMutationOptions<TInput> = {},
): UseApiMutationReturn<TInput, TOutput> {
  const { method = "POST", headers, onSuccess, onError, formatBody } = options;
  const [data, setData] = useState<TOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const mutate = useCallback(
    async (input: TInput): Promise<TOutput | null> => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setLoading(true);
      setError(null);
      setData(null);

      try {
        const isFormData = input instanceof FormData || formatBody?.(input) instanceof FormData;
        const body = formatBody ? formatBody(input) : isFormData ? (input as unknown as FormData) : JSON.stringify(input);

        const res = await fetch(url, {
          method,
          headers: isFormData ? headers : { "Content-Type": "application/json", ...headers },
          body,
          signal: abortRef.current.signal,
        });

        const json = await res.json();

        if (!res.ok) {
          const message = json.error?.message || json.error || "Request failed";
          throw new Error(message);
        }

        setData(json as TOutput);
        onSuccess?.(json);
        return json as TOutput;
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return null;
        const message = e instanceof Error ? e.message : "Request failed";
        setError(message);
        onError?.(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, method, headers, onSuccess, onError, formatBody],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { mutate, data, loading, error, reset };
}
