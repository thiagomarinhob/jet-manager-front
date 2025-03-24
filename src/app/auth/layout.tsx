import { redirect } from 'next/navigation'

import { getAuthenticatedProfile } from '@/auth/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if ((await getAuthenticatedProfile()).authenticated) {
    redirect('/overview')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-foreground h-screen px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}