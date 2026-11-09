import api from '@/lib/api-client'
import type {
  SignupRequest,
  SignupResponse,
  VerifyEmailResponse,
  ResendVerificationRequest,
} from '@/types'

export const authApi = {
  signup: async (data: SignupRequest) => {
    return api.post<SignupResponse>('/auth/signup', data)
  },

  verifyEmail: async (token: string) => {
    return api.get<VerifyEmailResponse>(`/email-verification/verify?token=${token}`)
  },

  resendVerification: async (data: ResendVerificationRequest) => {
    return api.post<void>('/auth/resend-verification', data)
  },
}
