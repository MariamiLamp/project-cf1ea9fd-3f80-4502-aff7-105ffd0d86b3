import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award,
  Plus,
  Trash2,
  Download,
  Eye,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Calendar,
  Upload,
  FileText,
  Sparkles,
  Wand2,
  Loader2,
  Layout,
  Palette,
  Check
} from "lucide-react";

interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

interface Skill {
  id: string;
  name: string;
  level: "مبتدئ" | "متوسط" | "متقدم" | "خبير";
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

const CVBuilder = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const templates = [
    {
      id: "modern",
      name: "عصري",
      description: "تصميم عصري وأنيق مع ألوان متدرجة",
      primaryColor: "from-primary to-accent",
      style: "gradient"
    },
    {
      id: "classic",
      name: "كلاسيكي",
      description: "تصميم تقليدي واحترافي",
      primaryColor: "bg-slate-800",
      style: "simple"
    },
    {
      id: "creative",
      name: "إبداعي",
      description: "تصميم مبتكر للمجالات الإبداعية",
      primaryColor: "from-purple-500 to-pink-500",
      style: "creative"
    },
    {
      id: "minimal",
      name: "بسيط",
      description: "تصميم بسيط ونظيف",
      primaryColor: "bg-gray-900",
      style: "minimal"
    },
    {
      id: "executive",
      name: "تنفيذي",
      description: "تصميم رسمي للمناصب القيادية",
      primaryColor: "from-emerald-600 to-teal-600",
      style: "executive"
    },
    {
      id: "tech",
      name: "تقني",
      description: "تصميم للمجال التقني والبرمجة",
      primaryColor: "from-cyan-500 to-blue-600",
      style: "tech"
    }
  ];

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: ""
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Handle CV file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate parsing CV file
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock parsed data - in real implementation, this would come from a CV parsing service
    setPersonalInfo({
      fullName: "أحمد محمد علي",
      jobTitle: "مطور برمجيات أول",
      email: "ahmed.ali@email.com",
      phone: "+966 55 123 4567",
      location: "الرياض، المملكة العربية السعودية",
      website: "www.ahmedali.dev",
      linkedin: "linkedin.com/in/ahmedali",
      summary: "مطور برمجيات ذو خبرة تزيد عن 5 سنوات في تطوير تطبيقات الويب والموبايل. متخصص في React وNode.js مع شغف بإنشاء تجارب مستخدم استثنائية."
    });

    setExperiences([
      {
        id: "1",
        company: "شركة التقنية المتقدمة",
        position: "مطور برمجيات أول",
        startDate: "2021-01",
        endDate: "",
        current: true,
        description: "قيادة فريق تطوير من 5 أشخاص، تطوير تطبيقات ويب باستخدام React وTypeScript، تحسين أداء التطبيقات بنسبة 40%"
      },
      {
        id: "2",
        company: "مؤسسة البرمجيات العربية",
        position: "مطور برمجيات",
        startDate: "2019-03",
        endDate: "2020-12",
        current: false,
        description: "تطوير واجهات برمجية RESTful، بناء تطبيقات موبايل باستخدام React Native"
      }
    ]);

    setEducation([
      {
        id: "1",
        institution: "جامعة الملك سعود",
        degree: "بكالوريوس",
        field: "علوم الحاسب",
        startDate: "2015-09",
        endDate: "2019-06",
        grade: "ممتاز مع مرتبة الشرف"
      }
    ]);

    setSkills([
      { id: "1", name: "React.js", level: "خبير" },
      { id: "2", name: "TypeScript", level: "متقدم" },
      { id: "3", name: "Node.js", level: "متقدم" },
      { id: "4", name: "Python", level: "متوسط" }
    ]);

    setCertificates([
      {
        id: "1",
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023-05",
        credentialId: "ABC123XYZ"
      }
    ]);

    setIsUploading(false);
    setShowUploadDialog(false);
    
