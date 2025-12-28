import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useAuth } from "@/contexts/AuthContext";
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
} from "lucide-react";

// Mock data
const mockUsers = [
  { id: 1, name: "أحمد محمد", email: "ahmed@email.com", status: "active", cvScore: 85, appliedJobs: 12, joinDate: "2024-01-15" },
  { id: 2, name: "سارة علي", email: "sara@email.com", status: "active", cvScore: 92, appliedJobs: 8, joinDate: "2024-02-20" },
  { id: 3, name: "محمد خالد", email: "mohamed@email.com", status: "inactive", cvScore: 78, appliedJobs: 5, joinDate: "2024-03-10" },
  { id: 4, name: "فاطمة أحمد", email: "fatima@email.com", status: "active", cvScore: 88, appliedJobs: 15, joinDate: "2024-01-05" },
  { id: 5, name: "عمر حسن", email: "omar@email.com", status: "active", cvScore: 95, appliedJobs: 20, joinDate: "2024-02-01" },
];

const mockCompanies = [
  { id: 1, name: "شركة التقنية المتقدمة", email: "tech@company.com", status: "verified", jobs: 15, employees: 250, industry: "تقنية المعلومات" },
  { id: 2, name: "مجموعة الاستثمار", email: "invest@company.com", status: "verified", jobs: 8, employees: 500, industry: "المالية" },
  { id: 3, name: "شركة البناء الحديث", email: "build@company.com", status: "pending", jobs: 12, employees: 150, industry: "البناء والتشييد" },
  { id: 4, name: "مؤسسة الصحة", email: "health@company.com", status: "verified", jobs: 20, employees: 1000, industry: "الرعاية الصحية" },
];

const mockHRProfiles = [
  { id: 1, name: "خالد العتيبي", email: "khaled@hr.com", company: "شركة التقنية المتقدمة", role: "مدير الموارد البشرية", hiredCount: 45 },
  { id: 2, name: "نورة السعيد", email: "noura@hr.com", company: "مجموعة الاستثمار", role: "أخصائي توظيف", hiredCount: 32 },
  { id: 3, name: "سعود الدوسري", email: "saud@hr.com", company: "شركة البناء الحديث", role: "مدير التوظيف", hiredCount: 28 },
  { id: 4, name: "هند القحطاني", email: "hind@hr.com", company: "مؤسسة الصحة", role: "مسؤول الموارد البشرية", hiredCount: 55 },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const stats = [
    { label: "إجمالي المستخدمين", value: "2,458", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "الشركات المسجلة", value: "156", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "موظفي HR", value: "89", icon: UserCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "الوظائف النشطة", value: "342", icon: Briefcase, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

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
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="companies" className="gap-2">
              <Building2 className="w-4 h-4" />
              الشركات
            </TabsTrigger>
            <TabsTrigger value="hr" className="gap-2">
              <UserCheck className="w-4 h-4" />
              موظفي HR
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
                  قائمة المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>نقاط السيرة</TableHead>
                      <TableHead>الوظائف المتقدم لها</TableHead>
                      <TableHead>تاريخ الانضمام</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "نشط" : "غير نشط"}
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
                      <TableHead>القطاع</TableHead>
                      <TableHead>عدد الموظفين</TableHead>
                      <TableHead>الوظائف المنشورة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell className="text-muted-foreground">{company.email}</TableCell>
                        <TableCell>
                          <Badge variant={company.status === "verified" ? "default" : "outline"}>
                            {company.status === "verified" ? "موثقة" : "قيد المراجعة"}
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
                      <TableHead>عدد التوظيفات</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHRProfiles.map((hr) => (
                      <TableRow key={hr.id}>
                        <TableCell className="font-medium">{hr.name}</TableCell>
                        <TableCell className="text-muted-foreground">{hr.email}</TableCell>
                        <TableCell>{hr.company}</TableCell>
                        <TableCell>{hr.role}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{hr.hiredCount} موظف</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
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

export default AdminDashboard;
