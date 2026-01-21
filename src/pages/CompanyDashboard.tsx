import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import useAds, { AdPlacement } from "@/hooks/use-ads";
import {
  Briefcase,
  Plus,
  Users,
  FileText,
  LogOut,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Building2,
  TrendingUp,
  Edit,
  Trash2,
  Sparkles,
  Image,
  Star,
  Megaphone,
  BookOpen,
  Loader2,
  X,
  Search,
  ListFilter,
  Download,
} from "lucide-react";

import { AdPlacementSelector } from "@/components/dashboard/AdPlacementSelector";
import { StatCard } from "@/components/dashboard/StatCard";
import MobileTabsMenu from "@/components/dashboard/MobileTabsMenu";
import JobForm, { JobFormData } from "@/components/dashboard/JobForm";

// Mock data
const initialJobs = [
  {
    id: 1,
    title: "مطور واجهات أمامية",
    department: "التقنية",
    type: "دوام كامل",
    location: "مصر - القاهرة",
    applications: 24,
    status: "active",
    postedDate: "2024-01-10",
  },
  {
    id: 2,
    title: "محلل بيانات",
    department: "البيانات",
    type: "دوام كامل",
    location: "الإمارات - دبي",
    applications: 18,
    status: "active",
    postedDate: "2024-01-15",
  },
  {
    id: 3,
    title: "مدير مشاريع",
    department: "الإدارة",
    type: "دوام كامل",
    location: "المملكة العربية السعودية - الرياض",
    applications: 12,
    status: "closed",
    postedDate: "2024-01-05",
  },
];

const initialCandidates = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@email.com",
    phone: "0501234567",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5 سنوات",
    appliedFor: "مطور واجهات أمامية",
    education: "بكالوريوس علوم حاسب",
    summary: "مطور واجهات أمامية متمرس مع خبرة في بناء تطبيقات ويب حديثة",
  },
  {
    id: 2,
    name: "سارة علي",
    email: "sara@email.com",
    phone: "0509876543",
    matchScore: 88,
    skills: ["Python", "SQL", "Tableau"],
    experience: "3 سنوات",
    appliedFor: "محلل بيانات",
    education: "ماجستير تحليل بيانات",
    summary: "محللة بيانات مع خبرة في استخراج الرؤى من البيانات الضخمة",
  },
  {
    id: 3,
    name: "محمد خالد",
    email: "mohamed@email.com",
    phone: "0551112233",
    matchScore: 82,
    skills: ["React", "Vue", "CSS"],
    experience: "4 سنوات",
    appliedFor: "مطور واجهات أمامية",
    education: "بكالوريوس هندسة برمجيات",
    summary: "مطور واجهات مع شغف لتصميم تجارب مستخدم متميزة",
  },
  {
    id: 4,
    name: "فاطمة أحمد",
    email: "fatima@email.com",
    phone: "0544455566",
    matchScore: 78,
    skills: ["Project Management", "Agile"],
    experience: "6 سنوات",
    appliedFor: "مدير مشاريع",
    education: "ماجستير إدارة أعمال",
    summary: "مديرة مشاريع معتمدة PMP مع خبرة في قيادة فرق تقنية",
  },
];