    toast({
      title: "تم تحليل السيرة الذاتية بنجاح!",
      description: "تم استخراج البيانات وتعبئتها في النموذج. يمكنك تعديلها حسب الحاجة.",
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // AI Generate content for fields
  const generateSummary = async () => {
    if (!personalInfo.jobTitle) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال المسمى الوظيفي أولاً",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating("summary");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const summaries: Record<string, string> = {
      "مطور": "مطور برمجيات محترف يتمتع بخبرة واسعة في تصميم وتطوير التطبيقات والأنظمة البرمجية. أسعى دائماً لتطبيق أفضل الممارسات وأحدث التقنيات لتقديم حلول برمجية عالية الجودة تلبي احتياجات العملاء وتتجاوز توقعاتهم.",
      "مصمم": "مصمم مبدع يتمتع بعين فنية حادة وشغف بإنشاء تصاميم جذابة وعملية. أمتلك خبرة في تصميم واجهات المستخدم وتجربة المستخدم، مع القدرة على تحويل الأفكار إلى تصاميم بصرية مؤثرة.",
      "محلل": "محلل بيانات ذو خبرة في تحليل البيانات المعقدة وتقديم رؤى قيمة تدعم اتخاذ القرارات الاستراتيجية. أمتلك مهارات قوية في استخدام أدوات التحليل والتصور البياني.",
      "مدير": "قائد محترف يتمتع بخبرة في إدارة الفرق والمشاريع وتحقيق الأهداف التنظيمية. أمتلك مهارات قيادية قوية والقدرة على تحفيز الفرق وتطوير الموظفين.",
    };

    let generatedSummary = "محترف طموح يتمتع بخبرة متنوعة ومهارات متميزة. أسعى للتميز في مجال عملي وتقديم قيمة مضافة لأي فريق أنضم إليه.";
    
    for (const [key, value] of Object.entries(summaries)) {
      if (personalInfo.jobTitle.includes(key)) {
        generatedSummary = value;
        break;
      }
    }

    setPersonalInfo({ ...personalInfo, summary: generatedSummary });
    setIsGenerating(null);
    
    toast({
      title: "تم إنشاء النبذة الشخصية!",
      description: "يمكنك تعديلها حسب الحاجة.",
    });
  };

  const generateExperienceDescription = async (expId: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp?.position) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال المسمى الوظيفي أولاً",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(`exp-${expId}`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const descriptions = [
      "• قيادة وتنفيذ المشاريع بكفاءة عالية مع الالتزام بالمواعيد النهائية\n• التعاون مع الفرق المختلفة لتحقيق أهداف المؤسسة\n• تطوير وتحسين العمليات لزيادة الكفاءة والإنتاجية\n• تقديم حلول مبتكرة للتحديات التقنية والعملية",
      "• إدارة المهام اليومية وضمان جودة العمل المقدم\n• المشاركة في اجتماعات الفريق وتقديم التقارير الدورية\n• تدريب وتوجيه أعضاء الفريق الجدد\n• تحسين تجربة العملاء وزيادة مستوى رضاهم",
    ];
    
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    updateExperience(expId, "description", randomDescription);
    setIsGenerating(null);
    
