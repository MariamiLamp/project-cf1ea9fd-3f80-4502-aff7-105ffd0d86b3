import { Check, Crown, Zap, Building2, Sparkles, Shield, RefreshCw, Lock } from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  icon: React.ElementType;
  features: string[];
  popular?: boolean;
  color: string;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "الأساسية",
    description: "للباحثين عن عمل المبتدئين",
    price: 0,
    period: "مجاناً",
    icon: Zap,
    color: "from-muted-foreground to-muted-foreground",
    features: [
      "فحص السيرة الذاتية مرة واحدة شهرياً",
      "تصفح الوظائف المتاحة",
      "٣ طلبات توظيف شهرياً",
      "أسئلة المقابلات الأساسية",
    ],
  },
  {
    id: "pro",
    name: "الاحترافية",
    description: "للباحثين الجادين عن فرص مميزة",
    price: 49,
    period: "شهرياً",
    icon: Crown,
    color: "from-primary to-secondary",
    popular: true,
    features: [
      "فحص سيرة ذاتية غير محدود",
      "مولد خطابات التقديم بالذكاء الاصطناعي",
      "طلبات توظيف غير محدودة",
      "المسار المهني المخصص",
      "أسئلة المقابلات المتقدمة",
      "منشئ السيرة الذاتية الاحترافي",
      "دعم فني أولوي",
    ],
  },
  {
    id: "enterprise",
    name: "الشركات",
    description: "للشركات وفرق الموارد البشرية",
    price: 199,
    period: "شهرياً",
    icon: Building2,
    color: "from-accent to-primary",
    features: [
      "جميع مميزات الباقة الاحترافية",
      "لوحة تحكم الموارد البشرية",
      "إدارة المرشحين المتقدمة",
      "تحليلات وتقارير مفصلة",
      "مولد الوصف الوظيفي بالذكاء الاصطناعي",
      "دعم فني مخصص ٢٤/٧",
      "تكامل مع أنظمة HR الخارجية",
      "حسابات متعددة للفريق",
    ],
  },
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const getPrice = (price: number) => {
    if (price === 0) return "مجاناً";
    const finalPrice = billingPeriod === "yearly" ? Math.round(price * 0.8) : price;
    return `${finalPrice} ر.س`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">اختر الباقة المناسبة</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">خطط الاشتراك</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            اختر الباقة التي تناسب احتياجاتك واستفد من جميع مميزات المنصة
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className={cn(
            "text-sm font-medium transition-colors",
            billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"
          )}>
            شهري
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
            className={cn(
              "relative w-14 h-7 rounded-full transition-colors",
              billingPeriod === "yearly" ? "bg-primary" : "bg-muted"
            )}
          >
            <div className={cn(
              "absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all",
              billingPeriod === "yearly" ? "right-1" : "right-8"
            )} />
          </button>
          <span className={cn(
            "text-sm font-medium transition-colors",
            billingPeriod === "yearly" ? "text-foreground" : "text-muted-foreground"
          )}>
            سنوي
            <span className="mr-1 text-xs text-success">(-٢٠٪)</span>
          </span>
        </div>

        {/* Trust Badges - Highlighted Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-success" />
            </div>
            <span className="font-medium text-foreground">إلغاء في أي وقت</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium text-foreground">ضمان استرداد ١٤ يوم</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <span className="font-medium text-foreground">دفع آمن ومشفر</span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "relative rounded-2xl p-6 cursor-pointer transition-all duration-300",
                  "bg-card border-2",
                  isSelected 
                    ? "border-primary shadow-elevated scale-[1.02]" 
                    : "border-border hover:border-primary/30 hover:shadow-soft",
                  plan.popular && "ring-2 ring-primary/20"
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium">
                    الأكثر شيوعاً
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={cn(
                    "w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br",
                    plan.color
                  )}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-border">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {getPrice(plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground text-sm">/ {plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={isSelected ? "gradient" : "outline"}
                  className="w-full"
                >
                  {plan.price === 0 ? "البدء مجاناً" : "اشترك الآن"}
                </Button>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-xl font-bold text-foreground mb-4">هل لديك أسئلة؟</h2>
          <p className="text-muted-foreground mb-4">
            تواصل معنا وسنسعد بمساعدتك في اختيار الباقة المناسبة
          </p>
          <Button variant="outline">
            تواصل مع الدعم الفني
          </Button>
        </div>

      </div>
    </DashboardLayout>
  );
}
