import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authenticateRequest } from '@/utils/auth'
import { supabase } from '@/utils/supabase'

const prisma = new PrismaClient()

export const GET = async (request: NextRequest) => {
  const authError = await authenticateRequest(request)
  if (authError) return authError

  const token = request.headers.get('Authorization') ?? ''
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return NextResponse.json({ status: 'Unauthorized' }, { status: 401 })

  const userId = data.user.id

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      post: {
        include: {
          postCategories: { include: { category: { select: { id: true, name: true } } } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ status: 'OK', favorites })
}