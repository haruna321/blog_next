import { NextRequest, NextResponse } from 'next/server'

const AUTH_FREE_PATHS = ['/admin/login', '/admin/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin 以外は通す
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // 例外ルートは通す
  if (AUTH_FREE_PATHS.includes(pathname)) return NextResponse.next()

  // Cookie で判定（ログイン時に設定）
  const token = request.cookies.get('sb-access-token')?.value
  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('redirect_to', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// /admin配下だけ対象
export const config = {
  matcher: ['/admin/:path*'],
}