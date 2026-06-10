package com.school.attendance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the School Attendance System.
 *
 * This pilot application provides offline-first attendance tracking
 * with automatic conflict resolution and sync capabilities.
 */
@SpringBootApplication
public class AttendanceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AttendanceApplication.class, args);
    }
}
