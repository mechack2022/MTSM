package com.school.attendance.common.config;

import com.school.attendance.school.SchoolRepository;
import com.school.attendance.school.entity.School;
import com.school.attendance.user.entity.AppUser;
import com.school.attendance.user.enums.UserRole;
import com.school.attendance.user.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@Profile({"dev", "test"})
public class DataSeeder implements CommandLineRunner {

    private final AppUserRepository userRepository;
    private final SchoolRepository schoolRepository;
    private final PasswordEncoder passwordEncoder;

    @org.springframework.beans.factory.annotation.Value("${app.seed.enabled}")
    private boolean isSeedingEnabled;

    @Value("${app.seed.admin-password}")
    private String defaultAdminPassword;

    @Override
    public void run(String... args) {
        if (!isSeedingEnabled) {
            log.info("🚫 Database seeding is disabled via configuration.");
            return;
        }

        log.info("🌱 Starting database seeding...");
        seedDefaultSchool();
        seedAdminUser();
        log.info("✅ Database seeding completed successfully.");
    }

    private void seedDefaultSchool() {
        String schoolCode = "PILOT-SCHOOL-01";

        if (!schoolRepository.existsByCode(schoolCode)) {
            School school = School.builder()
                    .name("Pilot High School")
                    .code(schoolCode)
                    .address("123 Education Lane, Pilot City")
                    .build();

            schoolRepository.save(school);
            log.info("✅ Seeded default school: {}", schoolCode);
        } else {
            log.info("ℹ️ School already exists, skipping seed.");
        }
    }

    private void seedAdminUser() {
        String adminUsername = "admin";
        if (!userRepository.existsByUsername(adminUsername)) {
            School school = schoolRepository.findAll().stream()
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("No school found to assign to Admin. Check DataSeeder."));
            AppUser admin = AppUser.builder()
                    .username(adminUsername)
                    .passwordHash(passwordEncoder.encode(defaultAdminPassword))
                    .fullName("System Administrator")
                    .role(UserRole.ADMIN)
                    .schoolId(school.getId())
                    .isActive(true)
                    .build();

            userRepository.save(admin);

            // Log credentials clearly for the developer
            log.info("==================================================");
            log.info(" ADMIN USER SEEDED SUCCESSFULLY");
            log.info("👤 Username: {}", adminUsername);
            log.info(" Login URL: http://localhost:8080/api/v1/auth/login");
            log.info("==================================================");
        }
    }
}
