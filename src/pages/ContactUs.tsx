import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  User,
  Target,
  Clock,
  ArrowLeft,
  Building2,
  Headphones,
} from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="h-20 border-b border-border/40 fixed top-0 w-full bg-background/95 backdrop-blur-xl z-50 transition-all duration-500 shadow-sm">
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
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
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              الرئيسية
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="font-medium">
                <User className="w-4 h-4 ml-2" />
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className="font-medium shadow-lg shadow-primary/20"
              >
                <Target className="w-4 h-4 ml-2" />
                انضم إلينا
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-primary/5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10"></div>
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-down">
              <MessageSquare className="w-4 h-4" />
              <span>نحن هنا للمساعدة</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight animate-fade-up">
              تواصل مع فريق <span className="text-primary">الدعم</span>
            </h1>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              لدينا فريق متخصص جاهز للإجابة على جميع استفساراتك ومساعدتك في
              تحقيق أهدافك المهنية.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <div
                className="space-y-8 animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4">معلومات التواصل</h2>
                  <p className="text-muted-foreground text-lg">
                    يمكنك التواصل معنا عبر القنوات التالية أو زيارة مكتبنا.
                  </p>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      icon: Phone,
                      label: "اتصل بنا",
                      value: "+966 12 345 6789",
                      desc: "متاح من 9 صباحاً - 5 مساءً",
                    },
                    {
                      icon: Mail,
                      label: "البريد الإلكتروني",
                      value: "support@careerbook.com",
                      desc: "نرد خلال 24 ساعة",
                    },
                    {
                      icon: MapPin,
                      label: "الموقع",
                      value: "Cairo, Egypt",
                      desc: " Egypt",
                    },
                    {
                      icon: Headphones,
                      label: "الدعم الفني",
                      value: "مركز المساعدة",
                      desc: "دعم فوري ومباشر",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">{item.label}</h3>
                        <p
                          className="text-foreground font-medium mb-1"
                          dir="ltr"
                        >
                          {item.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div
                className="relative animate-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-10"></div>
                <div className="relative bg-card p-8 rounded-3xl border border-border shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Send className="w-6 h-6 text-primary" />
                    أرسل لنا رسالة
                  </h3>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          الاسم الأول
                        </label>
                        <Input
                          placeholder="أدخل اسمك الأول"
                          className="h-12 bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          اسم العائلة
                        </label>
                        <Input
                          placeholder="أدخل اسم العائلة"
                          className="h-12 bg-background/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        البريد الإلكتروني
                      </label>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        className="h-12 bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">الموضوع</label>
                      <Input
                        placeholder="كيف يمكننا مساعدتك؟"
                        className="h-12 bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">الرسالة</label>
                      <Textarea
                        placeholder="اكتب تفاصيل رسالتك هنا..."
                        className="min-h-[150px] bg-background/50 resize-none"
                      />
                    </div>

                    <Button
                      size="lg"
                      className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30"
                    >
                      إرسال الرسالة
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
