import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const documents = await prisma.adminDocument.findMany()
    return NextResponse.json(documents)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, url, category } = body

    const doc = await prisma.adminDocument.create({
      data: { title, url, category }
    })

    return NextResponse.json(doc, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
