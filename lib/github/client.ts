import { GITHUB_API_BASE, GITHUB_DEFAULT_HEADERS } from "./constants";

function initHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    return { ...GITHUB_DEFAULT_HEADERS, Authorization: `Bearer ${token}` };
  }
  return GITHUB_DEFAULT_HEADERS;
}

export async function githubFetch(path: string) {
  const res = await fetch(`${GITHUB_API_BASE}${path}`, { headers: initHeaders(), next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function githubGraphql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`${GITHUB_API_BASE}/graphql`, {
    method: "POST",
    headers: { ...initHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || "GraphQL error");
  return json.data as T;
}
