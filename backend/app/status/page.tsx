async function getStatus() {
  try {
    const res = await fetch('http://localhost:3000/api/status', {
      cache: 'no-store',
    })
    return await res.json()
  } catch (error) {
    return {
      status: 'error',
      error: 'Failed to fetch status',
    }
  }
}

export default async function StatusPage() {
  const data = await getStatus()
  const isHealthy = data.status === 'healthy'

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <a href="/" className="text-sm text-[#a1a1aa] hover:text-white transition-colors">
            ← Back to Home
          </a>
        </div>

        {/* Status Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="relative flex h-4 w-4">
              {isHealthy && (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e0ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00e0ff]"></span>
                </>
              )}
              {!isHealthy && (
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              )}
            </span>
            <h1 className="text-4xl font-bold">
              {isHealthy ? 'All Systems Operational' : 'System Issues Detected'}
            </h1>
          </div>
          <p className="text-[#a1a1aa]">
            {data.service || 'PersistQ API'} • Version {data.version || 'Unknown'}
          </p>
          <p className="text-sm text-[#a1a1aa] mt-2">
            Last checked: {data.timestamp ? new Date(data.timestamp).toLocaleString() : 'Unknown'}
          </p>
        </div>

        {/* System Checks */}
        {data.checks && (
          <div className="space-y-4 mb-12">
            <h2 className="text-xl font-semibold mb-6">System Components</h2>

            <div className="grid gap-4">
              {/* Database */}
              <div className="p-6 rounded-lg border border-[#2a2a2a] bg-[#181818] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    data.checks.database === 'connected' ? 'bg-[#00e0ff]' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold">PostgreSQL Database</h3>
                    <p className="text-sm text-[#a1a1aa]">Primary data storage</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  data.checks.database === 'connected'
                    ? 'bg-[#00e0ff]/10 text-[#00e0ff]'
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {data.checks.database || 'unknown'}
                </span>
              </div>

              {/* pgvector */}
              <div className="p-6 rounded-lg border border-[#2a2a2a] bg-[#181818] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    data.checks.pgvector === 'enabled' ? 'bg-[#00e0ff]' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold">pgvector Extension</h3>
                    <p className="text-sm text-[#a1a1aa]">Vector similarity search</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  data.checks.pgvector === 'enabled'
                    ? 'bg-[#00e0ff]/10 text-[#00e0ff]'
                    : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {data.checks.pgvector || 'unknown'}
                </span>
              </div>

              {/* Redis */}
              <div className="p-6 rounded-lg border border-[#2a2a2a] bg-[#181818] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    data.checks.redis === 'configured' || data.checks.redis === 'connected'
                      ? 'bg-[#00e0ff]'
                      : 'bg-[#a1a1aa]'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold">Redis Cache</h3>
                    <p className="text-sm text-[#a1a1aa]">Performance caching layer</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  data.checks.redis === 'configured' || data.checks.redis === 'connected'
                    ? 'bg-[#00e0ff]/10 text-[#00e0ff]'
                    : 'bg-[#a1a1aa]/10 text-[#a1a1aa]'
                }`}>
                  {data.checks.redis || 'unknown'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* JSON View Toggle */}
        <details className="p-6 rounded-lg border border-[#2a2a2a] bg-[#181818]">
          <summary className="cursor-pointer font-semibold text-[#00e0ff] hover:text-[#00e0ff]/80">
            View Raw JSON Response
          </summary>
          <pre className="mt-4 p-4 bg-[#0d0d0d] rounded text-sm overflow-x-auto">
            <code className="text-[#a1a1aa]">{JSON.stringify(data, null, 2)}</code>
          </pre>
        </details>

        {/* API Endpoint Info */}
        <div className="mt-8 p-6 rounded-lg border border-[#2a2a2a] bg-[#181818]/50">
          <h3 className="font-semibold mb-3">Programmatic Access</h3>
          <p className="text-sm text-[#a1a1aa] mb-3">
            Use the JSON endpoint for monitoring and automation:
          </p>
          <code className="text-sm bg-[#0d0d0d] px-3 py-2 rounded text-[#00e0ff] block">
            GET https://api.persistq.com/api/status
          </code>
        </div>
      </div>
    </div>
  )
}
