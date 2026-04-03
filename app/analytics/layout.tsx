import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <MobileNav />
      <main className="pt-16 lg:pl-64 lg:pt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
