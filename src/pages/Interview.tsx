import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const jobTitles = [
  "مطور واجهات أمامية",
  "مهندس برمجيات",
  "مصمم تجربة مستخدم",
  "محلل بيانات",
  "مدير مشاريع تقنية",
  "مطور تطبيقات موبايل",
];

const questions = [
  {
    question: "أخبرني عن نفسك وخبراتك المهنية",
    answer: "ابدأ بملخص موجز عن خلفيتك التعليمية، ثم انتقل إلى خبراتك العملية الأكثر صلة بالوظيفة. ركز على الإنجازات القابلة للقياس واختم بما يميزك عن غيرك من المرشحين.",
    category: "عام",
  },
  {
    question: "لماذا تريد العمل في شركتنا؟",
    answer: "أظهر أنك أجريت بحثاً عن الشركة. اذكر قيم الشركة أو مشاريعها التي تتوافق مع اهتماماتك. اربط إجابتك بأهدافك المهنية وكيف يمكنك المساهمة.",
    category: "عام",
  },
  {
    question: "ما هي نقاط قوتك وضعفك؟",
    answer: "للقوة: اذكر مهارات مرتبطة بالوظيفة مع أمثلة عملية. للضعف: اختر نقطة حقيقية لكن غير جوهرية للوظيفة، واشرح كيف تعمل على تحسينها.",
    category: "عام",
  },
  {
    question: "صف موقفاً تعاملت فيه مع ضغط العمل",
    answer: "استخدم طريقة STAR: الموقف، المهمة، الإجراء، النتيجة. اشرح كيف حددت الأولويات، وتواصلت مع الفريق، وحققت الهدف رغم الضغط.",
    category: "سلوكي",
  },
  {
    question: "كيف تتعامل مع الخلافات مع زملاء العمل؟",
    answer: "أكد على أهمية التواصل المفتوح والاحترام المتبادل. اذكر مثالاً حقيقياً حيث استمعت للطرف الآخر، وجدت أرضية مشتركة، وتوصلت لحل يرضي الجميع.",
    category: "سلوكي",
  },
  {
    question: "أين ترى نفسك بعد خمس سنوات؟",
    answer: "أظهر طموحاً واقعياً يتوافق مع مسار النمو في الشركة. تحدث عن تطوير مهاراتك والمساهمة في نجاح الفريق دون المبالغة في التوقعات.",
    category: "عام",
  },
];

const InterviewPage = () => {
  const [selectedJob, setSelectedJob] = useState(jobTitles[0]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">أسئلة المقابلات</h1>
        <p className="text-muted-foreground">
          استعد لمقابلتك القادمة مع الأسئلة الأكثر شيوعاً والإجابات المثالية
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Job Selection */}
        <div className="lg:col-span-1">
          <div className="card-elevated p-4 sticky top-24">
            <h2 className="font-semibold text-foreground mb-4">اختر المسمى الوظيفي</h2>
            <div className="space-y-2">
              {jobTitles.map((job) => (
                <button
                  key={job}
                  onClick={() => setSelectedJob(job)}
                  className={cn(
                    "w-full text-right px-4 py-3 rounded-lg transition-colors",
                    selectedJob === job
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {job}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button variant="gradient" className="w-full">
                <Sparkles className="w-4 h-4" />
                توليد أسئلة مخصصة
              </Button>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              أسئلة لـ: {selectedJob}
            </h2>
            <div className="ai-indicator">
              <Sparkles className="w-4 h-4" />
              مدعوم بالذكاء الاصطناعي
            </div>
          </div>

          {questions.map((q, index) => (
            <div
              key={index}
              className="card-elevated overflow-hidden"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-5 flex items-start justify-between gap-4 text-right"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs mb-2 inline-block">
                      {q.category}
                    </span>
                    <h3 className="font-semibold text-foreground">{q.question}</h3>
                  </div>
                </div>
                {expandedIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {expandedIndex === index && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="bg-success/5 border border-success/20 rounded-xl p-4 mr-11">
                    <h4 className="text-sm font-medium text-success mb-2">الإجابة المثالية:</h4>
                    <p className="text-foreground leading-relaxed">{q.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPage;
