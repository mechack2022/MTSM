// ============================================================================
// CORE API TYPES - Matches Backend Schema
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean
  statusCode: number
  message: string
  data?: T
  error?: ApiError
  path: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

// ============================================================================
// ENTITIES
// ============================================================================

export interface Tenant {
  id: string
  name: string
  code: string
  contactEmail: string | null
  contactPhone: string | null
  isActive: boolean
  createdAt: string
  createdBy: string | null
  updatedAt: string
  updatedBy: string | null
}

export interface CreateTenantRequest {
  name: string
  contactEmail?: string | null
  contactPhone?: string | null
}

export interface UpdateTenantRequest {
  name: string
  contactEmail?: string | null
  contactPhone?: string | null
}

export interface School {
  id: string
  tenantId: string
  name: string
  code: string
  address: string | null
  phone: string | null
  email: string | null
  logoUrl: string | null
  academicYearId: string | null
  academicYearDisplayName?: string | null
  currentTermId: string | null
  currentTermDisplayName?: string | null
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null
}

export interface CreateSchoolRequest {
  name: string
  code: string
  address?: string | null
  phone?: string | null
  email?: string | null
  logoUrl?: string | null
}

export interface UpdateSchoolRequest {
  name?: string
  academicYearId?: string | null
  currentTermId?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  logoUrl?: string | null
}

export interface User {
  id: string
  tenantId: string
  username: string
  fullName: string
  roleId: string
  roleName?: string
  accessScope?: 'SYSTEM' | 'TENANT' | 'ASSIGNED_SCHOOLS' | 'OWN'
  assignedSchools?: School[]
  assignedSchoolIds?: string[]
  isActive: boolean
  isPlatformAdmin?: boolean
  createdAt: string
  updatedAt: string
}

export interface CodeSet {
  id: string
  codeSetGroup: string
  code: string
  displayName: string
  description: string | null
  attributes: Record<string, any> | null
  sortOrder: number
  isActive: boolean
  createdAt: string
  createdBy: string | null
}

export type CodeSetGroup =
  | 'GRADE_LEVEL'
  | 'ATTENDANCE_STATUS'
  | 'ABSENCE_REASON'
  | 'ACADEMIC_YEAR'
  | 'ACADEMIC_TERM'
  | 'GENDER'
  | 'RELIGION'
  | 'NATIONALITY'
  | 'BLOOD_GROUP'
  | 'STUDENT_NUMBER_PATTERN'

export interface Learner {
  id: string
  tenantId: string
  schoolId: string
  firstName: string
  lastName: string
  learnerNumber: string
  gradeLevelId: string
  dateOfBirth: string | null
  sex: 'MALE' | 'FEMALE' | 'OTHER' | null
  previousSchoolName: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
}

export interface ClassSection {
  id: string
  tenantId: string
  schoolId: string
  name: string
  gradeLevelId: string
  academicYearId: string
  classTeacherId: string | null
  capacity: number | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Enrollment {
  id: string
  tenantId: string
  schoolId: string
  learnerId: string
  learnerName?: string
  studentNumber?: string
  classSectionId: string
  className?: string
  academicYearId: string
  academicYearDisplayName?: string
  enrollmentDate: string
  withdrawalDate: string | null
  status: EnrollmentStatus
  enrollmentType: EnrollmentType
  previousSchoolName: string | null
  createdAt: string
  createdBy: string | null
  updatedAt: string
  updatedBy: string | null
}

export type EnrollmentStatus = 'ACTIVE' | 'WITHDRAWN' | 'COMPLETED'
export type EnrollmentType = 'NEW' | 'TRANSFER_IN' | 'RETURNING'

export interface Attendance {
  id: string
  schoolId: string
  learnerId: string
  learnerName?: string
  classSectionId: string
  className?: string
  attendanceDate: string
  attendanceStatusId: string
  attendanceStatus?: string
  absenceReasonId: string | null
  absenceReason?: string | null
  notes: string | null
  recordedBy: string | null
  recordedByName?: string | null
  recordedAt: string
  serverReceivedAt: string
  changeId: string
  syncStatus: SyncStatus
  sourceDeviceId: string | null
  createdAt: string
  updatedAt: string
}

export type SyncStatus = 'PENDING' | 'SYNCED' | 'CONFLICT' | 'FAILED'

export interface Device {
  id: string
  appUserId: string
  deviceLabel: string | null
  appVersion: string | null
  lastSyncAt: string | null
  isActive: boolean
  createdAt: string
}

// ============================================================================
// DTOs (Data Transfer Objects)
// ============================================================================

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  userId: string
  username: string
  role: string
}

export interface CreateLearnerRequest {
  schoolId: string
  firstName: string
  lastName: string
  learnerNumber?: string | null
  gradeLevelId: string
  dateOfBirth?: string | null
  sex?: 'MALE' | 'FEMALE' | 'OTHER' | null
  previousSchoolName?: string | null
}

export interface UpdateLearnerRequest {
  firstName: string
  lastName: string
  gradeLevelId: string
  dateOfBirth?: string | null
  sex?: 'MALE' | 'FEMALE' | 'OTHER' | null
  previousSchoolName?: string | null
}

export interface EnrollLearnerRequest {
  learnerId: string
  classSectionId: string
  academicYearId: string
  enrollmentDate: string
  enrollmentType: EnrollmentType
  previousSchoolName?: string | null
}

export interface MarkAttendanceRequest {
  learnerId: string
  classSectionId: string
  attendanceDate: string
  attendanceStatusId: string
  absenceReasonId?: string | null
  notes?: string | null
}

export interface BulkAttendanceRequest {
  classSectionId: string
  attendanceDate: string
  attendanceRecords: Array<{
    learnerId: string
    attendanceStatusId: string
    absenceReasonId?: string | null
    notes?: string | null
  }>
}

// ============================================================================
// OFFLINE/SYNC TYPES
// ============================================================================

export interface OfflineAction {
  id: string
  type: 'CREATE' | 'UPDATE' | 'DELETE'
  entity: 'ATTENDANCE' | 'LEARNER' | 'ENROLLMENT'
  data: any
  changeId: string
  timestamp: string
  synced: boolean
  error?: string | null
}

export interface SyncConflict {
  id: string
  schoolId: string
  entityType: string
  entityId: string
  conflictType: string
  losingChangeId: string | null
  winningChangeId: string | null
  detectedAt: string
  status: 'PENDING' | 'RESOLVED'
  resolvedBy: string | null
  resolvedAt: string | null
  resolutionNotes: string | null
  createdAt: string
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface AppState {
  // Authentication
  user: User | null
  token: string | null
  tenant: Tenant | null

  // Network
  isOnline: boolean

  // Current Context
  selectedSchool: School | null
  selectedClass: ClassSection | null
  selectedDate: Date

  // Offline Queue
  offlineQueue: OfflineAction[]
  pendingSyncCount: number
  lastSyncTime: string | null

  // UI State
  isSidebarOpen: boolean
  currentView: 'dashboard' | 'attendance' | 'learners' | 'classes' | 'reports'
}

// ============================================================================
// FILTER/QUERY TYPES
// ============================================================================

export interface AttendanceFilters {
  schoolId?: string
  classSectionId?: string
  learnerId?: string
  startDate?: string
  endDate?: string
  status?: string
}

export interface LearnerFilters {
  schoolId?: string
  gradeLevelId?: string
  isActive?: boolean
  search?: string
}

export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface AttendanceFormData {
  date: Date
  classId: string
  attendanceRecords: Map<string, {
    learnerId: string
    status: string
    absenceReason?: string
    notes?: string
  }>
}
