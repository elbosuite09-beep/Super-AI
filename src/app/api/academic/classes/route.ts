import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        teacher: {
          include: {
            user: {
              select: { name: true }
            }
          }
        },
        _count: {
          select: { students: true }
        }
      }
    })
    return NextResponse.json(classes)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, cycle, teacherId } = body

    if (!name || !cycle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        cycle,
        teacherId,
      },
    })

    return NextResponse.json(newClass, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
