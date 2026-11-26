// ============================================================================
// CLASS ARM TYPES - Matches Backend Schema
// ============================================================================

export type SchoolSection = 'EARLY_YEARS' | 'PRIMARY' | 'JUNIOR_SECONDARY' | 'SENIOR_SECONDARY'

// ============================================================================
// ENUMS - These come from the backend
// ============================================================================

export type ClassName =
  // Early Years
  | 'CRECHE'
  | 'PRE_NURSERY'
  | 'NURSERY_1'
  | 'NURSERY_2'
  | 'RECEPTION'
  // Primary
  | 'PRIMARY_1'
  | 'PRIMARY_2'
  | 'PRIMARY_3'
  | 'PRIMARY_4'
  | 'PRIMARY_5'
  | 'PRIMARY_6'
  // Junior Secondary
  | 'JSS_1'
  | 'JSS_2'
  | 'JSS_3'
  // Senior Secondary
  | 'SSS_1'
  | 'SSS_2'
  | 'SSS_3'

export type ArmName =
  // Early Years
  | 'SUNSHINE'
  | 'RAINBOW'
  | 'STARS'
  | 'DOLPHINS'
  | 'BUTTERFLIES'
  | 'LITTLE_ANGELS'
  | 'BLUEBELL'
  | 'DAISY'
  | 'RUBY'
  // Primary & Secondary Gemstones
  | 'GOLD'
  | 'SILVER'
  | 'DIAMOND'
  | 'EMERALD'
  | 'SAPPHIRE'
  | 'PEARL'
  // Junior Secondary Specific
  | 'BRONZE'
  | 'TECH'
  | 'BUSINESS'
  | 'AGRIC'
  | 'BECE_ALPHA'
  | 'BECE_BETA'
  // Senior Secondary Specific
  | 'SCIENCE'
  | 'COMMERCIAL'
  | 'ARTS'
  | 'HUMANITIES'
  | 'SCIENCE_TECH'
  | 'ARTS_HUMANITIES'
  | 'WAEC_INTENSIVE'

// ============================================================================
// ENTITIES
// ============================================================================

export interface ClassArm {
  id: string
  tenantId: string
  schoolId: string

  schoolSection: SchoolSection
  schoolSectionDisplay: string

  className: ClassName
  classNameDisplay: string
  armName: ArmName
  armNameDisplay: string
  fullName: string // e.g., "JSS 1 Sunshine"

  capacity: number
  currentEnrollment: number
  availableCapacity: number
  isFull: boolean

  leadCaregiverId: string | null
  leadCaregiverName: string | null
  leadCaregiverEmail: string | null

  academicYearId: string | null
  academicYearDisplay: string | null

  isActive: boolean

  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdBy: string
  updatedBy: string | null
}

// ============================================================================
// DTOs (Data Transfer Objects)
// ============================================================================

export interface CreateClassArmRequest {
  schoolSection: SchoolSection
  className: ClassName
  armName: ArmName
  capacity: number
  leadCaregiverId?: string | null
  academicYearId?: string | null
  isActive?: boolean
}

export interface UpdateClassArmRequest {
  className?: ClassName
  armName?: ArmName
  capacity?: number
  leadCaregiverId?: string | null
  isActive?: boolean
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

// These types represent enum values with their display names
export interface ClassNameOption {
  value: ClassName
  displayName: string
}

export interface ArmNameOption {
  value: ArmName
  displayName: string
}

export interface EligibleStaff {
  id: string
  fullName: string
  email: string
  schoolSection: SchoolSection
  primaryRole: string
  primaryRoleDisplay: string
  employmentStatus: string
  accountActivatedAt: string
}
