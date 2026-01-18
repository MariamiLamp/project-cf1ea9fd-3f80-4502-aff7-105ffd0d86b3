import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  FileText,
  Users,
  Building2,
  CheckCircle,
  ArrowLeft,
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

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      <div
        className="fixed inset-0 pointer-events-none -z-50 overflow-hidden"
        aria-hidden="true"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        {/* Moving gradient orbs (more visible movement) */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[700px] mix-blend-screen opacity-70">
          <div className="w-full h-full bg-primary/12 blur-[140px] rounded-full animate-[orb-drift-1_18s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-1/3 -left-24 w-[520px] h-[520px] mix-blend-screen opacity-60">
          <div className="w-full h-full bg-secondary/10 blur-[130px] rounded-full animate-[orb-drift-2_16s_ease-in-out_infinite]" />
        </div>
        <div className="absolute bottom-0 -right-24 w-[560px] h-[560px] mix-blend-screen opacity-55">
          <div className="w-full h-full bg-accent/10 blur-[140px] rounded-full animate-[orb-drift-3_17s_ease-in-out_infinite]" />
        </div>

        {/* Subtle particles */}
        <div className="absolute top-28 right-24 w-2 h-2 rounded-full bg-primary/30 animate-pulse-soft" />
        <div
          className="absolute top-52 left-40 w-3 h-3 rounded-full bg-accent/25 animate-pulse-soft"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 right-1/3 w-2.5 h-2.5 rounded-full bg-secondary/25 animate-pulse-soft"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Header */}
      <header className="h-20 border-b border-border/40 fixed top-0 w-full bg-background/60 backdrop-blur-2xl z-50 transition-all duration-500 shadow-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group hover:shadow-primary/30 transition-all duration-300">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="hidden sm:block" dir="ltr">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-primary font-extralight">Career</span>
                <span className="text-foreground font-black">Book</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
                • منصة التوظيف الذكية •
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: "الوظائف", icon: Search, path: "/jobs" },
              { label: "تواصل معنا", icon: MessageCircle, path: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <item.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button
                variant="ghost"
                size="sm"
                className="font-medium group border border-transparent hover:border-border/50 transition-all duration-300"
              >
                <User className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100" />
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className="font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                <Target className="w-4 h-4 ml-2" />
                انضم إلينا
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-primary/5 to-background -z-10">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-down border border-primary/20 backdrop-blur-sm shadow-xl shadow-primary/5">
              <Zap className="w-4 h-4 animate-pulse" />
              <span>منصة التوظيف الأولى في المنطقة</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            </div>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tight leading-tight max-w-6xl mx-auto animate-fade-up opacity-0"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              اكتشف فرصتك
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  الوظيفية القادمة
                </span>
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-50"></div>
              </span>
            </h1>
            <p
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up opacity-0 font-medium"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              نوصلك بأفضل الشركات في المنطقة باستخدام الذكاء الاصطناعي المتقدم.
              سواء كنت تبحث عن وظيفة أحلامك أو ترغب في توظيف أفضل المواهب، نحن
              هنا للمساعدة.
            </p>
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <Link to="/jobs" className="group">
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg shadow-2xl shadow-primary/30 transition-all duration-300 hover:shadow-primary/40 group-hover:scale-105 bg-gradient-to-r from-primary to-primary/90 hover:to-primary"
                >
                  تصفح الوظائف الآن
                  <ArrowLeft className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register/company" className="group">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 text-lg bg-background/50 backdrop-blur-md border-2 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-background/80"
                >
                  <Building2 className="w-5 h-5 ml-3" />
                  وظف المواهب
                </Button>
              </Link>
            </div>

            {/* Floating Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: "سرعة التوظيف", value: "2.5x", icon: Zap },
                { label: "دقة المطابقة", value: "98%", icon: Target },
                { label: "رضا العملاء", value: "4.9/5", icon: Award },
                { label: "وقت الاستجابة", value: "24h", icon: Clock },
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
              <h2 className="text-4xl font-bold mb-4">أرقام تتحدث عن نفسها</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                انضم إلى مجتمع يضم آلاف المحترفين والشركات الرائدة
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                title="الوظائف النشطة"
                value="+2,500"
                icon={Briefcase}
                variant="primary"
                delay={100}
              />
              <StatCard
                title="السير الذاتية"
                value="+15,000"
                icon={FileText}
                variant="success"
                delay={200}
              />
              <StatCard
                title="الشركات المسجلة"
                value="+500"
                icon={Building2}
                variant="info"
                delay={300}
              />
              <StatCard
                title="تم توظيفهم"
                value="+1,200"
                icon={Users}
                variant="warning"
                delay={400}
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
                مميزاتنا الفريدة
              </div>
              <h2 className="text-4xl font-bold mb-6">لماذا تختار منصتنا؟</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                نقدم لك مجموعة من الأدوات والمميزات التي تساعدك في رحلتك المهنية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "بناء سيرة ذاتية ذكية",
                  description:
                    "أنشئ سيرة ذاتية متميزة باستخدام قوالبنا الاحترافية وأدوات الذكاء الاصطناعي المتقدمة.",
                  icon: FileText,
                  features: ["تحليل ذكي", "تصميم احترافي", "تحديث آلي"],
                },
                {
                  title: "توصيات ذكية دقيقة",
                  description:
                    "خوارزميات متطورة لمطابقة مهاراتك مع الوظائف الأنسب لك بدقة تصل إلى 98%.",
                  icon: Target,
                  features: ["مطابقة دقيقة", "تحديث لحظي", "توصيات مخصصة"],
                },
                {
                  title: "تواصل مباشر وسريع",
                  description:
                    "تواصل مباشرة مع مسؤولي التوظيف في كبرى الشركات بدون وسطاء.",
                  icon: Users,
                  features: ["مراسلة فورية", "مقابلات افتراضية", "متابعة آلية"],
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 group hover:scale-[1.02]"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/10">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
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
                        <CheckCircle className="w-4 h-4 text-primary" />
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
                خطط الاشتراك
              </div>
              <h2 className="text-4xl font-bold mb-6">استثمر في مستقبلك</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                اختر الباقة المناسبة لاحتياجاتك وابدأ رحلتك المهنية اليوم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  id: "basic",
                  name: "الأساسية",
                  description: "للباحثين عن عمل المبتدئين",
                  price: "مجاناً",
                  period: "مدى الحياة",
                  icon: Zap,
                  features: [
                    "فحص السيرة الذاتية شهرياً",
                    "تصفح الوظائف المتاحة",
                    "٣ طلبات توظيف شهرياً",
                  ],
                },
                {
                  id: "pro",
                  name: "الاحترافية",
                  description: "للباحثين الجادين",
                  price: "49 ر.س",
                  period: "شهرياً",
                  icon: Crown,
                  popular: true,
                  features: [
                    "فحص سيرة ذاتية غير محدود",
                    "مولد خطابات التقديم AI",
                    "طلبات توظيف غير محدودة",
                    "دعم فني أولوي",
                  ],
                },
                {
                  id: "enterprise",
                  name: "الشركات",
                  description: "لفـرق الموارد البشرية",
                  price: "199 ر.س",
                  period: "شهرياً",
                  icon: Building2,
                  features: [
                    "لوحة تحكم كاملة",
                    "إدارة المرشحين المتقدمة",
                    "تحليلات وتقارير مفصلة",
                    "دعم فني مخصص ٢٤/٧",
                  ],
                },
              ].map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary/5 border-primary shadow-2xl shadow-primary/10 scale-105 z-10"
                      : "bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-xl"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      الأكثر شيوعاً
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <plan.icon className="w-6 h-6 text-primary" />
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
                    <span className="text-muted-foreground text-sm mr-2">
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/subscription">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full h-12 font-bold"
                    >
                      {plan.price === "مجاناً" ? "ابدأ الآن" : "اشترك الآن"}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-background -z-10">
            {/* <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-multiply"></div> */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6 text-center text-foreground relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/5 border border-secondary/10 mb-8 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="font-medium text-secondary">
                منصة آمنة وموثوقة
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight text-foreground">
              جاهز لبدء{" "}
              <span className="text-primary relative inline-block">
                رحلتك المهنية
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-primary/20"
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
              ؟
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
              انضم إلى آلاف الباحثين عن عمل والشركات التي تثق بمنصتنا. ابدأ
              رحلتك نحو النجاح المهني اليوم.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="h-16 px-12 text-xl shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/30 bg-gradient-to-r from-primary to-primary/90"
                onClick={() => navigate("/register")}
              >
                <Target className="w-6 h-6 ml-3" />
                سجل الآن مجاناً
              </Button>
              <Link to="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-10 text-xl border-2 border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground text-foreground"
                >
                  <Search className="w-6 h-6 ml-3" />
                  استكشف الوظائف
                </Button>
              </Link>
            </div>
            <p className="text-muted-foreground/80 mt-8 text-sm">
              بدون رسوم • بدون التزام • تجربة مجانية كاملة
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
