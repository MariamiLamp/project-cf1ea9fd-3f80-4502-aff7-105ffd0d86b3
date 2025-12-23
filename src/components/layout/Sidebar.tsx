import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  TrendingUp,
  MessageSquare,
  FileEdit,
  Settings,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", path: "/" },
  { icon: FileText, label: "فحص السيرة الذاتية", path: "/cv-check" },
  { icon: Sparkles, label: "خطاب التقديم", path: "/cover-letter" },
  { icon: Briefcase, label: "فرص العمل", path: "/jobs" },
  { icon: TrendingUp, label: "المسار المهني", path: "/career-path" },
  { icon: MessageSquare, label: "أسئلة المقابلات", path: "/interview" },
  { icon: FileEdit, label: "منشئ السيرة الذاتية", path: "/cv-builder" },
];

const bottomNavItems = [
  { icon: Settings, label: "الإعدادات", path: "/settings" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-50 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg text-white">الموارد البشرية</h1>
              <p className="text-xs text-sidebar-foreground/60">منصة التوظيف الذكية</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-item group",
                isActive && "active"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
              )} />
              {!collapsed && (
                <span className="animate-fade-in">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="mr-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Subscription Badge */}
      {!collapsed && (
        <div className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-sidebar-primary/20 to-accent/20 border border-sidebar-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-sidebar-primary" />
            <span className="text-sm font-medium text-white">الباقة المميزة</span>
          </div>
          <p className="text-xs text-sidebar-foreground/70 mb-3">
            استمتع بجميع المميزات
          </p>
          <button className="w-full py-2 px-3 rounded-lg bg-sidebar-primary text-white text-sm font-medium hover:bg-sidebar-primary/90 transition-colors">
            ترقية الاشتراك
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {bottomNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="nav-item"
          >
            <item.icon className="w-5 h-5 text-sidebar-foreground/70" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
        <button className="nav-item w-full text-right">
          <LogOut className="w-5 h-5 text-sidebar-foreground/70" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-primary hover:text-white transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
};
