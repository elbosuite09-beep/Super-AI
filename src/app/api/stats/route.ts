import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [studentCount, teacherCount, classCount, totalRevenue, totalExpenses] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.class.count(),
      prisma.feePayment.aggregate({ _sum: { amount: true } }),
      prisma.teachingLog.findMany({ include: { teacher: true } })
    ])

    const totalRevenueAmount = totalRevenue._sum.amount || 0
    const totalExpensesAmount = totalExpenses.reduce((acc, curr) => acc + (curr.hours * curr.teacher.hourlyRate), 0)

    const revenueByCycle = await prisma.feePayment.findMany({
      include: {
        student: {
          include: { class: true }
        }
      }
    })

    const cycleStats = revenueByCycle.reduce((acc: Record<string, number>, curr) => {
      const cycle = curr.student.class?.cycle || 'UNKNOWN'
      acc[cycle] = (acc[cycle] || 0) + curr.amount
      return acc
    }, {})

    return NextResponse.json({
      studentCount,
      teacherCount,
      classCount,
      totalRevenue: totalRevenueAmount,
      totalExpenses: totalExpensesAmount,
      netProfit: totalRevenueAmount - totalExpensesAmount,
      cycleStats
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
