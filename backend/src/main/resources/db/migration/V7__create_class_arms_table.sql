-- ============================================================================
-- Migration: Create Class Arms Table
-- ============================================================================
-- This migration creates the class_arms table for managing class arms
-- (e.g., "Crèche Sunshine", "Year 1 Emerald") with the following features:
-- 1. Multi-tenancy support (tenant_id, school_id)
-- 2. School section categorization (EARLY_YEARS, PRIMARY, JUNIOR_SECONDARY, SENIOR_SECONDARY)
-- 3. Class name and arm name separation (e.g., "Crèche" + "Sunshine")
-- 4. Capacity management (max 30 students, tracks current enrollment)
-- 5. Lead caregiver assignment (FK to staff table)
-- 6. Academic year tracking
-- 7. Soft delete support
-- 8. Audit fields (created_at, updated_at, created_by, updated_by)
-- ============================================================================

CREATE TABLE IF NOT EXISTS class_arms (
    -- Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Multi-tenancy
    tenant_id UUID NOT NULL,
    school_id UUID NOT NULL,

    -- School Section (EARLY_YEARS, PRIMARY, JUNIOR_SECONDARY, SENIOR_SECONDARY)
    school_section VARCHAR(50) NOT NULL,

    -- Class identification
    class_name VARCHAR(100) NOT NULL,  -- e.g., "Crèche", "Year 1", "JSS 1"
    arm_name VARCHAR(100) NOT NULL,    -- e.g., "Sunshine", "Emerald", "Rainbow"
    full_name VARCHAR(200) NOT NULL,   -- Auto-computed: "Crèche Sunshine"

    -- Capacity management
    capacity INTEGER NOT NULL CHECK (capacity >= 1 AND capacity <= 30),
    current_enrollment INTEGER NOT NULL DEFAULT 0 CHECK (current_enrollment >= 0),

    -- Lead caregiver/tutor assignment (FK to staff table)
    lead_caregiver_id UUID,

    -- Academic year tracking
    academic_year_id UUID,

    -- Status
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    created_by UUID NOT NULL,
    updated_by UUID,

    -- Constraints
    CONSTRAINT chk_enrollment_capacity CHECK (current_enrollment <= capacity)
    -- Note: Unique constraint for non-null academic_year_id is defined below as a partial index
    -- because PostgreSQL NULL != NULL in unique constraints
);

-- ============================================================================
-- Indexes for Performance and Uniqueness
-- ============================================================================

-- Unique constraint: Prevent duplicate class arms within same school and academic year
-- For records WITH academic_year_id
CREATE UNIQUE INDEX uk_class_arm_school_year_not_null
    ON class_arms(school_id, academic_year_id, class_name, arm_name)
    WHERE deleted_at IS NULL AND academic_year_id IS NOT NULL;

-- Unique constraint: Prevent duplicate class arms within same school when no academic year
-- For records WITHOUT academic_year_id (NULL academic_year_id)
CREATE UNIQUE INDEX uk_class_arm_school_no_year
    ON class_arms(school_id, class_name, arm_name)
    WHERE deleted_at IS NULL AND academic_year_id IS NULL;

-- Index for school-based queries (most common)
CREATE INDEX idx_class_arm_school_id ON class_arms(school_id) WHERE deleted_at IS NULL;

-- Index for section-based filtering
CREATE INDEX idx_class_arm_section ON class_arms(school_section) WHERE deleted_at IS NULL;

-- Index for academic year queries
CREATE INDEX idx_class_arm_academic_year ON class_arms(academic_year_id) WHERE deleted_at IS NULL;

-- Index for lead caregiver queries (find classes assigned to a staff member)
CREATE INDEX idx_class_arm_lead_caregiver ON class_arms(lead_caregiver_id) WHERE deleted_at IS NULL;

-- Index for active class arms
CREATE INDEX idx_class_arm_active ON class_arms(is_active) WHERE deleted_at IS NULL;

-- Composite index for common query patterns (school + section)
CREATE INDEX idx_class_arm_school_section ON class_arms(school_id, school_section) WHERE deleted_at IS NULL;

-- Index for soft delete queries
CREATE INDEX idx_class_arm_deleted_at ON class_arms(deleted_at);

-- Index for full text search on class and arm names
CREATE INDEX idx_class_arm_names ON class_arms(class_name, arm_name, full_name) WHERE deleted_at IS NULL;

-- ============================================================================
-- Comments for Documentation
-- ============================================================================

COMMENT ON TABLE class_arms IS 'Stores class arms (e.g., Crèche Sunshine, Year 1 Emerald) for schools';

COMMENT ON COLUMN class_arms.id IS 'Primary key (UUID)';
COMMENT ON COLUMN class_arms.tenant_id IS 'Reference to tenant (multi-tenancy)';
COMMENT ON COLUMN class_arms.school_id IS 'Reference to school';
COMMENT ON COLUMN class_arms.school_section IS 'School section: EARLY_YEARS, PRIMARY, JUNIOR_SECONDARY, SENIOR_SECONDARY';
COMMENT ON COLUMN class_arms.class_name IS 'Class name (e.g., Crèche, Year 1, JSS 1, SS 3)';
COMMENT ON COLUMN class_arms.arm_name IS 'Arm name (e.g., Sunshine, Emerald, Rainbow)';
COMMENT ON COLUMN class_arms.full_name IS 'Full display name (e.g., Crèche Sunshine) - auto-computed';
COMMENT ON COLUMN class_arms.capacity IS 'Maximum number of students (1-30)';
COMMENT ON COLUMN class_arms.current_enrollment IS 'Current number of enrolled students';
COMMENT ON COLUMN class_arms.lead_caregiver_id IS 'Staff member assigned as lead caregiver/tutor (FK to staff table)';
COMMENT ON COLUMN class_arms.academic_year_id IS 'Reference to academic year';
COMMENT ON COLUMN class_arms.is_active IS 'Whether this class arm is currently active';
COMMENT ON COLUMN class_arms.created_at IS 'Timestamp when record was created';
COMMENT ON COLUMN class_arms.updated_at IS 'Timestamp when record was last updated';
COMMENT ON COLUMN class_arms.deleted_at IS 'Soft delete timestamp (NULL = not deleted)';
COMMENT ON COLUMN class_arms.created_by IS 'User ID who created this record';
COMMENT ON COLUMN class_arms.updated_by IS 'User ID who last updated this record';

-- ============================================================================
-- Trigger for automatic updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION update_class_arms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_class_arms_updated_at
    BEFORE UPDATE ON class_arms
    FOR EACH ROW
    EXECUTE FUNCTION update_class_arms_updated_at();
