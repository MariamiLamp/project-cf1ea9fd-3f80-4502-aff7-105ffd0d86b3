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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  Crown,
  ShoppingBag,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/contexts/SidebarContext";

const navItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", path: "/dashboard" },
  { icon: User, label: "الملف الشخصي", path: "/candidate/1" },
  { icon: FileText, label: "فحص السيرة الذاتية", path: "/cv-check" },
  { icon: Sparkles, label: "خطاب التقديم", path: "/cover-letter" },
  { icon: Briefcase, label: "فرص العمل", path: "/jobs" },
  { icon: ShoppingBag, label: "سوق القوالب", path: "/templates" },
  { icon: CalendarDays, label: "مخطط المنشورات", path: "/posts-planner" },
  { icon: TrendingUp, label: "المسار المهني", path: "/career-path" },
  { icon: MessageSquare, label: "أسئلة المقابلات", path: "/interview" },
  { icon: FileEdit, label: "منشئ السيرة الذاتية", path: "/cv-builder" },
  { icon: Crown, label: "الاشتراكات", path: "/subscription" },
];

const bottomNavItems = [
  { icon: Settings, label: "الإعدادات", path: "/settings" },
];

export const Sidebar = () => {
  const { collapsed, toggle } = useSidebarState();
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg text-white">الموارد البشرية</h1>
              <p className="text-xs text-sidebar-foreground/60">
                منصة التوظيف الذكية
              </p>
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
                isActive && "active",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors shrink-0",
                  isActive
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                )}
              />
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

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {bottomNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn("nav-item", collapsed && "justify-center px-2")}
          >
            <item.icon className="w-5 h-5 text-sidebar-foreground/70 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
        <Link
          to="/auth"
          className={cn("nav-item w-full", collapsed && "justify-center px-2")}
        >
          <LogOut className="w-5 h-5 text-sidebar-foreground/70 shrink-0" />
          {!collapsed && <span>تسجيل الدخول</span>}
        </Link>
      </div>

      {/* Collapse Button */}
      <button
        onClick={toggle}
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
