package com.school.attendance.security;


/**
 * Defines the audience claim value for JWT tokens.
 *
 * <p>The audience claim is the JWT-standard way to distinguish token types.
 * A token issued for one audience must NEVER be accepted for another,
 * even if the signature is valid — this prevents an offline token
 * (which carries a snapshot of permissions) from being used to authorize
 * server-side API calls, and vice versa.
 */
public enum TokenAudience {

    /**
     * Short-lived token for server-side API authorization.
     * Contains minimal claims; server performs fresh DB checks on every request.
     */
    ONLINE_API("online-api"),

    /**
     * Long-lived token for device-local enforcement when offline.
     * Contains a SNAPSHOT of assignedSchoolIds and permissionCodes at issue time.
     * The server does NOT trust these claims for authorization — they are
     * re-validated against the database at every sync.
     */
    OFFLINE_DEVICE("offline-device");

    private final String value;

    TokenAudience(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    /**
     * Resolves a TokenAudience from its string value.
     * Returns null if the value is unrecognized (caller should reject the token).
     */
    public static TokenAudience fromValue(String value) {
        if (value == null) return null;
        for (TokenAudience audience : values()) {
            if (audience.value.equals(value)) {
                return audience;
            }
        }
        return null;
    }
}
