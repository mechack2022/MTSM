-- ============================================================================
-- Migration: Simplify Staff Table and Add Next of Kin
-- ============================================================================
-- This migration:
-- 1. Removes fields not in UI form
-- 2. Consolidates emergency contact fields into JSONB next_of_kin
-- 3. Sets date_of_employment to be populated on account activation
-- ============================================================================

-- Drop columns not in UI form (keep data temporarily by not using CASCADE)
ALTER TABLE staff DROP COLUMN IF EXISTS subjects_taught;
ALTER TABLE staff DROP COLUMN IF EXISTS institution_attended;
ALTER TABLE staff DROP COLUMN IF EXISTS year_of_graduation;
ALTER TABLE staff DROP COLUMN IF EXISTS address;
ALTER TABLE staff DROP COLUMN IF EXISTS state_of_origin;
ALTER TABLE staff DROP COLUMN IF EXISTS local_government;
ALTER TABLE staff DROP COLUMN IF EXISTS contract_end_date;
ALTER TABLE staff DROP COLUMN IF EXISTS basic_salary;
ALTER TABLE staff DROP COLUMN IF EXISTS bank_name;
ALTER TABLE staff DROP COLUMN IF EXISTS account_number;
ALTER TABLE staff DROP COLUMN IF EXISTS account_name;
ALTER TABLE staff DROP COLUMN IF EXISTS is_form_tutor;
ALTER TABLE staff DROP COLUMN IF EXISTS assigned_class_id;
ALTER TABLE staff DROP COLUMN IF EXISTS assigned_class_name;
ALTER TABLE staff DROP COLUMN IF EXISTS bio;
ALTER TABLE staff DROP COLUMN IF EXISTS specialization;
ALTER TABLE staff DROP COLUMN IF EXISTS years_of_experience;
ALTER TABLE staff DROP COLUMN IF EXISTS profile_photo_url;

-- Add next_of_kin JSONB column to replace emergency contact fields
ALTER TABLE staff ADD COLUMN IF NOT EXISTS next_of_kin JSONB;

-- Migrate existing emergency contact data to next_of_kin JSONB
UPDATE staff
SET next_of_kin = jsonb_build_object(
    'name', emergency_contact_name,
    'phone', emergency_contact_phone,
    'relationship', emergency_contact_relationship
)
WHERE emergency_contact_name IS NOT NULL
   OR emergency_contact_phone IS NOT NULL
   OR emergency_contact_relationship IS NOT NULL;

-- Drop old emergency contact columns
ALTER TABLE staff DROP COLUMN IF EXISTS emergency_contact_name;
ALTER TABLE staff DROP COLUMN IF EXISTS emergency_contact_phone;
ALTER TABLE staff DROP COLUMN IF EXISTS emergency_contact_relationship;

-- Make date_of_employment nullable and set default to null
-- (Will be populated when account is activated)
ALTER TABLE staff ALTER COLUMN date_of_employment DROP NOT NULL;
ALTER TABLE staff ALTER COLUMN date_of_employment SET DEFAULT NULL;

-- Add comments
COMMENT ON COLUMN staff.next_of_kin IS 'JSONB containing next of kin details: {name, phone, relationship}';
COMMENT ON COLUMN staff.date_of_employment IS 'Date when staff account was activated (auto-populated on activation)';
COMMENT ON COLUMN staff.trcn_license_number IS 'Teachers Registration Council of Nigeria license number';
COMMENT ON COLUMN staff.trcn_verified IS 'Whether TRCN license has been verified';
