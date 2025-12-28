import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Building2,
  UserCheck,
  Briefcase,
  Search,
  LogOut,
  TrendingUp,
  FileText,
  Eye,
  Ban,
  CheckCircle,
  CreditCard,
  Crown,
  LayoutTemplate,
  Plus,
  Edit,
  Trash2,
  Star,
  Download,
  DollarSign,
  Percent,
  Package,
  Settings,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

// Mock data - Users
const mockUsers = [
  { id: 1, name: "أحمد محمد", email: "ahmed@email.com", type: "jobseeker", status: "active", cvScore: 85, appliedJobs: 12, joinDate: "2024-01-15", subscription: "مجاني" },
  { id: 2, name: "سارة علي", email: "sara@email.com", type: "jobseeker", status: "active", cvScore: 92, appliedJobs: 8, joinDate: "2024-02-20", subscription: "احترافي" },
  { id: 3, name: "محمد خالد", email: "mohamed@email.com", type: "jobseeker", status: "inactive", cvScore: 78, appliedJobs: 5, joinDate: "2024-03-10", subscription: "مجاني" },
  { id: 4, name: "فاطمة أحمد", email: "fatima@email.com", type: "jobseeker", status: "active", cvScore: 88, appliedJobs: 15, joinDate: "2024-01-05", subscription: "مميز" },
  { id: 5, name: "عمر حسن", email: "omar@email.com", type: "jobseeker", status: "active", cvScore: 95, appliedJobs: 20, joinDate: "2024-02-01", subscription: "احترافي" },
];

const mockCompanies = [
  { id: 1, name: "شركة التقنية المتقدمة", email: "tech@company.com", status: "verified", jobs: 15, employees: 250, industry: "تقنية المعلومات", subscription: "شركات+" },
  { id: 2, name: "مجموعة الاستثمار", email: "invest@company.com", status: "verified", jobs: 8, employees: 500, industry: "المالية", subscription: "شركات" },
  { id: 3, name: "شركة البناء الحديث", email: "build@company.com", status: "pending", jobs: 12, employees: 150, industry: "البناء والتشييد", subscription: "مجاني" },
  { id: 4, name: "مؤسسة الصحة", email: "health@company.com", status: "verified", jobs: 20, employees: 1000, industry: "الرعاية الصحية", subscription: "شركات+" },
];

const mockHRProfiles = [
  { id: 1, name: "خالد العتيبي", email: "khaled@hr.com", company: "شركة التقنية المتقدمة", role: "مدير الموارد البشرية", hiredCount: 45, status: "active" },
  { id: 2, name: "نورة السعيد", email: "noura@hr.com", company: "مجموعة الاستثمار", role: "أخصائي توظيف", hiredCount: 32, status: "active" },
  { id: 3, name: "سعود الدوسري", email: "saud@hr.com", company: "شركة البناء الحديث", role: "مدير التوظيف", hiredCount: 28, status: "inactive" },
  { id: 4, name: "هند القحطاني", email: "hind@hr.com", company: "مؤسسة الصحة", role: "مسؤول الموارد البشرية", hiredCount: 55, status: "active" },
];

// Mock Subscription Plans
const mockPlans = [
  { id: 1, name: "مجاني", nameEn: "free", price: 0, period: "شهري", features: ["سيرة ذاتية واحدة", "5 تقديمات شهرياً", "دعم البريد الإلكتروني"], usersCount: 1520, isActive: true, type: "jobseeker" },
  { id: 2, name: "احترافي", nameEn: "pro", price: 49, period: "شهري", features: ["سير ذاتية غير محدودة", "تقديمات غير محدودة", "تحليل السيرة الذاتية", "دعم الأولوية"], usersCount: 680, isActive: true, type: "jobseeker" },
  { id: 3, name: "مميز", nameEn: "premium", price: 99, period: "شهري", features: ["كل مميزات الاحترافي", "مقابلات تجريبية AI", "مسار وظيفي مخصص", "مدير حساب خاص"], usersCount: 258, isActive: true, type: "jobseeker" },
  { id: 4, name: "شركات", nameEn: "business", price: 299, period: "شهري", features: ["10 وظائف شهرياً", "100 مرشح", "فلترة متقدمة", "تقارير أساسية"], usersCount: 89, isActive: true, type: "company" },
  { id: 5, name: "شركات+", nameEn: "enterprise", price: 599, period: "شهري", features: ["وظائف غير محدودة", "مرشحين غير محدودين", "API متكامل", "دعم مخصص 24/7"], usersCount: 67, isActive: true, type: "company" },
];

