import { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/api/auth'
import type { VerifyEmailResponse } from '@/types'
import toast from 'react-hot-toast'

type VerificationState = 'verifying' | 'success' | 'error' | 'no-token'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [state, setState] = useState<VerificationState>('verifying')
  const [verificationData, setVerificationData] = useState<VerifyEmailResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const hasAttemptedVerification = useRef(false)

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

    // Prevent multiple verification attempts
    if (hasAttemptedVerification.current) {
      return
    }

    hasAttemptedVerification.current = true
    verifyMutation.mutate(token)
  }, [token])

  const handleCopyPassword = async () => {
    if (verificationData?.metadata?.tempPassword) {
      await navigator.clipboard.writeText(verificationData.metadata.tempPassword)
      toast.success('Password copied to clipboard!')
    }
  }

  const handleCopyPortalUrl = async () => {
    const portalUrl = verificationData?.metadata?.portalUrl || 'https://app.edumanage.ng'
    await navigator.clipboard.writeText(portalUrl)
    toast.success('Portal URL copied to clipboard!')
  }

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
                  Email Verified Successfully!
                </h2>

                <p className="text-gray-600 mb-6">
                  {verificationData?.message || 'Your email has been verified. You can now log in to your account.'}
                </p>

                {/* Admin Credentials */}
                {verificationData?.metadata?.tempPassword && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 text-left">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                      Your Login Credentials
                    </h3>

                    {/* Admin Name */}
                    {verificationData.metadata.recipientName && (
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Administrator Name
                        </label>
                        <div className="text-sm text-gray-900 font-medium">
                          {verificationData.metadata.recipientName}
                        </div>
                      </div>
                    )}

                    {/* Temporary Password */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Temporary Password
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2 bg-white border border-blue-200 rounded-lg px-3 py-2">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={verificationData.metadata.tempPassword}
                            readOnly
                            className="flex-1 text-sm font-mono text-gray-900 bg-transparent border-none outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyPassword}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          title="Copy password"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-amber-600 mt-2">
                        Please change this password after your first login for security.
                      </p>
                    </div>

                    {/* Portal URL */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Portal URL
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2">
                          <a
                            href={verificationData.metadata.portalUrl || 'https://app.edumanage.ng'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700 hover:underline break-all"
                          >
                            {verificationData.metadata.portalUrl || 'https://app.edumanage.ng'}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyPortalUrl}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          title="Copy portal URL"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Login Button */}
                <button
                  onClick={() => {
                    const portalUrl = verificationData?.metadata?.portalUrl || 'https://app.edumanage.ng'
                    window.open(portalUrl, '_blank')
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  Go to Login Portal
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
