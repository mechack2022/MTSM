// ============================================================================
// ADD SCHOOL / CAMPUS MODAL
// ============================================================================
// Modal for tenant admins to add a new school/campus branch to their trust

import { useState } from 'react'
import { useTenant } from '@/hooks/use-tenants'
import { useStates, useLocalGovernments } from '@/hooks/use-locations'
import { useCreateSchool } from '@/hooks/use-schools'
import { Topology } from '@/types/school'

// Educational Tier Enum (matches backend)
export enum EducationalTier {
  EARLY_YEARS = 'EARLY_YEARS',
  PRIMARY = 'PRIMARY',
  JUNIOR_SECONDARY = 'JUNIOR_SECONDARY',
  SENIOR_SECONDARY = 'SENIOR_SECONDARY',
}

// Display names for educational tiers
const EDUCATIONAL_TIER_LABELS: Record<EducationalTier, string> = {
  [EducationalTier.EARLY_YEARS]: 'Early Years / Nursery (Crèche - Pre-Primary)',
  [EducationalTier.PRIMARY]: 'Primary School (Basic 1 - Basic 6)',
  [EducationalTier.JUNIOR_SECONDARY]: 'Junior Secondary (JSS1 - JSS3)',
  [EducationalTier.SENIOR_SECONDARY]: 'Senior Secondary (SS1 - SS3)',
}

interface AddSchoolModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddSchoolModal({ isOpen, onClose }: AddSchoolModalProps) {
  // Don't fetch tenant here to avoid infinite loop - get it from store instead
  const tenant = null  // TODO: Get from zustand store if needed for display
  const tenantLoading = false

  // Use the mutation hook
  const createSchoolMutation = useCreateSchool()

  const [schoolName, setSchoolName] = useState('')
  const [campusCode, setCampusCode] = useState('') // Empty for auto-generation
  const [topology, setTopology] = useState<'composite' | 'standalone' | 'satellite'>('composite')
  const [educationalTiers, setEducationalTiers] = useState<EducationalTier[]>([])
  const [stateId, setStateId] = useState<string>('')
  const [localGovernmentId, setLocalGovernmentId] = useState<string>('')
  const [physicalAddress, setPhysicalAddress] = useState('')
  const [schoolHeadName, setSchoolHeadName] = useState('')
  const [schoolHeadEmail, setSchoolHeadEmail] = useState('')
  const [schoolHeadPhone, setSchoolHeadPhone] = useState('')
  const [seatCapacity, setSeatCapacity] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch states and local governments
  const { data: states, isLoading: statesLoading } = useStates()
  const { data: localGovernments, isLoading: lgasLoading } = useLocalGovernments(stateId || null)

