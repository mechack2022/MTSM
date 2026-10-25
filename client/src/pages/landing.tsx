import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '@/hooks'
import toast from 'react-hot-toast'
import TestCredentials from '@/components/TestCredentials'
import DebugAuthButton from '@/components/DebugAuthButton'

export default function LandingPage() {
  const navigate = useNavigate()
  const login = useLogin()

  const [roleTab, setRoleTab] = useState<'staff' | 'parent'>('staff')
  const [schoolCode, setSchoolCode] = useState('corona-lagos')
  const [userIdentifier, setUserIdentifier] = useState('superadmin')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!schoolCode || !userIdentifier || !password) {
      toast.error('Please fill in all fields')
      return
    }

    console.log('handleLogin: Starting login with', { userIdentifier, schoolCode })
    setIsLoggingIn(true)

    try {
      // Use mutateAsync to wait for completion
      await login.mutateAsync({
        username: userIdentifier,
        password: password
      })
      console.log('handleLogin: Login mutation completed successfully')
    } catch (error) {
      console.error('handleLogin: Login mutation failed', error)
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleFillDemo = () => {
    setRoleTab('staff')
    setSchoolCode('corona-lagos')
    setUserIdentifier('superadmin')
    setPassword('admin123')
  }

  const handleSelectCredentials = (username: string, password: string) => {
    setUserIdentifier(username)
    setPassword(password)
    setSchoolCode('corona-lagos')
    setRoleTab('staff')
    toast.success(`Filled credentials for ${username}`)
  }

  const handleRoleChange = (role: 'staff' | 'parent') => {
    setRoleTab(role)
    if (role === 'staff') {
      setUserIdentifier('superadmin')
    } else {
      setUserIdentifier('08032457891')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl shadow-sm">
        <div className="h-20 max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900 tracking-tight">EduPulse</span>
              <span className="text-xs text-blue-600 uppercase tracking-wider font-bold">Nigeria</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-blue-600 font-semibold">Home</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Support</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition-all">
              Log In
            </a>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-white min-h-screen">
        {/* Ambient Background Glows */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100 opacity-40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-cyan-100 opacity-25 rounded-full blur-3xl pointer-events-none" />

          {/* HERO SECTION */}
          <section className="relative max-w-[1280px] mx-auto px-6 lg:px-12 pt-10 pb-16 lg:pt-14 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left: Value Pitch */}
              <div className="lg:col-span-7 flex flex-col items-start space-y-6">
                {/* NERDC Pill */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-900 shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-600 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
                  </span>
                  <span className="text-xs uppercase font-bold tracking-wider">Built for Nigerian Curriculums</span>
                  <span className="w-1 h-1 rounded-full bg-cyan-600 opacity-40" />
                  <span className="text-xs text-cyan-700 font-medium">NERDC • WAEC • NECO</span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-2xl leading-tight">
                  Simple, Reliable <span className="text-blue-600 underline decoration-blue-200 decoration-wavy underline-offset-8">School Management</span> for Nigerian Schools
                </h1>

                {/* Subhead */}
                <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                  Effortlessly manage students, academic records, attendance, report cards, and fee tracking. Built to work fast, even with unstable internet.
                </p>

                {/* Core Indicators */}
                <div className="grid grid-cols-3 gap-4 pt-4 w-full max-w-lg">
                  <div className="flex flex-col bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-2xl text-blue-600 font-bold">1,400+</span>
                    <span className="text-xs text-gray-600">Active Schools</span>
                  </div>
                  <div className="flex flex-col bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-2xl text-cyan-600 font-bold">99.9%</span>
                    <span className="text-xs text-gray-600">Local Uptime</span>
                  </div>
                  <div className="flex flex-col bg-white p-3.5 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-2xl text-amber-600 font-bold">3 Terms</span>
                    <span className="text-xs text-gray-600">Automated Reports</span>
                  </div>
                </div>

                {/* Quick Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-gray-600">
                  <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 px-3 py-1 rounded-md text-gray-900">
                    <span className="material-symbols-outlined text-[16px] text-cyan-600">verified</span> Zero Setup Fee
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 px-3 py-1 rounded-md text-gray-900">
                    <span className="material-symbols-outlined text-[16px] text-cyan-600">wifi_off</span> Works Without Light/Internet
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 px-3 py-1 rounded-md text-gray-900">
                    <span className="material-symbols-outlined text-[16px] text-cyan-600">print</span> Ready-to-Print Results
                  </span>
                </div>
              </div>

              {/* Right: Login Card */}
              <div className="lg:col-span-5 relative">
                {/* Background glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-blue-100 via-cyan-100 to-blue-50 rounded-2xl blur-xl" />

                <div className="relative bg-white rounded-2xl p-7 lg:p-8 shadow-xl border border-gray-100">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-5">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Log In to Your School Portal</h3>
                      <p className="text-xs text-gray-600">Select your role to access your dashboard</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined text-[22px]">lock_open</span>
                    </div>
                  </div>

                  {/* Role Selector Tabs */}
                  <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl mb-5 text-center">
                    <button
                      onClick={() => handleRoleChange('staff')}
                      className={`py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                        roleTab === 'staff'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">badge</span> Staff / Admin
                    </button>
                    <button
                      onClick={() => handleRoleChange('parent')}
                      className={`py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                        roleTab === 'parent'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">family_restroom</span> Student / Parent
                    </button>
                  </div>

                  {/* Form */}
                  <form className="space-y-4" onSubmit={handleLogin}>
                    {/* School Code */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs text-gray-900 flex justify-between" htmlFor="schoolCode">
                        <span>School Code or Subdomain</span>
                        <a href="#" className="text-xs text-blue-600 hover:underline">Find My School</a>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined text-[20px] text-gray-500 absolute left-3">domain</span>
                        <input
                          className="w-full bg-gray-50 text-gray-900 rounded-lg pl-10 pr-24 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all border border-gray-200"
                          id="schoolCode"
                          placeholder="e.g. grace-academy or corona-epe"
                          type="text"
                          value={schoolCode}
                          onChange={(e) => setSchoolCode(e.target.value)}
                        />
                        <span className="absolute right-3 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">.edumanage.ng</span>
                      </div>
                    </div>

                    {/* Username / Email / Phone */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs text-gray-900" htmlFor="userIdentifier">
                        {roleTab === 'staff' ? 'Staff Email or Phone Number' : 'Parent Phone / Student Admission No.'}
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined text-[20px] text-gray-500 absolute left-3">mail</span>
                        <input
                          className="w-full bg-gray-50 text-gray-900 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all border border-gray-200"
                          id="userIdentifier"
                          placeholder={roleTab === 'staff' ? 'admin@school.sch.ng or 0803...' : 'e.g. 08034567890 or 2023/048'}
                          type="text"
                          value={userIdentifier}
                          onChange={(e) => setUserIdentifier(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-900" htmlFor="userPassword">Password</label>
                        <a href="#" className="text-xs text-blue-600 hover:underline">Forgot Password?</a>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined text-[20px] text-gray-500 absolute left-3">key</span>
                        <input
                          className="w-full bg-gray-50 text-gray-900 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all border border-gray-200"
                          id="userPassword"
                          placeholder="Enter your password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          className="absolute right-3 text-gray-500 hover:text-gray-900"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Login Button */}
                    <div className="pt-2">
                      <button
                        className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                        type="submit"
                        disabled={isLoggingIn}
                      >
                        {isLoggingIn ? (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                            <span>{isLoggingIn ? 'Verifying...' : 'Sign In to School Portal'}</span>
                          </>
                        ) : (
                          <>
                            <span>Sign In to School Portal</span>
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Demo Helper */}
                  <div className="mt-4 p-3 rounded-lg bg-blue-50 flex items-center justify-between text-blue-900 border border-blue-200">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">info</span>
                      <span className="text-xs">
                        Quick Demo: <strong className="text-xs text-blue-600">admin@demo.edumanage.ng</strong>
                      </span>
                    </div>
                    <button
                      className="text-xs px-2.5 py-1 rounded bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white transition-colors"
                      onClick={handleFillDemo}
                      type="button"
                    >
                      Auto-fill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Real Classroom Photos Strip */}
        <section className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full -mt-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop"
                alt="Nigerian elementary classroom"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-4">
                <span className="text-sm text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-cyan-400">child_care</span>
                  Early Years &amp; Primary Classrooms
                </span>
              </div>
            </div>

            <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop"
                alt="Nigerian secondary school computer lab"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-4">
                <span className="text-sm text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-blue-400">menu_book</span>
                  JSS &amp; SSS Continuous Assessment
                </span>
              </div>
            </div>

            <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop"
                alt="School bursar reviewing digital fee collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-4">
                <span className="text-sm text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-amber-400">receipt_long</span>
                  Direct Termly Fee &amp; Remittance Records
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Tiers Section */}
        <section className="w-full bg-gray-50 py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-3 font-bold tracking-wider">
                Designed for Local School Realities
              </span>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Structured For Every Academic Level</h2>
              <p className="text-base text-gray-600 mt-2">
                From toddler observation rubrics in Creche to WAEC grade point averages in Senior Secondary, EduPulse adapts instantly.
              </p>
            </div>

            {/* 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Nursery & Primary */}
              <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-gray-100">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[26px]">toys</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Nursery &amp; Primary</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Easy student bio-data, daily attendance tracking, termly behavioral remarks, and visual report cards tailored for early development.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-cyan-600">check_circle</span>
                      <span>Visual psychomotor &amp; affective domain scoring</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-cyan-600">check_circle</span>
                      <span>Single-tap morning roll-call by class teacher</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-cyan-600">check_circle</span>
                      <span>Color-coded report cards with stamp signatures</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 flex items-center justify-between text-cyan-600 text-xs font-semibold">
                  <span>Explore Primary Features</span>
                  <span className="material-symbols-outlined text-[16px]">trending_flat</span>
                </div>
              </div>

              {/* Secondary */}
              <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-gray-100">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[26px]">school</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Secondary (JSS &amp; SSS)</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Broad-sheet grade calculations, WAEC &amp; NECO continuous assessment (CA1, CA2 + Exam weighting), and seamless subject allocation.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">check_circle</span>
                      <span>Automatic 30/70 or 40/60 grading formulas</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">check_circle</span>
                      <span>One-click full class Master Broadsheet export</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">check_circle</span>
                      <span>Science, Arts &amp; Commercial subject grouping</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 flex items-center justify-between text-blue-600 text-xs font-semibold">
                  <span>Explore Secondary System</span>
                  <span className="material-symbols-outlined text-[16px]">trending_flat</span>
                </div>
              </div>

              {/* Offline-Ready */}
              <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-gray-100">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[26px]">cloud_sync</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Offline-Ready &amp; Fast</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Works seamlessly during local internet dips and power interruptions. All records sync automatically the moment network returns.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-amber-600">check_circle</span>
                      <span>Local browser cache stores scores safely</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-amber-600">check_circle</span>
                      <span>Ultra-lightweight on low bandwidth 2G/3G data</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-gray-900">
                      <span className="material-symbols-outlined text-[18px] text-amber-600">check_circle</span>
                      <span>Conflict-free merge for multiple form teachers</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-4 flex items-center justify-between text-amber-600 text-xs font-semibold">
                  <span>Learn About Offline Sync</span>
                  <span className="material-symbols-outlined text-[16px]">trending_flat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-blue-600 text-white relative overflow-hidden py-20">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500 opacity-30 blur-2xl pointer-events-none" />
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center relative z-10 flex flex-col items-center">
            <span className="text-xs uppercase bg-blue-500 px-3.5 py-1 rounded-full mb-4 font-bold tracking-wider">
              Start This Term Strong
            </span>
            <h2 className="text-4xl font-bold text-white max-w-2xl tracking-tight mb-4">
              Ready to simplify your school administration?
            </h2>
            <p className="text-xl text-blue-100 max-w-xl mb-8">
              Join over 1,400 forward-thinking nursery, primary, and secondary schools across Nigeria. Set up in less than 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-blue-600 text-sm font-semibold shadow-lg hover:bg-gray-100 transition-all text-center cursor-pointer"
              >
                Get Started Free
              </a>
              <a className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-opacity-90 transition-all text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span> Request a Guided Demo
              </a>
            </div>
            <div className="flex items-center gap-6 mt-10 text-blue-100 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">support_agent</span> Live WhatsApp &amp; Phone Support
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">devices</span> Works on Phone, Tablet &amp; Laptop
              </span>
            </div>
          </div>
        </section>

        {/* Floating Status Beacon */}
        <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-full bg-blue-600 text-white shadow-xl">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider uppercase leading-none">Online • Live Synced</span>
            <span className="text-[10px] text-blue-200 leading-none mt-0.5">Offline-first local cache active</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-cyan-400 ml-1">cloud_done</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-50 py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">EduPulse NG</span>
              </div>
              <p className="text-xs text-gray-600">
                The dependable school management platform purpose-built for Nigerian Nursery, Primary, and Secondary schools.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2.5">
                <li className="text-sm text-gray-600">Nursery &amp; Early Years</li>
                <li className="text-sm text-gray-600">Primary Gradebook</li>
                <li className="text-sm text-gray-600">WAEC/NECO Records</li>
                <li className="text-sm text-gray-600">Fee Remittance</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">Portals</h4>
              <ul className="space-y-2.5">
                <li className="text-sm text-gray-600">School Admin</li>
                <li className="text-sm text-gray-600">Teacher Gradebook</li>
                <li className="text-sm text-gray-600">Parent Portal</li>
                <li className="text-sm text-gray-600">Offline Desktop Client</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">Support &amp; Offices</h4>
              <p className="text-xs text-gray-600 mb-2">Lagos • Abuja • Port Harcourt</p>
              <p className="text-xs text-gray-600">support@edupulse.ng</p>
              <p className="text-xs text-gray-600">+234 (0) 800 338 7857</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">© 2025 EduPulse Systems Nigeria Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-xs text-gray-600">Privacy Policy</span>
              <span className="text-xs text-gray-600">Terms of Service</span>
              <span className="text-xs text-gray-600">NDPR Compliance</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Test Credentials Panel */}
      <TestCredentials onSelectCredentials={handleSelectCredentials} />

      {/* Debug Auth Button - REMOVE AFTER TESTING */}
      <DebugAuthButton />
    </div>
  )
}
