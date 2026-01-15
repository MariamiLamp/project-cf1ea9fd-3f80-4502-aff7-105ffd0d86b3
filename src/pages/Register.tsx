import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, UserCheck, ArrowRight } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const accountTypes = [
    {
      id: "jobseeker",
      title: "بـاحـث عـن عـمـل",
      description: "أنشئ سيرتك الذاتية وتقدم لأحدث الوظائف",
      icon: User,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      path: "/register/jobseeker",
    },
    {
      id: "company",
      title: "شــركــة",
      description: "انشر وظائفك وابحث عن أفضل المواهب",
      icon: Building2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      path: "/register/company",
    },
    {
      id: "hr",
      title: "مـسـؤول تـوطـيـف (HR)",
      description: "أدِر عمليات التوظيف وتابع المرشحين",
      icon: UserCheck,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      path: "/register/hr",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            إنشاء حساب جديد
          </h1>
          <p className="text-muted-foreground text-lg">
            اختر نوع الحساب الذي ترغب بإنشائه للمتابعة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accountTypes.map((type) => (
            <Card
              key={type.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 relative overflow-hidden"
              onClick={() => navigate(type.path)}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${type.bg.replace(
                  "/10",
                  "/30"
                )}`}
              />

              <CardHeader className="text-center pb-2">
                <div
                  className={`w-16 h-16 rounded-2xl ${type.bg} flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 duration-300`}
                >
                  <type.icon className={`w-8 h-8 ${type.color}`} />
                </div>
                <CardTitle className="text-xl mb-2">{type.title}</CardTitle>
                <CardDescription className="text-sm min-h-[40px]">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  إنشاء حساب
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Button
              variant="link"
              onClick={() => navigate("/auth")}
              className="px-1 text-primary hover:no-underline font-semibold"
            >
              تسجيل الدخول
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
