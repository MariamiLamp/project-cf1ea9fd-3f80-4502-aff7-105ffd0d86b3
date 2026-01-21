import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Briefcase,
  FileText,
  Users,
  Building2,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  Shield,
  Award,
  Clock,
  Search,
  Filter,
  Bell,
  MessageCircle,
  Crown,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Footer } from "@/components/layout/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div
      className="min-h-screen bg-background flex flex-col relative isolate"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Animated Background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Base gradient layer (slightly stronger) */}
        <div className="absolute inset-0 bg-gradient-to-br from-sidebar/10 via-background to-primary/10" />

        {/* Huge floating orbs (bigger + higher contrast + slower) */}
        <div
          className="absolute -top-[35%] -left-[25%] w-[1200px] h-[1200px] rounded-full mix-blend-multiply blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--sidebar-background)) 0%, transparent 70%)",
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[5%] -right-[30%] w-[1100px] h-[1100px] rounded-full mix-blend-multiply blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            animation: "float-medium 25s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute -bottom-[45%] left-[10%] w-[1400px] h-[1400px] rounded-full mix-blend-multiply blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
            animation: "float-slow 30s ease-in-out infinite",
          }}
        />

        {/* Floating Career-related Shapes */}
        <div
          className="absolute top-[15%] left-[5%] text-primary/10 -z-10 animate-float"
          style={{ animationDuration: "15s" }}
        >
          <Briefcase size={240} strokeWidth={0.5} />
        </div>
        <div
          className="absolute top-[45%] right-[-5%] text-secondary/10 -z-10 animate-float"
          style={{ animationDuration: "18s", animationDirection: "reverse" }}
        >
          <FileText size={300} strokeWidth={0.5} />
        </div>
        <div
          className="absolute bottom-[10%] left-[15%] text-accent/10 -z-10 animate-float"
          style={{ animationDuration: "25s" }}
        >
          <TrendingUp size={350} strokeWidth={0.5} />
        </div>
        <div
          className="absolute top-[25%] right-[20%] text-primary/5 -z-10 animate-float"
          style={{ animationDuration: "20s" }}
        >
          <Search size={180} strokeWidth={0.5} />
        </div>
        <div
          className="absolute bottom-[30%] right-[10%] text-secondary/5 -z-10 animate-float"
          style={{ animationDuration: "22s", animationDirection: "reverse" }}
        >
          <Building2 size={220} strokeWidth={0.5} />
        </div>
        <div
          className="absolute top-[60%] left-[30%] text-accent/5 -z-10 animate-float"
          style={{ animationDuration: "30s" }}
        >
          <Target size={260} strokeWidth={0.5} />
        </div>
      </div>

      {/* Header */}
      <header className="h-20 border-b border-border/40 fixed top-0 w-full bg-background/60 backdrop-blur-2xl z-50 transition-all duration-500 shadow-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group hover:shadow-primary/30 transition-all duration-300">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
              <div className={`absolute -top-1 ${isRTL ? '-right-1' : '-left-1'} w-5 h-5 bg-primary rounded-full flex items-center justify-center`}>
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="hidden sm:block" dir="ltr">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-primary font-extralight">Career</span>
                <span className="text-foreground font-black">Book</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                {t('landing.tagline')}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: t('nav.jobs'), icon: Search, path: "/jobs" },
              { label: t('nav.contact'), icon: MessageCircle, path: "/contact" },
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
            <Link to="/auth">
              <Button
                variant="ghost"
                size="sm"
                className="font-medium group border border-transparent hover:border-border/50 transition-all duration-300"
              >
                <User className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'} opacity-60 group-hover:opacity-100`} />
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className="font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                <Target className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('nav.joinUs')}
              </Button>
            </Link>
          </div>
        </div>
      </header>


      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-40 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-down border border-primary/20 backdrop-blur-sm shadow-xl shadow-primary/5">
              <Zap className="w-4 h-4 animate-pulse" />
              <span>{t('landing.badge')}</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            </div>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tight leading-tight max-w-6xl mx-auto animate-fade-up opacity-0"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              {t('landing.heroTitle')}
              <br />
              <span className="relative inline-block">
                <span className="text-gradient">{t('landing.heroTitleHighlight')}</span>
                <div className={`absolute -bottom-4 ${isRTL ? 'right-0' : 'left-0'} w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-50`}></div>
              </span>
            </h1>
            <p
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up opacity-0 font-medium"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              {t('landing.heroSubtitle')}
            </p>
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <Link to="/jobs" className="group">
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg shadow-2xl shadow-primary/30 transition-all duration-300 hover:shadow-primary/40 group-hover:scale-105 bg-gradient-to-r from-primary to-primary/90 hover:to-primary shimmer"
                >
                  {t('landing.browseJobs')}
                  <ArrowIcon className={`w-5 h-5 ${isRTL ? 'mr-3 group-hover:-translate-x-1' : 'ml-3 group-hover:translate-x-1'} transition-transform`} />
                </Button>
              </Link>
              <Link to="/register/company" className="group">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-lg bg-background/50 backdrop-blur-md border-2 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-background/80"
                >
                  <Building2 className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  {t('landing.hireTalent')}
                </Button>
              </Link>
            </div>

            {/* Floating Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: t('landing.stats.hiringSpeed'), value: "2.5x", icon: Zap },
                { label: t('landing.stats.matchAccuracy'), value: "98%", icon: Target },
                { label: t('landing.stats.customerSatisfaction'), value: "4.9/5", icon: Award },
                { label: t('landing.stats.responseTime'), value: "24h", icon: Clock },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-background/40 backdrop-blur-md p-4 rounded-2xl border border-border/50 shadow-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <stat.icon className="w-3 h-3 text-primary" />
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t('landing.statsSection.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('landing.statsSection.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                title={t('landing.statsSection.activeJobs')}
                value="+2,500"
                icon={Briefcase}
                variant="primary"
                delay={100}
                className="bg-background/40 backdrop-blur-md border-border/50 shadow-none hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              />
              <StatCard
                title={t('landing.statsSection.cvs')}
                value="+15,000"
                icon={FileText}
                variant="success"
                delay={200}
                className="bg-background/40 backdrop-blur-md border-border/50 shadow-none hover:shadow-xl hover:shadow-success/5 transition-all duration-300"
              />
              <StatCard
                title={t('landing.statsSection.companies')}
                value="+500"
                icon={Building2}
                variant="info"
                delay={300}
                className="bg-background/40 backdrop-blur-md border-border/50 shadow-none hover:shadow-xl hover:shadow-info/5 transition-all duration-300"
              />
              <StatCard
                title={t('landing.statsSection.hired')}
                value="+1,200"
                icon={Users}
                variant="warning"
                delay={400}
                className="bg-background/40 backdrop-blur-md border-border/50 shadow-none hover:shadow-xl hover:shadow-warning/5 transition-all duration-300"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                {t('landing.features.badge')}
              </div>
              <h2 className="text-4xl font-bold mb-6">{t('landing.features.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t('landing.features.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t('landing.features.smartCV.title'),
                  description: t('landing.features.smartCV.description'),
                  icon: FileText,
                  features: [
                    t('landing.features.smartCV.feature1'),
                    t('landing.features.smartCV.feature2'),
                    t('landing.features.smartCV.feature3'),
                  ],
                },
                {
                  title: t('landing.features.smartMatch.title'),
                  description: t('landing.features.smartMatch.description'),
                  icon: Target,
                  features: [
                    t('landing.features.smartMatch.feature1'),
                    t('landing.features.smartMatch.feature2'),
                    t('landing.features.smartMatch.feature3'),
                  ],
                },
                {
                  title: t('landing.features.directConnect.title'),
                  description: t('landing.features.directConnect.description'),
                  icon: Users,
                  features: [
                    t('landing.features.directConnect.feature1'),
                    t('landing.features.directConnect.feature2'),
                    t('landing.features.directConnect.feature3'),
                  ],
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 transition-all duration-500 hover:border-primary/50 group opacity-0 animate-fade-up hover-lift glow-hover"
                  style={{
                    animationDelay: `${(index + 1) * 150}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/10">
                      <feature.icon className="w-8 h-8 animate-float" />
                    </div>
                    <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center`}>
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className="space-y-3">
                    {feature.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Plans Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Crown className="w-4 h-4" />
                {t('landing.plans.badge')}
              </div>
              <h2 className="text-4xl font-bold mb-6">{t('landing.plans.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t('landing.plans.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  id: "basic",
                  name: t('landing.plans.basic.name'),
                  description: t('landing.plans.basic.description'),
                  price: t('landing.plans.free'),
                  period: t('landing.plans.lifetime'),
                  icon: Zap,
                  isFree: true,
                  features: [
                    t('landing.plans.basic.feature1'),
                    t('landing.plans.basic.feature2'),
                    t('landing.plans.basic.feature3'),
                  ],
                },
                {
                  id: "pro",
                  name: t('landing.plans.pro.name'),
                  description: t('landing.plans.pro.description'),
                  price: t('landing.plans.pro.price'),
                  period: t('landing.plans.monthly'),
                  icon: Crown,
                  popular: true,
                  features: [
                    t('landing.plans.pro.feature1'),
                    t('landing.plans.pro.feature2'),
                    t('landing.plans.pro.feature3'),
                    t('landing.plans.pro.feature4'),
                  ],
                },
                {
                  id: "enterprise",
                  name: t('landing.plans.enterprise.name'),
                  description: t('landing.plans.enterprise.description'),
                  price: t('landing.plans.enterprise.price'),
                  period: t('landing.plans.monthly'),
                  icon: Building2,
                  features: [
                    t('landing.plans.enterprise.feature1'),
                    t('landing.plans.enterprise.feature2'),
                    t('landing.plans.enterprise.feature3'),
                    t('landing.plans.enterprise.feature4'),
                  ],
                },
              ].map((plan, index) => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-3xl border transition-all duration-500 opacity-0 animate-fade-up hover-lift ${
                    plan.popular
                      ? "bg-primary/5 border-primary shadow-2xl shadow-primary/10 scale-105 z-10 glow-hover"
                      : "bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30"
                  }`}
                  style={{
                    animationDelay: `${(index + 1) * 200}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg shimmer">
                      {t('landing.plans.mostPopular')}
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <plan.icon className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                  </div>
                  <div className="mb-8">
                    <span className="text-4xl font-black text-foreground">
                      {plan.price}
                    </span>
                    <span className={`text-muted-foreground text-sm ${isRTL ? 'mr-2' : 'ml-2'}`}>
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-sm group/item"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/subscription">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className={`w-full h-12 font-bold ${plan.popular ? "shimmer" : ""}`}
                    >
                      {plan.isFree ? t('landing.plans.startNow') : t('landing.plans.subscribeNow')}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center text-foreground relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/5 border border-secondary/10 mb-8 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="font-medium text-secondary">
                {t('landing.cta.badge')}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight text-foreground">
              {t('landing.cta.title')}{" "}
              <span className="text-primary relative inline-block">
                {t('landing.cta.titleHighlight')}
                <svg
                  className={`absolute w-full h-3 -bottom-1 ${isRTL ? 'right-0' : 'left-0'} text-primary/20`}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
              {isRTL ? '؟' : '?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
              {t('landing.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="h-16 px-12 text-xl shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/30 bg-gradient-to-r from-primary to-primary/90 shimmer"
                onClick={() => navigate("/register")}
              >
                <Target className={`w-6 h-6 ${isRTL ? 'ml-3' : 'mr-3'} animate-float`} />
                {t('landing.cta.registerFree')}
              </Button>
              <Link to="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-10 text-xl border-2 border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground text-foreground"
                >
                  <Search className={`w-6 h-6 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  {t('landing.cta.exploreJobs')}
                </Button>
              </Link>
            </div>
            <p className="text-muted-foreground/80 mt-8 text-sm">
              {t('landing.cta.noFees')}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Adding missing User icon component
const User = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export default LandingPage;
