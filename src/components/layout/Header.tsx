import { Bell, Search, User, ChevronDown, BookOpen, Sparkles } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const [notifications] = useState(3);

  return (
    <header className="h-18 bg-gradient-to-l from-card via-card to-primary/5 border-b border-border px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm">
      {/* Logo & Brand */}
      <div className="flex items-center gap-4 group cursor-pointer">
        {/* Animated Logo Container */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          {/* Main Logo */}
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
            {/* Sparkle accent */}
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
        </div>
        
        {/* Brand Text */}
        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight">
              <span className="bg-gradient-to-l from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                Career
              </span>
              <span className="text-foreground mr-1">Book</span>
            </h1>
          </div>
          <p className="text-xs text-muted-foreground font-medium -mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            اكتشف مستقبلك المهني
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="ابحث عن وظائف، شركات، أو مهارات..."
            className="relative w-full h-11 pr-12 pl-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm placeholder:text-muted-foreground"
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
