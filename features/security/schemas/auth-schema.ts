import { z } from "zod";

export const ipEntrySchema = z.object({
  address: z.string().min(1, "IP address is required").regex(/^[\d./:a-fA-F]+$/, "Invalid IP address format"),
  reason: z.string().min(1, "Reason is required").max(200),
  expiresAt: z.string().nullable(),
});

export const passwordPolicySchema = z.object({
  minLength: z.number().min(6).max(128),
  requireUppercase: z.boolean(),
  requireLowercase: z.boolean(),
  requireNumbers: z.boolean(),
  requireSymbols: z.boolean(),
  expirationDays: z.number().min(0).max(365),
  historyCount: z.number().min(0).max(24),
  maxAttempts: z.number().min(3).max(20),
  lockoutDuration: z.number().min(5).max(120),
});

export const apiKeySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
  expiresIn: z.string().optional(),
});

export const envVarSchema = z.object({
  key: z.string().min(1, "Key is required").regex(/^[A-Z_][A-Z0-9_]*$/, "Use UPPER_SNAKE_CASE format"),
  value: z.string().min(1, "Value is required"),
  environment: z.enum(["Production", "Staging", "Development", "All"]),
  sensitive: z.boolean().default(true),
});

export type IPEntryInput = z.infer<typeof ipEntrySchema>;
export type APIKeyInput = z.infer<typeof apiKeySchema>;
export type EnvVarInput = z.infer<typeof envVarSchema>;
