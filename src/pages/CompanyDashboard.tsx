import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
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
  Search,
} from "lucide-react";

// Mock data
const mockJobs = [
  { id: 1, title: "مطور واجهات أمامية", department: "التقنية", type: "دوام كامل", location: "الرياض", applications: 24, status: "active", postedDate: "2024-01-10" },
  { id: 2, title: "محلل بيانات", department: "البيانات", type: "دوام كامل", location: "جدة", applications: 18, status: "active", postedDate: "2024-01-15" },
  { id: 3, title: "مدير مشاريع", department: "الإدارة", type: "دوام كامل", location: "الرياض", applications: 12, status: "closed", postedDate: "2024-01-05" },
];

const mockCandidates = [
  { id: 1, name: "أحمد محمد", email: "ahmed@email.com", matchScore: 95, skills: ["React", "TypeScript", "Node.js"], experience: "5 سنوات", appliedFor: "مطور واجهات أمامية" },
  { id: 2, name: "سارة علي", email: "sara@email.com", matchScore: 88, skills: ["Python", "SQL", "Tableau"], experience: "3 سنوات", appliedFor: "محلل بيانات" },
  { id: 3, name: "محمد خالد", email: "mohamed@email.com", matchScore: 82, skills: ["React", "Vue", "CSS"], experience: "4 سنوات", appliedFor: "مطور واجهات أمامية" },
  { id: 4, name: "فاطمة أحمد", email: "fatima@email.com", matchScore: 78, skills: ["Project Management", "Agile"], experience: "6 سنوات", appliedFor: "مدير مشاريع" },
];

const mockApplications = [
  { id: 1, candidateName: "أحمد محمد", jobTitle: "مطور واجهات أمامية", status: "pending", appliedDate: "2024-01-20", matchScore: 95 },
  { id: 2, candidateName: "سارة علي", jobTitle: "محلل بيانات", status: "reviewed", appliedDate: "2024-01-19", matchScore: 88 },
  { id: 3, candidateName: "محمد خالد", jobTitle: "مطور واجهات أمامية", status: "accepted", appliedDate: "2024-01-18", matchScore: 82 },
  { id: 4, candidateName: "فاطمة أحمد", jobTitle: "مدير مشاريع", status: "rejected", appliedDate: "2024-01-17", matchScore: 78 },
  { id: 5, candidateName: "عمر حسن", jobTitle: "مطور واجهات أمامية", status: "pending", appliedDate: "2024-01-21", matchScore: 91 },
];

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    type: "",
    location: "",
    description: "",
    requirements: "",
  });

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleAddJob = () => {
    if (!newJob.title || !newJob.department || !newJob.type || !newJob.location) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إضافة الوظيفة",
      description: "تم نشر الوظيفة بنجاح",
    });
    setIsAddJobOpen(false);
    setNewJob({ title: "", department: "", type: "", location: "", description: "", requirements: "" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" /> قيد المراجعة</Badge>;
      case "reviewed":
        return <Badge variant="secondary" className="gap-1"><Eye className="w-3 h-3" /> تمت المراجعة</Badge>;
      case "accepted":
        return <Badge className="gap-1 bg-emerald-500"><CheckCircle className="w-3 h-3" /> مقبول</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> مرفوض</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = [
    { label: "الوظائف النشطة", value: "12", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "إجمالي الطلبات", value: "156", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "المرشحون المتوافقون", value: "48", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "معدل القبول", value: "32%", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">لوحة تحكم الشركة</h1>
              <p className="text-sm text-muted-foreground">{user?.companyName || "شركتك"}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="jobs" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="jobs" className="gap-2">
                <Briefcase className="w-4 h-4" />
                الوظائف
              </TabsTrigger>
              <TabsTrigger value="candidates" className="gap-2">
                <Users className="w-4 h-4" />
                المرشحون المتوافقون
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <FileText className="w-4 h-4" />
                طلبات التوظيف
              </TabsTrigger>
            </TabsList>

            <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة وظيفة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إضافة وظيفة جديدة</DialogTitle>
                  <DialogDescription>أدخل تفاصيل الوظيفة المطلوبة</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>المسمى الوظيفي *</Label>
                    <Input
                      placeholder="مثال: مطور واجهات أمامية"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>القسم *</Label>
                      <Select onValueChange={(value) => setNewJob({ ...newJob, department: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القسم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="التقنية">التقنية</SelectItem>
                          <SelectItem value="التسويق">التسويق</SelectItem>
                          <SelectItem value="المالية">المالية</SelectItem>
                          <SelectItem value="الإدارة">الإدارة</SelectItem>
                          <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>نوع الدوام *</Label>
                      <Select onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="دوام كامل">دوام كامل</SelectItem>
                          <SelectItem value="دوام جزئي">دوام جزئي</SelectItem>
                          <SelectItem value="عن بعد">عن بعد</SelectItem>
                          <SelectItem value="عقد">عقد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>الموقع *</Label>
                    <Select onValueChange={(value) => setNewJob({ ...newJob, location: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الرياض">الرياض</SelectItem>
                        <SelectItem value="جدة">جدة</SelectItem>
                        <SelectItem value="الدمام">الدمام</SelectItem>
                        <SelectItem value="مكة">مكة</SelectItem>
                        <SelectItem value="المدينة">المدينة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>وصف الوظيفة</Label>
                    <Textarea
                      placeholder="اكتب وصفاً تفصيلياً للوظيفة..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>المتطلبات</Label>
                    <Textarea
                      placeholder="اكتب متطلبات الوظيفة..."
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
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

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  الوظائف المنشورة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المسمى الوظيفي</TableHead>
                      <TableHead>القسم</TableHead>
                      <TableHead>نوع الدوام</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>عدد الطلبات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>تاريخ النشر</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{job.applications} طلب</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={job.status === "active" ? "default" : "outline"}>
                            {job.status === "active" ? "نشطة" : "مغلقة"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{job.postedDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  المرشحون المتوافقون مع وظائفكم
                </CardTitle>
                <CardDescription>مرشحون تتوافق مهاراتهم مع متطلبات وظائفكم المنشورة</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>نسبة التوافق</TableHead>
                      <TableHead>المهارات</TableHead>
                      <TableHead>الخبرة</TableHead>
                      <TableHead>الوظيفة المناسبة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell className="font-medium">{candidate.name}</TableCell>
                        <TableCell className="text-muted-foreground">{candidate.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  candidate.matchScore >= 90 ? "bg-emerald-500" :
                                  candidate.matchScore >= 80 ? "bg-primary" : "bg-amber-500"
                                }`}
                                style={{ width: `${candidate.matchScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{candidate.matchScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 2).map((skill, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                            ))}
                            {candidate.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{candidate.skills.length - 2}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>{candidate.appliedFor}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            عرض الملف
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  طلبات التوظيف
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم المتقدم</TableHead>
                      <TableHead>الوظيفة</TableHead>
                      <TableHead>نسبة التوافق</TableHead>
                      <TableHead>تاريخ التقديم</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.candidateName}</TableCell>
                        <TableCell>{app.jobTitle}</TableCell>
                        <TableCell>
                          <Badge variant={app.matchScore >= 90 ? "default" : "secondary"}>
                            {app.matchScore}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{app.appliedDate}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {app.status === "pending" && (
                              <>
                                <Button variant="ghost" size="icon">
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <XCircle className="w-4 h-4 text-destructive" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CompanyDashboard;
