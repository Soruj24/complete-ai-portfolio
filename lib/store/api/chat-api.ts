import { api } from "@/lib/store/api";
import type { ApiResponse, ChatMessage, ChatUser, AiChatMessage, AiChatRequest } from "@/shared/types";
import { API_ENDPOINTS } from "@/shared/constants/api";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<ApiResponse<ChatMessage[]>, string>({
      query: (userId) => ({
        url: API_ENDPOINTS.CHAT.MESSAGES,
        params: { userId },
      }),
      providesTags: (_result, _error, userId) => [{ type: "Messages", id: userId }],
    }),

    sendMessage: builder.mutation<ApiResponse<ChatMessage>, { receiverId: string; message: string }>({
      query: (body) => ({
        url: API_ENDPOINTS.CHAT.MESSAGES,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages", "Chat"],
    }),

    getAdminChatUsers: builder.query<ApiResponse<ChatUser[]>, void>({
      query: () => API_ENDPOINTS.CHAT.ADMIN_USERS,
      providesTags: ["Chat"],
    }),

    sendAiMessage: builder.mutation<ApiResponse<AiChatMessage>, AiChatRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.CHAT.AI,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetAdminChatUsersQuery,
  useSendAiMessageMutation,
} = chatApi;
