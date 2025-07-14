'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { LogIn, User } from 'lucide-react'

interface LoginButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function LoginButton({ variant = 'default', size = 'default', className }: LoginButtonProps) {
  const { signIn, isLoading } = useAuth()

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => signIn()}
      disabled={isLoading}
    >
      <User className="h-4 w-4 mr-2" />
      {isLoading ? 'Loading...' : 'Sign In'}
    </Button>
  )
}