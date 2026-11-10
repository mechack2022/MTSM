package com.school.attendance.common.util;

import java.util.regex.Pattern;

/**
 * Utility class for validating Nigerian phone numbers
 */
public class PhoneNumberValidator {

    /**
     * Nigerian phone number pattern
     * Accepts:
     * - 0XXXXXXXXXX (11 digits starting with 0)
     * - +234XXXXXXXXXX (13 characters with country code)
     * - 234XXXXXXXXXX (12 digits with country code)
     *
     * Valid prefixes: 070, 080, 081, 090, 091, etc.
     */
    private static final Pattern NIGERIAN_PHONE_PATTERN =
            Pattern.compile("^(\\+?234|0)[7-9][0-1]\\d{8}$");

    private PhoneNumberValidator() {
        // Private constructor to prevent instantiation
    }

    /**
     * Validates if a phone number is a valid Nigerian phone number
     *
     * @param phone the phone number to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidNigerianPhoneNumber(String phone) {
        if (phone == null || phone.isBlank()) {
            return false;
        }

        // Remove all whitespace and dashes
        String cleaned = phone.replaceAll("[\\s-]", "");

        return NIGERIAN_PHONE_PATTERN.matcher(cleaned).matches();
    }

    /**
     * Formats a Nigerian phone number to standard format (+234XXXXXXXXXX)
     *
     * @param phone the phone number to format
     * @return formatted phone number or null if invalid
     */
    public static String formatNigerianPhoneNumber(String phone) {
        if (phone == null || phone.isBlank()) {
            return null;
        }

        // Remove all whitespace and dashes
        String cleaned = phone.replaceAll("[\\s-]", "");

        // If it starts with 0, replace with +234
        if (cleaned.startsWith("0") && cleaned.length() == 11) {
            return "+234" + cleaned.substring(1);
        }

        // If it starts with 234, add +
        if (cleaned.startsWith("234") && cleaned.length() == 13) {
            return "+" + cleaned;
        }

        // If it already has +234, return as is
        if (cleaned.startsWith("+234") && cleaned.length() == 14) {
            return cleaned;
        }

        return null;
    }

    /**
     * Validates and formats a phone number
     *
     * @param phone the phone number to validate and format
     * @return formatted phone number
     * @throws IllegalArgumentException if phone number is invalid
     */
    public static String validateAndFormat(String phone) {
        if (phone == null || phone.isBlank()) {
            throw new IllegalArgumentException("Phone number cannot be empty");
        }

        if (!isValidNigerianPhoneNumber(phone)) {
            throw new IllegalArgumentException(
                    "Invalid Nigerian phone number. Expected format: 08012345678 or +2348012345678"
            );
        }

        return formatNigerianPhoneNumber(phone);
    }
}
