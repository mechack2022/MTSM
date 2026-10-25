// ============================================================================
// ADD SCHOOL / CAMPUS MODAL
// ============================================================================
// Modal for tenant admins to add a new school/campus branch to their trust

import { useState } from 'react'

interface AddSchoolModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function AddSchoolModal({ isOpen, onClose, onSubmit }: AddSchoolModalProps) {
  const [schoolName, setSchoolName] = useState('')
  const [campusCode, setCampusCode] = useState('CJET-IBD')
  const [topology, setTopology] = useState<'composite' | 'standalone' | 'satellite'>('composite')
  const [educationalLevel, setEducationalLevel] = useState('Secondary School (JSS1 - SS3)')
  const [stateOfLocation, setStateOfLocation] = useState('Oyo State')
  const [physicalAddress, setPhysicalAddress] = useState('')
  const [schoolHeadName, setSchoolHeadName] = useState('')
  const [schoolHeadEmail, setSchoolHeadEmail] = useState('')
  const [schoolHeadPhone, setSchoolHeadPhone] = useState('')
  const [seatCapacity, setSeatCapacity] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = {
      schoolName,
      campusCode,
      topology,
      educationalLevel,
      stateOfLocation,
      physicalAddress,
      schoolHeadName,
      schoolHeadEmail,
      schoolHeadPhone,
      seatCapacity: parseInt(seatCapacity),
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    onSubmit(data)
    setIsSubmitting(false)
    handleClose()
  }

  const handleClose = () => {
    // Reset form
    setSchoolName('')
    setCampusCode('CJET-IBD')
    setTopology('composite')
    setEducationalLevel('Secondary School (JSS1 - SS3)')
    setStateOfLocation('Oyo State')
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
                Register a new branch under <strong>Crown Jewel Education Trust</strong>. It will automatically inherit trust-wide settings.
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
                    Campus Code <span className="text-red-500">*</span>
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">Auto-Gen</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <input
                      type="text"
                      value={campusCode}
                      onChange={(e) => setCampusCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Educational Level / Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <select
                      value={educationalLevel}
                      onChange={(e) => setEducationalLevel(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white"
                      required
                    >
                      <option value="Early Years / Nursery (Crèche - Pre-Primary)">Early Years / Nursery (Crèche - Pre-Primary)</option>
                      <option value="Primary School (Basic 1 - Basic 6)">Primary School (Basic 1 - Basic 6)</option>
                      <option value="Secondary School (JSS1 - SS3)">Secondary School (JSS1 - SS3)</option>
                      <option value="Junior Secondary Only (JSS1 - JSS3)">Junior Secondary Only (JSS1 - JSS3)</option>
                      <option value="Senior Secondary Only (SS1 - SS3)">Senior Secondary Only (SS1 - SS3)</option>
                      <option value="Comprehensive (Nursery - SS3)">Comprehensive (Nursery - SS3)</option>
                    </select>
                    <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
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

            {/* Section 3: Location & Address */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  3
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
                      value={stateOfLocation}
                      onChange={(e) => setStateOfLocation(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white"
                      required
                    >
                      <option value="Oyo State">Oyo State</option>
                      <option value="Lagos State">Lagos State</option>
                      <option value="FCT Abuja">FCT Abuja</option>
                      <option value="Kano State">Kano State</option>
                      <option value="Rivers State">Rivers State</option>
                      <option value="Kaduna State">Kaduna State</option>
                      <option value="Ogun State">Ogun State</option>
                      <option value="Anambra State">Anambra State</option>
                      <option value="Delta State">Delta State</option>
                      <option value="Edo State">Edo State</option>
                    </select>
                    <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
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

            {/* Section 4: Initial School Leadership */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  4
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

            {/* Section 5: Capacity Allocation */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  5
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
