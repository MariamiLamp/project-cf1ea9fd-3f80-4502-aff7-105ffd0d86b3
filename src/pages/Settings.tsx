import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Moon,
  Globe,
  Shield,
  User,
  Save,
  Key,
  Mail,
  Smartphone,
  Pencil,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [notifications, setNotifications] = useState({
    newJobs: true,
    applicationUpdates: true,
    weeklyTips: false,
  });

  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 text-right w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          الإعدادات
        </h1>
        <p className="text-muted-foreground">إدارة حسابك وتفضيلاتك</p>
      </div>

      <div className="grid gap-6 w-full">
        {/* Profile Settings */}
        <Card className="border-border">
          <CardHeader className="text-right">
            <CardTitle className="flex items-center justify-start gap-2">
              <span>الملف الشخصي</span>
              <User className="w-5 h-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-right">
              إدارة معلومات حسابك الشخصية
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-right">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  placeholder="أحمد محمد"
                  className="text-right disabled:opacity-70"
                  disabled={!isEditing}
                />
                {isEditing && (
                  <p className="text-[11px] text-amber-600/90 dark:text-amber-500/90 font-medium">
                    * يمكنك تغيير اسمك مرة واحدة فقط كل شهر
                  </p>
                )}
              </div>
              <div className="space-y-2 text-right">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ahmed@example.com"
                  className="text-left bg-muted text-muted-foreground cursor-not-allowed"
                  dir="ltr"
                  readOnly
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-right">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+966 5XX XXX XXXX"
                  className="text-left disabled:opacity-70"
                  dir="ltr"
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2 text-right">
                <Label htmlFor="job-title">المسمى الوظيفي</Label>
                <Input
                  id="job-title"
                  placeholder="مطور برمجيات"
                  className="text-right disabled:opacity-70"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="flex justify-start pt-2 gap-3">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSaveProfile}
                    className="gap-2 flex-row-reverse"
                  >
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="gap-2 flex-row-reverse"
                  >
                    <X className="w-4 h-4" />
                    إلغاء
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="gap-2 flex-row-reverse"
                >
                  <Pencil className="w-4 h-4" />
                  تعديل البيانات
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border">
          <CardHeader className="text-right">
            <CardTitle className="flex items-center justify-start gap-2">
              <span>الإشعارات</span>
              <Bell className="w-5 h-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-right">
              تخصيص إشعارات البريد الإلكتروني والتطبيق
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-right flex-1">
                <Label className="text-base font-medium flex items-center justify-start gap-2">
                  <span>إشعارات الوظائف الجديدة</span>
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  احصل على إشعار عند توفر وظائف جديدة تناسب ملفك
                </p>
              </div>
              <Switch
                checked={notifications.newJobs}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, newJobs: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-right flex-1">
                <Label className="text-base font-medium flex items-center justify-start gap-2">
                  <span>تحديثات الطلبات</span>
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  إشعارات فورية عند تغير حالة طلباتك
                </p>
              </div>
              <Switch
                checked={notifications.applicationUpdates}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    applicationUpdates: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-right flex-1">
                <Label className="text-base font-medium">نصائح أسبوعية</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  نصائح مفيدة لتحسين سيرتك الذاتية وفرصك
                </p>
              </div>
              <Switch
                checked={notifications.weeklyTips}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weeklyTips: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-border">
          <CardHeader className="text-right">
            <CardTitle className="flex items-center justify-start gap-2">
              <span>المظهر</span>
              <Moon className="w-5 h-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-right">
              تخصيص مظهر التطبيق حسب تفضيلاتك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-right flex-1">
                <Label className="text-base font-medium">الوضع الداكن</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  تفعيل المظهر الداكن لراحة العين
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="border-border">
          <CardHeader className="text-right">
            <CardTitle className="flex items-center justify-start gap-2">
              <span>اللغة</span>
              <Globe className="w-5 h-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-right">
              اختر لغة التطبيق المفضلة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-muted/30">
              <div className="text-right flex-1">
                <Label className="text-base font-medium">اللغة الحالية</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  العربية (Arabic)
                </p>
              </div>
              <Button variant="outline" size="sm">
                تغيير اللغة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border">
          <CardHeader className="text-right">
            <CardTitle className="flex items-center justify-start gap-2">
              <span>الأمان</span>
              <Shield className="w-5 h-5 text-primary" />
            </CardTitle>
            <CardDescription className="text-right">
              إعدادات الأمان وحماية حسابك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-right flex-1">
                <Label className="text-base font-medium">كلمة المرور</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  آخر تحديث منذ 30 يوماً
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 flex-row-reverse"
              >
                <Key className="w-4 h-4" />
                تغيير
              </Button>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-right flex-1">
                <Label className="text-base font-medium">
                  المصادقة الثنائية
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  أضف طبقة حماية إضافية لحسابك
                </p>
              </div>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader className="text-right">
            <CardTitle className="flex items-center justify-start gap-2 text-destructive">
              <span>منطقة الخطر</span>
              <Shield className="w-5 h-5" />
            </CardTitle>
            <CardDescription className="text-right">
              إجراءات لا يمكن التراجع عنها
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-destructive/5">
              <div className="text-right flex-1">
                <Label className="text-base font-medium">
                  حذف الحساب نهائياً
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  سيتم حذف جميع بياناتك بشكل نهائي
                </p>
              </div>
              <Button variant="destructive" size="sm">
                حذف الحساب
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
