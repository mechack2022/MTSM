// ============================================================================
// LANDING PAGE - Public Home Page
// ============================================================================

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10"></div>

      {/* Animated Mesh Gradient Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-200/40 rounded-lg rotate-12 animate-float-slow"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 border-2 border-purple-200/40 rounded-full animate-float-slow animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-indigo-200/40 rounded-lg rotate-45 animate-float-slow animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-cyan-200/40 rounded-full animate-float-slow animation-delay-3000"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 border-2 border-pink-200/40 rounded-lg rotate-12 animate-float-slow animation-delay-1500"></div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .gradient-animate {
          background: linear-gradient(-45deg, #2563eb, #4f46e5, #7c3aed, #2563eb);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        .stagger-5 { animation-delay: 0.5s; opacity: 0; }
        .stagger-6 { animation-delay: 0.6s; opacity: 0; }
        .stagger-7 { animation-delay: 0.7s; opacity: 0; }
        .stagger-8 { animation-delay: 0.8s; opacity: 0; }
        .stagger-9 { animation-delay: 0.9s; opacity: 0; }

        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 animate-slide-in-left">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                ACE EDUManage
              </span>
            </div>

            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-lg hover:scale-105 animate-slide-in-right"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Complete School Management
            <span className="block text-blue-600 mt-2 animate-fade-in-up stagger-1">All in One Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto animate-fade-in-up stagger-2">
            A comprehensive, cloud-based School Information System (SIS) for managing
            students, staff, academics, attendance, fees, and more. Built for modern
            educational institutions of all sizes.
          </p>

          {/* Offline-First Badge */}
          <div className="flex justify-center mb-8 animate-fade-in-up stagger-3">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-semibold text-lg">Offline-First Design</span>
              <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex gap-4 justify-center animate-fade-in-up stagger-4">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-blue-600 hover:shadow-lg hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 animate-scale-in stagger-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl transition-all hover:shadow-lg hover:-translate-y-2 animate-fade-in-up stagger-5 cursor-pointer">
              <div className="text-4xl mb-3 animate-float">👨‍🎓</div>
              <h3 className="font-semibold text-gray-900 mb-2">Student Management</h3>
              <p className="text-sm text-gray-600">
                Complete student profiles, enrollment & records
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl transition-all hover:shadow-lg hover:-translate-y-2 animate-fade-in-up stagger-6 cursor-pointer">
              <div className="text-4xl mb-3 animate-float" style={{ animationDelay: '0.5s' }}>📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Academic Tracking</h3>
              <p className="text-sm text-gray-600">
                Grades, exams, assessments & report cards
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl transition-all hover:shadow-lg hover:-translate-y-2 animate-fade-in-up stagger-7 cursor-pointer">
              <div className="text-4xl mb-3 animate-float" style={{ animationDelay: '1s' }}>💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fee Management</h3>
              <p className="text-sm text-gray-600">
                Billing, payments, invoices & receipts
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl transition-all hover:shadow-lg hover:-translate-y-2 animate-fade-in-up stagger-8 cursor-pointer">
              <div className="text-4xl mb-3 animate-float" style={{ animationDelay: '1.5s' }}>📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
              <p className="text-sm text-gray-600">
                Insights across all school operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed for modern educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-blue-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-1">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Student Information System
              </h3>
              <p className="text-gray-600">
                Complete student profiles with demographics, contacts, medical info, enrollment history, and document management.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-green-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Academic Management
              </h3>
              <p className="text-gray-600">
                Track grades, assignments, exams, assessments, and generate comprehensive report cards with customizable grading scales.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-purple-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fee Management
              </h3>
              <p className="text-gray-600">
                Automated billing, payment tracking, invoicing, receipts, fee structures, discounts, and comprehensive financial reports.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-orange-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Attendance Tracking
              </h3>
              <p className="text-gray-600">
                Real-time attendance marking with multiple status types, automated notifications, and detailed attendance analytics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-indigo-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-5">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Timetable & Scheduling
              </h3>
              <p className="text-gray-600">
                Create class schedules, manage teacher assignments, room allocation, and period management with conflict detection.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-pink-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Parent Portal
              </h3>
              <p className="text-gray-600">
                Parents can view student grades, attendance, assignments, fee status, and communicate with teachers directly.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-cyan-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-7">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multi-School Management
              </h3>
              <p className="text-gray-600">
                Manage multiple schools, branches, or campuses from one platform with complete data isolation and centralized control.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-yellow-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-8">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Communication Hub
              </h3>
              <p className="text-gray-600">
                Announcements, messaging, notifications, and circular management to keep everyone connected and informed.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-red-300 hover:-translate-y-1 group cursor-pointer animate-fade-in-up stagger-9">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Reports & Analytics
              </h3>
              <p className="text-gray-600">
                Comprehensive reports across all modules with data visualization, custom filters, and export capabilities.
              </p>
            </div>
          </div>

          {/* Offline-First Highlight Section */}
          <div className="mt-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-8 border-2 border-emerald-200 shadow-xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    Built Offline-First
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Work seamlessly even without internet connectivity. All data is cached locally and automatically synchronized when you're back online.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-emerald-200">
                      <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Local Data Storage</span>
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-emerald-200">
                      <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Auto-Sync</span>
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-emerald-200">
                      <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Conflict Resolution</span>
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-emerald-200">
                      <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Uninterrupted Workflow</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-animate py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-fade-in-up stagger-1">
            Join educational institutions already using ACE EDUManage to streamline their operations and focus on student success.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 animate-scale-in stagger-2"
          >
            Login to Your Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">ACE EDUManage</h3>
              <p className="text-sm">
                Complete school information system for modern educational institutions.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Core Modules</h3>
              <ul className="space-y-2 text-sm">
                <li>Student Management</li>
                <li>Academic Tracking</li>
                <li>Attendance System</li>
                <li>Fee Management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Additional Features</h3>
              <ul className="space-y-2 text-sm">
                <li>Timetable & Scheduling</li>
                <li>Parent Portal</li>
                <li>Communications</li>
                <li>Reports & Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Training</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 ACE EDUManage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
