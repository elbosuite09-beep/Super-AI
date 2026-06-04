import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ne pas bloquer la page de licence ou les ressources statiques
  if (
    pathname.startsWith('/license') ||
    pathname.startsWith('/api/license') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  try {
    // Appel à l'API interne pour vérifier la licence
    // Note: Dans un vrai middleware Edge, on devrait utiliser une vérification plus directe (ex: Redis ou Cookie chiffré)
    // Ici on simule une vérification via le serveur
    const response = await fetch(`${request.nextUrl.origin}/api/license`)
    const { valid } = await response.json()

    if (!valid) {
      return NextResponse.redirect(new URL('/license', request.url))
    }
  } catch (error) {
    // En cas d'erreur, on redirige par sécurité
    return NextResponse.redirect(new URL('/license', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/license|_next/static|_next/image|favicon.ico).*)'],
}
