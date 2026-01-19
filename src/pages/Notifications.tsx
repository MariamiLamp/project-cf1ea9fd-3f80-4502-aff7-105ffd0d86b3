import { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle2, Clock, Eye, Building2 } from "lucide-react";

// Mock data
const initialProfileViews = [
  {
    id: 1,
    company: "شركة التقنية المتقدمة",
    time: "منذ ساعتين",
    location: "الرياض",
    industry: "البرمجيات",
    initials: "A",
    read: false,
  },
  {
    id: 2,
    company: "مجموعة الحلول الرقمية",
    time: "منذ ٥ ساعات",
    location: "جدة",
    industry: "تقنية المعلومات",
    initials: "D",
    read: false,
  },
  {
    id: 3,
    company: "بنك الاستثمار العربي",
    time: "منذ يوم واحد",
    location: "الرياض",
    industry: "المالية",
    initials: "B",
    read: true,
  },
  {
    id: 4,
    company: "شركة الاتصالات الحديثة",
    time: "منذ يومين",
    location: "دبي",
    industry: "الاتصالات",
    initials: "T",
    read: true,
  },
  {
    id: 5,
    company: "مؤسسة الابتكار",
    time: "منذ ٣ أيام",
    location: "الدمام",
    industry: "التكنولوجيا",
    initials: "I",
    read: true,
  },
];

const mockNotifications = [
  {
    id: 1,
    title: "تم استلام طلبك بنجاح",
    message:
      "تم استلام طلب التقديم لوظيفة مطور واجهات أمامية، سيتم مراجعة طلبك قريباً.",
    time: "منذ 5 دقائق",
    read: false,
    type: "success",
  },
  {
    id: 2,
    title: "تنبيه وظيفة جديدة",
    message:
      "توجد وظيفة جديدة تطابق مهاراتك: مصمم تجربة المستخدم في شركة التقنية المتقدمة.",
    time: "منذ ساعتين",
    read: false,
    type: "info",
  },
  {
    id: 3,
    title: "تحديث حالة الطلب",
    message: "قامت شركة الحلول الذكية بمشاهدة ملفك الشخصي.",
    time: "منذ يوم واحد",
    read: true,
    type: "info",
  },
  {
    id: 4,
    title: "تذكير: موعد المقابلة",
    message: "لديك مقابلة غداً الساعة 10:00 صباحاً مع فريق الموارد البشرية.",
    time: "منذ يومين",
    read: true,
    type: "warning",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [profileViews, setProfileViews] = useState(initialProfileViews);
  const [activeTab, setActiveTab] = useState("all");

  const handleMarkAllRead = () => {
    if (activeTab === "views") {
      setProfileViews(profileViews.map((v) => ({ ...v, read: true })));
    } else {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const unreadViewsCount = profileViews.filter((v) => !v.read).length;
  const showMarkAll =
    activeTab === "views" ? unreadViewsCount > 0 : unreadCount > 0;

  return (
    <DashboardLayout>
      <div className="container py-6 space-y-6" dir="rtl">
        {/* Header */}
        <div className="space-y-1 text-right">
          <h2 className="text-2xl font-bold tracking-tight">الإشعارات</h2>
          <p className="text-muted-foreground">
            تابع آخر التحديثات والتنبيهات الخاصة بك
          </p>
        </div>

        {/* Tabs with Button */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4 flex-row-reverse">
            {/* Tabs - RIGHT (First in DOM for RTL) */}
            <TabsList className="bg-muted/30">
              <TabsTrigger value="unread" className="relative">
                غير مقروءة
                {unreadCount > 0 && (
                  <span className="mr-2 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="all">كل الإشعارات</TabsTrigger>

              <TabsTrigger value="views" className="gap-2">
                مشاهدات الملف
                {unreadViewsCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="mr-1 h-5 px-1.5 text-[10px] rounded-sm bg-blue-100 text-blue-700 pointer-events-none"
                  >
                    {unreadViewsCount}+
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Button - LEFT (Second in DOM for RTL) */}
            <div className="flex-1 flex justify-start">
              {showMarkAll && (
                <Button
                  variant="outline"
                  onClick={handleMarkAllRead}
                  className="gap-2 flex-row-reverse"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  تحديد الكل كمقروء
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={() => handleMarkAsRead(notification.id)}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter((n) => !n.read).length > 0 ? (
              notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={() => handleMarkAsRead(notification.id)}
                  />
                ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>
          <TabsContent value="views" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileViews.map((view) => (
                <Card
                  key={view.id}
                  className={cn(
                    "group hover:border-primary/40 transition-all duration-300",
                    !view.read && "bg-blue-50/30 border-blue-100"
                  )}
                >
                  <div className="p-4 flex flex-row-reverse items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center font-bold text-lg text-muted-foreground group-hover:text-primary transition-all duration-300 relative">
                      {view.initials}
                      {!view.read && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 text-right space-y-1">
                      <h4 className="font-bold group-hover:text-primary transition-colors">
                        {view.company}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                        {view.industry} • {view.location}
                      </p>
                      <p className="text-[10px] text-muted-foreground flex items-center justify-end gap-1 pt-1 opacity-70">
                        <Clock className="w-3 h-3" />
                        {view.time}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Building2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            {profileViews.length === 0 && <EmptyState />}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const NotificationItem = ({
  notification,
  onRead,
}: {
  notification: any;
  onRead: () => void;
}) => (
  <Card
    className={`transition-all duration-200 ${
      !notification.read ? "bg-primary/5 border-primary/20" : ""
    }`}
  >
    <div className="p-4 flex flex-row-reverse items-start gap-4">
      {/* Icon */}
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center shrink-0
          ${
            notification.type === "success"
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : notification.type === "warning"
              ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
              : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          }
        `}
      >
        <Bell className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 text-right">
        <div className="flex flex-row-reverse items-start justify-between gap-2">
          <p
            className={`font-medium ${
              !notification.read ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {notification.title}
          </p>

          <span className="text-xs text-muted-foreground flex flex-row-reverse items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {notification.time}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {notification.message}
        </p>
      </div>

      {/* Unread Indicator */}
      {!notification.read && (
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
          onClick={onRead}
          title="تحديد كمقروء"
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
        </Button>
      )}
    </div>
  </Card>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
      <Bell className="w-8 h-8 opacity-50" />
    </div>
    <h3 className="text-lg font-medium">لا توجد إشعارات</h3>
    <p className="text-sm max-w-sm mt-2">
      ليس لديك أي إشعارات جديدة في الوقت الحالي. سنقوم بإعلامك عند حدوث أي
      تحديثات.
    </p>
  </div>
);

export default Notifications;
