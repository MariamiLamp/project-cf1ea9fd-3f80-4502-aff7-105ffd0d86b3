import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LucideIcon, BookOpen, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  links: { label: string; href: string; icon: LucideIcon }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ links }) => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-[70] hover:bg-primary/10 transition-colors w-10 h-10 rounded-xl"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </Button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-all duration-500 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Menu Content */}
      <div
        className={`fixed top-0 bottom-0 ${
          isRTL ? "right-0" : "left-0"
        } h-screen w-[300px] sm:w-[350px] bg-background z-[65] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border-l border-border/10 ${
          open
            ? "translate-x-0"
            : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-20 bg-background">
          {/* Exact Logo from Header */}
          <div
            className={`flex items-center gap-4 mb-10 transition-all duration-700 delay-100 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
              <div
                className={`absolute -top-1 ${isRTL ? "-right-1" : "-left-1"} w-5 h-5 bg-primary rounded-full flex items-center justify-center`}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div dir="ltr">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-primary font-extralight">Career</span>
                <span className="text-foreground font-black">Book</span>
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">
                {t("landing.tagline")}
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-4">
            {links.map((link, index) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 transform ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  } ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary active:scale-95"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <Icon
                    className={`w-6 h-6 ${isActive ? "animate-pulse" : ""}`}
                  />
                  <span className="font-bold text-xl">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div
            className={`mt-auto pb-10 pt-8 border-t border-border/20 transition-all duration-700 delay-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link to="/auth" className="block">
              <Button className="w-full h-16 rounded-2xl text-xl font-black shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-95">
                {t("nav.login")}
              </Button>
            </Link>
            <div className="mt-8 flex flex-col items-center gap-2 opacity-40">
              <p className="text-xs font-medium text-muted-foreground italic text-center">
                Built for the next generation of talent
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                © 2026 CareerBook
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