const initialApplications = [
  {
    id: 1,
    candidateId: 1,
    candidateName: "أحمد محمد",
    jobTitle: "مطور واجهات أمامية",
    status: "shortlisted",
    appliedDate: "2024-01-20",
    matchScore: 95,
    experience: "5 سنوات",
    rejectionReason: "",
    notes: "مرشح متميز جداً، نحتاج لتحديد موعد مقابلة تقنية ثانية.",
  },
  {
    id: 2,
    candidateId: 2,
    candidateName: "سارة علي",
    jobTitle: "محلل بيانات",
    status: "viewed",
    appliedDate: "2024-01-19",
    matchScore: 88,
    experience: "3 سنوات",
    rejectionReason: "",
    notes: "",
  },
  {
    id: 3,
    candidateId: 3,
    candidateName: "محمد خالد",
    jobTitle: "مطور واجهات أمامية",
    status: "accepted",
    appliedDate: "2024-01-18",
    matchScore: 82,
    experience: "4 سنوات",
    rejectionReason: "",
    notes: "",
  },
  {
    id: 4,
    candidateId: 4,
    candidateName: "فاطمة أحمد",
    jobTitle: "مدير مشاريع",
    status: "rejected",
    appliedDate: "2024-01-17",
    matchScore: 78,
    experience: "6 سنوات",
    rejectionReason: "الخبرة في إدارة المشاريع التقنية أقل من المطلوب",
    notes: "",
  },
  {
    id: 5,
    candidateId: 1,
    candidateName: "أحمد محمد",
    jobTitle: "مطور واجهات أمامية",
    status: "pending",
    appliedDate: "2024-01-21",
    matchScore: 91,
    experience: "5 سنوات",
    rejectionReason: "",
    notes: "",
  },
];

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State management
  const [jobs, setJobs] = useState(initialJobs);
  const [candidates] = useState(initialCandidates);
  const [applications, setApplications] = useState(initialApplications);

  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isEditJobOpen, setIsEditJobOpen] = useState(false);
  const [isViewApplicationOpen, setIsViewApplicationOpen] = useState(false);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<
    (typeof initialJobs)[0] | null
  >(null);
  const [selectedApplication, setSelectedApplication] = useState<
    (typeof initialApplications)[0] | null
  >(null);

  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    type: "",
    country: "",
    city: "",
    description: "",
    requirements: "",
  });

  // Job Description Generator state
  const [jobGenTitle, setJobGenTitle] = useState("");
  const [jobGenDepartment, setJobGenDepartment] = useState("");
  const [jobGenExperience, setJobGenExperience] = useState("");
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Featured jobs & banners state
  const [featuredJobs, setFeaturedJobs] = useState([
    {
      id: 1,
      title: "مطور واجهات أمامية",
      featured: true,
      featuredUntil: "2024-04-15",
    },
  ]);
  const [companyBanner, setCompanyBanner] = useState({
    enabled: false,
    title: "",
    description: "",
    imageUrl: "",
  });

  // Ads management (banners placed on public pages)
  const adsHook = useAds();
  const { ads, add: addAd, remove: removeAd, getByPlacement } = adsHook;
  const [adForm, setAdForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    link: "",
    placement: "hero-bottom",
    duration: "1_month",
  });

  // Filters for Applications
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterMatchScore, setFilterMatchScore] = useState<string>("all");
  const [filterJob, setFilterJob] = useState<string>("all");
  const [filterExperience, setFilterExperience] = useState<string>("all");

  // Applied filters state (actual filters used for the list)
  const [appliedFilters, setAppliedFilters] = useState({
    status: "all",
    date: "",
    matchScore: "all",
    job: "all",
    experience: "all",
  });

  const handleApplyFilters = () => {
    setAppliedFilters({
      status: filterStatus,
      date: filterDate,
      matchScore: filterMatchScore,
      job: filterJob,
      experience: filterExperience,
    });
  };

  const filteredApplications = applications.filter((app) => {
    // Filter by Status
    if (appliedFilters.status !== "all" && app.status !== appliedFilters.status)
      return false;

    // Filter by Job Title
    if (appliedFilters.job !== "all" && app.jobTitle !== appliedFilters.job)
      return false;

    // Filter by Date
    if (appliedFilters.date && app.appliedDate !== appliedFilters.date)
      return false;

    // Filter by Match Score (>= selected score)
    if (
      appliedFilters.matchScore !== "all" &&
      app.matchScore < parseInt(appliedFilters.matchScore)
    )
      return false;

    // Filter by Experience
    if (appliedFilters.experience !== "all") {
      const expYears = parseInt((app as any).experience) || 0;
      const filterExp = appliedFilters.experience;

      if (filterExp === "no-experience" && expYears > 0) return false;
      if (filterExp === "less-than-1" && expYears >= 1) return false;
      if (filterExp === "1-3" && (expYears < 1 || expYears > 3)) return false;
      if (filterExp === "3-5" && (expYears < 3 || expYears > 5)) return false;
      if (filterExp === "5-10" && (expYears < 5 || expYears > 10)) return false;
      if (filterExp === "more-than-10" && expYears <= 10) return false;
    }

    return true;
  });

  const liveAds = ads.filter((a) => a.enabled);

  const [editJob, setEditJob] = useState<JobFormData>({
    id: 0,
    title: "",
    department: "",
    type: "",
    country: "",
    city: "",
    description: "",
    requirements: "",
    status: "",
  });

  const [activeTab, setActiveTab] = useState("jobs");

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleAddJobData = (data: JobFormData) => {
    if (
      !data.title ||
      !data.department ||
      !data.type ||
      !data.country ||
      !data.city
    ) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const job = {
      id: jobs.length + 1,
      title: data.title,
      department: data.department,
      type: data.type,
      location: `${data.country} - ${data.city}`,
      applications: 0,
      status: "active",
      postedDate: new Date().toISOString().split("T")[0],
      // We'll keep these in the state if we want to support editing them later
      description: data.description,
      requirements: data.requirements,
    };

    setJobs([...jobs, job]);
    toast({
      title: "تم إضافة الوظيفة",
      description: "تم نشر الوظيفة بنجاح",
    });
    setIsAddJobOpen(false);
    setNewJob({
      title: "",
      department: "",
      type: "",
      country: "",
      city: "",
      description: "",
      requirements: "",
    });
  };

  const handleAddJob = () => {
    handleAddJobData(newJob as any);
  };

  const handleEditJob = (job: any) => {
    setSelectedJob(job);
    const [country, city] = job.location.includes(" - ")
      ? job.location.split(" - ")
      : [job.location, ""];

    setEditJob({
      id: job.id,
      title: job.title,
      department: job.department,
      type: job.type,
      country: country,
      city: city || "",
      description: job.description || "",
      requirements: job.requirements || "",
      status: job.status,
    });
    setIsEditJobOpen(true);
  };

  const handleSaveEditData = (data: JobFormData) => {
    setJobs(
      jobs.map((job) =>
        job.id === data.id
          ? {
              ...job,
              title: data.title,
              department: data.department,
              type: data.type,
              location: `${data.country} - ${data.city}`,
              status: data.status,
              description: data.description,
              requirements: data.requirements,
            }
          : job,
      ),
    );
    toast({
      title: "تم التحديث",
      description: "تم تحديث بيانات الوظيفة بنجاح",
    });
    setIsEditJobOpen(false);
  };

  const handleToggleJobStatus = (jobId: number) => {
    setJobs(
      jobs.map((job) => {
        if (job.id === jobId) {
          const newStatus = job.status === "active" ? "paused" : "active";
          return { ...job, status: newStatus };
        }
        return job;
      }),
    );
    toast({
      title: "تم تحديث الحالة",
      description: "تم تحديث حالة الوظيفة بنجاح",
    });
  };

  const handleViewCandidate = (candidateId: number) => {
    navigate(`/candidate/${candidateId}?view=company`);
  };

  const handleViewApplication = (app: (typeof initialApplications)[0]) => {
    setSelectedApplication(app);
    setRejectionReasonInput(app.rejectionReason || "");
    setNotesInput(app.notes || "");
    setPendingAction(null); // Reset pending action
    setIsViewApplicationOpen(true);

    // Automatically mark as viewed if it was pending
    if (app.status === "pending") {
      handleUpdateApplicationStatus(app.id, "viewed");
    }
  };

  const handleUpdateApplicationStatus = (
    appId: number,
    status: string,
    additionalData: { rejectionReason?: string; notes?: string } = {},
  ) => {
    setApplications(
      applications.map((app) =>
        app.id === appId ? { ...app, status, ...additionalData } : app,
      ),
    );

    let title = "تم التحديث";
    let description = "تم تحديث حالة الطلب بنجاح";

    switch (status) {
      case "accepted":
        title = "تم القبول";
        description = "تم قبول طلب التوظيف";
        break;
      case "rejected":
        title = "تم الرفض";
        description = "تم رفض طلب التوظيف";
        break;
      case "shortlisted":
        title = "تمت الإضافة";
        description = "تمت إضافة المرشح للقائمة المختصرة";
        break;
      case "viewed":
        title = "تم العرض";
        description = "تم عرض الطلب";
        break;
    }

    if (additionalData.notes) {
      title = "تم حفظ الملاحظات";
      description = "تم تحديث ملاحظات الشركة للمرشح";
    }

    toast({ title, description });
  };

  // Mock AI Job Description Generator
  const handleGenerateDescription = async () => {
    if (!jobGenTitle) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال المسمى الوظيفي",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockDescription = `نبحث عن ${jobGenTitle} متميز للانضمام إلى فريقنا في قسم ${
      jobGenDepartment || "التقنية"
    }.

