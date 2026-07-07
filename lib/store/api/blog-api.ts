import { api } from "@/lib/store/api";
import type { ApiResponse, BlogPost, CreateBlogRequest, AddCommentRequest, LikeRequest } from "@/shared/types";
import { API_ENDPOINTS } from "@/shared/constants/api";

export const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogPosts: builder.query<ApiResponse<BlogPost[]>, { publishedOnly?: boolean } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.BLOG.POSTS,
        params: params || undefined,
      }),
      providesTags: ["Blog"],
    }),

    getBlogPostById: builder.query<ApiResponse<BlogPost>, string>({
      query: (id) => `${API_ENDPOINTS.BLOG.POSTS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Blog", id }],
    }),

    createBlogPost: builder.mutation<ApiResponse<BlogPost>, CreateBlogRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.BLOG.POSTS,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlogPost: builder.mutation<ApiResponse<BlogPost>, { id: string; data: Partial<CreateBlogRequest> }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.BLOG.POSTS}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Blog", id }, "Blog"],
    }),

    deleteBlogPost: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.BLOG.POSTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    addComment: builder.mutation<ApiResponse<BlogPost>, AddCommentRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.BLOG.COMMENT,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),

    toggleLike: builder.mutation<ApiResponse<BlogPost>, LikeRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.BLOG.LIKE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogPostsQuery,
  useGetBlogPostByIdQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
  useAddCommentMutation,
  useToggleLikeMutation,
} = blogApi;
