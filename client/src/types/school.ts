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

export interface School {
  id: string
  tenantId: string
  name: string
  campusCode: string
  topology: Topology
  educationalLevel: string
  stateOfLocation?: string | null
  physicalAddress?: string | null
  schoolHeadName?: string | null
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
  schoolHeadName?: string | null
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
