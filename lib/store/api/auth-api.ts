import { api } from "@/lib/store/api";
import type { ApiResponse, RegisterRequest, User, ForgotPasswordRequest, ResetPasswordRequest, TwoFactorSetupResponse, TwoFactorVerifyRequest } from "@/shared/types";
import { API_ENDPOINTS } from "@/shared/constants/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<{ user: Pick<User, "_id" | "name" | "email"> }>, RegisterRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.REGISTER,
        method: "POST",
        body,
      }),
    }),

    verifyEmail: builder.mutation<ApiResponse<void>, { token: string }>({
      query: ({ token }) => ({
        url: `${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`,
        method: "GET",
      }),
    }),

    resendVerification: builder.mutation<ApiResponse<void>, { email: string }>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<ApiResponse<void>, ForgotPasswordRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<void>, ResetPasswordRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: "POST",
        body,
      }),
    }),

    setupTwoFactor: builder.mutation<ApiResponse<TwoFactorSetupResponse>, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.TWO_FACTOR_SETUP,
        method: "POST",
      }),
    }),

    verifyTwoFactor: builder.mutation<ApiResponse<void>, TwoFactorVerifyRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.TWO_FACTOR_VERIFY,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSetupTwoFactorMutation,
  useVerifyTwoFactorMutation,
} = authApi;
