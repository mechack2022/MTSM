// ============================================================================
// ADD NEW TEACHING ASSIGNMENT MODAL - DYNAMIC BY SCHOOL SECTION
// ============================================================================
// Material Design 3 modal for creating teaching assignments with:
// - Dynamic subjects based on school section (Early Years, Primary, JSS, SSS)
// - Dynamic class streams per section
// - Educator workload calculation
// - Real-time period allocation
// - NERDC compliance checking
// ============================================================================

import { useState, useEffect } from 'react'

// ============================================================================
// DATA STRUCTURES - DYNAMIC BY SCHOOL SECTION
// ============================================================================

const EDUCATORS = [
  {
    id: 'yusuf',
    name: 'Engr. Yusuf Bello',
    title: 'SSS Physics Specialist',
    currentLoad: 12,
    maxLoad: 20,
    department: 'Senior Secondary STEM',
    specialty: 'Physics',
  },
  {
    id: 'patience',
    name: 'Mrs. Patience E. Okon',
    title: 'Primary 4 Emerald Lead',
    currentLoad: 16,
    maxLoad: 22,
    department: 'Primary Section',
    specialty: 'Emerald Form',
  },
  {
    id: 'babatunde',
    name: 'Mr. Babatunde Lawal',
    title: 'Primary 4 Gold Specialist',
    currentLoad: 18,
    maxLoad: 22,
    department: 'Primary Section',
    specialty: 'Mathematics',
  },
  {
    id: 'nwachukwu',
    name: 'Mr. C. Nwachukwu',
    title: 'Computer Studies & STEM Coordinator',
    currentLoad: 8,
    maxLoad: 18,
    department: 'Junior & Senior STEM',
    specialty: 'Computer Studies',
  },
  {
    id: 'amaka',
    name: 'Ms. Amaka Adeleke',
    title: 'SSS English & Literature',
    currentLoad: 14,
    maxLoad: 20,
    department: 'Languages Dept',
    specialty: 'English Specialist',
  },
]

// School Section Types
type SchoolSection = 'nursery' | 'primary' | 'jss' | 'sss'

