import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const classId = searchParams.get('classId')
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

  try {
    const attendances = await prisma.attendance.findMany({
      where: {
        student: {
          classId: classId || undefined
        },
        date: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + 86400000)
        }
      },
      include: {
        student: {
          include: {
            user: {
              select: { name: true }
            }
          }
        }
      }
    })
    return NextResponse.json(attendances)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studentId, date, status } = body

    if (!studentId || !date || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const attendance = await prisma.attendance.create({
      data: {
        studentId,
        date: new Date(date),
        status,
      },
    })

    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
