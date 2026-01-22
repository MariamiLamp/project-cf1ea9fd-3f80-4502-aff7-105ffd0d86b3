import { ReactNode } from "react";
import { CompanySidebar } from "./CompanySidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SidebarProvider, useSidebarState } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface CompanyDashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CompanyDashboardContent = ({ children, activeTab, onTabChange }: CompanyDashboardLayoutProps) => {
  const { collapsed } = useSidebarState();

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <CompanySidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div
        className={cn(
          "transition-all duration-300 flex-1 flex flex-col",
          collapsed ? "mr-20" : "mr-64"
        )}
      >
        <Header />
        <main className="p-6 flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export const CompanyDashboardLayout = ({ children, activeTab, onTabChange }: CompanyDashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <CompanyDashboardContent activeTab={activeTab} onTabChange={onTabChange}>
        {children}
      </CompanyDashboardContent>
    </SidebarProvider>
  );
};
