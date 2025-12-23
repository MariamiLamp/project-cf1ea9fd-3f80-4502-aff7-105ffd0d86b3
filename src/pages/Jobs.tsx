import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobCard } from "@/components/dashboard/JobCard";
import { Search, SlidersHorizontal, MapPin, Briefcase, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const jobs = [
  {
    title: "مطور واجهات أمامية أول",
    company: "شركة التقنية المتقدمة",
    location: "الرياض، السعودية",
    type: "دوام كامل",
    matchScore: 95,
    isNew: true,
  },
  {
    title: "مهندس برمجيات",
    company: "مؤسسة الابتكار الرقمي",
    location: "جدة، السعودية",
    type: "عن بُعد",
    matchScore: 88,
    isSaved: true,
  },
  {
    title: "مصمم تجربة مستخدم",
    company: "استوديو التصميم الإبداعي",
    location: "دبي، الإمارات",
    type: "دوام جزئي",
    matchScore: 82,
    isNew: true,
  },
  {
    title: "محلل بيانات",
    company: "شركة البيانات الذكية",
    location: "الرياض، السعودية",
    type: "دوام كامل",
    matchScore: 76,
  },
  {
    title: "مدير مشاريع تقنية",
    company: "شركة الحلول المتكاملة",
    location: "الدمام، السعودية",
    type: "دوام كامل",
    matchScore: 71,
    isSaved: true,
  },
  {
    title: "مطور تطبيقات موبايل",
    company: "شركة التطبيقات الذكية",
    location: "عن بُعد",
    type: "عقد مؤقت",
    matchScore: 68,
  },
];

const filters = [
  { label: "نوع العمل", options: ["دوام كامل", "دوام جزئي", "عن بُعد", "عقد مؤقت"] },
  { label: "الموقع", options: ["الرياض", "جدة", "الدمام", "دبي", "عن بُعد"] },
  { label: "مستوى الخبرة", options: ["مبتدئ", "متوسط", "خبير", "مدير"] },
];

const JobsPage = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">فرص العمل</h1>
        <p className="text-muted-foreground">
          اكتشف الوظائف المناسبة لملفك الشخصي ومهاراتك
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card-elevated p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن وظيفة، شركة، أو مهارة..."
              className="w-full h-12 pr-12 pl-4 rounded-lg bg-muted/50 border border-transparent focus:border-primary/30 focus:bg-card focus:outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(activeFilter === filter.label ? null : filter.label)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeFilter === filter.label
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {filter.label}
              </button>
            ))}
            <Button variant="outline" size="default">
              <SlidersHorizontal className="w-4 h-4" />
              المزيد من الفلاتر
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 text-primary">
          <Briefcase className="w-4 h-4" />
          <span className="font-medium">٢٤٧ وظيفة</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>جميع المواقع</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>جميع أنواع الدوام</span>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard key={job.title + index} {...job} delay={index * 100} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          تحميل المزيد من الوظائف
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default JobsPage;
