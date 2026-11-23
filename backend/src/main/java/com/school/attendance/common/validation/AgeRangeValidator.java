package com.school.attendance.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.Period;

public class AgeRangeValidator implements ConstraintValidator<AgeRange, LocalDate> {

    private int min;
    private int max;

    @Override
    public void initialize(AgeRange constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(LocalDate dateOfBirth, ConstraintValidatorContext context) {
        // Null values are handled by @NotNull, so we return true here
        if (dateOfBirth == null) {
            return true;
        }

        // Calculate age
        LocalDate today = LocalDate.now();
        Period period = Period.between(dateOfBirth, today);
        int age = period.getYears();

        // Validate age is within range
        if (age < min || age > max) {
            // Customize the error message
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                String.format("Staff member must be between %d and %d years old (current age: %d)", min, max, age)
            ).addConstraintViolation();
            return false;
        }

        return true;
    }
}
