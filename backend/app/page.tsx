export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans flex flex-col items-center justify-center px-4">
      <main className="max-w-3xl mx-auto text-center space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#181818] px-4 py-2 text-sm text-[#a1a1aa] border border-[#2a2a2a]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e0ff]"></span>
          </span>
          Operational
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          PersistQ API
        </h1>

        <p className="text-xl text-[#a1a1aa] leading-relaxed">
          Intelligent memory persistence for AI agents
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="/api/status"
            className="px-8 py-3 bg-[#00e0ff] text-black font-semibold rounded-lg hover:bg-[#00e0ff]/90 transition-colors"
          >
            API Status
          </a>
          <a
            href="https://persistq.com/docs"
            className="px-8 py-3 border border-[#2a2a2a] text-white font-semibold rounded-lg hover:bg-[#181818] transition-colors"
          >
            Documentation
          </a>
        </div>

        {/* Footer */}
        <div className="pt-16 text-sm text-[#a1a1aa]">
          <p>© 2025 PersistQ</p>
        </div>
      </main>
    </div>
  );
}
