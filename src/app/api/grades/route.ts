import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get('studentId')

  try {
    const grades = await prisma.grade.findMany({
      where: {
        studentId: studentId || undefined
      },
      include: {
        subject: true
      }
    })
    return NextResponse.json(grades)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studentId, subjectId, value, period } = body

    const grade = await prisma.grade.create({
      data: {
        studentId,
        subjectId,
        value: parseFloat(value),
        period,
      },
    })

    return NextResponse.json(grade, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
