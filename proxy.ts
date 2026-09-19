import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith('/dashboard');
  const isPublic = pathname.startsWith('/login') || pathname.startsWith('/signup');
  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(isPublic && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}