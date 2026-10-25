export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Good morning, Mr. Ademola Ojo</h2>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full">
                FORM TEACHER • BASIC 5 EMERALD
              </span>
              <span className="text-gray-700 text-sm">
                <strong>42</strong> enrolled pupils • Session 2024/2025 • Term 2
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Your classroom is ready. You have <strong>3 periods</strong> today. Current: Mathematics (Period 2, 09:30-10:15)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              Quick Notice
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
              Mark Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Class Enrollment */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-600 uppercase mb-2">Class Enrollment</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900">42</h3>
            <span className="text-sm text-gray-600">pupils</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">21 boys • 21 girls</p>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-600 uppercase mb-2">Today's Attendance</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-emerald-600">40/42</h3>
          </div>
          <p className="text-xs text-emerald-600 mt-1">98.3% present</p>
          <div className="mt-2 bg-gray-200 rounded-full h-1.5">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '98.3%' }}></div>
          </div>
        </div>

        {/* Term 2 CA Progress */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-600 uppercase mb-2">Term 2 CA Progress</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-blue-600">38/42</h3>
          </div>
          <p className="text-xs text-gray-600 mt-1">2nd CA grading</p>
          <div className="mt-2 bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '90.5%' }}></div>
          </div>
        </div>

        {/* Curriculum & Notes */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-600 uppercase mb-2">Curriculum & Notes</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-purple-600">Week 7</h3>
          </div>
          <p className="text-xs text-gray-600 mt-1">NERDC aligned</p>
          <p className="text-xs text-purple-600 mt-1">3 lesson plans pending</p>
        </div>
      </div>

      {/* Today's Teaching Schedule */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Teaching Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Period */}
          <div className="border-2 border-emerald-300 bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-1 bg-emerald-600 text-white text-xs font-bold rounded">CURRENT</span>
              <span className="text-sm font-medium text-gray-700">09:30 - 10:15</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Mathematics</h4>
            <p className="text-sm text-gray-700 mb-2">Period 2 • Basic 5 Emerald</p>
            <p className="text-xs text-gray-600 mb-3">Topic: Volume of Prisms & Cubes</p>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Lesson notes approved</span>
            </div>
            <button className="w-full px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">
              Resume Class
            </button>
          </div>

          {/* Next Period */}
          <div className="border border-blue-300 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">NEXT</span>
              <span className="text-sm font-medium text-gray-700">10:45 - 11:30</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">English Language</h4>
            <p className="text-sm text-gray-700 mb-2">Period 3 • Basic 5 Emerald</p>
            <p className="text-xs text-gray-600 mb-3">Topic: Narrative Composition</p>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Lesson plan ready</span>
            </div>
            <button className="w-full px-4 py-2 bg-white border border-blue-300 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100">
              Prepare
            </button>
          </div>

          {/* Upcoming Period */}
          <div className="border border-gray-300 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-1 bg-gray-400 text-white text-xs font-bold rounded">UPCOMING</span>
              <span className="text-sm font-medium text-gray-700">13:00 - 13:45</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Basic Science</h4>
            <p className="text-sm text-gray-700 mb-2">Period 5 • Basic 5 Emerald</p>
            <p className="text-xs text-gray-600 mb-3">Topic: States of Matter</p>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>After mid-day break</span>
            </div>
            <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100">
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Teaching Aid & Inactive Observer Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Classroom Register */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic 5 Emerald • Classroom Register</h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Export
                </button>
                <button className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700">
                  Take Attendance
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">#</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">PUPIL NAME</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">ADMISSION NO.</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">STATUS</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">PUNCTUALITY</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">QUICK CONTACT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { id: 1, name: 'Adebayo Chioma', admNo: 'EME/2023/001', status: 'present', time: '07:45', contact: '0803 456 7890' },
                    { id: 2, name: 'Okonkwo Michael', admNo: 'EME/2023/002', status: 'present', time: '07:50', contact: '0806 234 5678' },
                    { id: 3, name: 'Amina Ibrahim', admNo: 'EME/2023/003', status: 'present', time: '07:42', contact: '0809 876 5432' },
                    { id: 4, name: 'Taiwo Emmanuel', admNo: 'EME/2023/004', status: 'absent', time: '-', contact: '0805 123 4567' },
                    { id: 5, name: 'Ngozi Okeke', admNo: 'EME/2023/005', status: 'present', time: '07:55', contact: '0807 654 3210' },
                    { id: 6, name: 'Yusuf Abdullahi', admNo: 'EME/2023/006', status: 'present', time: '07:48', contact: '0802 345 6789' },
                    { id: 7, name: 'Blessing Eze', admNo: 'EME/2023/007', status: 'present', time: '07:51', contact: '0808 987 6543' },
                    { id: 8, name: 'Chukwudi Daniel', admNo: 'EME/2023/008', status: 'late', time: '08:10', contact: '0804 567 8901' },
                  ].map((pupil) => (
                    <tr key={pupil.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">{pupil.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-700 text-xs font-semibold">
                              {pupil.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{pupil.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{pupil.admNo}</td>
                      <td className="py-3 px-4">
                        {pupil.status === 'present' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Present
                          </span>
                        )}
                        {pupil.status === 'absent' && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            Absent
                          </span>
                        )}
                        {pupil.status === 'late' && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                            Late
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{pupil.time}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 text-xs">
                          {pupil.contact}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>Showing 8 of 42 pupils</span>
              <button className="text-blue-600 hover:text-blue-800 font-medium">View All →</button>
            </div>
          </div>

          {/* Mathematics 2nd CA Grading Grid */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Mathematics • 2nd CA Grading Grid</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">38/42 graded</span>
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Continue Grading
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">PUPIL NAME</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Q1 (5)</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Q2 (5)</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Q3 (5)</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">Q4 (5)</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">TOTAL (20)</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Adebayo Chioma', scores: [5, 4, 5, 4], total: 18 },
                    { name: 'Okonkwo Michael', scores: [5, 5, 5, 5], total: 20 },
                    { name: 'Amina Ibrahim', scores: [4, 4, 5, 3], total: 16 },
                    { name: 'Taiwo Emmanuel', scores: [3, 4, 3, 4], total: 14 },
                    { name: 'Ngozi Okeke', scores: [5, 5, 4, 5], total: 19 },
                    { name: 'Yusuf Abdullahi', scores: null, total: null },
                  ].map((record, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{record.name}</td>
                      {record.scores ? (
                        <>
                          {record.scores.map((score, i) => (
                            <td key={i} className="py-3 px-4 text-center">
                              <span className={`inline-block w-8 h-8 rounded ${
                                score === 5 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                              } font-semibold leading-8`}>
                                {score}
                              </span>
                            </td>
                          ))}
                          <td className="py-3 px-4 text-center font-bold text-gray-900">{record.total}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="font-semibold text-emerald-600">{((record.total! / 20) * 100).toFixed(0)}%</span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td colSpan={6} className="py-3 px-4 text-center">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Grade Now →
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Teaching Aid & Observer */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Teaching Aid & Inactive Observer</h4>
            <div className="bg-gray-100 rounded-lg h-32 mb-3 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-500">Classroom Photo</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              <strong>Observer:</strong> Mrs. Funke Adeyemi (VP Academics)
            </p>
            <p className="text-xs text-gray-600">
              Last visit: <strong>March 8, 2025</strong> • Period 4
            </p>
          </div>

          {/* Quick Class Notice */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Class Notice</h4>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={4}
              placeholder="Type a notice to your class (e.g., homework reminder, upcoming test...)"
            />
            <button className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">
              Post Notice
            </button>
          </div>

          {/* Guardian Diary & Direct Notes */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Guardian Diary & Direct Notes</h4>
            <div className="space-y-2">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2 mb-1">
                  <svg className="w-4 h-4 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Pending Response</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Mrs. Okonkwo asked about Michael's homework submission
                    </p>
                  </div>
                </div>
                <button className="text-xs text-amber-700 font-medium hover:text-amber-800">
                  Reply →
                </button>
              </div>
              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Send Direct Note
              </button>
            </div>
          </div>

          {/* Lesson Notes & Curriculum */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Lesson Notes & Curriculum</h4>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-xs font-medium text-gray-900 mb-1">NERDC Week 7 Topics</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• MTH-05: Volume of Prisms</li>
                  <li>• ENG-05: Narrative Writing</li>
                  <li>• SCI-05: States of Matter</li>
                </ul>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">3 pending approvals</span>
                <button className="text-purple-600 hover:text-purple-800 font-medium">
                  View All →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Compliance Footer */}
      <div className="bg-gray-100 border-t border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-6">
            <span>
              <strong>Federal Republic of Nigeria</strong> • NERDC Curriculum Aligned
            </span>
            <span>
              Session <strong>2024/2025</strong> • Term <strong>2</strong>
            </span>
            <span>
              Class <strong>Basic 5 Emerald</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-green-700 font-medium">NERDC Compliant</span>
          </div>
        </div>
      </div>
    </div>
  )
}
