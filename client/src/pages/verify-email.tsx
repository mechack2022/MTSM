import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/api/auth'
import type { VerifyEmailResponse } from '@/types'

type VerificationState = 'verifying' | 'success' | 'error' | 'no-token'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [state, setState] = useState<VerificationState>('verifying')
  const [verificationData, setVerificationData] = useState<VerifyEmailResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const token = searchParams.get('token')

  const verifyMutation = useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: (response) => {
      setVerificationData(response.data || null)
      setState('success')
    },
    onError: (error: any) => {
      const errorData = error?.response?.data
      setErrorMessage(
        errorData?.message ||
        errorData?.error?.message ||
        'Failed to verify email. The link may have expired or is invalid.'
      )
      setState('error')
    },
  })

  useEffect(() => {
    if (!token) {
      setState('no-token')
      return
    }

    verifyMutation.mutate(token)
  }, [token])

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">ACE EDUManage</span>
          </div>

          <div className="text-center">
            {/* Verifying State */}
            {state === 'verifying' && (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verifying Your Email
                </h2>

                <p className="text-gray-600">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {/* Success State */}
            {state === 'success' && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Email Verified!
                </h2>

                <p className="text-gray-600 mb-6">
                  {verificationData?.message || 'Your email has been successfully verified. You can now log in to your account.'}
                </p>

                {verificationData?.username && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Username:</span> {verificationData.username}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => navigate('/login')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-lg"
                >
                  Go to Login
                </button>
              </>
            )}

            {/* Error State */}
            {state === 'error' && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verification Failed
                </h2>

                <p className="text-gray-600 mb-6">
                  {errorMessage}
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/resend-verification')}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-lg"
                  >
                    Resend Verification Email
                  </button>

                  <button
                    onClick={() => navigate('/signup')}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  >
                    Back to Signup
                  </button>
                </div>
              </>
            )}

            {/* No Token State */}
            {state === 'no-token' && (
              <>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Invalid Link
                </h2>

                <p className="text-gray-600 mb-6">
                  This verification link is invalid or incomplete. Please check your email for the correct link.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/resend-verification')}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-lg"
                  >
                    Resend Verification Email
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                  >
                    Back to Home
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
