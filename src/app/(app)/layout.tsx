import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import getProfile from '@/http/get-profile';
import type { Metadata } from 'next';
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  const user = await getProfile()

  if (!user || Object.keys(user).length === 0) { 
    redirect('/auth/sign-in')
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar {...user} />
      <SidebarInset>
        <Header {...user} />
        {/* page main content */}
        {children}
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}
