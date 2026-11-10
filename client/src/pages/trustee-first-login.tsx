import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'
import toast from 'react-hot-toast'

export default function TrusteeFirstLoginPage() {
  const navigate = useNavigate()
  const setAuth = useAppStore((state) => state.setAuth)
  const [timeRemaining, setTimeRemaining] = useState('23h 48m')
  const [masterPassphrase, setMasterPassphrase] = useState('')
  const [confirmPassphrase, setConfirmPassphrase] = useState('')
  const [ndpaAttestationChecked, setNdpaAttestationChecked] = useState(false)
  const [authMethod, setAuthMethod] = useState<'yubikey' | 'whatsapp'>('yubikey')

  // Mock data
  const trusteeData = {
    name: 'Chief Dr. Adebayo Adeleke',
    title: 'Executive Trustee • Governing Board Chair',
    enclaveRealm: 'oasis.edumanage.ng',
    emergencyPhone: '+234 803 *** 1109',
    shardAllocation: 'SHARD-OASIS-NG-01',
    rootKey: 'OSIS-7842-ROOT-NG',
    sqliteShardId: 'SHARD-OASIS-NG-01',
    hsmSignature: '0x9F4A...B831'
  }

  // Calculate passphrase entropy
  const calculateEntropy = (password: string) => {
    const hasNumbers = /\d/.test(password)
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const noDictionary = !/password|admin|12345/.test(password.toLowerCase())

    const checks = [
      password.length >= 16,
      hasNumbers,
      hasSymbols,
      hasUpperCase && hasLowerCase,
      noDictionary
    ]

    return checks.filter(Boolean).length
  }

  const entropyScore = calculateEntropy(masterPassphrase)
  const entropyPercentage = (entropyScore / 5) * 100

  const handleAuthenticate = () => {
    // Create tenant admin user object
    const user = {
      id: '2',
      tenantId: 'tenant-001',
      username: 'Chief Dr. Adebayo Adeleke',
      fullName: 'Chief Dr. Adebayo Adeleke',
      roleId: 'TENANT_ADMIN',
      roleName: 'TENANT_ADMIN',
      isActive: true,
      isPlatformAdmin: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Save auth data to store
    setAuth({
      user,
      token: 'dummy-token-tenantadmin',
      tenant: null,
      assignedSchools: [],
    })

    toast.success('Sovereign enclave initialized successfully!')

    // Navigate to tenant admin dashboard
    navigate('/tenant-admin/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">Oasis Educational Foundation <span className="text-blue-600">RC: 940218</span></h1>
              <p className="text-sm text-gray-600">Sovereign Multi-Campus Trust Directory • Federal Republic of Nigeria</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg mb-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-bold text-green-900">EduManage Sovereign Enclave</span>
          </div>
          <p className="text-sm text-gray-600">AIR-GAPPED READY • NODE: LOS-1</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Stage Badge */}
          <div className="bg-blue-600 px-6 py-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-bold text-white uppercase tracking-wider">Provisioning Handshake • Stage 1</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 p-8">
            {/* Left Column - Verified Credentials */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Proprietor & Trustee<br/>Secure Authentication</h2>
              <p className="text-gray-600 mb-8">
                Sign in to access your sovereign educational trust enclave (RC: 940218). This verified handshake binds your hardware signature to cryptographic root keys.
              </p>

              {/* Verified Credentials Card */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-900">Verified Credentials</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded">APPOINTED</span>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                    AA
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{trusteeData.name}</h4>
                    <p className="text-sm text-gray-600">{trusteeData.title}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span>Enclave Realm</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-blue-600">{trusteeData.enclaveRealm}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Emergency Recovery Tel</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-gray-900">{trusteeData.emergencyPhone}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                      <span>Shard Allocation</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-orange-600">{trusteeData.shardAllocation}</span>
                  </div>
                </div>
              </div>

              {/* Offline-First Replication Node */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <h4 className="font-bold text-gray-900">Offline-First Replication Node</h4>
                </div>
                <p className="text-sm text-gray-600">SQLite VFS signed snapshot synced across campus gateways with zero public lease exposure.</p>
              </div>

              {/* NDPA 2023 Statutory Compliance */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 className="font-bold text-green-900">NDPA 2023 Statutory Compliance</h4>
                </div>
                <p className="text-sm text-gray-700">Data residency strictly bounded within the geographical borders of Nigeria pursuant to NDPC directives.</p>
              </div>
            </div>

            {/* Right Column - Authentication Steps */}
            <div className="space-y-6">
              {/* Step 1: Ephemeral Root Provisioning Key */}
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Ephemeral Root Provisioning Key</h3>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-mono font-bold text-gray-900 tracking-wider">
                      {trusteeData.rootKey}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-bold text-red-600">Expires in {timeRemaining}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs font-bold text-red-900">Validated</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Supplied via physical courier dispatch token by the EduManage Board Registry.</p>
              </div>

              {/* Step 2: Multi-Factor Hardware Handshake */}
              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Multi-Factor Hardware Handshake</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">NDPA PRIORITY STANDARD</span>
                </div>

                {/* Auth Method Tabs */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setAuthMethod('yubikey')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      authMethod === 'yubikey'
                        ? 'border-blue-600 bg-white'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span className="font-bold text-gray-900 text-sm">Hardware FIDO2 YubiKey</span>
                    </div>
                    <p className="text-xs text-gray-600 text-left">
                      Direct cryptographic token challenge via physical NFC/USB security key.
                    </p>
                    {authMethod === 'yubikey' && (
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                        Recommended
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setAuthMethod('whatsapp')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      authMethod === 'whatsapp'
                        ? 'border-blue-600 bg-white'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="font-bold text-gray-900 text-sm">WhatsApp 6-Digit OTP</span>
                    </div>
                    <p className="text-xs text-gray-600 text-left">
                      Encrypted prompt transmitted directly to registered mobile (+234 803 *** 1109).
                    </p>
                    {authMethod === 'whatsapp' && (
                      <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">
                        Instant Delivery
                      </span>
                    )}
                  </button>
                </div>

                {authMethod === 'yubikey' && (
                  <div className="bg-white border-2 border-blue-300 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span className="font-bold text-gray-900">Insert or Tap YubiKey / WebAuthn Authenticator</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Ready for physical touch gesture confirmation.</p>
                    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                      Scan Key
                    </button>
                  </div>
                )}

                {authMethod === 'whatsapp' && (
                  <div className="bg-white border-2 border-green-300 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="font-bold text-gray-900">Enter WhatsApp 6-Digit Code</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Check your WhatsApp messages for the OTP code.</p>
                    <input
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-mono font-bold tracking-widest focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Step 3: Establish Permanent Master Passphrase */}
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Establish Permanent Master Passphrase</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Master Passphrase</label>
                    <input
                      type="password"
                      value={masterPassphrase}
                      onChange={(e) => setMasterPassphrase(e.target.value)}
                      placeholder="••••••••••••••••••••••••"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Confirm Passphrase</label>
                    <input
                      type="password"
                      value={confirmPassphrase}
                      onChange={(e) => setConfirmPassphrase(e.target.value)}
                      placeholder="••••••••••••••••••••••••"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                    />
                  </div>

                  {/* Entropy Rating */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-900">Cryptographic Entropy Rating</span>
                      <span className="text-sm font-bold text-green-600">FIPS Sovereign Compliant ({entropyPercentage.toFixed(0)}% Entropic)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${entropyPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className={entropyScore >= 1 ? 'text-green-600 font-bold' : ''}>✓ &gt;16 Characters</span>
                      <span className={entropyScore >= 2 ? 'text-green-600 font-bold' : ''}>✓ Alphanumeric & Symbols</span>
                      <span className={entropyScore >= 5 ? 'text-green-600 font-bold' : ''}>✓ No Dictionary Names</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* NDPA Attestation Checkbox */}
              <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ndpaAttestationChecked}
                    onChange={(e) => setNdpaAttestationChecked(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-sm text-gray-900">
                    <span className="font-bold">I, Chief Dr. Adebayo Adeleke,</span> hereby attest and execute statutory data custodianship under the{' '}
                    <span className="text-blue-600 font-bold underline">NDPA 2023 Statutory Data Boundary Agreement</span>. I certify that Oasis Educational Foundation master encryption root keys are solely deposited into this isolated tenant shard.
                  </div>
                </label>
              </div>

              {/* Authenticate Button */}
              <button
                onClick={handleAuthenticate}
                disabled={!ndpaAttestationChecked || masterPassphrase.length < 8 || masterPassphrase !== confirmPassphrase}
                className={`w-full px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                  !ndpaAttestationChecked || masterPassphrase.length < 8 || masterPassphrase !== confirmPassphrase
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Authenticate & Initialize Sovereign Enclave
                </div>
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>TLS 1.3 Strict Enclave</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>FIPS 140-3 Hardware Root</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>256-Bit VFS Storage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-4">
                <span>SQLite VFS Shard: <span className="font-mono font-bold text-gray-900">{trusteeData.sqliteShardId}</span></span>
                <span>•</span>
                <span>HSM Signature: <span className="font-mono font-bold text-gray-900">{trusteeData.hsmSignature}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-green-900">Online & Synced</span>
                <span>• Offline-first ready • Zero data leak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
