import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const license = await prisma.license.findFirst({
      where: {
        activated: true,
        expiresAt: {
          gt: new Date()
        }
      }
    })
    return NextResponse.json({ valid: !!license })
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { key } = await request.json()

    const license = await prisma.license.findUnique({
      where: { key }
    })

    if (!license) {
      return NextResponse.json({ error: 'Clé invalide' }, { status: 404 })
    }

    if (license.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Clé expirée' }, { status: 400 })
    }

    const updatedLicense = await prisma.license.update({
      where: { key },
      data: {
        activated: true,
        activatedAt: new Date()
      }
    })

    return NextResponse.json({ success: true, license: updatedLicense })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
