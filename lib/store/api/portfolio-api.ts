import { api } from "@/lib/store/api";
import type { ApiResponse, IProject, ISkill, IExperience, ISettings, ISocialLink } from "@/shared/types";
import { API_ENDPOINTS } from "@/shared/constants/api";

export const portfolioApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ApiResponse<IProject[]>, { page?: number; limit?: number; category?: string; featured?: boolean } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.PORTFOLIO.PROJECTS,
        params: params || undefined,
      }),
      providesTags: ["Projects"],
    }),

    getProjectById: builder.query<ApiResponse<IProject>, string>({
      query: (id) => API_ENDPOINTS.PORTFOLIO.PROJECT_BY_ID(id),
      providesTags: (_result, _error, id) => [{ type: "Projects", id }],
    }),

    createProject: builder.mutation<ApiResponse<IProject>, Partial<IProject>>({
      query: (body) => ({
        url: API_ENDPOINTS.PORTFOLIO.PROJECTS,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),

    updateProject: builder.mutation<ApiResponse<IProject>, { id: string; data: Partial<IProject> }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.PORTFOLIO.PROJECT_BY_ID(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Projects", id }, "Projects"],
    }),

    deleteProject: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: API_ENDPOINTS.PORTFOLIO.PROJECT_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),

    getSkills: builder.query<ApiResponse<ISkill[]>, { category?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.PORTFOLIO.SKILLS,
        params: params || undefined,
      }),
      providesTags: ["Skills"],
    }),

    createSkill: builder.mutation<ApiResponse<ISkill>, Partial<ISkill>>({
      query: (body) => ({
        url: API_ENDPOINTS.PORTFOLIO.SKILLS,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Skills"],
    }),

    updateSkill: builder.mutation<ApiResponse<ISkill>, { id: string; data: Partial<ISkill> }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.PORTFOLIO.SKILL_BY_ID(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Skills"],
    }),

    deleteSkill: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: API_ENDPOINTS.PORTFOLIO.SKILL_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),

    getExperience: builder.query<ApiResponse<IExperience[]>, void>({
      query: () => API_ENDPOINTS.PORTFOLIO.EXPERIENCE,
      providesTags: ["Experience"],
    }),

    createExperience: builder.mutation<ApiResponse<IExperience>, Partial<IExperience>>({
      query: (body) => ({
        url: API_ENDPOINTS.PORTFOLIO.EXPERIENCE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Experience"],
    }),

    updateExperience: builder.mutation<ApiResponse<IExperience>, { id: string; data: Partial<IExperience> }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.PORTFOLIO.EXPERIENCE_BY_ID(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Experience"],
    }),

    deleteExperience: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: API_ENDPOINTS.PORTFOLIO.EXPERIENCE_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Experience"],
    }),

    getSettings: builder.query<ApiResponse<ISettings>, void>({
      query: () => API_ENDPOINTS.PORTFOLIO.SETTINGS,
      providesTags: ["Settings"],
    }),

    getPublicSettings: builder.query<ApiResponse<ISettings>, void>({
      query: () => API_ENDPOINTS.PORTFOLIO.SETTINGS_PUBLIC,
    }),

    updateSettings: builder.mutation<ApiResponse<ISettings>, Partial<ISettings>>({
      query: (body) => ({
        url: API_ENDPOINTS.PORTFOLIO.SETTINGS,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    getCertificates: builder.query<ApiResponse<any[]>, void>({
      query: () => API_ENDPOINTS.CERTIFICATES,
    }),

    getTestimonials: builder.query<ApiResponse<any[]>, void>({
      query: () => API_ENDPOINTS.TESTIMONIALS,
    }),

    getAchievements: builder.query<ApiResponse<any[]>, void>({
      query: () => API_ENDPOINTS.ACHIEVEMENTS,
    }),

    getSocialLinks: builder.query<ApiResponse<ISocialLink[]>, void>({
      query: () => API_ENDPOINTS.SOCIAL_LINKS,
    }),

    getResume: builder.query<ApiResponse<any>, void>({
      query: () => API_ENDPOINTS.RESUME,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useGetSettingsQuery,
  useGetPublicSettingsQuery,
  useUpdateSettingsMutation,
  useGetCertificatesQuery,
  useGetTestimonialsQuery,
  useGetAchievementsQuery,
  useGetSocialLinksQuery,
  useGetResumeQuery,
} = portfolioApi;
