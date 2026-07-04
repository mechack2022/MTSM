package com.school.attendance.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI attendanceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("School Attendance API")
                        .description("Offline-first attendance tracking system")
                        .version("0.1.0"));
    }
}