المسؤوليات الرئيسية:
• تطوير وصيانة التطبيقات والأنظمة
• التعاون مع الفريق لتحقيق أهداف المشروع
• المشاركة في مراجعة الكود وتحسين الأداء
• توثيق العمل وإعداد التقارير الفنية

المتطلبات:
• خبرة ${jobGenExperience || "3+"} سنوات في المجال
• مهارات تواصل ممتازة
• القدرة على العمل ضمن فريق
• إتقان اللغة العربية والإنجليزية

المزايا:
• راتب تنافسي
• تأمين صحي شامل
• بيئة عمل محفزة
• فرص للتطوير المهني`;

    setGeneratedDescription(mockDescription);
    setIsGenerating(false);
    toast({
      title: "تم التوليد",
      description: "تم إنشاء وصف الوظيفة بنجاح",
    });
  };

  const handleCopyDescription = () => {
    navigator.clipboard.writeText(generatedDescription);
    toast({
      title: "تم النسخ",
      description: "تم نسخ الوصف إلى الحافظة",
    });
  };

  const handleToggleFeatured = (jobId: number) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      const isFeatured = featuredJobs.some((f) => f.id === jobId);
      if (isFeatured) {
        setFeaturedJobs(featuredJobs.filter((f) => f.id !== jobId));
        toast({
          title: "تم إلغاء التمييز",
          description: "تم إزالة الوظيفة من القائمة المميزة",
        });
      } else {
        setFeaturedJobs([
          ...featuredJobs,
          {
            id: jobId,
            title: job.title,
            featured: true,
            featuredUntil: "2024-05-01",
          },
        ]);
        toast({
          title: "تم التمييز",
          description: "تم إضافة الوظيفة للقائمة المميزة",
        });
      }
    }
  };

  const handleSaveBanner = () => {
    setCompanyBanner({ ...companyBanner, enabled: true });
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات البانر بنجاح",
    });
  };

  const handleAddAd = () => {
    if (!adForm.imageUrl) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رابط صورة البانر",
        variant: "destructive",
      });
      return;
    }
    // create ad request (pending approval) - do not enable until admin approves
    // Calculate price based on duration
    // Calculate price based on duration
    let price = 1500;
    let durationLabel = "شهر";

    switch (adForm.duration) {
      case "1_month":
        price = 1500;
        durationLabel = "شهر";
        break;
      case "2_months":
        price = 2800;
        durationLabel = "شهرين";
        break;
      case "3_months":
        price = 4000;
        durationLabel = "3 أشهر";
        break;
      case "6_months":
        price = 7500;
        durationLabel = "6 أشهر";
        break;
      case "1_year":
        price = 14000;
        durationLabel = "سنة";
        break;
      default:
        price = 1500;
        durationLabel = "شهر";
    }

    const adRequestData = {
      title: adForm.title || "بدون عنوان",
      description: adForm.description || "",
      imageUrl: adForm.imageUrl,
      link: adForm.link || "",
      placement: adForm.placement as AdPlacement,
      enabled: false,
      status: "pending", // Will be pending until paid/approved
      companyName: user?.companyName || "شركة تجريبية",
      date: new Date().toISOString().split("T")[0],
      price: price,
      duration: durationLabel,
      type: "بنر إعلاني",
    };

    // Navigate to checkout with the ad request data
    navigate("/checkout", { state: { adRequest: adRequestData } });

    setAdForm({
      title: "",
      description: "",
      imageUrl: "",
      link: "",
      placement: "hero-bottom",
      duration: "1_month",
    });
  };

  const handleRemoveAd = (id: number) => {
    removeAd(id);
    toast({ title: "تم الحذف", description: "تمت إزالة الإعلان" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" /> قيد المراجعة
          </Badge>
        );
      case "viewed":
        return (
          <Badge
            variant="secondary"
            className="gap-1 bg-blue-50 text-blue-700 border-blue-200"
          >
            <Eye className="w-3 h-3" /> تم العرض
          </Badge>
        );

      case "shortlisted":
        return (
          <Badge className="gap-1 bg-amber-500 hover:bg-amber-600">
            <Star className="w-3 h-3" /> قائمة المختصرة
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="gap-1 bg-emerald-500">
            <CheckCircle className="w-3 h-3" /> مقبول
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="w-3 h-3" /> مرفوض
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = [
    {
      label: "الوظائف النشطة",
      value: "12",
      icon: Briefcase,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "إجمالي الطلبات",
      value: "156",
      icon: FileText,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "المرشحون المتوافقون",
      value: "48",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "معدل القبول",
      value: "32%",
      icon: TrendingUp,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        {/* Logo & Brand */}
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

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">لوحة تحكم الشركة</p>
            <p className="text-xs text-muted-foreground">
              {user?.companyName || "شركتك"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <main className="p-6 pb-24 md:pb-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="الوظائف النشطة"
            value="12"
            icon={Briefcase}
            variant="primary"
            delay={100}
          />
          <StatCard
            title="إجمالي الطلبات"
            value="156"
            icon={FileText}
            variant="success"
            delay={200}
          />
          <StatCard
            title="المرشحون المتوافقون"
            value="48"
            icon={Users}
            variant="info"
            delay={300}
          />
          <StatCard
            title="معدل القبول"
            value="32%"
            icon={TrendingUp}
            variant="warning"
            delay={400}
          />
        </div>
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center justify-between w-full flex-row-reverse">
              <TabsList className="hidden md:flex bg-muted/50 flex-wrap h-auto gap-1">
                <TabsTrigger value="ads" className="gap-2">
                  <Megaphone className="w-4 h-4" />
                  الإعلانات
                </TabsTrigger>
                <TabsTrigger value="promotion" className="gap-2">
                  <Megaphone className="w-4 h-4" />
                  الترويج
                </TabsTrigger>
                <TabsTrigger value="applications" className="gap-2">
                  <FileText className="w-4 h-4" />
                  الطلبات
                </TabsTrigger>
                {/* <TabsTrigger value="candidates" className="gap-2">
                  <Users className="w-4 h-4" />
                  المرشحون
                </TabsTrigger> */}
                <TabsTrigger value="jobs" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  الوظائف
                </TabsTrigger>
              </TabsList>
              {/* add new job */}
              <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة وظيفة
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-lg max-h-[90vh] overflow-y-auto"
                  dir="rtl"
                >
                  <DialogHeader className="text-right sm:text-right">
                    <DialogTitle className="text-right">
                      إضافة وظيفة جديدة
                    </DialogTitle>
                    <DialogDescription className="text-right">
                      أدخل تفاصيل الوظيفة المطلوبة
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2 text-right">
                      <Label>المسمى الوظيفي *</Label>
                      <Input
                        className="text-right"
                        placeholder="مثال: مطور واجهات أمامية"
                        value={newJob.title}
                        onChange={(e) =>
                          setNewJob({ ...newJob, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 text-right">
                        <Label>القسم *</Label>
                        <Select
                          dir="rtl"
                          onValueChange={(value) =>
                            setNewJob({ ...newJob, department: value })
                          }
                        >
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر القسم" />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="التقنية">التقنية</SelectItem>
                            <SelectItem value="التسويق">التسويق</SelectItem>
                            <SelectItem value="المالية">المالية</SelectItem>
                            <SelectItem value="الإدارة">الإدارة</SelectItem>
                            <SelectItem value="الموارد البشرية">
                              الموارد البشرية
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 text-right">
                        <Label>نوع الدوام *</Label>
                        <Select
                          dir="rtl"
                          onValueChange={(value) =>
                            setNewJob({ ...newJob, type: value })
                          }
                        >
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر النوع" />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="دوام كامل">دوام كامل</SelectItem>
                            <SelectItem value="دوام جزئي">دوام جزئي</SelectItem>
                            <SelectItem value="عن بعد">عن بعد</SelectItem>
                            <SelectItem value="عقد">عقد</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 text-right">
                        <Label>الدولة *</Label>
                        <Select
                          dir="rtl"
                          onValueChange={(value) =>
                            setNewJob({ ...newJob, country: value })
                          }
                        >
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر الدولة" />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="المملكة العربية السعودية">
                              المملكة العربية السعودية
                            </SelectItem>
                            <SelectItem value="الإمارات">الإمارات</SelectItem>
                            <SelectItem value="قطر">قطر</SelectItem>
                            <SelectItem value="الكويت">الكويت</SelectItem>
                            <SelectItem value="مصر">مصر</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 text-right">
                        <Label>المدينة *</Label>
                        <Input
                          className="text-right"
                          placeholder="مثال: الرياض، دبي..."
                          value={newJob.city}
                          onChange={(e) =>
                            setNewJob({ ...newJob, city: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <div className="flex items-center justify-between">
                        <Label>وصف الوظيفة</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!newJob.title) {
                              toast({
                                title: "خطأ",
                                description: "يرجى إدخال المسمى الوظيفي أولاً",
                                variant: "destructive",
                              });
                              return;
                            }
                            setIsGenerating(true);
                            setTimeout(() => {
                              const mockDescription = `نبحث عن ${
                                newJob.title
                              } متميز للانضمام إلى فريقنا${
                                newJob.department
                                  ? ` في قسم ${newJob.department}`
                                  : ""
                              }.

