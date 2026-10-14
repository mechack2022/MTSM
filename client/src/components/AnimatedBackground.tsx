// ============================================================================
// ANIMATED BACKGROUND - Reusable Background Component
// ============================================================================

export default function AnimatedBackground() {
  return (
    <>
      {/* Base Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -z-10"></div>

      {/* Animated Mesh Gradient Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-200/30 rounded-lg rotate-12 animate-float-slow"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 border-2 border-purple-200/30 rounded-full animate-float-slow animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-indigo-200/30 rounded-lg rotate-45 animate-float-slow animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-cyan-200/30 rounded-full animate-float-slow animation-delay-3000"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 border-2 border-pink-200/30 rounded-lg rotate-12 animate-float-slow animation-delay-1500"></div>
      </div>

      <style>{`
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

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </>
  )
}
