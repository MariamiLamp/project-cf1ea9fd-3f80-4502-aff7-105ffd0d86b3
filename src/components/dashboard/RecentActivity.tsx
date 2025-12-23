import { FileText, Send, Eye, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    icon: Send,
    title: "تم إرسال طلب توظيف",
    description: "مطور واجهات أمامية - شركة تقنية",
    time: "منذ ساعتين",
    status: "success",
  },
  {
    icon: Eye,
    title: "تمت مشاهدة سيرتك الذاتية",
    description: "مدير التوظيف في شركة الابتكار",
    time: "منذ ٤ ساعات",
    status: "info",
  },
  {
    icon: FileText,
    title: "تم تحديث السيرة الذاتية",
    description: "إضافة مهارات جديدة وخبرات",
    time: "منذ يوم واحد",
    status: "default",
  },
  {
    icon: CheckCircle,
    title: "اكتمل فحص السيرة الذاتية",
    description: "نتيجة التوافق: ٨٥٪",
    time: "منذ يومين",
    status: "success",
  },
];

const statusStyles = {
  success: "bg-success/10 text-success",
  info: "bg-accent/10 text-accent",
  default: "bg-muted text-muted-foreground",
};

export const RecentActivity = () => {
  return (
    <div className="card-elevated p-6 opacity-0 animate-fade-up" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
      <div className="section-header">
        <h2 className="section-title">النشاط الأخير</h2>
        <button className="text-sm text-primary hover:text-primary-light font-medium transition-colors">
          عرض الكل
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className={cn("p-2 rounded-lg shrink-0", statusStyles[activity.status as keyof typeof statusStyles])}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="w-3 h-3" />
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