// Subjects by School Section
const SUBJECTS_BY_SECTION: Record<SchoolSection, Array<{ value: string; label: string; code: string }>> = {
  nursery: [
    { value: 'early-literacy', label: 'Early Literacy & Phonics', code: 'ELT-101' },
    { value: 'numeracy', label: 'Numeracy & Pre-Math Concepts', code: 'NUM-101' },
    { value: 'creative-arts', label: 'Creative Arts & Expression', code: 'ART-101' },
    { value: 'physical-dev', label: 'Physical Development & Movement', code: 'PHY-101' },
    { value: 'social-skills', label: 'Social & Emotional Skills', code: 'SOC-101' },
    { value: 'rhymes-songs', label: 'Rhymes, Songs & Music', code: 'MUS-101' },
    { value: 'nature-explore', label: 'Nature Exploration & Discovery', code: 'SCI-101' },
  ],
  primary: [
    { value: 'english', label: 'English Language & Comprehension', code: 'ENG-201' },
    { value: 'mathematics', label: 'General Mathematics (Primary)', code: 'MTH-201' },
    { value: 'basic-science', label: 'Basic Science & Technology', code: 'BST-201' },
    { value: 'social-studies', label: 'Social Studies & Citizenship', code: 'SST-201' },
    { value: 'yoruba', label: 'Yoruba Language (Mother Tongue)', code: 'YOR-201' },
    { value: 'igbo', label: 'Igbo Language (Mother Tongue)', code: 'IGB-201' },
    { value: 'hausa', label: 'Hausa Language (Mother Tongue)', code: 'HAS-201' },
    { value: 'civic-ed', label: 'Civic & Moral Education', code: 'CIV-201' },
    { value: 'computer', label: 'Computer Studies & Digital Literacy', code: 'ICT-201' },
    { value: 'creative-arts', label: 'Creative & Cultural Arts', code: 'CCA-201' },
    { value: 'physical-health', label: 'Physical & Health Education', code: 'PHE-201' },
    { value: 'agric', label: 'Agricultural Science (Upper Primary)', code: 'AGR-201' },
  ],
  jss: [
    { value: 'english', label: 'English Language & Literature', code: 'ENG-301' },
    { value: 'mathematics', label: 'General Mathematics (JSS)', code: 'MTH-301' },
    { value: 'basic-science', label: 'Basic Science & Technology', code: 'BST-301' },
    { value: 'basic-tech', label: 'Basic Technology & Engineering', code: 'BTE-301' },
    { value: 'social-studies', label: 'Social Studies', code: 'SST-301' },
    { value: 'civic', label: 'Civic Education', code: 'CIV-301' },
    { value: 'computer', label: 'Computer Studies & ICT', code: 'ICT-301' },
    { value: 'creative-arts', label: 'Cultural & Creative Arts', code: 'CCA-301' },
    { value: 'phe', label: 'Physical & Health Education', code: 'PHE-301' },
    { value: 'business-studies', label: 'Business Studies & Entrepreneurship', code: 'BUS-301' },
    { value: 'home-economics', label: 'Home Economics', code: 'HEC-301' },
    { value: 'agric', label: 'Agricultural Science', code: 'AGR-301' },
    { value: 'french', label: 'French Language', code: 'FRE-301' },
    { value: 'yoruba', label: 'Yoruba Language', code: 'YOR-301' },
  ],
  sss: [
    { value: 'physics', label: 'Physics (NERDC Senior Curriculum)', code: 'PHY-401' },
    { value: 'chemistry', label: 'Chemistry', code: 'CHE-401' },
    { value: 'biology', label: 'Biology', code: 'BIO-401' },
    { value: 'maths', label: 'General Mathematics (NERDC Core)', code: 'MTH-401' },
    { value: 'further-maths', label: 'Further Mathematics (Elective)', code: 'FMT-401' },
    { value: 'english', label: 'English Language & Literature', code: 'ENG-401' },
    { value: 'economics', label: 'Economics', code: 'ECO-401' },
    { value: 'commerce', label: 'Commerce & Financial Accounting', code: 'COM-401' },
    { value: 'government', label: 'Government & Civic Studies', code: 'GOV-401' },
    { value: 'geography', label: 'Geography', code: 'GEO-401' },
    { value: 'computer', label: 'Computer Studies & Practical Coding', code: 'ICT-401' },
    { value: 'civic', label: 'Civic & Citizenship Education', code: 'CIV-401' },
    { value: 'agric', label: 'Agricultural Science', code: 'AGR-401' },
    { value: 'technical-drawing', label: 'Technical Drawing & Design', code: 'TCD-401' },
    { value: 'crs', label: 'Christian Religious Studies', code: 'CRS-401' },
    { value: 'irs', label: 'Islamic Religious Studies', code: 'IRS-401' },
  ],
}

