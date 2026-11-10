// ============================================================================
// ADD NEW CAMPUS BRANCH MODAL - Complete 3-Step Wizard
// ============================================================================
// Modern React implementation with ALL original content preserved
// ============================================================================

import { useState, useMemo } from 'react'

interface AddCampusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: CampusFormData) => void
}

interface CampusFormData {
  // Step 1: Identity
  campusName: string
  subdomain: string
  state: string
  lga: string
  address: string

  // Step 1: Campus Topology
  topology: 'composite' | 'standalone' | 'satellite'

  // Step 1: Educational Tiers
  tiers: {
    earlyYears: boolean
    primaryBasic: boolean
    juniorSecondary: boolean
    seniorSecondary: boolean
  }

  // Step 1: Seat Allocation
  seatAllocation: number

  // Step 1: Leadership
  principalName: string
  principalNIN: string
  principalPhone: string

  // Step 1: Hardware
  nodeId: string

  // Step 2: Tier Capacities
  tierCapacities: {
    earlyYears: number
    primaryBasic: number
    juniorSecondary: number
    seniorSecondary: number
  }

  // Step 2: Curricula
  curricula: {
    cambridgeEarlyYears: boolean
    cambridgePrimaryDual: boolean
    cambridgeLowerSecondary: boolean
    cambridgeIGCSE: boolean
  }

  // Step 2: Fees
  termlyTuition: string
  developmentLevy: string
  ubecRebateEnabled: boolean

  // Step 3: Gates
  gateA: {
    ip: string
    subnet: string
  }
  gateB: {
    ip: string
    subnet: string
  }

  // Step 3: Turnstile Settings
  whatsappDispatch: boolean
  safetyFailOpen: boolean

  // Step 3: Leadership
  principal: {
    name: string
    email: string
    phone: string
  }
  registrar: {
    name: string
    email: string
    phone: string
  }

  // Step 3: Authorization
  trusteePasskey: string
  confirmAllocation: boolean
}

