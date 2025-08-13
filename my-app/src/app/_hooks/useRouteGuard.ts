import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useRouteGuard = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { session } = useSupabaseSession()

  useEffect(() => {
    if (session === undefined) return // sessionがundefinedの場合は読み込み中なので何もしない

    // 保護ページ
    const isAdminPath = pathname.startsWith('/admin')
    const isUserPath = pathname.startsWith('/user')

    // 例外ページ
    const isAuthFreeAdminPath =
      pathname === '/admin/login' || pathname === '/admin/signup'
    const isAuthFreeUserPath =
      pathname === '/user/login' || pathname === '/user/signup'

    if (session === null) {
      if (isAdminPath && !isAuthFreeAdminPath) {
        router.replace('/admin/login')
        return
      }
      if (isUserPath && !isAuthFreeUserPath) {
        router.replace('/user/login')
        return
      }
    }
  }, [router, session, pathname])
}