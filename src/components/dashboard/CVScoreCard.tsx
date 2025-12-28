import { CVScoreRing } from "./CVScoreRing";
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const improvements = [
  { text: "أضف ملخصاً مهنياً مختصراً", completed: true },
  { text: "أضف شهادات وتدريبات معتمدة", completed: true },
  { text: "تحديث قسم المهارات التقنية", completed: false },
  { text: "إضافة مشاريع سابقة", completed: false },
];

export const CVScoreCard = () => {
  return (
    <div className="card-elevated p-6 opacity-0 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
      <div className="section-header">
        <h2 className="section-title">نتيجة السيرة الذاتية</h2>
        <Link to="/cv-check" className="text-sm text-primary hover:text-primary-light font-medium transition-colors flex items-center gap-1">
          تحسين الآن
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col items-center mb-6">
        <CVScoreRing score={78} />
        <p className="text-sm text-muted-foreground mt-4 text-center">
          سيرتك الذاتية متوافقة مع معظم أنظمة التوظيف
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">اقتراحات التحسين:</p>
        {improvements.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-sm"
          >
            {item.completed ? (
              <CheckCircle className="w-4 h-4 text-success shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-warning shrink-0" />
            )}
            <span className={item.completed ? "text-muted-foreground line-through" : "text-foreground"}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