export default function AddCampusModal({ isOpen, onClose, onSubmit }: AddCampusModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [campusName, setCampusName] = useState('Oasis International School, Epe Branch')
  const [subdomain, setSubdomain] = useState('epe')
  const [state, setState] = useState('Lagos State')
  const [lga, setLga] = useState('Epe Local Govt Area')
  const [address, setAddress] = useState('Km 12, Lekki-Epe Expressway, Papa Colony')

  // Campus Topology
  const [topology, setTopology] = useState<'composite' | 'standalone' | 'satellite'>('composite')

  // Educational Tiers
  const [earlyYears, setEarlyYears] = useState(true)
  const [primaryBasic, setPrimaryBasic] = useState(true)
  const [juniorSecondary, setJuniorSecondary] = useState(true)
  const [seniorSecondary, setSeniorSecondary] = useState(true)

  // Seat Allocation
  const [seatAllocation, setSeatAllocation] = useState(500)
  const totalPool = 3000
  const existingAllocations = { lekki: 1120, vi: 860, ikeja: 500 }
  const allocatedSeats = useMemo(() =>
    existingAllocations.lekki + existingAllocations.vi + existingAllocations.ikeja,
    []
  )
  const remainingPool = useMemo(() =>
    totalPool - allocatedSeats - seatAllocation,
    [allocatedSeats, seatAllocation]
  )

  // Leadership
  const [principalName, setPrincipalName] = useState('Mrs. Folasade Bakare-Cole, M.Ed.')
  const [principalNIN, setPrincipalNIN] = useState('NIN-7739-2810-928')
  const [principalPhone, setPrincipalPhone] = useState('803 492 8812')

  // Hardware
  const [nodeId] = useState('CRN-EPE-04')

  // Step 2: Tier Capacities
  const [earlyYearsCapacity] = useState(80)
  const [primaryBasicCapacity] = useState(220)
  const [juniorSecondaryCapacity] = useState(100)
  const [seniorSecondaryCapacity] = useState(100)

  // Step 2: Curricula
  const [cambridgeEarlyYears, setCambridgeEarlyYears] = useState(false)
  const [cambridgePrimaryDual, setCambridgePrimaryDual] = useState(true)
  const [cambridgeLowerSecondary, setCambridgeLowerSecondary] = useState(true)
  const [cambridgeIGCSE, setCambridgeIGCSE] = useState(true)

  // Step 2: Fees
  const [termlyTuition, setTermlyTuition] = useState('450,000')
  const [developmentLevy, setDevelopmentLevy] = useState('50,000')
  const [ubecRebateEnabled, setUbecRebateEnabled] = useState(true)

  // Step 3: Edge Node
  const [edgeNodeId, setEdgeNodeId] = useState('CRN-EPE-01')

  // Step 3: Gates
  const [gateAIp] = useState('192.168.1.101')
  const [gateASubnet] = useState('VLAN-10_SEC')
  const [gateBIp] = useState('192.168.1.102')
  const [gateBSubnet] = useState('VLAN-10_SEC')

  // Step 3: Turnstile Settings
  const [whatsappDispatch, setWhatsappDispatch] = useState(true)
  const [safetyFailOpen, setSafetyFailOpen] = useState(true)

  // Step 3: Leadership
  const [principalNameFinal, setPrincipalNameFinal] = useState('Dr. Alabi Johnson')
  const [principalEmail, setPrincipalEmail] = useState('a.johnson@oasis.edumanage.ng')
  const [principalPhoneFinal, setPrincipalPhoneFinal] = useState('+234 803 234 5678')
  const [registrarName, setRegistrarName] = useState('Mrs. Amina Yusuf')
  const [registrarEmail, setRegistrarEmail] = useState('a.yusuf@oasis.edumanage.ng')
  const [registrarPhone, setRegistrarPhone] = useState('+234 802 987 6543')

  // Step 3: Authorization
  const [trusteePasskey] = useState('OSIS-9821-4820-NG')
  const [confirmAllocation, setConfirmAllocation] = useState(true)

  // Computed values
  const selectedTiersCount = useMemo(() =>
    [earlyYears, primaryBasic, juniorSecondary, seniorSecondary].filter(Boolean).length,
    [earlyYears, primaryBasic, juniorSecondary, seniorSecondary]
  )

  // Handlers
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const formData: CampusFormData = {
      campusName,
      subdomain,
      state,
      lga,
      address,
      topology,
      tiers: { earlyYears, primaryBasic, juniorSecondary, seniorSecondary },
      seatAllocation,
      principalName,
      principalNIN,
      principalPhone,
      nodeId,
      tierCapacities: {
        earlyYears: earlyYearsCapacity,
        primaryBasic: primaryBasicCapacity,
        juniorSecondary: juniorSecondaryCapacity,
        seniorSecondary: seniorSecondaryCapacity,
      },
      curricula: {
        cambridgeEarlyYears,
        cambridgePrimaryDual,
        cambridgeLowerSecondary,
        cambridgeIGCSE,
      },
      termlyTuition,
      developmentLevy,
      ubecRebateEnabled,
      gateA: { ip: gateAIp, subnet: gateASubnet },
      gateB: { ip: gateBIp, subnet: gateBSubnet },
      whatsappDispatch,
      safetyFailOpen,
      principal: {
        name: principalNameFinal,
        email: principalEmail,
        phone: principalPhoneFinal,
      },
      registrar: {
        name: registrarName,
        email: registrarEmail,
        phone: registrarPhone,
      },
      trusteePasskey,
      confirmAllocation,
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1400))

    if (onSubmit) {
      onSubmit(formData)
    }

    setIsSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop overlay - behind modal, will be blurred by modal's backdrop-filter */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal content - uses backdrop-filter to blur what's BEHIND it, not itself */}
      <div className="relative w-full max-w-7xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10">

        {/* ============================================================================ */}
        {/* CONTEXT TRIGGER BANNER */}
        {/* ============================================================================ */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-gray-800 text-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-300 text-lg">alt_route</span>
            <span className="text-xs tracking-wide">
              Triggered from: <span className="text-blue-300 font-semibold">+ Add Campus Branch</span> on Executive Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span className="text-[10px] font-semibold uppercase text-blue-300 tracking-wider">Sovereign Quota: Pool 3,000</span>
          </div>
        </div>

        {/* ============================================================================ */}
        {/* MODAL HEADER */}
        {/* ============================================================================ */}
        <div className="px-8 pt-7 pb-5 bg-gray-50 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-2xl">add_business</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold text-gray-900">Add New Campus Branch</span>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Enclave Provisioning</span>
                </div>
                <p className="text-sm text-gray-600">
                  Oasis Educational Foundation (RC: 940218) • Initializing Shard Partition on Lagos Edge Core
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100/50 text-blue-600 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                FIPS 140-3 HSM Root Active
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg bg-gray-200/60 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
                type="button"
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>

          {/* STEP WIZARD INDICATOR PILLS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {/* Step 1 */}
            <div className={`flex items-center gap-3 p-2.5 rounded-xl ${
              currentStep === 1
                ? 'bg-blue-50 text-blue-600 shadow-sm'
                : currentStep > 1
                ? 'bg-gray-50'
                : 'bg-gray-50 text-gray-600 opacity-75'
            }`}>
              <div className={`w-7 h-7 rounded-lg ${
                currentStep > 1
                  ? 'bg-blue-500 text-white'
                  : currentStep === 1
                  ? 'bg-white text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              } flex items-center justify-center font-bold text-sm shadow-xs`}>
                {currentStep > 1 ? <span className="material-symbols-outlined text-lg">check</span> : '1'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`text-base leading-tight truncate ${
                  currentStep === 1 ? 'text-white' : currentStep > 1 ? 'text-blue-500' : 'text-gray-600'
                }`}>
                  {currentStep > 1 ? 'Step 1: Completed' : 'Step 1: Campus Identity'}
                </span>
                <span className={`text-xs truncate ${
                  currentStep === 1 ? 'text-blue-600/80' : 'text-gray-600'
                }`}>
                  Topology & Legal Structure
                </span>
              </div>
              {currentStep === 1 && (
                <span className="material-symbols-outlined text-white text-base ml-auto">radio_button_checked</span>
              )}
            </div>

            {/* Step 2 */}
            <div className={`flex items-center gap-3 p-2.5 rounded-xl ${
              currentStep === 2
                ? 'bg-blue-50 text-blue-600 shadow-sm'
                : currentStep > 2
                ? 'bg-gray-50'
                : 'bg-gray-50 text-gray-900 shadow-xs'
            }`}>
              <div className={`w-7 h-7 rounded-lg ${
                currentStep > 2
                  ? 'bg-blue-500 text-white'
                  : currentStep === 2
                  ? 'bg-gray-50 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              } flex items-center justify-center font-bold text-sm`}>
                {currentStep > 2 ? <span className="material-symbols-outlined text-lg">check</span> : '2'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`text-base leading-tight truncate ${
                  currentStep === 2 ? 'text-white font-bold' : currentStep > 2 ? 'text-blue-500' : 'text-gray-900'
                }`}>
                  {currentStep > 2 ? 'Step 2: Completed' : currentStep === 2 ? 'Step 2: Active Phase' : 'Step 2: Tier & Quota'}
                </span>
                <span className={`text-xs truncate ${
                  currentStep === 2 ? 'text-blue-600/80' : 'text-gray-600'
                }`}>
                  Trust Pool Allocation
                </span>
              </div>
              {currentStep < 2 && (
                <span className="material-symbols-outlined text-gray-600 text-base ml-auto">pending</span>
              )}
            </div>

            {/* Step 3 */}
            <div className={`flex items-center gap-3 p-2.5 rounded-xl ${
              currentStep === 3
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 opacity-60'
            }`}>
              <div className={`w-7 h-7 rounded-lg ${
                currentStep === 3
                  ? 'bg-gray-50 text-blue-600 font-bold'
                  : 'bg-gray-200 text-gray-600'
              } flex items-center justify-center font-bold text-sm`}>
                {currentStep === 3 ? '3' : <span className="material-symbols-outlined text-base">lock</span>}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`text-base leading-tight truncate ${
                  currentStep === 3 ? 'text-white font-semibold' : 'text-gray-600'
                }`}>
                  {currentStep === 3 ? 'Step 3: ACTIVE PROVISION' : 'Step 3: Queued'}
                </span>
                <span className={`text-xs truncate ${
                  currentStep === 3 ? 'text-blue-600 font-bold' : 'text-gray-600'
                }`}>
                  Local Hardware Pairing
                </span>
              </div>
              {currentStep < 3 && (
                <span className="material-symbols-outlined text-gray-600 text-base ml-auto">lock</span>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================================ */}
        {/* MODAL BODY */}
        {/* ============================================================================ */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 max-h-[calc(85vh-200px)]">

          {/* ========================================================================== */}
          {/* STEP 1: CAMPUS IDENTITY */}
          {/* ========================================================================== */}
          {currentStep === 1 && (
            <>
              {/* SECTION 1: IDENTITY & GEOGRAPHY */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-xl">location_city</span>
                    <h2 className="text-xl text-gray-900">Campus Branch Legal Identity</h2>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">SECTION 1.1</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-900" htmlFor="campusName">
                      Official Branch Designation <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:bg-gray-50 focus:shadow-md transition-all"
                        id="campusName"
                        type="text"
                        value={campusName}
                        onChange={(e) => setCampusName(e.target.value)}
                      />
                      {campusName && (
                        <span className="material-symbols-outlined absolute right-3 top-3 text-blue-500 text-lg">check_circle</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">Will appear on federal UBEC records, report sheets, and statutory filings.</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-900" htmlFor="subdomainSlug">
                      Sovereign Subdomain Router <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden focus-within:bg-gray-50 focus-within:shadow-md transition-all">
                      <span className="px-3 py-3 text-sm text-blue-600 font-bold bg-blue-600/5">https://</span>
                      <input
                        className="w-24 bg-transparent px-1 py-3 text-base text-gray-900 focus:outline-none font-semibold"
                        id="subdomainSlug"
                        type="text"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value)}
                      />
                      <span className="px-3 py-3 text-sm text-gray-600 bg-gray-200/40 truncate">.oasis.edumanage.ng</span>
                    </div>
                    <span className="text-sm text-blue-500">DNS A-Record routes directly to local Lagos edge mirror.</span>
                  </div>
                </div>

                {/* Physical Location Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-900" htmlFor="stateSelect">
                      Federation State <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none appearance-none"
                        id="stateSelect"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option>Lagos State</option>
                        <option>Ogun State</option>
                        <option>Abuja FCT</option>
                        <option>Rivers State</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-gray-600 pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-900" htmlFor="lgaSelect">
                      LGA / District <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none appearance-none"
                        id="lgaSelect"
                        value={lga}
                        onChange={(e) => setLga(e.target.value)}
                      >
                        <option>Epe Local Govt Area</option>
                        <option>Ibeju-Lekki</option>
                        <option>Eti-Osa</option>
                        <option>Ikeja</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-gray-600 pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-900" htmlFor="campusAddress">
                      Campus Street Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="w-full bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:bg-gray-50 focus:shadow-md transition-all"
                      id="campusAddress"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 1.5: CAMPUS TOPOLOGY STRUCTURE */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-xl">account_tree</span>
                    <h2 className="text-xl text-gray-900">Campus Topology & Structural Configuration</h2>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">SECTION 1.2</span>
                </div>

                <p className="text-sm text-gray-600">
                  Select the organizational structure that best describes how this campus operates within your educational trust.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Composite Campus */}
                  <label
                    className={`cursor-pointer transition-all p-5 rounded-xl flex flex-col gap-3 shadow-sm border-2 ${
                      topology === 'composite'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          checked={topology === 'composite'}
                          onChange={() => setTopology('composite')}
                          className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-600"
                          type="radio"
                          name="topology"
                          value="composite"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">All-in-One Composite</span>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">POPULAR</span>
                          </div>
                          <span className="text-xs text-gray-600 block mt-0.5">Multi-tier unified campus</span>
                        </div>
                      </div>
                    </div>
                    <div className="pl-8">
                      <p className="text-sm text-gray-700 mb-3">
                        Single physical campus offering multiple educational stages (Nursery, Primary, JSS, SSS) under one administration and shared infrastructure.
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Shared facilities & resources</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Unified leadership structure</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Continuous learner progression</span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Standalone Campus */}
                  <label
                    className={`cursor-pointer transition-all p-5 rounded-xl flex flex-col gap-3 shadow-sm border-2 ${
                      topology === 'standalone'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          checked={topology === 'standalone'}
                          onChange={() => setTopology('standalone')}
                          className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-600"
                          type="radio"
                          name="topology"
                          value="standalone"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">Standalone Segregated</span>
                          </div>
                          <span className="text-xs text-gray-600 block mt-0.5">Single-tier focused school</span>
                        </div>
                      </div>
                    </div>
                    <div className="pl-8">
                      <p className="text-sm text-gray-700 mb-3">
                        Campus dedicated to only one educational stage (e.g., Primary only, or Secondary only) with specialized infrastructure and focused curriculum delivery.
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Specialized tier focus</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Age-specific facilities</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Targeted pedagogical approach</span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Satellite Campus */}
                  <label
                    className={`cursor-pointer transition-all p-5 rounded-xl flex flex-col gap-3 shadow-sm border-2 ${
                      topology === 'satellite'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          checked={topology === 'satellite'}
                          onChange={() => setTopology('satellite')}
                          className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-600"
                          type="radio"
                          name="topology"
                          value="satellite"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">Satellite/Distributed</span>
                          </div>
                          <span className="text-xs text-gray-600 block mt-0.5">Branch in network</span>
                        </div>
                      </div>
                    </div>
                    <div className="pl-8">
                      <p className="text-sm text-gray-700 mb-3">
                        Campus operating as part of a distributed network under the same proprietorship, sharing policies and branding but with independent location and administration.
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Distributed geographic presence</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Shared policies & curriculum</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="material-symbols-outlined text-blue-600" style={{ fontSize: '16px' }}>check_circle</span>
                          <span>Independent campus leadership</span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Topology Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <span className="material-symbols-outlined text-blue-600 text-xl shrink-0">info</span>
                  <div className="flex-1">
                    <p className="text-sm text-blue-900">
                      <strong>Selected Topology: {topology === 'composite' ? 'All-in-One Composite Campus' : topology === 'standalone' ? 'Standalone Segregated School' : 'Satellite/Distributed Campus'}</strong>
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      {topology === 'composite' && 'This configuration allows you to manage multiple educational tiers (Nursery through Senior Secondary) under a unified administrative structure with shared resources.'}
                      {topology === 'standalone' && 'This configuration focuses on a single educational tier with specialized facilities and targeted curriculum delivery for that specific age group.'}
                      {topology === 'satellite' && 'This configuration operates as part of a larger network, sharing policies and branding while maintaining independent campus operations and leadership.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: EDUCATIONAL TIERS & CURRICULUM */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500 text-xl">school</span>
                    <h2 className="text-xl text-gray-900">Campus Type & Educational Tiers Offered</h2>
                  </div>
                  <span className="text-xs text-blue-500 bg-blue-100/40 px-2.5 py-0.5 rounded-full font-bold">
                    {selectedTiersCount} Tiers Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {/* Tier 1: Early Years */}
                  <label className="cursor-pointer bg-gray-50 hover:bg-gray-200/60 transition-all p-4 rounded-xl flex items-start gap-3 shadow-xs">
                    <input
                      checked={earlyYears}
                      onChange={(e) => setEarlyYears(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-600"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="text-base text-gray-900 font-bold">Early Years</span>
                      <span className="text-sm text-gray-600">Creche, Nursery 1-2, Kindergarten</span>
                      <span className="text-xs text-blue-600 mt-2">EYFS + Reggio Emilia</span>
                    </div>
                  </label>

                  {/* Tier 2: Primary Basic */}
                  <label className="cursor-pointer bg-gray-50 hover:bg-gray-200/60 transition-all p-4 rounded-xl flex items-start gap-3 shadow-xs">
                    <input
                      checked={primaryBasic}
                      onChange={(e) => setPrimaryBasic(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-600"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="text-base text-gray-900 font-bold">Primary Basic</span>
                      <span className="text-sm text-gray-600">Grades 1 through 6 Foundation</span>
                      <span className="text-xs text-blue-500 mt-2">National Core Curriculum</span>
                    </div>
                  </label>

                  {/* Tier 3: Junior Secondary */}
                  <label className="cursor-pointer bg-gray-50 hover:bg-gray-200/60 transition-all p-4 rounded-xl flex items-start gap-3 shadow-xs">
                    <input
                      checked={juniorSecondary}
                      onChange={(e) => setJuniorSecondary(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-600"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="text-base text-gray-900 font-bold">Junior Secondary</span>
                      <span className="text-sm text-gray-600">JSS 1-3 • BECE Exam Terminal</span>
                      <span className="text-xs text-blue-500 mt-2">UBEC Certified</span>
                    </div>
                  </label>

                  {/* Tier 4: Senior Secondary */}
                  <label className="cursor-pointer bg-gray-50 hover:bg-gray-200/60 transition-all p-4 rounded-xl flex items-start gap-3 shadow-xs">
                    <input
                      checked={seniorSecondary}
                      onChange={(e) => setSeniorSecondary(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-600"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="text-base text-gray-900 font-bold">Senior Secondary</span>
                      <span className="text-sm text-gray-600">SSS 1-3 • WAEC & Cambridge</span>
                      <span className="text-xs text-blue-50 mt-2">STEM + Arts Honors</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* SECTION 3: SEAT ALLOCATION SLIDER FROM POOLED TRUST QUOTA */}
              <div className="bg-gray-50 p-6 rounded-xl space-y-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600 text-xl">pie_chart</span>
                      <h3 className="text-xl text-gray-900">Seat Capacity Allocation from Pooled Trust Quota</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Total Trust Licensed Capitation: <strong className="text-gray-900">3,000 Unified Seats</strong> across Lagos Zone
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Allocated to Epe Branch:</span>
                    <div className="bg-blue-600 text-white text-2xl px-4 py-1.5 rounded-xl shadow-sm">
                      <span>{seatAllocation}</span> <span className="text-sm opacity-90">Seats</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Slider */}
                <div className="space-y-2 pt-2">
                  <input
                    className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg cursor-pointer"
                    max="1000"
                    min="100"
                    step="50"
                    type="range"
                    value={seatAllocation}
                    onChange={(e) => setSeatAllocation(parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Min: 100 seats</span>
                    <span className="font-semibold text-blue-600">Slider step: 50 seats</span>
                    <span>Max allocatable: 1,020 seats</span>
                  </div>
                </div>

                {/* Quota breakdown chips */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3">
                  <div className="bg-gray-50 p-3 rounded-lg flex flex-col shadow-xs">
                    <span className="text-xs uppercase text-gray-600">Lekki Crest (Node 01)</span>
                    <span className="text-base text-gray-900 font-bold">1,120 Seats Locked</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex flex-col shadow-xs">
                    <span className="text-xs uppercase text-gray-600">VI Citadel (Node 02)</span>
                    <span className="text-base text-gray-900 font-bold">860 Seats Locked</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex flex-col shadow-xs">
                    <span className="text-xs uppercase text-blue-600 font-bold">Epe New Branch</span>
                    <span className="text-base text-blue-600 font-bold">{seatAllocation} Seats Allocated</span>
                  </div>
                  <div className="bg-gray-200/60 p-3 rounded-lg flex flex-col shadow-xs">
                    <span className="text-xs uppercase text-blue-500 font-bold">Remaining Pool Headroom</span>
                    <span className="text-base text-blue-500 font-bold">{remainingPool} Unallocated</span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: LEADERSHIP DESIGNATION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-xl">badge</span>
                    <h3 className="text-xl text-gray-900">Appoint Founding Head of School / Principal</h3>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">Automated Onboarding</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-900" htmlFor="principalName">
                      Principal Legal Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="w-full bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:bg-gray-50 focus:shadow-md transition-all"
                      id="principalName"
                      type="text"
                      value={principalName}
                      onChange={(e) => setPrincipalName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-900" htmlFor="principalNIN">
                      National Identity Number (NIN) <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:bg-gray-50 focus:shadow-md transition-all"
                        id="principalNIN"
                        type="text"
                        value={principalNIN}
                        onChange={(e) => setPrincipalNIN(e.target.value)}
                      />
                      {principalNIN && (
                        <span className="material-symbols-outlined absolute right-3 top-3 text-blue-500 text-base">verified_user</span>
                      )}
                    </div>
                    <span className="text-sm text-blue-500 font-semibold">NIMC Sovereign Identity Verified</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-900" htmlFor="principalPhone">
                      WhatsApp Phone (Instant Magic Link) <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden focus-within:bg-gray-50 focus-within:shadow-md transition-all">
                      <span className="px-3 py-3 text-sm text-gray-600 bg-gray-200/40">+234</span>
                      <input
                        className="w-full bg-transparent px-3 py-3 text-base text-gray-900 focus:outline-none"
                        id="principalPhone"
                        type="tel"
                        value={principalPhone}
                        onChange={(e) => setPrincipalPhone(e.target.value)}
                      />
                    </div>
                    <span className="text-sm text-gray-600">Will receive encrypted passkey on submission.</span>
                  </div>
                </div>
              </div>

              {/* SECTION 5: EDGE HARDWARE AUTO-PROVISIONING PREVIEW */}
              <div className="bg-gray-100 p-5 rounded-xl space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500 text-xl">hub</span>
                    <span className="text-base text-gray-900 font-bold">Automated Hardware Edge Configuration</span>
                  </div>
                  <span className="text-xs bg-blue-100/60 text-blue-500 font-bold px-2 py-0.5 rounded-full">Auto-Generated Spec</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3.5 rounded-xl shadow-xs flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-2xl">memory</span>
                    <div>
                      <span className="text-xs uppercase text-gray-600">Node Identifier</span>
                      <div className="text-base text-gray-900 font-bold">{nodeId} (Standby)</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3.5 rounded-xl shadow-xs flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-500 text-2xl">storage</span>
                    <div>
                      <span className="text-xs uppercase text-gray-600">SQLite Cache Engine</span>
                      <div className="text-base text-gray-900 font-bold">WAL Mode • 32GB Partition</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3.5 rounded-xl shadow-xs flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-500 text-2xl">fingerprint</span>
                    <div>
                      <span className="text-xs uppercase text-gray-600">Optical Biometrics</span>
                      <div className="text-base text-gray-900 font-bold">2 Gate Turnstiles Ready</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================================================================== */}
          {/* STEP 2: TRUST POOL ALLOCATION & CURRICULA */}
          {/* ========================================================================== */}
          {currentStep === 2 && (
            <>
              {/* Section Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">account_tree</span>
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 font-bold tracking-widest uppercase">SECTION 2.1 CONFIGURATION</span>
                    <h2 className="text-2xl text-gray-900">Academic Tiers & Student Capacity Quota Distribution</h2>
                  </div>
                </div>
                <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full uppercase">
                  Shard Routing ID: SHD-NG-EPE-04
                </span>
              </div>

              {/* 1. Target Campus Designation Readout */}
              <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">location_city</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-gray-900 font-bold truncate">{campusName}</span>
                      <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded shadow-xs">Step 1 Target Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Domain Host: <strong className="text-gray-900 font-mono">{subdomain}.oasis.edumanage.ng</strong></span>
                      <span>•</span>
                      <span>Jurisdiction: {state} / {lga}</span>
                      <span>•</span>
                      <span>Cluster: Lagos Core Edge Alpha</span>
                    </div>
                  </div>
                </div>
                <button
                  className="shrink-0 text-sm text-blue-600 hover:underline flex items-center gap-1"
                  type="button"
                  onClick={() => setCurrentStep(1)}
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Modify Identity
                </button>
              </div>

              {/* 2. Educational Stages & Class Arm Structure Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-base text-gray-900 font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-base">school</span>
                    Educational Stages & Stream Capacity Structuring
                  </label>
                  <span className="text-sm text-gray-600">4 Tiers active for this facility partition</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tier 1: Early Years */}
                  <div className="p-4 bg-gray-50 rounded-xl flex flex-col justify-between space-y-3 shadow-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-200 text-blue-600 flex items-center justify-center text-base font-bold">
                          EY
                        </div>
                        <div>
                          <div className="text-xl text-gray-900">Early Years</div>
                          <div className="text-sm text-gray-600">Creche, Nursery 1-2 & KG1-2</div>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                        {earlyYearsCapacity} Learners Cap
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-lg">
                      <div>
                        <span className="text-xs text-gray-600 uppercase block">Arm Structure</span>
                        <span className="text-sm text-gray-900 font-semibold">2 Streams (Gold, Silver)</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600 uppercase block">Staff Allocation</span>
                        <span className="text-sm text-gray-900">Form Tutor Assigned</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <input
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 accent-blue-600"
                          id="dual-ey"
                          type="checkbox"
                          checked={cambridgeEarlyYears}
                          onChange={(e) => setCambridgeEarlyYears(e.target.checked)}
                        />
                        <label className="text-sm text-gray-900" htmlFor="dual-ey">Cambridge Early Years Framework</label>
                      </div>
                      <span className="text-sm text-blue-600 font-semibold">{earlyYearsCapacity} seats</span>
                    </div>
                  </div>

                  {/* Tier 2: Primary Basic */}
                  <div className="p-4 bg-gray-50 rounded-xl flex flex-col justify-between space-y-3 shadow-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-200 text-blue-500 flex items-center justify-center text-base font-bold">
                          PB
                        </div>
                        <div>
                          <div className="text-xl text-gray-900">Primary Basic (NERDC)</div>
                          <div className="text-sm text-gray-600">Grades: Primary 1 through 6</div>
                        </div>
                      </div>
                      <span className="text-xs bg-blue-100/60 text-blue-600 px-2 py-0.5 rounded font-bold">
                        {primaryBasicCapacity} Learners Cap
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-lg">
                      <div>
                        <span className="text-xs text-gray-600 uppercase block">Arm Structure</span>
                        <span className="text-sm text-gray-900 font-semibold">3 Streams (Arm A, B, C)</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600 uppercase block">Curriculum</span>
                        <span className="text-sm text-gray-900">9-Year Basic NERDC</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <input
                          checked={cambridgePrimaryDual}
                          onChange={(e) => setCambridgePrimaryDual(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 accent-blue-600"
                          id="dual-pb"
                          type="checkbox"
                        />
                        <label className="text-sm text-gray-900 font-medium" htmlFor="dual-pb">Cambridge Primary Dual-Accreditation</label>
                      </div>
                      <span className="text-sm text-blue-600 font-semibold">{primaryBasicCapacity} seats</span>
                    </div>
                  </div>

                  {/* Tier 3: Junior Secondary */}
                  <div className="p-4 bg-gray-50 rounded-xl flex flex-col justify-between space-y-3 shadow-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-200 text-blue-100 flex items-center justify-center text-base font-bold">
                          JS
                        </div>
                        <div>
                          <div className="text-xl text-gray-900">Junior Secondary (JSS 1-3)</div>
                          <div className="text-sm text-gray-600">BECE National & State Examinations</div>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                        {juniorSecondaryCapacity} Learners Cap
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-lg">
                      <div>
                        <span className="text-xs text-gray-600 uppercase block">Arm Structure</span>
                        <span className="text-sm text-gray-900 font-semibold">2 Streams (Emerald, Ruby)</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600 uppercase block">Accreditation</span>
                        <span className="text-sm text-gray-900">Science Lab & BECE Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <input
                          checked={cambridgeLowerSecondary}
                          onChange={(e) => setCambridgeLowerSecondary(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 accent-blue-600"
                          id="dual-js"
                          type="checkbox"
                        />
                        <label className="text-sm text-gray-900 font-medium" htmlFor="dual-js">Cambridge Lower Secondary Dual</label>
                      </div>
                      <span className="text-sm text-blue-600 font-semibold">{juniorSecondaryCapacity} seats</span>
                    </div>
                  </div>

                  {/* Tier 4: Senior Secondary */}
                  <div className="p-4 bg-gray-50 rounded-xl flex flex-col justify-between space-y-3 shadow-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-200 text-blue-600 flex items-center justify-center text-base font-bold">
                          SS
                        </div>
                        <div>
                          <div className="text-xl text-gray-900">Senior Secondary (SSS 1-3)</div>
                          <div className="text-sm text-gray-600">Science, Humanities & Business Tracks</div>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                        {seniorSecondaryCapacity} Learners Cap
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-lg">
                      <div>
                        <span className="text-xs text-gray-600 uppercase block">Tracks Available</span>
                        <span className="text-sm text-gray-900 font-semibold">Science, Arts, Commercial</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600 uppercase block">Assessment Track</span>
                        <span className="text-sm text-gray-900">WAEC / NECO / IGCSE</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <input
                          checked={cambridgeIGCSE}
                          onChange={(e) => setCambridgeIGCSE(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 accent-blue-600"
                          id="dual-ss"
                          type="checkbox"
                        />
                        <label className="text-sm text-gray-900 font-medium" htmlFor="dual-ss">Cambridge IGCSE Dual-Accreditation</label>
                      </div>
                      <span className="text-sm text-blue-600 font-semibold">{seniorSecondaryCapacity} seats</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Live Capacity Rebalancing & Quota Pool Tracker */}
              <div className="bg-gray-200/40 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-xl">analytics</span>
                    <span className="text-xl text-gray-900">Trust Pool Ledger & Live Seat Rebalancing</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full shadow-xs">
                    <span className="text-xs uppercase text-gray-600">Master Foundation Cap:</span>
                    <span className="text-base text-gray-900 font-bold">3,000 Seats</span>
                  </div>
                </div>

                {/* Stacked Capacity Visualizer */}
                <div className="space-y-2">
                  <div className="h-5 w-full bg-gray-50 rounded-full overflow-hidden flex p-1 shadow-inner">
                    {/* VI HQ (1200 / 3000 = 40%) */}
                    <div
                      className="h-full bg-blue-600 rounded-l-full relative group cursor-pointer"
                      style={{ width: '40%' }}
                      title="Victoria Island HQ: 1,200"
                    ></div>
                    {/* Lekki Campus (800 / 3000 = 26.6%) */}
                    <div
                      className="h-full bg-gray-100 relative group cursor-pointer"
                      style={{ width: '26.6%' }}
                      title="Lekki Phase 1: 800"
                    ></div>
                    {/* Ikeja Campus (480 / 3000 = 16%) */}
                    <div
                      className="h-full bg-blue-200 relative group cursor-pointer"
                      style={{ width: '16%' }}
                      title="Ikeja GRA Campus: 480"
                    ></div>
                    {/* Epe New Branch (calculated dynamically) */}
                    <div
                      className="h-full bg-blue-500 relative group cursor-pointer transition-all duration-300"
                      style={{ width: `${(seatAllocation / totalPool) * 100}%` }}
                      title={`Proposed Epe Branch: ${seatAllocation}`}
                    ></div>
                    {/* Buffer (calculated dynamically) */}
                    <div
                      className="h-full bg-blue-100 rounded-r-full"
                      style={{ width: `${(remainingPool / totalPool) * 100}%` }}
                      title={`Free Trust Reserve: ${remainingPool}`}
                    ></div>
                  </div>

                  {/* Legend Pills */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center pt-1">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600 mr-1"></span>
                      <span className="text-sm text-gray-900">VI HQ: <strong>1,200</strong></span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-100 mr-1"></span>
                      <span className="text-sm text-gray-900">Lekki: <strong>800</strong></span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-200 mr-1"></span>
                      <span className="text-sm text-gray-900">Ikeja: <strong>480</strong></span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg shadow-xs ring-1 ring-blue-500/20">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 mr-1 animate-pulse"></span>
                      <span className="text-sm text-blue-500 font-bold">Epe Target: <span>{seatAllocation}</span></span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-100 mr-1"></span>
                      <span className="text-sm text-gray-900">Free Buffer: <strong className="text-blue-500">{remainingPool}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Interactive Allocation Slider with Warning Callout */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-base text-gray-900 font-semibold">Epe Campus Initial Allocation</span>
                      <p className="text-sm text-gray-600">Calculated aggregate sum of 4 educational stages above</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-blue-600 font-bold">{seatAllocation}</span>
                      <span className="text-sm text-gray-600">Seats</span>
                    </div>
                  </div>
                  <input
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    max="520"
                    min="100"
                    type="range"
                    value={seatAllocation}
                    onChange={(e) => setSeatAllocation(parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>MIN COMMITTED: 100</span>
                    <span>TOTAL POOL CEILING: 520 REMAINING IN TRUST</span>
                  </div>
                  <div className="p-3 bg-blue-100/30 rounded-lg flex items-center gap-3 text-blue-600">
                    <span className="material-symbols-outlined text-blue-500 text-xl shrink-0">info</span>
                    <span className="text-sm">
                      Allocating <strong>{seatAllocation}</strong> seats leaves{' '}
                      <strong>{remainingPool}</strong> unallocated floating seats in the foundation pool.
                      High water-mark alert threshold triggers at &lt; 15 free seats.
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Fee Schedule & UBEC Capitation Baseline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Termly Tuition Band */}
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-gray-600 uppercase tracking-wider block">Standard Revenue Base</span>
                    <label className="text-base text-gray-900 font-semibold block mt-1">Termly Tuition Band</label>
                    <p className="text-sm text-gray-600 mt-0.5">Applied to Primary & Secondary</p>
                  </div>
                  <div className="mt-3 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base text-gray-600">₦</span>
                    <input
                      className="w-full bg-gray-50 text-gray-900 text-xl font-semibold rounded-lg pl-8 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      type="text"
                      value={termlyTuition}
                      onChange={(e) => setTermlyTuition(e.target.value)}
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-gray-600">/ TERM</span>
                  </div>
                </div>

                {/* Development Levy */}
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-gray-600 uppercase tracking-wider block">Capital Reserve Fee</span>
                    <label className="text-base text-gray-900 font-semibold block mt-1">Development Levy</label>
                    <p className="text-sm text-gray-600 mt-0.5">One-time student enrolment fee</p>
                  </div>
                  <div className="mt-3 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base text-gray-600">₦</span>
                    <input
                      className="w-full bg-gray-50 text-gray-900 text-xl font-semibold rounded-lg pl-8 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      type="text"
                      value={developmentLevy}
                      onChange={(e) => setDevelopmentLevy(e.target.value)}
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-gray-600">ONCE</span>
                  </div>
                </div>

                {/* UBEC Capitation Grant rebate toggle */}
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-500 uppercase font-bold tracking-wider">Statutory Offset</span>
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-100/60 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                        SUBEB Lagos
                      </span>
                    </div>
                    <span className="text-base text-gray-900 font-semibold block mt-1">UBEC Capitation Grant Rebate</span>
                    <p className="text-sm text-gray-600 mt-0.5">Automatic claim submissions for NERDC enrolled learners</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-sm text-gray-900 font-medium">Rebate Eligibility</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        checked={ubecRebateEnabled}
                        onChange={(e) => setUbecRebateEnabled(e.target.checked)}
                        className="sr-only peer"
                        type="checkbox"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================================================================== */}
          {/* STEP 3: EDGE & TURNSTILES */}
          {/* ========================================================================== */}
          {currentStep === 3 && (
            <>
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-2xl">dns</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl text-gray-900">Local Edge Server & Turnstile Biometrics Integration</h3>
                      <span className="bg-gray-200 text-gray-900 text-xs px-2 py-0.5 rounded-full font-bold">SECTION 3.1 FINAL</span>
                    </div>
                    <p className="text-sm text-gray-600">Pair physical campus appliance node with the sovereign Lagos cloud backbone.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg shadow-sm shrink-0">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-xs text-gray-900 font-bold uppercase tracking-wider">Target: Epe Green Campus</span>
                </div>
              </div>

              {/* 1. Sovereign Shard & Local Edge Daemon */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-xl">hub</span>
                    <h4 className="text-xl text-gray-900">1. Sovereign Shard & Local Edge Daemon</h4>
                  </div>
                  <span className="text-xs bg-blue-100/40 text-blue-500 px-2.5 py-0.5 rounded-full font-bold">SHARD ID: #SHD-005-EPE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Node ID */}
                  <div className="bg-gray-50 p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 uppercase tracking-wider">Edge Hardware Node Pairing</span>
                      <span className="material-symbols-outlined text-blue-500 text-base">verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-mono text-blue-600 font-bold">{edgeNodeId}</div>
                        <span className="text-sm text-gray-600">Auto-generated cryptographically salted handle</span>
                      </div>
                      <button
                        className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-lg text-xs shadow-sm transition-colors"
                        type="button"
                        onClick={() => setEdgeNodeId(`CRN-EPE-${Math.floor(Math.random() * 99) + 1}`.padEnd(11, '0'))}
                      >
                        Regenerate
                      </button>
                    </div>
                  </div>

                  {/* Hardware Type & USB token */}
                  <div className="bg-gray-50 p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 uppercase tracking-wider">Hardware Appliance Profile</span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">Hardware 2FA</span>
                    </div>
                    <div>
                      <div className="text-base text-gray-900 font-semibold">Local Mini-Server / Intel NUC (Edge Appliance)</div>
                      <div className="inline-flex items-center gap-1.5 mt-1 text-blue-500 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">usb</span>
                        Ready for USB Enclave Token pairing
                      </div>
                    </div>
                  </div>
                </div>

                {/* Offline & Replication Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 rounded-xl bg-gray-50/60 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 text-blue-600 shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-xl">database</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-gray-900 font-bold block">Offline-First Storage Engine</span>
                      <span className="text-sm text-gray-600 block mt-0.5">
                        Embedded SQLite VFS with WAL mode enabled (90-day sovereign offline lease). Survives full power & telecom blackout.
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50/60 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 text-blue-500 shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-xl">sync_alt</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-gray-900 font-bold block">Edge Replication Telemetry</span>
                      <span className="text-sm text-gray-600 block mt-0.5">
                        Near-instantaneous (<span className="font-semibold text-blue-500">0.35ms</span> local latency) sync to Lagos Core Shard when broadband or 4G backup is detected.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Optical Flap Turnstiles & Biometrics Gate Controller */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-xl">sensor_occupied</span>
                    <h4 className="text-xl text-gray-900">2. Optical Flap Turnstiles & Biometrics Gate Controller</h4>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full font-bold">2 HARDWARE LANES DISCOVERED</span>
                </div>

                {/* Gates Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gate A */}
                  <div className="p-4 rounded-xl bg-gray-50 flex flex-col justify-between gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base text-gray-900 font-bold">Gate A: Main Campus Portal</span>
                          <span className="text-xs bg-blue-100/50 text-blue-500 px-2 py-0.2 rounded-full font-bold">In & Out</span>
                        </div>
                        <span className="text-sm text-gray-600">ZKTeco / Suprema FIDO biometric face + fingerprint unit</span>
                      </div>
                      <span className="text-xs text-blue-500 bg-blue-100/40 px-2 py-1 rounded-full font-bold flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Ping 1.2ms • Ready
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-sm font-mono text-gray-900 font-semibold">IP: {gateAIp}</span>
                      <span className="text-xs text-gray-600 uppercase">Subnet: {gateASubnet}</span>
                    </div>
                  </div>

                  {/* Gate B */}
                  <div className="p-4 rounded-xl bg-gray-50 flex flex-col justify-between gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base text-gray-900 font-bold">Gate B: Hostel & Staff Wing</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.2 rounded-full font-bold">Dual Turnstile</span>
                        </div>
                        <span className="text-sm text-gray-600">Optical turnstile controller paired with RFID badge reader</span>
                      </div>
                      <span className="text-xs text-blue-500 bg-blue-100/40 px-2 py-1 rounded-full font-bold flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Ping 1.4ms • Ready
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-sm font-mono text-gray-900 font-semibold">IP: {gateBIp}</span>
                      <span className="text-xs text-gray-600 uppercase">Subnet: {gateBSubnet}</span>
                    </div>
                  </div>
                </div>

                {/* Configuration Toggles */}
                <div className="bg-gray-50/60 p-4 rounded-xl space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      checked={whatsappDispatch}
                      onChange={(e) => setWhatsappDispatch(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="text-base text-gray-900 font-semibold">Live WhatsApp Biometric Tap Dispatch</span>
                      <span className="text-sm text-gray-600">
                        Auto-trigger instant WhatsApp notifications to verified parents/guardians upon pupil morning gate tap and afternoon dismissal.
                      </span>
                    </div>
                  </label>
                  <div className="h-px bg-gray-200"></div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      checked={safetyFailOpen}
                      onChange={(e) => setSafetyFailOpen(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                      type="checkbox"
                    />
                    <div className="flex flex-col">
                      <span className="text-base text-gray-900 font-semibold">Safety Fail-Open Bypass</span>
                      <span className="text-sm text-gray-600">
                        Turnstile barriers fail-open automatically on auxiliary power loss, generator switchover surge, or active central fire alarm relay trigger.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* 3. Founding Campus Leadership Assignment */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-xl">badge</span>
                    <h4 className="text-xl text-gray-900">3. Founding Campus Leadership Assignment</h4>
                  </div>
                  <span className="text-xs bg-blue-600/10 text-blue-600 px-2.5 py-0.5 rounded-full font-bold">AUTOMATED MAGIC LINK DISPATCH</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Principal */}
                  <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-blue-600 text-lg">school</span> Head of School / Principal
                      </span>
                      <span className="text-xs text-blue-500 bg-blue-100/40 px-2 py-0.5 rounded-full font-semibold">Full Tier Access</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-gray-600 uppercase block mb-1">Full Legal Name</label>
                        <input
                          className="w-full bg-gray-50 px-3 py-2 rounded-lg text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          type="text"
                          value={principalNameFinal}
                          onChange={(e) => setPrincipalNameFinal(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 uppercase block mb-1">Official Institutional Email</label>
                        <input
                          className="w-full bg-gray-50 px-3 py-2 rounded-lg text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          type="email"
                          value={principalEmail}
                          onChange={(e) => setPrincipalEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 uppercase block mb-1">WhatsApp Authorization Mobile</label>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
                          <span className="material-symbols-outlined text-blue-500 text-base">chat</span>
                          <input
                            className="w-full bg-transparent text-base text-gray-900 focus:outline-none"
                            type="tel"
                            value={principalPhoneFinal}
                            onChange={(e) => setPrincipalPhoneFinal(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Registrar */}
                  <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-blue-600 text-lg">edit_note</span> Campus Registrar / Admissions
                      </span>
                      <span className="text-xs text-blue-600 bg-blue-600/10 px-2 py-0.5 rounded-full font-semibold">Admissions RBAC</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-gray-600 uppercase block mb-1">Full Legal Name</label>
                        <input
                          className="w-full bg-gray-50 px-3 py-2 rounded-lg text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          type="text"
                          value={registrarName}
                          onChange={(e) => setRegistrarName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 uppercase block mb-1">Official Institutional Email</label>
                        <input
                          className="w-full bg-gray-50 px-3 py-2 rounded-lg text-base text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          type="email"
                          value={registrarEmail}
                          onChange={(e) => setRegistrarEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 uppercase block mb-1">WhatsApp Authorization Mobile</label>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
                          <span className="material-symbols-outlined text-blue-500 text-base">chat</span>
                          <input
                            className="w-full bg-transparent text-base text-gray-900 focus:outline-none"
                            type="tel"
                            value={registrarPhone}
                            onChange={(e) => setRegistrarPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Trustee Authorization & Cryptographic Sign-off */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-xl">encrypted</span>
                    <h4 className="text-xl text-gray-900">4. Trustee Authorization & Cryptographic Sign-off</h4>
                  </div>
                  <span className="text-xs bg-blue-100/40 text-blue-500 px-2.5 py-0.5 rounded-full font-bold">SOVEREIGN QUORUM REQUIRED</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-gray-600 uppercase block">Master Trustee Passkey / Hardware FIDO PIN</label>
                    <div className="relative flex items-center">
                      <input
                        className="w-full bg-gray-50 px-3.5 py-2.5 rounded-lg font-mono text-xl tracking-widest text-gray-900 shadow-sm focus:outline-none"
                        readOnly
                        type="password"
                        value={trusteePasskey}
                      />
                      <div className="absolute right-3 flex items-center gap-1.5 text-blue-500 text-sm font-bold">
                        <span className="material-symbols-outlined text-lg">verified_user</span> Verified
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3 shrink-0 shadow-sm">
                    <div className="w-9 h-9 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                      AA
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900 font-semibold">Dr. Adebayo Adeleke</span>
                      <span className="text-sm text-blue-500 font-medium">HSM Root Token Plugged In</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 cursor-pointer">
                  <input
                    checked={confirmAllocation}
                    onChange={(e) => setConfirmAllocation(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="text-base text-gray-900">
                    I hereby confirm allocation of <strong>{seatAllocation} seats</strong> and immediate cryptographic authorization of{' '}
                    <strong>Epe Branch Enclave</strong> on the sovereign Oasis mesh.
                  </span>
                </label>
              </div>
            </>
          )}

        </div>

        {/* ============================================================================ */}
        {/* MODAL FOOTER ACTIONS */}
        {/* ============================================================================ */}
        <div className="px-8 py-5 bg-gray-50 flex flex-wrap items-center justify-between gap-4 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-600 text-lg">info</span>
            <span className="text-sm text-gray-600">
              {currentStep === 3
                ? 'Upon instantiation, DNS records are propagated and WhatsApp onboarding credentials are dispatched immediately to appointed leadership.'
                : 'Trustee authorization key required on step 3 for cryptographically signed shard deployment.'
              }
            </span>
          </div>
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                className="px-5 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-200 text-gray-900 text-base shadow-xs transition-colors flex items-center gap-2"
                type="button"
                onClick={handleBack}
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Back to Step {currentStep - 1}
              </button>
            )}
            <button
              className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-200 text-gray-900 text-base shadow-xs transition-colors flex items-center gap-2"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">bookmark</span>
              Save Draft Enclave
            </button>
            {currentStep < 3 ? (
              <button
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                type="button"
                onClick={handleNext}
              >
                <span>Proceed to {currentStep === 1 ? 'Edge Hardware Pairing' : 'Edge & Turnstiles'} (Step {currentStep + 1})</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            ) : (
              <button
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xl shadow-md transition-all ${
                  isSubmitting
                    ? 'bg-gray-100 text-gray-600 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg active:scale-[0.99]'
                }`}
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                    <span>Allocating Cryptographic Keys...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">bolt</span>
                    <span>Provision & Instantiate Campus Enclave</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
