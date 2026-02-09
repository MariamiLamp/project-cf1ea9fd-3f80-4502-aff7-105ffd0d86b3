import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  Sparkles,
  Search,
  MessageCircle,
  Crown,
  FileText,
  User,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";
import { Footer } from "./Footer";

interface GuestLayoutProps {
  children: ReactNode;
}

export const GuestLayout = ({ children }: GuestLayoutProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="h-20 border-b border-border/40 fixed top-0 w-full bg-background/60 backdrop-blur-2xl z-50 transition-all duration-500 shadow-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
              <div
                className={`absolute -top-1 ${isRTL ? "-right-1" : "-left-1"} w-5 h-5 bg-primary rounded-full flex items-center justify-center`}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="hidden sm:block" dir="ltr">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-primary font-extralight">Career</span>
                <span className="text-foreground font-black">Book</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                {t("landing.tagline")}
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: t("nav.contact"), icon: MessageCircle, path: "/contact" },
              { label: t("nav.jobs"), icon: Search, path: "/jobs" },
              { label: t("nav.blog"), icon: Crown, path: "/blog" },
              { label: t("nav.templates"), icon: FileText, path: "/templates" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <item.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="hidden md:block">
              <Link to="/auth">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium group border border-transparent hover:border-border/50 transition-all duration-300"
                >
                  <User
                    className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"} opacity-60 group-hover:opacity-100`}
                  />
                  {t("nav.login")}
                </Button>
              </Link>
            </div>
            <MobileMenu
              links={[
                { label: t("nav.jobs"), href: "/jobs", icon: Search },
                { label: t("nav.contact"), href: "/contact", icon: MessageCircle },
                { label: t("nav.templates"), href: "/templates", icon: FileText },
                { label: t("nav.blog"), href: "/blog", icon: Crown },
              ]}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
