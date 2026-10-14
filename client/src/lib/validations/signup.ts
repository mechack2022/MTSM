import { z } from 'zod'

export const signupSchema = z.object({
  organizationName: z
    .string()
    .min(1, 'Organization name is required')
    .max(255, 'Organization name must not exceed 255 characters'),
  organizationCode: z
    .string()
    .length(6, 'Organization code must be exactly 6 characters')
    .regex(/^[A-Z]{6}$/, 'Code must be exactly 6 uppercase letters')
    .transform(val => val.toUpperCase()),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(255, 'Full name must not exceed 255 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(100, 'Username must not exceed 100 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must not exceed 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  contactEmail: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters')
    .optional()
    .or(z.literal('')),
  contactPhone: z
    .string()
    .max(50, 'Phone number must not exceed 50 characters')
    .optional()
    .or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type SignupFormData = z.infer<typeof signupSchema>

export const resendVerificationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
})

export type ResendVerificationFormData = z.infer<typeof resendVerificationSchema>
