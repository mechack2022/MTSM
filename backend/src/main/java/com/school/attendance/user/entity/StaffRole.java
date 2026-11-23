package com.school.attendance.user.entity;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum StaffRole {

    PRINCIPAL("Principal", "School Head / Principal", "ADMINISTRATIVE", List.of("ALL")),
    VICE_PRINCIPAL("Vice Principal", "Vice Principal / Deputy Head", "ADMINISTRATIVE", List.of("ALL")),
    HEAD_TEACHER("Head Teacher", "Head Teacher", "ADMINISTRATIVE", List.of("PRIMARY", "JUNIOR_SECONDARY")),

    REGISTRAR("Registrar", "School Registrar", "ADMINISTRATIVE", List.of("ALL")),
    BURSAR("Bursar", "School Bursar / Finance Officer", "ADMINISTRATIVE", List.of("ALL")),

    HEAD_OF_DEPARTMENT("Head of Department", "Head of Department (HOD)", "LEADERSHIP", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    SUBJECT_COORDINATOR("Subject Coordinator", "Subject Coordinator", "LEADERSHIP", List.of("PRIMARY", "JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    LEVEL_COORDINATOR("Level Coordinator", "Level Coordinator", "LEADERSHIP", List.of("ALL")),

    EARLY_YEARS_CAREGIVER("Early Years Caregiver", "Crèche / Pre-Nursery Caregiver", "EARLY_YEARS", List.of("EARLY_YEARS")),
    MONTESSORI_LEAD("Montessori Lead", "TRCN Certified Montessori Lead", "EARLY_YEARS", List.of("EARLY_YEARS")),
    EARLY_CHILDHOOD_EDUCATOR("Early Childhood Educator", "Early Childhood Educator", "EARLY_YEARS", List.of("EARLY_YEARS")),
    NURSERY_TEACHER("Nursery Teacher", "Nursery / Kindergarten Teacher", "EARLY_YEARS", List.of("EARLY_YEARS")),

    PRIMARY_EDUCATOR("Primary Educator", "TRCN Verified Primary Educator", "PRIMARY", List.of("PRIMARY")),
    PRIMARY_CORE_SPECIALIST("Primary Core Specialist", "Primary Core Subject Specialist", "PRIMARY", List.of("PRIMARY")),
    PRIMARY_STEM_INSTRUCTOR("Primary STEM Instructor", "Junior STEM Instructor", "PRIMARY", List.of("PRIMARY")),
    UBE_CERTIFIED_TEACHER("UBE Certified Teacher", "UBE Certified Teacher", "PRIMARY", List.of("PRIMARY")),
    PRIMARY_LITERACY_SPECIALIST("Primary Literacy Specialist", "Accelerated Literacy Specialist", "PRIMARY", List.of("PRIMARY")),

    JUNIOR_SECONDARY_EDUCATOR("Junior Secondary Educator", "TRCN Junior Secondary Educator", "JUNIOR_SECONDARY", List.of("JUNIOR_SECONDARY")),
    BASIC_SCIENCE_TEACHER("Basic Science Teacher", "Basic Science Specialist", "JUNIOR_SECONDARY", List.of("JUNIOR_SECONDARY")),
    CREATIVE_ARTS_INSTRUCTOR("Creative Arts Instructor", "Creative Arts & CCA Instructor", "JUNIOR_SECONDARY", List.of("JUNIOR_SECONDARY")),
    PRE_VOCATIONAL_TECH_LEAD("Pre-Vocational Tech Lead", "Pre-Vocational Technology Lead", "JUNIOR_SECONDARY", List.of("JUNIOR_SECONDARY")),
    FRENCH_TEACHER("French Teacher", "French Language Teacher", "JUNIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    BUSINESS_STUDIES_TEACHER("Business Studies Teacher", "Business Studies Teacher", "JUNIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    AGRICULTURAL_SCIENCE_TEACHER("Agricultural Science Teacher", "Agricultural Science Specialist", "JUNIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    BECE_COORDINATOR("BECE Coordinator", "BECE Exam Coordinator & Lead Tutor", "JUNIOR_SECONDARY", List.of("JUNIOR_SECONDARY")),

    MATHEMATICS_TEACHER("Mathematics Teacher", "Mathematics Teacher", "SENIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    PHYSICS_TEACHER("Physics Teacher", "Physics Teacher", "SENIOR_SECONDARY", List.of("SENIOR_SECONDARY")),
    CHEMISTRY_TEACHER("Chemistry Teacher", "Chemistry Teacher", "SENIOR_SECONDARY", List.of("SENIOR_SECONDARY")),
    BIOLOGY_TEACHER("Biology Teacher", "Biology Teacher", "SENIOR_SECONDARY", List.of("SENIOR_SECONDARY")),
    ENGLISH_TEACHER("English Teacher", "English Language Teacher", "SENIOR_SECONDARY", List.of("PRIMARY", "JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    LITERATURE_TEACHER("Literature Teacher", "Literature in English Teacher", "SENIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    ECONOMICS_TEACHER("Economics Teacher", "Economics Teacher", "SENIOR_SECONDARY", List.of("SENIOR_SECONDARY")),
    COMMERCE_TEACHER("Commerce Teacher", "Commerce Teacher", "SENIOR_SECONDARY", List.of("SENIOR_SECONDARY")),
    ACCOUNTING_TEACHER("Accounting Teacher", "Financial Accounting Teacher", "SENIOR_SECONDARY", List.of("SENIOR_SECONDARY")),
    GOVERNMENT_TEACHER("Government Teacher", "Government / Civic Education Teacher", "SENIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    GEOGRAPHY_TEACHER("Geography Teacher", "Geography Teacher", "SENIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    HISTORY_TEACHER("History Teacher", "History Teacher", "SENIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    CRS_TEACHER("CRS Teacher", "Christian Religious Studies Teacher", "SENIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    IRS_TEACHER("IRS Teacher", "Islamic Religious Studies Teacher", "SENIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    COMPUTER_SCIENCE_TEACHER("Computer Science Teacher", "Computer Science / ICT Teacher", "SENIOR_SECONDARY", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    TECHNICAL_DRAWING_TEACHER("Technical Drawing Teacher", "Technical Drawing Teacher", "SENIOR_SECONDARY", List.of("SENIOR_SECONDARY")),

    FORM_TUTOR("Form Tutor", "Form Tutor / Class Teacher", "TEACHING", List.of("ALL")),
    SUBJECT_TEACHER("Subject Teacher", "Subject Teacher", "TEACHING", List.of("ALL")),

    COUNSELOR("Counselor", "School Counselor", "SUPPORT", List.of("ALL")),
    LIBRARIAN("Librarian", "School Librarian", "SUPPORT", List.of("ALL")),
    LAB_TECHNICIAN("Lab Technician", "Laboratory Technician", "SUPPORT", List.of("JUNIOR_SECONDARY", "SENIOR_SECONDARY")),
    ICT_COORDINATOR("ICT Coordinator", "ICT / Technology Coordinator", "SUPPORT", List.of("ALL")),
    SPORTS_COORDINATOR("Sports Coordinator", "Sports & Physical Education Coordinator", "SUPPORT", List.of("ALL")),

    EXAMINATION_OFFICER("Examination Officer", "Examination Officer", "ADMINISTRATIVE", List.of("ALL")),
    TIMETABLE_OFFICER("Timetable Officer", "Timetable Officer", "ADMINISTRATIVE", List.of("ALL")),

    ADMIN_STAFF("Administrative Staff", "Administrative Staff", "SUPPORT", List.of("ALL")),
    SECURITY_STAFF("Security Staff", "Security Personnel", "SUPPORT", List.of("ALL")),
    MAINTENANCE_STAFF("Maintenance Staff", "Maintenance / Facility Staff", "SUPPORT", List.of("ALL"));

    private final String code;
    private final String displayName;
    private final String category;
    private final List<String> applicableTiers;

    StaffRole(String code, String displayName, String category, List<String> applicableTiers) {
        this.code = code;
        this.displayName = displayName;
        this.category = category;
        this.applicableTiers = applicableTiers;
    }

    public String getCode() {
        return code;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getCategory() {
        return category;
    }

    public List<String> getApplicableTiers() {
        return applicableTiers;
    }

    public boolean isApplicableForTier(String tier) {
        return applicableTiers.contains("ALL") || applicableTiers.contains(tier);
    }

    public boolean isTeachingRole() {
        return category.equals("EARLY_YEARS")
            || category.equals("PRIMARY")
            || category.equals("JUNIOR_SECONDARY")
            || category.equals("SENIOR_SECONDARY")
            || category.equals("TEACHING");
    }

    public boolean isAdministrativeRole() {
        return category.equals("ADMINISTRATIVE");
    }

    public boolean isLeadershipRole() {
        return category.equals("LEADERSHIP");
    }

    public boolean isSupportRole() {
        return category.equals("SUPPORT");
    }

    public static List<StaffRole> getRolesForTier(String tier) {
        return Arrays.stream(StaffRole.values())
                .filter(role -> role.isApplicableForTier(tier))
                .collect(Collectors.toList());
    }

    public static List<StaffRole> getRolesForEarlyYears() {
        return getRolesForTier("EARLY_YEARS");
    }

    public static List<StaffRole> getRolesForPrimary() {
        return getRolesForTier("PRIMARY");
    }

    public static List<StaffRole> getRolesForJuniorSecondary() {
        return getRolesForTier("JUNIOR_SECONDARY");
    }

    public static List<StaffRole> getRolesForSeniorSecondary() {
        return getRolesForTier("SENIOR_SECONDARY");
    }
}
