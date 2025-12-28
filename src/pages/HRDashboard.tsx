import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Search,
  FileText,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  Eye,
  Filter,
  UserCheck,
  Clock,
  TrendingUp,
  Award,
  Languages,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock applicants data
const applicantsData = [
  { 
    id: 1, 
    name: "أحمد محمد", 
    email: "ahmed@email.com", 
    phone: "0501234567", 
    location: "الرياض",
    appliedFor: "مطور واجهات أمامية",
    appliedDate: "2024-03-10",
    status: "pending",
    experience: "5 سنوات", 
    education: "بكالوريوس علوم حاسب", 
    skills: ["React", "TypeScript", "Node.js", "MongoDB", "Git"], 
    summary: "مطور واجهات أمامية متمرس مع خبرة في بناء تطبيقات ويب حديثة باستخدام React و TypeScript.",
    workHistory: [
      { title: "مطور واجهات أمامية أول", company: "شركة التقنية المتقدمة", period: "2021 - الحالي" },
      { title: "مطور واجهات أمامية", company: "شركة الحلول الرقمية", period: "2019 - 2021" },
    ],
    educationHistory: [
      { degree: "بكالوريوس علوم حاسب", institution: "جامعة الملك سعود", year: "2019" },
    ],
    certifications: ["AWS Certified Developer", "React Professional Certificate"],
    languages: ["العربية (اللغة الأم)", "الإنجليزية (متقدم)"],
    cvFile: { name: "Ahmed_Mohamed_CV.pdf", size: "245 KB" },
  },
  { 
    id: 2, 
    name: "سارة علي", 
    email: "sara@email.com", 
    phone: "0509876543",
    location: "جدة", 
    appliedFor: "محلل بيانات",
    appliedDate: "2024-03-08",
    status: "reviewed",
    experience: "3 سنوات", 
    education: "ماجستير تحليل بيانات", 
    skills: ["Python", "SQL", "Tableau", "Power BI", "Machine Learning"], 
    summary: "محللة بيانات مع خبرة في استخراج الرؤى من البيانات الضخمة وتقديم توصيات استراتيجية للأعمال.",
    workHistory: [
      { title: "محللة بيانات", company: "شركة البيانات الذكية", period: "2021 - الحالي" },
      { title: "محللة بيانات مبتدئة", company: "بنك الرياض", period: "2020 - 2021" },
    ],
    educationHistory: [
      { degree: "ماجستير تحليل بيانات", institution: "جامعة الملك عبدالعزيز", year: "2020" },
      { degree: "بكالوريوس إحصاء", institution: "جامعة الملك عبدالعزيز", year: "2018" },
    ],
    certifications: ["Google Data Analytics Certificate", "Tableau Desktop Specialist"],
    languages: ["العربية (اللغة الأم)", "الإنجليزية (متقدم)"],
    cvFile: { name: "Sara_Ali_CV.pdf", size: "312 KB" },
  },
  { 
    id: 3, 
    name: "محمد خالد", 
    email: "mohamed@email.com", 
    phone: "0551112233",
    location: "الرياض", 
    appliedFor: "مطور واجهات أمامية",
    appliedDate: "2024-03-05",
    status: "shortlisted",
    experience: "4 سنوات", 
    education: "بكالوريوس هندسة برمجيات", 
    skills: ["React", "Vue", "CSS", "SASS", "JavaScript"], 
    summary: "مطور واجهات مع شغف لتصميم تجارب مستخدم متميزة وبناء مواقع وتطبيقات سريعة ومتجاوبة.",
    workHistory: [
      { title: "مطور واجهات أمامية", company: "وكالة ديجيتال", period: "2020 - الحالي" },
      { title: "مطور ويب", company: "شركة ناشئة", period: "2019 - 2020" },
    ],
    educationHistory: [
      { degree: "بكالوريوس هندسة برمجيات", institution: "جامعة الأمير سلطان", year: "2019" },
    ],
    certifications: ["Meta Front-End Developer Certificate"],
    languages: ["العربية (اللغة الأم)", "الإنجليزية (متوسط)"],
    cvFile: { name: "Mohamed_Khaled_CV.docx", size: "189 KB" },
  },
  { 
    id: 4, 
    name: "فاطمة أحمد", 
    email: "fatima@email.com", 
    phone: "0544455566",
    location: "الدمام", 
    appliedFor: "مدير مشاريع",
    appliedDate: "2024-03-01",
    status: "interviewed",
    experience: "6 سنوات", 
    education: "ماجستير إدارة أعمال", 
    skills: ["Project Management", "Agile", "Scrum", "JIRA", "Leadership"], 
    summary: "مديرة مشاريع معتمدة PMP مع خبرة في قيادة فرق تقنية وإدارة مشاريع معقدة بنجاح.",
    workHistory: [
      { title: "مديرة مشاريع أولى", company: "شركة الاتصالات السعودية", period: "2020 - الحالي" },
      { title: "مديرة مشاريع", company: "شركة أرامكو للخدمات", period: "2018 - 2020" },
    ],
    educationHistory: [
      { degree: "ماجستير إدارة أعمال", institution: "جامعة الملك فهد للبترول", year: "2018" },
      { degree: "بكالوريوس نظم معلومات", institution: "جامعة الدمام", year: "2015" },
    ],
    certifications: ["PMP Certified", "Certified Scrum Master", "PRINCE2 Practitioner"],
    languages: ["العربية (اللغة الأم)", "الإنجليزية (متقدم)", "الفرنسية (مبتدئ)"],
    cvFile: { name: "Fatima_Ahmed_CV.pdf", size: "278 KB" },
  },
  { 
    id: 5, 
    name: "عمر حسن", 
    email: "omar@email.com", 
    phone: "0555667788",
    location: "الرياض", 
    appliedFor: "مهندس DevOps",
    appliedDate: "2024-03-12",
    status: "pending",
    experience: "4 سنوات", 
    education: "بكالوريوس هندسة حاسب", 
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"], 
    summary: "مهندس DevOps مع خبرة في بناء وإدارة البنية التحتية السحابية وأتمتة عمليات التطوير.",
    workHistory: [
      { title: "مهندس DevOps", company: "شركة الحوسبة السحابية", period: "2021 - الحالي" },
      { title: "مهندس نظم", company: "شركة التقنية", period: "2019 - 2021" },
    ],
    educationHistory: [
      { degree: "بكالوريوس هندسة حاسب", institution: "جامعة الملك فهد", year: "2019" },
    ],
    certifications: ["AWS Solutions Architect", "Kubernetes Administrator"],
    languages: ["العربية (اللغة الأم)", "الإنجليزية (متقدم)"],
    cvFile: { name: "Omar_Hassan_CV.pdf", size: "234 KB" },
  },
];

const HRDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [selectedApplicant, setSelectedApplicant] = useState<typeof applicantsData[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleViewApplicant = (applicant: typeof applicantsData[0]) => {
    setSelectedApplicant(applicant);
    setIsDialogOpen(true);
  };

  const handleViewFullProfile = (applicantId: number) => {
    setIsDialogOpen(false);
    navigate(`/candidate/${applicantId}?view=company`);
  };

  // Get unique job titles for filter
  const jobTitles = [...new Set(applicantsData.map(a => a.appliedFor))];

  // Filter applicants
  const filteredApplicants = applicantsData.filter(applicant => {
    const matchesSearch = applicant.name.includes(searchQuery) || 
                         applicant.email.includes(searchQuery) ||
                         applicant.appliedFor.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || applicant.status === statusFilter;
    const matchesJob = jobFilter === "all" || applicant.appliedFor === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  // Stats
  const stats = {
    total: applicantsData.length,
    pending: applicantsData.filter(a => a.status === "pending").length,
    reviewed: applicantsData.filter(a => a.status === "reviewed").length,
    shortlisted: applicantsData.filter(a => a.status === "shortlisted").length,
    interviewed: applicantsData.filter(a => a.status === "interviewed").length,
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
      pending: { label: "قيد المراجعة", variant: "secondary", className: "" },
      reviewed: { label: "تمت المراجعة", variant: "outline", className: "border-blue-500 text-blue-500" },
      shortlisted: { label: "قائمة مختصرة", variant: "default", className: "bg-amber-500" },
      interviewed: { label: "تم المقابلة", variant: "default", className: "bg-emerald-500" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">لوحة تحكم الموارد البشرية</h1>
              <p className="text-sm text-muted-foreground">إدارة طلبات التوظيف والمتقدمين</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">إجمالي المتقدمين</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-xs text-muted-foreground">قيد المراجعة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.reviewed}</p>
                  <p className="text-xs text-muted-foreground">تمت المراجعة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.shortlisted}</p>
                  <p className="text-xs text-muted-foreground">قائمة مختصرة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.interviewed}</p>
                  <p className="text-xs text-muted-foreground">تم المقابلة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو البريد الإلكتروني أو الوظيفة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 ml-2" />
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                    <SelectItem value="reviewed">تمت المراجعة</SelectItem>
                    <SelectItem value="shortlisted">قائمة مختصرة</SelectItem>
                    <SelectItem value="interviewed">تم المقابلة</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={jobFilter} onValueChange={setJobFilter}>
                  <SelectTrigger className="w-48">
                    <Briefcase className="w-4 h-4 ml-2" />
                    <SelectValue placeholder="الوظيفة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الوظائف</SelectItem>
                    {jobTitles.map(job => (
                      <SelectItem key={job} value={job}>{job}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applicants Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              قائمة المتقدمين ({filteredApplicants.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المتقدم</TableHead>
                  <TableHead>الوظيفة</TableHead>
                  <TableHead>الخبرة</TableHead>
                  <TableHead>التعليم</TableHead>
                  <TableHead>تاريخ التقديم</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>السيرة الذاتية</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {applicant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-xs text-muted-foreground">{applicant.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{applicant.appliedFor}</TableCell>
                    <TableCell>{applicant.experience}</TableCell>
                    <TableCell className="text-sm">{applicant.education}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{applicant.appliedDate}</TableCell>
                    <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewApplicant(applicant)}
                      >
                        عرض التفاصيل
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Applicant Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
          {selectedApplicant && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {selectedApplicant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{selectedApplicant.name}</h2>
                    <p className="text-sm text-muted-foreground font-normal">{selectedApplicant.appliedFor}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="info" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">المعلومات</TabsTrigger>
                  <TabsTrigger value="experience">الخبرات</TabsTrigger>
                  <TabsTrigger value="cv">السيرة الذاتية</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 mt-4">
                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedApplicant.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedApplicant.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedApplicant.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>تقدم في: {selectedApplicant.appliedDate}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Summary */}
                  <div>
                    <h4 className="font-semibold mb-2">نبذة</h4>
                    <p className="text-sm text-muted-foreground">{selectedApplicant.summary}</p>
                  </div>

                  <Separator />

                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold mb-2">المهارات</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Languages */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Languages className="w-4 h-4" />
                      اللغات
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4 mt-4">
                  {/* Work History */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      الخبرة العملية
                    </h4>
                    <div className="space-y-3">
                      {selectedApplicant.workHistory.map((job, index) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <p className="text-xs text-muted-foreground">{job.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Education */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      التعليم
                    </h4>
                    <div className="space-y-3">
                      {selectedApplicant.educationHistory.map((edu, index) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Certifications */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      الشهادات
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cv" className="mt-4">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{selectedApplicant.cvFile.name}</p>
                            <p className="text-sm text-muted-foreground">{selectedApplicant.cvFile.size}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="gap-2">
                            <Eye className="w-4 h-4" />
                            عرض
                          </Button>
                          <Button className="gap-2">
                            <Download className="w-4 h-4" />
                            تحميل
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-4">
                    <Button 
                      className="w-full gap-2" 
                      variant="outline"
                      onClick={() => handleViewFullProfile(selectedApplicant.id)}
                    >
                      <Eye className="w-4 h-4" />
                      عرض الملف الشخصي الكامل
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HRDashboard;
