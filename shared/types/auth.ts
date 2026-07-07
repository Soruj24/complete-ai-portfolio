export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "banned";
  isVerified: boolean;
  image?: string;
  twoFactorEnabled: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Pick<User, "_id" | "name" | "email" | "role">;
  requiresTwoFactor?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  image?: string;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerifyRequest {
  token: string;
  secret?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}
