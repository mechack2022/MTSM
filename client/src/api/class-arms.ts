import api from '@/lib/api-client'
import type {
  ClassArm,
  CreateClassArmRequest,
  UpdateClassArmRequest,
  ClassName,
  ArmName,
  SchoolSection,
} from '@/types/class-arm'
import type { Staff } from '@/types/staff'

export const classArmsApi = {
  // ============================================================================
  // CRUD Operations
  // ============================================================================

  // Create a new class arm
  createClassArm: async (data: CreateClassArmRequest) => {
    return api.post<ClassArm>('/class-arms', data)
  },

  // Get all class arms for the school
  getAllClassArms: async (params?: {
    section?: SchoolSection
    academicYearId?: string
  }) => {
    const queryParams = new URLSearchParams()
    if (params?.section) queryParams.append('section', params.section)
    if (params?.academicYearId) queryParams.append('academicYearId', params.academicYearId)

    const queryString = queryParams.toString()
    const url = queryString ? `/class-arms?${queryString}` : '/class-arms'

    return api.get<ClassArm[]>(url)
  },

  // Get class arm by ID
  getClassArmById: async (id: string) => {
    return api.get<ClassArm>(`/class-arms/${id}`)
  },

  // Update class arm
  updateClassArm: async (id: string, data: UpdateClassArmRequest) => {
    return api.put<ClassArm>(`/class-arms/${id}`, data)
  },

  // Delete class arm (soft delete)
  deleteClassArm: async (id: string) => {
    return api.delete<void>(`/class-arms/${id}`)
  },

  // Search class arms
  searchClassArms: async (searchTerm: string) => {
    return api.get<ClassArm[]>(`/class-arms/search?q=${encodeURIComponent(searchTerm)}`)
  },

  // ============================================================================
  // Statistics
  // ============================================================================

  // Get total class arms count
  getTotalClassArmsCount: async () => {
    return api.get<number>('/class-arms/stats/total-count')
  },

  // Get class arms count by section
  getClassArmsCountBySection: async (section: SchoolSection) => {
    return api.get<number>(`/class-arms/stats/count-by-section?section=${section}`)
  },

  // ============================================================================
  // Helper/Utility Endpoints
  // ============================================================================

  // Get eligible staff for a school section (for lead caregiver assignment)
  getEligibleStaffForSection: async (section: SchoolSection) => {
    return api.get<Staff[]>(`/class-arms/eligible-staff?section=${section}`)
  },

  // Get available class names for a school section
  getAvailableClassNames: async (section: SchoolSection) => {
    return api.get<ClassName[]>(`/class-arms/available-class-names?section=${section}`)
  },

  // Get available arm names (presets) for a school section
  getAvailableArmNames: async (section: SchoolSection) => {
    return api.get<ArmName[]>(`/class-arms/available-arm-names?section=${section}`)
  },
}
