import { NextRequest, NextResponse } from 'next/server'
import { authenticate, AuthError } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { enforceQuota } from '@/lib/billing/quotas'

export async function GET(request: NextRequest) {
  try {
    // Authenticate user (supports both Clerk and API key)
    const { user, method } = await authenticate(request)

    // Check API call quota (only track if using API key, not Clerk auth)
    const shouldTrack = method === 'api_key'
    const quotaError = await enforceQuota(user.id, 'api_call', shouldTrack)
    if (quotaError) {
      return NextResponse.json(
        { error: quotaError.error, usage: quotaError.usage },
        { status: quotaError.status }
      )
    }

    // Get total memory count for user
    const totalMemories = await prisma.memory.count({
      where: { userId: user.id },
    })

    // Get memory count by project
    const memoriesByProjectRaw = await prisma.memory.groupBy({
      by: ['project'],
      where: { userId: user.id },
      _count: {
        id: true,
      },
    })

    // Format as object for frontend
    const memoriesByProject: Record<string, number> = {}
    memoriesByProjectRaw.forEach((item) => {
      const projectName = item.project || 'Uncategorized'
      memoriesByProject[projectName] = item._count.id
    })

    // Get recent memories
    const recentMemories = await prisma.memory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        content: true,
        project: true,
        createdAt: true,
      },
    })

    // Return stats in the format expected by frontend
    return NextResponse.json({
      status: 'success',
      data: {
        totalMemories,
        memoriesByProject,
        recentMemories,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { status: 'error', error: error.message },
        { status: error.statusCode }
      )
    }

    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { status: 'error', error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