    toast({
      title: "تم إنشاء الوصف!",
    });
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      grade: ""
    }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addSkill = () => {
    setSkills([...skills, {
      id: Date.now().toString(),
      name: "",
      level: "متوسط"
    }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const addCertificate = () => {
    setCertificates([...certificates, {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      credentialId: ""
    }]);
  };

  const removeCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const sections = [
    { id: "personal", label: "المعلومات الشخصية", icon: User },
    { id: "experience", label: "الخبرات العملية", icon: Briefcase },
    { id: "education", label: "التعليم", icon: GraduationCap },
    { id: "skills", label: "المهارات", icon: Code },
    { id: "certificates", label: "الشهادات", icon: Award }
  ];

  const skillLevelColors: Record<string, string> = {
    "مبتدئ": "bg-muted text-muted-foreground",
    "متوسط": "bg-accent/20 text-accent",
    "متقدم": "bg-primary/20 text-primary",
    "خبير": "bg-success/20 text-success"
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                رفع سيرة ذاتية موجودة
              </DialogTitle>
              <DialogDescription>
                قم برفع سيرتك الذاتية وسنقوم بتحليلها واستخراج البيانات تلقائياً
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div 
                className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? (
                  <div className="space-y-4">
                    <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
                    <p className="text-muted-foreground">جاري تحليل السيرة الذاتية...</p>
                  </div>
                ) : (
                  <>
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium">اضغط لرفع الملف</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      يدعم: PDF, DOCX, DOC
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                إلغاء
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Template Selection Dialog */}
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogContent className="max-w-3xl" dir="rtl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary" />
                اختر قالب السيرة الذاتية
              </DialogTitle>
              <DialogDescription>
                اختر القالب المناسب لمجال عملك وأسلوبك
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:scale-105 ${
                      selectedTemplate === template.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className={`h-24 rounded-lg mb-3 ${
                      template.style === "gradient" || template.style === "creative" || template.style === "executive" || template.style === "tech"
                        ? `bg-gradient-to-br ${template.primaryColor}`
                        : template.primaryColor
                    } flex items-center justify-center`}>
                      <div className="w-16 h-20 bg-white/90 rounded shadow-lg flex flex-col p-2">
                        <div className={`h-2 w-8 rounded-full mb-1 ${
                          template.style === "gradient" || template.style === "creative" || template.style === "executive" || template.style === "tech"
                            ? `bg-gradient-to-r ${template.primaryColor}`
                            : template.primaryColor
                        }`} />
                        <div className="h-1 w-10 bg-gray-300 rounded-full mb-1" />
                        <div className="h-1 w-8 bg-gray-200 rounded-full mb-2" />
                        <div className="flex-1 space-y-1">
                          <div className="h-1 w-full bg-gray-200 rounded-full" />
                          <div className="h-1 w-3/4 bg-gray-200 rounded-full" />
                          <div className="h-1 w-full bg-gray-200 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                إلغاء
              </Button>
              <Button onClick={() => {
                setShowTemplateDialog(false);
                toast({
                  title: "تم اختيار القالب!",
                  description: `تم تطبيق قالب "${templates.find(t => t.id === selectedTemplate)?.name}"`,
                });
              }}>
                تطبيق القالب
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">منشئ السيرة الذاتية</h1>
            <p className="text-muted-foreground mt-1">أنشئ سيرتك الذاتية الاحترافية أو قم برفع سيرة موجودة</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowTemplateDialog(true)}
              className="gap-2"
            >
              <Palette className="w-4 h-4" />
              اختر قالب
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowUploadDialog(true)}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              رفع سيرة موجودة
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "إخفاء المعاينة" : "معاينة"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Save className="w-4 h-4" />
              حفظ
            </Button>
            <Button variant="gradient" className="gap-2">
              <Download className="w-4 h-4" />
              تحميل PDF
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "grid-cols-1"}`}>
          {/* Editor Section */}
          <div className="space-y-6">
            {/* Section Navigation */}
            <Card className="card-elevated">
              <CardContent className="p-2">
                <div className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personal Info Section */}
            {activeSection === "personal" && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    المعلومات الشخصية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الاسم الكامل</label>
                      <Input
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                        placeholder="أحمد محمد علي"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">المسمى الوظيفي</label>
                      <Input
                        value={personalInfo.jobTitle}
                        onChange={(e) => setPersonalInfo({...personalInfo, jobTitle: e.target.value})}
                        placeholder="مطور برمجيات أول"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">البريد الإلكتروني</label>
                      <Input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        placeholder="ahmed@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">رقم الهاتف</label>
                      <Input
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        placeholder="+966 5XX XXX XXXX"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الموقع</label>
                      <Input
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        placeholder="الرياض، المملكة العربية السعودية"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">الموقع الإلكتروني</label>
                      <Input
                        value={personalInfo.website}
                        onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                        placeholder="www.mywebsite.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رابط LinkedIn</label>
                    <Input
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">نبذة شخصية</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={generateSummary}
                        disabled={isGenerating === "summary"}
                        className="gap-1 text-primary hover:text-primary"
                      >
                        {isGenerating === "summary" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Wand2 className="w-4 h-4" />
                        )}
                        إنشاء بالذكاء الاصطناعي
                      </Button>
                    </div>
                    <Textarea
                      value={personalInfo.summary}
                      onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                      placeholder="اكتب نبذة مختصرة عن نفسك وخبراتك المهنية..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Experience Section */}
            {activeSection === "experience" && (
              <Card className="card-elevated">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    الخبرات العملية
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={addExperience} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة خبرة
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {experiences.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>لم تضف أي خبرات عملية بعد</p>
                      <Button variant="outline" size="sm" onClick={addExperience} className="mt-4 gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة خبرة
                      </Button>
                    </div>
                  ) : (
                    experiences.map((exp, index) => (
                      <div key={exp.id} className="p-4 border border-border rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">خبرة {index + 1}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeExperience(exp.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">اسم الشركة</label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="اسم الشركة"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">المسمى الوظيفي</label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              placeholder="المسمى الوظيفي"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">تاريخ البدء</label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">تاريخ الانتهاء</label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              disabled={exp.current}
                            />
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                className="rounded"
                              />
                              أعمل هنا حالياً
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">وصف المهام والإنجازات</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => generateExperienceDescription(exp.id)}
                              disabled={isGenerating === `exp-${exp.id}`}
                              className="gap-1 text-primary hover:text-primary"
                            >
                              {isGenerating === `exp-${exp.id}` ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Wand2 className="w-4 h-4" />
                              )}
                              إنشاء
                            </Button>
                          </div>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="اكتب وصفاً لمهامك وإنجازاتك في هذا المنصب..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* Education Section */}
            {activeSection === "education" && (
              <Card className="card-elevated">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    التعليم
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={addEducation} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة تعليم
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {education.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>لم تضف أي مؤهلات تعليمية بعد</p>
                      <Button variant="outline" size="sm" onClick={addEducation} className="mt-4 gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة تعليم
                      </Button>
                    </div>
                  ) : (
                    education.map((edu, index) => (
                      <div key={edu.id} className="p-4 border border-border rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">مؤهل {index + 1}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeEducation(edu.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">المؤسسة التعليمية</label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                              placeholder="اسم الجامعة أو المعهد"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">الدرجة العلمية</label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              placeholder="بكالوريوس، ماجستير، دكتوراه..."
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">التخصص</label>
                            <Input
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                              placeholder="علوم الحاسب، إدارة الأعمال..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">المعدل</label>
                            <Input
                              value={edu.grade}
                              onChange={(e) => updateEducation(edu.id, "grade", e.target.value)}
                              placeholder="ممتاز، 3.8/4.0..."
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">تاريخ البدء</label>
                            <Input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">تاريخ التخرج</label>
                            <Input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* Skills Section */}
            {activeSection === "skills" && (
              <Card className="card-elevated">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    المهارات
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={addSkill} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة مهارة
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>لم تضف أي مهارات بعد</p>
                      <Button variant="outline" size="sm" onClick={addSkill} className="mt-4 gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة مهارة
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                          <div className="flex-1">
                            <Input
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                              placeholder="اسم المهارة"
                              className="border-0 p-0 h-auto focus-visible:ring-0"
                            />
                          </div>
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                            className="px-3 py-1 rounded-md border border-border bg-background text-sm"
                          >
                            <option value="مبتدئ">مبتدئ</option>
                            <option value="متوسط">متوسط</option>
                            <option value="متقدم">متقدم</option>
                            <option value="خبير">خبير</option>
                          </select>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeSkill(skill.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Certificates Section */}
            {activeSection === "certificates" && (
              <Card className="card-elevated">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    الشهادات
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={addCertificate} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة شهادة
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {certificates.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>لم تضف أي شهادات بعد</p>
                      <Button variant="outline" size="sm" onClick={addCertificate} className="mt-4 gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة شهادة
                      </Button>
                    </div>
                  ) : (
                    certificates.map((cert, index) => (
                      <div key={cert.id} className="p-4 border border-border rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">شهادة {index + 1}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeCertificate(cert.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">اسم الشهادة</label>
                            <Input
                              value={cert.name}
                              onChange={(e) => updateCertificate(cert.id, "name", e.target.value)}
                              placeholder="AWS Solutions Architect"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">الجهة المانحة</label>
                            <Input
                              value={cert.issuer}
                              onChange={(e) => updateCertificate(cert.id, "issuer", e.target.value)}
                              placeholder="Amazon Web Services"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">تاريخ الحصول</label>
                            <Input
                              type="month"
                              value={cert.date}
                              onChange={(e) => updateCertificate(cert.id, "date", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">رقم الشهادة</label>
                            <Input
                              value={cert.credentialId}
                              onChange={(e) => updateCertificate(cert.id, "credentialId", e.target.value)}
                              placeholder="ABC123XYZ"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Live Preview */}
          {showPreview && (
            <Card className="card-elevated sticky top-6 h-fit">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    معاينة السيرة الذاتية
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {templates.find(t => t.id === selectedTemplate)?.name}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Template: Modern */}
                {selectedTemplate === "modern" && (
                  <div className="bg-white border border-border rounded-lg overflow-hidden min-h-[600px]">
                    <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                      <h2 className="text-2xl font-bold">{personalInfo.fullName || "الاسم الكامل"}</h2>
                      <p className="opacity-90 mt-1">{personalInfo.jobTitle || "المسمى الوظيفي"}</p>
                      <div className="flex flex-wrap gap-4 mt-4 text-sm opacity-80">
                        {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
                        {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
                        {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      {personalInfo.summary && <p className="text-sm text-gray-600 leading-relaxed">{personalInfo.summary}</p>}
                    </div>
                  </div>
                )}

                {/* Template: Classic */}
                {selectedTemplate === "classic" && (
                  <div className="bg-white border border-border rounded-lg p-6 min-h-[600px]">
                    <div className="text-center border-b-2 border-slate-800 pb-4">
                      <h2 className="text-2xl font-serif font-bold text-slate-800">{personalInfo.fullName || "الاسم الكامل"}</h2>
                      <p className="text-slate-600 mt-1">{personalInfo.jobTitle || "المسمى الوظيفي"}</p>
                      <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-slate-500">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>•</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>•</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                      </div>
                    </div>
                    {personalInfo.summary && <p className="mt-4 text-sm text-gray-600 leading-relaxed text-center">{personalInfo.summary}</p>}
                  </div>
                )}

                {/* Template: Creative */}
                {selectedTemplate === "creative" && (
                  <div className="bg-white border border-border rounded-lg overflow-hidden min-h-[600px]">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10" />
                      <div className="relative p-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                          {personalInfo.fullName?.charAt(0) || "؟"}
                        </div>
                        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {personalInfo.fullName || "الاسم الكامل"}
                        </h2>
                        <p className="text-center text-gray-500 mt-1">{personalInfo.jobTitle || "المسمى الوظيفي"}</p>
                        <div className="flex flex-wrap justify-center gap-3 mt-4">
                          {personalInfo.email && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">{personalInfo.email}</span>}
                          {personalInfo.phone && <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">{personalInfo.phone}</span>}
                        </div>
                      </div>
                    </div>
                    {personalInfo.summary && <p className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">{personalInfo.summary}</p>}
                  </div>
                )}

                {/* Template: Minimal */}
                {selectedTemplate === "minimal" && (
                  <div className="bg-white border border-border rounded-lg p-8 min-h-[600px]">
                    <h2 className="text-3xl font-light text-gray-900">{personalInfo.fullName || "الاسم الكامل"}</h2>
                    <p className="text-gray-400 mt-1 uppercase tracking-widest text-sm">{personalInfo.jobTitle || "المسمى الوظيفي"}</p>
                    <div className="w-12 h-0.5 bg-gray-900 my-6" />
                    <div className="flex flex-wrap gap-6 text-xs text-gray-500">
                      {personalInfo.email && <span>{personalInfo.email}</span>}
                      {personalInfo.phone && <span>{personalInfo.phone}</span>}
                      {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                    {personalInfo.summary && <p className="mt-6 text-sm text-gray-600 leading-loose">{personalInfo.summary}</p>}
                  </div>
                )}

                {/* Template: Executive */}
                {selectedTemplate === "executive" && (
                  <div className="bg-white border border-border rounded-lg overflow-hidden min-h-[600px]">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-1" />
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                          {personalInfo.fullName?.charAt(0) || "؟"}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{personalInfo.fullName || "الاسم الكامل"}</h2>
                          <p className="text-emerald-600 font-medium">{personalInfo.jobTitle || "المسمى الوظيفي"}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
                            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
                          </div>
                        </div>
                      </div>
                      {personalInfo.summary && (
                        <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Template: Tech */}
                {selectedTemplate === "tech" && (
                  <div className="bg-slate-900 border border-border rounded-lg overflow-hidden min-h-[600px] text-white" dir="ltr">
                    <div className="p-6 border-b border-slate-700">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs mb-4 font-mono">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-4">portfolio.tsx</span>
                      </div>
                      <h2 className="text-2xl font-mono">
                        <span className="text-pink-400">const</span>{" "}
                        <span className="text-cyan-400">{personalInfo.fullName?.replace(/\s/g, "_") || "developer"}</span>{" "}
                        <span className="text-white">=</span>{" "}
                        <span className="text-yellow-400">{`{`}</span>
                      </h2>
                      <div className="pl-6 mt-2 text-sm font-mono space-y-1">
                        <p><span className="text-purple-400">role</span>: <span className="text-green-400">"{personalInfo.jobTitle || "Developer"}"</span>,</p>
                        <p><span className="text-purple-400">email</span>: <span className="text-green-400">"{personalInfo.email || "email@example.com"}"</span>,</p>
                        <p><span className="text-purple-400">location</span>: <span className="text-green-400">"{personalInfo.location || "Location"}"</span></p>
                      </div>
                      <p className="text-yellow-400 font-mono">{`}`}</p>
                    </div>
                    {personalInfo.summary && (
                      <div className="p-6">
                        <p className="text-sm text-slate-300 leading-relaxed font-mono" dir="rtl">
                          <span className="text-gray-500">// </span>{personalInfo.summary}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Shared Content Sections for all templates */}
                <div className="bg-white border border-border rounded-lg p-6 mt-4 space-y-6">
                  {/* Experience Preview */}
                  {experiences.length > 0 && (
                    <div>
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        الخبرات العملية
                      </h3>
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{exp.position || "المسمى الوظيفي"}</p>
                                <p className="text-sm text-primary">{exp.company || "اسم الشركة"}</p>
                              </div>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exp.startDate || "البداية"} - {exp.current ? "حتى الآن" : exp.endDate || "النهاية"}
                              </span>
                            </div>
                            {exp.description && (
                              <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education Preview */}
                  {education.length > 0 && (
                    <div>
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        التعليم
                      </h3>
                      <div className="space-y-4">
                        {education.map((edu) => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{edu.degree} - {edu.field || "التخصص"}</p>
                                <p className="text-sm text-primary">{edu.institution || "المؤسسة"}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {edu.endDate || "سنة التخرج"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Preview */}
                  {skills.length > 0 && (
                    <div>
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Code className="w-4 h-4 text-primary" />
                        المهارات
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill.id} className={skillLevelColors[skill.level]}>
                            {skill.name || "مهارة"} • {skill.level}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certificates Preview */}
                  {certificates.length > 0 && (
                    <div>
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        الشهادات
                      </h3>
                      <div className="space-y-3">
                        {certificates.map((cert) => (
                          <div key={cert.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{cert.name || "اسم الشهادة"}</p>
                              <p className="text-sm text-muted-foreground">{cert.issuer || "الجهة المانحة"}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{cert.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {!personalInfo.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && certificates.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <User className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p>ابدأ بملء بياناتك لمشاهدة المعاينة</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CVBuilder;
