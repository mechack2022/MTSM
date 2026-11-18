import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCurrentSchool } from '@/hooks/use-schools'
import { useAuth } from '@/store'
import { useLogout } from '@/hooks/use-auth'

interface ClassArm {
  id: string
  name: string
  streamType: string
  roomNumber: string
  formTutor: string
  currentCapacity: number
  maxCapacity: number
}

interface ClassLevel {
  id: string
  name: string
  fullName: string
  description: string
  arms: ClassArm[]
}

const classLevelsData: Record<string, ClassLevel> = {
  'sss-1': {
    id: 'sss-1',
    name: 'SSS 1',
    fullName: 'Senior Secondary 1',
    description: 'Foundation level for senior secondary education',
    arms: [
      {
        id: 'sss1-gold',
        name: 'SSS 1 Gold',
        streamType: 'General',
        roomNumber: 'S-101',
        formTutor: 'Mr. James Okon',
        currentCapacity: 28,
        maxCapacity: 30,
      },
      {
        id: 'sss1-science',
        name: 'SSS 1 Science',
        streamType: 'STEM',
        roomNumber: 'S-102',
        formTutor: 'Dr. Sarah Eze',
        currentCapacity: 30,
        maxCapacity: 30,
      },
      {
        id: 'sss1-arts',
        name: 'SSS 1 Arts',
        streamType: 'Arts',
        roomNumber: 'S-103',
        formTutor: 'Mrs. Faith Udoh',
        currentCapacity: 24,
        maxCapacity: 30,
      },
    ],
  },
  'sss-2': {
    id: 'sss-2',
    name: 'SSS 2',
    fullName: 'Senior Secondary 2',
    description: 'Intermediate level with specialized stream focus',
    arms: [
      {
        id: 'sss2-science',
        name: 'SSS 2 Science & Tech',
        streamType: 'Science Stream',
        roomNumber: 'S-204 (North Block)',
        formTutor: 'Mr. Chinedu Okafor',
        currentCapacity: 28,
        maxCapacity: 30,
      },
      {
        id: 'sss2-commercial',
        name: 'SSS 2 Commercial',
        streamType: 'Business / Commercial',
        roomNumber: 'S-205 (West Wing)',
        formTutor: 'Mrs. N. Obi',
        currentCapacity: 24,
        maxCapacity: 30,
      },
      {
        id: 'sss2-arts',
        name: 'SSS 2 Arts & Humanities',
        streamType: 'Humanities Stream',
        roomNumber: 'S-206 (West Wing)',
        formTutor: 'Pending Allocation',
        currentCapacity: 18,
        maxCapacity: 30,
      },
    ],
  },
  'sss-3': {
    id: 'sss-3',
    name: 'SSS 3',
    fullName: 'Senior Secondary 3',
    description: 'Final year - WAEC/NECO preparation',
    arms: [
      {
        id: 'sss3-waec',
        name: 'SSS 3 WAEC Intensive',
        streamType: 'Lead Arm',
        roomNumber: 'S-301',
        formTutor: 'Dr. A. Adebayo',
        currentCapacity: 32,
        maxCapacity: 35,
      },
      {
        id: 'sss3-science',
        name: 'SSS 3 Science',
        streamType: 'Science',
        roomNumber: 'S-302',
        formTutor: 'Mr. E. Bassey',
        currentCapacity: 29,
        maxCapacity: 30,
      },
    ],
  },
  'jss-1': {
    id: 'jss-1',
    name: 'JSS 1',
    fullName: 'Junior Secondary 1 (Basic 7)',
    description: 'Foundation junior secondary education under UBE framework',
    arms: [
      {
        id: 'jss1-pearl',
        name: 'JSS 1 Pearl',
        streamType: 'General Studies',
        roomNumber: 'J-101',
        formTutor: 'Mrs. Aisha Ibrahim',
        currentCapacity: 30,
        maxCapacity: 35,
      },
      {
        id: 'jss1-sapphire',
        name: 'JSS 1 Sapphire',
        streamType: 'Basic Science Focused',
        roomNumber: 'J-102 (Science Wing)',
        formTutor: 'Mr. David Okafor',
        currentCapacity: 32,
        maxCapacity: 35,
      },
      {
        id: 'jss1-emerald',
        name: 'JSS 1 Emerald',
        streamType: 'Creative Arts Stream',
        roomNumber: 'J-103 (Arts Wing)',
        formTutor: 'Miss Clara Adewale',
        currentCapacity: 28,
        maxCapacity: 35,
      },
    ],
  },
  'jss-2': {
    id: 'jss-2',
    name: 'JSS 2',
    fullName: 'Junior Secondary 2 (Basic 8)',
    description: 'Middle junior secondary with pre-vocational orientation',
    arms: [
      {
        id: 'jss2-sapphire',
        name: 'JSS 2 Sapphire',
        streamType: 'Intro Tech & Pre-Vocational',
        roomNumber: 'J-201 (Technology Lab Wing)',
        formTutor: 'Mr. Emmanuel Bassey',
        currentCapacity: 33,
        maxCapacity: 35,
      },
      {
        id: 'jss2-gold',
        name: 'JSS 2 Gold',
        streamType: 'French & Business Studies',
        roomNumber: 'J-202 (Language Resource Center)',
        formTutor: 'Mrs. Ngozi Obi',
        currentCapacity: 30,
        maxCapacity: 35,
      },
      {
        id: 'jss2-bronze',
        name: 'JSS 2 Bronze',
        streamType: 'Basic Science & Agricultural Track',
        roomNumber: 'J-203 (Bio Garden Annex)',
        formTutor: 'Mr. Musa Abdullahi',
        currentCapacity: 29,
        maxCapacity: 35,
      },
    ],
  },
  'jss-3': {
    id: 'jss-3',
    name: 'JSS 3',
    fullName: 'Junior Secondary 3 (Basic 9)',
    description: 'National BECE & State Junior WAEC Candidate Cohort',
    arms: [
      {
        id: 'jss3-bece-alpha',
        name: 'JSS 3 BECE Alpha',
        streamType: 'BECE Candidate',
        roomNumber: 'J-301 (Exam Hall Prep)',
        formTutor: 'Dr. Amina Hassan',
        currentCapacity: 35,
        maxCapacity: 35,
      },
      {
        id: 'jss3-bece-beta',
        name: 'JSS 3 BECE Beta',
        streamType: 'BECE Candidate',
        roomNumber: 'J-302 (Exam Hall Prep)',
        formTutor: 'Mr. Joseph Ekong',
        currentCapacity: 34,
        maxCapacity: 35,
      },
    ],
  },
  'primary-1': {
    id: 'primary-1',
    name: 'Basic 1',
    fullName: 'Basic 1 (Lower Primary)',
    description: 'Foundation primary education under UBE framework',
    arms: [
      {
        id: 'basic1-gold',
        name: 'Basic 1 Gold',
        streamType: 'Standard',
        roomNumber: 'P-101',
        formTutor: 'Miss A. Danladi',
        currentCapacity: 28,
        maxCapacity: 30,
      },
      {
        id: 'basic1-silver',
        name: 'Basic 1 Silver',
        streamType: 'Standard',
        roomNumber: 'P-102',
        formTutor: 'Mr. S. Adeyemi',
        currentCapacity: 28,
        maxCapacity: 30,
      },
    ],
  },
  'primary-2': {
    id: 'primary-2',
    name: 'Basic 2',
    fullName: 'Basic 2 (Lower Primary)',
    description: 'Lower primary level with UBE standards',
    arms: [
      {
        id: 'basic2-emerald',
        name: 'Basic 2 Emerald',
        streamType: 'Standard',
        roomNumber: 'P-103',
        formTutor: 'Mrs. C. Okafor',
        currentCapacity: 27,
        maxCapacity: 30,
      },
      {
        id: 'basic2-gold',
        name: 'Basic 2 Gold',
        streamType: 'Standard',
        roomNumber: 'P-104',
        formTutor: 'Mr. T. Ibrahim',
        currentCapacity: 27,
        maxCapacity: 30,
      },
    ],
  },
  'primary-3': {
    id: 'primary-3',
    name: 'Basic 3',
    fullName: 'Basic 3 (Middle Primary)',
    description: 'Middle primary foundation level',
    arms: [
      {
        id: 'basic3-ruby',
        name: 'Basic 3 Ruby',
        streamType: 'Standard',
        roomNumber: 'P-105',
        formTutor: 'Mrs. F. Adeola',
        currentCapacity: 29,
        maxCapacity: 30,
      },
      {
        id: 'basic3-silver',
        name: 'Basic 3 Silver',
        streamType: 'Standard',
        roomNumber: 'P-106',
        formTutor: 'Mr. D. Okeke',
        currentCapacity: 29,
        maxCapacity: 30,
      },
    ],
  },
  'primary-4': {
    id: 'primary-4',
    name: 'Basic 4',
    fullName: 'Basic 4 (Middle Primary)',
    description: 'Middle primary advanced level',
    arms: [
      {
        id: 'basic4-emerald',
        name: 'Basic 4 Emerald',
        streamType: 'Accelerated Literacy',
        roomNumber: 'P-102 (South Courtyard)',
        formTutor: 'Mrs. Patience Okon',
        currentCapacity: 28,
        maxCapacity: 30,
      },
      {
        id: 'basic4-gold',
        name: 'Basic 4 Gold',
        streamType: 'Standard Core',
        roomNumber: 'P-104 (West Quad)',
        formTutor: 'Mr. Babatunde Lawal',
        currentCapacity: 26,
        maxCapacity: 30,
      },
      {
        id: 'basic4-ruby',
        name: 'Basic 4 Ruby',
        streamType: 'Foundation STEAM',
        roomNumber: 'P-105',
        formTutor: 'Pending Allocation',
        currentCapacity: 28,
        maxCapacity: 30,
      },
    ],
  },
  'primary-5': {
    id: 'primary-5',
    name: 'Basic 5',
    fullName: 'Basic 5 (Upper Primary)',
    description: 'Upper primary preparation level',
    arms: [
      {
        id: 'basic5-sapphire',
        name: 'Basic 5 Sapphire',
        streamType: 'Standard',
        roomNumber: 'P-107',
        formTutor: 'Mrs. M. Abubakar',
        currentCapacity: 30,
        maxCapacity: 30,
      },
    ],
  },
  'primary-6': {
    id: 'primary-6',
    name: 'Basic 6',
    fullName: 'Basic 6 (National Common Entrance Cohort)',
    description: 'Final primary level - Common Entrance exam preparation',
    arms: [
      {
        id: 'basic6-ruby',
        name: 'Basic 6 Ruby',
        streamType: 'Exam Cohort',
        roomNumber: 'Honors Hall',
        formTutor: 'Dr. N. Bassey',
        currentCapacity: 30,
        maxCapacity: 30,
      },
      {
        id: 'basic6-diamond',
        name: 'Basic 6 Diamond',
        streamType: 'Exam Cohort',
        roomNumber: 'P-202',
        formTutor: 'Mrs. G. Ekanem',
        currentCapacity: 28,
        maxCapacity: 30,
      },
    ],
  },
  'creche': {
    id: 'creche',
    name: 'Crèche',
    fullName: 'Crèche (3 months – 18 months)',
    description: 'Infant care with 1:4 caregiver ratio',
    arms: [
      {
        id: 'creche-bluebell',
        name: 'Crèche Bluebell',
        streamType: 'Infant Pod',
        roomNumber: 'EY-01 (Ground Floor East)',
        formTutor: 'Mrs. Fatima Alabi',
        currentCapacity: 8,
        maxCapacity: 10,
      },
      {
        id: 'creche-daisy',
        name: 'Crèche Daisy',
        streamType: 'Infant Pod',
        roomNumber: 'EY-02 (Crib Sanctuary)',
        formTutor: 'Miss Grace Danjuma',
        currentCapacity: 10,
        maxCapacity: 10,
      },
    ],
  },
  'pre-nursery': {
    id: 'pre-nursery',
    name: 'Pre-Nursery',
    fullName: 'Pre-Nursery / Playgroup (18 months – 3 years)',
    description: 'Early learning with 1:6 caregiver ratio',
    arms: [
      {
        id: 'prenursery-sunshine',
        name: 'Sunshine Playgroup',
        streamType: 'Playgroup',
        roomNumber: 'EY-03 (Sensory Hub)',
        formTutor: 'Miss B. Peters',
        currentCapacity: 12,
        maxCapacity: 15,
      },
      {
        id: 'prenursery-rainbow',
        name: 'Rainbow Explorers',
        streamType: 'Playgroup',
        roomNumber: 'EY-04 (Montessori Wing)',
        formTutor: 'Mrs. K. Adeleke',
        currentCapacity: 12,
        maxCapacity: 15,
      },
    ],
  },
  'nursery-1': {
    id: 'nursery-1',
    name: 'Nursery 1',
    fullName: 'Nursery 1 (Age 3 – 4)',
    description: 'Foundation early years education',
    arms: [
      {
        id: 'nursery1-ruby',
        name: 'Nursery 1 Ruby',
        streamType: 'Foundation',
        roomNumber: 'EY-05',
        formTutor: 'Mrs. A. Balogun',
        currentCapacity: 16,
        maxCapacity: 18,
      },
    ],
  },
  'nursery-2': {
    id: 'nursery-2',
    name: 'Nursery 2',
    fullName: 'Nursery 2 / Kindergarten (Age 4 – 5)',
    description: 'Transition stage to primary education',
    arms: [
      {
        id: 'nursery2-emerald',
        name: 'KG Emerald Arm',
        streamType: 'Kindergarten',
        roomNumber: 'EY-06 (Phonics & Play Deck)',
        formTutor: 'Mrs. J. Nnamdi',
        currentCapacity: 20,
        maxCapacity: 22,
      },
    ],
  },
}

