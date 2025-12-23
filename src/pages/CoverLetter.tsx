import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Sparkles, Copy, Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CoverLetterPage = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedLetter(`السادة الكرام في ${company || "الشركة المحترمة"}،

تحية طيبة وبعد،

أتقدم بطلبي لشغل منصب ${jobTitle || "المنصب الوظيفي"} في شركتكم الموقرة، وذلك بناءً على خبرتي الواسعة في هذا المجال ورغبتي القوية في الانضمام لفريق عملكم المتميز.

خلال مسيرتي المهنية، اكتسبت خبرة عملية متنوعة مكنتني من تطوير مهارات قيادية وتقنية متقدمة. أؤمن بأن خبراتي ومهاراتي ستساهم بشكل فعّال في تحقيق أهداف شركتكم والارتقاء بمستوى الأداء.

أتطلع للفرصة لمناقشة كيف يمكنني المساهمة في نجاح فريقكم. شكراً لكم على وقتكم واهتمامكم.

مع خالص التحية والتقدير،
أحمد محمد`);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">مولّد خطاب التقديم</h1>
        <p className="text-muted-foreground">
          أنشئ خطاب تقديم احترافي ومخصص باستخدام الذكاء الاصطناعي
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="card-elevated p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">معلومات الوظيفة</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                المسمى الوظيفي
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="مثال: مطور واجهات أمامية"
                className="w-full h-11 px-4 rounded-lg bg-muted/50 border border-transparent focus:border-primary/30 focus:bg-card focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                اسم الشركة
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="مثال: شركة التقنية المتقدمة"
                className="w-full h-11 px-4 rounded-lg bg-muted/50 border border-transparent focus:border-primary/30 focus:bg-card focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                وصف الوظيفة (اختياري)
              </label>
              <textarea
                placeholder="انسخ وصف الوظيفة هنا لخطاب أكثر تخصيصاً..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-transparent focus:border-primary/30 focus:bg-card focus:outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                نقاط القوة المميزة (اختياري)
              </label>
              <textarea
                placeholder="اذكر أهم إنجازاتك أو مهاراتك التي تريد إبرازها..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-transparent focus:border-primary/30 focus:bg-card focus:outline-none transition-all resize-none"
              />
            </div>

            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  توليد الخطاب
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">معاينة الخطاب</h2>
            {generatedLetter && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4" />
                  إعادة التوليد
                </Button>
              </div>
            )}
          </div>

          {generatedLetter ? (
            <div className="animate-fade-in">
              <div className="bg-muted/30 rounded-xl p-6 mb-4 min-h-[300px]">
                <p className="text-foreground whitespace-pre-line leading-relaxed">
                  {generatedLetter}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Copy className="w-4 h-4" />
                  نسخ النص
                </Button>
                <Button variant="gradient" className="flex-1">
                  <Download className="w-4 h-4" />
                  تحميل PDF
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                الخطاب سيظهر هنا
              </h3>
              <p className="text-muted-foreground max-w-sm">
                أدخل معلومات الوظيفة واضغط على "توليد الخطاب" للحصول على خطاب تقديم احترافي
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoverLetterPage;
