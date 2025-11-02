import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Jeśli użytkownik wchodzi przez wersję Punycode, przekieruj na ładną domenę
  if (hostname.includes('xn--ranking-kredytw-8rb.pl')) {
    const url = request.nextUrl.clone()
    url.host = 'ranking-kredytów.pl'

    return NextResponse.redirect(url, 301) // Permanent redirect
  }

  return NextResponse.next()
}

// Middleware działa na wszystkich ścieżkach
export const config = {
  matcher: '/:path*',
}
