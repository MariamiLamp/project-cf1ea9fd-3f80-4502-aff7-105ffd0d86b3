import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { JobCard } from "@/components/dashboard/JobCard";
import { CVScoreCard } from "@/components/dashboard/CVScoreCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  Briefcase,
  FileText,
  Eye,
  TrendingUp,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdPlacementSelectorProps {
  selectedPlacement: string;
  onSelect: (placement: string) => void;
  adImage?: string;
}

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

export function AdPlacementSelector({
  selectedPlacement,
  onSelect,
  adImage,
}: AdPlacementSelectorProps) {
  const renderAdZone = (
    zoneId: string,
    label: string,
    dimensions: string,
    heightClass: string = "h-32"
  ) => {
    const isSelected = selectedPlacement === zoneId;
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(zoneId);
        }}
        className={cn(
          "w-full rounded-xl border-4 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 group relative overflow-hidden z-20",
          heightClass,
          isSelected
            ? "border-primary bg-primary/10 scale-[1.02] shadow-xl"
            : "border-slate-300 bg-slate-50/80 hover:border-primary/50 hover:bg-slate-100"
        )}
      >
        {isSelected && adImage ? (
          <img
            src={adImage}
            alt="Ad Preview"
            className="w-full h-full object-cover absolute inset-0 z-10"
          />
        ) : (
          <>
            <div
              className={cn(
                "p-3 rounded-full transition-colors relative z-20",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary"
              )}
            >
              {isSelected ? (
                <Check className="w-6 h-6" />
              ) : (
                <div className="text-xl font-bold">إعلان</div>
              )}
            </div>

            <span
              className={cn(
                "font-bold text-lg relative z-20",
                isSelected
                  ? "text-primary"
                  : "text-slate-500 group-hover:text-primary"
              )}
            >
              {label}
            </span>
            <Badge
              variant="secondary"
              className="relative z-20 mt-1 font-normal dir-ltr"
            >
              {dimensions}
            </Badge>
          </>
        )}

        {isSelected && (
          <div className="absolute inset-x-0 bottom-0 bg-primary/20 h-1" />
        )}
      </div>
    );
  };

  return (
    <div className="border rounded-xl bg-slate-50/50 flex flex-col h-[600px] overflow-hidden">
      <div className="bg-white border-b p-4 flex items-center justify-between shadow-sm z-10">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          معاينة الصفحة الرئيسية (اختر مكان الإعلان)
        </h3>
        <div className="text-sm text-muted-foreground bg-slate-100 px-3 py-1 rounded-full">
          اضغط على المنطقة المخصصة للإعلان لاختيارها
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f8fafc]" dir="rtl">
        {/* Simulated Page Container */}
        <div className="max-w-7xl mx-auto pointer-events-none select-none [&_button]:pointer-events-none [&_a]:pointer-events-none">
          <div className="mb-8 pointer-events-auto">
            <WelcomeCard userName="أحمد محمد" />
          </div>

          {/* HERO BOTTOM ZONE */}
          <div className="mb-8 pointer-events-auto">
            {renderAdZone(
              "hero-bottom",
              "مساحة أسفل الترحيب (Hero Bottom)",
              "1200x160 px",
              "h-40"
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 opacity-60">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} delay={0} />
            ))}
          </div>

          <div className="mb-8 opacity-60">
            <div className="section-header">
              <h2 className="section-title">إجراءات سريعة</h2>
            </div>
            <QuickActions />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="card-elevated p-6 opacity-60">
                <div className="section-header">
                  <h2 className="section-title">وظائف مقترحة لك</h2>
                  <div className="text-sm text-primary font-medium flex items-center gap-1">
                    عرض الكل <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <JobCard key={job.title} {...job} delay={0} />
                  ))}
                </div>
              </div>
              <div className="opacity-60">
                <RecentActivity />
              </div>
            </div>

            <div className="space-y-6">
              <div className="opacity-60">
                <CVScoreCard />
              </div>

              {/* ATS BOTTOM ZONE */}
              <div className="pointer-events-auto">
                {renderAdZone(
                  "ats-bottom",
                  "مساحة الشريط الجانبي (Sidebar)",
                  "300x250 px",
                  "h-64"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
