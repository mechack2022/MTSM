// ============================================================================
// CLASSES PAGE - Placeholder
// ============================================================================

import AnimatedBackground from '@/components/AnimatedBackground'

export default function ClassesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden p-8">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 text-center border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Class Management
          </h1>
          <p className="text-gray-600">
            This page will allow you to view, add, and manage class sections.
          </p>
        </div>
      </div>
    </div>
  )
}
