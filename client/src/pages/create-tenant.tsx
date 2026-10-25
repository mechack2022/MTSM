// ============================================================================
// CREATE TENANT ORGANIZATION PAGE - Super Admin
// ============================================================================
// Full-featured tenant creation form with routing preview and subscription tiers

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ============================================================================
// COMPONENT
// ============================================================================

export default function CreateTenantPage() {
  const navigate = useNavigate()

  // Form state
  const [tenantName, setTenantName] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [cacNumber, setCacNumber] = useState('')
  const [subdomain, setSubdomain] = useState('crownjewel')
  const [state, setState] = useState('lagos')
  const [physicalAddress, setPhysicalAddress] = useState('')
  const [contactName, setContactName] = useState('')
  const [roleTitle, setRoleTitle] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [subscriptionTier, setSubscriptionTier] = useState('standard')
  const [studentQuota, setStudentQuota] = useState(1500)
  const [billingCycle, setBillingCycle] = useState('annual')

  // UI state
  const [subdomainTouched, setSubdomainTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Generated credentials (would come from API response)
  const [generatedCredentials, setGeneratedCredentials] = useState({
    adminName: '',
    adminEmail: '',
    tempPassword: '',
    portalUrl: '',
  })

  // Auto-generate subdomain from tenant name
  useEffect(() => {
    if (!subdomainTouched && tenantName) {
      const clean = tenantName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 15)
      if (clean.length > 0) {
        setSubdomain(clean)
      }
    }
  }, [tenantName, subdomainTouched])

  // Handle subdomain input
  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setSubdomain(val)
  }

  // Handle short code input
  const handleShortCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    setShortCode(val)
  }

  // Check subdomain availability
  const isSubdomainValid = subdomain.length > 2

  // Copy to clipboard handler
  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // WhatsApp share handler
  const handleWhatsAppShare = () => {
    const message = `🎓 *EduManage Platform Access*

🏫 *Organization:* ${tenantName}
🌐 *Portal URL:* ${generatedCredentials.portalUrl}

👤 *Administrator:* ${generatedCredentials.adminName}
📧 *Email/Username:* ${generatedCredentials.adminEmail}
🔑 *Temporary Password:* ${generatedCredentials.tempPassword}

⚠️ *Security Notice:* This password expires in 48 hours. Please login and change immediately.

Powered by EduManage Nigeria`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate dummy credentials (would come from API response)
      const tempPassword = `Edu${Math.random().toString(36).substring(2, 10)}#${Math.floor(Math.random() * 100)}`
      setGeneratedCredentials({
        adminName: contactName,
        adminEmail: contactEmail,
        tempPassword: tempPassword,
        portalUrl: `https://${subdomain}.edumanage.ng`,
      })

      setIsSuccess(true)
    }, 1500)
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
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>System Users / Admins</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Academic Calendars</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>System Audit Logs</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Platform Settings</span>
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
              <span className="text-xs font-semibold text-gray-900 leading-tight">Local Cache Ready</span>
              <span className="text-[11px] text-green-600 leading-tight">Sync buffer active (NG-Fed)</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-sm z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <div className="relative w-full">
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:outline-none focus:bg-gray-50 transition-colors"
                placeholder="Search schools, administrators, decrees, logs (Cmd + K)..."
                type="search"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wide">System Healthy</span>
            </div>

            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="text-sm font-semibold text-gray-900 leading-tight">Dr. Farouk Bello</span>
                <span className="text-xs text-gray-500 leading-tight">Super Admin • Federal Oversight</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full pt-16 px-6 py-6 flex-1 bg-white">
          <div className="flex flex-col w-full">
            <div className="max-w-6xl mx-auto w-full pb-12">
              {/* Top Action / Context Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-col">
                  <button
                    onClick={() => navigate('/tenants')}
                    className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline transition-all mb-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Tenants</span>
                  </button>
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Create Tenant Organization</h1>
                  <p className="text-sm text-gray-600 mt-0.5">Register a new educational organization, trust, or school board across the federation.</p>
                </div>

                <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl shadow-sm">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Jurisdiction</span>
                    <span className="text-xs font-semibold text-gray-900">Federal Ministry of Education Registry (CAC Linked)</span>
                  </div>
                </div>
              </div>

              {/* Main Grid Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Primary Form Column */}
                <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-6">
                  {/* SECTION 1: Organization Details */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 mb-6 bg-gray-50 -mx-6 -mt-6 px-6 pt-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-lg font-semibold text-gray-900">1. Organization Details</h2>
                          <span className="text-xs text-gray-500">Entity records and DNS routing identifier</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold uppercase">Identity</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Tenant Name */}
                      <div className="md:col-span-2 flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="tenantName">
                          Tenant Organization Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          id="tenantName"
                          placeholder="e.g. Crown Jewel Education Trust"
                          required
                          type="text"
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                        />
                        <span className="text-xs text-gray-500">The legal operating trust or consolidated school board name.</span>
                      </div>

                      {/* Short Code */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="shortCode">
                          Organization Short Code <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="w-full uppercase px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm tracking-wider focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          id="shortCode"
                          maxLength={8}
                          placeholder="e.g. CJET"
                          required
                          type="text"
                          value={shortCode}
                          onChange={handleShortCodeChange}
                        />
                        <span className="text-xs text-gray-500">2-6 letters used in student IDs & voucher stamps.</span>
                      </div>

                      {/* CAC Number */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-gray-700" htmlFor="cacNumber">CAC Registration Number</label>
                          <span className="text-[10px] font-bold text-gray-500 uppercase">Optional</span>
                        </div>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          id="cacNumber"
                          placeholder="e.g. RC-1849204"
                          type="text"
                          value={cacNumber}
                          onChange={(e) => setCacNumber(e.target.value)}
                        />
                        <span className="text-xs text-gray-500">Corporate Affairs Commission accreditation reference.</span>
                      </div>

                      {/* Subdomain */}
                      <div className="md:col-span-2 flex flex-col gap-1.5 pt-2">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="subdomainInput">
                          Platform Subdomain & Routing URL <span className="text-red-600">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-gray-100 rounded-lg p-1.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                          <div className="flex items-center flex-1 px-2.5 py-1">
                            <span className="text-sm text-gray-500 select-none">https://</span>
                            <input
                              className="w-full bg-transparent text-blue-600 text-lg font-semibold px-1.5 focus:outline-none lowercase"
                              id="subdomainInput"
                              placeholder="slug"
                              required
                              type="text"
                              value={subdomain}
                              onChange={handleSubdomainChange}
                              onFocus={() => setSubdomainTouched(true)}
                            />
                          </div>
                          <div className="flex items-center justify-between gap-3 bg-gray-200 px-3 py-1.5 rounded-md">
                            <span className="text-xs font-semibold text-gray-900 font-mono select-none">.edumanage.ng</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isSubdomainValid
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isSubdomainValid ? 'bg-green-600' : 'bg-red-600'}`}></span>
                              {isSubdomainValid ? 'Available' : 'Too short'}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">Tenant users will authenticate directly via this enterprise address.</span>
                      </div>

                      {/* State */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="stateSelect">
                          Primary State / Region <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            id="stateSelect"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option value="">Select Federal State...</option>
                            <option value="lagos">Lagos State</option>
                            <option value="fct">Abuja (FCT)</option>
                            <option value="rivers">Rivers State</option>
                            <option value="oyo">Oyo State</option>
                            <option value="kano">Kano State</option>
                            <option value="kaduna">Kaduna State</option>
                            <option value="enugu">Enugu State</option>
                            <option value="edo">Edo State</option>
                            <option value="ogun">Ogun State</option>
                          </select>
                          <svg className="w-5 h-5 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Official Address */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="physicalAddress">
                          Official Headquarters Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          id="physicalAddress"
                          placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                          required
                          type="text"
                          value={physicalAddress}
                          onChange={(e) => setPhysicalAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Tenant Administrator / Contact Information */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 mb-6 bg-gray-50 -mx-6 -mt-6 px-6 pt-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-lg font-semibold text-gray-900">2. Tenant Administrator / Contact Information</h2>
                          <span className="text-xs text-gray-500">The root custodian receiving primary administration credentials</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold uppercase">Security Principal</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Contact Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="contactName">
                          Primary Contact Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          id="contactName"
                          placeholder="e.g. Dr. Aliyu Mohammed"
                          required
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                        />
                      </div>

                      {/* Role Title */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="roleTitle">
                          Administrator Role Title <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                          id="roleTitle"
                          placeholder="e.g. Managing Director / Lead Proprietor"
                          required
                          type="text"
                          value={roleTitle}
                          onChange={(e) => setRoleTitle(e.target.value)}
                        />
                      </div>

                      {/* Contact Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="contactEmail">
                          Official Institutional Email <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                          <input
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            id="contactEmail"
                            placeholder="admin@crownjewel-edu.ng"
                            required
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                          />
                        </div>
                        <span className="text-xs text-gray-500">Activation handshake & MFA credentials dispatched here.</span>
                      </div>

                      {/* Contact Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="contactPhone">
                          Phone Number (Nigerian Mobile) <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 select-none">+234</span>
                          <input
                            className="w-full pl-14 pr-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            id="contactPhone"
                            placeholder="803 123 4567"
                            required
                            type="tel"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                          />
                        </div>
                        <span className="text-xs text-gray-500">Used for critical SMS alert fallbacks and tier escalations.</span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Subscription Plan & Capacity Allocation */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 mb-6 bg-gray-50 -mx-6 -mt-6 px-6 pt-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-lg font-semibold text-gray-900">3. Subscription Plan & Allocation</h2>
                          <span className="text-xs text-gray-500">Tenant multi-tenant license caps and renewal terms</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-bold uppercase">Licensing</span>
                    </div>

                    {/* Tier Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {/* Basic Tier */}
                      <label className={`cursor-pointer relative flex flex-col justify-between p-4 rounded-xl transition-all ${
                        subscriptionTier === 'basic' ? 'bg-blue-100 shadow-sm' : 'bg-gray-100 hover:bg-gray-200'
                      }`}>
                        <input
                          className="sr-only"
                          name="subscription_tier"
                          type="radio"
                          value="basic"
                          checked={subscriptionTier === 'basic'}
                          onChange={(e) => setSubscriptionTier(e.target.value)}
                        />
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-semibold text-gray-900">Basic</span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            subscriptionTier === 'basic' ? 'bg-blue-600' : 'bg-gray-300'
                          }`}>
                            {subscriptionTier === 'basic' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 mb-4">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cap Limit</span>
                          <span className="text-2xl font-bold text-gray-900 leading-none">500</span>
                          <span className="text-xs text-gray-500">Enrolled students cap</span>
                        </div>
                        <div className="pt-3 flex items-center gap-1.5 text-gray-600 text-xs">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Single region cloud</span>
                        </div>
                      </label>

                      {/* Standard Tier */}
                      <label className={`cursor-pointer relative flex flex-col justify-between p-4 rounded-xl transition-all ${
                        subscriptionTier === 'standard' ? 'bg-blue-100 shadow-sm' : 'bg-gray-100 hover:bg-gray-200'
                      }`}>
                        <input
                          className="sr-only"
                          name="subscription_tier"
                          type="radio"
                          value="standard"
                          checked={subscriptionTier === 'standard'}
                          onChange={(e) => setSubscriptionTier(e.target.value)}
                        />
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg font-semibold text-blue-600">Standard</span>
                            <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase">Popular</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            subscriptionTier === 'standard' ? 'bg-blue-600' : 'bg-gray-300'
                          }`}>
                            {subscriptionTier === 'standard' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 mb-4">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Cap Limit</span>
                          <span className="text-2xl font-bold text-blue-600 leading-none">2,000</span>
                          <span className="text-xs text-gray-500">Enrolled students cap</span>
                        </div>
                        <div className="pt-3 flex items-center gap-1.5 text-gray-600 text-xs">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                          <span>Multi-region replication</span>
                        </div>
                      </label>

                      {/* Enterprise Tier */}
                      <label className={`cursor-pointer relative flex flex-col justify-between p-4 rounded-xl transition-all ${
                        subscriptionTier === 'enterprise' ? 'bg-blue-100 shadow-sm' : 'bg-gray-100 hover:bg-gray-200'
                      }`}>
                        <input
                          className="sr-only"
                          name="subscription_tier"
                          type="radio"
                          value="enterprise"
                          checked={subscriptionTier === 'enterprise'}
                          onChange={(e) => setSubscriptionTier(e.target.value)}
                        />
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-semibold text-gray-900">Enterprise</span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            subscriptionTier === 'enterprise' ? 'bg-blue-600' : 'bg-gray-300'
                          }`}>
                            {subscriptionTier === 'enterprise' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 mb-4">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cap Limit</span>
                          <span className="text-2xl font-bold text-gray-900 leading-none">Unlimited</span>
                          <span className="text-xs text-gray-500">Custom capacity pool</span>
                        </div>
                        <div className="pt-3 flex items-center gap-1.5 text-gray-600 text-xs">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Dedicated offline sync nodes</span>
                        </div>
                      </label>
                    </div>

                    {/* Seat Quota and Billing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Student Quota */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="studentQuota">
                          Student Seat Quota Allocation <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <input
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-lg font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            id="studentQuota"
                            min={50}
                            required
                            step={50}
                            type="number"
                            value={studentQuota}
                            onChange={(e) => setStudentQuota(parseInt(e.target.value))}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 select-none">Seats</span>
                        </div>
                        <span className="text-xs text-gray-500">Configurable tenant capacity pool across prospective campuses.</span>
                      </div>

                      {/* Billing Cycle */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-700" htmlFor="billingCycle">
                          Billing Cadence / Cycle <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            id="billingCycle"
                            required
                            value={billingCycle}
                            onChange={(e) => setBillingCycle(e.target.value)}
                          >
                            <option value="annual">Annual Prepaid (Discounted Federation Rate)</option>
                            <option value="termly">Termly (3 Installments per Academic Year)</option>
                            <option value="biannual">Bi-Annual Institutional Agreement</option>
                          </select>
                          <svg className="w-5 h-5 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-500">Invoicing terms synchronized with federal academic calendars.</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons & System Notification Banner */}
                  <div className="bg-gray-100 rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex items-start gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs leading-relaxed">
                        <strong className="font-semibold text-gray-900">Immediate Automated Dispatch:</strong>
                        {' '}An automated activation email containing a secure 48-hour cryptographic token and temporary root login credentials will be dispatched to the primary tenant contact upon completion.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => navigate('/tenants')}
                        className="px-6 py-2.5 rounded-lg text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || isSuccess}
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold shadow-sm transition-all ${
                          isSuccess
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Provisioning Tenant Shard...</span>
                          </>
                        ) : isSuccess ? (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Tenant Created Successfully</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Create & Provision Tenant</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Sidebar - Routing Preview & Policy Context */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  {/* Live Topology Card */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-900">Routing Preview</span>
                        <span className="text-xs text-gray-500">Cluster allocation preview</span>
                      </div>
                    </div>

                    {/* Topology Diagram */}
                    <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        <span>National Node</span>
                        <span className="text-green-600 font-mono">NG-LOS-DC1</span>
                      </div>

                      <div className="w-full flex items-center justify-center py-2">
                        <svg className="text-blue-600 w-full max-w-[220px]" fill="none" height="70" viewBox="0 0 240 70" width="240">
                          <rect fill="currentColor" fillOpacity="0.1" height="54" rx="8" width="60" x="10" y="8"></rect>
                          <text className="fill-current text-[11px] font-sans font-bold" textAnchor="middle" x="40" y="38">Federal HQ</text>
                          <path d="M 70 35 L 170 35" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2"></path>
                          <rect fill="currentColor" fillOpacity="0.8" height="54" rx="8" width="60" x="170" y="8"></rect>
                          <text className="text-[10px] font-sans font-semibold" fill="#ffffff" textAnchor="middle" x="200" y="32">New Tenant</text>
                          <text className="text-[8px] font-mono opacity-80" fill="#ffffff" textAnchor="middle" x="200" y="46">{shortCode || 'CJET'}</text>
                        </svg>
                      </div>

                      <div className="bg-white p-2.5 rounded text-left flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-gray-500 uppercase">Active Primary Hostname</span>
                        <span className="text-xs font-semibold text-blue-600 truncate">{subdomain || 'crownjewel'}.edumanage.ng</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center gap-2 text-gray-600 text-xs">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Dedicated tenant database shard isolation</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-xs">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Pre-seeded Nigerian Federal curriculum tags</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-xs">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Encrypted offline sync keys generation</span>
                      </div>
                    </div>
                  </div>

                  {/* Scope & Rules Disclaimer */}
                  <div className="bg-gray-100 rounded-xl p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-gray-900">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-lg font-semibold">Tenant Boundaries</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This module registers only the top-level legal entity or district trust. Individual schools, campuses, and physical learning sites are created downstream by the designated Tenant Administrator through their dedicated tenant console.
                    </p>
                    <div className="mt-2 pt-3 flex items-center justify-between text-gray-500">
                      <span className="text-[10px] font-bold uppercase">EduManage Multi-Tenancy v4.2</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Status Badge */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-blue-600 text-white shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-xs font-semibold">Online & Synced</span>
          <span className="text-[10px] font-bold text-blue-200">Offline-first ready</span>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
            {/* Decorative Top Bar */}
            <div className="h-2 bg-gradient-to-r from-green-500 via-blue-500 to-green-500"></div>

            {/* Close Button */}
            <button
              onClick={() => navigate('/tenants')}
              className="absolute top-5 right-5 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Success Header */}
              <div className="flex flex-col items-center text-center mb-8">
                {/* Animated Success Emblem */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500"></span>
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider">Provisioning Completed</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tenant Successfully Created!</h2>
                <p className="text-sm text-gray-600">The organizational shard has been isolated and is now ready for deployment.</p>
              </div>

              {/* Institutional Profile Summary */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Institutional Profile
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500">Tenant Name</span>
                    <span className="text-sm font-semibold text-gray-900">{tenantName}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500">Tenant Code</span>
                    <span className="text-sm font-mono font-bold text-blue-600">{shortCode}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500">Subscription</span>
                    <span className="text-sm font-semibold text-gray-900 capitalize">
                      {subscriptionTier} Plan ({studentQuota.toLocaleString()} seats)
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-500">Portal URL</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-blue-600 truncate">{generatedCredentials.portalUrl}</span>
                      <button
                        onClick={() => handleCopy(generatedCredentials.portalUrl, 'url')}
                        className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                        title="Copy URL"
                      >
                        {copiedField === 'url' ? (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Root Admin Credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Root Tenant Admin Credentials</h3>
                    <p className="text-xs text-gray-600">Securely share these credentials with the designated administrator.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Admin Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Admin Full Name</label>
                    <div className="px-4 py-2.5 rounded-lg bg-white border border-gray-200">
                      <span className="text-sm font-semibold text-gray-900">{generatedCredentials.adminName}</span>
                    </div>
                  </div>

                  {/* Admin Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Admin Email / Username</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-gray-200">
                        <span className="text-sm font-mono text-gray-900">{generatedCredentials.adminEmail}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(generatedCredentials.adminEmail, 'email')}
                        className="p-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                        title="Copy Email"
                      >
                        {copiedField === 'email' ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Temporary Password */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Temporary Password</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-gray-200 flex items-center gap-2">
                        <span className="flex-1 text-sm font-mono text-gray-900">
                          {showPassword ? generatedCredentials.tempPassword : '••••••••••••'}
                        </span>
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() => handleCopy(generatedCredentials.tempPassword, 'password')}
                        className="p-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                        title="Copy Password"
                      >
                        {copiedField === 'password' ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 48-Hour Expiry Warning */}
                <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-amber-900 mb-0.5">Security Notice: 48-Hour Expiry</p>
                    <p className="text-xs text-amber-700">This temporary password will expire in 48 hours. The administrator must login and set a permanent password immediately.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Share via WhatsApp</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/tenants')}
                    className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back to Tenant List
                  </button>
                  <button
                    onClick={() => navigate('/tenants')}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Tenant Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
