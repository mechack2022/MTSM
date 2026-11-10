// ============================================================================
// STAFF & APPOINTEES PAGE
// ============================================================================
// Tenant Admin page to manage appointed school leadership and staff
// across all campuses

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store'
import toast from 'react-hot-toast'
import AppointStaffModal, { AppointStaffFormData } from '@/components/modals/AppointStaffModal'
import EditStaffModal from '@/components/modals/EditStaffModal'
import ReassignStaffModal from '@/components/modals/ReassignStaffModal'
import AppointmentSuccessModal from '@/components/modals/AppointmentSuccessModal'

interface StaffMember {
  id: string
  name: string
  email: string
  role: string
  campus: string
  phone: string
  status: 'Active' | 'Pending'
  initials: string
  avatarColor: string
  staffId?: string
  monthlyLimit?: string
  photoUrl?: string
  permissions?: {
    reportCardSignOff: boolean
    staffHiring: boolean
  }
}

export default function StaffAppointeesPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCampus, setSelectedCampus] = useState('all')
  const [filterRole, setFilterRole] = useState<'all' | 'principals' | 'bursars' | 'registrars' | 'pending'>('all')
  const [isAppointModalOpen, setIsAppointModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [newAppointee, setNewAppointee] = useState<any>(null)

  // Dummy data
  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Mrs. Folake Balogun',
      email: 'f.balogun@cjet.schools.ng',
      role: 'Principal / Head of School',
      campus: 'Crown Jewel High School – Lekki',
      phone: '+234 802 334 5678',
      status: 'Active',
      initials: 'FB',
      avatarColor: 'bg-blue-100 text-blue-700',
      staffId: 'CJET-STF-001',
      monthlyLimit: '1,500,000',
      photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmTUl-rzWFmdCx44hviaKsO-qisyvrTyr4T4cJKn94NXF5Z-jA_XcF1uU4AC2WTa26sREKyPPn7N4SvP6wZBOQJJ766cRfiqAphgJwbro5WrRX322FP-Xki9ELex-84tPNG8-GduIQq330zaMl7ZgtVyj8bNfUzxKGX0Kq5VARBq2Yb1d4GCSuh1-0oTdyp2uUhbQunKD8Nk5oK8xpQnN70YHyNt7OdjAw2tCrukrrWkhvg4xH-vE7',
      permissions: {
        reportCardSignOff: true,
        staffHiring: true,
      },
    },
    {
      id: '2',
      name: 'Mr. Kenneth Okafor',
      email: 'k.okafor@cjet.schools.ng',
      role: 'Vice Principal (Academic)',
      campus: 'Ikeja Prep',
      phone: '+234 803 411 9022',
      status: 'Active',
      initials: 'KO',
      avatarColor: 'bg-teal-100 text-teal-700',
    },
    {
      id: '3',
      name: 'Dr. Amina Bello',
      email: 'a.bello@cjet.schools.ng',
      role: 'Principal',
      campus: 'Abuja Academy',
      phone: '+234 809 778 2210',
      status: 'Active',
      initials: 'AB',
      avatarColor: 'bg-purple-100 text-purple-700',
    },
    {
      id: '4',
      name: 'Mr. Babatunde Alabi',
      email: 'b.alabi@cjet.schools.ng',
      role: 'Bursar & Chief Accountant',
      campus: 'Lekki High School',
      phone: '+234 814 209 1184',
      status: 'Active',
      initials: 'BA',
      avatarColor: 'bg-gray-100 text-gray-700',
    },
    {
      id: '5',
      name: 'Mrs. Ngozi Eze',
      email: 'n.eze@cjet.schools.ng',
      role: 'Registrar',
      campus: 'Ikeja Prep',
      phone: '+234 805 667 3349',
      status: 'Active',
      initials: 'NE',
      avatarColor: 'bg-gray-100 text-gray-700',
    },
    {
      id: '6',
      name: 'Miss Fatima Yusuf',
      email: 'f.yusuf@cjet.schools.ng',
      role: 'Vice Principal (Student Affairs)',
      campus: 'Abuja Academy',
      phone: '+234 812 443 7891',
      status: 'Pending',
      initials: 'FY',
      avatarColor: 'bg-amber-100 text-amber-800',
    },
  ]

  // Filter staff
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCampus =
      selectedCampus === 'all' || staff.campus === selectedCampus

    const matchesRole =
      filterRole === 'all' ||
      (filterRole === 'principals' && staff.role.toLowerCase().includes('principal')) ||
      (filterRole === 'bursars' && staff.role.toLowerCase().includes('bursar')) ||
      (filterRole === 'registrars' && staff.role.toLowerCase().includes('registrar')) ||
      (filterRole === 'pending' && staff.status === 'Pending')

    return matchesSearch && matchesCampus && matchesRole
  })

  const totalAppointees = staffMembers.length
  const pendingInvites = staffMembers.filter(s => s.status === 'Pending').length
  const activeStaff = staffMembers.filter(s => s.status === 'Active').length

  const handleResendInvite = (name: string) => {
    toast.success(`Invitation resent to ${name}`)
  }

  const handleAppointStaff = (data: AppointStaffFormData) => {
    console.log('New staff appointment:', data)

    // Map campus codes to full names
    const campusMap: Record<string, string> = {
      'lekki': 'Crown Jewel High School – Lekki',
      'ikeja': 'Crown Jewel Preparatory – Ikeja',
      'abuja': 'Crown Jewel Academy – Abuja (Asokoro)',
      'central': 'Central Academic Trust Secretariat'
    }

    // Map role codes to display names
    const roleMap: Record<string, string> = {
      'principal': 'Principal / Head of School',
      'vice_principal': 'Vice Principal / Deputy Head',
      'bursar_director': 'Bursar / Director of Finance',
      'registrar_director': 'Campus Administrator / Registrar'
    }

    // Store the new appointee data for the success modal
    setNewAppointee({
      fullName: data.fullName,
      designation: roleMap[data.role] || data.role,
      campus: campusMap[data.campus] || data.campus,
      staffId: data.staffId || 'CJET-STF-NEW',
      monthlyLimit: '1,500,000',
      phone: data.phone,
      email: data.email,
      initials: data.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    })

    // Close appointment modal and open success modal
    setIsAppointModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  const handleEditStaff = (staff: StaffMember) => {
    setSelectedStaff(staff)
    setIsEditModalOpen(true)
  }

  const handleSaveStaff = (updatedStaff: any) => {
    console.log('Updated staff data:', updatedStaff)
    toast.success(`Changes saved successfully for ${updatedStaff.name}`)
  }

  const handleReassignStaff = (staff: StaffMember) => {
    setSelectedStaff(staff)
    setIsReassignModalOpen(true)
  }

  const handleConfirmReassignment = (data: { staffId: string; newCampus: string; newRole: string; effectiveDate: string; handoverNote: string; sendNotification: boolean }) => {
    console.log('Reassignment data:', data)
    // Find the staff member to get their name for the toast message
    const staff = staffMembers.find(s => s.id === data.staffId)
    if (staff) {
      toast.success(`${staff.name} successfully reassigned to ${data.newCampus}`)
    } else {
      toast.success(`Staff successfully reassigned to ${data.newCampus}`)
    }
  }

  const handleSuspendStaff = (staffId: string) => {
    console.log('Suspending staff:', staffId)
    toast.success('Staff access suspended successfully')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 flex flex-col justify-between py-5 px-4 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Tenant Card */}
          <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                C
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-gray-900 leading-tight">CJET TRUST</span>
                <span className="text-xs text-gray-500 font-medium">Crown Jewel Trust</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => navigate('/tenant-admin/dashboard')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/my-schools-campuses')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>My Schools / Campuses</span>
            </button>
            {/* Active link: Staff & Appointees */}
            <button
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md transition-all"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              <span>Staff & Appointees</span>
            </button>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Student Directory</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Billing & Plan Quota</span>
            </a>
            <button
              onClick={() => navigate('/tenant-admin/audit-logs')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm w-full text-left"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Audit Logs</span>
            </button>
            <button
              onClick={() => navigate('/tenant-admin/settings')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium text-sm w-full text-left"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Tier & Usage Badge */}
        <div className="pt-4 border-t border-gray-100">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50/50 border border-gray-200 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Enterprise Tier</span>
              </div>
              <span className="text-xs font-semibold text-gray-700">3 Campuses</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">3 of 5 school licenses assigned</span>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="pl-64 w-full flex flex-col min-h-screen">
        {/* Top Navigation Header */}
        <header className="sticky top-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 z-40 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 text-white font-extrabold text-base shadow-sm">
                E
              </div>
              <span className="text-lg text-gray-900 font-bold tracking-tight">EduManage</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>NG GovCloud
              </span>
            </div>
            <div className="h-5 w-px bg-gray-200 mx-2"></div>
            {/* Campus / Trust Context Breadcrumb */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer transition-colors text-xs font-medium border border-gray-200">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-semibold text-gray-800">Crown Jewel Education Trust</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Proprietor</span>
              <svg className="w-4 h-4 text-gray-400 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Right Header Actions & Profile */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative flex items-center">
              <svg className="w-4 h-4 absolute left-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-64 pl-9 pr-4 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                placeholder="Search records, staff, logs..."
                type="text"
              />
            </div>
            {/* Online & Synced Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online & Synced</span>
            </div>
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-500 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            {/* User Profile Pill */}
            <div className="flex items-center gap-3 pl-1 cursor-pointer group">
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">Dr. Aliyu Mohammed</span>
                <span className="text-[11px] text-gray-500 font-medium">Lead Proprietor</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-blue-100 shadow-sm">
                AM
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full px-8 py-8 flex flex-col gap-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight">Staff & Appointees</h1>
              <p className="text-sm text-gray-500 font-normal leading-relaxed">
                Manage appointed school leadership and staff across your campuses.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-xs tracking-wide shadow-sm hover:border-gray-300 transition-all">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setIsAppointModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-md transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>+ Appoint Staff</span>
              </button>
            </div>
          </header>

          {/* KPI Metric Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Appointees</span>
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-bold text-3xl text-gray-900">{totalAppointees}</span>
                <p className="text-xs text-gray-500 mt-1">Principals, Vice Principals, Bursars</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Campuses Covered</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-3xl text-gray-900">3 of 3</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">100% Assigned</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Lekki, Ikeja & Abuja campuses</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Invites</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-3xl text-gray-900">{pendingInvites}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">Awaiting Acceptance</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Invitations delivered</p>
              </div>
            </div>
          </section>

          {/* Filter, Search & Campus Select Module */}
          <section className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  className="w-full pl-11 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="Search by name or email..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative shrink-0">
                <select
                  className="appearance-none bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-semibold pl-3.5 pr-9 py-2.5 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                >
                  <option value="all">All Campuses</option>
                  <option value="Lekki High School">Lekki High School</option>
                  <option value="Ikeja Prep">Ikeja Prep</option>
                  <option value="Abuja Academy">Abuja Academy</option>
                </select>
                <svg className="w-4 h-4 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 pt-0.5">
              <button
                onClick={() => setFilterRole('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterRole === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                All Appointees
              </button>
              <button
                onClick={() => setFilterRole('principals')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterRole === 'principals'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Principals & Vice Principals
              </button>
              <button
                onClick={() => setFilterRole('bursars')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterRole === 'bursars'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Bursars & Financial Officers
              </button>
              <button
                onClick={() => setFilterRole('registrars')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterRole === 'registrars'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Registrars
              </button>
              <button
                onClick={() => setFilterRole('pending')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  filterRole === 'pending'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-amber-50 border border-amber-200 text-amber-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Pending Invites ({pendingInvites})
              </button>
            </div>
          </section>

          {/* Main Staff Directory Table */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-6">Name & Email</th>
                    <th className="py-3.5 px-6">Appointed Role</th>
                    <th className="py-3.5 px-6">Assigned Campus</th>
                    <th className="py-3.5 px-6">Phone Number</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800 text-sm">
                  {filteredStaff.map((staff) => (
                    <tr
                      key={staff.id}
                      className={`transition-colors ${
                        staff.status === 'Pending'
                          ? 'hover:bg-amber-50/40 bg-amber-50/15'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${staff.avatarColor} font-bold text-xs flex items-center justify-center shrink-0`}>
                            {staff.initials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-gray-900 truncate">{staff.name}</span>
                            <span className="text-xs text-gray-500 truncate">{staff.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-800 text-xs">{staff.role}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs text-gray-600">{staff.campus}</span>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-gray-600">
                        {staff.phone}
                      </td>
                      <td className="py-4 px-6">
                        {staff.status === 'Active' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          {staff.status === 'Active' ? (
                            <>
                              <button
                                onClick={() => handleReassignStaff(staff)}
                                className="px-2.5 py-1 text-xs font-semibold text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              >
                                Reassign
                              </button>
                              <button
                                onClick={() => handleEditStaff(staff)}
                                className="px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                Edit
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleResendInvite(staff.name)}
                              className="px-2.5 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            >
                              Resend
                            </button>
                          )}
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination & Summary */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <span className="text-xs text-gray-500 text-center sm:text-left">
                Showing <span className="font-bold text-gray-700">1 to {filteredStaff.length}</span> of <span className="font-bold text-gray-700">{totalAppointees}</span> appointed staff members
              </span>
              <div className="flex items-center gap-1.5">
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-400 text-xs font-semibold cursor-not-allowed" disabled>
                  Previous
                </button>
                <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center transition-colors">
                  3
                </button>
                <span className="px-1 text-gray-400 text-xs">...</span>
                <button className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center transition-colors">
                  12
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors shadow-sm">
                  Next
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Appoint Staff Modal */}
      <AppointStaffModal
        isOpen={isAppointModalOpen}
        onClose={() => setIsAppointModalOpen(false)}
        onSubmit={handleAppointStaff}
      />

      {/* Edit Staff Modal */}
      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staff={selectedStaff}
        onSave={handleSaveStaff}
        onSuspend={handleSuspendStaff}
      />

      {/* Reassign Staff Modal */}
      <ReassignStaffModal
        isOpen={isReassignModalOpen}
        onClose={() => setIsReassignModalOpen(false)}
        staff={selectedStaff}
        onReassign={handleConfirmReassignment}
      />

      {/* Appointment Success Modal */}
      <AppointmentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        appointee={newAppointee}
      />
    </div>
  )
}
