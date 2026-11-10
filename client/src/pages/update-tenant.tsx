// ============================================================================
// UPDATE TENANT PAGE - Super Admin
// ============================================================================
// Full-featured tenant update form with real API integration

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTenantById, useUpdateTenant, useSuspendTenant, useDeleteTenant } from '@/hooks/use-tenants'
import { useStates, useLocalGovernments } from '@/hooks/use-locations'
import { isValidNigerianPhoneNumber, getPhoneValidationError } from '@/lib/validations/phone'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'
import toast from 'react-hot-toast'

// ============================================================================
// COMPONENT
// ============================================================================

export default function UpdateTenantPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // API Hooks
  const { data: tenant, isLoading, isError } = useTenantById(id || null)
  const { data: states } = useStates()
  const updateTenantMutation = useUpdateTenant()
  const suspendTenantMutation = useSuspendTenant()
  const deleteTenantMutation = useDeleteTenant()

  // Form state
  const [tenantName, setTenantName] = useState('')
  const [cacNumber, setCacNumber] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [address, setAddress] = useState('')
  const [stateId, setStateId] = useState<string>('')
  const [localGovernmentId, setLocalGovernmentId] = useState<string>('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [roleTitle, setRoleTitle] = useState('')
  const [contactPhone, setContactPhone] = useState('') // Only digits after +234
  const [subscriptionTier, setSubscriptionTier] = useState<'BASIC' | 'STANDARD' | 'ENTERPRISE'>('STANDARD')
  const [studentQuota, setStudentQuota] = useState(1000)
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('')
  const [status, setStatus] = useState<'ACTIVE' | 'SUSPENDED' | 'INACTIVE'>('ACTIVE')

  // Get LGAs for selected state
  const { data: localGovernments } = useLocalGovernments(stateId || null)

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // UI state
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Populate form when tenant data loads
  useEffect(() => {
    if (tenant) {
      setTenantName(tenant.name || '')
      setCacNumber(tenant.cacNumber || '')
      setSubdomain(tenant.subdomain || '')
      setAddress(tenant.address || '')
      setStateId(tenant.stateId || '')
      setLocalGovernmentId(tenant.localGovernmentId || '')
      setContactName(tenant.contactName || '')
      setContactEmail(tenant.contactEmail || '')
      setRoleTitle(tenant.roleTitle || '')

      // Extract phone number without +234 prefix for display
      if (tenant.contactPhone) {
        const phone = tenant.contactPhone.replace(/^(\+234|234)/, '')
        setContactPhone(phone)
      }

      setSubscriptionTier(tenant.subscriptionTier || 'STANDARD')
      setStudentQuota(tenant.studentQuota || 1000)
      setSubscriptionEndDate(tenant.subscriptionEndDate ? tenant.subscriptionEndDate.split('T')[0] : '')
      setStatus(tenant.status)
    }
  }, [tenant])

  // Handle phone input - only numbers, max 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Remove non-digits
    if (value.length <= 10) {
      setContactPhone(value)
      clearError('contactPhone')
    }
  }

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Tenant Name
    if (!tenantName.trim()) {
      newErrors.tenantName = 'Organization name is required'
    }

    // State
    if (!stateId) {
      newErrors.stateId = 'State is required'
    }

    // LGA
    if (!localGovernmentId) {
      newErrors.localGovernmentId = 'Local Government Area is required'
    }

    // Contact Phone
    if (contactPhone.trim()) {
      if (contactPhone.length !== 10) {
        newErrors.contactPhone = 'Phone number must be exactly 10 digits'
      } else {
        const phoneError = getPhoneValidationError(`+234${contactPhone}`)
        if (phoneError) {
          newErrors.contactPhone = phoneError
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle save
  const handleSave = async () => {
    if (!validateForm() || !id) return

    setIsSaving(true)

    try {
      await updateTenantMutation.mutateAsync({
        id,
        data: {
          name: tenantName,
          stateId: stateId || null,
          localGovernmentId: localGovernmentId || null,
          address: address || null,
          contactName: contactName || null,
          roleTitle: roleTitle || null,
          contactEmail: contactEmail || tenant?.contactEmail,
          contactPhone: contactPhone ? `+234${contactPhone}` : null,
          status,
          subscriptionTier,
          studentQuota,
          subscriptionEndDate: subscriptionEndDate || null,
        },
      })

      toast.success('Tenant updated successfully!')
      navigate('/tenants')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update tenant')
    } finally {
      setIsSaving(false)
    }
  }

  // Handle suspend
  const handleSuspend = async () => {
    if (!id || !tenant) return

    if (window.confirm(`Are you sure you want to suspend ${tenant.name}? All access will be temporarily blocked.`)) {
      try {
        await suspendTenantMutation.mutateAsync(id)
      } catch (error: any) {
        toast.error(error?.message || 'Failed to suspend tenant')
      }
    }
  }

  // Handle deletion
  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!id) return

    try {
      await deleteTenantMutation.mutateAsync(id)
      toast.success('Tenant deleted successfully')
      setShowDeleteModal(false)
      navigate('/tenants')
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete tenant')
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tenant data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (isError || !tenant) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Tenant Not Found</h2>
          <p className="text-gray-600 mb-4">The tenant you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/tenants')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Tenants
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-gray-50 shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Logo */}
          <div className="h-16 px-6 flex items-center gap-2 bg-gray-50">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 leading-none">EduManage</span>
              <span className="text-[10px] text-blue-600 uppercase font-bold tracking-wider mt-0.5">Nigeria • Federal HQ</span>
            </div>
          </div>

          {/* Section Label */}
          <div className="px-4 py-4">
            <span className="px-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Super Admin Control</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('/tenants') }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Tenants</span>
            </a>
          </nav>
        </div>

        {/* Bottom Status Card */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-900 leading-tight">System Ready</span>
              <span className="text-[11px] text-green-600 leading-tight">All services active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-sm z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Update Tenant</h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full pt-16 px-6 py-6 flex-1 bg-white">
          {/* Top Navigation */}
          <div className="flex flex-col gap-2 mb-8">
            <button
              onClick={() => navigate('/tenants')}
              className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold hover:underline transition-all w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Tenants</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Update: {tenant.name}</h1>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    tenant.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                    tenant.status === 'SUSPENDED' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {tenant.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600 text-sm">
                  <span className="font-medium text-gray-900">Tenant Code:</span>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-blue-600 font-semibold">{tenant.code}</code>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/tenants')}
                  className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-sm font-semibold disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 flex flex-col gap-6">
              {/* Section 1: Organization Profile */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Organization Profile</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tenant Name */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="tenantName">
                      Organization Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      className={`w-full px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                        errors.tenantName
                          ? 'bg-red-50 border border-red-300 focus:ring-red-500/20'
                          : 'bg-gray-100 focus:bg-white focus:ring-blue-500/20'
                      }`}
                      id="tenantName"
                      type="text"
                      value={tenantName}
                      onChange={(e) => {
                        setTenantName(e.target.value)
                        clearError('tenantName')
                      }}
                    />
                    {errors.tenantName && <span className="text-xs text-red-600">{errors.tenantName}</span>}
                  </div>

                  {/* Tenant Code (Read-Only) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">Tenant Code</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-200 text-gray-600 font-mono text-sm font-semibold cursor-not-allowed shadow-sm"
                      readOnly
                      type="text"
                      value={tenant.code}
                    />
                    <span className="text-xs text-gray-500">System-generated identifier (read-only)</span>
                  </div>

                  {/* CAC Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="cacNumber">CAC Number</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                      id="cacNumber"
                      placeholder="RC-XXXXXX"
                      type="text"
                      value={cacNumber}
                      onChange={(e) => setCacNumber(e.target.value)}
                    />
                  </div>

                  {/* Subdomain */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="subdomain">Portal Subdomain</label>
                    <div className="flex rounded-lg overflow-hidden shadow-sm bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20">
                      <input
                        className="flex-1 px-4 py-2.5 bg-transparent text-gray-900 text-sm focus:outline-none text-right font-medium"
                        id="subdomain"
                        type="text"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value)}
                      />
                      <span className="px-4 py-2.5 bg-gray-200 text-gray-600 text-sm select-none font-semibold">.edumanage.ng</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="address">Headquarters Address</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="stateSelect">
                      State <span className="text-red-600">*</span>
                    </label>
                    <select
                      className={`w-full px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                        errors.stateId
                          ? 'bg-red-50 border border-red-300 focus:ring-red-500/20'
                          : 'bg-gray-100 focus:bg-white focus:ring-blue-500/20'
                      }`}
                      id="stateSelect"
                      value={stateId}
                      onChange={(e) => {
                        setStateId(e.target.value)
                        setLocalGovernmentId('') // Reset LGA when state changes
                        clearError('stateId')
                      }}
                    >
                      <option value="">Select State {states ? `(${states.length} available)` : ''}</option>
                      {states?.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.stateId && <span className="text-xs text-red-600">{errors.stateId}</span>}
                  </div>

                  {/* LGA */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="lgaSelect">
                      Local Government Area <span className="text-red-600">*</span>
                    </label>
                    <select
                      className={`w-full px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
                        errors.localGovernmentId
                          ? 'bg-red-50 border border-red-300 focus:ring-red-500/20'
                          : 'bg-gray-100 focus:bg-white focus:ring-blue-500/20'
                      }`}
                      id="lgaSelect"
                      value={localGovernmentId}
                      onChange={(e) => {
                        setLocalGovernmentId(e.target.value)
                        clearError('localGovernmentId')
                      }}
                      disabled={!stateId}
                    >
                      <option value="">Select LGA {localGovernments ? `(${localGovernments.length} available)` : ''}</option>
                      {localGovernments?.map((lga) => (
                        <option key={lga.id} value={lga.id}>
                          {lga.name}
                        </option>
                      ))}
                    </select>
                    {errors.localGovernmentId && <span className="text-xs text-red-600">{errors.localGovernmentId}</span>}
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="contactName">Contact Name</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                      id="contactName"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>

                  {/* Role Title */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="roleTitle">Role/Title</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                      id="roleTitle"
                      type="text"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                    />
                  </div>

                  {/* Contact Email (Read-Only) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700">Contact Email</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-200 text-gray-600 text-sm cursor-not-allowed shadow-sm"
                      readOnly
                      type="email"
                      value={contactEmail}
                    />
                    <span className="text-xs text-gray-500">Email cannot be changed after creation</span>
                  </div>

                  {/* Contact Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="contactPhone">Contact Phone</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">+234</span>
                      <input
                        className={`w-full pl-14 pr-4 py-2.5 rounded-lg text-gray-900 placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.contactPhone
                            ? 'bg-red-50 border border-red-300 focus:ring-red-500/20'
                            : 'bg-gray-100 focus:bg-white focus:ring-blue-500/20'
                        }`}
                        id="contactPhone"
                        placeholder="8031234567"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={contactPhone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                    {errors.contactPhone && <span className="text-xs text-red-600">{errors.contactPhone}</span>}
                  </div>
                </div>
              </div>

              {/* Section 3: Subscription */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Subscription</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Subscription Tier */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-700">Tier</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      value={subscriptionTier}
                      onChange={(e) => setSubscriptionTier(e.target.value as any)}
                    >
                      <option value="BASIC">Basic</option>
                      <option value="STANDARD">Standard</option>
                      <option value="ENTERPRISE">Enterprise</option>
                    </select>
                  </div>

                  {/* Student Quota */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="studentQuota">Student Quota</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      id="studentQuota"
                      type="number"
                      step={100}
                      value={studentQuota}
                      onChange={(e) => setStudentQuota(parseInt(e.target.value))}
                    />
                  </div>

                  {/* End Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-700" htmlFor="endDate">End Date</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      id="endDate"
                      type="date"
                      value={subscriptionEndDate}
                      onChange={(e) => setSubscriptionEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Danger Zone */}
              <div className="rounded-xl p-6 bg-red-50/50 flex flex-col gap-6 shadow-sm border border-red-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-red-900 font-bold">Danger Zone</h2>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Destructive actions that cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col divide-y divide-gray-200 gap-4">
                  {/* Suspend */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <div className="flex flex-col max-w-lg">
                      <span className="text-lg font-semibold text-gray-900">Suspend Tenant</span>
                      <span className="text-xs text-gray-600">Temporarily block all access to the system.</span>
                    </div>
                    <button
                      onClick={handleSuspend}
                      disabled={tenant.status === 'SUSPENDED'}
                      className="px-4 py-2.5 rounded-lg bg-gray-200 text-amber-600 hover:bg-amber-100 transition-colors text-sm font-semibold inline-flex items-center gap-1.5 flex-shrink-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      type="button"
                    >
                      <span>Suspend Tenant</span>
                    </button>
                  </div>

                  {/* Delete */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                    <div className="flex flex-col max-w-lg">
                      <span className="text-lg font-semibold text-red-600">Delete Permanently</span>
                      <span className="text-xs text-gray-600">Permanently delete this tenant and all associated data.</span>
                    </div>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-semibold inline-flex items-center gap-1.5 flex-shrink-0 shadow-sm"
                      type="button"
                    >
                      <span>Delete Tenant</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Tenant Info Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Tenant Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-semibold ${
                      tenant.status === 'ACTIVE' ? 'text-green-600' :
                      tenant.status === 'SUSPENDED' ? 'text-amber-600' :
                      'text-gray-600'
                    }`}>
                      {tenant.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tier</span>
                    <span className="font-semibold text-gray-900">{tenant.subscriptionTier || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quota</span>
                    <span className="font-semibold text-gray-900">{tenant.studentQuota || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Verified</span>
                    <span className={`font-semibold ${tenant.emailVerified ? 'text-green-600' : 'text-amber-600'}`}>
                      {tenant.emailVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {tenant && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title="Delete Tenant"
          itemName={tenant.name}
          confirmationCode={tenant.code}
          isDeleting={deleteTenantMutation.isPending}
        />
      )}
    </div>
  )
}
