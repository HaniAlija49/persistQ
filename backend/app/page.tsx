export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center gap-8 px-8 py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/50 px-4 py-2 text-sm text-zinc-400 border border-zinc-700/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            API Status: Operational
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            PersistQ API
          </h1>

          <p className="max-w-2xl text-xl text-zinc-400 leading-relaxed">
            Intelligent memory persistence for AI agents and applications.
            Store, search, and retrieve contextual memories with vector embeddings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="/api/status"
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-100 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Health Check
          </a>

          <a
            href="https://persistq.com/docs"
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800/50 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Documentation
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Fast</h3>
            </div>
            <p className="text-sm text-zinc-400">
              Vector-powered semantic search with Redis caching
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Secure</h3>
            </div>
            <p className="text-sm text-zinc-400">
              End-to-end encryption with enterprise-grade auth
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Smart</h3>
            </div>
            <p className="text-sm text-zinc-400">
              AI-powered embeddings for contextual memory
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-zinc-500">
          Powered by Next.js, PostgreSQL, and pgvector
        </div>
      </main>
    </div>
  );
}
