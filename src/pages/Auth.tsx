import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Building2, User } from "lucide-react";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, selectedRole);
    if (success) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في منصة الموارد البشرية"
      });

      // Redirect based on role
      if (selectedRole === "admin") {
        navigate("/admin");
      } else if (selectedRole === "company") {
        navigate("/company");
      } else {
        navigate("/");
      }
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        variant: "destructive"
      });
    }
  };
  const roles = [{
    value: "user" as UserRole,
    label: "باحث عن عمل",
    icon: User,
    color: "text-blue-500"
  }, {
    value: "company" as UserRole,
    label: "شركة / HR",
    icon: Building2,
    color: "text-emerald-500"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">منصة الموارد البشرية</h1>
          <p className="text-muted-foreground mt-2">منصة التوظيف الذكية</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>تسجيل الدخول</CardTitle>
            <CardDescription>اختر نوع الحساب وأدخل بياناتك</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label>نوع الحساب</Label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map(role => {})}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="example@email.com" value={email} onChange={e => setEmail(e.target.value)} className="text-left" dir="ltr" required />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>

              <Button type="submit" className="w-full">
                تسجيل الدخول
              </Button>
            </form>

            {/* Demo Credentials */}
            
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Auth;