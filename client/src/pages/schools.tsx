// ============================================================================
// SCHOOL MANAGEMENT PAGE
// ============================================================================

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import {
  useSchools,
  useCreateSchool,
  useUpdateSchool,
  useAcademicYears,
  useAcademicTerms,
  useAllTenants,
} from '@/hooks'
import { useAuth } from '@/store'
import type { School, CreateSchoolRequest, UpdateSchoolRequest } from '@/types'
import AnimatedBackground from '@/components/AnimatedBackground'

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const createSchoolSchema = z.object({
  name: z.string().min(1, 'School name is required').max(255, 'Name too long'),
  code: z
    .string()
    .min(3, 'Code must be 3-5 uppercase letters')
    .max(5, 'Code must be 3-5 uppercase letters')
    .regex(/^[A-Z]{3,5}$/, 'Code must be 3-5 uppercase letters (e.g., ABC, PILOT)'),
  address: z.string().max(500, 'Address too long').optional().or(z.literal('')),
  phone: z.string().max(50, 'Phone too long').optional().or(z.literal('')),
  email: z
    .string()
    .email('Invalid email format')
    .max(255, 'Email too long')
    .optional()
    .or(z.literal('')),
  logoUrl: z.string().max(500, 'Logo URL too long').optional().or(z.literal('')),
  tenantId: z.string().optional(),
})

const updateSchoolSchema = z.object({
  name: z.string().min(1, 'School name is required').max(255, 'Name too long').optional(),
  address: z.string().max(500, 'Address too long').optional().or(z.literal('')),
  phone: z.string().max(50, 'Phone too long').optional().or(z.literal('')),
  email: z
    .string()
    .email('Invalid email format')
    .max(255, 'Email too long')
    .optional()
    .or(z.literal('')),
  logoUrl: z.string().max(500, 'Logo URL too long').optional().or(z.literal('')),
  academicYearId: z.string().optional().or(z.literal('')),
  currentTermId: z.string().optional().or(z.literal('')),
})

type CreateSchoolFormData = z.infer<typeof createSchoolSchema>
type UpdateSchoolFormData = z.infer<typeof updateSchoolSchema>

// ============================================================================
// COMPONENT
// ============================================================================

