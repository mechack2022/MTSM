import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '@/store'
import { useLogout } from '@/hooks'

export default function TenantGazettePage() {
  const { tenantId } = useParams()
  const { user } = useAuth()
  const logout = useLogout()

  const handleLogout = () => {
    logout.mutate()
  }

  // Mock gazette data
  const gazetteData = {
    serialNumber: 'NG-EDUMANAGE-2026-TX940218-CERT',
    issueTimestamp: '14 October 2026 • 14:40:22 WAT',
    issueStatus: 'Enclave Status: LIVE & ENFORCED',
    entity: {
      legalName: 'Oasis Educational Foundation',
      cacNumber: 'RC: 940218',
      cacStatus: 'Part C: Companies & Allied Matters Act',
      federalTaxId: '2409-1830-0019',
      taxStatus: 'FIRS Integrated Payroll Confirmed',
      sovereignDomain: 'https://oasis.edumanage.ng',
      domainStatus: 'TLS 1.3 Wildcard • Cloudflare Anycast (LOS/ABJ • Abuja PoP)'
    },
    rootExecutive: {
      name: 'Chief Dr. Adebayo Adeleke',
      title: 'Chairman, Board of Trustees'
    },
    edgeInfrastructure: {
      shardId: 'SHARD-OASIS-NG-01',
      nodeCluster: 'NG-FED-LOS-01',
      cipherState: 'AES-256-GCM',
      enclaveType: 'LOS-01 (Primary) & ABJ-02 (Standby)',
      replicationLatency: 'Lagos Metro 0.4 • Abuja',
      quotaLimit: '3,000 Seats',
      quotaType: 'Autonomous Economic IoT Turnstiles'
    },
    campuses: [
      { name: 'Victoria Island Main Campus (HQ)', nodeId: 'CRN-VI-01', capacity: '1,200 Learner Capacity', badge: 'Primary Hub' },
      { name: 'Lekki Phase 1 Branch (Satellite)', nodeId: 'CRN-LEK-02', capacity: '1,000 Learner Capacity', badge: 'Satellite Node' },
      { name: 'Ikeja GRA Campus (Satellite)', nodeId: 'CRN-IKJ-03', capacity: '800 Learner Capacity', badge: 'Satellite Node' }
    ],
    ndpa: {
      status: 'Attested under section 34 §1. Zero cross-border data transfer guarantee: 100% of sovereign data transfer confined within the Nigerian sovereign jurisdiction.',
      backgroundCheck: 'Zero Cross-Border Transfer Compliance: 100% Proved',
      ubec: 'UBEC-FED-2026-SUB819',
      ubecDetails: 'Certified by Universal Basic Education Commission for electronic-record retention & parental consent forms under Grant ID.',
      nationalLedger: 'National Basic Education Ledger Integrated'
    },
    blockHash: '8f1e29c48b77d0d46508d1d08fa3c613b9d124781290df409240e47d26d5b2f091',
    transaction: 'SHA-256 LEDGER TRANSACTION',
    ledgerTimestamp: 'Tx Hash: 0xBF7aDE9cbBbFa7d408bBF4d2A3349267d7781259D8f2d7e9296f2d924beF7d25d4...',
    signatures: [
      { authority: 'NRC: sec-ops@edumanage.ng', label: 'Federal Educational Root Authority', timestamp: 'Esigned: 2026-10-14 14:40:22' },
      { authority: 'Registrar-General, CAC', label: 'Corporate Affairs Commission API', timestamp: 'Attested via Gov-API Gate' },
      { authority: 'NITDA Enclave HSM', label: 'Hardware Security Module', timestamp: 'FIPS 140-3 Level 3 Sealed' }
    ],
    qrCode: 'verify.edumanage.ng',
    revision: '2024.4.1',
    archiveLocation: 'LOS-LOK-940218'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Action Bar */}
      <div className="bg-white border-b border-gray-300 px-6 py-3 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/tenant-deployed/oasis-940218"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Handover Hub
            </Link>
            <div className="text-sm text-gray-600">
              Tenants & Orgs / Provisioning Engine / Launch Completion /
              <span className="font-bold text-blue-600"> Statutory Handover Gazette & NDPA Audit (TX-PRV-940218-LIVE)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded">
              ● HSM FMS SIG: 3-LEVEL VERIFIED
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded">
              Ledger Block #1,881,004
            </span>
          </div>
        </div>
      </div>

      {/* Breadcrumb & Actions */}
      <div className="bg-blue-900 text-white px-6 py-4 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">
              ● HSM FMS SIG: 3-LEVEL VERIFIED • Ledger Block #1,881,004
            </p>
            <h1 className="text-2xl font-bold">
              Oasis Educational Foundation <span className="text-blue-300">RC: 940218</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Proof Hash
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Stamp NDPA HSM
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Print Statutory Cert
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Signed PDF
            </button>
          </div>
        </div>
      </div>

      {/* Official Gazette Document */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white shadow-2xl border-4 border-green-900 rounded-lg overflow-hidden">
          {/* Decorative Header with Security Pattern */}
          <div className="relative bg-gradient-to-r from-green-800 via-green-700 to-green-800 p-8 text-white">
            {/* Guilloche Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px), repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
              }}></div>
            </div>

            <div className="relative">
              {/* Federal Seal Icons */}
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/50">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/50">
                  <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/50">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold tracking-wider mb-2 opacity-90">
                  PRESIDENCY • FEDERAL MINISTRY OF EDUCATION
                </p>
                <p className="text-xs font-semibold tracking-widest mb-4 opacity-80">
                  OFFICIAL FEDERAL GAZETTE • LEGAL & AUTONOMOUS INFRASTRUCTURE ACT
                </p>
                <h1 className="text-4xl font-bold mb-2 tracking-tight">
                  FEDERAL REPUBLIC OF NIGERIA
                </h1>
                <h2 className="text-2xl font-bold mb-4">
                  STATUTORY EDUCATIONAL ENCLAVE GAZETTE & SOVEREIGN HANDOVER RECORD
                </h2>
                <p className="text-sm opacity-90 max-w-3xl mx-auto">
                  Certificate of Autonomous Provisioning, Sovereign Shard Allocation & NDPA 2023 Statutory Compliance
                </p>
              </div>

              {/* Certificate Serial */}
              <div className="mt-6 text-center">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-white/50">
                  <p className="text-xs font-semibold tracking-wider mb-1 opacity-80">CERTIFICATE SERIAL</p>
                  <p className="text-xl font-mono font-bold tracking-wider">{gazetteData.serialNumber}</p>
                </div>
              </div>

              {/* Issue Details */}
              <div className="mt-4 flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">ISSUE TIMESTAMP:</span>
                  <span>{gazetteData.issueTimestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-bold">{gazetteData.issueStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="p-12">
            {/* Section 01: Entity & Accreditation Particulars */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">01</p>
                  <h3 className="text-xl font-bold text-gray-900">Entity & Accreditation Particulars</h3>
                </div>
                <div className="flex-1"></div>
                <span className="px-4 py-2 bg-teal-500 text-white text-sm font-bold rounded">
                  CAC CORPORATE REGISTER VERIFIED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">LEGAL ENTITY NAME</p>
                    <p className="text-lg font-bold text-gray-900">{gazetteData.entity.legalName}</p>
                  </div>
                  <div className="border-b border-gray-300 pb-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">CAC CORPORATE AFFAIRS COMMISSION</p>
                    <p className="text-lg font-bold text-gray-900">{gazetteData.entity.cacNumber}</p>
                    <p className="text-sm text-gray-600">{gazetteData.entity.cacStatus}</p>
                  </div>
                  <div className="border-b border-gray-300 pb-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">FEDERAL TAX IDENTIFICATION (TIN)</p>
                    <p className="text-lg font-bold text-gray-900">{gazetteData.entity.federalTaxId}</p>
                    <p className="text-sm text-gray-600">{gazetteData.entity.taxStatus}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">APPOINTED ROOT EXECUTIVE</p>
                    <p className="text-lg font-bold text-gray-900">{gazetteData.rootExecutive.name}</p>
                    <p className="text-sm text-gray-600">{gazetteData.rootExecutive.title}</p>
                  </div>
                  <div className="border-b border-gray-300 pb-3">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">ALLOCATED SOVEREIGN SUBDOMAIN & TLS EDGE</p>
                    <p className="text-lg font-mono font-bold text-blue-600">{gazetteData.entity.sovereignDomain}</p>
                    <p className="text-sm text-gray-600">{gazetteData.entity.domainStatus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 02: Sovereign Edge Infrastructure */}
            <div className="mb-10 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">02</p>
                  <h3 className="text-xl font-bold text-gray-900">Sovereign Edge Infrastructure & Shard Allocation</h3>
                </div>
                <div className="flex-1"></div>
                <span className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded">
                  DUAL-REGION ACTIVE-STANDBY
                </span>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">DEDICATED SHARD</p>
                  <p className="text-2xl font-mono font-bold text-blue-900 mb-1">{gazetteData.edgeInfrastructure.shardId}</p>
                  <p className="text-sm text-gray-600">Hardware-Isolated SQLite VFS</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">ENCLAVE DESIGNATION</p>
                  <p className="text-lg font-bold text-blue-900 mb-1">{gazetteData.edgeInfrastructure.enclaveType}</p>
                  <p className="text-sm text-gray-600">{gazetteData.edgeInfrastructure.replicationLatency}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">PROVISIONED QUOTA LIMIT</p>
                  <p className="text-2xl font-bold text-blue-900 mb-1">{gazetteData.edgeInfrastructure.quotaLimit}</p>
                  <p className="text-sm text-gray-600">{gazetteData.edgeInfrastructure.quotaType}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-blue-300">
                <p className="text-xs font-bold text-gray-500 uppercase mb-3">
                  APPROVED MULTI-CAMPUS NODE MESH (3 AUTHORIZED SHARDS)
                </p>
                <div className="space-y-2">
                  {gazetteData.campuses.map((campus, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-blue-900">{campus.nodeId}</span>
                        <span className="font-semibold text-gray-900">{campus.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">{campus.capacity}</span>
                        <span className={`px-3 py-1 text-xs font-bold rounded ${
                          campus.badge === 'Primary Hub'
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}>
                          {campus.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 03: Statutory Compliance */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">03</p>
                  <h3 className="text-xl font-bold text-gray-900">Statutory Compliance & NDPA 2023 Attestation</h3>
                </div>
                <div className="flex-1"></div>
                <span className="px-4 py-2 bg-teal-500 text-white text-sm font-bold rounded">
                  SECTION 25 SOVEREIGN ENCLAVE CERTIFIED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h4 className="font-bold text-green-900">Nigeria Data Protection Act (NDPA) 2023</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{gazetteData.ndpa.status}</p>
                  <div className="mt-4 p-3 bg-white border border-green-300 rounded">
                    <p className="text-xs font-bold text-green-900 mb-1">{gazetteData.ndpa.backgroundCheck}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="font-bold text-blue-900">UBEC National Curriculum & Subsidy Accreditation</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {gazetteData.ndpa.ubecDetails}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="p-3 bg-white border border-blue-300 rounded">
                      <p className="text-xs font-bold text-blue-900">{gazetteData.ndpa.ubec}</p>
                    </div>
                    <div className="p-3 bg-white border border-blue-300 rounded">
                      <p className="text-xs font-bold text-blue-900">{gazetteData.ndpa.nationalLedger}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 04: Cryptographic Proof */}
            <div className="mb-10 bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">04</p>
                  <h3 className="text-xl font-bold text-gray-900">Cryptographic Proof & Tripartite Digital Signatures</h3>
                </div>
                <div className="flex-1"></div>
                <span className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded">
                  EDDSIG IMMUTABLE BLOCK
                </span>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">{gazetteData.transaction}</p>
                <p className="font-mono text-sm text-green-400 break-all mb-3">{gazetteData.blockHash}</p>
                <p className="font-mono text-xs text-gray-400 break-all">{gazetteData.ledgerTimestamp}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {gazetteData.signatures.map((sig, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border-2 border-purple-300">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-purple-900 uppercase">{sig.authority}</p>
                        <p className="text-xs text-gray-600">{sig.label}</p>
                      </div>
                    </div>
                    <p className="text-xs font-mono text-gray-500 mt-2">{sig.timestamp}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between bg-white rounded-lg p-4 border-2 border-purple-300">
                <div>
                  <p className="text-sm font-bold text-purple-900 mb-1">NITDA Enclave HSM Hardware Security Module</p>
                  <p className="text-xs text-gray-600">FIPS 140-3 Level 3 Sealed</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-purple-100 rounded border-2 border-purple-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="grid grid-cols-4 gap-1 mb-1">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-purple-900' : 'bg-white'}`}></div>
                        ))}
                      </div>
                      <p className="text-[6px] font-bold text-purple-900">INSTANT NDPA SCAN</p>
                      <p className="text-[6px] text-purple-700">{gazetteData.qrCode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-500 uppercase">Verify Edumanage.NG</p>
                    <p className="text-sm font-mono font-bold text-purple-900">{gazetteData.qrCode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-4 border-green-900 pt-6">
              <div className="flex items-start justify-between">
                <div className="text-sm text-gray-600">
                  <p className="font-bold mb-1">
                    Issued under the Federal Ministry of Education Sovereign Cloud Directives & Nigerian Data Protection Commission (NDPPC) Statutory Framework
                  </p>
                  <p className="text-xs">
                    Doc Revision: {gazetteData.revision} • Permanent Vault Archive ID: {gazetteData.archiveLocation}
                  </p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p className="font-mono">NG-EDUMANAGE-OFFICIAL</p>
                  <p>{gazetteData.issueTimestamp}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Watermark */}
          <div className="bg-gradient-to-r from-green-900 to-blue-900 p-3 text-center">
            <p className="text-white text-xs font-bold tracking-wider">
              THIS STATUTORY DOCUMENT IS CRYPTOGRAPHICALLY SEALED & LEGALLY BINDING UNDER NIGERIAN FEDERAL LAW
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
