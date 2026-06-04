import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const payments = await prisma.feePayment.findMany({
      include: {
        student: {
          include: {
            user: { select: { name: true } }
          }
        }
      }
    })
    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studentId, amount, status, comment } = body

    const payment = await prisma.feePayment.create({
      data: {
        studentId,
        amount: parseFloat(amount),
        status,
        comment,
      },
    })

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
