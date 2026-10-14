// ============================================================================
// TENANT MANAGEMENT PAGE
// ============================================================================

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import {
  useAllTenants,
  useCreateTenant,
  useUpdateTenant,
  useActivateTenant,
  useDeactivateTenant,
} from '@/hooks'
import type { Tenant, CreateTenantRequest, UpdateTenantRequest } from '@/types'
import AnimatedBackground from '@/components/AnimatedBackground'

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const tenantSchema = z.object({
  name: z.string().min(1, 'Tenant name is required').max(255, 'Name too long'),
  contactEmail: z
    .string()
    .email('Invalid email format')
    .max(255, 'Email too long')
    .optional()
    .or(z.literal('')),
  contactPhone: z.string().max(50, 'Phone too long').optional().or(z.literal('')),
})

type TenantFormData = z.infer<typeof tenantSchema>

// ============================================================================
// COMPONENT
// ============================================================================

export default function TenantsPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Queries
  const { data: tenants, isLoading } = useAllTenants()

  // Mutations
  const createTenant = useCreateTenant()
  const updateTenant = useUpdateTenant()
  const activateTenant = useActivateTenant()
  const deactivateTenant = useDeactivateTenant()

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: '',
      contactEmail: '',
      contactPhone: '',
    },
  })

  // Filter tenants by search query
  const filteredTenants = tenants?.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle create/update
  const onSubmit = async (data: TenantFormData) => {
    const payload = {
      name: data.name,
      contactEmail: data.contactEmail || null,
      contactPhone: data.contactPhone || null,
    }

    if (editingTenant) {
      await updateTenant.mutateAsync({
        id: editingTenant.id,
        data: payload as UpdateTenantRequest,
      })
    } else {
      await createTenant.mutateAsync(payload as CreateTenantRequest)
    }

    setIsModalOpen(false)
    setEditingTenant(null)
    reset()
  }

  // Open modal for creating
  const handleCreate = () => {
    setEditingTenant(null)
    reset({ name: '', contactEmail: '', contactPhone: '' })
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleEdit = (tenant: Tenant) => {
    setEditingTenant(tenant)
    reset({
      name: tenant.name,
      contactEmail: tenant.contactEmail || '',
      contactPhone: tenant.contactPhone || '',
    })
    setIsModalOpen(true)
  }

  // Toggle active status
  const handleToggleActive = async (tenant: Tenant) => {
    if (tenant.isActive) {
      await deactivateTenant.mutateAsync(tenant.id)
    } else {
      await activateTenant.mutateAsync(tenant.id)
    }
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
                  Tenant Management
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage organizations and school districts
                </p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Create Tenant
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
            placeholder="Search tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tenants Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading tenants...
            </div>
          ) : filteredTenants?.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchQuery
                ? 'No tenants found matching your search.'
                : 'No tenants yet. Create your first tenant to get started.'}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTenants?.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {tenant.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {tenant.code}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {tenant.contactEmail && (
                          <div>{tenant.contactEmail}</div>
                        )}
                        {tenant.contactPhone && (
                          <div className="text-gray-500">
                            {tenant.contactPhone}
                          </div>
                        )}
                        {!tenant.contactEmail && !tenant.contactPhone && (
                          <span className="text-gray-400">No contact info</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tenant.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tenant.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(tenant)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(tenant)}
                        className={`${
                          tenant.isActive
                            ? 'text-red-600 hover:text-red-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {tenant.isActive ? 'Deactivate' : 'Activate'}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingTenant ? 'Edit Tenant' : 'Create New Tenant'}
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tenant Name *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter tenant name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  {...register('contactEmail')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="contact@example.com"
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  {...register('contactPhone')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contactPhone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.contactPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactPhone.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingTenant(null)
                    reset()
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || createTenant.isPending || updateTenant.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ||
                  createTenant.isPending ||
                  updateTenant.isPending
                    ? 'Saving...'
                    : editingTenant
                    ? 'Update Tenant'
                    : 'Create Tenant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
