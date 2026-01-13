import * as v from 'valibot';

export const SignupSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(6)),
  fullName: v.optional(v.string()),
  locale: v.optional(v.string()),
});

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(1)),
});

export const ForgotPasswordSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  locale: v.optional(v.string()),
});

export const ResetPasswordSchema = v.object({
  password: v.pipe(v.string(), v.minLength(6)),
});

export const CheckoutSchema = v.object({
  priceId: v.pipe(v.string(), v.minLength(1)),
});

export const UserResponseSchema = v.object({
  id: v.string(),
  email: v.string(),
  fullName: v.nullable(v.string()),
});

export const AuthResponseSchema = v.object({
  token: v.string(),
  user: UserResponseSchema,
});

export const LicenseSchema = v.object({
  id: v.string(),
  serialNumber: v.string(),
  purchaseDate: v.string(),
  expiryDate: v.string(),
  isActive: v.boolean(),
});

export const LicensesResponseSchema = v.object({
  licenses: v.array(LicenseSchema),
});

export const LicenseResponseSchema = v.object({
  license: LicenseSchema,
});

export const CheckoutResponseSchema = v.object({
  sessionId: v.string(),
});

export const ErrorResponseSchema = v.object({
  error: v.string(),
});

export type SignupInput = v.InferInput<typeof SignupSchema>;
export type LoginInput = v.InferInput<typeof LoginSchema>;
export type CheckoutInput = v.InferInput<typeof CheckoutSchema>;
export type UserResponse = v.InferOutput<typeof UserResponseSchema>;
export type AuthResponse = v.InferOutput<typeof AuthResponseSchema>;
export type LicenseResponse = v.InferOutput<typeof LicenseResponseSchema>;
export type LicensesResponse = v.InferOutput<typeof LicensesResponseSchema>;
export type CheckoutResponse = v.InferOutput<typeof CheckoutResponseSchema>;
export type ErrorResponse = v.InferOutput<typeof ErrorResponseSchema>;