// Class Streams by School Section (Cohort / Learning Stage)
const STREAMS_BY_SECTION: Record<SchoolSection, Array<{ value: string; label: string; track?: string; ageRange?: string }>> = {
  nursery: [
    { value: 'creche', label: 'Crèche', ageRange: '3 - 18 Months' },
    { value: 'playgroup-sunshine', label: 'Playgroup Sunshine', ageRange: '18 - 36 Months' },
    { value: 'nursery1-ruby', label: 'Nursery 1 Ruby', ageRange: 'Age 3 - 4 Years (10 Learners)' },
    { value: 'nursery1-stars', label: 'Nursery 1 Stars', ageRange: 'Age 3 - 4 Years' },
    { value: 'nursery2-sapphire', label: 'Nursery 2 Sapphire', ageRange: 'Age 4 - 5 Years' },
    { value: 'nursery2-sunshine', label: 'Nursery 2 Sunshine', ageRange: 'Age 4 - 5 Years' },
    { value: 'reception-eagles', label: 'Reception - Eagles', ageRange: 'Age 5 - 6 Years' },
    { value: 'reception-lions', label: 'Reception - Lions', ageRange: 'Age 5 - 6 Years' },
  ],
  primary: [
    { value: 'basic1-emerald', label: 'Basic 1 - Emerald' },
    { value: 'basic1-gold', label: 'Basic 1 - Gold' },
    { value: 'basic2-diamond', label: 'Basic 2 - Diamond' },
    { value: 'basic2-platinum', label: 'Basic 2 - Platinum' },
    { value: 'basic3-sapphire', label: 'Basic 3 - Sapphire' },
    { value: 'basic3-ruby', label: 'Basic 3 - Ruby' },
    { value: 'basic4-emerald', label: 'Basic 4 - Emerald' },
    { value: 'basic4-gold', label: 'Basic 4 - Gold' },
    { value: 'basic5-diamond', label: 'Basic 5 - Diamond' },
    { value: 'basic5-platinum', label: 'Basic 5 - Platinum' },
    { value: 'basic6-emerald', label: 'Basic 6 - Emerald (Exit Class)' },
    { value: 'basic6-gold', label: 'Basic 6 - Gold (Exit Class)' },
  ],
  jss: [
    { value: 'jss1-gold', label: 'JSS 1 - Gold' },
    { value: 'jss1-diamond', label: 'JSS 1 - Diamond' },
    { value: 'jss1-platinum', label: 'JSS 1 - Platinum' },
    { value: 'jss2-emerald', label: 'JSS 2 - Emerald' },
    { value: 'jss2-sapphire', label: 'JSS 2 - Sapphire' },
    { value: 'jss2-ruby', label: 'JSS 2 - Ruby' },
    { value: 'jss3-gold', label: 'JSS 3 - Gold (BECE Year)' },
    { value: 'jss3-diamond', label: 'JSS 3 - Diamond (BECE Year)' },
  ],
  sss: [
    { value: 'sss1-platinum', label: 'SSS 1 - Platinum (General)', track: 'General' },
    { value: 'sss1-gold', label: 'SSS 1 - Gold (Science Track)', track: 'Science' },
    { value: 'sss2-gold', label: 'SSS 2 - Gold (Science Track)', track: 'Science' },
    { value: 'sss2-diamond', label: 'SSS 2 - Diamond (Technical Track)', track: 'Technical' },
    { value: 'sss2-emerald', label: 'SSS 2 - Emerald (Commercial Track)', track: 'Commercial' },
    { value: 'sss3-gold', label: 'SSS 3 - Gold (WAEC/NECO Exam Class)', track: 'Science' },
    { value: 'sss3-emerald', label: 'SSS 3 - Emerald (WAEC/NECO Exam Class)', track: 'Commercial' },
  ],
}

// Role Types by School Section
const ROLES_BY_SECTION: Record<SchoolSection, Array<{ value: string; label: string; description: string; badge?: string }>> = {
  nursery: [
    {
      value: 'lead-early-years',
      label: 'Lead Early Years Educator',
      description: 'Montessori & EYFS Curricular Lead. Directs phonics foundations, individual learning journals, circle time and assessments.',
      badge: 'PRIMARY ACCOUNTABLE',
    },
    {
      value: 'classroom-minder',
      label: 'Dedicated Classroom Minder / Caregiver',
      description: 'Assisting with feeding hygiene, diapering, naptime transitions, sanitization routines, and sensory play safety.',
      badge: 'SUPPORT STAFF',
    },
    {
      value: 'itinerant-early',
      label: 'Itinerant Early Specialist',
      description: 'Music, Movement & Rhymes, Early French Immersion, or Psychomotor Coordination sessions.',
      badge: 'ROTATIONAL',
    },
  ],
  primary: [
    {
      value: 'lead-homeroom',
      label: 'Lead Homeroom Class Teacher',
      description: 'Direct instructional custody of core subjects: Mathematics, English Language, Basic Science & Technology, and Social Studies.',
      badge: 'SELECTED',
    },
    {
      value: 'itinerant-subject',
      label: 'Itinerant Subject Specialist',
      description: 'Multi-arm rotational specialist across grades (e.g., French, Diction & Phonetics, or Coding / ICT).',
      badge: 'SINGLE SUBJECT',
    },
  ],
  jss: [
    {
      value: 'subject-teacher',
      label: 'Subject Teacher',
      description: 'Specialist curriculum syllabus delivery, continuous assessment entry, and exam compilation.',
      badge: 'CURRENT CHOICE',
    },
    {
      value: 'form-tutor',
      label: 'Form Tutor / Pastoral Lead',
      description: 'Daily roll call register, morning assembly coordination, and student psycho-social welfare tracking.',
      badge: '',
    },
    {
      value: 'workshop-instructor',
      label: 'Practical Workshop / Lab Instructor',
      description: 'Supervision of introductory technology, home economics lab suites, or creative arts workshops.',
      badge: '',
    },
  ],
  sss: [
    {
      value: 'subject-teacher',
      label: 'Subject Teacher',
      description: 'Specialist curriculum syllabus delivery, continuous assessment entry, and exam compilation for WAEC/NECO preparation.',
      badge: 'CURRENT CHOICE',
    },
    {
      value: 'form-tutor',
      label: 'Form Tutor / Pastoral Lead',
      description: 'Daily roll call register, morning assembly coordination, and student psycho-social welfare tracking.',
      badge: '',
    },
    {
      value: 'workshop-instructor',
      label: 'Practical Workshop / Lab Instructor',
      description: 'Supervision of introductory technology, home economics lab suites, or creative arts workshops.',
      badge: '',
    },
  ],
}

