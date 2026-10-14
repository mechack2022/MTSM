package com.school.attendance.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class AsyncConfig {
    // Enable async support for @Async annotated methods
    // Used for sending emails asynchronously without blocking the request thread
}
