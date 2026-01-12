import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Search, SlidersHorizontal, MapPin, Briefcase, Clock, Building2, Bookmark, ArrowLeft, X, Sparkles, Loader2, FileText, Copy, Check, Eye, Upload } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock saved CV data - in production this would come from user profile/database
const savedCV = {
  fileName: "Ahmed_Mohamed_CV.pdf",
  lastUpdated: "2024-03-15",
  fullName: "أحمد محمد علي",
  email: "ahmed.ali@email.com",
  phone: "+966 55 123 4567",
  jobTitle: "مطور برمجيات أول",
};

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
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(jobs[0]);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  
  // Application form state - pre-filled with saved CV data
  const [applicationForm, setApplicationForm] = useState({
    fullName: savedCV.fullName,
    email: savedCV.email,
    phone: savedCV.phone,
    experience: savedCV.jobTitle,
  });
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectJob = (job: typeof jobs[0]) => {
    setSelectedJob(job);
  };
  const handleApply = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setIsApplyDialogOpen(true);
    setGeneratedCoverLetter("");
    // Pre-fill with saved CV data
    setApplicationForm({
      fullName: savedCV.fullName,
      email: savedCV.email,
      phone: savedCV.phone,
      experience: savedCV.jobTitle,
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
      <div className="mb-6">
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

      {/* Split Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Right Side - Job Details (appears on left in RTL) */}
        <div className="order-2 lg:order-2">
          {selectedJob ? (
            <div className="card-elevated p-6 sticky top-6">
              {/* Company Header */}
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-1">{selectedJob.title}</h2>
                  <p className="text-primary font-medium mb-2">{selectedJob.company}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedJob.type}
                    </span>
                  </div>
                </div>
                <span className={cn("match-badge", getMatchBadgeClass(selectedJob.matchScore))}>
                  {selectedJob.matchScore}%
                </span>
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">وصف الوظيفة</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">المتطلبات</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full"
                onClick={() => handleApply(selectedJob)}
              >
                <Briefcase className="w-5 h-5" />
                التقديم على هذه الوظيفة
              </Button>
            </div>
          ) : (
            <div className="card-elevated p-12 text-center">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">اختر وظيفة</h3>
              <p className="text-muted-foreground">اضغط على أي وظيفة لعرض التفاصيل</p>
            </div>
          )}
        </div>

        {/* Left Side - Job Listings (appears on right in RTL) */}
        <div className="order-1 lg:order-1 space-y-3">
          {/* Stats */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm">
              <Briefcase className="w-4 h-4" />
              <span className="font-medium">٢٤٧ وظيفة</span>
            </div>
          </div>

          {/* Job Cards */}
          {jobs.map((job, index) => (
            <div
              key={job.id}
              onClick={() => handleSelectJob(job)}
              className={cn(
                "p-4 rounded-xl border cursor-pointer transition-all opacity-0 animate-fade-up",
                selectedJob?.id === job.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
              )}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start gap-3">
                {/* Company Logo */}
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground text-sm truncate">{job.title}</h3>
                        {job.isNew && (
                          <span className="px-1.5 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                            جديد
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className={cn(
                        "p-1.5 rounded-lg transition-colors shrink-0",
                        job.isSaved
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <Bookmark className={cn("w-3.5 h-3.5", job.isSaved && "fill-current")} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </span>
                  </div>

                  <span className={cn("match-badge text-xs", getMatchBadgeClass(job.matchScore))}>
                    نسبة التوافق: {job.matchScore}%
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Load More */}
          <div className="text-center pt-4">
            <Button variant="outline" size="default">
              تحميل المزيد من الوظائف
            </Button>
          </div>
        </div>
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

              {/* Saved CV Display */}
              <div className="space-y-2">
                <Label>السيرة الذاتية</Label>
                <div className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{savedCV.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          آخر تحديث: {savedCV.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        عرض
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                      >
                        <Upload className="w-4 h-4" />
                        رفع سيرة أخرى
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Check className="w-3 h-3 text-success" />
                      سيتم إرفاق هذه السيرة الذاتية مع طلبك تلقائياً
                    </p>
                  </div>
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
