export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  isActive: boolean;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  requiresTwoFactor?: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface TwoFactorSetupResponse {
  success: boolean;
  secret?: string;
  qrCode?: string;
  backupCodes?: string[];
  message?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      accessToken?: string;
      refreshToken?: string;
    };
  }

  interface User {
    id: string;
    role: string;
    email: string;
    status: string;
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    role: string;
    email: string;
    status: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}
