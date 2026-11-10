// ============================================================================
// TENANT DASHBOARD - Tenant Admin First Page
// ============================================================================
// Proprietor/Tenant Admin dashboard with campus overview and quick actions

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

// ============================================================================
// COMPONENT
// ============================================================================

export default function TenantDashboardPage() {
  const navigate = useNavigate()
  const { user } = useAppStore()

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-sm z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Logo & Tenant Info */}
          <div className="h-20 px-6 flex flex-col justify-center bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-blue-600 tracking-tight">EduManage</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-green-600 uppercase bg-green-100 px-1.5 py-0.5 rounded">CJET Trust</span>
              <span className="text-[11px] text-gray-600 truncate">Crown Jewel Education</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-4 py-6">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Proprietor Console</p>
            <nav className="flex flex-col gap-1">
              <a
                href="#"
                className="flex items-center gap-3 px-3.5 py-2.5 transition-all bg-blue-100 text-blue-700 font-semibold rounded-lg shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>My Schools / Campuses</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span>Staff & Appointees</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Student Directory</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Billing & Plan Quota</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Audit Logs</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Settings</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Plan Info */}
        <div className="p-4 m-4 rounded-xl bg-gray-50 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Active Tier</span>
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-gray-900">Standard Enterprise</div>
          <p className="text-xs text-gray-600 mt-0.5 leading-snug">1,500 Seats Quota • 3 Campuses Active</p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-[11px] text-gray-500">
            <span>1,020 / 1,500</span>
            <span>68% Quota</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-72">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-20 bg-white/85 backdrop-blur-xl shadow-sm z-40 px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="w-full bg-white rounded-xl pl-11 pr-4 py-2 text-gray-900 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"
                placeholder="Search schools, staff, students, or reports..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <span className="text-xs font-semibold">Sync: Online</span>
            </div>

            <button className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">Dr. Aliyu Mohammed</div>
                <div className="text-xs text-gray-600">Lead Proprietor (Admin)</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="relative pt-20 bg-white min-h-screen px-8 py-6 w-full">
          <div className="flex flex-col w-full">
            {/* Ambient Glow */}
            <div className="relative w-full">
              <div className="absolute -top-12 -left-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-24 -right-12 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Welcome Banner */}
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Welcome back, Dr. Aliyu Mohammed
                    </h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[11px] font-bold uppercase">
                      Proprietor View
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1.5 flex items-center gap-2 flex-wrap">
                    <span>Crown Jewel Education Trust (Code: CJET)</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span>Lagos & FCT Campuses</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className="text-green-600 font-semibold">2025/2026 Academic Session</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-4 py-2.5 rounded-lg bg-white text-gray-900 text-sm font-medium shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Term Executive Summary</span>
                  </button>
                  <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition-all flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add New School / Campus</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {/* Campuses */}
                <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-gray-100">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Campuses</span>
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 tracking-tight">3 Active</div>
                  </div>
                  <div className="mt-4 pt-3 bg-gray-50 -mx-6 -mb-6 px-6 py-3 rounded-b-xl flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs text-gray-600 truncate">Lekki, Ikeja & Abuja FCT</span>
                  </div>
                </div>

                {/* Students */}
                <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-gray-100">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Capacity</span>
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900 tracking-tight">1,142</span>
                      <span className="text-xs text-gray-500">/ 1,500 Seats</span>
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '76.1%' }}></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 bg-gray-50 -mx-6 -mb-6 px-6 py-3 rounded-b-xl flex justify-between items-center text-gray-600 text-xs">
                    <span>358 seats available</span>
                    <span className="font-semibold text-green-600">76% full</span>
                  </div>
                </div>

                {/* Staff */}
                <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-gray-100">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Academic Staff</span>
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900 tracking-tight">84</span>
                      <span className="text-[11px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase">All Verified</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 bg-gray-50 -mx-6 -mb-6 px-6 py-3 rounded-b-xl flex items-center justify-between text-xs text-gray-600">
                    <span>Across all 3 campuses</span>
                    <span className="text-blue-600 font-semibold">3 Principals</span>
                  </div>
                </div>

                {/* Fee Collection */}
                <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-gray-100">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Term 2 Collections</span>
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900 tracking-tight">₦48.6M</span>
                      <span className="text-xs text-gray-500">/ ₦54.0M</span>
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 bg-gray-50 -mx-6 -mb-6 px-6 py-3 rounded-b-xl flex justify-between items-center text-gray-600 text-xs">
                    <span>₦5.4M outstanding</span>
                    <span className="font-semibold text-amber-600">90.0%</span>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: Schools & Campuses */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">My Schools & Campuses</h2>
                      <p className="text-xs text-gray-600 mt-0.5">High-level status of the schools operating under Crown Jewel Education Trust</p>
                    </div>
                    <a className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-all" href="#">
                      <span>View All (3)</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* Campus Cards */}
                  {[
                    {
                      name: 'Crown Jewel High School - Lekki Campus',
                      type: 'Senior & Junior Secondary (JSS1 – SS3) • WAEC / Cambridge IGCSE',
                      head: 'Mrs. Folake Balogun',
                      students: 520,
                      teachers: 38,
                      icon: 'school',
                      color: 'blue',
                    },
                    {
                      name: 'Crown Jewel Preparatory - Ikeja',
                      type: 'Nursery & Primary (Crèche – Basic 6) • National & Early Years Curriculum',
                      head: 'Mr. Kenneth Okafor',
                      students: 382,
                      teachers: 28,
                      icon: 'child_care',
                      color: 'green',
                    },
                    {
                      name: 'Crown Jewel Academy - Abuja FCT',
                      type: 'Comprehensive Primary & Secondary • Day & Boarding Facilities',
                      head: 'Dr. Amina Bello',
                      students: 240,
                      teachers: 18,
                      icon: 'apartment',
                      color: 'amber',
                    },
                  ].map((campus, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border border-gray-100">
                      <div className="flex gap-4 items-start flex-1 min-w-0">
                        <div className={`w-14 h-14 rounded-xl bg-${campus.color}-100 text-${campus.color}-600 flex items-center justify-center shrink-0`}>
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900 tracking-tight truncate">{campus.name}</h3>
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[11px] font-bold uppercase">Fully Synced</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{campus.type}</p>
                          <div className="flex items-center gap-6 mt-3.5 pt-3 bg-gray-50 px-3 py-2 rounded-lg text-gray-600 text-xs">
                            <div className="flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>Head: <strong className="text-gray-900 font-semibold">{campus.head}</strong></span>
                            </div>
                            <div className="hidden sm:flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span><strong>{campus.students}</strong> Students</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                              </svg>
                              <span><strong>{campus.teachers}</strong> Teachers</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0">
                        <button className="w-full md:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 shadow-sm">
                          <span>Enter Portal</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button className="w-full md:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-all">
                          Manage Settings
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Campus CTA */}
                  <button className="group p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-center gap-3 text-center border border-gray-200 border-dashed">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Set up another campus or branch (e.g. Early Years or Secondary annex)</span>
                  </button>
                </div>

                {/* RIGHT: Quick Actions & Updates */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {/* Quick Actions */}
                  <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Quick Trust Actions</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[
                        { title: 'Appoint Campus Principal', subtitle: 'Assign leadership to a campus', icon: 'person_add', color: 'blue' },
                        { title: 'Seat Quota Allocation', subtitle: 'Rebalance capacity limits', icon: 'pie_chart', color: 'green' },
                        { title: 'Manage Bank Accounts', subtitle: 'Fee collection accounts', icon: 'account_balance', color: 'amber' },
                        { title: 'Calendar & Term Dates', subtitle: 'Align dates across all branches', icon: 'calendar_month', color: 'gray' },
                      ].map((action, idx) => (
                        <a key={idx} className="p-3.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-between group" href="#">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center text-${action.color}-600`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                            <div className="text-left">
                              <div className="text-sm font-semibold text-gray-900">{action.title}</div>
                              <div className="text-xs text-gray-600">{action.subtitle}</div>
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Recent Updates */}
                  <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Recent Trust Updates</h3>
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    </div>
                    <div className="flex flex-col gap-4">
                      {[
                        { text: 'Second Term Mock Exams broad-sheet verified & approved by Lekki Principal.', time: '2 hours ago • Lekki Campus', color: 'blue' },
                        { text: '15 new student registrations confirmed and batch-enrolled at Ikeja Primary.', time: 'Yesterday • Ikeja Preparatory', color: 'green' },
                        { text: 'Annual Fire Safety & Ministry Compliance certificates uploaded for Abuja.', time: '3 days ago • Abuja FCT', color: 'amber' },
                      ].map((update, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <div className={`w-2 h-2 rounded-full bg-${update.color}-600 mt-2 shrink-0`}></div>
                          <div>
                            <p className="text-xs text-gray-900 leading-snug">{update.text}</p>
                            <span className="text-[11px] text-gray-500 mt-1 inline-block">{update.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 bg-gray-50 -mx-6 -mb-6 px-6 py-3 rounded-b-xl flex justify-between items-center">
                      <a className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-all" href="#">
                        <span>View Full Audit Trail</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">EduManage Nigeria</span>
                    </div>
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
