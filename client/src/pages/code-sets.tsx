// ============================================================================
// CODESET MANAGEMENT PAGE
// ============================================================================

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import {
  useCodeSetsByGroup,
  useCreateCodeSet,
  useUpdateCodeSet,
  useActivateCodeSet,
  useDeactivateCodeSet,
} from '@/hooks'
import type { CodeSet, CodeSetGroup } from '@/types'
import AnimatedBackground from '@/components/AnimatedBackground'

// ============================================================================
// CONSTANTS
// ============================================================================

const CODE_SET_GROUPS: Array<{ value: CodeSetGroup; label: string }> = [
  { value: 'GRADE_LEVEL', label: 'Grade Levels' },
  { value: 'ACADEMIC_YEAR', label: 'Academic Years' },
  { value: 'ACADEMIC_TERM', label: 'Academic Terms' },
  { value: 'ATTENDANCE_STATUS', label: 'Attendance Status' },
  { value: 'ABSENCE_REASON', label: 'Absence Reasons' },
  { value: 'GENDER', label: 'Gender' },
  { value: 'RELIGION', label: 'Religion' },
  { value: 'NATIONALITY', label: 'Nationality' },
  { value: 'BLOOD_GROUP', label: 'Blood Group' },
]

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const codeSetSchema = z.object({
  codeSetGroup: z.string().min(1, 'Group is required'),
  code: z.string().min(1, 'Code is required').max(50, 'Code too long'),
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .max(100, 'Display name too long'),
  description: z.string().max(500, 'Description too long').optional().or(z.literal('')),
  sortOrder: z.number().min(1, 'Sort order must be positive'),
})

type CodeSetFormData = z.infer<typeof codeSetSchema>

// ============================================================================
// COMPONENT
// ============================================================================

export default function CodeSetsPage() {
  const navigate = useNavigate()
  const [selectedGroup, setSelectedGroup] = useState<CodeSetGroup>('GRADE_LEVEL')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCodeSet, setEditingCodeSet] = useState<CodeSet | null>(null)
  const [includeInactive, setIncludeInactive] = useState(false)

  // Queries
  const { data: codeSets, isLoading } = useCodeSetsByGroup(
    selectedGroup,
    includeInactive
  )

  // Mutations
  const createCodeSet = useCreateCodeSet()
  const updateCodeSet = useUpdateCodeSet()
  const activateCodeSet = useActivateCodeSet()
  const deactivateCodeSet = useDeactivateCodeSet()

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CodeSetFormData>({
    resolver: zodResolver(codeSetSchema),
    defaultValues: {
      codeSetGroup: selectedGroup,
      code: '',
      displayName: '',
      description: '',
      sortOrder: 1,
    },
  })

  // Handle create/update
  const onSubmit = async (data: CodeSetFormData) => {
    const payload = {
      codeSetGroup: data.codeSetGroup,
      code: data.code,
      displayName: data.displayName,
      description: data.description || null,
      sortOrder: data.sortOrder,
    }

    if (editingCodeSet) {
      await updateCodeSet.mutateAsync({
        id: editingCodeSet.id,
        data: payload,
      })
    } else {
      await createCodeSet.mutateAsync(payload)
    }

    setIsModalOpen(false)
    setEditingCodeSet(null)
    reset()
  }

  // Open modal for creating
  const handleCreate = () => {
    setEditingCodeSet(null)
    reset({
      codeSetGroup: selectedGroup,
      code: '',
      displayName: '',
      description: '',
      sortOrder: (codeSets?.length || 0) + 1,
    })
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleEdit = (codeSet: CodeSet) => {
    setEditingCodeSet(codeSet)
    reset({
      codeSetGroup: codeSet.codeSetGroup,
      code: codeSet.code,
      displayName: codeSet.displayName,
      description: codeSet.description || '',
      sortOrder: codeSet.sortOrder,
    })
    setIsModalOpen(true)
  }

  // Toggle active status
  const handleToggleActive = async (codeSet: CodeSet) => {
    if (codeSet.isActive) {
      await deactivateCodeSet.mutateAsync(codeSet.id)
    } else {
      await activateCodeSet.mutateAsync(codeSet.id)
    }
  }

  const selectedGroupLabel =
    CODE_SET_GROUPS.find((g) => g.value === selectedGroup)?.label || selectedGroup

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
                  CodeSet Management
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage system code sets and lookup values
                </p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Create CodeSet
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value as CodeSetGroup)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CODE_SET_GROUPS.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 mt-7">
            <input
              type="checkbox"
              id="includeInactive"
              checked={includeInactive}
              onChange={(e) => setIncludeInactive(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="includeInactive"
              className="text-sm font-medium text-gray-700"
            >
              Include Inactive
            </label>
          </div>
        </div>

        {/* CodeSets Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedGroupLabel}
            </h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading code sets...</div>
          ) : codeSets?.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No code sets found for this group. Create your first one to get started.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Display Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
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
                {codeSets
                  ?.sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((codeSet) => (
                    <tr key={codeSet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {codeSet.sortOrder}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {codeSet.code}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {codeSet.displayName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md truncate">
                          {codeSet.description || (
                            <span className="text-gray-400">No description</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            codeSet.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {codeSet.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(codeSet)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleActive(codeSet)}
                          className={`${
                            codeSet.isActive
                              ? 'text-red-600 hover:text-red-900'
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {codeSet.isActive ? 'Deactivate' : 'Activate'}
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCodeSet ? 'Edit CodeSet' : 'Create New CodeSet'}
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
              {/* Group Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group *
                </label>
                <select
                  {...register('codeSetGroup')}
                  disabled={!!editingCodeSet}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.codeSetGroup ? 'border-red-300' : 'border-gray-300'
                  } ${editingCodeSet ? 'bg-gray-100' : ''}`}
                >
                  {CODE_SET_GROUPS.map((group) => (
                    <option key={group.value} value={group.value}>
                      {group.label}
                    </option>
                  ))}
                </select>
                {errors.codeSetGroup && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.codeSetGroup.message}
                  </p>
                )}
              </div>

              {/* Code Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code *
                </label>
                <input
                  type="text"
                  {...register('code')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono ${
                    errors.code ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="GRADE_1"
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
                )}
              </div>

              {/* Display Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name *
                </label>
                <input
                  type="text"
                  {...register('displayName')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.displayName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Grade 1"
                />
                {errors.displayName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.displayName.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Optional description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Sort Order Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order *
                </label>
                <input
                  type="number"
                  {...register('sortOrder', { valueAsNumber: true })}
                  min={1}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.sortOrder ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.sortOrder && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.sortOrder.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingCodeSet(null)
                    reset()
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting || createCodeSet.isPending || updateCodeSet.isPending
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting || createCodeSet.isPending || updateCodeSet.isPending
                    ? 'Saving...'
                    : editingCodeSet
                    ? 'Update CodeSet'
                    : 'Create CodeSet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
