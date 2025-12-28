import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Moon, Globe, Shield, User } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">الإعدادات</h1>
        <p className="text-muted-foreground">إدارة حسابك وتفضيلاتك</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              الملف الشخصي
            </CardTitle>
            <CardDescription>إدارة معلومات حسابك الشخصية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input id="name" placeholder="أحمد محمد" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" placeholder="ahmed@example.com" />
            </div>
            <Button>حفظ التغييرات</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              الإشعارات
            </CardTitle>
            <CardDescription>تخصيص إشعارات البريد الإلكتروني والتطبيق</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>إشعارات الوظائف الجديدة</Label>
                <p className="text-sm text-muted-foreground">احصل على إشعار عند توفر وظائف جديدة</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>تحديثات الطلبات</Label>
                <p className="text-sm text-muted-foreground">إشعارات عند تغير حالة طلباتك</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>نصائح أسبوعية</Label>
                <p className="text-sm text-muted-foreground">نصائح لتحسين سيرتك الذاتية</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5" />
              المظهر
            </CardTitle>
            <CardDescription>تخصيص مظهر التطبيق</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>الوضع الداكن</Label>
                <p className="text-sm text-muted-foreground">تفعيل المظهر الداكن</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              اللغة
            </CardTitle>
            <CardDescription>اختر لغة التطبيق المفضلة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>اللغة الحالية</Label>
                <p className="text-sm text-muted-foreground">العربية</p>
              </div>
              <Button variant="outline">تغيير</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              الأمان
            </CardTitle>
            <CardDescription>إعدادات الأمان وكلمة المرور</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>كلمة المرور</Label>
                <p className="text-sm text-muted-foreground">آخر تحديث منذ 30 يوماً</p>
              </div>
              <Button variant="outline">تغيير</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>المصادقة الثنائية</Label>
                <p className="text-sm text-muted-foreground">أضف طبقة حماية إضافية</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
