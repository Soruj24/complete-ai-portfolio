import "server-only";
import { getSessionFromCookie } from "./cookies";

export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export async function getSession(): Promise<Session | null> {
  const payload = await getSessionFromCookie();
  if (!payload) return null;
  return {
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    },
  };
}
