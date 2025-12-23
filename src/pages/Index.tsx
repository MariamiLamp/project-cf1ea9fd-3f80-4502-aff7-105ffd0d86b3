import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { JobCard } from "@/components/dashboard/JobCard";
import { CVScoreCard } from "@/components/dashboard/CVScoreCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Briefcase, FileText, Eye, TrendingUp, ArrowLeft } from "lucide-react";

const stats = [
  {
    title: "الوظائف المتاحة",
    value: "٢٤٧",
    subtitle: "وظيفة تناسب ملفك",
    icon: Briefcase,
    trend: { value: 12, isPositive: true },
    variant: "primary" as const,
  },
  {
    title: "الطلبات المرسلة",
    value: "١٨",
    subtitle: "هذا الشهر",
    icon: FileText,
    variant: "default" as const,
  },
  {
    title: "مشاهدات الملف",
    value: "٥٦",
    subtitle: "آخر ٣٠ يوم",
    icon: Eye,
    trend: { value: 8, isPositive: true },
    variant: "success" as const,
  },
  {
    title: "نسبة الاستجابة",
    value: "٣٣٪",
    subtitle: "فوق المعدل",
    icon: TrendingUp,
    trend: { value: 5, isPositive: true },
    variant: "warning" as const,
  },
];

const recommendedJobs = [
  {
    title: "مطور واجهات أمامية",
    company: "شركة التقنية المتقدمة",
    location: "الرياض، السعودية",
    type: "دوام كامل",
    matchScore: 92,
    isNew: true,
  },
  {
    title: "مهندس برمجيات",
    company: "مؤسسة الابتكار الرقمي",
    location: "جدة، السعودية",
    type: "عن بُعد",
    matchScore: 85,
    isSaved: true,
  },
  {
    title: "مصمم تجربة مستخدم",
    company: "استوديو التصميم الإبداعي",
    location: "دبي، الإمارات",
    type: "دوام جزئي",
    matchScore: 78,
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <WelcomeCard userName="أحمد محمد" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 100} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="section-header">
          <h2 className="section-title">إجراءات سريعة</h2>
        </div>
        <QuickActions />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-elevated p-6 opacity-0 animate-fade-up" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            <div className="section-header">
              <h2 className="section-title">وظائف مقترحة لك</h2>
              <button className="text-sm text-primary hover:text-primary-light font-medium transition-colors flex items-center gap-1">
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recommendedJobs.map((job, index) => (
                <JobCard key={job.title} {...job} delay={500 + index * 100} />
              ))}
            </div>
          </div>

          <RecentActivity />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <CVScoreCard />

          {/* AI Usage Card */}
          <div className="card-elevated p-6 opacity-0 animate-fade-up" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="ai-indicator">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                الذكاء الاصطناعي
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-2">رصيد الاستخدام</h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold text-foreground">٤٥</span>
              <span className="text-muted-foreground">/ ١٠٠ رصيد</span>
            </div>
            <div className="w-full h-2 rounded-full bg-muted mb-4">
              <div className="h-full rounded-full bg-gradient-to-l from-accent to-success" style={{ width: "45%" }} />
            </div>
            <button className="w-full btn-gradient text-sm">
              ترقية للحصول على المزيد
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
