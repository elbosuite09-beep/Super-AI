import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        },
        class: true
      }
    })
    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password, registration, classId } = body

    if (!email || !registration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    // Create user and student in a transaction
    const student = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'STUDENT',
        }
      })

      return await tx.student.create({
        data: {
          userId: user.id,
          registration,
          classId,
        }
      })
    })

    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