// Mock Templates
const mockTemplates = [
  { id: 1, name: "سيرة ذاتية احترافية", category: "cv", price: 0, downloads: 12500, rating: 4.8, status: "active", isPremium: false },
  { id: 2, name: "سيرة ذاتية تقنية", category: "cv", price: 29, downloads: 8300, rating: 4.9, status: "active", isPremium: true },
  { id: 3, name: "خطاب تقديم رسمي", category: "cover-letter", price: 0, downloads: 9800, rating: 4.6, status: "active", isPremium: false },
  { id: 4, name: "عقد عمل", category: "legal", price: 79, downloads: 4500, rating: 4.9, status: "active", isPremium: true },
  { id: 5, name: "خطة عمل شاملة", category: "business", price: 49, downloads: 3400, rating: 4.9, status: "inactive", isPremium: true },
  { id: 6, name: "بحث أكاديمي", category: "academic", price: 0, downloads: 11200, rating: 4.5, status: "active", isPremium: false },
];

const categoryLabels: Record<string, string> = {
  cv: "سيرة ذاتية",
  "cover-letter": "خطاب تقديم",
  legal: "قانوني",
  business: "أعمال",
  academic: "أكاديمي",
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  
  // Plans state
  const [plans, setPlans] = useState(mockPlans);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<typeof mockPlans[0] | null>(null);
  const [planForm, setPlanForm] = useState({
    name: "",
    price: 0,
    period: "شهري",
    features: "",
    type: "jobseeker",
  });

  // Templates state
  const [templates, setTemplates] = useState(mockTemplates);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<typeof mockTemplates[0] | null>(null);
  const [templateForm, setTemplateForm] = useState({
    name: "",
    category: "cv",
    price: 0,
    isPremium: false,
  });

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  // Plan handlers
  const handleAddPlan = () => {
    setEditingPlan(null);
    setPlanForm({ name: "", price: 0, period: "شهري", features: "", type: "jobseeker" });
    setIsPlanDialogOpen(true);
  };

  const handleEditPlan = (plan: typeof mockPlans[0]) => {
    setEditingPlan(plan);
    setPlanForm({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      features: plan.features.join("\n"),
      type: plan.type,
    });
    setIsPlanDialogOpen(true);
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? {
        ...p,
        name: planForm.name,
        price: planForm.price,
        period: planForm.period,
        features: planForm.features.split("\n").filter(f => f.trim()),
        type: planForm.type,
      } : p));
      toast({ title: "تم التحديث", description: "تم تحديث خطة الاشتراك بنجاح" });
    } else {
      const newPlan = {
        id: plans.length + 1,
        name: planForm.name,
        nameEn: planForm.name.toLowerCase(),
        price: planForm.price,
        period: planForm.period,
        features: planForm.features.split("\n").filter(f => f.trim()),
        usersCount: 0,
        isActive: true,
        type: planForm.type,
      };
      setPlans([...plans, newPlan]);
      toast({ title: "تمت الإضافة", description: "تم إضافة خطة اشتراك جديدة" });
    }
    setIsPlanDialogOpen(false);
  };

  const handleTogglePlan = (planId: number) => {
    setPlans(plans.map(p => p.id === planId ? { ...p, isActive: !p.isActive } : p));
  };

  const handleDeletePlan = (planId: number) => {
    setPlans(plans.filter(p => p.id !== planId));
    toast({ title: "تم الحذف", description: "تم حذف خطة الاشتراك" });
  };

  // Template handlers
  const handleAddTemplate = () => {
    setEditingTemplate(null);
    setTemplateForm({ name: "", category: "cv", price: 0, isPremium: false });
    setIsTemplateDialogOpen(true);
  };

  const handleEditTemplate = (template: typeof mockTemplates[0]) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      category: template.category,
      price: template.price,
      isPremium: template.isPremium,
    });
    setIsTemplateDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? {
        ...t,
        name: templateForm.name,
        category: templateForm.category,
        price: templateForm.price,
        isPremium: templateForm.isPremium,
      } : t));
      toast({ title: "تم التحديث", description: "تم تحديث القالب بنجاح" });
    } else {
      const newTemplate = {
        id: templates.length + 1,
        name: templateForm.name,
        category: templateForm.category,
        price: templateForm.price,
        downloads: 0,
        rating: 0,
        status: "active" as const,
        isPremium: templateForm.isPremium,
      };
      setTemplates([...templates, newTemplate]);
      toast({ title: "تمت الإضافة", description: "تم إضافة قالب جديد" });
    }
    setIsTemplateDialogOpen(false);
  };

  const handleToggleTemplate = (templateId: number) => {
    setTemplates(templates.map(t => t.id === templateId ? { 
      ...t, 
      status: t.status === "active" ? "inactive" : "active" 
    } : t));
  };

  const handleDeleteTemplate = (templateId: number) => {
    setTemplates(templates.filter(t => t.id !== templateId));
    toast({ title: "تم الحذف", description: "تم حذف القالب" });
  };

  const stats = [
    { label: "إجمالي المستخدمين", value: "2,458", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "الشركات المسجلة", value: "156", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "موظفي HR", value: "89", icon: UserCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "الإيرادات الشهرية", value: "45,230 ر.س", icon: DollarSign, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const totalPlanRevenue = plans.reduce((sum, p) => sum + (p.price * p.usersCount), 0);
  const totalTemplateDownloads = templates.reduce((sum, t) => sum + t.downloads, 0);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">لوحة تحكم المدير</h1>
              <p className="text-sm text-muted-foreground">مرحباً، {user?.name}</p>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              الباحثين عن عمل
            </TabsTrigger>
            <TabsTrigger value="companies" className="gap-2">
              <Building2 className="w-4 h-4" />
              الشركات
            </TabsTrigger>
            <TabsTrigger value="hr" className="gap-2">
              <UserCheck className="w-4 h-4" />
              موظفي HR
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-2">
              <CreditCard className="w-4 h-4" />
              خطط الاشتراك
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <LayoutTemplate className="w-4 h-4" />
              القوالب
            </TabsTrigger>
          </TabsList>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  قائمة الباحثين عن عمل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الاشتراك</TableHead>
                      <TableHead>نقاط السيرة</TableHead>
                      <TableHead>الوظائف المتقدم لها</TableHead>
                      <TableHead>تاريخ الانضمام</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.filter(u => u.name.includes(searchTerm) || u.email.includes(searchTerm)).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "نشط" : "غير نشط"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            {user.subscription === "مميز" && <Crown className="w-3 h-3 text-amber-500" />}
                            {user.subscription}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${user.cvScore}%` }}
                              />
                            </div>
                            <span className="text-sm">{user.cvScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.appliedJobs}</TableCell>
                        <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Ban className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  قائمة الشركات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الشركة</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الاشتراك</TableHead>
                      <TableHead>القطاع</TableHead>
                      <TableHead>عدد الموظفين</TableHead>
                      <TableHead>الوظائف المنشورة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCompanies.filter(c => c.name.includes(searchTerm) || c.email.includes(searchTerm)).map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell className="text-muted-foreground">{company.email}</TableCell>
                        <TableCell>
                          <Badge variant={company.status === "verified" ? "default" : "outline"}>
                            {company.status === "verified" ? "موثقة" : "قيد المراجعة"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            {company.subscription === "شركات+" && <Crown className="w-3 h-3 text-amber-500" />}
                            {company.subscription}
                          </Badge>
                        </TableCell>
                        <TableCell>{company.industry}</TableCell>
                        <TableCell>{company.employees}</TableCell>
                        <TableCell>{company.jobs}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {company.status === "pending" && (
                              <Button variant="ghost" size="icon">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              </Button>
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

          {/* HR Tab */}
          <TabsContent value="hr">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  قائمة موظفي الموارد البشرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الشركة</TableHead>
                      <TableHead>المسمى الوظيفي</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>عدد التوظيفات</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHRProfiles.filter(h => h.name.includes(searchTerm) || h.email.includes(searchTerm)).map((hr) => (
                      <TableRow key={hr.id}>
                        <TableCell className="font-medium">{hr.name}</TableCell>
                        <TableCell className="text-muted-foreground">{hr.email}</TableCell>
                        <TableCell>{hr.company}</TableCell>
                        <TableCell>{hr.role}</TableCell>
                        <TableCell>
                          <Badge variant={hr.status === "active" ? "default" : "secondary"}>
                            {hr.status === "active" ? "نشط" : "غير نشط"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{hr.hiredCount} موظف</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Ban className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <div className="space-y-6">
              {/* Subscription Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">إجمالي المشتركين</p>
                        <p className="text-2xl font-bold mt-1">{plans.reduce((sum, p) => sum + p.usersCount, 0)}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">الإيرادات الشهرية</p>
                        <p className="text-2xl font-bold mt-1">{totalPlanRevenue.toLocaleString()} ر.س</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-emerald-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">خطط نشطة</p>
                        <p className="text-2xl font-bold mt-1">{plans.filter(p => p.isActive).length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    خطط الاشتراك
                  </CardTitle>
                  <Button onClick={handleAddPlan} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة خطة
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>اسم الخطة</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>المميزات</TableHead>
                        <TableHead>عدد المشتركين</TableHead>
                        <TableHead>الإيرادات</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plans.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {plan.price > 50 && <Crown className="w-4 h-4 text-amber-500" />}
                              {plan.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {plan.type === "jobseeker" ? "أفراد" : "شركات"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {plan.price === 0 ? "مجاني" : `${plan.price} ر.س/${plan.period}`}
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <p className="text-sm text-muted-foreground truncate">
                                {plan.features.slice(0, 2).join("، ")}
                                {plan.features.length > 2 && "..."}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{plan.usersCount}</TableCell>
                          <TableCell className="font-medium">
                            {(plan.price * plan.usersCount).toLocaleString()} ر.س
                          </TableCell>
                          <TableCell>
                            <Badge variant={plan.isActive ? "default" : "secondary"}>
                              {plan.isActive ? "نشطة" : "معطلة"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleTogglePlan(plan.id)}>
                                {plan.isActive ? <ToggleRight className="w-4 h-4 text-emerald-500" /> : <ToggleLeft className="w-4 h-4" />}
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan.id)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <div className="space-y-6">
              {/* Template Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">إجمالي القوالب</p>
                        <p className="text-2xl font-bold mt-1">{templates.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <LayoutTemplate className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">إجمالي التحميلات</p>
                        <p className="text-2xl font-bold mt-1">{totalTemplateDownloads.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Download className="w-6 h-6 text-emerald-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">قوالب مميزة</p>
                        <p className="text-2xl font-bold mt-1">{templates.filter(t => t.isPremium).length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-amber-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5" />
                    إدارة القوالب
                  </CardTitle>
                  <Button onClick={handleAddTemplate} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة قالب
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>اسم القالب</TableHead>
                        <TableHead>الفئة</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>التحميلات</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.filter(t => t.name.includes(searchTerm)).map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {template.isPremium && <Crown className="w-4 h-4 text-amber-500" />}
                              {template.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{categoryLabels[template.category]}</Badge>
                          </TableCell>
                          <TableCell>
                            {template.price === 0 ? (
                              <Badge variant="secondary">مجاني</Badge>
                            ) : (
                              `${template.price} ر.س`
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                              <span>{template.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>{template.downloads.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={template.status === "active" ? "default" : "secondary"}>
                              {template.status === "active" ? "نشط" : "معطل"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleEditTemplate(template)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleToggleTemplate(template.id)}>
                                {template.status === "active" ? <ToggleRight className="w-4 h-4 text-emerald-500" /> : <ToggleLeft className="w-4 h-4" />}
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteTemplate(template.id)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Plan Dialog */}
      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingPlan ? "تعديل خطة الاشتراك" : "إضافة خطة اشتراك جديدة"}</DialogTitle>
            <DialogDescription>
              {editingPlan ? "قم بتعديل تفاصيل خطة الاشتراك" : "أدخل تفاصيل خطة الاشتراك الجديدة"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>اسم الخطة</Label>
              <Input
                value={planForm.name}
                onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                placeholder="مثال: احترافي"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>السعر (ر.س)</Label>
                <Input
                  type="number"
                  value={planForm.price}
                  onChange={(e) => setPlanForm({ ...planForm, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>نوع الخطة</Label>
                <Select value={planForm.type} onValueChange={(v) => setPlanForm({ ...planForm, type: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jobseeker">أفراد</SelectItem>
                    <SelectItem value="company">شركات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>المميزات (سطر لكل ميزة)</Label>
              <Textarea
                value={planForm.features}
                onChange={(e) => setPlanForm({ ...planForm, features: e.target.value })}
                placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPlanDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSavePlan}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "تعديل القالب" : "إضافة قالب جديد"}</DialogTitle>
            <DialogDescription>
              {editingTemplate ? "قم بتعديل تفاصيل القالب" : "أدخل تفاصيل القالب الجديد"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>اسم القالب</Label>
              <Input
                value={templateForm.name}
                onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                placeholder="مثال: سيرة ذاتية احترافية"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الفئة</Label>
                <Select value={templateForm.category} onValueChange={(v) => setTemplateForm({ ...templateForm, category: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cv">سيرة ذاتية</SelectItem>
                    <SelectItem value="cover-letter">خطاب تقديم</SelectItem>
                    <SelectItem value="legal">قانوني</SelectItem>
                    <SelectItem value="business">أعمال</SelectItem>
                    <SelectItem value="academic">أكاديمي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>السعر (ر.س)</Label>
                <Input
                  type="number"
                  value={templateForm.price}
                  onChange={(e) => setTemplateForm({ ...templateForm, price: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>قالب مميز (Premium)</Label>
              <Switch
                checked={templateForm.isPremium}
                onCheckedChange={(checked) => setTemplateForm({ ...templateForm, isPremium: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSaveTemplate}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
