// ============================================================================
// NIGERIAN PHONE NUMBER VALIDATION
// ============================================================================

/**
 * Validates Nigerian phone numbers
 *
 * Accepted formats:
 * - 0XXXXXXXXXX (11 digits starting with 0)
 * - +234XXXXXXXXXX (13 characters with country code)
 * - 234XXXXXXXXXX (12 digits with country code)
 *
 * Valid prefixes: 070, 080, 081, 090, 091, 070X, 080X, 081X, 090X, 091X
 */

const NIGERIAN_PHONE_REGEX = /^(\+?234|0)[7-9][0-1]\d{8}$/

export function isValidNigerianPhoneNumber(phone: string | null | undefined): boolean {
  if (!phone) return false

  // Remove all whitespace and dashes
  const cleaned = phone.replace(/[\s-]/g, '')

  return NIGERIAN_PHONE_REGEX.test(cleaned)
}

/**
 * Formats a Nigerian phone number to standard format (+234XXXXXXXXXX)
 */
export function formatNigerianPhoneNumber(phone: string | null | undefined): string | null {
  if (!phone) return null

  // Remove all whitespace and dashes
  const cleaned = phone.replace(/[\s-]/g, '')

  // If it starts with 0, replace with +234
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return '+234' + cleaned.substring(1)
  }

  // If it starts with 234, add +
  if (cleaned.startsWith('234') && cleaned.length === 13) {
    return '+' + cleaned
  }

  // If it already has +234, return as is
  if (cleaned.startsWith('+234') && cleaned.length === 14) {
    return cleaned
  }

  return null
}

/**
 * Get validation error message for phone number
 */
export function getPhoneValidationError(phone: string | null | undefined): string | null {
  if (!phone || phone.trim() === '') {
    return null // Empty is okay if field is optional
  }

  const cleaned = phone.replace(/[\s-]/g, '')

  if (cleaned.length < 11) {
    return 'Phone number is too short'
  }

  if (cleaned.length > 14) {
    return 'Phone number is too long'
  }

  if (!isValidNigerianPhoneNumber(phone)) {
    return 'Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)'
  }

  return null
}

/**
 * Phone input handler that auto-formats as user types
 */
export function handlePhoneInput(value: string): string {
  // Remove non-digit characters except + at the start
  let cleaned = value.replace(/[^\d+]/g, '')

  // Ensure + only at start
  if (cleaned.includes('+')) {
    const plusCount = (cleaned.match(/\+/g) || []).length
    if (plusCount > 1 || cleaned.indexOf('+') !== 0) {
      cleaned = cleaned.replace(/\+/g, '')
    }
  }

  // Limit length
  if (cleaned.startsWith('+234')) {
    return cleaned.substring(0, 14) // +234XXXXXXXXXX
  } else if (cleaned.startsWith('234')) {
    return cleaned.substring(0, 13) // 234XXXXXXXXXX
  } else if (cleaned.startsWith('0')) {
    return cleaned.substring(0, 11) // 0XXXXXXXXXX
  }

  return cleaned.substring(0, 14) // Max length
}
