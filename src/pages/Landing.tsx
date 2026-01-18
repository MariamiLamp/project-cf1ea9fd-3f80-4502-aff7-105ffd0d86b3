import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Briefcase, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  Star,
  ArrowLeft,
  Sparkles,
  Users,
  Award
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "فحص السيرة الذاتية بالذكاء الاصطناعي",
    description: "احصل على تحليل شامل لسيرتك الذاتية مع توصيات لتحسينها"
  },
  {
    icon: Briefcase,
    title: "وظائف مخصصة لك",
    description: "نجد لك الوظائف التي تناسب مهاراتك وخبراتك"
  },
  {
    icon: MessageSquare,
    title: "محاكاة المقابلات",
    description: "تدرب على المقابلات مع مدرب ذكاء اصطناعي متقدم"
  },
  {
    icon: TrendingUp,
    title: "مسار وظيفي واضح",
    description: "خطط لمستقبلك المهني مع توجيهات مخصصة"
  }
];

const stats = [
  { value: "١٠٠٠٠+", label: "مستخدم نشط" },
  { value: "٥٠٠٠+", label: "وظيفة متاحة" },
  { value: "٩٥٪", label: "نسبة الرضا" },
  { value: "٢٤/٧", label: "دعم متواصل" }
];

const testimonials = [
  {
    name: "سارة أحمد",
    role: "مهندسة برمجيات",
    content: "ساعدتني المنصة في تحسين سيرتي الذاتية والحصول على وظيفة أحلامي خلال أسبوعين فقط!",
    rating: 5
  },
  {
    name: "محمد خالد",
    role: "محلل بيانات",
    content: "أفضل منصة للبحث عن عمل. الذكاء الاصطناعي يوفر توصيات دقيقة جداً.",
    rating: 5
  },
  {
    name: "نورة العلي",
    role: "مديرة تسويق",
    content: "محاكاة المقابلات ساعدتني كثيراً في التحضير والثقة بالنفس.",
    rating: 5
  }
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden" dir="rtl">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s', animationDuration: '6s' }} />
        
        {/* Floating Shapes */}
        <div className="absolute top-40 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-pulse-soft" style={{ animationDuration: '3s' }} />
        <div className="absolute top-60 right-1/4 w-3 h-3 bg-accent/40 rounded-full animate-pulse-soft" style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
        <div className="absolute bottom-40 left-1/3 w-5 h-5 bg-secondary/30 rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-primary/50 rounded-full animate-pulse-soft" style={{ animationDuration: '2s' }} />
        <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-accent/30 rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">وظيفتي</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">تسجيل الدخول</Button>
            </Link>
            <Link to="/auth">
              <Button variant="gradient">ابدأ مجاناً</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              مدعوم بالذكاء الاصطناعي
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              ابنِ مسيرتك المهنية
              <span className="text-primary block mt-2">مع قوة الذكاء الاصطناعي</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              منصة متكاملة تساعدك في بناء سيرة ذاتية احترافية، التحضير للمقابلات، 
              والعثور على الوظيفة المثالية
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" variant="gradient" className="text-lg px-8">
                  ابدأ رحلتك الآن
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  تصفح الوظائف
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              كل ما تحتاجه في مكان واحد
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              أدوات متقدمة مدعومة بالذكاء الاصطناعي لمساعدتك في كل خطوة من رحلتك المهنية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              كيف تعمل المنصة؟
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "١", title: "سجّل حسابك", desc: "أنشئ حسابك مجاناً في دقائق" },
              { step: "٢", title: "ارفع سيرتك الذاتية", desc: "أو ابنِ واحدة جديدة مع أدواتنا" },
              { step: "٣", title: "احصل على وظيفتك", desc: "تقدم للوظائف المناسبة لك" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              ماذا يقول مستخدمونا
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            جاهز لبدء رحلتك المهنية؟
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            انضم لآلاف المستخدمين الذين وجدوا وظائفهم المثالية
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              ابدأ مجاناً الآن
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-sidebar text-sidebar-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">وظيفتي</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-sidebar-foreground/70">
              <Link to="/jobs" className="hover:text-white transition-colors">الوظائف</Link>
              <Link to="/subscription" className="hover:text-white transition-colors">الأسعار</Link>
              <Link to="/auth" className="hover:text-white transition-colors">تسجيل الدخول</Link>
            </div>
            <div className="text-sm text-sidebar-foreground/60">
              © ٢٠٢٥ وظيفتي. جميع الحقوق محفوظة
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
