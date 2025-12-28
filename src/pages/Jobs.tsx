import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Search, SlidersHorizontal, MapPin, Briefcase, Clock, Building2, Bookmark, ArrowLeft, X, Upload, Sparkles, Loader2, FileText, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const jobs = [
  {
    id: 1,
    title: "مطور واجهات أمامية أول",
    company: "شركة التقنية المتقدمة",
    location: "الرياض، السعودية",
    type: "دوام كامل",
    matchScore: 95,
    isNew: true,
    description: "نبحث عن مطور واجهات أمامية متمرس للانضمام إلى فريقنا. المرشح المثالي لديه خبرة في React وTypeScript.",
    requirements: ["خبرة 5+ سنوات في React", "إتقان TypeScript", "خبرة في بناء تطبيقات قابلة للتطوير"],
  },
  {
    id: 2,
    title: "مهندس برمجيات",
    company: "مؤسسة الابتكار الرقمي",
    location: "جدة، السعودية",
    type: "عن بُعد",
    matchScore: 88,
    isSaved: true,
    description: "فرصة للعمل على مشاريع مبتكرة في بيئة عمل مرنة.",
    requirements: ["خبرة في Node.js", "معرفة بقواعد البيانات", "مهارات حل المشكلات"],
  },
  {
    id: 3,
    title: "مصمم تجربة مستخدم",
    company: "استوديو التصميم الإبداعي",
    location: "دبي، الإمارات",
    type: "دوام جزئي",
    matchScore: 82,
    isNew: true,
    description: "نبحث عن مصمم UX مبدع لتحسين تجارب المستخدمين.",
    requirements: ["خبرة في Figma", "فهم عميق لمبادئ UX", "محفظة أعمال قوية"],
  },
  {
    id: 4,
    title: "محلل بيانات",
    company: "شركة البيانات الذكية",
    location: "الرياض، السعودية",
    type: "دوام كامل",
    matchScore: 76,
    description: "انضم لفريق تحليل البيانات لدينا وساهم في اتخاذ قرارات مبنية على البيانات.",
    requirements: ["خبرة في Python و SQL", "معرفة بـ Tableau", "مهارات تحليلية قوية"],
  },
  {
    id: 5,
    title: "مدير مشاريع تقنية",
    company: "شركة الحلول المتكاملة",
    location: "الدمام، السعودية",
    type: "دوام كامل",
    matchScore: 71,
    isSaved: true,
    description: "ندير مشاريع تقنية كبيرة ونحتاج لمدير مشاريع خبير.",
    requirements: ["شهادة PMP", "خبرة 7+ سنوات", "مهارات قيادية"],
  },
  {
    id: 6,
    title: "مطور تطبيقات موبايل",
    company: "شركة التطبيقات الذكية",
    location: "عن بُعد",
    type: "عقد مؤقت",
    matchScore: 68,
    description: "نحتاج مطور موبايل لبناء تطبيقات iOS و Android.",
    requirements: ["خبرة في React Native أو Flutter", "نشر تطبيقات سابقة", "معرفة بـ APIs"],
  },
];

const filters = [
  { label: "نوع العمل", options: ["دوام كامل", "دوام جزئي", "عن بُعد", "عقد مؤقت"] },
  { label: "الموقع", options: ["الرياض", "جدة", "الدمام", "دبي", "عن بُعد"] },
  { label: "مستوى الخبرة", options: ["مبتدئ", "متوسط", "خبير", "مدير"] },
];

