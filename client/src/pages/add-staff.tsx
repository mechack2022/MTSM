// ============================================================================
// ADD NEW STAFF PAGE - SCHOOL ADMIN
// ============================================================================
// Material Design 3 compliant staff registration form with:
// - Basic Information section
// - Role & Institutional Assignment
// - Statutory & Professional Credentials
// - System Access & Invitation settings
// ============================================================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader, Sidebar } from '@/components/layout'
import { useRolesForSection, useCreateStaff } from '@/hooks/use-staff'
import { Department, DEPARTMENT_LABELS, HighestQualification, HIGHEST_QUALIFICATION_LABELS, type SchoolSection, type StaffRole, type CreateStaffRequest } from '@/types/staff'

export default function AddStaffPage() {
  const navigate = useNavigate()
  const [selectedSection, setSelectedSection] = useState<SchoolSection>('EARLY_YEARS')
  const [sendCredentials, setSendCredentials] = useState(true)
  const [issueBiometricId, setIssueBiometricId] = useState(true)

  // Fetch roles based on selected section
  const { data: availableRoles, isLoading: loadingRoles } = useRolesForSection(selectedSection)

  // Create staff mutation
  const { mutate: createStaff, isPending: isCreating } = useCreateStaff()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(e.currentTarget)

    // Validate date of birth
    const dobString = formData.get('dob') as string
    if (dobString) {
      const dob = new Date(dobString)
      const today = new Date()
      let age = today.getFullYear() - dob.getFullYear()
      const monthDiff = today.getMonth() - dob.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--
      }

      if (age < 18) {
        alert('Staff member must be at least 18 years old.')
        return
      }

      if (age > 70) {
        alert('Staff member must not be older than 70 years.')
        return
      }
    }

    // Build the CreateStaffRequest object
    const staffData: CreateStaffRequest = {
      // Basic Information
      email: formData.get('work-email') as string,
      firstName: formData.get('first-name') as string,
      lastName: formData.get('last-name') as string,
      phone: formData.get('phone-whatsapp') as string || undefined,
      dateOfBirth: formData.get('dob') as string || undefined,
      gender: (formData.get('gender') as 'MALE' | 'FEMALE' | 'OTHER') || undefined,

      // Next of Kin
      nextOfKin: (formData.get('nok-name') || formData.get('nok-phone') || formData.get('nok-relationship')) ? {
        name: formData.get('nok-name') as string || undefined,
        phone: formData.get('nok-phone') as string || undefined,
        relationship: formData.get('nok-relationship') as string || undefined,
      } : undefined,

      // Role & Assignment
      schoolSection: selectedSection,
      primaryRole: formData.get('primary-role') as StaffRole,
      department: formData.get('department') as Department || undefined,

      // Professional Credentials
      trcnLicenseNumber: formData.get('trcn-number') as string || undefined,
      highestQualification: formData.get('highest-qual') as HighestQualification || undefined,

      // Employment
      employmentType: (formData.get('emp-type') as 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY') || 'FULL_TIME',
      employmentStatus: 'ACTIVE',

      // System settings
      sendInvitationEmail: sendCredentials,
    }

    // Call the API
    createStaff(staffData, {
      onSuccess: (createdStaff) => {
        // Navigate to staff directory on success
        navigate('/staff-directory')
      }
    })
  }

  return (
    <div className="min-h-screen bg-[var(--md-sys-color-surface,#faf8ff)]">
      <Sidebar />

      {/* Main Content */}
      <div className="pl-72">
        <PageHeader />

        {/* Main Content Area */}
        <main className="relative pt-16 bg-[var(--md-sys-color-surface,#faf8ff)] min-h-[calc(100vh-4rem)] flex flex-col justify-between">
          <div className="flex flex-col w-full">
            <div className="px-4 lg:px-10 py-6 w-full max-w-5xl mx-auto space-y-6">
              {/* Breadcrumb & Top Bar Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <nav className="flex items-center gap-2 text-sm text-[var(--md-sys-color-on-surface-variant,#434655)]">
                  <span>Staff Management</span>
                  <svg className="w-4 h-4 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <button
                    onClick={() => navigate('/staff-directory')}
                    className="hover:text-[var(--md-sys-color-primary,#004ac6)] transition-colors"
                  >
                    Staff Directory
                  </button>
                  <svg className="w-4 h-4 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-semibold text-[var(--md-sys-color-primary,#004ac6)]">Add New Staff</span>
                </nav>

                <button
                  onClick={() => navigate('/staff-directory')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-primary,#004ac6)] transition-colors py-1 px-2 rounded-lg hover:bg-[var(--md-sys-color-surface-container,#eaedff)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Staff Directory
                </button>
              </div>

              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-[30px] leading-[38px] font-bold text-[var(--md-sys-color-on-surface,#131b2e)] tracking-tight">
                      Add New Staff Member
                    </h1>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface-variant,#434655)] text-[11px] font-bold uppercase tracking-wide">
                      Lekki Campus 2024/25
                    </span>
                  </div>
                  <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#434655)]">
                    Register a new teaching or non-teaching staff member to Crown Jewel High School - Lekki
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto px-2 py-1 rounded-full bg-[var(--md-sys-color-secondary-container,#86f2e4)]/50 text-[var(--md-sys-color-on-secondary-container,#006f66)]">
                  <svg className="w-4 h-4 text-[var(--md-sys-color-secondary,#006a61)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    All-in-One Campus (Nursery, Primary, JSS, SSS)
                  </span>
                </div>
              </div>

              {/* Main Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] rounded-xl shadow-[0_1px_3px_0_rgba(15,23,42,0.04),0_6px_16px_-4px_rgba(15,23,42,0.03)] p-6 md:p-10 space-y-10">
                  {/* SECTION 1: Basic Information */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="w-7 h-7 rounded-lg bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-on-primary-fixed-variant,#003ea8)]">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                          1. Basic Information
                        </h2>
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Personal details and direct operational contact
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="first-name">
                          First Name <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="first-name"
                          name="first-name"
                          placeholder="e.g. Babatunde"
                          required
                          type="text"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="last-name">
                          Last Name <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="last-name"
                          name="last-name"
                          placeholder="e.g. Adeyemi"
                          required
                          type="text"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="work-email">
                          Institutional Email <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <div className="relative">
                          <svg className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <input
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                            id="work-email"
                            name="work-email"
                            placeholder="b.adeyemi@crownjewel.sch.ng"
                            required
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="phone-whatsapp">
                          Phone Number / WhatsApp <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <div className="relative">
                          <svg className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <input
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                            id="phone-whatsapp"
                            name="phone-whatsapp"
                            placeholder="+234 803 000 0000"
                            required
                            type="tel"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="gender">
                          Gender <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="gender"
                          name="gender"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>Select gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="dob">
                          Date of Birth <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="dob"
                          name="dob"
                          required
                          type="date"
                          min={(() => {
                            const date = new Date()
                            date.setFullYear(date.getFullYear() - 70)
                            return date.toISOString().split('T')[0]
                          })()}
                          max={(() => {
                            const date = new Date()
                            date.setFullYear(date.getFullYear() - 18)
                            return date.toISOString().split('T')[0]
                          })()}
                        />
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Staff must be between 18 and 70 years old
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 1.5: Next of Kin / Emergency Contact */}
                  <section className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="w-7 h-7 rounded-lg bg-[var(--md-sys-color-tertiary-fixed,#ffd9e3)] flex items-center justify-center text-[var(--md-sys-color-on-tertiary-fixed-variant,#5d1227)]">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                          1.5. Next of Kin / Emergency Contact
                        </h2>
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Contact person in case of emergency
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-between" htmlFor="nok-name">
                          <span>Full Name</span>
                          <span className="text-[11px] text-[var(--md-sys-color-on-surface-variant,#434655)]">Optional</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="nok-name"
                          name="nok-name"
                          placeholder="e.g. Mrs. Funmilayo Adeyemi"
                          type="text"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-between" htmlFor="nok-phone">
                          <span>Phone Number</span>
                          <span className="text-[11px] text-[var(--md-sys-color-on-surface-variant,#434655)]">Optional</span>
                        </label>
                        <div className="relative">
                          <svg className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <input
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                            id="nok-phone"
                            name="nok-phone"
                            placeholder="+234 803 000 0000"
                            type="tel"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-between" htmlFor="nok-relationship">
                          <span>Relationship</span>
                          <span className="text-[11px] text-[var(--md-sys-color-on-surface-variant,#434655)]">Optional</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="nok-relationship"
                          name="nok-relationship"
                          defaultValue=""
                        >
                          <option value="">Select relationship</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Parent">Parent</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Child">Child</option>
                          <option value="Friend">Friend</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 2: Role & Institutional Assignment */}
                  <section className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="w-7 h-7 rounded-lg bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-on-primary-fixed-variant,#003ea8)]">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                          2. Role &amp; Institutional Assignment
                        </h2>
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Designation, section, and faculty department
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* School Section Scope pills selection - NOW FIRST */}
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-between">
                          <span>
                            School Section Scope <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                          </span>
                          <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)] font-normal">
                            Choose primary posting
                          </span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                          {[
                            { value: 'EARLY_YEARS' as SchoolSection, icon: 'child_care', label: 'Early Years / Nursery' },
                            { value: 'PRIMARY' as SchoolSection, icon: 'auto_stories', label: 'Primary (Basic 1-6)' },
                            { value: 'JUNIOR_SECONDARY' as SchoolSection, icon: 'menu_book', label: 'Junior Sec. (JSS)' },
                            { value: 'SENIOR_SECONDARY' as SchoolSection, icon: 'school', label: 'Senior Sec. (SSS)' },
                          ].map((section) => (
                            <label
                              key={section.value}
                              className={`relative flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-[var(--md-sys-color-surface-container,#eaedff)] transition-all shadow-sm ${
                                selectedSection === section.value
                                  ? 'bg-[var(--md-sys-color-primary-container,#dbe1ff)] text-[var(--md-sys-color-on-primary-container,#00174b)]'
                                  : 'bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface-variant,#434655)]'
                              }`}
                            >
                              <input
                                className="sr-only"
                                name="school-section"
                                type="radio"
                                value={section.value}
                                checked={selectedSection === section.value}
                                onChange={(e) => setSelectedSection(e.target.value as SchoolSection)}
                              />
                              <span className="material-symbols-outlined text-[20px] mb-1">{section.icon}</span>
                              <span className="text-xs font-semibold text-center">{section.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="primary-role">
                          Primary Role / Designation <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          id="primary-role"
                          name="primary-role"
                          required
                          defaultValue=""
                          disabled={loadingRoles}
                        >
                          <option value="" disabled>
                            {loadingRoles ? 'Loading roles...' : 'Select staff role for selected section'}
                          </option>
                          {availableRoles?.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        {availableRoles && availableRoles.length === 0 && (
                          <p className="text-xs text-amber-600">
                            No roles available for selected section
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="department">
                          Department <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="department"
                          name="department"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>Assign faculty department</option>
                          {Object.entries(Department).map(([key, value]) => (
                            <option key={value} value={value}>
                              {DEPARTMENT_LABELS[value as Department]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 3: Statutory & Professional Credentials */}
                  <section className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="w-7 h-7 rounded-lg bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-on-primary-fixed-variant,#003ea8)]">
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                          3. Statutory &amp; Professional Credentials
                        </h2>
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Lagos State MoE accreditation and teaching credentials
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-between" htmlFor="trcn-number">
                          <span>TRCN Registration No.</span>
                          <span className="text-[11px] text-[var(--md-sys-color-on-surface-variant,#434655)]">Optional</span>
                        </label>
                        <input
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm placeholder:text-[var(--md-sys-color-outline,#737686)] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="trcn-number"
                          name="trcn-number"
                          placeholder="e.g. TRCN/LA/2022/41029"
                          type="text"
                        />
                        <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                          Leave blank if pending or for non-teaching staff
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="highest-qual">
                          Highest Qualification <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="highest-qual"
                          name="highest-qual"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>Select qualification</option>
                          {Object.entries(HighestQualification).map(([key, value]) => (
                            <option key={value} value={value}>
                              {HIGHEST_QUALIFICATION_LABELS[value as HighestQualification]}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-1" htmlFor="emp-type">
                          Employment Type <span className="text-[var(--md-sys-color-error,#ba1a1a)]">*</span>
                        </label>
                        <select
                          className="w-full px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] transition-all"
                          id="emp-type"
                          name="emp-type"
                          required
                          defaultValue="FULL_TIME"
                        >
                          <option value="FULL_TIME">Full-time Regular</option>
                          <option value="PART_TIME">Part-time Specialist</option>
                          <option value="CONTRACT">Fixed-Term Contract</option>
                          <option value="TEMPORARY">Temporary</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  {/* SECTION 4: System Access & Invitation */}
                  <section className="space-y-2 pt-2 bg-[var(--md-sys-color-surface-container-low,#f2f3ff)]/60 rounded-xl p-4">
                    <div className="flex items-center gap-2 pb-2">
                      <svg className="w-5 h-5 text-[var(--md-sys-color-primary,#004ac6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <h2 className="text-lg font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                        4. System Access &amp; Invitation
                      </h2>
                    </div>

                    <div className="space-y-2 pl-1">
                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                          checked={sendCredentials}
                          onChange={(e) => setSendCredentials(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[var(--md-sys-color-primary,#004ac6)] focus:ring-[var(--md-sys-color-primary,#004ac6)] bg-[var(--md-sys-color-surface-container,#eaedff)] border-[var(--md-sys-color-outline-variant,#c3c6d7)]"
                          type="checkbox"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                            Send WhatsApp &amp; Email onboarding credentials automatically
                          </span>
                          <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                            Sends temporary portal passcode and NDPA verification link via SMS / WhatsApp gateway.
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input
                          checked={issueBiometricId}
                          onChange={(e) => setIssueBiometricId(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[var(--md-sys-color-primary,#004ac6)] focus:ring-[var(--md-sys-color-primary,#004ac6)] bg-[var(--md-sys-color-surface-container,#eaedff)] border-[var(--md-sys-color-outline-variant,#c3c6d7)]"
                          type="checkbox"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                            Issue temporary biometric attendance ID
                          </span>
                          <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">
                            Enables immediate staff gate check-in at Lekki Campus terminal ahead of physical card printing.
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>
                </div>

                {/* Action Buttons Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                  <button
                    type="button"
                    onClick={() => navigate('/staff-directory')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm font-semibold text-center hover:bg-[var(--md-sys-color-surface-container-high,#e2e7ff)] transition-all"
                  >
                    Cancel
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-sm font-semibold transition-all"
                      type="button"
                    >
                      Save as Draft
                    </button>

                    <button
                      className="w-full sm:w-auto px-10 py-2.5 rounded-lg bg-[var(--md-sys-color-primary,#004ac6)] text-white text-sm font-semibold shadow-sm hover:bg-[var(--md-sys-color-primary-container,#dbe1ff)] hover:text-[var(--md-sys-color-on-primary-container,#00174b)] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isCreating || loadingRoles}
                    >
                      {isCreating ? (
                        <>
                          <svg className="animate-spin w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Staff...
                        </>
                      ) : (
                        <>
                          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                          Save &amp; Add Staff Member
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Live Edge Sync Badge (Bottom Right) */}
          <div className="fixed bottom-6 right-6 z-50">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--md-sys-color-primary,#004ac6)] text-white shadow-[0_8px_20px_-2px_rgba(37,99,235,0.4),0_2px_6px_-1px_rgba(0,0,0,0.1)] hover:bg-[var(--md-sys-color-primary-container,#dbe1ff)] hover:text-[var(--md-sys-color-on-primary-container,#00174b)] transition-all cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--md-sys-color-secondary-fixed,#89f5e7)] animate-ping"></span>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs font-bold">Live Edge Sync</span>
                <span className="text-[11px] opacity-90">Offline-first active</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
