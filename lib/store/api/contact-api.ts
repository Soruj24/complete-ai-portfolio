import { api } from "@/lib/store/api";
import type { ApiResponse, ContactMessage, SendContactRequest } from "@/shared/types";
import { API_ENDPOINTS } from "@/shared/constants/api";

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<ApiResponse<ContactMessage>, SendContactRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.CONTACT,
        method: "POST",
        body,
      }),
    }),

    getContactMessages: builder.query<ApiResponse<ContactMessage[]>, void>({
      query: () => API_ENDPOINTS.CONTACT,
      providesTags: ["Contact"],
    }),

    deleteContactMessage: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.CONTACT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useSendContactMessageMutation,
  useGetContactMessagesQuery,
  useDeleteContactMessageMutation,
} = contactApi;
