package com.school.attendance.security;

import com.school.attendance.user.PlatformAdminDetailsService;
import com.school.attendance.user.repository.AppUserRepository;
import com.school.attendance.rbac.repository.PermissionRepository;
import com.school.attendance.rbac.repository.RolePermissionRepository;
import com.school.attendance.user.repository.AppUserSchoolRepository;
import com.school.attendance.user.repository.PlatformAdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // ✅ Inject repositories needed to build the UserDetailsService beans
    private final AppUserRepository appUserRepository;
    private final AppUserSchoolRepository appUserSchoolRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final PermissionRepository permissionRepository;
    private final PlatformAdminRepository platformAdminRepository;

    private final JwtService jwtService;
    private final RestAuthenticationEntryPoint authenticationEntryPoint;
    private final RestAccessDeniedHandler accessDeniedHandler;

    // ✅ 1. Build CustomUserDetailsService as a Bean
    @Bean
    public CustomUserDetailsService customUserDetailsService() {
        return new CustomUserDetailsService(
                appUserRepository,
                appUserSchoolRepository,
                rolePermissionRepository,
                permissionRepository
        );
    }

    // ✅ 2. Build PlatformAdminDetailsService as a Bean
    @Bean
    public PlatformAdminDetailsService platformAdminDetailsService() {
        return new PlatformAdminDetailsService(platformAdminRepository, permissionRepository);
    }

    // ✅ 3. Composite UserDetailsService — tries app_user first, then platform_admin
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            try {
                return customUserDetailsService().loadUserByUsername(username);
            } catch (UsernameNotFoundException e) {
                return platformAdminDetailsService().loadUserByUsername(username);
            }
        };
    }

    // ✅ 4. JWT Filter
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtService, userDetailsService());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/actuator/health",
                                "/error"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}