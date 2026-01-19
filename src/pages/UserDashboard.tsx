import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { JobCard } from "@/components/dashboard/JobCard";
import { CVScoreCard } from "@/components/dashboard/CVScoreCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Briefcase, FileText, Eye, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import useAds from "@/hooks/use-ads";

const stats = [
  {
    title: "الوظائف المتاحة",
    value: "٢٤٧",
    subtitle: "وظيفة تناسب ملفك",
    icon: Briefcase,
    trend: {
      value: 12,
      isPositive: true,
    },
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
    trend: {
      value: 8,
      isPositive: true,
    },
    variant: "success" as const,
    link: "/profile-views",
  },
  {
    title: "نسبة الاستجابة",
    value: "٣٣٪",
    subtitle: "فوق المعدل",
    icon: TrendingUp,
    trend: {
      value: 5,
      isPositive: true,
    },
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

const UserDashboard = () => {
  const adsHook = useAds();
  const heroAds = adsHook.getByPlacement("hero-bottom");
  const atsAds = adsHook.getByPlacement("ats-bottom");

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <WelcomeCard userName="أحمد محمد" />
      </div>

      {/* Hero placement ad */}
      {heroAds.length > 0 && (
        <div className="mb-6 group">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mr-1">
              إعلان برعاية
            </span>
          </div>
          <Link
            to={heroAds[0].link || "/subscription"}
            className="block overflow-hidden rounded-xl border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
          >
            <img
              src={heroAds[0].imageUrl}
              alt={heroAds[0].title || "Premium Subscription Ad"}
              className="w-full h-auto max-h-[200px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </Link>
        </div>
      )}

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
          <div
            className="card-elevated p-6 opacity-0 animate-fade-up"
            style={{
              animationDelay: "400ms",
              animationFillMode: "forwards",
            }}
          >
            <div className="section-header">
              <h2 className="section-title">وظائف مقترحة لك</h2>
              <Link
                to="/jobs"
                className="text-sm text-primary hover:text-primary-light font-medium transition-colors flex items-center gap-1"
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Link>
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
          {/* ATS placement ad */}
          {atsAds.length > 0 && (
            <div className="mt-4 group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mr-1">
                  إعلان برعاية
                </span>
              </div>
              <Link
                to={atsAds[0].link || "/cv-check"}
                className="block overflow-hidden rounded-xl border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <img
                  src={atsAds[0].imageUrl}
                  alt={atsAds[0].title || "ATS Check Ad"}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default UserDashboard;
