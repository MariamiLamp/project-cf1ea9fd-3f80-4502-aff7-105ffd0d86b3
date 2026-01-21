import React from "react";
import { Briefcase, FileText, Megaphone, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileTabsMenuProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const MobileTabsMenu: React.FC<MobileTabsMenuProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "jobs", label: "الوظائف", icon: Briefcase },
    { id: "applications", label: "الطلبات", icon: FileText },
    { id: "ads", label: "الإعلانات", icon: Megaphone },
    { id: "promotion", label: "الترويج", icon: TrendingUp },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent">
      <div className="flex items-center justify-around bg-card/80 backdrop-blur-lg border border-border shadow-2xl rounded-2xl p-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-1 px-2 rounded-xl transition-all duration-300",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <Icon
                className={cn("w-5 h-5", isActive ? "animate-pulse" : "")}
              />
              <span className="text-[10px] font-medium truncate">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTabsMenu;
