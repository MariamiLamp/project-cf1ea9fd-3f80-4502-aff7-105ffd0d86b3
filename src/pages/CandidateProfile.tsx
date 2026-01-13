import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
  Calendar,
  Award,
  Target,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  FileEdit,
  Building,
  Sparkles,
  Loader2,
  Copy,
  Check,
  PenTool,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Mock candidates data (should be shared or fetched from API)
const candidatesData = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@email.com",
    phone: "0501234567",
    location: "الرياض",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Git"],
    experience: "5 سنوات",
    appliedFor: "مطور واجهات أمامية",
    education: "بكالوريوس علوم حاسب",
    summary:
      "مطور واجهات أمامية متمرس مع خبرة في بناء تطبيقات ويب حديثة باستخدام React و TypeScript. لدي شغف لتصميم تجارب مستخدم متميزة وتطوير حلول تقنية مبتكرة.",
    workHistory: [
      {
        title: "مطور واجهات أمامية أول",
        company: "شركة التقنية المتقدمة",
        period: "2021 - الحالي",
        description: "قيادة فريق تطوير الواجهات الأمامية وتطوير تطبيقات React",
      },
      {
        title: "مطور واجهات أمامية",
        company: "شركة الحلول الرقمية",
        period: "2019 - 2021",
        description: "تطوير واجهات مستخدم تفاعلية باستخدام React و Vue",
      },
    ],
    educationHistory: [
      {
        degree: "بكالوريوس علوم حاسب",
        institution: "جامعة الملك سعود",
        year: "2019",
      },
    ],
    certifications: [
      "AWS Certified Developer",
      "React Professional Certificate",
    ],
    languages: ["العربية (اللغة الأم)", "الإنجليزية (متقدم)"],
    cvFile: {
      name: "Ahmed_Mohamed_CV.pdf",
      size: "245 KB",
      uploadDate: "2024-01-15",
    },
    appliedJobs: [
      {
        id: 1,
        title: "مطور واجهات أمامية",
        company: "شركة التقنية المتقدمة",
        status: "pending",
        appliedDate: "2024-03-10",
      },
      {
        id: 2,
        title: "مطور React أول",
        company: "شركة الحلول الرقمية",
        status: "accepted",
        appliedDate: "2024-02-28",
      },
      {
        id: 3,
        title: "مهندس برمجيات",
        company: "شركة البرمجيات العربية",
        status: "rejected",
        appliedDate: "2024-02-15",
      },
    ],
    coverLetter:
      "أنا مطور واجهات أمامية متحمس ولدي خبرة تزيد عن 5 سنوات في بناء تطبيقات ويب حديثة وقابلة للتطوير. أتقن React و TypeScript وأسعى دائماً لتقديم تجارب مستخدم استثنائية. أبحث عن فرصة للانضمام إلى فريق مبتكر حيث يمكنني المساهمة بمهاراتي وتطوير قدراتي المهنية.",
  },
  {
    id: 2,
    name: "سارة علي",
    email: "sara@email.com",
    phone: "0509876543",
    location: "جدة",
    matchScore: 88,
    skills: ["Python", "SQL", "Tableau", "Power BI", "Machine Learning"],
    experience: "3 سنوات",
    appliedFor: "محلل بيانات",
    education: "ماجستير تحليل بيانات",
    summary:
      "محللة بيانات مع خبرة في استخراج الرؤى من البيانات الضخمة وتقديم توصيات استراتيجية للأعمال. متخصصة في التعلم الآلي وتصور البيانات.",
    workHistory: [
      {
        title: "محللة بيانات",
        company: "شركة البيانات الذكية",
        period: "2021 - الحالي",
        description: "تحليل البيانات الضخمة وإنشاء لوحات معلومات تفاعلية",
      },
      {
        title: "محللة بيانات مبتدئة",
        company: "بنك الرياض",
        period: "2020 - 2021",
        description: "دعم فريق التحليلات في إعداد التقارير",
      },
    ],
    educationHistory: [
      {
        degree: "ماجستير تحليل بيانات",
        institution: "جامعة الملك عبدالعزيز",
        year: "2020",
      },
      {
        degree: "بكالوريوس إحصاء",
        institution: "جامعة الملك عبدالعزيز",
        year: "2018",
      },
    ],
    certifications: [
      "Google Data Analytics Certificate",
      "Tableau Desktop Specialist",
    ],
    languages: ["العربية (اللغة الأم)", "الإنجليزية (متقدم)"],
    cvFile: {
      name: "Sara_Ali_CV.pdf",
      size: "312 KB",
      uploadDate: "2024-02-20",
    },
    appliedJobs: [
      {
        id: 4,
        title: "محلل بيانات",
        company: "شركة البيانات الذكية",
        status: "accepted",
        appliedDate: "2024-03-05",
      },
    ],
    coverLetter:
      "محللة بيانات شغوفة بتحويل البيانات إلى رؤى قابلة للتنفيذ. لدي خبرة في التعلم الآلي وتصور البيانات وأسعى للمساهمة في نجاح مؤسستكم.",
  },
  {
    id: 3,
    name: "محمد خالد",
    email: "mohamed@email.com",
    phone: "0551112233",
    location: "الرياض",
    matchScore: 82,
    skills: ["React", "Vue", "CSS", "SASS", "JavaScript"],
    experience: "4 سنوات",
    appliedFor: "مطور واجهات أمامية",
    education: "بكالوريوس هندسة برمجيات",
    summary:
      "مطور واجهات مع شغف لتصميم تجارب مستخدم متميزة وبناء مواقع وتطبيقات سريعة ومتجاوبة.",
    workHistory: [
      {
        title: "مطور واجهات أمامية",
        company: "وكالة ديجيتال",
        period: "2020 - الحالي",
        description: "تطوير مواقع ويب للعملاء باستخدام React و Vue",
      },
      {
        title: "مطور ويب",
        company: "شركة ناشئة",
        period: "2019 - 2020",
        description: "تطوير وصيانة مواقع الويب",
      },
    ],
    educationHistory: [
      {
        degree: "بكالوريوس هندسة برمجيات",
        institution: "جامعة الأمير سلطان",
        year: "2019",
      },
    ],
    certifications: ["Meta Front-End Developer Certificate"],
    languages: ["العربية (اللغة الأم)", "الإنجليزية (متوسط)"],
    cvFile: {
      name: "Mohamed_Khaled_CV.docx",
      size: "189 KB",
      uploadDate: "2024-03-05",
    },
    appliedJobs: [
      {
        id: 5,
        title: "مطور واجهات أمامية",
        company: "وكالة ديجيتال",
        status: "pending",
        appliedDate: "2024-03-12",
      },
      {
        id: 6,
        title: "مطور Vue.js",
        company: "شركة الإبداع التقني",
        status: "pending",
        appliedDate: "2024-03-08",
      },
    ],
    coverLetter:
      "مطور واجهات متحمس لبناء تجارب مستخدم رائعة. أتطلع للعمل مع فريق مبدع ومبتكر.",
  },
  {
    id: 4,
    name: "فاطمة أحمد",
    email: "fatima@email.com",
    phone: "0544455566",
    location: "الدمام",
    matchScore: 78,
    skills: ["Project Management", "Agile", "Scrum", "JIRA", "Leadership"],
    experience: "6 سنوات",
    appliedFor: "مدير مشاريع",
    education: "ماجستير إدارة أعمال",
    summary:
      "مديرة مشاريع معتمدة PMP مع خبرة في قيادة فرق تقنية وإدارة مشاريع معقدة بنجاح.",
    workHistory: [
      {
        title: "مديرة مشاريع أولى",
        company: "شركة الاتصالات السعودية",
        period: "2020 - الحالي",
        description: "إدارة مشاريع تقنية كبيرة وقيادة فرق متعددة",
      },
      {
        title: "مديرة مشاريع",
        company: "شركة أرامكو للخدمات",
        period: "2018 - 2020",
        description: "إدارة مشاريع تطوير البرمجيات",
      },
    ],
    educationHistory: [
      {
        degree: "ماجستير إدارة أعمال",
        institution: "جامعة الملك فهد للبترول",
        year: "2018",
      },
      {
        degree: "بكالوريوس نظم معلومات",
        institution: "جامعة الدمام",
        year: "2015",
      },
    ],
    certifications: [
      "PMP Certified",
      "Certified Scrum Master",
      "PRINCE2 Practitioner",
    ],
    languages: [
      "العربية (اللغة الأم)",
      "الإنجليزية (متقدم)",
      "الفرنسية (مبتدئ)",
    ],
    cvFile: {
      name: "Fatima_Ahmed_CV.pdf",
      size: "278 KB",
      uploadDate: "2024-01-28",
    },
    appliedJobs: [
      {
        id: 7,
        title: "مدير مشاريع",
        company: "شركة الاتصالات السعودية",
        status: "accepted",
        appliedDate: "2024-02-20",
      },
      {
        id: 8,
        title: "مدير برنامج",
        company: "شركة أرامكو الرقمية",
        status: "pending",
        appliedDate: "2024-03-01",
      },
    ],
    coverLetter:
      "مديرة مشاريع معتمدة PMP مع خبرة واسعة في قيادة الفرق وإدارة المشاريع التقنية المعقدة. أسعى لتحقيق أهداف المنظمة من خلال التخطيط الاستراتيجي والتنفيذ الفعال.",
  },
];

const CandidateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isCompanyView = searchParams.get("view") === "company";

  const candidate = candidatesData.find((c) => c.id === Number(id));

  // Cover Letter Generator State
  const [isCoverLetterDialogOpen, setIsCoverLetterDialogOpen] = useState(false);
  const [coverLetterForm, setCoverLetterForm] = useState({
    tone: "professional",
    targetRole: "",
    highlights: "",
  });
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateCoverLetter = async () => {
    if (!candidate) return;

    setIsGenerating(true);
    // Mock AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const toneText =
      coverLetterForm.tone === "professional"
        ? "رسمي واحترافي"
        : coverLetterForm.tone === "friendly"
        ? "ودي ومتحمس"
        : "مباشر وموجز";

    const mockLetter = `السيد/السيدة مدير التوظيف المحترم،

أتقدم بخالص اهتمامي للانضمام إلى فريقكم الموقر${
      coverLetterForm.targetRole ? ` في منصب ${coverLetterForm.targetRole}` : ""
    }. أنا ${candidate.name}، ${candidate.appliedFor} مع خبرة ${
      candidate.experience
    } في هذا المجال.

${candidate.summary}

${
  coverLetterForm.highlights
    ? `أود أن أبرز النقاط التالية:\n${coverLetterForm.highlights}`
    : `من أبرز مهاراتي: ${candidate.skills.slice(0, 4).join("، ")}.`
}

أتمتع بشغف حقيقي لتطوير مهاراتي والمساهمة في تحقيق أهداف المنظمة. أعتقد أن خبراتي ومهاراتي ستكون إضافة قيمة لفريقكم.

أتطلع لفرصة مناقشة كيف يمكنني المساهمة في نجاح مؤسستكم الموقرة.

مع خالص التقدير والاحترام،
${candidate.name}
${candidate.email}
${candidate.phone}`;

    setGeneratedCoverLetter(mockLetter);
    setIsGenerating(false);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generatedCoverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "تم النسخ",
      description: "تم نسخ خطاب التقديم إلى الحافظة",
    });
  };

  const handleSaveCoverLetter = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ خطاب التقديم في ملفك الشخصي",
    });
    setIsCoverLetterDialogOpen(false);
  };

  if (!candidate) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        dir="rtl"
      >
        <Card className="p-8 text-center">
          <p className="text-lg text-muted-foreground">
            لم يتم العثور على المرشح
          </p>
          <Button onClick={() => navigate("/company")} className="mt-4">
            العودة للوحة التحكم
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <header className="bg-card border-b border-border px-6 py-4 mb-6 rounded-lg">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/company")}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg">الملف الشخصي للمرشح</h1>
            <p className="text-sm text-muted-foreground">
              عرض تفاصيل السيرة الذاتية
            </p>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary shrink-0">
                {candidate.name.charAt(0)}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-bold">{candidate.name}</h2>
                    {isCompanyView && (
                      <Badge
                        className={`${
                          candidate.matchScore >= 90
                            ? "bg-emerald-500"
                            : candidate.matchScore >= 80
                            ? "bg-primary"
                            : "bg-amber-500"
                        }`}
                      >
                        نسبة التوافق: {candidate.matchScore}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {candidate.appliedFor}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {candidate.email}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {candidate.phone}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {candidate.location}
                  </span>
                </div>

                <p className="text-sm leading-relaxed">{candidate.summary}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  الخبرة العملية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.workHistory.map((job, index) => (
                  <div key={index} className="relative">
                    {index > 0 && <Separator className="mb-4" />}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.company}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {job.period}
                        </p>
                        <p className="text-sm mt-2">{job.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  التعليم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.educationHistory.map((edu, index) => (
                  <div key={index} className="relative">
                    {index > 0 && <Separator className="mb-4" />}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {edu.year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Applied Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  الوظائف المتقدم عليها
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {candidate.appliedJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Building className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{job.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {job.company}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {job.appliedDate}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        job.status === "accepted"
                          ? "default"
                          : job.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className={`flex items-center gap-1 ${
                        job.status === "accepted" ? "bg-emerald-500" : ""
                      }`}
                    >
                      {job.status === "pending" && (
                        <Clock className="w-3 h-3" />
                      )}
                      {job.status === "accepted" && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      {job.status === "rejected" && (
                        <XCircle className="w-3 h-3" />
                      )}
                      {job.status === "pending"
                        ? "قيد المراجعة"
                        : job.status === "accepted"
                        ? "مقبول"
                        : "مرفوض"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cover Letter Section with Generator */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileEdit className="w-5 h-5 text-primary" />
                  خطاب التقديم العام
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCoverLetterDialogOpen(true)}
                  className="gap-2"
                >
                  <PenTool className="w-4 h-4" />
                  إنشاء خطاب جديد
                </Button>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-sm leading-relaxed">
                    {candidate.coverLetter}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CV File */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="w-5 h-5 text-primary" />
                  السيرة الذاتية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {candidate.cvFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {candidate.cvFile.size} • {candidate.cvFile.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Eye className="w-4 h-4" />
                    عرض
                  </Button>
                  <Button size="sm" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    تحميل
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="w-5 h-5 text-primary" />
                  المهارات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Award className="w-5 h-5 text-primary" />
                  الشهادات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {candidate.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <FileText className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="w-5 h-5 text-primary" />
                  اللغات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {candidate.languages.map((lang, index) => (
                    <li key={index} className="text-sm">
                      {lang}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Experience Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي الخبرة
                    </p>
                    <p className="font-bold">{candidate.experience}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Cover Letter Generator Dialog */}
      <Dialog
        open={isCoverLetterDialogOpen}
        onOpenChange={setIsCoverLetterDialogOpen}
      >
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          dir="rtl"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              مولد خطاب التقديم العام
            </DialogTitle>
            <DialogDescription>
              أنشئ خطاب تقديم احترافي باستخدام الذكاء الاصطناعي
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Generator Options */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>نبرة الخطاب</Label>
                <Select
                  value={coverLetterForm.tone}
                  onValueChange={(v) =>
                    setCoverLetterForm({ ...coverLetterForm, tone: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">رسمي واحترافي</SelectItem>
                    <SelectItem value="friendly">ودي ومتحمس</SelectItem>
                    <SelectItem value="concise">مباشر وموجز</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>الوظيفة المستهدفة (اختياري)</Label>
                <Input
                  value={coverLetterForm.targetRole}
                  onChange={(e) =>
                    setCoverLetterForm({
                      ...coverLetterForm,
                      targetRole: e.target.value,
                    })
                  }
                  placeholder="مثال: مطور واجهات أمامية"
                />
              </div>

              <div className="space-y-2">
                <Label>نقاط تريد إبرازها (اختياري)</Label>
                <Textarea
                  value={coverLetterForm.highlights}
                  onChange={(e) =>
                    setCoverLetterForm({
                      ...coverLetterForm,
                      highlights: e.target.value,
                    })
                  }
                  placeholder="مثال: خبرة في قيادة الفرق، مشاريع ناجحة..."
                  rows={3}
                />
              </div>

              <Button
                onClick={handleGenerateCoverLetter}
                disabled={isGenerating}
                className="w-full gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    توليد خطاب التقديم
                  </>
                )}
              </Button>
            </div>

            {/* Generated Letter */}
            {generatedCoverLetter && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>خطاب التقديم المُولَّد</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyLetter}
                    className="gap-2"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "تم النسخ" : "نسخ"}
                  </Button>
                </div>
                <Textarea
                  value={generatedCoverLetter}
                  onChange={(e) => setGeneratedCoverLetter(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCoverLetterDialogOpen(false)}
            >
              إلغاء
            </Button>
            {generatedCoverLetter && (
              <Button onClick={handleSaveCoverLetter} className="gap-2">
                <FileEdit className="w-4 h-4" />
                حفظ كخطاب عام
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CandidateProfile;