المسؤوليات الرئيسية:
• تطوير وصيانة التطبيقات والأنظمة
• التعاون مع الفريق لتحقيق أهداف المشروع
• المشاركة في مراجعة الكود وتحسين الأداء

المتطلبات:
• خبرة لا تقل عن 3 سنوات في المجال
• مهارات تواصل ممتازة
• القدرة على العمل ضمن فريق

المزايا:
• راتب تنافسي
• تأمين صحي شامل
• بيئة عمل محفزة`;
                              setNewJob({
                                ...newJob,
                                description: mockDescription,
                              });
                              setIsGenerating(false);
                              toast({
                                title: "تم التوليد",
                                description: "تم إنشاء وصف الوظيفة بنجاح",
                              });
                            }, 1500);
                          }}
                          disabled={isGenerating}
                          className="gap-1 h-7 text-xs"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              جاري التوليد...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              توليد بالذكاء الاصطناعي
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        placeholder="اكتب وصفاً تفصيلياً للوظيفة أو استخدم الذكاء الاصطناعي..."
                        value={newJob.description}
                        onChange={(e) =>
                          setNewJob({ ...newJob, description: e.target.value })
                        }
                        className="text-right"
                        rows={6}
                      />
                    </div>
                    <div className="space-y-2 text-right">
                      <Label>المتطلبات</Label>
                      <Textarea
                        placeholder="اكتب متطلبات الوظيفة..."
                        value={newJob.requirements}
                        onChange={(e) =>
                          setNewJob({ ...newJob, requirements: e.target.value })
                        }
                        className="text-right"
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleAddJob} className="w-full">
                      نشر الوظيفة
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader className="text-right">
                <CardTitle className="flex items-center justify-end gap-2">
                  <span>الوظائف المنشورة</span>
                  <Briefcase className="w-5 h-5" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table
                  dir="ltr"
                  className="text-right [&_th]:text-right [&_td]:text-right"
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead>الإجراءات</TableHead>
                      <TableHead>تاريخ النشر</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>عدد الطلبات</TableHead>
                      <TableHead>المدينة</TableHead>
                      <TableHead>الدولة</TableHead>
                      <TableHead>نوع الدوام</TableHead>
                      <TableHead>القسم</TableHead>
                      <TableHead>المسمى الوظيفي</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleJobStatus(job.id)}
                              className={
                                job.status === "active"
                                  ? "text-red-600 border-red-200 hover:bg-red-50 h-8 px-3 text-xs"
                                  : "text-emerald-600 border-emerald-200 hover:bg-emerald-50 h-8 px-3 text-xs"
                              }
                            >
                              {job.status === "active" ? "إيقاف" : "تنشيط"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditJob(job)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {job.postedDate}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              job.status === "active"
                                ? "default"
                                : job.status === "paused"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              job.status === "active"
                                ? "bg-emerald-500 hover:bg-emerald-600"
                                : job.status === "paused"
                                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                                  : ""
                            }
                          >
                            {job.status === "active"
                              ? "نشطة"
                              : job.status === "paused"
                                ? "متوقفة"
                                : "مغلقة"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {job.applications} طلب
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {job.location.split(" - ")[1] || job.location}
                        </TableCell>
                        <TableCell>{job.location.split(" - ")[0]}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ads Tab */}
          <TabsContent value="ads">
            <Card>
              <CardHeader className="text-right">
                <CardTitle className="flex items-center justify-end gap-2">
                  <span>الإعلانات الحالية</span>
                  <Megaphone className="w-5 h-5 text-primary" />
                </CardTitle>
                <CardDescription className="text-right">
                  قائمة الإعلانات المنشورة للموقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                {liveAds.length === 0 ? (
                  <p className="text-muted-foreground text-right">
                    لا توجد إعلانات حالياً
                  </p>
                ) : (
                  <div className="grid gap-2">
                    {liveAds.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between p-2 border rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAd(a.id)}
                            className="text-destructive"
                          >
                            حذف
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-12 rounded overflow-hidden bg-muted">
                            <img
                              src={a.imageUrl}
                              alt={a.title || "ad"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {a.title || "بدون عنوان"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {a.placement === "hero-bottom"
                                ? "تحت الهيرو"
                                : "تحت فحص الـATS"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          {/* <TabsContent value="candidates">
            <Card>
              <CardHeader className="text-right">
                <CardTitle className="flex items-center justify-end gap-2">
                  <span>المرشحون المتوافقون مع وظائفكم</span>
                  <Users className="w-5 h-5" />
                </CardTitle>
                <CardDescription className="text-right">
                  مرشحون تتوافق مهاراتهم مع متطلبات وظائفكم المنشورة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table
                  dir="ltr"
                  className="text-right [&_th]:text-right [&_td]:text-right"
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead>الوظيفة المناسبة</TableHead>
                      <TableHead>الخبرة</TableHead>
                      <TableHead>المهارات</TableHead>
                      <TableHead>نسبة التوافق</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الاسم</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>{candidate.appliedFor}</TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 justify-end">
                            {candidate.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 2}
                              </Badge>
                            )}
                            {candidate.skills.slice(0, 2).map((skill, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 justify-end">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  candidate.matchScore >= 90
                                    ? "bg-emerald-500"
                                    : candidate.matchScore >= 80
                                      ? "bg-primary"
                                      : "bg-amber-500"
                                }`}
                                style={{ width: `${candidate.matchScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {candidate.matchScore}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {candidate.email}
                        </TableCell>
                        <TableCell className="font-medium">
                          <button
                            onClick={() => handleViewCandidate(candidate.id)}
                            className="text-primary hover:underline cursor-pointer font-medium"
                          >
                            {candidate.name}
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent> */}

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    {/* Mobile Filter Button */}
                    <div className="lg:hidden">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 bg-background"
                          >
                            <ListFilter className="w-4 h-4" />
                            <span>تصفية</span>
                            {(appliedFilters.status !== "all" ||
                              appliedFilters.job !== "all" ||
                              appliedFilters.date ||
                              appliedFilters.matchScore !== "all" ||
                              appliedFilters.experience !== "all") && (
                              <Badge
                                variant="secondary"
                                className="mr-1 h-5 px-1 text-[10px] rounded-sm pointer-events-none"
                              >
                                مفعل
                              </Badge>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4" align="end">
                          <div className="space-y-4" dir="rtl">
                            <div className="space-y-2 border-b pb-2">
                              <h4 className="font-medium leading-none">
                                خيارات التصفية
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                قم بتصفية طلبات التوظيف حسب رغبتك
                              </p>
                            </div>
                            <div className="grid gap-3">
                              <div className="space-y-1.5">
                                <Label htmlFor="status" className="text-xs">
                                  الحالة
                                </Label>
                                <Select
                                  value={filterStatus}
                                  onValueChange={setFilterStatus}
                                >
                                  <SelectTrigger
                                    id="status"
                                    dir="rtl"
                                    className="h-8"
                                  >
                                    <SelectValue placeholder="الحالة" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">
                                      كل الحالات
                                    </SelectItem>
                                    <SelectItem value="pending">
                                      قيد المراجعة
                                    </SelectItem>
                                    <SelectItem value="viewed">
                                      تم العرض
                                    </SelectItem>

                                    <SelectItem value="shortlisted">
                                      القائمة المختصرة
                                    </SelectItem>
                                    <SelectItem value="accepted">
                                      مقبول
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                      مرفوض
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor="job" className="text-xs">
                                  الوظيفة
                                </Label>
                                <Select
                                  value={filterJob}
                                  onValueChange={setFilterJob}
                                >
                                  <SelectTrigger
                                    id="job"
                                    dir="rtl"
                                    className="h-8"
                                  >
                                    <SelectValue placeholder="الوظيفة" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">
                                      كل الوظائف
                                    </SelectItem>
                                    {jobs.map((job) => (
                                      <SelectItem
                                        key={job.id}
                                        value={job.title}
                                      >
                                        {job.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor="experience" className="text-xs">
                                  الخبرة
                                </Label>
                                <Select
                                  value={filterExperience}
                                  onValueChange={setFilterExperience}
                                >
                                  <SelectTrigger
                                    id="experience"
                                    dir="rtl"
                                    className="h-8"
                                  >
                                    <SelectValue placeholder="الخبرة" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">الخبرات</SelectItem>
                                    <SelectItem value="no-experience">
                                      بدون خبرة
                                    </SelectItem>
                                    <SelectItem value="less-than-1">
                                      أقل من سنة
                                    </SelectItem>
                                    <SelectItem value="1-3">
                                      1-3 سنوات
                                    </SelectItem>
                                    <SelectItem value="3-5">
                                      3-5 سنوات
                                    </SelectItem>
                                    <SelectItem value="5-10">
                                      5-10 سنوات
                                    </SelectItem>
                                    <SelectItem value="more-than-10">
                                      أكثر من 10 سنوات
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor="date" className="text-xs">
                                  التاريخ
                                </Label>
                                <Input
                                  id="date"
                                  type="date"
                                  value={filterDate}
                                  onChange={(e) =>
                                    setFilterDate(e.target.value)
                                  }
                                  className="h-8"
                                />
                              </div>
                              <Select
                                value={filterMatchScore}
                                onValueChange={setFilterMatchScore}
                              >
                                <SelectTrigger
                                  id="match"
                                  dir="rtl"
                                  className="h-9 flex items-center gap-2 px-3"
                                >
                                  <span className="text-xs font-medium text-foreground/70 whitespace-nowrap">
                                    نسبة التوافق:
                                  </span>
                                  <SelectValue placeholder="الكل" />
                                </SelectTrigger>

                                <SelectContent>
                                  <SelectItem value="all">الكل</SelectItem>
                                  <SelectItem value="90">
                                    90% فما فوق
                                  </SelectItem>
                                  <SelectItem value="80">
                                    80% فما فوق
                                  </SelectItem>
                                  <SelectItem value="70">
                                    70% فما فوق
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="flex-1 gap-2"
                                onClick={handleApplyFilters}
                              >
                                <ListFilter className="w-4 h-4" />
                                تصفية
                              </Button>
                              {(appliedFilters.status !== "all" ||
                                appliedFilters.job !== "all" ||
                                appliedFilters.date ||
                                appliedFilters.matchScore !== "all" ||
                                appliedFilters.experience !== "all") && (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="flex-1 gap-2"
                                  onClick={() => {
                                    setFilterStatus("all");
                                    setFilterJob("all");
                                    setFilterDate("");
                                    setFilterMatchScore("all");
                                    setFilterExperience("all");
                                    setAppliedFilters({
                                      status: "all",
                                      job: "all",
                                      date: "",
                                      matchScore: "all",
                                      experience: "all",
                                    });
                                  }}
                                >
                                  <XCircle className="w-4 h-4" />
                                  مسح
                                </Button>
                              )}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Desktop Filters */}
                    <div className="hidden lg:flex flex-wrap items-center justify-start gap-3 w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 border-r pr-2 mr-2">
                          {(appliedFilters.status !== "all" ||
                            appliedFilters.job !== "all" ||
                            appliedFilters.date ||
                            appliedFilters.matchScore !== "all" ||
                            appliedFilters.experience !== "all") && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setFilterStatus("all");
                                setFilterJob("all");
                                setFilterDate("");
                                setFilterMatchScore("all");
                                setFilterExperience("all");
                                setAppliedFilters({
                                  status: "all",
                                  job: "all",
                                  date: "",
                                  matchScore: "all",
                                  experience: "all",
                                });
                              }}
                              className="h-8 w-[130px] min-w-fit gap-2"
                            >
                              <X className="w-3 h-3" />
                              مسح
                            </Button>
                          )}

                          <Button
                            size="sm"
                            onClick={handleApplyFilters}
                            className="h-8 w-[130px] gap-2"
                          >
                            <ListFilter className="w-3 h-3" />
                            تصفية
                          </Button>
                        </div>

                        <Select
                          value={filterStatus}
                          onValueChange={setFilterStatus}
                        >
                          <SelectTrigger
                            dir="rtl"
                            className="w-[130px] h-8 text-xs"
                          >
                            <SelectValue placeholder="الحالة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">كل الحالات</SelectItem>
                            <SelectItem value="pending">
                              قيد المراجعة
                            </SelectItem>
                            <SelectItem value="viewed">تم العرض</SelectItem>

                            <SelectItem value="shortlisted">
                              القائمة المختصرة
                            </SelectItem>
                            <SelectItem value="accepted">مقبول</SelectItem>
                            <SelectItem value="rejected">مرفوض</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select value={filterJob} onValueChange={setFilterJob}>
                          <SelectTrigger
                            dir="rtl"
                            className="w-[150px] h-8 text-xs"
                          >
                            <SelectValue placeholder="الوظيفة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">كل الوظائف</SelectItem>
                            {jobs.map((job) => (
                              <SelectItem key={job.id} value={job.title}>
                                {job.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={filterExperience}
                          onValueChange={setFilterExperience}
                        >
                          <SelectTrigger
                            dir="rtl"
                            className="w-[140px] h-8 text-xs"
                          >
                            <SelectValue placeholder="الخبرة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">كل الخبرات</SelectItem>
                            <SelectItem value="no-experience">
                              بدون خبرة
                            </SelectItem>
                            <SelectItem value="less-than-1">
                              أقل من سنة
                            </SelectItem>
                            <SelectItem value="1-3">1-3 سنوات</SelectItem>
                            <SelectItem value="3-5">3-5 سنوات</SelectItem>
                            <SelectItem value="5-10">5-10 سنوات</SelectItem>
                            <SelectItem value="more-than-10">
                              أكثر من 10 سنوات
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Input
                          type="date"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                          className="w-[150px] h-8 text-xs"
                        />

                        <Select
                          value={filterMatchScore}
                          onValueChange={setFilterMatchScore}
                        >
                          <SelectTrigger
                            dir="rtl"
                            className="w-fit min-w-[160px] h-8 text-xs flex items-center gap-2 px-3 shadow-none bg-background"
                          >
                            <span className="text-[11px] font-semibold text-foreground/70 whitespace-nowrap">
                              نسبة التوافق:
                            </span>
                            <SelectValue placeholder="الكل" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">الكل</SelectItem>
                            <SelectItem value="90">90% فما فوق</SelectItem>
                            <SelectItem value="80">80% فما فوق</SelectItem>
                            <SelectItem value="70">70% فما فوق</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <CardTitle className="flex items-center gap-2">
                    <span>طلبات التوظيف</span>
                    <FileText className="w-5 h-5" />
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Table
                  dir="ltr"
                  className="text-right [&_th]:text-right [&_td]:text-right"
                >
                  <TableHeader>
                    <TableRow>
                      <TableHead>الإجراءات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>تاريخ التقديم</TableHead>
                      <TableHead>الخبرة</TableHead>
                      <TableHead>نسبة التوافق</TableHead>
                      <TableHead>الوظيفة</TableHead>
                      <TableHead>اسم المتقدم</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell>
                            <div className="flex gap-1 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewApplication(app)}
                                className="gap-2 h-8 px-3"
                              >
                                <Eye className="w-4 h-4" />
                                <span>عرض التفاصيل</span>
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {app.appliedDate}
                          </TableCell>
                          <TableCell className="text-muted-foreground whitespace-nowrap">
                            {(app as any).experience || "بدون خبرة"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                app.matchScore >= 90 ? "default" : "secondary"
                              }
                            >
                              {app.matchScore}%
                            </Badge>
                          </TableCell>
                          <TableCell>{app.jobTitle}</TableCell>
                          <TableCell className="font-medium">
                            <button
                              onClick={() =>
                                handleViewCandidate(app.candidateId)
                              }
                              className="text-primary hover:underline cursor-pointer font-medium"
                            >
                              {app.candidateName}
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center gap-3 text-muted-foreground">
                            <Search className="w-8 h-8 opacity-20" />
                            <p>لا توجد طلبات تطابق معايير البحث</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotion Tab */}
          <TabsContent value="promotion">
            <div className="space-y-6">
              {/* Company Banner (updated - saves as an ad placement) */}
              <Card>
                <CardHeader className="text-right">
                  <CardTitle className="flex items-center justify-end gap-2">
                    <span>بانر الشركة</span>
                    <Image className="w-5 h-5 text-primary" />
                  </CardTitle>
                  <CardDescription className="text-right">
                    قم بإنشاء بانر ترويجي لشركتك يظهر في الصفحة الرئيسية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="h-[600px] sticky top-4">
                      <AdPlacementSelector
                        selectedPlacement={adForm.placement}
                        onSelect={(value) =>
                          setAdForm({ ...adForm, placement: value })
                        }
                        adImage={adForm.imageUrl}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2 text-right">
                        <Label>عنوان البانر</Label>
                        <Input
                          className="text-right"
                          placeholder="مثال: انضم لفريقنا المميز"
                          value={adForm.title}
                          onChange={(e) =>
                            setAdForm({ ...adForm, title: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2 text-right">
                        <Label>صورة البانر</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          className="text-right cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setAdForm({ ...adForm, imageUrl: url });
                            }
                          }}
                        />
                      </div>

                      <div className="space-y-2 text-right">
                        <Label>المدة</Label>
                        <Select
                          value={adForm.duration}
                          onValueChange={(value) =>
                            setAdForm({ ...adForm, duration: value })
                          }
                        >
                          <SelectTrigger dir="rtl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="1_month">
                              شهر (1500 ر.س)
                            </SelectItem>
                            <SelectItem value="2_months">
                              شهرين (2800 ر.س)
                            </SelectItem>
                            <SelectItem value="3_months">
                              3 أشهر (4000 ر.س)
                            </SelectItem>
                            <SelectItem value="6_months">
                              6 أشهر (7500 ر.س)
                            </SelectItem>
                            <SelectItem value="1_year">
                              سنة (14000 ر.س)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          مدة عرض الإعلان بالأشهر
                        </p>
                      </div>

                      <div className="space-y-2 text-right">
                        <Label>رابط الوجهة عند النقر (اختياري)</Label>
                        <Input
                          className="text-right"
                          dir="ltr"
                          placeholder="https://"
                          value={adForm.link}
                          onChange={(e) =>
                            setAdForm({ ...adForm, link: e.target.value })
                          }
                        />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button onClick={handleAddAd} className="gap-2 w-full">
                          <Megaphone className="w-4 h-4" />
                          طلب البانر
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ads Management moved to its own tab */}

              {/* Featured Jobs */}
              <Card>
                <CardHeader className="text-right">
                  <CardTitle className="flex items-center justify-end gap-2">
                    <span>الوظائف المميزة</span>
                    <Star className="w-5 h-5 text-amber-500" />
                  </CardTitle>
                  <CardDescription className="text-right">
                    اختر الوظائف التي تريد إبرازها في أعلى قائمة البحث
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table
                    dir="ltr"
                    className="text-right [&_th]:text-right [&_td]:text-right"
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead>مميزة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>القسم</TableHead>
                        <TableHead>الوظيفة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs
                        .filter((j) => j.status === "active")
                        .map((job) => {
                          const isFeatured = featuredJobs.some(
                            (f) => f.id === job.id,
                          );
                          return (
                            <TableRow key={job.id}>
                              <TableCell>
                                <div className="flex justify-end">
                                  <Button
                                    variant={isFeatured ? "outline" : "default"}
                                    size="sm"
                                    onClick={() => handleToggleFeatured(job.id)}
                                    className="gap-1"
                                  >
                                    <Star
                                      className={`w-4 h-4 ${
                                        isFeatured ? "" : "fill-current"
                                      }`}
                                    />
                                    {isFeatured ? "إلغاء التمييز" : "تمييز"}
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                {isFeatured ? (
                                  <Badge className="gap-1 bg-amber-500">
                                    <Star className="w-3 h-3" />
                                    مميزة
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">عادية</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                                >
                                  نشطة
                                </Badge>
                              </TableCell>
                              <TableCell>{job.department}</TableCell>
                              <TableCell className="font-medium">
                                {job.title}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        {/* Edit Job Dialog */}
        <Dialog open={isEditJobOpen} onOpenChange={setIsEditJobOpen}>
          <DialogContent
            className="max-w-lg max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            <DialogHeader className="text-right sm:text-right">
              <DialogTitle className="text-right">تعديل الوظيفة</DialogTitle>
              <DialogDescription className="text-right">
                قم بتحديث بيانات الوظيفة
              </DialogDescription>
            </DialogHeader>
            <JobForm
              mode="edit"
              initialData={editJob}
              onSubmit={handleSaveEditData}
              submitLabel="حفظ التغييرات"
            />
          </DialogContent>
        </Dialog>
        {/* View Application Dialog */}
        <Dialog
          open={isViewApplicationOpen}
          onOpenChange={setIsViewApplicationOpen}
        >
          <DialogContent
            className="max-w-3xl max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            <DialogHeader>
              <DialogTitle className="text-right">
                تفاصيل طلب التوظيف
              </DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <Tabs defaultValue="details" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="cover-letter">خطاب التقديم</TabsTrigger>
                  <TabsTrigger value="cv">السيرة الذاتية (CV)</TabsTrigger>
                  <TabsTrigger value="details">التفاصيل</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 text-right">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(selectedApplication.status)}
                    <div>
                      <h3 className="font-bold text-lg">
                        {selectedApplication.candidateName}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedApplication.jobTitle}
                      </p>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-2 gap-2 py-2">
                    <p className="text-sm text-muted-foreground">
                      المهارات والخبرات
                    </p>
                    <div className="flex flex-wrap gap-2 py-2">
                      {candidates
                        .find((c) => c.id === selectedApplication.candidateId)
                        ?.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="px-3 py-1 bg-primary/10 text-primary border-primary/20"
                          >
                            {skill}
                          </Badge>
                        ))}
                      <Badge variant="outline" className="px-3 py-1">
                        {(selectedApplication as any).experience || "بدون خبرة"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        تاريخ التقديم
                      </p>
                      <p className="font-medium">
                        {selectedApplication.appliedDate}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        نسبة التوافق
                      </p>
                      <p className="font-bold text-lg">
                        {selectedApplication.matchScore}%
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() =>
                      handleViewCandidate(selectedApplication.candidateId)
                    }
                  >
                    <Users className="w-4 h-4" />
                    عرض الملف الشخصي الكامل للمرشح
                  </Button>

                  {selectedApplication.status === "rejected" &&
                    selectedApplication.rejectionReason && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-lg space-y-2">
                        <p className="text-sm font-bold text-red-700">
                          سبب الرفض:
                        </p>
                        <p className="text-sm text-red-600 italic">
                          "{selectedApplication.rejectionReason}"
                        </p>
                      </div>
                    )}

                  {(selectedApplication.status === "shortlisted" ||
                    pendingAction === "shortlisted") && (
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg space-y-3">
                      <Label className="text-amber-800 font-bold">
                        ملاحظات الشركة عن المرشح:
                      </Label>
                      <Textarea
                        placeholder="أضف ملاحظاتك هنا..."
                        className="bg-white border-amber-200 focus:ring-amber-500"
                        value={notesInput}
                        onChange={(e) => setNotesInput(e.target.value)}
                      />
                    </div>
                  )}

                  {(selectedApplication.status === "pending" ||
                    selectedApplication.status === "viewed" ||
                    selectedApplication.status === "reviewed" ||
                    selectedApplication.status === "shortlisted") && (
                    <div className="flex flex-col gap-3 pt-4 border-t">
                      {/* Optional Rejection Reason Input */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground mr-1">
                          سبب الرفض (اختياري - يظهر فقط في حال الرفض):
                        </Label>
                        <Input
                          placeholder="مثال: الخبرة غير كافية..."
                          className="h-8 text-xs bg-muted/20"
                          value={rejectionReasonInput}
                          onChange={(e) =>
                            setRejectionReasonInput(e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          إجراءات الطلب:
                        </Label>
                        <Select
                          value={pendingAction || ""}
                          onValueChange={(value) => {
                            setPendingAction(value);
                          }}
                        >
                          <SelectTrigger className="w-full h-10 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                            <SelectValue placeholder="اختر إجراءً للطلب..." />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem
                              value="accepted"
                              className="text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50 cursor-pointer"
                            >
                              <div className="flex items-center gap-2 py-1">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-medium">قبول الطلب</span>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="rejected"
                              className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                            >
                              <div className="flex items-center gap-2 py-1">
                                <XCircle className="w-4 h-4" />
                                <span className="font-medium">رفض الطلب</span>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="shortlisted"
                              className="text-amber-600 focus:text-amber-700 focus:bg-amber-50 cursor-pointer"
                            >
                              <div className="flex items-center gap-2 py-1">
                                <Star className="w-4 h-4" />
                                <span className="font-medium">
                                  إضافة للقائمة المختصرة
                                </span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => {
                          if (pendingAction) {
                            const additionalData =
                              pendingAction === "rejected"
                                ? { rejectionReason: rejectionReasonInput }
                                : {};
                            handleUpdateApplicationStatus(
                              selectedApplication.id,
                              pendingAction,
                              additionalData,
                            );
                            if (
                              pendingAction === "accepted" ||
                              pendingAction === "rejected"
                            ) {
                              setIsViewApplicationOpen(false);
                            }
                            setPendingAction(null);
                          } else {
                            // Just save notes and rejection reason without changing status
                            handleUpdateApplicationStatus(
                              selectedApplication.id,
                              selectedApplication.status,
                              {
                                rejectionReason: rejectionReasonInput,
                                notes: notesInput,
                              },
                            );
                          }
                        }}
                      >
                        <Download className="w-4 h-4" />
                        {pendingAction ? "تأكيد الإجراء وحفظ" : "حفظ"}
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="cv" className="space-y-4">
                  <div className="bg-muted/30 border rounded-xl p-4 min-h-[500px] flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <Button variant="outline" size="sm" className="gap-2 h-8">
                        <Download className="w-3 h-3" />
                        تحميل
                      </Button>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">
                          CV_
                          {selectedApplication.candidateName.replace(" ", "_")}
                          .pdf
                        </span>
                      </div>
                    </div>

                    {/* CV Document Skeleton Preview */}
                    <div className="flex-1 bg-background rounded-lg border shadow-sm p-8 space-y-6">
                      <div className="flex justify-between items-start border-b pb-6">
                        <div className="space-y-2">
                          <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-32 bg-muted/60 rounded animate-pulse" />
                        </div>
                        <div className="h-16 w-16 bg-muted rounded-full animate-pulse" />
                      </div>

                      <div className="space-y-4">
                        <div className="h-4 w-24 bg-primary/20 rounded mb-2" />
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-muted/40 rounded" />
                          <div className="h-3 w-full bg-muted/40 rounded" />
                          <div className="h-3 w-2/3 bg-muted/40 rounded" />
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="h-4 w-32 bg-primary/20 rounded mb-2" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="h-3 w-4/5 bg-muted/40 rounded" />
                            <div className="h-3 w-3/4 bg-muted/40 rounded" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 w-4/5 bg-muted/40 rounded" />
                            <div className="h-3 w-3/4 bg-muted/40 rounded" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 text-center border-t border-dashed">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                          Candidate Resume Preview
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cover-letter" className="space-y-4">
                  <div className="bg-muted/30 border rounded-xl p-4 min-h-[500px] flex flex-col">
                    <div className="bg-background rounded-lg border shadow-sm p-10 flex-1 flex flex-col">
                      <div className="mb-8 border-b pb-6">
                        <h4 className="text-xl font-bold text-primary mb-1 text-right">
                          خطاب التقديم
                        </h4>
                        <p className="text-sm text-muted-foreground text-right">
                          تاريخ التقديم: {selectedApplication.appliedDate}
                        </p>
                      </div>

                      <div className="flex-1 text-right">
                        <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/80 font-serif text-right">
                          السادة المحترمين في فريق التوظيف،{"\n\n"}
                          أتقدم إليكم بطلب للانضمام إلى فريقكم الموقر في وظيفة{" "}
                          {selectedApplication.jobTitle}.{"\n\n"}
                          لدي شغف كبير وخبرة عملية في هذا المجال، وأتطلع بحماس
                          للمساهمة في تحقيق أهداف شركتكم. لقد تابعت إنجازات
                          شركتكم بإعجاب، وأرى أن مهاراتي تتناسب تماماً مع
                          متطلبات الوظيفة المعلنة.{"\n\n"}
                          خلال مسيرتي المهنية، قمت بالعديد من المشاريع الناجحة
                          التي أثبتت قدرتي على العمل الجاد والالتزام بأعلى
                          معايير الجودة. I believe strongly in teamwork and
                          continuous improvement.{"\n\n"}
                          أتطلع لمناقشة كيف يمكنني أن أكون إضافة قيمة لفريقكم.
                          {"\n\n"}
                          مع خالص التحية والتقدير،{"\n\n"}
                          <span className="font-bold text-lg text-primary block text-right">
                            {selectedApplication.candidateName}
                          </span>
                        </p>
                      </div>

                      <div className="mt-12 pt-6 border-t border-dashed flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest">
                        <span>CareerBook Platform Verified</span>
                        <span>Ref: APP-{selectedApplication.id}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </main>

      {/* Mobile Navigation */}
      <MobileTabsMenu activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default CompanyDashboard;
