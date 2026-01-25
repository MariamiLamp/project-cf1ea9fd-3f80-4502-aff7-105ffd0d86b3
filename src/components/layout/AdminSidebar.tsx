import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Users,
  Building2,
  UserCheck,
  Megaphone,
  CheckCircle,
  Plus,
  LayoutTemplate,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  Settings,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/contexts/SidebarContext";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navGroups = [
  {
    items: [
      { icon: Users, label: "الباحثين عن عمل", value: "users" },
      { icon: Building2, label: "الشركات", value: "companies" },
      { icon: UserCheck, label: "موظفي HR", value: "hr" },
    ],
  },
  {
    title: "الإعلانات",
    icon: Megaphone,
    items: [
      { icon: CheckCircle, label: "الإعلانات النشطة", value: "active_ads" },
      { icon: Plus, label: "إضافة إعلان", value: "create_ad" },
      { icon: Megaphone, label: "طلبات الإعلانات", value: "ads" },
    ],
  },
  {
    title: "النظام",
    icon: Settings,
    items: [
      { icon: LayoutTemplate, label: "القوالب", value: "templates" },
      { icon: CreditCard, label: "خطط الاشتراك", value: "subscriptions" },
    ],
  },
];

export const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const { collapsed, toggle } = useSidebarState();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      الإعلانات: true,
      النظام: true,
    },
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-50 flex flex-col",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo & Brand */}
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-white leading-none">
              لوحة المدير
            </h1>
            <p className="text-[10px] text-sidebar-foreground/80 tracking-widest uppercase mt-0.5 font-medium">
              Admin Dashboard
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navGroups.map((group, idx) => {
          const isExpanded = group.title
            ? (expandedGroups[group.title] ?? true)
            : true;

          return (
            <div key={idx} className="space-y-2">
              {group.title && !collapsed && (
                <button
                  onClick={() => toggleGroup(group.title!)}
                  className="flex items-center justify-between w-full px-2 py-1 mb-2 hover:bg-sidebar-accent/50 rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {group.icon && (
                      <group.icon className="w-5 h-5 text-sidebar-foreground/70 group-hover:text-sidebar-foreground transition-colors" />
                    )}
                    <span className="font-medium text-sidebar-foreground/70 group-hover:text-sidebar-foreground transition-colors">
                      {group.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground" />
                  )}
                </button>
              )}

              <div
                className={cn(
                  "space-y-2 overflow-hidden transition-all duration-300 ease-in-out px-2",
                  group.title && !collapsed
                    ? isExpanded
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                    : "max-h-[500px] opacity-100 px-0",
                )}
              >
                {group.items.map((item) => {
                  const isActive = activeTab === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => onTabChange(item.value)}
                      className={cn(
                        "nav-item group w-full",
                        isActive && "active",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5 transition-colors shrink-0",
                          isActive
                            ? "text-sidebar-primary"
                            : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground",
                        )}
                      />
                      {!collapsed && (
                        <span className="animate-fade-in">{item.label}</span>
                      )}
                      {isActive && !collapsed && (
                        <div className="mr-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Link
          to="/auth"
          className={cn("nav-item w-full", collapsed && "justify-center px-2")}
        >
          <LogOut className="w-5 h-5 text-sidebar-foreground/70 shrink-0" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </Link>
      </div>

      {/* Collapse Button */}
      <button
        onClick={toggle}
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-primary hover:text-white transition-colors"
      >
        {collapsed ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
};
