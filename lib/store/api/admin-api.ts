import { api } from "@/lib/store/api";
import type { ApiResponse, AdminUser, SystemHealth, ActivityEntry } from "@/shared/types";
import type { CommandCenterData } from "@/shared/types/command-center";
import { API_ENDPOINTS } from "@/shared/constants/api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<ApiResponse<CommandCenterData>, void>({
      query: () => API_ENDPOINTS.ADMIN.STATS,
      providesTags: ["Admin"],
    }),

    getAdminUsers: builder.query<ApiResponse<AdminUser[]>, void>({
      query: () => API_ENDPOINTS.ADMIN.USERS,
      providesTags: ["Users"],
    }),

    updateAdminUser: builder.mutation<ApiResponse<AdminUser>, { userId: string; data: { role?: string; status?: string; name?: string } }>({
      query: ({ userId, data }) => ({
        url: `${API_ENDPOINTS.ADMIN.USERS}/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteAdminUser: builder.mutation<ApiResponse<void>, string>({
      query: (userId) => ({
        url: `${API_ENDPOINTS.ADMIN.USERS}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    getSystemHealth: builder.query<ApiResponse<SystemHealth>, void>({
      query: () => API_ENDPOINTS.ADMIN.SYSTEM_HEALTH,
      providesTags: ["Admin"],
    }),

    getActivity: builder.query<ApiResponse<ActivityEntry[]>, void>({
      query: () => API_ENDPOINTS.ADMIN.ACTIVITY,
      providesTags: ["Activity"],
    }),

    getAdminResource: builder.query<ApiResponse<any[]>, { resource: string; params?: Record<string, any> }>({
      query: ({ resource, params }) => ({
        url: API_ENDPOINTS.ADMIN.RESOURCE(resource),
        params,
      }),
    }),

    createAdminResource: builder.mutation<ApiResponse<any>, { resource: string; data: any }>({
      query: ({ resource, data }) => ({
        url: API_ENDPOINTS.ADMIN.RESOURCE(resource),
        method: "POST",
        body: data,
      }),
    }),

    updateAdminResource: builder.mutation<ApiResponse<any>, { resource: string; id: string; data: any }>({
      query: ({ resource, id, data }) => ({
        url: `${API_ENDPOINTS.ADMIN.RESOURCE(resource)}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteAdminResource: builder.mutation<ApiResponse<void>, { resource: string; id: string }>({
      query: ({ resource, id }) => ({
        url: `${API_ENDPOINTS.ADMIN.RESOURCE(resource)}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
  useGetSystemHealthQuery,
  useGetActivityQuery,
  useGetAdminResourceQuery,
  useCreateAdminResourceMutation,
  useUpdateAdminResourceMutation,
  useDeleteAdminResourceMutation,
} = adminApi;
