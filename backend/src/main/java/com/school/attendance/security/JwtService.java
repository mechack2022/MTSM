package com.school.attendance.security;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.util.Date;
//import java.util.function.Function;
//
//@Service
//public class JwtService {
//
//    @Value("${spring.security.jwt.secret-key}")
//    private String secretKey;
//
//    @Value("${spring.security.jwt.expiration-time}")
//    private long jwtExpiration;
//
//    public String extractUsername(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    public String generateToken(UserDetails userDetails) {
//        return Jwts.builder()
//                .subject(userDetails.getUsername())
//                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
//                .signWith(getSignInKey())
//                .compact();
//    }
//
//    public boolean isTokenValid(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    private Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }
//
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .verifyWith(getSignInKey())
//                .build()
//                .parseSignedClaims(token)
//                .getPayload();
//    }
//
//
////    private SecretKey getSignInKey() {
////        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
////        return Keys.hmacShaKeyFor(keyBytes);
////    }
//        private SecretKey getSignInKey() {
//            byte[] keyBytes = secretKey.getBytes();
//            return Keys.hmacShaKeyFor(keyBytes);
//        }
//}


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
public class JwtService {

    @Value("${spring.security.jwt.secret-key}")
    private String secretKey;

    @Value("${spring.security.jwt.online-expiration-time:1800000}")      // 30 min default
    private long onlineExpiration;

    @Value("${spring.security.jwt.offline-expiration-time:1209600000}")  // 14 days default
    private long offlineExpiration;

    private SecretKey signInKey;

    @PostConstruct
    public void init() {
        this.signInKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateOnlineToken(CustomUserDetails userDetails) {
        return buildToken(userDetails, TokenAudience.ONLINE_API, onlineExpiration, null, null);
    }

    public String generateOfflineToken(CustomUserDetails userDetails, Set<UUID> assignedSchoolIds) {
        return buildToken(
                userDetails,
                TokenAudience.OFFLINE_DEVICE,
                offlineExpiration,
                assignedSchoolIds,
                userDetails.getPermissions()
        );
    }


    private String buildToken(CustomUserDetails userDetails,
                              TokenAudience audience,
                              long expirationMs,
                              Set<UUID> assignedSchoolIds,
                              Set<String> permissionCodes) {

        var builder = Jwts.builder()
                .subject(userDetails.getUsername())
                .audience().add(audience.getValue()).and()
                .claim(JwtClaims.USER_ID, userDetails.getUserId().toString())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(signInKey);

        // ✅ Only add tenantId if present (null for platform admins)
        if (userDetails.getTenantId() != null) {
            builder.claim(JwtClaims.TENANT_ID, userDetails.getTenantId().toString());
        }

        // ✅ Only add roleId if present (null for platform admins)
        if (userDetails.getRoleId() != null) {
            builder.claim(JwtClaims.ROLE_ID, userDetails.getRoleId().toString());
        }

        // ✅ Flag platform admins explicitly in the token
        if (userDetails.isPlatformAdmin()) {
            builder.claim("platformAdmin", true);
        }

        // Only OFFLINE tokens carry the snapshot claims
        if (audience == TokenAudience.OFFLINE_DEVICE) {
            if (assignedSchoolIds != null && !assignedSchoolIds.isEmpty()) {
                List<String> schoolIdStrings = assignedSchoolIds.stream()
                        .map(UUID::toString)
                        .collect(Collectors.toList());
                builder.claim(JwtClaims.ASSIGNED_SCHOOL_IDS, schoolIdStrings);
            }
            if (permissionCodes != null && !permissionCodes.isEmpty()) {
                builder.claim(JwtClaims.PERMISSION_CODES, permissionCodes);
            }
        }

        return builder.compact();
    }


    public boolean isTokenValid(String token, UserDetails userDetails, TokenAudience expectedAudience) {
        try {
            final String username = extractUsername(token);
            if (!username.equals(userDetails.getUsername())) {
                log.debug("Token subject mismatch: expected {}, got {}", userDetails.getUsername(), username);
                return false;
            }

            TokenAudience actualAudience = extractAudience(token);
            if (actualAudience != expectedAudience) {
                log.warn("Token audience mismatch: expected {}, got {}", expectedAudience, actualAudience);
                return false;
            }

            return !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("Token validation failed: {}", e.getMessage());
            return false;
        }
    }


    public boolean isTokenValid(String token, UserDetails userDetails) {
        return isTokenValid(token, userDetails, TokenAudience.ONLINE_API);
    }


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public TokenAudience extractAudience(String token) {
        try {
            Claims claims = extractAllClaims(token);
            // JJWT returns audience as a Set<String>; we expect exactly one
            Set<String> audiences = claims.getAudience();
            if (audiences == null || audiences.isEmpty()) {
                return null;
            }
            return TokenAudience.fromValue(audiences.iterator().next());
        } catch (JwtException e) {
            return null;
        }
    }

    public UUID extractUserId(String token) {
        String value = extractClaim(token, claims -> claims.get(JwtClaims.USER_ID, String.class));
        return value != null ? UUID.fromString(value) : null;
    }

    public UUID extractTenantId(String token) {
        String value = extractClaim(token, claims -> claims.get(JwtClaims.TENANT_ID, String.class));
        return value != null ? UUID.fromString(value) : null;
    }

    public UUID extractRoleId(String token) {
        String value = extractClaim(token, claims -> claims.get(JwtClaims.ROLE_ID, String.class));
        return value != null ? UUID.fromString(value) : null;
    }

    public Set<UUID> extractAssignedSchoolIds(String token) {
        try {
            List<String> values = extractClaim(token,
                    claims -> claims.get(JwtClaims.ASSIGNED_SCHOOL_IDS, List.class));
            if (values == null || values.isEmpty()) {
                return Set.of();
            }
            return values.stream()
                    .map(UUID::fromString)
                    .collect(Collectors.toUnmodifiableSet());
        } catch (Exception e) {
            log.debug("Failed to extract assignedSchoolIds: {}", e.getMessage());
            return Set.of();
        }
    }

    /**
     * Extracts the permissionCodes snapshot from an OFFLINE token.
     * Returns an empty set for ONLINE tokens (which don't carry this claim).
     */
    public Set<String> extractPermissionCodes(String token) {
        try {
            List<String> values = extractClaim(token,
                    claims -> claims.get(JwtClaims.PERMISSION_CODES, List.class));
            if (values == null || values.isEmpty()) {
                return Set.of();
            }
            return Set.copyOf(values);
        } catch (Exception e) {
            log.debug("Failed to extract permissionCodes: {}", e.getMessage());
            return Set.of();
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(signInKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}