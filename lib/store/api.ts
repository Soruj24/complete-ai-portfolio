import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "@/shared/types";
import { env } from "@/lib/env";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "Projects",
    "Skills",
    "Experience",
    "Settings",
    "Chat",
    "Messages",
    "Contact",
    "Blog",
    "Users",
    "Notifications",
    "Admin",
    "Activity",
  ],
  endpoints: () => ({}),
});
