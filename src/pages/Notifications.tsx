import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle2, Clock } from "lucide-react";

// Mock data
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

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            {/* Button - LEFT */}
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllRead}
                className="gap-2 flex-row-reverse"
              >
                <CheckCircle2 className="w-4 h-4" />
                تحديد الكل كمقروء
              </Button>
            )}

            {/* Tabs - RIGHT */}
            <TabsList className="flex flex-row-reverse w-fit">
              <TabsTrigger value="all">كل الإشعارات</TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                غير مقروءة
                {unreadCount > 0 && (
                  <span className="mr-2 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
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
