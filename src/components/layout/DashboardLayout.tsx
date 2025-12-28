import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SidebarProvider, useSidebarState } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardContent = ({ children }: DashboardLayoutProps) => {
  const { collapsed } = useSidebarState();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar />
      <div className={cn(
        "transition-all duration-300 flex-1 flex flex-col",
        collapsed ? "mr-20" : "mr-64"
      )}>
        <Header />
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
};
