import { useSession, signIn, signOut } from 'next-auth/react'
import { useUserStore } from '@/stores/user-store'
import { useEffect } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const { user, login, logout, isAuthenticated } = useUserStore()

  useEffect(() => {
    if (session?.user && !isAuthenticated) {
      login({
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        avatar: session.user.image || undefined,
      })
    } else if (!session && isAuthenticated) {
      logout()
    }
  }, [session, isAuthenticated, login, logout])

  const handleSignIn = async (provider?: string) => {
    try {
      await signIn(provider, { callbackUrl: '/' })
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      logout()
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return {
    user: session?.user || user,
    isAuthenticated: !!session || isAuthenticated,
    isLoading: status === 'loading',
    signIn: handleSignIn,
    signOut: handleSignOut,
  }
}