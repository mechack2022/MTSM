// ============================================================================
// VIEW HOMEROOM MODAL
// ============================================================================
// Modal for viewing homeroom/class details and student roster
// - Class information and statistics
// - Student list with attendance status
// - Class performance metrics
// - Homeroom teacher responsibilities
// ============================================================================

interface Student {
  id: string
  name: string
  admissionNumber: string
  gender: 'M' | 'F'
  attendanceRate: number
  performanceStatus: 'Excellent' | 'Good' | 'Needs Support'
}

interface ViewHomeroomModalProps {
  isOpen: boolean
  onClose: () => void
  className: string
  teacherName: string
  assistant?: string
}

export default function ViewHomeroomModal({ isOpen, onClose, className, teacherName, assistant }: ViewHomeroomModalProps) {
  if (!isOpen) return null

  // Sample student data
  const students: Student[] = [
    { id: 'STU-001', name: 'Adebayo Chioma', admissionNumber: 'ADM/2023/456', gender: 'F', attendanceRate: 98, performanceStatus: 'Excellent' },
    { id: 'STU-002', name: 'Ibrahim Yakubu', admissionNumber: 'ADM/2023/457', gender: 'M', attendanceRate: 95, performanceStatus: 'Good' },
    { id: 'STU-003', name: 'Okonkwo Grace', admissionNumber: 'ADM/2023/458', gender: 'F', attendanceRate: 92, performanceStatus: 'Excellent' },
    { id: 'STU-004', name: 'Mohammed Aisha', admissionNumber: 'ADM/2023/459', gender: 'F', attendanceRate: 88, performanceStatus: 'Good' },
    { id: 'STU-005', name: 'Eze Samuel', admissionNumber: 'ADM/2023/460', gender: 'M', attendanceRate: 75, performanceStatus: 'Needs Support' },
    { id: 'STU-006', name: 'Nwosu Chinedu', admissionNumber: 'ADM/2023/461', gender: 'M', attendanceRate: 94, performanceStatus: 'Good' },
  ]

  const maleCount = students.filter(s => s.gender === 'M').length
  const femaleCount = students.filter(s => s.gender === 'F').length
  const avgAttendance = (students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length).toFixed(1)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto">
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl my-auto bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] rounded-2xl shadow-[0_24px_48px_-12px_rgba(19,27,46,0.25),0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-lowest,#ffffff)] flex items-start justify-between sticky top-0 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mt-0.5 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface,#1a1c1e)] tracking-tight">{className}</h2>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Homeroom Class</span>
              </div>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant,#44474e)] mt-0.5">
                Lead Teacher: {teacherName} {assistant && `· Assistant: ${assistant}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-[var(--md-sys-color-surface-container-low,#f2f3ff)] hover:bg-[var(--md-sys-color-surface-container,#eaedff)] text-[var(--md-sys-color-on-surface-variant,#434655)] hover:text-[var(--md-sys-color-on-surface,#131b2e)] flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Class Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs font-semibold text-blue-900 uppercase">Total Students</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{students.length}</p>
              <p className="text-xs text-blue-700 mt-1">{maleCount} Male · {femaleCount} Female</p>
            </div>

            <div className="p-4 rounded-xl bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-green-900 uppercase">Avg Attendance</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{avgAttendance}%</p>
              <p className="text-xs text-green-700 mt-1">This term</p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-xs font-semibold text-purple-900 uppercase">Subjects</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">8</p>
              <p className="text-xs text-purple-700 mt-1">Core curriculum</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-amber-900 uppercase">Class Room</span>
              </div>
              <p className="text-lg font-bold text-amber-900">Room 204</p>
              <p className="text-xs text-amber-700 mt-1">Block B, Floor 2</p>
            </div>
          </div>

          {/* Student Roster */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Student Roster</h3>
              <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-all flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export List</span>
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">#</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Admission No.</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Gender</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Attendance</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{student.admissionNumber}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          student.gender === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                        }`}>
                          {student.gender === 'M' ? 'Male' : 'Female'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-sm font-bold ${
                            student.attendanceRate >= 90 ? 'text-green-600' :
                            student.attendanceRate >= 75 ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {student.attendanceRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          student.performanceStatus === 'Excellent' ? 'bg-green-100 text-green-700' :
                          student.performanceStatus === 'Good' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {student.performanceStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher Responsibilities */}
          <div className="p-4 rounded-xl bg-blue-50">
            <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Homeroom Teacher Responsibilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-900">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></span>
                <span>Daily roll call and attendance tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></span>
                <span>Morning assembly coordination</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></span>
                <span>Student psycho-social welfare tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></span>
                <span>Parent communication and reports</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--md-sys-color-surface-container-low,#f5f5f5)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Class is active for 2024/2025 Term 1</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold shadow-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
