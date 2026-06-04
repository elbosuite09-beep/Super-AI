import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const classId = searchParams.get('classId')

  try {
    const progress = await prisma.courseProgress.findMany({
      where: {
        classId: classId || undefined
      },
      include: {
        subject: true
      }
    })
    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { subjectId, classId, chapter, status } = body

    const progress = await prisma.courseProgress.create({
      data: { subjectId, classId, chapter, status }
    })

    return NextResponse.json(progress, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
