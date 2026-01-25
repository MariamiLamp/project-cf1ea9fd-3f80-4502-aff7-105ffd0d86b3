import {
  Check,
  Crown,
  Zap,
  Building2,
  Sparkles,
  Shield,
  RefreshCw,
  Lock,
  UserCheck,
  Users,
  Building,
} from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

const jobSeekerPlans: Plan[] = [
  {
    id: "js-free",
    name: "مجانية",
    description: "للباحثين عن عمل المبتدئين",
    price: 0,
    period: "مجاناً",
    icon: Zap,
    color: "from-slate-400 to-slate-500",
    features: [
      "فحص السيرة الذاتية مرة واحدة شهرياً",
      "تصفح الوظائف المتاحة",
      "٣ طلبات توظيف شهرياً",
      "أسئلة المقابلات الأساسية",
    ],
  },
  {
    id: "js-pro",
    name: "الاحترافية",
    description: "للباحثين الجادين عن فرص مميزة",
    price: 49,
    period: "شهرياً",
    icon: Crown,
    color: "from-primary to-blue-600",
    popular: true,
    features: [
      "فحص سيرة ذاتية غير محدود",
      "مولد خطابات التقديم بالذكاء الاصطناعي",
      "طلبات توظيف غير محدودة",
      "المسار المهني المخصص",
      "أسئلة المقابلات المتقدمة",
      "منشئ السيرة الذاتية الاحترافي",
    ],
  },
  {
    id: "js-premium",
    name: "المتميزة",
    description: "للوصول لأفضل الفرص العالمية",
    price: 99,
    period: "شهرياً",
    icon: Sparkles,
    color: "from-amber-400 to-amber-600",
    features: [
      "كل مميزات الاحترافية",
      "مقابلات تجريبية بالذكاء الاصطناعي",
      "أولوية الظهور للشركات",
      "مدير حساب مهني خاص",
      "تحليل للسوق الوظيفي وتوقعات الرواتب",
    ],
  },
];

const hrPlans: Plan[] = [
  {
    id: "hr-basic",
    name: "HR الأساسية",
    description: "لمسؤولي التوظيف المستقلين",
    price: 199,
    period: "شهرياً",
    icon: UserCheck,
    color: "from-emerald-400 to-emerald-600",
    features: [
      "٥٠ بحث سيرة ذاتية شهرياً",
      "أدوات تصفية أساسية",
      "إدارة مرشحين مبسطة",
      "دعم البريد الإلكتروني",
    ],
  },
  {
    id: "hr-pro",
    name: "HR الاحترافية",
    description: "لمحترفي التوظيف والباحثين عن الكفاءات",
    price: 450,
    period: "شهرياً",
    icon: Sparkles,
    color: "from-purple-500 to-indigo-600",
    popular: true,
    features: [
      "بحث غير محدود في السير الذاتية",
      "فلترة متقدمة بالذكاء الاصطناعي",
      "تواصل مباشر مع المرشحين",
      "تحليلات أداء إعلانات الوظائف",
      "دعم فني ذو أولوية",
    ],
  },
];

