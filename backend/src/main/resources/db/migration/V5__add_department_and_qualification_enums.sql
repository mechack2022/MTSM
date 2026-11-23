-- ============================================================================
-- Migration: Add Department and HighestQualification Enum Constraints
-- ============================================================================
-- This migration:
-- 1. Updates existing data to match new enum values
-- 2. Adds CHECK constraints to enforce valid enum values
-- ============================================================================

-- Step 1: Update existing department data to match enum constants
-- Convert any old format to new enum format
UPDATE staff
SET department = CASE department
    WHEN 'Sciences & STEM' THEN 'SCIENCES_AND_STEM'
    WHEN 'Humanities & Languages' THEN 'HUMANITIES_AND_LANGUAGES'
    WHEN 'Primary Homeroom' THEN 'PRIMARY_HOMEROOM'
    WHEN 'EYFS & Crèche' THEN 'EYFS_AND_CRECHE'
    WHEN 'Administration & Operations' THEN 'ADMINISTRATION_AND_OPERATIONS'
    -- If already in enum format, keep it
    WHEN 'SCIENCES_AND_STEM' THEN 'SCIENCES_AND_STEM'
    WHEN 'HUMANITIES_AND_LANGUAGES' THEN 'HUMANITIES_AND_LANGUAGES'
    WHEN 'PRIMARY_HOMEROOM' THEN 'PRIMARY_HOMEROOM'
    WHEN 'EYFS_AND_CRECHE' THEN 'EYFS_AND_CRECHE'
    WHEN 'ADMINISTRATION_AND_OPERATIONS' THEN 'ADMINISTRATION_AND_OPERATIONS'
    -- Default to NULL for unknown values
    ELSE NULL
END
WHERE department IS NOT NULL;

-- Step 2: Update existing highest_qualification data to match enum constants
UPDATE staff
SET highest_qualification = CASE highest_qualification
    -- Old format to new enum format
    WHEN 'NCE' THEN 'NCE'
    WHEN 'B.Ed' THEN 'B_ED'
    WHEN 'B.Sc' THEN 'B_SC_PGDE'
    WHEN 'M.Ed' THEN 'M_ED_M_SC'
    WHEN 'PGDE' THEN 'PGDE'
    WHEN 'Nursing' THEN 'REGISTERED_NURSE'
    WHEN 'SSCE-OND' THEN 'OND_HND_GENERAL'
    -- Full descriptions to enum format
    WHEN 'NCE (National Certificate in Education)' THEN 'NCE'
    WHEN 'B.Ed (Bachelor of Education)' THEN 'B_ED'
    WHEN 'B.Sc / B.A + PGDE' THEN 'B_SC_PGDE'
    WHEN 'M.Ed / M.Sc' THEN 'M_ED_M_SC'
    WHEN 'Registered Nurse (RN / RM)' THEN 'REGISTERED_NURSE'
    WHEN 'OND / HND / General' THEN 'OND_HND_GENERAL'
    -- If already in enum format, keep it
    WHEN 'B_ED' THEN 'B_ED'
    WHEN 'B_SC_PGDE' THEN 'B_SC_PGDE'
    WHEN 'M_ED_M_SC' THEN 'M_ED_M_SC'
    WHEN 'REGISTERED_NURSE' THEN 'REGISTERED_NURSE'
    WHEN 'OND_HND_GENERAL' THEN 'OND_HND_GENERAL'
    -- Default to NULL for unknown values
    ELSE NULL
END
WHERE highest_qualification IS NOT NULL;

-- Step 3: Add CHECK constraint for department enum values
ALTER TABLE staff
ADD CONSTRAINT chk_staff_department
CHECK (department IS NULL OR department IN (
    'SCIENCES_AND_STEM',
    'HUMANITIES_AND_LANGUAGES',
    'PRIMARY_HOMEROOM',
    'EYFS_AND_CRECHE',
    'ADMINISTRATION_AND_OPERATIONS'
));

-- Step 4: Add CHECK constraint for highest_qualification enum values
ALTER TABLE staff
ADD CONSTRAINT chk_staff_highest_qualification
CHECK (highest_qualification IS NULL OR highest_qualification IN (
    'NCE',
    'B_ED',
    'B_SC_PGDE',
    'M_ED_M_SC',
    'PGDE',
    'REGISTERED_NURSE',
    'OND_HND_GENERAL'
));

-- Step 5: Add comments for documentation
COMMENT ON COLUMN staff.department IS 'Department enum: SCIENCES_AND_STEM, HUMANITIES_AND_LANGUAGES, PRIMARY_HOMEROOM, EYFS_AND_CRECHE, ADMINISTRATION_AND_OPERATIONS';
COMMENT ON COLUMN staff.highest_qualification IS 'Qualification enum: NCE, B_ED, B_SC_PGDE, M_ED_M_SC, PGDE, REGISTERED_NURSE, OND_HND_GENERAL';
