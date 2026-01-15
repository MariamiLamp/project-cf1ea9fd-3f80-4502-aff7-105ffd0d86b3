import { FileText, Sparkles, MessageSquare, FileEdit, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: FileText,
    title: "فحص السيرة الذاتية",
    description: "اختبر توافق سيرتك مع الوظائف",
    path: "/cv-check",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "خطاب التقديم",
    description: "أنشئ خطاباً احترافياً بالذكاء الاصطناعي",
    path: "/cover-letter",
    color: "accent",
  },
  {
    icon: MessageSquare,
    title: "أسئلة المقابلات",
    description: "استعد للمقابلات بأسئلة متوقعة",
    path: "/interview",
    color: "success",
  },
  {
    icon: FileEdit,
    title: "منشئ السيرة الذاتية",
    description: "أنشئ سيرة ذاتية احترافية",
    path: "/cv-builder",
    color: "warning",
  },
];

const colorStyles = {
  primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
  accent: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white",
  success: "bg-success/10 text-success group-hover:bg-success group-hover:text-white",
  warning: "bg-warning/10 text-warning group-hover:bg-warning group-hover:text-white",
};

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link
          key={action.path}
          to={action.path}
          className="group card-elevated p-6 rounded-lg hover:border-primary/30 opacity-0 animate-fade-up"
          style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: "forwards" }}
        >
          <div className={`w-12 h-12 rounded-lg ${colorStyles[action.color as keyof typeof colorStyles]} flex items-center justify-center mb-4 transition-colors`}>
            <action.icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {action.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {action.description}
          </p>
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            ابدأ الآن
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </span>
        </Link>
      ))}
    </div>
  );
};
