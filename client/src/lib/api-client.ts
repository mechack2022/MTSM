// ============================================================================
// API CLIENT - Axios Configuration with Interceptors
// ============================================================================
// Features:
// - Automatic authentication token injection
// - Request/response interceptors
// - Error handling and transformation
// - Retry logic for failed requests
// - Offline detection
// ============================================================================

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse, ApiError } from '@/types'
import { useAppStore } from '@/store'

// ============================================================================
// BASE CONFIGURATION
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'
const API_TIMEOUT = 30000 // 30 seconds

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ============================================================================
// REQUEST INTERCEPTOR
// ============================================================================

apiClient.interceptors.request.use(
  (config) => {
    // Get token from store
    const token = useAppStore.getState().token

    // Inject auth token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add request timestamp for logging
    config.metadata = { startTime: Date.now() }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(
        `%c[API Request] ${config.method?.toUpperCase()} ${config.url}`,
        'color: #3b82f6; font-weight: bold',
        {
          params: config.params,
          data: config.data,
        }
      )
    }

    return config
  },
  (error) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

// ============================================================================
// RESPONSE INTERCEPTOR
// ============================================================================

apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Calculate request duration
    const duration = Date.now() - (response.config.metadata?.startTime || 0)

    // Log response in development
    if (import.meta.env.DEV) {
      console.log(
        `%c[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        'color: #10b981; font-weight: bold',
        {
          status: response.status,
          duration: `${duration}ms`,
          data: response.data,
        }
      )
    }

    // Return unwrapped data for easier consumption
    return response
  },
  async (error: AxiosError<ApiResponse>) => {
    const { config, response } = error

    // Calculate request duration
    const duration = Date.now() - (config?.metadata?.startTime || 0)

    // Log error in development
    if (import.meta.env.DEV) {
      console.error(
        `%c[API Error] ${config?.method?.toUpperCase()} ${config?.url}`,
        'color: #ef4444; font-weight: bold',
        {
          status: response?.status,
          duration: `${duration}ms`,
          error: response?.data?.error || error.message,
        }
      )
    }

    // Handle specific error scenarios
    if (!response) {
      // Network error (no response from server)
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(createApiError('TIMEOUT', 'Request timeout'))
      }

      if (error.message === 'Network Error') {
        return Promise.reject(
          createApiError('NETWORK_ERROR', 'No internet connection')
        )
      }

      return Promise.reject(
        createApiError('UNKNOWN_ERROR', error.message || 'An error occurred')
      )
    }

    // Handle HTTP error responses
    switch (response.status) {
      case 401:
        // Unauthorized - clear auth and redirect to login
        handleUnauthorized()
        return Promise.reject(
          response.data?.error ||
            createApiError('UNAUTHORIZED', 'Authentication required')
        )

      case 403:
        // Forbidden
        return Promise.reject(
          response.data?.error ||
            createApiError('FORBIDDEN', 'Access denied')
        )

      case 404:
        // Not found
        return Promise.reject(
          response.data?.error ||
            createApiError('NOT_FOUND', 'Resource not found')
        )

      case 409:
        // Conflict
        return Promise.reject(
          response.data?.error ||
            createApiError('CONFLICT', 'Resource conflict')
        )

      case 422:
        // Validation error
        return Promise.reject(
          response.data?.error ||
            createApiError('VALIDATION_ERROR', 'Validation failed')
        )

      case 500:
      case 502:
      case 503:
        // Server errors - could retry
        if (config && shouldRetry(config)) {
          return retryRequest(config)
        }
        return Promise.reject(
          response.data?.error ||
            createApiError('SERVER_ERROR', 'Server error occurred')
        )

      default:
        return Promise.reject(
          response.data?.error ||
            createApiError(
              'API_ERROR',
              response.data?.message || 'An error occurred'
            )
        )
    }
  }
)

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function createApiError(code: string, message: string): ApiError {
  return {
    code,
    message,
    timestamp: new Date().toISOString(),
  }
}

function handleUnauthorized() {
  // Clear authentication
  useAppStore.getState().clearAuth()

  // Redirect to login (if not already there)
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

// Retry configuration
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

function shouldRetry(config: AxiosRequestConfig): boolean {
  const retryCount = config.metadata?.retryCount || 0
  return retryCount < MAX_RETRIES && config.method?.toLowerCase() === 'get'
}

async function retryRequest(config: AxiosRequestConfig): Promise<any> {
  const retryCount = (config.metadata?.retryCount || 0) + 1
  const delay = RETRY_DELAY * retryCount

  console.log(`[API Retry] Attempt ${retryCount}/${MAX_RETRIES} after ${delay}ms`)

  await new Promise((resolve) => setTimeout(resolve, delay))

  config.metadata = {
    ...config.metadata,
    retryCount,
  }

  return apiClient.request(config)
}

// ============================================================================
// TYPED API METHODS
// ============================================================================

export const api = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig) => {
    return apiClient.get<ApiResponse<T>>(url, config).then((res) => res.data)
  },

  // POST request
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiClient.post<ApiResponse<T>>(url, data, config).then((res) => res.data)
  },

  // PUT request
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiClient.put<ApiResponse<T>>(url, data, config).then((res) => res.data)
  },

  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiClient.patch<ApiResponse<T>>(url, data, config).then((res) => res.data)
  },

  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => {
    return apiClient.delete<ApiResponse<T>>(url, config).then((res) => res.data)
  },
}

// ============================================================================
// AXIOS CONFIG TYPE AUGMENTATION
// ============================================================================

declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: {
      startTime?: number
      retryCount?: number
    }
  }
}

export default api
