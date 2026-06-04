import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const classId = searchParams.get('classId')

  try {
    const timetable = await prisma.timetable.findMany({
      where: {
        classId: classId || undefined
      },
      include: {
        subject: true,
        teacher: {
          include: {
            user: { select: { name: true } }
          }
        }
      }
    })
    return NextResponse.json(timetable)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { classId, subjectId, teacherId, dayOfWeek, startTime, endTime } = body

    const entry = await prisma.timetable.create({
      data: {
        classId,
        subjectId,
        teacherId,
        dayOfWeek: parseInt(dayOfWeek),
        startTime,
        endTime,
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
