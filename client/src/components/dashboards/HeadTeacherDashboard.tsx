export default function HeadTeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Chief Academic Directorate</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded">UBEC + NERDC COMPLIANT</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">MID-TERM PHASE</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Welcome back, <span className="font-semibold">Mrs. Folashade Adebayo</span> • Head of School & Chief Academic Officer</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Academic Term: <strong>2024/2025 Second Term • Week 7 of 13</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Broadsheet Portal Open: <strong>1st-2nd CA Capturing</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Approve Lesson Plans (6 Pending)
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Verify CA Broadsheet
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Curriculum Guide (NERDC)
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Curriculum Delivery */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded">TARGET 80%</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-gray-900">84.2%</h3>
            <span className="text-sm text-green-600 font-semibold">+4.2% ahead</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Curriculum Delivery</p>
          <p className="text-xs text-gray-600">Tracking against standard NERDC schemes of work across Basic 1-6, JSS, and SSS blocks.</p>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84.2%' }}></div>
            </div>
          </div>
        </div>

        {/* CA Submission Rate */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded">MID-TERM CA</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-gray-900">92.0%</h3>
            <span className="text-sm text-gray-600">28 / 30 Classes</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">CA Submission Rate</p>
          <p className="text-xs text-gray-600">1st CA (20 Marks) broadsheet certified, 2nd CA (20 Marks) upload nearing closure.</p>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-teal-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

        {/* Weekly Lesson Notes */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">6 NEEDS SIGNATURE</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-gray-900">42</h3>
            <span className="text-sm text-gray-600">/ 48</span>
            <span className="text-sm text-blue-600 font-semibold">87.9% Vetted</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Weekly Lesson Notes</p>
          <p className="text-xs text-gray-600">Reviewed by Vice Principals - Academics, awaiting final digital endorsement.</p>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '87.9%' }}></div>
            </div>
          </div>
        </div>

        {/* Classroom Engagement */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">LIVE TODAY</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-4xl font-bold text-gray-900">98.2%</h3>
            <span className="text-sm text-gray-600">35/36 Periods</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Classroom Engagement</p>
          <p className="text-xs text-gray-600">Biometric card attendance cross-referenced with smart register logging.</p>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '98.2%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson Plan Endorsement Queue - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Lesson Plan Endorsement Queue</h3>
                <p className="text-sm text-gray-600">Week 7 instructional plans requiring Principal's statutory review and signature.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded">4 ITEMS REMAINING</span>
          </div>

          {/* Lesson Plan Items */}
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Basic 5 Mathematics • Volume of Prisms...</h4>
                  <p className="text-sm text-gray-600 mb-2">NERDC MTH--05</p>
                  <p className="text-sm text-gray-700 mb-2">Instructor: <strong>Mr. Funke Eze</strong> • Behavioral Objectives & Concrete Abacus Aids</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Abacus & Prism Nets (.pdf)</span>
                    </div>
                    <span>•</span>
                    <span>VP Academics: <strong>Recommended</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
                    Remarks
                  </button>
                  <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Endorse
                  </button>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-teal-700">EN</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Basic 3 English • Diphthongs & Oral/Ph...</h4>
                  <p className="text-sm text-gray-600 mb-2">NERDC ENG--03</p>
                  <p className="text-sm text-gray-700 mb-2">Instructor: <strong>Mrs. Funke Johnson</strong> • Jolly Phonics Audio Tracks & Flashcards</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      <span>Audio Clip (4.2 MB)</span>
                    </div>
                    <span>•</span>
                    <span>VP Academics: <strong>Recommended</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
                    Remarks
                  </button>
                  <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Endorse
                  </button>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">JSS 2 Basic Science • Ecological Habit...</h4>
                  <p className="text-sm text-gray-600 mb-2">BECE SCI--02</p>
                  <p className="text-sm text-gray-700 mb-2">Instructor: <strong>Mr. Kelechi Bello</strong> • Campus Botanical Garden Lab Walk</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Lab Practical Guide</span>
                    </div>
                    <span>•</span>
                    <span>Safety Check: <strong>Cleared</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
                    Remarks
                  </button>
                  <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Endorse
                  </button>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">SSS 1 Chemistry • Electronic Configur...</h4>
                  <p className="text-sm text-gray-600 mb-2">WAEC CHEM--01</p>
                  <p className="text-sm text-gray-700 mb-2">Instructor: <strong>Dr. Aliyu Musa</strong> • Hund's Rule & Bohr Model Sim</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Periodic 3D Models</span>
                    </div>
                    <span>•</span>
                    <span>VP Academics: <strong>Recommended</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
                    Remarks
                  </button>
                  <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Endorse
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grading Format Info */}
          <div className="mt-6 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-semibold text-gray-700">Statutory Grading Format:</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-700">1st CA: <strong>20 Marks</strong></span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-700">2nd CA / Project: <strong>20 Marks</strong></span>
                <span className="text-gray-400">→</span>
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">Terminal Exam: 60 Marks</span>
                <span className="text-gray-400">→</span>
                <span className="px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded">100% Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Continuous Assessment Broadsheet */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Continuous Assessment Broadsheet</h3>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-4">Ongoing monitoring for Cognitive, Affective & Psychomotor scores.</p>

            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">● Basic 6 (Emerald & Sapphire)</span>
                  <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded">100% Locked</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <p><strong>58 Candidates registered</strong></p>
                  <p className="text-green-700 font-medium">NCEE Ready</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">● Basic 5 (Gold & Silver)</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">94% Submitted</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <p><strong>42 Pupils</strong></p>
                  <p className="text-blue-700 font-medium">2 Pending</p>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">● Basic 4 (Ruby & Diamond)</span>
                  <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded">Online & Synced</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <p><strong>54 Pupils</strong></p>
                  <p className="text-purple-700 font-medium">French & Yoruba Oral marks compiling</p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">● JSS 3 (Alpha & Beta)</span>
                  <span className="px-2 py-0.5 bg-amber-600 text-white text-xs font-bold rounded">92% Submitted</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <p><strong>72 Candidates</strong></p>
                  <p className="text-amber-700 font-medium">State BECE Mock in 12 days</p>
                </div>
              </div>

              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">● SSS 3 (Science & Arts)</span>
                  <span className="px-2 py-0.5 bg-teal-600 text-white text-xs font-bold rounded">68% Submitted</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <p><strong>64 Candidates</strong></p>
                  <p className="text-teal-700 font-medium">WAEC/NECO Registration Verified</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
                <p className="font-semibold text-gray-900 mb-1">Broadsheet Verification Protocol:</p>
                <p>Cognitive scores + 40 in GA trigger standard moderation review before broadsheet printing.</p>
              </div>
            </div>
          </div>

          {/* Statutory Examination Readiness */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-semibold text-gray-900">Statutory Examination Readiness</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">NECCO • WAEC • NCEE</p>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Live compliance tracker for federal and state external assessment clarifications.</p>
              </div>

              <div className="p-3 border border-teal-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-teal-600 text-white text-xs font-bold rounded">NCEE</span>
                    <span className="text-sm font-semibold text-gray-900">National Common Entrance</span>
                  </div>
                  <span className="px-2 py-1 bg-teal-500 text-white text-xs font-bold rounded">100% READY</span>
                </div>
                <p className="text-xs text-gray-600">58/58 Candidates Registered •</p>
                <p className="text-xs text-gray-600">Biometrics Verified</p>
              </div>

              <div className="p-3 border border-amber-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-amber-600 text-white text-xs font-bold rounded">BECE</span>
                    <span className="text-sm font-semibold text-gray-900">Junior WAEC (State & NECO)</span>
                  </div>
                  <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded">VETTING 91%</span>
                </div>
                <p className="text-xs text-gray-600">Internal Mock Q-Bank: 11 of 12</p>
                <p className="text-xs text-gray-600">Subjects Vetted</p>
              </div>

              <div className="p-3 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">WAEC</span>
                    <span className="text-sm font-semibold text-gray-900">WASSCE 2025 Offline CASS</span>
                  </div>
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">VERIFIED</span>
                </div>
                <p className="text-xs text-gray-600">SS1 & SS2 Continuous Assessment</p>
                <p className="text-xs text-gray-600">Synced</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Trigger Statutory Exam CASS Sync (Lagos MoE)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Unannounced Instructional Walkthroughs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Today's Unannounced Instructional Walkthroughs</h3>
              <p className="text-sm text-gray-600">Evaluating pedagogy, student participatory engagement, and NERDC syllabus pacing.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded">2 SESSIONS TODAY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">10:15 AM • PERIOD 3</span>
                <span className="px-2 py-1 bg-teal-500 text-white text-xs font-medium rounded">Scheduled</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Basic 4 Ruby</h4>
            <p className="text-sm text-gray-700 mb-2">Subject: <strong>English Phonics & Diction</strong></p>
            <p className="text-sm text-gray-600 mb-2">Teacher: <strong>Miss Chiamaka Okonkwo</strong></p>
            <p className="text-xs text-gray-600">Observation focus: Audio-visual engagement, differentiated questioning for slower learners.</p>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Open Observation Rubric →
              </button>
            </div>
          </div>

          <div className="border border-teal-200 bg-teal-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-teal-600 text-white text-xs font-bold rounded">01:45 PM • PERIOD 6</span>
                <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded">Pending</span>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Basic 6 Sapphire</h4>
            <p className="text-sm text-gray-700 mb-2">Subject: <strong>NCEE Math: Quantitative Aptitude</strong></p>
            <p className="text-sm text-gray-600 mb-2">Teacher: <strong>Mr. Babatunde Sanni</strong></p>
            <p className="text-xs text-gray-600">Observation focus: Speed drill, timed discipline, mock exam shading accuracy.</p>
            <div className="mt-3 flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Open Mock Drill Sheet →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last Week's Lesson Delivery Score: <strong>4.8 / 5.0 Quality Rating</strong> across 18 audited teachers.</span>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All Reports →</button>
        </div>
      </div>
    </div>
  )
}
