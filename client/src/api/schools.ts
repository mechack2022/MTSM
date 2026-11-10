import api from '@/lib/api-client'
import type {
  School,
  CreateSchoolRequest,
  UpdateSchoolRequest,
} from '@/types/school'

export const schoolsApi = {
  // Create a new school
  createSchool: async (data: CreateSchoolRequest) => {
    return api.post<School>('/schools', data)
  },

  // Get all schools for the tenant
  getAllSchools: async (activeOnly?: boolean) => {
    const params = activeOnly ? '?activeOnly=true' : ''
    return api.get<School[]>(`/schools${params}`)
  },

  // Get active schools only
  getActiveSchools: async () => {
    return api.get<School[]>('/schools?activeOnly=true')
  },

  // Get school by ID
  getSchoolById: async (id: string) => {
    return api.get<School>(`/schools/${id}`)
  },

  // Get school by campus code
  getSchoolByCampusCode: async (code: string) => {
    return api.get<School>(`/schools/code/${code}`)
  },

  // Update school
  updateSchool: async (id: string, data: UpdateSchoolRequest) => {
    return api.put<School>(`/schools/${id}`, data)
  },

  // Delete school (soft delete)
  deleteSchool: async (id: string) => {
    return api.delete<void>(`/schools/${id}`)
  },

  // Search schools
  searchSchools: async (searchTerm: string) => {
    return api.get<School[]>(`/schools/search?q=${encodeURIComponent(searchTerm)}`)
  },

  // Get statistics
  getActiveSchoolCount: async () => {
    return api.get<number>('/schools/stats/active-count')
  },

  getTotalStudents: async () => {
    return api.get<number>('/schools/stats/total-students')
  },

  getTotalTeachers: async () => {
    return api.get<number>('/schools/stats/total-teachers')
  },
}
