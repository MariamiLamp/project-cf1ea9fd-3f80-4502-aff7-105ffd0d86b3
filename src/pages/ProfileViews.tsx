import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Eye,
  Building2,
  User,
  MapPin,
  Clock,
  Briefcase,
  ChevronLeft,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileViewsData = [
  {
    id: 1,
    name: "شركة التقنية المتقدمة",
    type: "company",
    industry: "التقنية",
    location: "الرياض",
    time: "منذ ساعتين",
    initials: "A",
    avatar: "",
  },
  {
    id: 2,
    name: "سارة محمود",
    type: "user",
    role: "محرر وظائف",
    location: "جدة",
    time: "منذ ٥ ساعات",
    initials: "S",
    avatar: "",
  },
  {
    id: 3,
    name: "حلول البرمجيات الدولية",
    type: "company",
    industry: "تطوير البرمجيات",
    location: "دبي",
    time: "منذ يوم واحد",
    initials: "I",
    avatar: "",
  },
  {
    id: 4,
    name: "خالد العتيبي",
    type: "user",
    role: "مدير توظيف",
    location: "الرياض",
    time: "منذ يومين",
    initials: "K",
    avatar: "",
  },
  {
    id: 5,
    name: "بنك الاستثمار العربي",
    type: "company",
    industry: "الخدمات المالية",
    location: "الرياض",
    time: "منذ ٣ أيام",
    initials: "B",
    avatar: "",
  },
  {
    id: 6,
    name: "نورة علي",
    type: "user",
    role: "مهندسة برمجيات",
    location: "الدمام",
    time: "منذ ٤ أيام",
    initials: "N",
    avatar: "",
  },
  {
    id: 7,
    name: "قطاع الاتصالات",
    type: "company",
    industry: "اتصالات",
    location: "الرياض",
    time: "منذ أسبوع",
    initials: "T",
    avatar: "",
  },
];

const ProfileViews = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <main className="p-6 space-y-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              مشاهدات الملف الشخصي
            </h1>
          </div>
          <Badge
            variant="secondary"
            className="px-3 py-1 text-sm bg-primary/10 text-primary border-none"
          >
            {profileViewsData.length + 45} مشاهدة إجمالية
          </Badge>
        </div>

        <Card className="border-none shadow-sm bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <CardTitle>من زار ملفك الشخصي؟</CardTitle>
            <CardDescription>
              قائمة بالشركات والمستخدمين الذين اطلعوا على سيرتك الذاتية وملفك
              المهني مؤخراً
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profileViewsData.map((view) => (
                <div
                  key={view.id}
                  className="group flex flex-col md:flex-row items-center justify-between p-4 bg-background rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <Avatar className="h-12 w-12 border-2 border-primary/10 group-hover:border-primary/20 transition-colors">
                      <AvatarImage src={view.avatar} alt={view.name} />
                      <AvatarFallback
                        className={
                          view.type === "company"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                        }
                      >
                        {view.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{view.name}</span>
                        {view.type === "company" ? (
                          <Badge
                            variant="outline"
                            className="h-5 text-[10px] bg-blue-50 text-blue-600 border-blue-100 px-1"
                          >
                            شركة
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="h-5 text-[10px] bg-amber-50 text-amber-600 border-amber-100 px-1"
                          >
                            مستخدم
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {view.type === "company" ? (
                            <Building2 className="w-3 h-3" />
                          ) : (
                            <Briefcase className="w-3 h-3" />
                          )}
                          {view.type === "company" ? view.industry : view.role}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {view.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-6">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {view.time}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    >
                      <span>عرض</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center space-y-4">
              <h3 className="font-bold text-xl text-primary">
                هل تريد الوصول إلى المزيد من أصحاب العمل؟
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                اشترك الآن في الباقة المميزة لتظهر في مقدمة نتائج البحث، وتحصل
                على تحليلات دقيقة حول الشركات المهتمة بملفك الشخصي.
              </p>
              <Button
                size="lg"
                className="mt-2 font-bold px-8"
                onClick={() => navigate("/subscription")}
              >
                اشترك الآن وترقّ بمسارك المهني
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
};

export default ProfileViews;
