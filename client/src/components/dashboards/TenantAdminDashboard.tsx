export default function TenantAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Chief Dr. O. Alabi</h2>
          <p className="text-gray-600">Proprietor & Governing Board Chair</p>
          <p className="text-sm text-gray-500">Educational Operations | Lagos LG, Area IV, FCT III, Port Harcourt LG</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-gray-600">ACADEMIC YEAR</p>
            <p className="font-semibold text-gray-900">2024/2025 • 2nd Term</p>
          </div>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
            + New Campus
          </button>
        </div>
      </div>

      {/* Active Alert Banner */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-start gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">Hybrid Edge Mesh Architecture</h3>
            <span className="px-2 py-0.5 bg-teal-500 text-white text-xs font-medium rounded">BETA PHASE CONCLUDED</span>
          </div>
          <p className="text-sm text-gray-700">4 Campuses On-Prem: SSO w/ Node operational with seamless cloud migration to AWS Lagos Local Zone Prem (et sacah-14)</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              <span className="text-gray-600">4/5 Nodes Synced</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-gray-600">461-284 Encrypted</span>
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Enrollment */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">TOTAL ENROLLMENT</p>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-4xl font-bold text-gray-900">4,120</h3>
            <span className="text-green-600 text-sm font-medium">+4.3%</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600 mt-3">
            <div>
              <p className="text-gray-500">Oct-Dec</p>
              <p className="font-semibold">280</p>
            </div>
            <div>
              <p className="text-gray-500">Nov 7</p>
              <p className="font-semibold">1,840</p>
            </div>
            <div>
              <p className="text-gray-500">1ST / Reporting</p>
              <p className="font-semibold">2,000</p>
            </div>
          </div>
        </div>

        {/* Revenue Realized */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">REVENUE REALIZED</p>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-4xl font-bold text-gray-900">₦92.40M</h3>
            <span className="text-gray-500 text-sm">of 91</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">In Net New Rev. Paid To Date</p>
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Nig Inst</span>
              <span className="font-semibold">190</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-600">Pending</span>
              <span className="font-semibold">Defaulters</span>
            </div>
          </div>
        </div>

        {/* Group Headcount */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">GROUP HEADCOUNT</p>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-4xl font-bold text-gray-900">218</h3>
            <span className="text-green-600 text-sm font-medium">Staff Total</span>
          </div>
          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-gray-600">67% Teachers &</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              <span className="text-gray-600">33% Support</span>
            </div>
          </div>
        </div>

        {/* Regulatory Health */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">REGULATORY HEALTH</p>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-4xl font-bold text-green-600">100%</h3>
            <span className="text-gray-500 text-sm">Clear 4</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">In UBEC, WAEC, Cambridge, JAMB 2025</p>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Audit CLEARANCE - Nov 2025</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">Valid/Situ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Details & Other Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campus Operational Table - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Campus Operational & Edge Sync Matrix</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View campus edge sync dashboard</button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 pb-3 border-b border-gray-200 text-xs font-medium text-gray-600">
            <div className="col-span-2">CAMPUS / LOCATION</div>
            <div>HEAD OF SCHOOL</div>
            <div>ENROLLMENT</div>
            <div>FEE COLLECTION</div>
            <div>DAILY SYNC STATUS</div>
            <div>EDG NODE</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-0 divide-y divide-gray-100">
            {/* Lekki Campus */}
            <div className="grid grid-cols-7 gap-4 py-4 text-sm items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-2">
                <p className="font-medium text-gray-900">Lekki Campus</p>
                <p className="text-xs text-gray-500">Lekki Peninsula | Phase 1+ | PH362</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-700">MO</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mrs. A. Ogunyoyi</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">1,120</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">94%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '97.8%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">97.8%</span>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Up
                </span>
              </div>
            </div>

            {/* Ikeja College */}
            <div className="grid grid-cols-7 gap-4 py-4 text-sm items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-2">
                <p className="font-medium text-gray-900">Ikeja College</p>
                <p className="text-xs text-gray-500">GRA-Ikeja | Lagos + GIS | Comp/P03</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-teal-700">DB</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dr. F. Bello</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">1,653</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '96.1%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">96.1%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '96.3%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">96.3%</span>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Up
                </span>
              </div>
            </div>

            {/* Abuja Central Academy */}
            <div className="grid grid-cols-7 gap-4 py-4 text-sm items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-2">
                <p className="font-medium text-gray-900">Abuja Central Academy</p>
                <p className="text-xs text-gray-500">Area IV | Wuse II | Garki | Area I ICT +</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-purple-700">HA</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Hajia H. Asema</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">820</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '99.9%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">99.9%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '94.5%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">94.5%</span>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Up
                </span>
              </div>
            </div>

            {/* Port Harcourt Science School */}
            <div className="grid grid-cols-7 gap-4 py-4 text-sm items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-2">
                <p className="font-medium text-gray-900">Port Harcourt Science School</p>
                <p className="text-xs text-gray-500">GRA Phase 2 / PH, Rivers State Port</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-amber-700">ED</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Engr. T. Danziell</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">700</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '88.2%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">88.2%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '85.1%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">85.1%</span>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  4.2s
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
            Showing active branches. <button className="text-blue-600 hover:text-blue-700 font-medium">Consolidated (4) campus uploaded live via background push operation</button>
            <button className="text-blue-600 hover:text-blue-700 font-medium ml-2">Export CSV/Excel</button>
          </div>
        </div>

        {/* Right Column - Alerts and Deadlines */}
        <div className="space-y-6">
          {/* Board & State Deadlines */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-gray-900">Board & State Deadlines</h3>
            </div>

            <div className="space-y-3">
              <div className="pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">MINISTRY CENSUS</p>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">15 Days Left</span>
                </div>
                <p className="text-xs text-gray-600">Lagos & FCT Annual Report</p>
                <p className="text-xs text-gray-900 font-medium mt-1">Campus</p>
                <p className="text-xs text-gray-600">IVERS Academic: student records and campus passporting, state & Campus Transport logs</p>
                <div className="mt-2">
                  <span className="text-xs text-green-600 font-medium">92% Ready</span>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div className="bg-green-500 h-1 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">Complete & Sign</button>
              </div>

              <div className="pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">WAEC e-REG</p>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">45 Days</span>
                </div>
                <p className="text-xs text-gray-600">Senior SSS 3-Candidates Enr</p>
                <p className="text-xs text-gray-600 mt-1">Candidate: enrolled across three Base & non-campus transport [online]</p>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">View Details</button>
              </div>

              <div>
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">GOVERNANCE</p>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">Mon 18, 2025</span>
                </div>
                <p className="text-xs text-gray-600">Annual Governing Council AGM</p>
                <p className="text-xs text-gray-600 mt-1">Executives @ Lagos Continental Hotel</p>
                <p className="text-xs text-gray-500 mt-1">Agenda: Draft +11 • <span className="text-blue-600">Download(Draft)</span></p>
              </div>
            </div>
          </div>

          {/* Compliance Registry */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-semibold text-gray-900">Clearance & Compliance Registry</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">WAEC e-Reg For WASSCE May 2025</span>
                <span className="text-green-600 font-medium">✓ Done</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bank C/A Score Application For Acct</span>
                <span className="text-green-600 font-medium">✓ Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Recovery & Bar Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consolidated Bursary Inflow */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-semibold text-gray-900">Consolidated Bursary Inflow & Payment Recovery</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">Payment Channel revenue analysis across major-nes banking platforms</p>

          {/* Payment Channels */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Paystack Webhooks</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">₦63.80M (68%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Remita: ERIS RT</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">₦20.50M (27%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Flutterwave FOS</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">₦8.10M (10%)</span>
            </div>
          </div>

          {/* Outstanding Recovery */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">PAYMENT AGENT RECOVERY</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">1/4 Outstanding</span>
                <span className="font-semibold text-amber-600">₦4 Outstanding</span>
              </div>
              <div className="text-xs text-gray-500">
                <p>Automated FDE-Channel WhatsApp and SMS reminder subsidy callers before WAEC-free admission before deadline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Electrical Installation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Campus Electrical Installation w/ targets &gt; Mission KII</h3>

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-around gap-4 mb-4">
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full bg-blue-600 rounded-t" style={{ height: '75%' }}></div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Target Baseline</p>
                <p className="text-sm font-semibold text-gray-900">Lagos Combined</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full bg-blue-600 rounded-t" style={{ height: '78%' }}></div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Regional Standards</p>
                <p className="text-sm font-semibold text-gray-900">+ Network Base</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full bg-teal-600 rounded-t" style={{ height: '45%' }}></div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Semantics First Wave</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full bg-teal-600 rounded-t" style={{ height: '48%' }}></div>
              <div className="text-center">
                <p className="text-xs text-gray-600">& Zoom Accounts</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600 justify-center">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Lagos Combined</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-teal-600 rounded"></div>
              <span>Regional Standards</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Automatic Settlement Tr-1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
