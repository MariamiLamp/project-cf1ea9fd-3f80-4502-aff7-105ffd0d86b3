import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar />
      <div className="mr-64 transition-all duration-300 flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