const streamColors: Record<string, { bg: string; text: string }> = {
  General: { bg: 'bg-gray-100', text: 'text-gray-700' },
  STEM: { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Science Stream': { bg: 'bg-green-100', text: 'text-green-700' },
  Arts: { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Humanities Stream': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Business / Commercial': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Lead Arm': { bg: 'bg-blue-100', text: 'text-blue-700' },
  Science: { bg: 'bg-green-100', text: 'text-green-700' },
  'Infant Pod': { bg: 'bg-pink-100', text: 'text-pink-700' },
  Playgroup: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  Foundation: { bg: 'bg-green-100', text: 'text-green-700' },
  Kindergarten: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Standard: { bg: 'bg-gray-100', text: 'text-gray-700' },
  'Accelerated Literacy': { bg: 'bg-green-100', text: 'text-green-700' },
  'Standard Core': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Foundation STEAM': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Exam Cohort': { bg: 'bg-red-100', text: 'text-red-700' },
  'General Studies': { bg: 'bg-gray-100', text: 'text-gray-700' },
  'Basic Science Focused': { bg: 'bg-green-100', text: 'text-green-700' },
  'Creative Arts Stream': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Intro Tech & Pre-Vocational': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'French & Business Studies': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Basic Science & Agricultural Track': { bg: 'bg-green-100', text: 'text-green-700' },
  'BECE Candidate': { bg: 'bg-red-100', text: 'text-red-700' },
}

export default function ClassStreamConfigurationPage() {
  const navigate = useNavigate()
  const { classId } = useParams<{ classId: string }>()
  const { data: school, isLoading } = useCurrentSchool()
  const { user } = useAuth()
  const { mutate: logout } = useLogout()
  const [staffManagementOpen, setStaffManagementOpen] = useState(false)
  const [newArmName, setNewArmName] = useState('')
  const [newArmCapacity, setNewArmCapacity] = useState(30)
  const [newArmRoom, setNewArmRoom] = useState('')

  const classLevel = classId ? classLevelsData[classId] : null

  const isEarlyYears = classId ? ['creche', 'pre-nursery', 'nursery-1', 'nursery-2'].includes(classId) : false
  const isPrimary = classId ? ['primary-1', 'primary-2', 'primary-3', 'primary-4', 'primary-5', 'primary-6'].includes(classId) : false
  const isJSS = classId ? ['jss-1', 'jss-2', 'jss-3'].includes(classId) : false

  const staffLabel = isEarlyYears ? 'Caregiver' : 'Form Tutor'
  const armLabel = isEarlyYears ? 'Pod/Arm' : 'Arm'
  const guidelineLabel = isEarlyYears
    ? 'UBEC & Early Childhood Care Guideline'
    : isPrimary
    ? 'UBEC & SUBEB Primary Standard'
    : isJSS
    ? 'UBEC & SUBEB Junior Secondary Standard'
    : 'SUBEB & WAEC Guideline'
  const guidelineText = isEarlyYears
    ? 'Recommended 1:6 caregiver-to-child ratio for playgroup and 1:4 for Crèche pods to ensure safety certification.'
    : isPrimary
    ? 'Maximum 30 pupils per primary classroom arm to uphold effective individual continuous assessment under UBE framework.'
    : isJSS
    ? 'Maximum 35 students per junior secondary classroom to ensure effective BECE preparation and pre-vocational training under UBE framework.'
    : 'Recommended 25-35 pupils per classroom for senior secondary laboratory sessions.'

  if (isLoading || !school) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Loading school information...</span>
        </div>
      </div>
    )
  }

  if (!classLevel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Class Not Found</h3>
          <button
            onClick={() => navigate('/classes-management')}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all"
          >
            Back to Classes
          </button>
        </div>
      </div>
    )
  }

  const totalEnrolled = classLevel.arms.reduce((sum, arm) => sum + arm.currentCapacity, 0)
  const totalCapacity = classLevel.arms.reduce((sum, arm) => sum + arm.maxCapacity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-base font-bold text-gray-900 leading-tight truncate">{school.name.split(' ')[0]}</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">School Admin · {school.campusCode}</span>
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Platform Info</div>
            <div className="px-3 py-2 rounded-lg bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-700 font-medium">Multi-Tier School Management System</span>
            </div>
          </div>

          <div className="px-4 py-1 my-2">
            <div className="h-px bg-gray-200"></div>
          </div>

          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            <button
              onClick={() => navigate('/school-admin-dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>

            <div className="pt-2">
              <button
                onClick={() => setStaffManagementOpen(!staffManagementOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-gray-900 transition-all text-xs font-semibold uppercase tracking-wider"
              >
                <span>Staff Management</span>
                <svg
                  className={`w-4 h-4 transition-transform ${staffManagementOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {staffManagementOpen && (
                <div className="pl-3 pr-2 mt-1 space-y-1">
                  <button
                    onClick={() => navigate('/staff-directory')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm text-left"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <span>Staff Directory</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/classes-management')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm text-left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Classes, Streams & Arms</span>
            </button>
          </nav>
        </div>

        <div className="p-4">
          <div className="p-3 rounded-xl bg-gray-50 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 animate-pulse"></span>
              <span className="text-xs font-bold text-gray-900 truncate">Campus: {school.localGovernmentName || school.stateName}</span>
            </div>
            <div className="pl-4">
              <span className="text-xs text-gray-600">Term 1 Active · 2024/2025</span>
            </div>
            <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Trust Registry</span>
              <span className="text-[11px] font-bold text-blue-600">{school.campusCode}</span>
            </div>
          </div>
        </div>

        <div className="p-4 pt-0">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <div className="pl-72">
        <header className="fixed top-0 left-72 right-0 h-20 bg-white/85 backdrop-blur-xl shadow-sm z-40 px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-bold text-gray-900 leading-tight">{school?.schoolHeadName || 'School Admin'}</span>
              <span className="text-xs text-gray-600 leading-tight">School Administrator</span>
            </div>
          </div>
        </header>

        <main className="relative pt-20 bg-white min-h-screen px-8 py-6 w-full">
          <div className="flex flex-col w-full space-y-8 pb-12">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate('/classes-management')}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Classes Overview</span>
              </button>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-blue-600 font-semibold">Configure Streams</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Configure Streams: {classLevel.fullName}
                </h1>
                <p className="text-sm text-gray-600 mt-1">{classLevel.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Audit Log</span>
                </button>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">School Topology: {school.topology}</h2>
                  <p className="text-sm text-gray-600">
                    {classLevel.arms.length} Arm{classLevel.arms.length !== 1 ? 's' : ''} Configured • {totalEnrolled}/{totalCapacity} Students Enrolled
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              <div className="xl:col-span-7 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Configured {armLabel}s for {classLevel.name}</h2>
                    <p className="text-sm text-gray-600">
                      Review allocations, assigned {isEarlyYears ? 'caregivers' : 'form educators'}, and {isEarlyYears ? 'capacity limits' : 'classroom seats'}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase">
                    Total: {classLevel.arms.length} {armLabel}s
                  </span>
                </div>

                {classLevel.arms.length === 0 ? (
                  <div className="p-12 rounded-xl bg-white border-2 border-dashed border-gray-300 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No {armLabel}s Configured</h3>
                    <p className="text-sm text-gray-600">Create your first {isEarlyYears ? 'pod/arm' : 'arm/stream'} using the form on the right</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {classLevel.arms.map((arm, idx) => (
                      <div
                        key={arm.id}
                        className="p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <span className="text-lg font-bold text-gray-900">{idx + 1}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-base font-semibold text-gray-900">{arm.name}</h4>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                                    streamColors[arm.streamType]?.bg || 'bg-gray-100'
                                  } ${streamColors[arm.streamType]?.text || 'text-gray-700'}`}
                                >
                                  {arm.streamType}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600">
                                Room {arm.roomNumber} • {arm.currentCapacity}/{arm.maxCapacity} Enrolled
                                {arm.currentCapacity === arm.maxCapacity && ' (Full)'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-all">
                              Edit
                            </button>
                            <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-all">
                              Reassign Tutor
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 uppercase font-semibold">{staffLabel}</span>
                              <span className="text-sm text-gray-900 font-medium">{arm.formTutor}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 uppercase font-semibold">Room</span>
                              <span className="text-sm text-gray-900 font-medium">Room {arm.roomNumber}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <div className="flex flex-col flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-500 uppercase font-semibold">Capacity</span>
                                <span className="text-xs text-green-600 font-bold">
                                  {arm.currentCapacity} / {arm.maxCapacity}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-green-600 h-2 rounded-full transition-all"
                                  style={{ width: `${(arm.currentCapacity / arm.maxCapacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="xl:col-span-5 flex flex-col gap-6">
                <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 sticky top-24">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span>Add New Arm</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Configure New {isEarlyYears ? 'Pod/Arm' : 'Stream'}</h3>
                      <p className="text-sm text-gray-600 mt-1">Add a new {isEarlyYears ? 'pod/arm' : 'arm/stream'} to {classLevel.name}</p>
                    </div>
                  </div>

                  <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                        <span>{isEarlyYears ? 'Pod/Arm' : 'Stream / Arm'} Name</span>
                        <span className="text-blue-600 text-xs uppercase">Required</span>
                      </label>
                      <input
                        type="text"
                        value={newArmName}
                        onChange={(e) => setNewArmName(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/40 transition-all border border-gray-200"
                        placeholder={
                          isEarlyYears
                            ? `e.g. ${classLevel.name} Sunshine`
                            : isPrimary
                            ? `e.g. ${classLevel.name} Sapphire`
                            : `e.g. ${classLevel.name} Diamond`
                        }
                      />
                      <div className="flex flex-col gap-1 pt-1">
                        <span className="text-xs text-gray-500 uppercase font-semibold">
                          Quick Presets{isPrimary && ' (Gemstone Schema)'}{isJSS && ' (Junior Secondary)'}:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {isEarlyYears
                            ? ['Sunshine', 'Rainbow', 'Stars', 'Dolphins', 'Butterflies', 'Little Angels', 'Bluebell', 'Daisy'].map(
                                (preset) => (
                                  <button
                                    key={preset}
                                    type="button"
                                    onClick={() => setNewArmName(`${classLevel.name} ${preset}`)}
                                    className="px-3 py-1 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-xs font-medium text-gray-700 transition-colors"
                                  >
                                    {preset}
                                  </button>
                                )
                              )
                            : isPrimary
                            ? ['Gold', 'Silver', 'Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Pearl'].map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => setNewArmName(`${classLevel.name} ${preset}`)}
                                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-xs font-medium text-gray-700 transition-colors"
                                >
                                  {preset}
                                </button>
                              ))
                            : isJSS
                            ? ['Diamond', 'Silver', 'Pearl', 'Sapphire', 'Emerald', 'Bronze', 'Tech', 'Business', 'Agric', 'BECE Alpha', 'BECE Beta'].map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => setNewArmName(`${classLevel.name} ${preset}`)}
                                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-xs font-medium text-gray-700 transition-colors"
                                >
                                  {preset}
                                </button>
                              ))
                            : ['Gold', 'Silver', 'Diamond', 'Emerald', 'Ruby', 'Science', 'Commercial', 'Arts'].map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => setNewArmName(`${classLevel.name} ${preset}`)}
                                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-xs font-medium text-gray-700 transition-colors"
                                >
                                  {preset}
                                </button>
                              ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                        <span>Maximum {isEarlyYears ? 'Child' : isPrimary ? 'Pupil' : 'Student'} Capacity</span>
                        <span className="text-green-600 text-xs font-medium">
                          Standard: {isEarlyYears ? '15' : isJSS ? '35' : '30'}
                          {(isPrimary || isJSS) && ' (UBEC)'}
                        </span>
                      </label>
                      <input
                        type="number"
                        value={newArmCapacity}
                        onChange={(e) => setNewArmCapacity(Number(e.target.value))}
                        min="5"
                        max="60"
                        className="w-full h-11 px-4 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/40 transition-all border border-gray-200"
                      />
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-gray-700 leading-tight">
                          <strong>{guidelineLabel}:</strong> {guidelineText}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900">Room / Physical Venue</label>
                      <input
                        type="text"
                        value={newArmRoom}
                        onChange={(e) => setNewArmRoom(e.target.value)}
                        className="w-full h-11 px-4 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/40 transition-all border border-gray-200"
                        placeholder={
                          isEarlyYears
                            ? 'e.g. Room EY-07 - Sensory Hall'
                            : isPrimary
                            ? 'e.g. Room P-106 - Lower Primary East Wing'
                            : isJSS
                            ? 'e.g. Room J-204 - Technology Lab Wing'
                            : 'e.g. Room S-207 - Senior Block West'
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Assign Lead {isEarlyYears ? 'Caregiver / Early Years Tutor' : 'Form Teacher'}
                      </label>
                      <select className="w-full h-11 px-4 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/40 transition-all border border-gray-200 cursor-pointer">
                        <option value="">-- Assign Later (Pending Allocation) --</option>
                        {isEarlyYears ? (
                          <>
                            <option value="t1">Miss Joy Bassey (TRCN Certified Montessori Lead)</option>
                            <option value="t2">Mrs. Esther Okoro (Early Childhood Dip.)</option>
                            <option value="t3">Miss Mercy Akpan (Pediatric Care Certified)</option>
                          </>
                        ) : isPrimary ? (
                          <>
                            <option value="t1">Mr. Kunle Adeleke (TRCN Verified Primary Educator)</option>
                            <option value="t2">Mrs. Blessing Effiong (Primary Core Specialist)</option>
                            <option value="t3">Miss Zainab Aliyu (Junior STEM Instructor)</option>
                            <option value="t4">Mr. Chidi Nwosu (UBE Certified Teacher)</option>
                          </>
                        ) : isJSS ? (
                          <>
                            <option value="t1">Mrs. Aisha Ibrahim (TRCN Junior Secondary Educator)</option>
                            <option value="t2">Mr. David Okafor (Basic Science Specialist)</option>
                            <option value="t3">Miss Clara Adewale (Creative Arts & CCA Instructor)</option>
                            <option value="t4">Mr. Emmanuel Bassey (Pre-Vocational Tech Lead)</option>
                            <option value="t5">Mrs. Ngozi Obi (French & Business Studies)</option>
                            <option value="t6">Mr. Musa Abdullahi (Agric Science Specialist)</option>
                            <option value="t7">Dr. Amina Hassan (BECE Coordinator & Lead Tutor)</option>
                            <option value="t8">Mr. Joseph Ekong (BECE Mathematics Lead)</option>
                          </>
                        ) : (
                          <>
                            <option value="t1">Mr. Anthony Akpan (Senior Physics Tutor)</option>
                            <option value="t2">Mrs. Grace Effiong (Mathematics Lead)</option>
                            <option value="t3">Mr. Babatunde Lawal (Economics Master)</option>
                            <option value="t4">Dr. Halima Bello (Literature in English)</option>
                          </>
                        )}
                      </select>
                      <p className="text-xs text-gray-600">
                        The {isEarlyYears ? 'caregiver' : 'form tutor'} receives daily attendance notifications & behavioral logs.
                      </p>
                      {isPrimary && (
                        <div className="flex items-center gap-2 mt-1">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          <span className="text-xs text-gray-600">TRCN License verified on National Educator DB</span>
                        </div>
                      )}
                      {isJSS && classId === 'jss-3' && (
                        <div className="flex items-center gap-2 mt-1 p-2 rounded-lg bg-red-50 border border-red-200">
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          <span className="text-xs text-red-700 font-semibold">BECE Exam Coordinator - National BECE & Junior WAEC Registration Required</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Add {armLabel} to {classLevel.name}</span>
                      </button>
                      <button
                        type="button"
                        className="h-11 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-bold">Nigeria National Curriculum Sync</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Streams auto-map to NERDC subject groupings for continuous assessment report cards and WAEC/NECO candidate enrollment profiles.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-gray-600">
                    <span className="text-xs uppercase font-semibold">Offline Local Cache</span>
                    <span className="text-xs text-green-600 font-bold">Zero Latency • Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
