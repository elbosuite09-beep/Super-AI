import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get('target')

  try {
    const files = await prisma.courseFile.findMany({
      where: {
        target: target || undefined
      },
      include: {
        subject: true,
        class: true
      }
    })
    return NextResponse.json(files)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, url, type, target, subjectId, classId } = body

    const file = await prisma.courseFile.create({
      data: { title, url, type, target, subjectId, classId }
    })

    return NextResponse.json(file, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
