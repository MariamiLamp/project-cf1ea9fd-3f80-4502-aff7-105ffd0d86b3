import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { CVScoreCard } from "@/components/dashboard/CVScoreCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  FileText,
  Briefcase,
  Eye,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Download,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Mock CVs created by HR
interface CreatedCV {
  id: string;
  candidateName: string;
  jobTitle: string;
  createdAt: string;
  lastModified: string;
  status: "draft" | "completed" | "sent";
}

const initialCreatedCVs: CreatedCV[] = [
  {
    id: "1",
    candidateName: "أحمد محمد علي",
    jobTitle: "مطور واجهات أمامية",
    createdAt: "2024-03-10",
    lastModified: "2024-03-12",
    status: "completed",
  },
  {
    id: "2",
    candidateName: "سارة أحمد",
    jobTitle: "محللة بيانات",
    createdAt: "2024-03-08",
    lastModified: "2024-03-08",
    status: "draft",
  },
  {
    id: "3",
    candidateName: "خالد العمري",
    jobTitle: "مدير مشاريع",
    createdAt: "2024-03-05",
    lastModified: "2024-03-07",
    status: "sent",
  },
];

const stats = [
  {
    title: "السير الذاتية المنشأة",
    value: "٤٧",
    subtitle: "هذا الشهر",
    icon: FileText,
    trend: {
      value: 15,
      isPositive: true,
    },
    variant: "primary" as const,
  },
  {
    title: "المرشحين النشطين",
    value: "٣٢",
    subtitle: "قيد المتابعة",
    icon: Users,
    variant: "default" as const,
  },
  {
    title: "السير المرسلة",
    value: "٢٤",
    subtitle: "للشركات",
    icon: Briefcase,
    trend: {
      value: 8,
      isPositive: true,
    },
    variant: "success" as const,
  },
  {
    title: "نسبة القبول",
    value: "٦٥٪",
    subtitle: "فوق المعدل",
    icon: TrendingUp,
    trend: {
      value: 12,
      isPositive: true,
    },
    variant: "warning" as const,
  },
];

const HRDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [createdCVs, setCreatedCVs] = useState<CreatedCV[]>(initialCreatedCVs);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewCVDialog, setShowNewCVDialog] = useState(false);
  const [newCandidateName, setNewCandidateName] = useState("");
  const [newJobTitle, setNewJobTitle] = useState("");

  const handleCreateNewCV = () => {
    if (!newCandidateName.trim() || !newJobTitle.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم المرشح والمسمى الوظيفي",
        variant: "destructive",
      });
      return;
    }

    // Navigate to CV builder with candidate info
    navigate(`/cv-builder?mode=hr&name=${encodeURIComponent(newCandidateName)}&title=${encodeURIComponent(newJobTitle)}`);
    setShowNewCVDialog(false);
    setNewCandidateName("");
    setNewJobTitle("");
  };

  const handleEditCV = (cv: CreatedCV) => {
    navigate(`/cv-builder?mode=hr&id=${cv.id}&name=${encodeURIComponent(cv.candidateName)}&title=${encodeURIComponent(cv.jobTitle)}`);
  };

  const handleDeleteCV = (id: string) => {
    setCreatedCVs(createdCVs.filter(cv => cv.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف السيرة الذاتية بنجاح",
    });
  };

  const getStatusBadge = (status: CreatedCV["status"]) => {
    const config = {
      draft: { label: "مسودة", className: "bg-muted text-muted-foreground" },
      completed: { label: "مكتملة", className: "bg-primary/20 text-primary" },
      sent: { label: "تم الإرسال", className: "bg-success/20 text-success" },
    };
    const { label, className } = config[status];
    return <Badge className={className}>{label}</Badge>;
  };

  const filteredCVs = createdCVs.filter(
    cv =>
      cv.candidateName.includes(searchQuery) ||
      cv.jobTitle.includes(searchQuery)
  );

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <WelcomeCard userName={user?.name || "مسؤول الموارد البشرية"} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 100} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6" dir="rtl">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="cvs">إدارة السير الذاتية</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <div>
            <div className="section-header">
              <h2 className="section-title">إجراءات سريعة</h2>
            </div>
            <QuickActions />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <RecentActivity />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <CVScoreCard />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cvs" className="space-y-6">
          {/* CV Management Header */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                السير الذاتية المنشأة
              </CardTitle>
              <Button onClick={() => setShowNewCVDialog(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                إنشاء سيرة ذاتية جديدة
              </Button>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="البحث بالاسم أو المسمى الوظيفي..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* CVs Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المرشح</TableHead>
                    <TableHead>المسمى الوظيفي</TableHead>
                    <TableHead>تاريخ الإنشاء</TableHead>
                    <TableHead>آخر تعديل</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCVs.map((cv) => (
                    <TableRow key={cv.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {cv.candidateName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{cv.candidateName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{cv.jobTitle}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {cv.createdAt}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {cv.lastModified}
                      </TableCell>
                      <TableCell>{getStatusBadge(cv.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCV(cv)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCV(cv.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCVs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        لا توجد سير ذاتية
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New CV Dialog */}
      <Dialog open={showNewCVDialog} onOpenChange={setShowNewCVDialog}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              إنشاء سيرة ذاتية جديدة
            </DialogTitle>
            <DialogDescription>
              أدخل بيانات المرشح لبدء إنشاء السيرة الذاتية
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">اسم المرشح</label>
              <Input
                placeholder="أدخل اسم المرشح الكامل..."
                value={newCandidateName}
                onChange={(e) => setNewCandidateName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المسمى الوظيفي</label>
              <Input
                placeholder="مثال: مطور برمجيات، محلل بيانات..."
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowNewCVDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateNewCV}>
              بدء الإنشاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default HRDashboard;