const JobsPage = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  
  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    cvFile: null as File | null,
  });
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleApply = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setIsApplyDialogOpen(true);
    setGeneratedCoverLetter("");
    setApplicationForm({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      cvFile: null,
    });
  };

  const handleGenerateCoverLetter = async () => {
    if (!selectedJob) return;
    
    setIsGenerating(true);
    // Mock AI generation - in production, this would call an AI API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockCoverLetter = `السيد/السيدة مدير التوظيف المحترم،

أتقدم بطلبي لشغل وظيفة "${selectedJob.title}" في ${selectedJob.company}. بعد الاطلاع على متطلبات الوظيفة، أجد أن خبراتي ومهاراتي تتوافق بشكل كبير مع ما تبحثون عنه.

${applicationForm.experience ? `لدي خبرة في مجال ${applicationForm.experience}، مما يؤهلني للمساهمة بفعالية في فريقكم.` : "أتمتع بمهارات متنوعة تمكنني من التأقلم والإسهام في تحقيق أهداف الشركة."}

أنا متحمس للانضمام إلى ${selectedJob.company} والمساهمة في نجاح الفريق. أتطلع لفرصة مناقشة كيف يمكنني إضافة قيمة لمنظمتكم.

مع خالص التقدير،
${applicationForm.fullName || "[اسمك]"}`;

    setGeneratedCoverLetter(mockCoverLetter);
    setIsGenerating(false);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generatedCoverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "تم النسخ", description: "تم نسخ خطاب التقديم إلى الحافظة" });
  };

  const handleSubmitApplication = () => {
    toast({
      title: "تم إرسال طلبك بنجاح!",
      description: `تم إرسال طلبك لوظيفة ${selectedJob?.title} في ${selectedJob?.company}`,
    });
    setIsApplyDialogOpen(false);
  };

  const getMatchBadgeClass = (matchScore: number) => {
    if (matchScore >= 80) return "high";
    if (matchScore >= 60) return "medium";
    return "low";
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">فرص العمل</h1>
        <p className="text-muted-foreground">
          اكتشف الوظائف المناسبة لملفك الشخصي ومهاراتك
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card-elevated p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن وظيفة، شركة، أو مهارة..."
              className="w-full h-12 pr-12 pl-4 rounded-lg bg-muted/50 border border-transparent focus:border-primary/30 focus:bg-card focus:outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(activeFilter === filter.label ? null : filter.label)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeFilter === filter.label
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {filter.label}
              </button>
            ))}
            <Button variant="outline" size="default">
              <SlidersHorizontal className="w-4 h-4" />
              المزيد من الفلاتر
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 text-primary">
          <Briefcase className="w-4 h-4" />
          <span className="font-medium">٢٤٧ وظيفة</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>جميع المواقع</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>جميع أنواع الدوام</span>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={job.id}
            className="job-card opacity-0 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
          >
            {/* Company Logo */}
            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
              <Building2 className="w-6 h-6 text-muted-foreground" />
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{job.title}</h3>
                    {job.isNew && (
                      <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                        جديد
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <button
                  className={cn(
                    "p-2 rounded-lg transition-colors shrink-0",
                    job.isSaved
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  <Bookmark className={cn("w-4 h-4", job.isSaved && "fill-current")} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className={cn("match-badge", getMatchBadgeClass(job.matchScore))}>
                  نسبة التوافق: {job.matchScore}%
                </span>
                <button 
                  onClick={() => handleApply(job)}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors group"
                >
                  التقديم الآن
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          تحميل المزيد من الوظائف
        </Button>
      </div>

      {/* Job Application Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              التقديم على وظيفة
            </DialogTitle>
            <DialogDescription>
              {selectedJob && `${selectedJob.title} - ${selectedJob.company}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Job Summary */}
            {selectedJob && (
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">{selectedJob.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{selectedJob.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requirements.map((req, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{req}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Application Form */}
            <div className="space-y-4">
              <h4 className="font-semibold">معلوماتك الشخصية</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    value={applicationForm.fullName}
                    onChange={(e) => setApplicationForm({ ...applicationForm, fullName: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">مجال الخبرة</Label>
                  <Input
                    id="experience"
                    value={applicationForm.experience}
                    onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                    placeholder="مثال: تطوير الويب"
                  />
                </div>
              </div>

              {/* CV Upload */}
              <div className="space-y-2">
                <Label>السيرة الذاتية</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setApplicationForm({ ...applicationForm, cvFile: e.target.files?.[0] || null })}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    {applicationForm.cvFile ? (
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <FileText className="w-8 h-8" />
                        <span className="font-medium">{applicationForm.cvFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          اسحب ملف السيرة الذاتية هنا أو <span className="text-primary">اختر ملف</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (الحد الأقصى 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Letter Generator */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>خطاب التقديم المخصص</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateCoverLetter}
                    disabled={isGenerating}
                    className="gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري التوليد...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        توليد بالذكاء الاصطناعي
                      </>
                    )}
                  </Button>
                </div>
                
                {generatedCoverLetter ? (
                  <div className="relative">
                    <Textarea
                      value={generatedCoverLetter}
                      onChange={(e) => setGeneratedCoverLetter(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCopyLetter}
                      className="absolute top-2 left-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-muted/30 rounded-lg border border-dashed border-border text-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      اضغط على "توليد بالذكاء الاصطناعي" لإنشاء خطاب تقديم مخصص لهذه الوظيفة
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSubmitApplication} className="gap-2">
              <Briefcase className="w-4 h-4" />
              إرسال الطلب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default JobsPage;