// Departmental Anchors for JSS/SSS
const DEPARTMENTAL_ANCHORS = [
  { value: 'humanities', label: 'Humanities & National Values', hod: 'Dr. Mrs. Adeleke' },
  { value: 'sciences', label: 'STEM & Sciences Department', hod: 'Engr. Yusuf Bello' },
  { value: 'languages', label: 'Languages & Literature', hod: 'Ms. Amaka Adeleke' },
  { value: 'vocational', label: 'Vocational & Technical Studies', hod: 'Mr. C. Nwachukwu' },
  { value: 'creative-arts', label: 'Creative & Cultural Arts', hod: 'Mrs. Patience E. Okon' },
  { value: 'commerce', label: 'Commerce & Business Studies', hod: 'Mr. Babatunde Lawal' },
]

// ============================================================================
// MODAL COMPONENT
// ============================================================================

interface AddTeachingAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (assignment: any) => void
}

export default function AddTeachingAssignmentModal({ isOpen, onClose, onSave }: AddTeachingAssignmentModalProps) {
  const [selectedEducator, setSelectedEducator] = useState(EDUCATORS[0].id)
  const [selectedSection, setSelectedSection] = useState<SchoolSection>('sss')
  const [selectedStream, setSelectedStream] = useState('sss2-gold')
  const [selectedRole, setSelectedRole] = useState('subject-teacher')
  const [selectedSubject, setSelectedSubject] = useState('physics')
  const [periodsPerWeek, setPeriodsPerWeek] = useState(4)
  const [selectedRoom, setSelectedRoom] = useState('physics-lab-b')
  const [selectedDepartment, setSelectedDepartment] = useState('humanities')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Get current educator data
  const currentEducator = EDUCATORS.find((e) => e.id === selectedEducator) || EDUCATORS[0]

  // Calculate workload
  const newTotalLoad = currentEducator.currentLoad + periodsPerWeek
  const availableRemaining = Math.max(0, currentEducator.maxLoad - newTotalLoad)
  const existingPercent = Math.min(100, (currentEducator.currentLoad / 24) * 100)
  const additionalPercent = Math.min(100 - existingPercent, (periodsPerWeek / 24) * 100)

  // Get subjects, streams, and roles for selected section
  const availableSubjects = SUBJECTS_BY_SECTION[selectedSection]
  const availableStreams = STREAMS_BY_SECTION[selectedSection]
  const availableRoles = ROLES_BY_SECTION[selectedSection]

  // Update selected subject when section changes
  useEffect(() => {
    if (availableSubjects.length > 0) {
      setSelectedSubject(availableSubjects[0].value)
    }
  }, [selectedSection])

  // Update selected stream when section changes
  useEffect(() => {
    if (availableStreams.length > 0) {
      setSelectedStream(availableStreams[0].value)
    }
  }, [selectedSection])

  // Update selected role when section changes
  useEffect(() => {
    if (availableRoles.length > 0) {
      setSelectedRole(availableRoles[0].value)
    }
  }, [selectedSection])

  const handleSectionChange = (section: SchoolSection) => {
    setSelectedSection(section)
  }

  const handlePeriodsChange = (delta: number) => {
    const newPeriods = periodsPerWeek + delta
    if (newPeriods >= 1 && newPeriods <= 10) {
      setPeriodsPerWeek(newPeriods)
    }
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaved(true)
      setIsSaving(false)
      setTimeout(() => {
        if (onSave) {
          onSave({
            educator: selectedEducator,
            section: selectedSection,
            stream: selectedStream,
            role: selectedRole,
            subject: selectedSubject,
            periods: periodsPerWeek,
            room: selectedRoom,
            department: (selectedSection === 'jss' || selectedSection === 'sss') ? selectedDepartment : undefined,
          })
        }
        onClose()
        // Reset state
        setIsSaved(false)
      }, 600)
    }, 800)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto">
      {/* Modal Card Container */}
      <div className="relative w-full max-w-3xl my-auto bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] rounded-2xl shadow-[0_24px_48px_-12px_rgba(19,27,46,0.25),0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-start justify-between sticky top-0 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] flex items-center justify-center text-[var(--md-sys-color-primary,#004ac6)] mt-0.5 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] tracking-tight">New Teaching Assignment</h2>
                <span className="px-2 py-0.5 rounded-full bg-[var(--md-sys-color-secondary-container,#86f2e4)] text-[var(--md-sys-color-on-secondary-container,#006f66)] text-xs font-bold">2024/2025</span>
              </div>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)] mt-0.5">Assign class streams, subjects, and weekly timetable periods to an educator.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-center transition-colors"
            title="Close Modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* SECTION 1: EDUCATOR SELECTION */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--md-sys-color-primary,#004ac6)]"></span>
                1. Educator Selection
              </label>
              <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)] uppercase tracking-wider">Step 1 of 3</span>
            </div>

            {/* Educator Picker */}
            <div className="relative">
              <div className="relative flex items-center">
                <svg className="w-5 h-5 absolute left-3 text-[var(--md-sys-color-outline,#737686)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <select
                  value={selectedEducator}
                  onChange={(e) => setSelectedEducator(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] focus:outline-none appearance-none transition-all shadow-sm"
                >
                  {EDUCATORS.map((educator) => (
                    <option key={educator.id} value={educator.id}>
                      {educator.name} ({educator.title})
                    </option>
                  ))}
                </select>
                <svg className="w-5 h-5 absolute right-3 text-[var(--md-sys-color-on-surface-variant,#434655)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Live Workload Gauge Panel */}
            <div className="p-4 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] flex flex-col gap-2 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--md-sys-color-primary,#004ac6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">Weekly Timetable Load Status:</span>
                  <span className="text-xs text-[var(--md-sys-color-on-surface,#131b2e)] font-bold">{currentEducator.name.split(' ')[0]} {currentEducator.name.split(' ')[currentEducator.name.split(' ').length - 1]}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[var(--md-sys-color-secondary-fixed,#89f5e7)] text-[var(--md-sys-color-on-secondary-fixed,#00201d)] text-xs font-bold">
                  {availableRemaining} periods available
                </span>
              </div>

              {/* Progress Load Bar */}
              <div className="w-full bg-[var(--md-sys-color-surface-container-high,#e2e7ff)] h-2.5 rounded-full overflow-hidden flex my-1">
                <div
                  className="bg-[var(--md-sys-color-primary,#004ac6)] h-full transition-all duration-300"
                  style={{ width: `${existingPercent}%` }}
                  title={`Current load: ${currentEducator.currentLoad} periods`}
                ></div>
                <div
                  className="bg-[var(--md-sys-color-secondary,#006a61)] h-full transition-all duration-300"
                  style={{ width: `${additionalPercent}%` }}
                  title={`This new assignment: +${periodsPerWeek} periods`}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-[var(--md-sys-color-on-surface-variant,#434655)] pt-0.5">
                <span>
                  Current: <strong className="text-[var(--md-sys-color-on-surface,#131b2e)]">{currentEducator.currentLoad} / {currentEducator.maxLoad} periods</strong>
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--md-sys-color-secondary,#006a61)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--md-sys-color-secondary,#006a61)]"></span>
                  <span>+{periodsPerWeek} proposed in this assignment</span>
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 2: SCHOOL SECTION & COHORT */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--md-sys-color-primary,#004ac6)]"></span>
                2. School Section & Cohort
              </label>
              <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">Lagos Campus Structure</span>
            </div>

            {/* Section Segmented Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)]">
              <button
                type="button"
                onClick={() => handleSectionChange('nursery')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                  selectedSection === 'nursery'
                    ? 'bg-white text-[var(--md-sys-color-primary,#004ac6)] shadow-sm font-bold'
                    : 'text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)]'
                }`}
              >
                Early Years / Nursery
              </button>
              <button
                type="button"
                onClick={() => handleSectionChange('primary')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                  selectedSection === 'primary'
                    ? 'bg-white text-[var(--md-sys-color-primary,#004ac6)] shadow-sm font-bold'
                    : 'text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)]'
                }`}
              >
                Primary Basic 1–6
              </button>
              <button
                type="button"
                onClick={() => handleSectionChange('jss')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                  selectedSection === 'jss'
                    ? 'bg-white text-[var(--md-sys-color-primary,#004ac6)] shadow-sm font-bold'
                    : 'text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)]'
                }`}
              >
                Junior Secondary JSS
              </button>
              <button
                type="button"
                onClick={() => handleSectionChange('sss')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                  selectedSection === 'sss'
                    ? 'bg-white text-[var(--md-sys-color-primary,#004ac6)] shadow-sm font-bold'
                    : 'text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)]'
                }`}
              >
                Senior Secondary SSS
              </button>
            </div>

            {/* Stream Arm & Role Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Stream Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-between">
                  <span>{selectedSection === 'nursery' ? 'Cohort / Learning Stage' : 'Class Stream / Arm'}</span>
                  <span className="text-xs text-[var(--md-sys-color-outline,#737686)]">
                    {selectedSection === 'nursery' ? 'Lagos State ECCDE Registered' : 'Lekki Campus'}
                  </span>
                </label>
                <div className="relative flex items-center">
                  <svg className="w-4 h-4 absolute left-3 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <select
                    value={selectedStream}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] focus:outline-none appearance-none transition-all shadow-sm"
                  >
                    {availableStreams.map((stream) => (
                      <option key={stream.value} value={stream.value}>
                        {stream.label}
                        {stream.ageRange ? ` (${stream.ageRange})` : ''}
                        {stream.track ? ` (${stream.track})` : ''}
                      </option>
                    ))}
                  </select>
                  <svg className="w-5 h-5 absolute right-3 text-[var(--md-sys-color-on-surface-variant,#434655)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Dynamic Role Type Radio Options */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">
                  {selectedSection === 'nursery' ? 'Early Years Role Architecture' : selectedSection === 'primary' ? 'Primary Instructional Model' : selectedSection === 'jss' ? 'JSS Educational Role Classification' : 'SSS Educational Role Classification'}
                </label>
                <div className={`grid gap-2 bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] p-2 rounded-xl ${availableRoles.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                  {availableRoles.map((role) => (
                    <label
                      key={role.value}
                      className={`flex flex-col p-3 rounded-lg cursor-pointer transition-all border-2 ${
                        selectedRole === role.value
                          ? 'bg-white text-[var(--md-sys-color-primary,#004ac6)] border-[var(--md-sys-color-primary,#004ac6)] shadow-sm'
                          : 'bg-transparent text-[var(--md-sys-color-on-surface-variant,#434655)] border-transparent hover:bg-[var(--md-sys-color-surface-container,#eaedff)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={selectedRole === role.value}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="hidden"
                      />
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <svg className={`w-4 h-4 ${selectedRole === role.value ? 'text-[var(--md-sys-color-primary,#004ac6)]' : 'text-[var(--md-sys-color-on-surface-variant,#434655)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {selectedRole === role.value ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                              <circle cx="12" cy="12" r="10" strokeWidth={2} />
                            )}
                          </svg>
                          <span className="text-sm font-bold">{role.label}</span>
                        </div>
                        {role.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            selectedRole === role.value
                              ? 'bg-[var(--md-sys-color-primary-fixed,#dbe1ff)] text-[var(--md-sys-color-primary,#004ac6)]'
                              : 'bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface-variant,#434655)]'
                          }`}>
                            {role.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${selectedRole === role.value ? 'text-[var(--md-sys-color-on-surface,#131b2e)]' : 'text-[var(--md-sys-color-on-surface-variant,#434655)]'}`}>
                        {role.description}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SUBJECT & TIMETABLE PERIODS */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--md-sys-color-primary,#004ac6)]"></span>
                3. Subject & Timetable Periods
              </label>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--md-sys-color-surface-container-high,#e2e7ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-xs font-medium">
                <svg className="w-3.5 h-3.5 text-[var(--md-sys-color-primary,#004ac6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Term 1 (2024/2025 Session)</span>
              </div>
            </div>

            {/* Subject Select & Periods Stepper Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Subject Name (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">Curriculum Subject Name</label>
                <div className="relative flex items-center">
                  <svg className="w-4 h-4 absolute left-3 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] focus:outline-none appearance-none transition-all shadow-sm"
                  >
                    {availableSubjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label} · {subject.code}
                      </option>
                    ))}
                  </select>
                  <svg className="w-5 h-5 absolute right-3 text-[var(--md-sys-color-on-surface-variant,#434655)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Periods per Week Counter Stepper (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">Weekly Periods</label>
                  <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">40 mins / slot</span>
                </div>
                <div className="flex items-center rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => handlePeriodsChange(-1)}
                    className="w-9 h-9 rounded-lg bg-white hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-center font-bold transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <div className="flex-1 text-center flex items-center justify-center gap-1.5">
                    <span className="text-xl font-bold text-[var(--md-sys-color-on-surface,#131b2e)]">{periodsPerWeek}</span>
                    <span className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">periods/wk</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePeriodsChange(1)}
                    className="w-9 h-9 rounded-lg bg-white hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-center font-bold transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Classroom / Lab */}
            <div className="flex flex-col gap-1.5 pt-2">
              <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)]">Assigned Classroom / Specialized Space</label>
              <div className="relative flex items-center">
                <svg className="w-4 h-4 absolute left-3 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] focus:outline-none appearance-none transition-all shadow-sm"
                >
                  <option value="physics-lab-b">Physics Lab B (Block C - 2nd Floor)</option>
                  <option value="room-204">Room 204 - Gold Arm Dedicated Classroom</option>
                  <option value="stem-ict">Main STEM & ICT Suite (Digital Hub)</option>
                  <option value="science-hall">General Science Discovery Hall</option>
                  <option value="lang-lab-1">Language Laboratory 1</option>
                </select>
                <svg className="w-5 h-5 absolute right-3 text-[var(--md-sys-color-on-surface-variant,#434655)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Departmental Anchor - Only for JSS/SSS */}
            {(selectedSection === 'jss' || selectedSection === 'sss') && (
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-xs font-semibold text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--md-sys-color-primary,#004ac6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Departmental Anchor</span>
                  <span className="text-xs text-[var(--md-sys-color-outline,#737686)] font-normal">Humanities & National Values</span>
                </label>
                <div className="relative flex items-center">
                  <svg className="w-4 h-4 absolute left-3 text-[var(--md-sys-color-outline,#737686)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] text-sm focus:bg-white focus:ring-2 focus:ring-[var(--md-sys-color-primary,#004ac6)] focus:outline-none appearance-none transition-all shadow-sm"
                  >
                    {DEPARTMENTAL_ANCHORS.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label} · HOD: {dept.hod}
                      </option>
                    ))}
                  </select>
                  <svg className="w-5 h-5 absolute right-3 text-[var(--md-sys-color-on-surface-variant,#434655)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}
          </section>

          {/* WORKLOAD SUMMARY CARD */}
          <div className="p-4 rounded-xl bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--md-sys-color-secondary-container,#86f2e4)] text-[var(--md-sys-color-on-secondary-container,#006f66)] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[var(--md-sys-color-on-surface,#131b2e)]">
                    New Total Workload: <span className="text-[var(--md-sys-color-primary,#004ac6)] font-extrabold">{newTotalLoad}</span> periods/wk
                  </span>
                </div>
                <p className="text-xs text-[var(--md-sys-color-on-surface-variant,#434655)]">Optimal NERDC statutory guideline is 16–22 periods per full-time teaching staff.</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[var(--md-sys-color-secondary,#006a61)] text-xs font-bold shadow-sm shrink-0 self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-[var(--md-sys-color-secondary,#006a61)]"></span>
              <span>Balanced & Approved</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_-1px_4px_rgba(0,0,0,0.03)] sticky bottom-0 z-20">
          <div className="flex items-center gap-2 text-[var(--md-sys-color-on-surface-variant,#434655)] text-xs">
            <svg className="w-4 h-4 text-[var(--md-sys-color-secondary,#006a61)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Draft autosaves to Lekki local campus node</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] text-[var(--md-sys-color-on-surface,#131b2e)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-lg bg-[var(--md-sys-color-surface-container,#eaedff)] hover:bg-[var(--md-sys-color-surface-container-high,#e2e7ff)] text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] text-sm font-semibold transition-all"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isSaved}
              className="px-6 py-2.5 rounded-lg bg-[var(--md-sys-color-primary,#004ac6)] hover:bg-[var(--md-sys-color-primary-container,#dbe1ff)] text-white hover:text-[var(--md-sys-color-on-primary-container,#00174b)] text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Saving Assignment...</span>
                </>
              ) : isSaved ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Assignment Saved!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Confirm & Save Assignment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
