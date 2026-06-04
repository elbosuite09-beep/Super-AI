import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: { select: { name: true } },
        teachingLogs: true
      }
    })

    const report = teachers.map(t => {
      const totalHours = t.teachingLogs.reduce((acc, log) => acc + log.hours, 0)
      const totalPay = totalHours * t.hourlyRate
      return {
        id: t.id,
        name: t.user.name,
        totalHours,
        hourlyRate: t.hourlyRate,
        totalPay
      }
    })

    return NextResponse.json(report)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { teacherId, date, hours, subjectId, classId } = body

    const log = await prisma.teachingLog.create({
      data: {
        teacherId,
        date: new Date(date),
        hours: parseFloat(hours),
        subjectId,
        classId
      }
    })

    return NextResponse.json(log, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
