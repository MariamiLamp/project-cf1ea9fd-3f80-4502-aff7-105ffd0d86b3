import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SidebarProvider, useSidebarState } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface AdminDashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminDashboardContent = ({
  children,
  activeTab,
  onTabChange,
}: AdminDashboardLayoutProps) => {
  const { collapsed } = useSidebarState();

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div
        className={cn(
          "transition-all duration-300 flex-1 flex flex-col",
          collapsed ? "mr-20" : "mr-64",
        )}
      >
        <Header />
        <main className="p-6 flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export const AdminDashboardLayout = ({
  children,
  activeTab,
  onTabChange,
}: AdminDashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AdminDashboardContent activeTab={activeTab} onTabChange={onTabChange}>
        {children}
      </AdminDashboardContent>
    </SidebarProvider>
  );
};
