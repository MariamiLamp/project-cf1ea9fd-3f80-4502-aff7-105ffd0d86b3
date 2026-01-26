import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Target,
  Sparkles,
  BookOpen,
  Code,
  Trophy,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  Circle,
  Check,
  Rocket,
  GraduationCap,
  Briefcase,
  Star,
  Plus,
  Map,
  Calendar,
  Eye,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  type: "technology" | "course" | "exercise" | "milestone";
  duration: string;
  completed: boolean;
  resources?: { name: string; skills?: string[] }[];
}

interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  items: RoadmapItem[];
  duration: string;
}

interface SavedRoadmap {
  id: string;
  goal: string;
  currentRole: string;
  createdAt: string;
  progress: number;
  phases: RoadmapPhase[];
  isSaved?: boolean;
}

// Mock saved roadmaps data
const mockSavedRoadmaps: SavedRoadmap[] = [
  {
    id: "roadmap-1",
    goal: "مطور أول (Senior Developer)",
    currentRole: "مطور مبتدئ",
    createdAt: "2024-01-15",
    progress: 35,
    phases: [
      {
        id: "phase-1",
        title: "تعزيز الأساسيات",
        description: "بناء قاعدة قوية من المهارات التقنية الأساسية",
        duration: "٢-٣ أشهر",
        items: [
          {
            id: "item-1",
            title: "إتقان TypeScript المتقدم",
            description: "تعلم الأنماط المتقدمة والـ Generics والـ Decorators",
            type: "technology",
            duration: "٣ أسابيع",
            completed: true,
            resources: [
              { name: "TypeScript Deep Dive", skills: ["Generics", "Types"] },
              { name: "Effective TypeScript", skills: ["Best Practices"] },
            ],
          },
          {
            id: "item-2",
            title: "دورة هندسة البرمجيات",
            description: "فهم مبادئ SOLID وأنماط التصميم",
            type: "course",
            duration: "٤ أسابيع",
            completed: true,
            resources: [
              { name: "Clean Code", skills: ["SOLID", "Refactoring"] },
              { name: "Design Patterns", skills: ["Singleton", "Observer"] },
            ],
          },
          {
            id: "item-3",
            title: "بناء مشروع متكامل",
            description: "تطبيق عملي لجميع المفاهيم المتعلمة",
            type: "exercise",
            duration: "٢ أسابيع",
            completed: false,
          },
        ],
      },
      {
        id: "phase-2",
        title: "المهارات المتقدمة",
        description: "اكتساب مهارات تقنية متقدمة مطلوبة للمستوى الأعلى",
        duration: "٣-٤ أشهر",
        items: [
          {
            id: "item-4",
            title: "هندسة النظام (System Design)",
            description: "تعلم تصميم الأنظمة الموزعة والقابلة للتوسع",
            type: "technology",
            duration: "٦ أسابيع",
            completed: false,
            resources: [
              {
                name: "System Design Interview",
                skills: ["Scalability", "Architecture"],
              },
              {
                name: "Designing Data-Intensive Applications",
                skills: ["Databases", "Distributed Systems"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "roadmap-2",
    goal: "مدير منتجات (Product Manager)",
    currentRole: "محلل أعمال",
    createdAt: "2024-02-20",
    progress: 60,
    phases: [
      {
        id: "phase-1",
        title: "أساسيات إدارة المنتجات",
        description: "تعلم المفاهيم الأساسية لإدارة المنتجات",
        duration: "٢ أشهر",
        items: [
          {
            id: "item-1",
            title: "منهجية Agile و Scrum",
            description: "إتقان منهجيات العمل المرنة",
            type: "course",
            duration: "٣ أسابيع",
            completed: true,
            resources: [{ name: "Scrum Guide", skills: ["Scrum", "Agile"] }],
          },
          {
            id: "item-2",
            title: "تحليل السوق",
            description: "دراسة المنافسين واحتياجات العملاء",
            type: "exercise",
            duration: "٤ أسابيع",
            completed: true,
          },
        ],
      },
    ],
  },
  {
    id: "roadmap-3",
    goal: "مهندس DevOps",
    currentRole: "مطور Backend",
    createdAt: "2024-03-10",
    progress: 15,
    phases: [
      {
        id: "phase-1",
        title: "أساسيات DevOps",
        description: "تعلم أدوات ومفاهيم DevOps الأساسية",
        duration: "٣ أشهر",
        items: [
          {
            id: "item-1",
            title: "Docker و Containerization",
            description: "إتقان استخدام Docker والحاويات",
            type: "technology",
            duration: "٤ أسابيع",
            completed: false,
            resources: [
              { name: "Docker Deep Dive", skills: ["Docker", "Containers"] },
            ],
          },
        ],
      },
    ],
  },
];

const CareerPath = () => {
  const { toast } = useToast();
  const [savedRoadmaps, setSavedRoadmaps] =
    useState<SavedRoadmap[]>(mockSavedRoadmaps);
  const [selectedRoadmap, setSelectedRoadmap] = useState<SavedRoadmap | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);
  const [isNewRoadmap, setIsNewRoadmap] = useState(false);

  // Form state
  const [goal, setGoal] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [experience, setExperience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Roadmap interaction state
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [completedResources, setCompletedResources] = useState<Set<string>>(
    new Set(),
  );
  const [openPhases, setOpenPhases] = useState<Set<string>>(
    new Set(["phase-1"]),
  );
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [acquiredSkills, setAcquiredSkills] = useState<Set<string>>(new Set());

  const handleSelectRoadmap = (roadmap: SavedRoadmap) => {
    setSelectedRoadmap(roadmap);
    setShowForm(false);
    setIsNewRoadmap(false);
    // Initialize completed items based on roadmap data
    const completed = new Set<string>();
    roadmap.phases.forEach((phase) => {
      phase.items.forEach((item) => {
        if (item.completed) {
          completed.add(item.id);
        }
      });
    });
    setCompletedItems(completed);
    setOpenPhases(new Set(["phase-1"]));
  };

  const handleSaveRoadmap = () => {
    if (!selectedRoadmap) return;

    const roadmapToSave = { ...selectedRoadmap, isSaved: true };
    setSavedRoadmaps((prev) => [roadmapToSave, ...prev]);
    setSelectedRoadmap(roadmapToSave);
    setIsNewRoadmap(false);

    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ المسار المهني في قائمة المسارات المحفوظة",
    });
  };

  const handleNewRoadmap = () => {
    setSelectedRoadmap(null);
    setShowForm(true);
    setGoal("");
    setCurrentRole("");
    setExperience("");
  };

  const generateRoadmap = () => {
    if (!goal.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const generatedRoadmap: SavedRoadmap = {
        id: `roadmap-${Date.now()}`,
        goal: goal,
        currentRole: currentRole || "غير محدد",
        createdAt: new Date().toISOString().split("T")[0],
        progress: 0,
        phases: [
          {
            id: "phase-1",
            title: "تعزيز الأساسيات",
            description: "بناء قاعدة قوية من المهارات التقنية الأساسية",
            duration: "٢-٣ أشهر",
            items: [
              {
                id: "item-1",
                title: "إتقان المهارات الأساسية",
                description: "تعلم الأنماط المتقدمة في مجالك",
                type: "technology",
                duration: "٣ أسابيع",
                completed: false,
                resources: [
                  { name: "الموارد الأساسية", skills: ["أساسيات", "متقدم"] },
                ],
              },
              {
                id: "item-2",
                title: "دورة تخصصية",
                description: "فهم المبادئ الأساسية في مجالك",
                type: "course",
                duration: "٤ أسابيع",
                completed: false,
                resources: [{ name: "دورة شاملة", skills: ["نظري", "عملي"] }],
              },
              {
                id: "item-3",
                title: "مشروع تطبيقي",
                description: "تطبيق عملي لجميع المفاهيم المتعلمة",
                type: "exercise",
                duration: "٢ أسابيع",
                completed: false,
              },
            ],
          },
          {
            id: "phase-2",
            title: "المهارات المتقدمة",
            description: "اكتساب مهارات متقدمة مطلوبة للمستوى الأعلى",
            duration: "٣-٤ أشهر",
            items: [
              {
                id: "item-4",
                title: "التخصص المتقدم",
                description: "تعلم المهارات المتقدمة في تخصصك",
                type: "technology",
                duration: "٦ أسابيع",
                completed: false,
              },
              {
                id: "item-5",
                title: "الحصول على شهادة",
                description: "شهادة معتمدة في مجال تخصصك",
                type: "milestone",
                duration: "٤ أسابيع",
                completed: false,
              },
            ],
          },
        ],
      };

      setSelectedRoadmap(generatedRoadmap);
      setShowForm(false);
      setIsGenerating(false);
      setIsNewRoadmap(true);
      setCompletedItems(new Set());
      setOpenPhases(new Set(["phase-1"]));
    }, 2500);
  };

  const toggleItemCompletion = (itemId: string) => {
    setCompletedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const togglePhase = (phaseId: string) => {
    setOpenPhases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(phaseId)) {
        newSet.delete(phaseId);
      } else {
        newSet.add(phaseId);
      }
      return newSet;
    });
  };

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getTotalItems = () => {
    if (!selectedRoadmap) return 0;
    return selectedRoadmap.phases.reduce(
      (acc, phase) => acc + phase.items.length,
      0,
    );
  };

  const getCompletedCount = () => completedItems.size;

  const getProgressPercentage = () => {
    const total = getTotalItems();
    if (total === 0) return 0;
    return Math.round((getCompletedCount() / total) * 100);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "technology":
        return <Code className="h-4 w-4" />;
      case "course":
        return <GraduationCap className="h-4 w-4" />;
      case "exercise":
        return <Briefcase className="h-4 w-4" />;
      case "milestone":
        return <Trophy className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case "technology":
        return "تقنية";
      case "course":
        return "دورة";
      case "exercise":
        return "تمرين";
      case "milestone":
        return "إنجاز";
      default:
        return "";
    }
  };

  const getItemTypeBadgeClass = (type: string) => {
    switch (type) {
      case "technology":
        return "bg-primary/10 text-primary border-primary/20";
      case "course":
        return "bg-accent/10 text-accent border-accent/20";
      case "exercise":
        return "bg-warning/10 text-warning border-warning/20";
      case "milestone":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleOpenResource = (resource: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(resource)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCompleteResource = (itemId: string, idx: number) => {
    const resourceKey = `${itemId}-resource-${idx}`;
    setCompletedResources((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(resourceKey)) {
        newSet.delete(resourceKey);
      } else {
        newSet.add(resourceKey);
      }
      return newSet;
    });
  };

  const toggleSkill = (skill: string) => {
    setAcquiredSkills((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(skill)) {
        newSet.delete(skill);
      } else {
        newSet.add(skill);
      }
      return newSet;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-foreground">
              المسار المهني
            </h1>
            <p className="text-muted-foreground mt-1">
              حدد هدفك المهني واحصل على خارطة طريق مخصصة للوصول إليه
            </p>
          </div>
          {isNewRoadmap && selectedRoadmap && (
            <div className="animate-fade-in flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedRoadmap(null);
                  setIsNewRoadmap(false);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                تجاهل
              </Button>
              <Button
                onClick={handleSaveRoadmap}
                className="btn-gradient gap-2 px-6"
              >
                <Save className="h-4 w-4" />
                حفظ المسار
              </Button>
            </div>
          )}
        </div>

        {/* Main Layout: Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" dir="rtl">
          {/* Right Side: Saved Roadmaps Table */}
          <div className="lg:col-span-1">
            <Card className="card-elevated">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    المسارات المحفوظة
                  </CardTitle>
                  <Button
                    onClick={handleNewRoadmap}
                    size="sm"
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table dir="rtl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الهدف المهني</TableHead>
                      <TableHead className="text-right">التقدم</TableHead>
                      <TableHead className="text-center w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedRoadmaps.map((roadmap) => (
                      <TableRow
                        key={roadmap.id}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedRoadmap?.id === roadmap.id
                            ? "bg-primary/5"
                            : ""
                        }`}
                        onClick={() => handleSelectRoadmap(roadmap)}
                      >
                        <TableCell className="text-right">
                          <div className="text-right">
                            <div className="font-bold text-sm text-[#0f172a]">
                              {roadmap.goal}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1 justify-start">
                              <Calendar className="h-3 w-3" />
                              {roadmap.createdAt}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-sm font-medium">
                              {roadmap.progress}%
                            </span>
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${roadmap.progress}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {savedRoadmaps.length === 0 && (
                  <div className="p-8 text-center">
                    <Map className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      لا توجد مسارات محفوظة بعد
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Left Side: Roadmap Viewer / Form */}
          <div className="lg:col-span-2">
            {showForm ? (
              /* Goal Setting Form */
              <Card className="card-elevated">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">حدد هدفك المهني</CardTitle>
                  <p className="text-muted-foreground text-sm mt-2">
                    أخبرنا عن هدفك وسنقوم بإنشاء خارطة طريق مخصصة لك
                  </p>
                </CardHeader>
                <CardContent className="space-y-6 max-w-xl mx-auto">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      ما هو هدفك المهني؟
                    </label>
                    <Input
                      placeholder="مثال: مطور أول (Senior Developer)"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      منصبك الحالي (اختياري)
                    </label>
                    <Input
                      placeholder="مثال: مطور مبتدئ"
                      value={currentRole}
                      onChange={(e) => setCurrentRole(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      سنوات الخبرة (اختياري)
                    </label>
                    <Input
                      placeholder="مثال: ٢ سنوات"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={generateRoadmap}
                    disabled={!goal.trim() || isGenerating}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        جاري إنشاء خارطة الطريق...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        إنشاء خارطة الطريق
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="w-full"
                  >
                    إلغاء
                  </Button>
                </CardContent>
              </Card>
            ) : selectedRoadmap ? (
              /* Roadmap Display */
              <div className="space-y-6">
                {/* Progress Card */}
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-right">
                        <h2 className="text-xl font-bold text-[#0f172a]">
                          {selectedRoadmap.goal}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          من: {selectedRoadmap.currentRole}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">
                            {getProgressPercentage()}%
                          </div>
                          <div className="text-xs text-muted-foreground font-bold">
                            مكتمل
                          </div>
                        </div>
                      </div>
                    </div>
                    <Progress value={getProgressPercentage()} className="h-3" />
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>
                        {getCompletedCount()} من {getTotalItems()} مهمة مكتملة
                      </span>
                      <span>{selectedRoadmap.phases.length} مراحل</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Phases */}
                <div className="space-y-4">
                  {selectedRoadmap.phases.map((phase, phaseIndex) => {
                    const phaseCompleted = phase.items.every((item) =>
                      completedItems.has(item.id),
                    );
                    const phaseProgress =
                      phase.items.length > 0
                        ? Math.round(
                            (phase.items.filter((i) => completedItems.has(i.id))
                              .length /
                              phase.items.length) *
                              100,
                          )
                        : 0;

                    return (
                      <Collapsible
                        key={phase.id}
                        open={openPhases.has(phase.id)}
                        onOpenChange={() => togglePhase(phase.id)}
                        className="overflow-hidden bg-[#f8fafc] rounded-2xl border border-border/50 shadow-sm"
                      >
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between py-4 px-5 bg-white">
                            {/* Right side: Title and Step Number */}
                            <div className="flex items-center gap-5">
                              <div className="w-10 h-10 rounded-xl bg-[#0f172a] flex items-center justify-center text-white text-lg font-black shadow-[0_4px_12px_rgba(15,23,42,0.3)]">
                                {phaseIndex + 1}
                              </div>
                              <div className="text-right">
                                <h3 className="text-base font-black text-[#0f172a] leading-tight">
                                  {phase.title}
                                </h3>
                                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                                  {phase.description}
                                </p>
                              </div>
                            </div>

                            {/* Left side: Progress and Toggle */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className="text-[11px] h-6 border-[#0f172a]/10 text-[#0f172a] bg-[#0f172a]/5 font-medium px-2 rounded-lg"
                                >
                                  <Clock className="h-3 w-3 ms-1" />
                                  {phase.duration}
                                </Badge>
                                <span className="text-sm font-bold text-[#0f172a]">
                                  {
                                    phase.items.filter((i) =>
                                      completedItems.has(i.id),
                                    ).length
                                  }
                                  /{phase.items.length}
                                </span>
                              </div>
                              {openPhases.has(phase.id) ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                          <div className="h-1.5 w-full bg-[#0f172a]" />
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="p-4 space-y-3">
                            {phase.items.map((item) => {
                              const isCompleted = completedItems.has(item.id);

                              return (
                                <Collapsible
                                  key={item.id}
                                  open={openItems.has(item.id)}
                                  onOpenChange={() => toggleItem(item.id)}
                                  className="group"
                                >
                                  <div
                                    className={`p-4 rounded-xl border transition-all duration-300 ${
                                      isCompleted
                                        ? "bg-success/5 border-success/30 shadow-sm"
                                        : "bg-white border-border/50 hover:border-primary/30 shadow-sm"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      {/* Right side: Title and Checkbox */}
                                      <div className="flex items-center gap-4">
                                        <Checkbox
                                          checked={isCompleted}
                                          onCheckedChange={() =>
                                            toggleItemCompletion(item.id)
                                          }
                                          className="rounded-full h-6 w-6 border-muted-foreground/30 data-[state=checked]:bg-success data-[state=checked]:border-success transition-all duration-300 transform active:scale-90"
                                        />
                                        <div className="text-right">
                                          <div className="flex items-center gap-2 justify-end">
                                            <a
                                              href={`https://www.google.com/search?q=${encodeURIComponent(item.title)}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className={`font-black text-sm hover:text-primary transition-colors ${isCompleted ? "line-through text-muted-foreground" : "text-[#0f172a]"}`}
                                            >
                                              {item.title}
                                            </a>
                                            <Badge
                                              variant="outline"
                                              className={`${getItemTypeBadgeClass(item.type)} text-[10px] h-5 py-0 px-2 rounded-full border-primary/10 bg-primary/5 font-bold`}
                                            >
                                              {getItemIcon(item.type)}
                                              {getItemTypeLabel(item.type)}
                                            </Badge>
                                          </div>
                                          <p className="text-[11px] text-muted-foreground font-medium mt-1">
                                            {item.description}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Left side: Toggle and Duration */}
                                      <div className="flex items-center gap-3">
                                        <Badge className="bg-[#0f172a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                                          <Clock className="h-3 w-3" />
                                          {item.duration}
                                        </Badge>
                                        <CollapsibleTrigger asChild>
                                          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/50 transition-colors">
                                            {openItems.has(item.id) ? (
                                              <ChevronUp className="h-4 w-4" />
                                            ) : (
                                              <ChevronDown className="h-4 w-4" />
                                            )}
                                          </button>
                                        </CollapsibleTrigger>
                                      </div>
                                    </div>

                                    <CollapsibleContent>
                                      <div className="mt-4 pt-4 border-t border-dashed border-border/60">
                                        <div className="flex items-center gap-2 mb-4">
                                          <BookOpen className="h-4 w-4 text-[#0f172a]" />
                                          <span className="text-xs font-bold text-[#0f172a]">
                                            المصادر والمراجع
                                          </span>
                                        </div>
                                        <div className="space-y-3">
                                          {item.resources?.map(
                                            (resource, idx) => {
                                              const resourceKey = `${item.id}-resource-${idx}`;
                                              const isResourceCompleted =
                                                completedResources.has(
                                                  resourceKey,
                                                );

                                              return (
                                                <div
                                                  key={idx}
                                                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                                                    isResourceCompleted
                                                      ? "bg-success/5 border-success/30"
                                                      : "bg-muted/30 border-border/40"
                                                  }`}
                                                >
                                                  <div className="text-right">
                                                    <a
                                                      href={`https://www.google.com/search?q=${encodeURIComponent(resource.name)}`}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className={`text-sm font-bold hover:text-primary transition-colors ${isResourceCompleted ? "line-through text-muted-foreground" : "text-[#0f172a]"}`}
                                                    >
                                                      {resource.name}
                                                    </a>
                                                    {resource.skills && (
                                                      <div className="flex gap-1 mt-1">
                                                        {resource.skills.map(
                                                          (skill) => (
                                                            <Badge
                                                              key={skill}
                                                              variant="secondary"
                                                              className="text-[9px] h-4 px-1.5 font-bold bg-white text-muted-foreground"
                                                            >
                                                              {skill}
                                                            </Badge>
                                                          ),
                                                        )}
                                                      </div>
                                                    )}
                                                  </div>
                                                  <Button
                                                    variant={
                                                      isResourceCompleted
                                                        ? "success"
                                                        : "outline"
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                      handleCompleteResource(
                                                        item.id,
                                                        idx,
                                                      )
                                                    }
                                                    className={`h-8 px-4 text-xs font-bold rounded-lg ${
                                                      isResourceCompleted
                                                        ? "bg-success text-white"
                                                        : "bg-white text-muted-foreground hover:text-success border-border/60"
                                                    }`}
                                                  >
                                                    {isResourceCompleted
                                                      ? "مكتمل"
                                                      : "اكتمل"}
                                                  </Button>
                                                </div>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                    </CollapsibleContent>
                                  </div>
                                </Collapsible>
                              );
                            })}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Empty State */
              <Card className="card-elevated">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-6">
                    <Map className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    اختر مساراً مهنياً
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    اختر أحد المسارات المحفوظة من الجدول أو أنشئ مساراً جديداً
                  </p>
                  <Button onClick={handleNewRoadmap} className="gap-2">
                    <Plus className="h-4 w-4" />
                    إنشاء مسار جديد
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CareerPath;
