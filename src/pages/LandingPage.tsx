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
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Footer } from "@/components/layout/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="h-16 border-b border-border/40 fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 transition-all duration-300">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block" dir="ltr">
              <h1 className="text-xl tracking-tight">
                <span className="text-primary font-light">Career</span>
                <span className="text-foreground/90 font-extrabold">Book</span>
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
                كارير بوك
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/jobs"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              الوظائف
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="font-medium">
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className="font-medium shadow-lg shadow-primary/20"
              >
                انضم إلينا
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-background -z-10" />
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              منصة التوظيف الأولى في المنطقة
            </div>
            <h1
              className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight leading-tight max-w-4xl mx-auto animate-fade-up opacity-0"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              اكتشف فرصتك الوظيفية القادمة
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                وابدأ مسيرتك المهنية
              </span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up opacity-0"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              نوصلك بأفضل الشركات في المنطقة. سواء كنت تبحث عن وظيفة أحلامك أو
              ترغب في توظيف أفضل المواهب، نحن هنا للمساعدة.
            </p>
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <Link to="/jobs">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base shadow-xl shadow-primary/20 transition-transform hover:scale-105"
                >
                  تصفح الوظائف
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              <Link to="/register/company">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm transition-transform hover:scale-105"
                  onClick={() => (window.location.href = "/register/company")}
                >
                  وظف المواهب
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background/50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">لماذا تختار منصتنا؟</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                نقدم لك مجموعة من الأدوات والمميزات التي تساعدك في رحلتك المهنية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "بناء سيرة ذاتية احترافية",
                  description:
                    "أنشئ سيرة ذاتية متميزة باستخدام قوالبنا الاحترافية وأدوات الذكاء الاصطناعي.",
                  icon: FileText,
                },
                {
                  title: "توصيات ذكية",
                  description:
                    "نستخدم خوارزميات متطورة لمطابقة مهاراتك مع الوظائف الأنسب لك.",
                  icon: CheckCircle,
                },
                {
                  title: "تواصل مباشر",
                  description:
                    "تواصل مباشرة مع مسؤولي التوظيف في كبرى الشركات.",
                  icon: Users,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-card p-8 rounded-xl border border-border/50 transition-all duration-300 hover:border-primary/50 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 -z-10" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
          <div className="container mx-auto px-6 text-center text-slate-900 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              جاهز لبدء رحلتك المهنية؟
            </h2>
            <p className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto font-medium">
              انضم إلى آلاف الباحثين عن عمل والشركات التي تثق بمنصتنا.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-10 text-lg shadow-2xl transition-transform hover:scale-105"
              onClick={() => navigate("/register")}
            >
              سجل الآن مجاناً
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
