// ============================================================================
// SCHOOL TYPES - Matches Backend Schema
// ============================================================================

export enum Topology {
  COMPOSITE = 'COMPOSITE',
  STANDALONE = 'STANDALONE',
  SATELLITE = 'SATELLITE',
}

export enum SchoolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum EducationalTier {
  EARLY_YEARS = 'EARLY_YEARS',
  PRIMARY = 'PRIMARY',
  JUNIOR_SECONDARY = 'JUNIOR_SECONDARY',
  SENIOR_SECONDARY = 'SENIOR_SECONDARY',
}

export interface School {
  id: string
  tenantId: string
  name: string
  campusCode: string
  topology: Topology
  educationalTiers: EducationalTier[]
  stateId?: string | null
  stateName?: string | null
  localGovernmentId?: string | null
  localGovernmentName?: string | null
  physicalAddress?: string | null
  schoolHeadUserId?: string | null
  schoolHeadName?: string | null // Combined full name returned by backend
  schoolHeadEmail?: string | null
  schoolHeadPhone?: string | null
  seatCapacity: number
  currentStudents: number
  currentTeachers: number
  status: SchoolStatus
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

export interface CreateSchoolRequest {
  name: string
  campusCode?: string | null // Optional - auto-generated if not provided
  topology: Topology
  educationalLevel: string
  stateOfLocation?: string | null
  physicalAddress?: string | null
  schoolHeadFirstName?: string | null
  schoolHeadLastName?: string | null
  schoolHeadEmail?: string | null
  schoolHeadPhone?: string | null
  seatCapacity: number
}

export interface UpdateSchoolRequest {
  name?: string
  topology?: Topology
  educationalLevel?: string
  stateOfLocation?: string | null
  physicalAddress?: string | null
  schoolHeadName?: string | null
  schoolHeadEmail?: string | null
  schoolHeadPhone?: string | null
  seatCapacity?: number
  status?: SchoolStatus
}

export interface SchoolStats {
  activeSchoolCount: number
  totalStudents: number
  totalTeachers: number
}
