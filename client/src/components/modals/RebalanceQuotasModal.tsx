import { useState, useEffect } from 'react'

interface RebalanceQuotasModalProps {
  isOpen: boolean
  onClose: () => void
  tenantName?: string
  onCommit?: (allocations: CampusAllocations) => void
}

interface CampusAllocations {
  vi: number
  lek: number
  ikj: number
  epe: number
}

const MASTER_TOTAL = 3000
const INITIAL_VALUES = {
  vi: 1200,
  lek: 1000,
  ikj: 800,
  epe: 0
}

export default function RebalanceQuotasModal({ isOpen, onClose, tenantName = "Oasis Educational Foundation", onCommit }: RebalanceQuotasModalProps) {
  const [viSeats, setViSeats] = useState(INITIAL_VALUES.vi)
  const [lekSeats, setLekSeats] = useState(INITIAL_VALUES.lek)
  const [ikjSeats, setIkjSeats] = useState(INITIAL_VALUES.ikj)
  const [epeSeats, setEpeSeats] = useState(INITIAL_VALUES.epe)
  const [isEpeActive, setIsEpeActive] = useState(false)
  const [showToast, setShowToast] = useState(false)

  if (!isOpen) return null

  // Calculate derived values
  const totalCommitted = viSeats + lekSeats + ikjSeats + epeSeats
  const surplusDeficit = MASTER_TOTAL - totalCommitted

  // Enrolled students per campus
  const enrolled = { vi: 984, lek: 740, ikj: 704 }
  const pipeline = { vi: 116, lek: 94, ikj: 62 }

  // Free buffers
  const viFree = viSeats - enrolled.vi
  const lekFree = lekSeats - enrolled.lek
  const ikjFree = ikjSeats - enrolled.ikj
  const totalFreeBuffer = viFree + lekFree + ikjFree + (epeSeats > 0 ? epeSeats : 0)

  // Utilization percentages
  const viUtil = Math.round((enrolled.vi / viSeats) * 100)
  const lekUtil = Math.round((enrolled.lek / lekSeats) * 100)
  const ikjUtil = Math.round((enrolled.ikj / ikjSeats) * 100)

  // Bar chart percentages
  const viPct = (viSeats / totalCommitted) * 100
  const lekPct = (lekSeats / totalCommitted) * 100
  const ikjPct = (ikjSeats / totalCommitted) * 100
  const epePct = (epeSeats / totalCommitted) * 100

  // Revenue projections (in millions)
  const revVI = viSeats * 0.18
  const revLEK = lekSeats * 0.14
  const revIKJ = ikjSeats * 0.1175
  const revEPE = epeSeats * 0.110
  const totalRev = revVI + revLEK + revIKJ + revEPE

  // Tier breakdowns
  const viTiers = {
    ey: Math.round(viSeats * 0.10),
    pri: Math.round(viSeats * 0.375),
    jss: Math.round(viSeats * 0.275),
    sss: Math.round(viSeats * 0.25)
  }
  const lekTiers = {
    ey: Math.round(lekSeats * 0.20),
    pri: Math.round(lekSeats * 0.80)
  }
  const ikjTiers = {
    pri: Math.round(ikjSeats * 0.50),
    jss: Math.round(ikjSeats * 0.50)
  }

  const handleCarveOutEpe = () => {
    setViSeats(1000)
    setLekSeats(800)
    setIkjSeats(700)
    setEpeSeats(500)
    setIsEpeActive(true)
  }

  const handleRevertEpe = () => {
    setViSeats(INITIAL_VALUES.vi)
    setLekSeats(INITIAL_VALUES.lek)
    setIkjSeats(INITIAL_VALUES.ikj)
    setEpeSeats(0)
    setIsEpeActive(false)
  }

  const handleAutoOptimize = () => {
    setViSeats(1250)
    setLekSeats(980)
    setIkjSeats(770)
    setEpeSeats(0)
    if (isEpeActive) {
      setIsEpeActive(false)
    }
  }

  const handleReset = () => {
    setViSeats(INITIAL_VALUES.vi)
    setLekSeats(INITIAL_VALUES.lek)
    setIkjSeats(INITIAL_VALUES.ikj)
    setEpeSeats(INITIAL_VALUES.epe)
    if (isEpeActive) {
      setIsEpeActive(false)
    }
  }

  const handleCommit = () => {
    if (surplusDeficit === 0) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 6000)

      if (onCommit) {
        onCommit({
          vi: viSeats,
          lek: lekSeats,
          ikj: ikjSeats,
          epe: epeSeats
        })
      }
    }
  }

  const isBalanced = surplusDeficit === 0
  const hasSurplus = surplusDeficit > 0
  const hasDeficit = surplusDeficit < 0

  return (
    <>
      {/* Full-Screen Modal Overlay */}
      <div className="fixed inset-0 z-[9998] bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Full-Screen Modal Content */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="min-h-screen bg-white">
          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-[10000] w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-lg"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          {/* Main Content */}
          <div className="relative w-full px-6 lg:px-12 py-12 flex flex-col gap-8">
            {/* Ambient Radial Gradients */}
            <div className="absolute -top-12 -left-12 w-96 h-96 bg-blue-100 rounded-full blur-3xl pointer-events-none -z-10 opacity-40" />
            <div className="absolute top-1/4 -right-16 w-80 h-80 bg-cyan-100 rounded-full blur-3xl pointer-events-none -z-10 opacity-30" />

            {/* Top Command Header */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
              <div className="flex flex-col max-w-3xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                    Campus Architecture Shard
                  </span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-xs text-cyan-600 uppercase font-bold tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                    HSM Session Active
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                  Multi-Campus Seat Quota Rebalancing &amp; Capitation Simulator
                </h1>
                <p className="text-base text-gray-600 mt-2 leading-relaxed">
                  Distribute pooled sovereign seats across Victoria Island HQ, Lekki Phase 1, Ikeja GRA, and newly staged branches. Real-time UBEC capitation and tuition revenue projection.
                </p>
              </div>

              {/* Quick Badges Cluster */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white shadow-sm border border-gray-200">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">account_tree</span>
                  <span className="text-xs text-gray-600">Master Trust:</span>
                  <span className="text-xs font-bold text-gray-900">3,000 Seats</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white shadow-sm border border-gray-200">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">pie_chart</span>
                  <span className="text-xs text-gray-600">Committed:</span>
                  <span className="text-xs font-bold text-gray-900">{totalCommitted.toLocaleString()} Seats</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-sm transition-all duration-300 ${
                  isBalanced ? 'bg-cyan-100 text-cyan-900' :
                  hasSurplus ? 'bg-amber-100 text-amber-900' :
                  'bg-red-100 text-red-900'
                }`}>
                  <span className={`material-symbols-outlined text-[16px] ${
                    isBalanced ? 'text-cyan-600' :
                    hasSurplus ? 'text-amber-600' :
                    'text-red-600'
                  }`}>
                    {isBalanced ? 'check_circle' : 'warning'}
                  </span>
                  <span className="text-xs font-bold">
                    {isBalanced ? 'Surplus / Deficit: 0 (Balanced)' :
                     hasSurplus ? `Surplus: +${surplusDeficit} Unassigned` :
                     `Deficit: ${surplusDeficit} Overallocated`}
                  </span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span className="text-xs uppercase font-bold tracking-wider">Lagos Shard #04</span>
                </div>
              </div>
            </div>

            {/* Master Pooled Allocation Visualizer */}
            <div className="w-full rounded-xl bg-white p-6 shadow-sm border border-gray-200 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-[22px]">stacked_bar_chart</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-gray-900">Sovereign Seat Capacity Pool</span>
                    <p className="text-xs text-gray-600">
                      Global capitation envelope certified by National Educational Research Development Council (NERDC)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600" />
                    <span className="text-xs text-gray-900">VI HQ ({viPct.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-xs text-gray-900">Lekki Ph 1 ({lekPct.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-xs text-gray-900">Ikeja GRA ({ikjPct.toFixed(1)}%)</span>
                  </div>
                  {epeSeats > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gray-500" />
                      <span className="text-xs text-gray-900">Epe Staged ({epePct.toFixed(1)}%)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Segmented Dynamic Bar */}
              <div className="w-full h-5 rounded-full bg-gray-100 flex overflow-hidden shadow-inner p-0.5 gap-0.5">
                <div
                  className="h-full bg-blue-600 rounded-l-full transition-all duration-300 relative group cursor-pointer"
                  style={{ width: `${viPct}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                    <div className="px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap shadow-md">
                      Victoria Island: {viSeats.toLocaleString()} seats
                    </div>
                    <div className="w-1.5 h-1.5 bg-gray-800 rotate-45 -mt-0.5" />
                  </div>
                </div>
                <div
                  className="h-full bg-cyan-500 transition-all duration-300 relative group cursor-pointer"
                  style={{ width: `${lekPct}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                    <div className="px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap shadow-md">
                      Lekki Phase 1: {lekSeats.toLocaleString()} seats
                    </div>
                    <div className="w-1.5 h-1.5 bg-gray-800 rotate-45 -mt-0.5" />
                  </div>
                </div>
                <div
                  className={`h-full bg-amber-400 transition-all duration-300 relative group cursor-pointer ${epeSeats === 0 ? 'rounded-r-full' : ''}`}
                  style={{ width: `${ikjPct}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                    <div className="px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap shadow-md">
                      Ikeja GRA: {ikjSeats.toLocaleString()} seats
                    </div>
                    <div className="w-1.5 h-1.5 bg-gray-800 rotate-45 -mt-0.5" />
                  </div>
                </div>
                {epeSeats > 0 && (
                  <div
                    className="h-full bg-gray-500 rounded-r-full transition-all duration-300 relative group cursor-pointer"
                    style={{ width: `${epePct}%` }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-20">
                      <div className="px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap shadow-md">
                        Epe Staged: {epeSeats.toLocaleString()} seats
                      </div>
                      <div className="w-1.5 h-1.5 bg-gray-800 rotate-45 -mt-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Stat Cards Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-gray-50 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[24px]">how_to_reg</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-gray-600 truncate">Active Enrolled Learners</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-xl font-bold text-gray-900">2,428</span>
                      <span className="text-xs text-cyan-600 font-bold">80.9%</span>
                    </div>
                    <span className="text-xs text-gray-600 mt-0.5 truncate">Across all 3 campuses</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white text-amber-500 flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[24px]">pending_actions</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-gray-600 truncate">Pending Applications</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-xl font-bold text-gray-900">272</span>
                      <span className="text-xs text-amber-500 font-bold">Pipeline</span>
                    </div>
                    <span className="text-xs text-gray-600 mt-0.5 truncate">Ready for placement</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white text-cyan-600 flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[24px]">event_seat</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-gray-600 truncate">Unallocated Buffer</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-xl font-bold text-gray-900">{totalFreeBuffer}</span>
                      <span className="text-xs text-cyan-600 font-bold">Seats</span>
                    </div>
                    <span className="text-xs text-gray-600 mt-0.5 truncate">Admissions headroom</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[24px]">payments</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-gray-600 truncate">Annual Capitation Base</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-xl font-bold text-gray-900">₦{totalRev.toFixed(1)}M</span>
                    </div>
                    <span className="text-xs text-gray-600 mt-0.5 truncate">Projected tuition volume</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Workspace: Campus Sliders & Statutory Simulator Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Campus Redistribution Matrix (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-900">Interactive Campus Rebalancing</span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                      3 Active Nodes
                    </span>
                  </div>
                  <button
                    onClick={handleAutoOptimize}
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    Balance by waitlist velocity
                  </button>
                </div>

                {/* Campus Card 1: Victoria Island Main HQ */}
                <div className="w-full rounded-xl bg-white p-4 shadow-sm border border-gray-200 flex flex-col gap-4 transition-all duration-200 hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-900">
                        <span className="material-symbols-outlined text-[22px]">apartment</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">Victoria Island Main Campus (HQ)</span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                            Node: CRN-VI-01
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-0.5">
                          <span className="text-xs text-gray-600">
                            Enrolled: <strong className="text-gray-900">984</strong>
                          </span>
                          <span className="text-xs text-gray-600">
                            Pipeline: <strong className="text-gray-900">116</strong>
                          </span>
                          <span className="text-xs text-gray-600">
                            Free Buffer: <strong className="text-cyan-600">{viFree}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold">
                        {viUtil}% Utilized • {viUtil > 85 ? 'High Density' : 'Healthy Headroom'}
                      </span>
                    </div>
                  </div>

                  {/* Slider & Numerical Sync Block */}
                  <div className="p-3 rounded-lg bg-gray-50 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Assigned Statutory Seat Capacity</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Floor: 1,000 | Ceiling: 1,600</span>
                        <div className="flex items-center bg-white px-2 py-1 rounded-lg shadow-inner border border-gray-200">
                          <input
                            type="number"
                            min={1000}
                            max={1600}
                            value={viSeats}
                            onChange={(e) => setViSeats(parseInt(e.target.value) || 1000)}
                            className="w-16 text-xs font-bold text-gray-900 bg-transparent text-right outline-none"
                          />
                          <span className="text-xs text-gray-600 ml-1">seats</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min={1000}
                        max={1600}
                        step={10}
                        value={viSeats}
                        onChange={(e) => setViSeats(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  </div>

                  {/* Academic Tiers Split Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2 rounded-lg bg-gray-50 flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Early Years (EYFS)</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">{viTiers.ey} seats</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Primary Basic (1-6)</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">{viTiers.pri} seats</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Junior Secondary (JSS)</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">{viTiers.jss} seats</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Senior Secondary (SSS)</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">{viTiers.sss} seats</span>
                    </div>
                  </div>
                </div>

                {/* Campus Card 2: Lekki Phase 1 Branch */}
                <div className="w-full rounded-xl bg-white p-4 shadow-sm border border-gray-200 flex flex-col gap-4 transition-all duration-200 hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-900">
                        <span className="material-symbols-outlined text-[22px]">domain_add</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">Lekki Phase 1 Branch</span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                            Node: CRN-LEK-02
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-0.5">
                          <span className="text-xs text-gray-600">
                            Enrolled: <strong className="text-gray-900">740</strong>
                          </span>
                          <span className="text-xs text-gray-600">
                            Pipeline: <strong className="text-gray-900">94</strong>
                          </span>
                          <span className="text-xs text-gray-600">
                            Free Buffer: <strong className="text-cyan-600">{lekFree}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold">
                        {lekUtil}% Utilized • {lekUtil < 75 ? 'Expansion Candidate' : 'Moderate Headroom'}
                      </span>
                    </div>
                  </div>

                  {/* Slider & Numerical Sync Block */}
                  <div className="p-3 rounded-lg bg-gray-50 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Assigned Statutory Seat Capacity</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Floor: 800 | Ceiling: 1,400</span>
                        <div className="flex items-center bg-white px-2 py-1 rounded-lg shadow-inner border border-gray-200">
                          <input
                            type="number"
                            min={800}
                            max={1400}
                            value={lekSeats}
                            onChange={(e) => setLekSeats(parseInt(e.target.value) || 800)}
                            className="w-16 text-xs font-bold text-gray-900 bg-transparent text-right outline-none"
                          />
                          <span className="text-xs text-gray-600 ml-1">seats</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min={800}
                        max={1400}
                        step={10}
                        value={lekSeats}
                        onChange={(e) => setLekSeats(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Academic Tiers Split Matrix */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-gray-50 flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Early Years (Toddler &amp; KG)</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">{lekTiers.ey} seats</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Primary Basic Grade 1 to 6</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">{lekTiers.pri} seats</span>
                    </div>
                  </div>
                </div>

                {/* Campus Card 3: Ikeja GRA Campus */}
                <div className="w-full rounded-xl bg-white p-4 shadow-sm border border-gray-200 flex flex-col gap-4 transition-all duration-200 hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-900">
                        <span className="material-symbols-outlined text-[22px]">location_city</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">Ikeja GRA Campus</span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                            Node: CRN-IKJ-03
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-0.5">
                          <span className="text-xs text-gray-600">
                            Enrolled: <strong className="text-gray-900">704</strong>
                          </span>
                          <span className="text-xs text-gray-600">
                            Pipeline: <strong className="text-gray-900">62</strong>
                          </span>
                          <span className="text-xs text-gray-600">
                            Free Buffer: <strong className="text-cyan-600">{ikjFree}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                        {ikjUtil}% Utilized • {ikjUtil > 85 ? 'Tight Capacity' : 'Compliant'}
                      </span>
                    </div>
                  </div>

                  {/* Slider & Numerical Sync Block */}
                  <div className="p-3 rounded-lg bg-gray-50 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Assigned Statutory Seat Capacity</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Floor: 750 | Ceiling: 1,100</span>
                        <div className="flex items-center bg-white px-2 py-1 rounded-lg shadow-inner border border-gray-200">
                          <input
                            type="number"
                            min={750}
                            max={1100}
                            value={ikjSeats}
                            onChange={(e) => setIkjSeats(parseInt(e.target.value) || 750)}
                            className="w-16 text-xs font-bold text-gray-900 bg-transparent text-right outline-none"
                          />
                          <span className="text-xs text-gray-600 ml-1">seats</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min={750}
                        max={1100}
                        step={10}
                        value={ikjSeats}
                        onChange={(e) => setIkjSeats(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>
                  </div>

                  {/* Academic Tiers Split Matrix */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-gray-50 flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Primary Basic (Upper 4-6)</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">{ikjTiers.pri} seats</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 flex flex-col">
                      <span className="text-xs uppercase text-gray-600">Junior Secondary (JSS 1-3)</span>
                      <span className="text-xs font-bold text-gray-900 mt-0.5">{ikjTiers.jss} seats</span>
                    </div>
                  </div>
                </div>

                {/* Campus Card 4: Staged Quota Pool for Epe Campus */}
                <div className={`w-full rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${
                  isEpeActive
                    ? 'bg-white shadow-sm border border-gray-200'
                    : 'bg-gray-50 border-dashed border-2 border-gray-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <span className="material-symbols-outlined text-[22px]">add_location_alt</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">Epe Technopolis Staged Branch</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                          Node: CRN-EPE-01 (Staged)
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Physical facilities ready. Currently unassigned in active sovereign capitation schedule.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 w-full sm:w-auto">
                    {!isEpeActive ? (
                      <button
                        onClick={handleCarveOutEpe}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-blue-600 hover:bg-blue-600 hover:text-white text-xs shadow-sm transition-all border border-gray-200"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_circle</span>
                        + Carve Out 500 Seats for Epe
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold">
                          500 Seats Provisioned
                        </span>
                        <button
                          onClick={handleRevertEpe}
                          className="text-gray-600 hover:text-red-600 text-xs transition-colors flex items-center p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">undo</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Statutory Impact & UBEC Compliance Simulation (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Live Side-Panel / Comparison Module */}
                <div className="w-full rounded-xl bg-white p-4 shadow-sm border border-gray-200 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600 text-[20px]">verified</span>
                      <span className="text-lg font-semibold text-gray-900">Statutory Compliance</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold">
                      Live Model
                    </span>
                  </div>

                  {/* Ratio Alert 1: Teacher Student Ratio */}
                  <div className="p-3 rounded-lg bg-gray-50 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-900 font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-cyan-600 text-[16px]">groups</span>
                        NERDC Teacher Ratio
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-900 font-bold">
                        1:24.4 (Compliant)
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Mandatory standard is max 1:25. Total credentialed academic faculty across Lagos node is 123 teachers.
                    </p>
                    <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden mt-1">
                      <div className="w-[92%] h-full bg-cyan-500 rounded-full" />
                    </div>
                  </div>

                  {/* Ratio Alert 2: Classroom Physical Desks */}
                  <div className="p-3 rounded-lg bg-gray-50 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-900 font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-blue-600 text-[16px]">chair_alt</span>
                        Physical Desks vs. Legal Quotas
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">
                        Safe Headroom
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Certified building infrastructure allows up to 3,450 physical seats. No campus is breaching structural firesafe capacities.
                    </p>
                  </div>

                  {/* Revenue Impact Preview */}
                  <div className="p-3 rounded-lg bg-gray-50 flex flex-col gap-2">
                    <span className="text-xs text-gray-900 font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-amber-500 text-[16px]">calculate</span>
                      Projected Term Revenue Impact
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-xs text-gray-600">Victoria Island (Avg ₦180k/term):</span>
                      <span className="text-xs font-bold text-gray-900">₦{revVI.toFixed(1)}M</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-600">Lekki Ph 1 (Avg ₦140k/term):</span>
                      <span className="text-xs font-bold text-gray-900">₦{revLEK.toFixed(1)}M</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-600">Ikeja GRA (Avg ₦117.5k/term):</span>
                      <span className="text-xs font-bold text-gray-900">₦{revIKJ.toFixed(1)}M</span>
                    </div>
                    {epeSeats > 0 && (
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-gray-600">Epe Staged (Avg ₦110k/term):</span>
                        <span className="text-xs font-bold text-gray-900">₦{revEPE.toFixed(1)}M</span>
                      </div>
                    )}
                    <div className="h-px bg-gray-200 my-1" />
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-900 font-bold">Total Annual Volume:</span>
                      <span className="text-lg text-blue-600 font-bold">₦{totalRev.toFixed(1)}M</span>
                    </div>
                  </div>

                  {/* Visual Sparkline Chart */}
                  <div className="p-3 rounded-lg bg-gray-50 flex flex-col gap-2">
                    <span className="text-xs uppercase text-gray-600 font-bold">Capitation Run-Rate Trend</span>
                    <div className="w-full h-20 flex items-end">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 300 70" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0,55 Q 50,45 100,50 T 200,30 T 300,15 L 300,70 L 0,70 Z"
                          fill="url(#chartGradient)"
                        />
                        <path
                          d="M 0,55 Q 50,45 100,50 T 200,30 T 300,15"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="300" cy="15" r="4" className="fill-blue-600 ring-4 ring-blue-100" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Term 1 Actual</span>
                      <span>Term 2 Projection</span>
                      <span>Rebalanced Full Cycle</span>
                    </div>
                  </div>

                  {/* Statutory Disclaimer Box */}
                  <div className="p-2 rounded bg-gray-100 text-gray-600 text-xs flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-gray-500 shrink-0 mt-0.5">info</span>
                    <span>
                      Allocations reflect statutory student headcounts governed by UBEC circular LAG/2026/ED-44.
                      Reductions cannot fall below enrolled students without council dispensation.
                    </span>
                  </div>
                </div>

                {/* Campus Mini-Gallery / Physical Assets Card */}
                <div className="w-full rounded-xl bg-white p-4 shadow-sm border border-gray-200 flex flex-col gap-3">
                  <span className="text-lg font-semibold text-gray-900">Campus Verification Audits</span>

                  <div className="relative w-full h-32 rounded-lg overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop"
                      alt="Modern private academy campus courtyard with students"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs text-white font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">verified_user</span>
                        Victoria Island Facilities Audited Oct 2026
                      </span>
                    </div>
                  </div>

                  <div className="relative w-full h-32 rounded-lg overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=400&fit=crop"
                      alt="Elite primary and secondary campus building exterior"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs text-white font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">verified_user</span>
                        Lekki Phase 1 Building Permit Confirmed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Master Action Bar at Bottom */}
            <div className="w-full rounded-xl bg-white p-4 shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 text-xs transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  Reset to Previous Distribution
                </button>
                <button
                  onClick={handleAutoOptimize}
                  className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 text-xs transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                  Run Optimization Algorithm
                </button>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs text-gray-900 font-semibold flex items-center justify-end gap-1">
                    <span className="material-symbols-outlined text-cyan-600 text-[16px]">security</span>
                    FIPS 140-3 HSM Signed
                  </span>
                  <span className="text-xs text-gray-600">Keys held by Adebayo Adeleke</span>
                </div>
                <button
                  onClick={handleCommit}
                  disabled={!isBalanced}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-white text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isBalanced
                      ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                  Commit &amp; Sign Shard Quota Redistribution
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-8 z-[10001] max-w-md w-full animate-slideIn">
          <div className="p-4 rounded-xl bg-gray-800 text-white shadow-2xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-lg font-bold">Quota Schedule Cryptographically Signed</span>
              <p className="text-sm text-gray-300 mt-1 leading-snug">
                Distributed to Lagos Node Edge and synced with National UBEC Master Clearing House.
                Shard transaction TX-940218-QTA registered.
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-gray-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