const companyPlans: Plan[] = [
  {
    id: "co-business",
    name: "باقة الأعمال",
    description: "للشركات المتوسطة والنامية",
    price: 299,
    period: "شهرياً",
    icon: Building,
    color: "from-blue-500 to-cyan-600",
    features: [
      "١٠ وظائف نشطة شهرياً",
      "١٠٠ مرشح مقترح لكل وظيفة",
      "لوحة تحكم كاملة للشركة",
      "إدارة طلبات التوظيف",
      "دعم فني ٢٤/٧",
    ],
  },
  {
    id: "co-enterprise",
    name: "باقة المؤسسات",
    description: "للشركات الكبرى والمؤسسات العالمية",
    price: 599,
    period: "شهرياً",
    icon: Building2,
    color: "from-indigo-600 to-violet-700",
    popular: true,
    features: [
      "وظائف غير محدودة",
      "مرشحين غير محدودين",
      "الربط البرمجي (API) الكامل",
      "إدارة فرق عمل متعددة",
      "تقارير تحليلية مخصصة",
      "مدير حساب مخصص",
    ],
  },
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("js-pro");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const getPrice = (price: number) => {
    if (price === 0) return "مجاناً";
    const finalPrice =
      billingPeriod === "yearly" ? Math.round(price * 0.8) : price;
    return `${finalPrice} ر.س`;
  };

  const renderPlanCard = (plan: Plan) => {
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
            ? "border-primary shadow-soft scale-[1.02]"
            : "border-border hover:border-primary/30",
          plan.popular && "ring-2 ring-primary/20",
        )}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold">
            الأكثر شيوعاً
          </div>
        )}

        {/* Plan Header */}
        <div className="text-center mb-6">
          <div
            className={cn(
              "w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br",
              plan.color,
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {plan.name}
          </h3>
          <p className="text-xs text-muted-foreground">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-6 pb-6 border-b border-border">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold text-foreground">
              {getPrice(plan.price)}
            </span>
            {plan.price > 0 && (
              <span className="text-muted-foreground text-xs">
                / {plan.period}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6 min-h-[160px]">
          {plan.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3 flex-row-reverse text-right"
            >
              <div className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-success" />
              </div>
              <span className="text-xs text-foreground font-medium">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={isSelected ? "gradient" : "outline"}
          className="w-full h-10 text-sm font-bold"
        >
          {plan.price === 0 ? "ابدأ مجاناً" : "اشترك الآن"}
        </Button>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-success/5 border border-success/10">
            <RefreshCw className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">إلغاء في أي وقت</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">ضمان استرداد ١٤ يوم</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
            <Lock className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium">دفع آمن ومشفر</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            خطط الاشتراك
          </h1>
          <p className="text-sm text-muted-foreground">
            اختر الباقة التي تناسب احتياجاتك واستفد من جميع مميزات المنصة
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10 text-sm">
          <span
            className={cn(
              billingPeriod === "monthly"
                ? "text-foreground font-bold"
                : "text-muted-foreground",
            )}
          >
            شهري
          </span>
          <button
            onClick={() =>
              setBillingPeriod(
                billingPeriod === "monthly" ? "yearly" : "monthly",
              )
            }
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              billingPeriod === "yearly" ? "bg-primary" : "bg-muted",
            )}
          >
            <div
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                billingPeriod === "yearly" ? "right-1" : "right-7",
              )}
            />
          </button>
          <span
            className={cn(
              "flex items-center gap-2",
              billingPeriod === "yearly"
                ? "text-foreground font-bold"
                : "text-muted-foreground",
            )}
          >
            سنوي
            <Badge
              variant="secondary"
              className="bg-emerald-500/10 text-emerald-600 text-[10px] h-5 px-1.5 border-emerald-500/20"
            >
              وفر 20%
            </Badge>
          </span>
        </div>

        {/* Tabs for Categories */}
        <Tabs defaultValue="jobseeker" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="bg-muted/50 p-1 rounded-xl h-11 w-full max-w-lg">
              <TabsTrigger
                value="company"
                className="flex-1 rounded-lg text-sm font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                الشركات
              </TabsTrigger>
              <TabsTrigger
                value="hr"
                className="flex-1 rounded-lg text-sm font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                موظفي الـ HR
              </TabsTrigger>
              <TabsTrigger
                value="jobseeker"
                className="flex-1 rounded-lg text-sm font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                الباحثين عن عمل
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="jobseeker" className="focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobSeekerPlans.map(renderPlanCard)}
            </div>
          </TabsContent>

          <TabsContent value="hr" className="focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {hrPlans.map(renderPlanCard)}
            </div>
          </TabsContent>

          <TabsContent value="company" className="focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {companyPlans.map(renderPlanCard)}
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            هل لديك أسئلة؟ سنسعد بمساعدتك في اختيار الباقة المناسبة
          </p>
          <Button variant="outline" size="sm">
            تواصل مع الدعم الفني
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
