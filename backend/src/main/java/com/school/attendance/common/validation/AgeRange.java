package com.school.attendance.common.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = AgeRangeValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface AgeRange {
    String message() default "Age must be between {min} and {max} years";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    int min() default 0;
    int max() default 150;
}
