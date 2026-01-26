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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import useAds, { AdPlacement } from "@/hooks/use-ads";
import {
  Briefcase,
  Plus,
  Users,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Edit,
  Sparkles,
  Image,
  Star,
  Megaphone,
  Loader2,
  X,
  Search,
  ListFilter,
  Download,
  Crown,
  CreditCard,
  Building2,
} from "lucide-react";

import { CompanyDashboardLayout } from "@/components/layout/CompanyDashboardLayout";
import { AdPlacementSelector } from "@/components/dashboard/AdPlacementSelector";
import { StatCard } from "@/components/dashboard/StatCard";
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

  // Ads management
  // Ads management
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
  const [adToDelete, setAdToDelete] = useState<string | null>(null);
  const [companyInfo, setCompanyInfo] = useState({
    name: user?.companyName || "تيك سوليوشنز",
    email: user?.email || "contact@techsolutions.com",
    phone: "0501234567",
    website: "www.techsolutions.com",
    bio: "شركة رائدة في مجال حلول البرمجيات والذكاء الاصطناعي، نسعى دائماً للابتكار وتقديم أفضل الخدمات لعملائنا.",
    location: "السعودية، الرياض",
    logo: "",
  });
  const [isEditingSettings, setIsEditingSettings] = useState(false);

  // Filters for Applications
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterMatchScore, setFilterMatchScore] = useState<string>("all");
  const [filterJob, setFilterJob] = useState<string>("all");
  const [filterExperience, setFilterExperience] = useState<string>("all");

  // Applied filters state
  // Applied filters state
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
    if (appliedFilters.status !== "all" && app.status !== appliedFilters.status)
      return false;
    if (appliedFilters.job !== "all" && app.jobTitle !== appliedFilters.job)
      return false;
    if (appliedFilters.date && app.appliedDate !== appliedFilters.date)
      return false;
    if (
      appliedFilters.matchScore !== "all" &&
      app.matchScore < parseInt(appliedFilters.matchScore)
    )
      return false;
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
      description: data.description,
      requirements: data.requirements,
    };

    setJobs([...jobs, job]);
    toast({ title: "تم إضافة الوظيفة", description: "تم نشر الوظيفة بنجاح" });
    toast({ title: "تم إضافة الوظيفة", description: "تم نشر الوظيفة بنجاح" });
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
    setPendingAction(null);
    setPendingAction(null);
    setIsViewApplicationOpen(true);
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockDescription = `نبحث عن ${jobGenTitle} متميز للانضمام إلى فريقنا في قسم ${jobGenDepartment || "التقنية"}.

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
    toast({ title: "تم التوليد", description: "تم إنشاء وصف الوظيفة بنجاح" });
  };

  const handleCopyDescription = () => {
    navigator.clipboard.writeText(generatedDescription);
    toast({ title: "تم النسخ", description: "تم نسخ الوصف إلى الحافظة" });
    toast({ title: "تم النسخ", description: "تم نسخ الوصف إلى الحافظة" });
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

  const handleAddAd = () => {
    if (!adForm.imageUrl) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رابط صورة البانر",
        variant: "destructive",
      });
      return;
    }

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
    }

    const adRequestData = {
      title: adForm.title || "بدون عنوان",
      description: adForm.description || "",
      imageUrl: adForm.imageUrl,
      link: adForm.link || "",
      placement: adForm.placement as AdPlacement,
      enabled: false,
      status: "pending",

      companyName: user?.companyName || "شركة تجريبية",
      date: new Date().toISOString().split("T")[0],
      price: price,
      duration: durationLabel,
      type: "بنر إعلاني",
    };

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

  // ========== RENDER FUNCTIONS ==========

  // ========== RENDER FUNCTIONS ==========

  const renderOverview = () => (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setActiveTab("jobs")}
        >
          <CardContent className="pt-6 text-center">
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">إدارة الوظائف</h3>
            <p className="text-sm text-muted-foreground">
              عرض وتعديل الوظائف المنشورة
            </p>
          </CardContent>
        </Card>
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setActiveTab("applications")}
        >
          <CardContent className="pt-6 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">طلبات التوظيف</h3>
            <p className="text-sm text-muted-foreground">
              مراجعة طلبات المتقدمين
            </p>
          </CardContent>
        </Card>
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setIsAddJobOpen(true)}
        >
          <CardContent className="pt-6 text-center">
            <Plus className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">إضافة وظيفة</h3>
            <p className="text-sm text-muted-foreground">نشر وظيفة جديدة</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
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
      <Card>
        <CardHeader className="text-right">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>الوظائف المنشورة</span>
            </CardTitle>
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
                            const mockDescription = `نبحث عن ${newJob.title} متميز للانضمام إلى فريقنا${newJob.department ? ` في قسم ${newJob.department}` : ""}.

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
                            ? "text-destructive border-destructive/20 hover:bg-destructive/5 h-8 px-3 text-xs"
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
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80 transition-colors"
                      onClick={() => {
                        setFilterJob(job.title);
                        setAppliedFilters({
                          status: "all",
                          date: "",
                          matchScore: "all",
                          experience: "all",
                          job: job.title,
                        });
                        setActiveTab("applications");
                      }}
                    >
                      {job.applications} طلب
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {job.location.split(" - ")[1] || job.location}
                  </TableCell>
                  <TableCell>{job.location.split(" - ")[0]}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
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
      <Card>
        <CardHeader className="text-right">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-4 w-full">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Mobile Filter Button */}
              <div className="md:hidden">
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
                        appliedFilters.matchScore !== "all") && (
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
                            <SelectTrigger id="status" className="h-8">
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
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="job" className="text-xs">
                            الوظيفة
                          </Label>
                          <Select
                            value={filterJob}
                            onValueChange={setFilterJob}
                          >
                            <SelectTrigger id="job" className="h-8">
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
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="date" className="text-xs">
                            التاريخ
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="match" className="text-xs">
                            نسبة التوافق
                          </Label>
                          <Select
                            value={filterMatchScore}
                            onValueChange={setFilterMatchScore}
                          >
                            <SelectTrigger id="match" className="h-8">
                              <SelectValue placeholder="نسبة التوافق" />
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
                          appliedFilters.matchScore !== "all") && (
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
              <div className="hidden md:flex flex-wrap items-center justify-start gap-3 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <Select
                    dir="rtl"
                    value={filterStatus}
                    onValueChange={setFilterStatus}
                  >
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                      <SelectValue placeholder="الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الحالات</SelectItem>
                      <SelectItem value="pending">قيد المراجعة</SelectItem>
                      <SelectItem value="viewed">تم العرض</SelectItem>
                      <SelectItem value="shortlisted">
                        القائمة المختصرة
                      </SelectItem>
                      <SelectItem value="accepted">مقبول</SelectItem>
                      <SelectItem value="rejected">مرفوض</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    dir="rtl"
                    value={filterJob}
                    onValueChange={setFilterJob}
                  >
                    <SelectTrigger className="w-[150px] h-8 text-xs">
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

                  <Input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-[150px] h-8 text-xs"
                  />

                  <Select
                    dir="rtl"
                    value={filterMatchScore}
                    onValueChange={setFilterMatchScore}
                  >
                    <SelectTrigger className="h-8 text-xs gap-2 w-[200px]">
                      <span className="text-muted-foreground whitespace-nowrap">
                        نسبة التوافق:
                      </span>
                      <SelectValue placeholder="نسبة التوافق" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="90">90% فما فوق</SelectItem>
                      <SelectItem value="80">80% فما فوق</SelectItem>
                      <SelectItem value="70">70% فما فوق</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2 border-r pr-2 mr-2">
                    {(appliedFilters.status !== "all" ||
                      appliedFilters.job !== "all" ||
                      appliedFilters.date ||
                      appliedFilters.matchScore !== "all") && (
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
                </div>
              </div>
            </div>

            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>طلبات التوظيف</span>
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
                <TableHead>نسبة التوافق</TableHead>
                <TableHead>مدة الخبرة</TableHead>
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
                    <TableCell>
                      <Badge
                        variant={app.matchScore >= 90 ? "default" : "secondary"}
                      >
                        {app.matchScore}%
                      </Badge>
                    </TableCell>
                    <TableCell>{app.experience}</TableCell>
                    <TableCell>{app.jobTitle}</TableCell>
                    <TableCell className="font-medium">
                      <button
                        onClick={() => handleViewCandidate(app.candidateId)}
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
    </div>
  );

  const renderPromotion = () => (
    <div className="space-y-6">
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
      <Card>
        <CardHeader className="text-right">
          <CardTitle className="flex items-center gap-2">
            <span>بانر الشركة</span>
            <Image className="w-5 h-5 text-primary" />
          </CardTitle>
          <CardDescription className="text-right">
            قم بإنشاء بانر ترويجي لشركتك يظهر في الصفحة الرئيسية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
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
                    <SelectItem value="1_month">شهر (1500 ر.س)</SelectItem>
                    <SelectItem value="2_months">شهرين (2800 ر.س)</SelectItem>
                    <SelectItem value="3_months">3 أشهر (4000 ر.س)</SelectItem>
                    <SelectItem value="6_months">6 أشهر (7500 ر.س)</SelectItem>
                    <SelectItem value="1_year">سنة (14000 ر.س)</SelectItem>
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

            <div className="h-[600px] sticky top-4">
              <AdPlacementSelector
                selectedPlacement={adForm.placement}
                onSelect={(value) => setAdForm({ ...adForm, placement: value })}
                adImage={adForm.imageUrl}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-right">
          <CardTitle className="flex items-center gap-2">
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
                  const isFeatured = featuredJobs.some((f) => f.id === job.id);
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
                              className={`w-4 h-4 ${isFeatured ? "" : "fill-current"}`}
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
                      <TableCell className="font-medium">{job.title}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderAds = () => (
    <div className="space-y-6">
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
      <Card>
        <CardHeader className="text-right">
          <CardTitle className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAdToDelete(String(a.id))}
                      className="text-destructive"
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={!!adToDelete}
        onOpenChange={(open) => !open && setAdToDelete(null)}
      >
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader className="text-right sm:text-right">
            <AlertDialogTitle className="text-right">
              هل أنت متأكد من حذف هذا الإعلان؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              لا يمكن التراجع عن هذا الإجراء بعد الحذف.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-end gap-2">
            <AlertDialogCancel onClick={() => setAdToDelete(null)}>
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (adToDelete) handleRemoveAd(adToDelete as any);
                setAdToDelete(null);
              }}
              className="bg-red-600 hover:bg-red-700 mx-0"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  const renderGenerator = () => (
    <Card>
      <CardHeader className="text-right">
        <CardTitle className="flex items-center gap-2">
          <span>مولد الوصف الوظيفي</span>
          <Sparkles className="w-5 h-5 text-primary" />
        </CardTitle>
        <CardDescription className="text-right">
          استخدم الذكاء الاصطناعي لتوليد وصف وظيفي احترافي
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2 text-right">
            <Label>المسمى الوظيفي *</Label>
            <Input
              className="text-right"
              placeholder="مثال: مطور واجهات أمامية"
              value={jobGenTitle}
              onChange={(e) => setJobGenTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2 text-right">
            <Label>القسم</Label>
            <Input
              className="text-right"
              placeholder="مثال: التقنية"
              value={jobGenDepartment}
              onChange={(e) => setJobGenDepartment(e.target.value)}
            />
          </div>
          <div className="space-y-2 text-right">
            <Label>سنوات الخبرة</Label>
            <Input
              className="text-right"
              placeholder="مثال: 3+"
              value={jobGenExperience}
              onChange={(e) => setJobGenExperience(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleGenerateDescription}
          disabled={isGenerating}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري التوليد...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              توليد الوصف
            </>
          )}
        </Button>

        {generatedDescription && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyDescription}
                className="gap-1"
              >
                نسخ
              </Button>
              <Label>الوصف المُولَّد</Label>
            </div>
            <Textarea
              value={generatedDescription}
              readOnly
              className="text-right min-h-[300px]"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderSubscription = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 border-primary/20 bg-primary/5">
          <CardHeader className="text-right">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold">باقة الشركات الإحترافية</h3>
                  <p className="text-sm text-muted-foreground">
                    خطة نشطة حالياً
                  </p>
                </div>
              </div>
              <Badge className="bg-emerald-500">نشط</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded-xl border border-border/50 text-right">
                <p className="text-sm text-muted-foreground mb-1">
                  تاريخ التجديد القادم
                </p>
                <p className="font-bold">20 فبراير 2026</p>
              </div>
              <div className="bg-background/50 p-4 rounded-xl border border-border/50 text-right">
                <p className="text-sm text-muted-foreground mb-1">
                  قيمة الاشتراك
                </p>
                <p className="font-bold">599 ر.س / شهرياً</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-right">
                مميزات الباقة الحالية:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "نشر وظائف غير محدودة",
                  "فلترة متقدمة للمرشحين بال AI",
                  "بانر مخصص للشركة في الصفحة الرئيسية",
                  "دعم فني مخصص 24/7",
                  "تقارير تحليلية مفصلة",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-start gap-2 text-right text-sm"
                  >
                    <span>{feature}</span>
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between border-dashed border-2">
          <CardHeader className="text-right">
            <CardTitle className="text-lg">هل تحتاج لمميزات أكثر؟</CardTitle>
            <CardDescription className="text-right">
              {" "}
              قم بترقية حسابك للوصول لمميزات Enterprise والربط البرمجي الكامل
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end gap-4">
            <div className="p-4 bg-muted/50 rounded-lg text-right text-sm">
              تواصل معنا للحصول على عرض سعر مخصص للمنظمات الكبيرة
            </div>
            <Button
              className="w-full gap-2 h-12 text-lg font-bold"
              onClick={() =>
                (window.location.href = "http://localhost:8080/subscription")
              }
            >
              <Sparkles className="w-5 h-5 fill-current" />
              ترقية الباقة
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="text-right">
          <CardTitle className="text-lg">سجل العمليات المالية</CardTitle>
        </CardHeader>
        <CardContent>
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">الوصف</TableHead>
                <TableHead className="text-right">رقم الفاتورة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "INV-001",
                  desc: "تجديد اشتراك شهري - باقة احترافية",
                  date: "2024-01-20",
                  amount: "599 ر.س",
                },
                {
                  id: "INV-002",
                  desc: "تجديد اشتراك شهري - باقة احترافية",
                  date: "2023-12-20",
                  amount: "599 ر.س",
                },
              ].map((inv) => (
                <TableRow key={inv.id}>
                  <TableHead className="font-bold">{inv.amount}</TableHead>
                  <TableCell className="text-muted-foreground">
                    {inv.date}
                  </TableCell>
                  <TableCell>{inv.desc}</TableCell>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const handleSaveSettings = () => {
    setIsEditingSettings(false);
    toast({
      title: "تم الحفظ",
      description: "تم تحديث بيانات الشركة بنجاح",
    });
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader className="text-right">
          <CardTitle className="flex items-center justify-start gap-2">
            <span>بيانات الشركة</span>
            <Building2 className="w-5 h-5 text-primary" />
          </CardTitle>
          <CardDescription className="text-right">
            إدارة معلومات شركتك والهوية البصرية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-8 pb-6 border-b">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-primary/20 overflow-hidden">
                {companyInfo.logo ? (
                  <img
                    src={companyInfo.logo}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-primary/40" />
                )}
              </div>
              {isEditingSettings && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="flex flex-col items-center gap-1">
                    <Plus className="w-6 h-6" />
                    <span className="text-[10px] font-bold">تغيير الشعار</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setCompanyInfo({
                            ...companyInfo,
                            logo: reader.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
            <div className="flex-1 text-right space-y-1">
              <h3 className="text-xl font-bold">{companyInfo.name}</h3>
              <p className="text-sm text-muted-foreground">
                قم بتحديث شعار شركتك ليظهر في إعلانات الوظائف والملف الشخصي
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 text-right">
              <Label htmlFor="company-name">اسم الشركة</Label>
              <Input
                id="company-name"
                value={companyInfo.name}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, name: e.target.value })
                }
                className="text-right"
                disabled={!isEditingSettings}
              />
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="company-email">البريد الإلكتروني للشركة</Label>
              <Input
                id="company-email"
                type="email"
                value={companyInfo.email}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, email: e.target.value })
                }
                className="text-left"
                dir="ltr"
                disabled={!isEditingSettings}
              />
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="company-phone">رقم الهاتف</Label>
              <Input
                id="company-phone"
                value={companyInfo.phone}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, phone: e.target.value })
                }
                className="text-left"
                dir="ltr"
                disabled={!isEditingSettings}
              />
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="company-website">الموقع الإلكتروني</Label>
              <Input
                id="company-website"
                value={companyInfo.website}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, website: e.target.value })
                }
                className="text-left"
                dir="ltr"
                disabled={!isEditingSettings}
              />
            </div>
          </div>

          <div className="space-y-2 text-right">
            <Label htmlFor="company-bio">نبذة عن الشركة</Label>
            <Textarea
              id="company-bio"
              value={companyInfo.bio}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, bio: e.target.value })
              }
              rows={4}
              className="text-right"
              disabled={!isEditingSettings}
            />
          </div>

          <div className="flex justify-start pt-4 gap-3">
            {isEditingSettings ? (
              <>
                <Button onClick={handleSaveSettings} className="gap-2">
                  <CheckCircle className="w-4 h-4" />
                  حفظ التغييرات
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingSettings(false)}
                >
                  إلغاء
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditingSettings(true)}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                تعديل البيانات
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ========== MAIN RENDER ==========

  return (
    <CompanyDashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-6">
        {activeTab === "jobs" && renderJobs()}
        {activeTab === "applications" && renderApplications()}
        {activeTab === "promotion" && renderPromotion()}
        {activeTab === "ads" && renderAds()}
        {activeTab === "subscription" && renderSubscription()}
        {activeTab === "settings" && renderSettings()}

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

                  <div className="space-y-2 pt-2">
                    <Label className="text-base font-semibold">المهارات</Label>
                    <div className="flex flex-wrap gap-2">
                      {candidates
                        .find((c) => c.id === selectedApplication.candidateId)
                        ?.skills?.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                          >
                            {skill}
                          </Badge>
                        ))}
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
                          onValueChange={(value) => setPendingAction(value)}
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
                          معايير الجودة.{"\n\n"}
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
      </div>
    </CompanyDashboardLayout>
  );
};

export default CompanyDashboard;
