import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Upload, FileText, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { CVScoreRing } from "@/components/dashboard/CVScoreRing";
import { Button } from "@/components/ui/button";

const CVCheckPage = () => {
  const [hasFile, setHasFile] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = () => {
    setHasFile(true);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const improvements = [
    { text: "أضف ملخصاً مهنياً واضحاً في البداية", priority: "high", completed: false },
    { text: "استخدم كلمات مفتاحية مرتبطة بمجالك", priority: "high", completed: false },
    { text: "أضف نتائج قابلة للقياس لإنجازاتك", priority: "medium", completed: false },
    { text: "حدّث قسم المهارات التقنية", priority: "medium", completed: true },
    { text: "أضف روابط لمشاريعك السابقة", priority: "low", completed: true },
  ];

  const priorityStyles = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-warning/10 text-warning",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">فحص السيرة الذاتية (ATS)</h1>
        <p className="text-muted-foreground">
          اختبر توافق سيرتك الذاتية مع أنظمة تتبع المتقدمين المستخدمة في الشركات
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="card-elevated p-8">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">ارفع سيرتك الذاتية</h2>
            <p className="text-muted-foreground mb-6">
              يدعم النظام ملفات PDF و Word
            </p>

            <div
              className="border-2 border-dashed border-border rounded-xl p-8 mb-6 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={handleFileUpload}
            >
              {hasFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <span className="font-medium text-foreground">سيرة_ذاتية_أحمد.pdf</span>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
              ) : (
                <div>
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">اضغط هنا أو اسحب الملف</p>
                </div>
              )}
            </div>

            {isAnalyzing && (
              <div className="flex items-center justify-center gap-3 text-primary">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">جاري التحليل بالذكاء الاصطناعي...</span>
              </div>
            )}

            {!hasFile && (
              <Button variant="gradient" size="lg" className="w-full" onClick={handleFileUpload}>
                <Sparkles className="w-5 h-5" />
                ابدأ الفحص
              </Button>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="card-elevated p-8">
          {showResults ? (
            <div className="animate-fade-in">
              <div className="flex flex-col items-center mb-8">
                <CVScoreRing score={72} size={180} />
                <p className="text-muted-foreground mt-4 text-center">
                  سيرتك تحتاج بعض التحسينات لتحقيق أفضل نتائج
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">اقتراحات التحسين:</h3>
                {improvements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={item.completed ? "text-muted-foreground line-through" : "text-foreground"}>
                        {item.text}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyles[item.priority as keyof typeof priorityStyles]}`}>
                      {item.priority === "high" ? "مهم" : item.priority === "medium" ? "متوسط" : "اختياري"}
                    </span>
                  </div>
                ))}
              </div>

              <Button variant="gradient" size="lg" className="w-full mt-6">
                <Sparkles className="w-5 h-5" />
                تحسين تلقائي بالذكاء الاصطناعي
              </Button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">لم يتم رفع ملف بعد</h3>
              <p className="text-muted-foreground">
                ارفع سيرتك الذاتية لبدء التحليل
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CVCheckPage;