export default function SchoolsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState<School | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Queries
  const { data: schools, isLoading } = useSchools()
  const { data: tenants } = useAllTenants()

  // For update form: load academic years/terms from the school's tenant
  const { data: academicYears } = useAcademicYears(false, editingSchool?.tenantId)
  const { data: academicTerms } = useAcademicTerms(false, editingSchool?.tenantId)

  // Mutations
  const createSchool = useCreateSchool()
  const updateSchool = useUpdateSchool()

  // Create Form
  const createForm = useForm<CreateSchoolFormData>({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: {
      name: '',
      code: '',
      address: '',
      phone: '',
      email: '',
      logoUrl: '',
      tenantId: '',
    },
  })

  // Update Form
  const updateForm = useForm<UpdateSchoolFormData>({
    resolver: zodResolver(updateSchoolSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      logoUrl: '',
      academicYearId: '',
      currentTermId: '',
    },
  })

  // Filter schools by search query
  const filteredSchools = schools?.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle create
  const onCreateSubmit = async (data: CreateSchoolFormData) => {
    const payload: CreateSchoolRequest & { tenantId?: string } = {
      name: data.name,
      code: data.code,
      address: data.address || null,
      phone: data.phone || null,
      email: data.email || null,
      logoUrl: data.logoUrl || null,
    }

    // Platform admin can specify tenant
    if (user?.isPlatformAdmin && data.tenantId) {
      payload.tenantId = data.tenantId
    }

    await createSchool.mutateAsync(payload)
    setIsModalOpen(false)
    createForm.reset()
  }

  // Handle update
  const onUpdateSubmit = async (data: UpdateSchoolFormData) => {
    if (!editingSchool) return

    const payload: UpdateSchoolRequest = {
      name: data.name || undefined,
      address: data.address || null,
      phone: data.phone || null,
      email: data.email || null,
      logoUrl: data.logoUrl || null,
      academicYearId: data.academicYearId || null,
      currentTermId: data.currentTermId || null,
    }

    await updateSchool.mutateAsync({ id: editingSchool.id, data: payload })
    setIsModalOpen(false)
    setEditingSchool(null)
    updateForm.reset()
  }

  // Open modal for creating
  const handleCreate = () => {
    setEditingSchool(null)
    createForm.reset({
      name: '',
      code: '',
      address: '',
      phone: '',
      email: '',
      logoUrl: '',
      tenantId: '',
    })
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleEdit = (school: School) => {
    setEditingSchool(school)
    updateForm.reset({
      name: school.name,
      address: school.address || '',
      phone: school.phone || '',
      email: school.email || '',
      logoUrl: school.logoUrl || '',
      academicYearId: school.academicYearId || '',
      currentTermId: school.currentTermId || '',
    })
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Go back"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  School Management
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage schools and educational institutions
                </p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Create School
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search schools by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Schools Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading schools...
            </div>
          ) : filteredSchools?.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchQuery
                ? 'No schools found matching your search.'
                : 'No schools yet. Create your first school to get started.'}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Academic Info
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchools?.map((school) => (
                  <tr key={school.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {school.logoUrl && (
                          <img
                            src={school.logoUrl}
                            alt={school.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {school.name}
                          </div>
                          {school.address && (
                            <div className="text-xs text-gray-500">
                              {school.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-mono font-semibold text-blue-800 bg-blue-100 rounded">
                        {school.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {school.email && <div>{school.email}</div>}
                        {school.phone && (
                          <div className="text-gray-500">{school.phone}</div>
                        )}
                        {!school.email && !school.phone && (
                          <span className="text-gray-400">No contact info</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {school.academicYearDisplayName && (
                          <div className="text-xs">
                            Year: {school.academicYearDisplayName}
                          </div>
                        )}
                        {school.currentTermDisplayName && (
                          <div className="text-xs">
                            Term: {school.currentTermDisplayName}
                          </div>
                        )}
                        {!school.academicYearDisplayName &&
                          !school.currentTermDisplayName && (
                            <span className="text-gray-400 text-xs">
                              Not configured
                            </span>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(school)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {editingSchool ? 'Edit School' : 'Create New School'}
              </h2>
            </div>

            {!editingSchool ? (
              // CREATE FORM
              <form
                onSubmit={createForm.handleSubmit(onCreateSubmit)}
                className="px-6 py-4"
              >
                {/* Platform Admin: Tenant Selection */}
                {user?.isPlatformAdmin && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tenant (Optional)
                    </label>
                    <select
                      {...createForm.register('tenantId')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Use My Tenant</option>
                      {tenants?.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>
                          {tenant.name} ({tenant.code})
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                      Leave blank to create school under your tenant
                    </p>
                  </div>
                )}

                {/* Name Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Name *
                  </label>
                  <input
                    type="text"
                    {...createForm.register('name')}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      createForm.formState.errors.name
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter school name"
                  />
                  {createForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {createForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Code Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Code *
                  </label>
                  <input
                    type="text"
                    {...createForm.register('code')}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase ${
                      createForm.formState.errors.code
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="ABC"
                    maxLength={5}
                    style={{ textTransform: 'uppercase' }}
                  />
                  {createForm.formState.errors.code && (
                    <p className="mt-1 text-sm text-red-600">
                      {createForm.formState.errors.code.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    3-5 uppercase letters (e.g., ABC, PILOT)
                  </p>
                </div>

                {/* Address Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    {...createForm.register('address')}
                    rows={2}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      createForm.formState.errors.address
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter school address"
                  />
                  {createForm.formState.errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {createForm.formState.errors.address.message}
                    </p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...createForm.register('email')}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        createForm.formState.errors.email
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      placeholder="school@example.com"
                    />
                    {createForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {createForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...createForm.register('phone')}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        createForm.formState.errors.phone
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {createForm.formState.errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {createForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Logo URL */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    {...createForm.register('logoUrl')}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      createForm.formState.errors.logoUrl
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="https://example.com/logo.png"
                  />
                  {createForm.formState.errors.logoUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {createForm.formState.errors.logoUrl.message}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      createForm.reset()
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      createForm.formState.isSubmitting || createSchool.isPending
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {createForm.formState.isSubmitting || createSchool.isPending
                      ? 'Creating...'
                      : 'Create School'}
                  </button>
                </div>
              </form>
            ) : (
              // UPDATE FORM
              <form
                onSubmit={updateForm.handleSubmit(onUpdateSubmit)}
                className="px-6 py-4"
              >
                {/* Name Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    {...updateForm.register('name')}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updateForm.formState.errors.name
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter school name"
                  />
                  {updateForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {updateForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Academic Year & Term */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Academic Year
                    </label>
                    <select
                      {...updateForm.register('academicYearId')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Academic Year</option>
                      {academicYears?.map((year) => (
                        <option key={year.id} value={year.id}>
                          {year.displayName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Term
                    </label>
                    <select
                      {...updateForm.register('currentTermId')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Current Term</option>
                      {academicTerms?.map((term) => (
                        <option key={term.id} value={term.id}>
                          {term.displayName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    {...updateForm.register('address')}
                    rows={2}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updateForm.formState.errors.address
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter school address"
                  />
                  {updateForm.formState.errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {updateForm.formState.errors.address.message}
                    </p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...updateForm.register('email')}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        updateForm.formState.errors.email
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      placeholder="school@example.com"
                    />
                    {updateForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {updateForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...updateForm.register('phone')}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        updateForm.formState.errors.phone
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {updateForm.formState.errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {updateForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Logo URL */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    {...updateForm.register('logoUrl')}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updateForm.formState.errors.logoUrl
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="https://example.com/logo.png"
                  />
                  {updateForm.formState.errors.logoUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {updateForm.formState.errors.logoUrl.message}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setEditingSchool(null)
                      updateForm.reset()
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      updateForm.formState.isSubmitting || updateSchool.isPending
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {updateForm.formState.isSubmitting || updateSchool.isPending
                      ? 'Updating...'
                      : 'Update School'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