  // Handle tier checkbox changes
  const toggleTier = (tier: EducationalTier) => {
    setEducationalTiers(prev =>
      prev.includes(tier)
        ? prev.filter(t => t !== tier)
        : [...prev, tier]
    )
  }

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        name: schoolName,
        campusCode: campusCode || null, // Send null for auto-generation
        topology: topology.toUpperCase() as any,
        educationalTiers: topology === 'composite' ? null : educationalTiers, // Backend handles COMPOSITE automatically
        stateId,
        localGovernmentId: localGovernmentId || null, // Optional field
        physicalAddress,
        schoolHeadName,
        schoolHeadEmail,
        schoolHeadPhone,
        seatCapacity: parseInt(seatCapacity),
      }

      // Call the actual API via the mutation
      await createSchoolMutation.mutateAsync(data)

      // Close the modal and reset form on success
      handleClose()
    } catch (error) {
      // Error handling is done in the mutation hook (toast notification)
      console.error('Failed to create school:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // Reset form
    setSchoolName('')
    setCampusCode('')
    setTopology('composite')
    setEducationalTiers([])
    setStateId('')
    setLocalGovernmentId('')
    setPhysicalAddress('')
    setSchoolHeadName('')
    setSchoolHeadEmail('')
    setSchoolHeadPhone('')
    setSeatCapacity('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Add New School / Campus</h2>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">New Branch</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Register a new branch under <strong>{tenantLoading ? 'Loading...' : (tenant?.name || 'your organization')}</strong>. It will automatically inherit trust-wide settings.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-8">
            {/* Section 1: School Identity */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">School Identity</h3>
                  <p className="text-xs text-gray-600">Designate institutional naming and educational level across state board registers.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pl-11">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    School / Campus Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Crown Jewel International College"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Campus Code (Optional)
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">Auto-Generated</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <input
                      type="text"
                      value={campusCode}
                      onChange={(e) => setCampusCode(e.target.value)}
                      placeholder="Leave empty for auto-generation (e.g., CROWN-001)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Auto-generated format: TENANT_CODE-XXX (e.g., CROWN-001, CROWN-002)
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Campus Topology */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Campus Topology & Structure</h3>
                  <p className="text-xs text-gray-600">Select the organizational structure for this campus within your educational trust.</p>
                </div>
              </div>

              <div className="pl-11">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* All-in-One Composite */}
                  <label
                    className={`cursor-pointer transition-all p-4 rounded-xl border-2 ${
                      topology === 'composite'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        checked={topology === 'composite'}
                        onChange={() => setTopology('composite')}
                        className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-600"
                        type="radio"
                        name="topology"
                        value="composite"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-gray-900">All-in-One Composite</span>
                          {topology === 'composite' && (
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Multi-tier unified campus with all stages under one administration.
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Shared facilities</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Unified leadership</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Standalone */}
                  <label
                    className={`cursor-pointer transition-all p-4 rounded-xl border-2 ${
                      topology === 'standalone'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        checked={topology === 'standalone'}
                        onChange={() => setTopology('standalone')}
                        className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-600"
                        type="radio"
                        name="topology"
                        value="standalone"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-gray-900">Standalone</span>
                          {topology === 'standalone' && (
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Single-tier focused school (e.g., Primary only or Secondary only).
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Specialized focus</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Age-specific facilities</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Satellite */}
                  <label
                    className={`cursor-pointer transition-all p-4 rounded-xl border-2 ${
                      topology === 'satellite'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        checked={topology === 'satellite'}
                        onChange={() => setTopology('satellite')}
                        className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-600"
                        type="radio"
                        name="topology"
                        value="satellite"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-gray-900">Satellite Branch</span>
                          {topology === 'satellite' && (
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Branch in distributed network with shared policies and branding.
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Geographic spread</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Shared curriculum</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Info Banner */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-blue-900">
                    <strong>Selected: {topology === 'composite' ? 'All-in-One Composite Campus' : topology === 'standalone' ? 'Standalone School' : 'Satellite Branch'}</strong> -
                    {topology === 'composite' && ' This campus will manage multiple educational tiers under unified administration.'}
                    {topology === 'standalone' && ' This campus focuses on a single educational tier with specialized facilities.'}
                    {topology === 'satellite' && ' This campus operates as part of your distributed network with shared policies.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Educational Level / Category */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Educational Level / Category</h3>
                  <p className="text-xs text-gray-600">Select the academic tiers this campus will offer based on topology.</p>
                </div>
              </div>

              <div className="pl-11">
                {topology === 'composite' ? (
                  /* COMPOSITE - Show all tiers automatically */
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-1">All Educational Tiers Auto-Assigned</h4>
                        <p className="text-xs text-green-800">
                          Composite campuses automatically include all educational tiers below.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {Object.entries(EDUCATIONAL_TIER_LABELS).map(([tier, label]) => (
                        <div key={tier} className="flex items-center gap-2 bg-white rounded-md px-3 py-2 border border-green-300">
                          <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-800">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* STANDALONE/SATELLITE - Show checkboxes */
                  <div>
                    <p className="text-sm text-gray-700 mb-3">
                      Select one or more educational tiers for this {topology === 'standalone' ? 'standalone' : 'satellite'} campus:
                    </p>
                    <div className="space-y-2">
                      {Object.entries(EDUCATIONAL_TIER_LABELS).map(([tier, label]) => (
                        <label
                          key={tier}
                          className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            educationalTiers.includes(tier as EducationalTier)
                              ? 'bg-blue-50 border-blue-500'
                              : 'bg-white border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={educationalTiers.includes(tier as EducationalTier)}
                            onChange={() => toggleTier(tier as EducationalTier)}
                            className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-600 rounded"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-900">{label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {educationalTiers.length === 0 && (
                      <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Please select at least one educational tier
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Location & Address */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Location & Address</h3>
                  <p className="text-xs text-gray-600">Nigerian state jurisdiction for tax and regional curriculum accreditation.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pl-11">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    State of Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    <select
                      value={stateId}
                      onChange={(e) => {
                        setStateId(e.target.value)
                        setLocalGovernmentId('') // Reset LGA when state changes
                      }}
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white"
                      required
                      disabled={statesLoading}
                    >
                      <option value="">
                        {statesLoading ? 'Loading states...' : 'Select a state'}
                      </option>
                      {states?.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Local Government Area (Optional)
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <select
                      value={localGovernmentId}
                      onChange={(e) => setLocalGovernmentId(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      disabled={!stateId || lgasLoading}
                    >
                      <option value="">
                        {!stateId
                          ? 'Select a state first'
                          : lgasLoading
                          ? 'Loading LGAs...'
                          : 'Select Local Government (Optional)'}
                      </option>
                      {localGovernments?.map((lga) => (
                        <option key={lga.id} value={lga.id}>
                          {lga.name}
                        </option>
                      ))}
                    </select>
                    <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Physical Campus Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="text"
                      value={physicalAddress}
                      onChange={(e) => setPhysicalAddress(e.target.value)}
                      placeholder="Plot 12 Secretariat Road, Bodija, Ibadan"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Initial School Leadership */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Initial School Leadership</h3>
                  <p className="text-xs text-gray-600">Designated Head Teacher / Principal who will receive master campus administrator login credentials.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pl-11">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    School Head Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      type="text"
                      value={schoolHeadName}
                      onChange={(e) => setSchoolHeadName(e.target.value)}
                      placeholder="e.g. Mrs. Adeola Okonkwo"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="email"
                      value={schoolHeadEmail}
                      onChange={(e) => setSchoolHeadEmail(e.target.value)}
                      placeholder="principal@cjet.edu.ng"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <input
                      type="tel"
                      value={schoolHeadPhone}
                      onChange={(e) => setSchoolHeadPhone(e.target.value)}
                      placeholder="+234 803 456 7890"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Capacity Allocation */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Capacity Allocation</h3>
                  <p className="text-xs text-gray-600">Student enrollment quota for this campus (deducted from trust-wide seat pool).</p>
                </div>
              </div>

              <div className="pl-11">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Maximum Seat Capacity <span className="text-red-500">*</span>
                </label>
                <div className="relative max-w-xs">
                  <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <input
                    type="number"
                    value={seatCapacity}
                    onChange={(e) => setSeatCapacity(e.target.value)}
                    placeholder="500"
                    min="50"
                    max="2000"
                    className="w-full pl-10 pr-20 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">students</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Trust has <strong>358 seats available</strong> of 1,500 total quota
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            <svg className="w-4 h-4 inline mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            All fields encrypted • NDPA Compliant
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Provisioning...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Register New Campus
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
