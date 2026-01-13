import { Bell, Search, User, ChevronDown, BookOpen } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const [notifications] = useState(3);

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
          <BookOpen className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-extrabold tracking-tight flex items-center">
            <span className="text-primary">Career</span>
            <span className="text-foreground/90 font-light ml-1">Book</span>
          </h1>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase">كتاب المهنة</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="ابحث عن وظائف، شركات، أو مهارات..."
            className="w-full h-10 pr-11 pl-4 rounded-lg bg-muted/50 border border-transparent focus:border-primary/30 focus:bg-card focus:outline-none transition-all text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">أحمد محمد</p>
            <p className="text-xs text-muted-foreground">باحث عن عمل</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
        </button>
      </div>
    </header>
  );
};
