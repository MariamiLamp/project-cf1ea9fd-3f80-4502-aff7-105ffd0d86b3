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
} from "lucide-react";

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
              { name: "System Design Interview", skills: ["Scalability", "Architecture"] },
              { name: "Designing Data-Intensive Applications", skills: ["Databases", "Distributed Systems"] },
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
            resources: [
              { name: "Scrum Guide", skills: ["Scrum", "Agile"] },
            ],
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
  const [savedRoadmaps] = useState<SavedRoadmap[]>(mockSavedRoadmaps);
  const [selectedRoadmap, setSelectedRoadmap] = useState<SavedRoadmap | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [goal, setGoal] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [experience, setExperience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Roadmap interaction state
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [openPhases, setOpenPhases] = useState<Set<string>>(new Set(["phase-1"]));
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [acquiredSkills, setAcquiredSkills] = useState<Set<string>>(new Set());

  const handleSelectRoadmap = (roadmap: SavedRoadmap) => {
    setSelectedRoadmap(roadmap);
    setShowForm(false);
    // Initialize completed items based on roadmap data
    const completed = new Set<string>();
    roadmap.phases.forEach(phase => {
      phase.items.forEach(item => {
        if (item.completed) {
          completed.add(item.id);
        }
      });
    });
    setCompletedItems(completed);
    setOpenPhases(new Set(["phase-1"]));
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
        createdAt: new Date().toISOString().split('T')[0],
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
                resources: [
                  { name: "دورة شاملة", skills: ["نظري", "عملي"] },
                ],
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
    return selectedRoadmap.phases.reduce((acc, phase) => acc + phase.items.length, 0);
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-row-reverse">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-foreground">المسار المهني</h1>
            <p className="text-muted-foreground mt-1">
              حدد هدفك المهني واحصل على خارطة طريق مخصصة للوصول إليه
            </p>
          </div>
        </div>

        {/* Main Layout: Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Roadmap Viewer / Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
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
                      className="text-right"
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
                      className="text-right"
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
                      className="text-right"
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
                    <div className="flex items-center justify-between mb-4 flex-row-reverse">
                      <div className="text-right">
                        <h2 className="text-xl font-bold text-foreground">
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
                          <div className="text-xs text-muted-foreground">مكتمل</div>
                        </div>
                      </div>
                    </div>
                    <Progress value={getProgressPercentage()} className="h-3" />
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground flex-row-reverse">
                      <span>{getCompletedCount()} من {getTotalItems()} مهمة مكتملة</span>
                      <span>{selectedRoadmap.phases.length} مراحل</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Phases */}
                <div className="space-y-4">
                  {selectedRoadmap.phases.map((phase, phaseIndex) => {
                    const phaseCompleted = phase.items.every((item) =>
                      completedItems.has(item.id)
                    );
                    const phaseProgress =
                      phase.items.length > 0
                        ? Math.round(
                            (phase.items.filter((i) => completedItems.has(i.id)).length /
                              phase.items.length) *
                              100
                          )
                        : 0;

                    return (
                      <Collapsible
                        key={phase.id}
                        open={openPhases.has(phase.id)}
                        onOpenChange={() => togglePhase(phase.id)}
                      >
                        <Card
                          className={`transition-all duration-300 ${
                            phaseCompleted
                              ? "border-success/50 bg-success/5"
                              : "card-elevated"
                          }`}
                        >
                          <CollapsibleTrigger className="w-full">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between flex-row-reverse">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                                      phaseCompleted
                                        ? "bg-success"
                                        : "bg-gradient-to-br from-primary to-secondary"
                                    }`}
                                  >
                                    {phaseCompleted ? (
                                      <Check className="h-5 w-5" />
                                    ) : (
                                      phaseIndex + 1
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <CardTitle className="text-lg">
                                      {phase.title}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                      {phase.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-left">
                                    <Badge variant="outline" className="mb-1">
                                      <Clock className="h-3 w-3 ml-1" />
                                      {phase.duration}
                                    </Badge>
                                    <div className="text-xs text-muted-foreground">
                                      {phaseProgress}% مكتمل
                                    </div>
                                  </div>
                                  {openPhases.has(phase.id) ? (
                                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <CardContent className="pt-0">
                              <div className="space-y-3 mt-4">
                                {phase.items.map((item) => {
                                  const isCompleted = completedItems.has(item.id);

                                  return (
                                    <Collapsible
                                      key={item.id}
                                      open={openItems.has(item.id)}
                                      onOpenChange={() => toggleItem(item.id)}
                                    >
                                      <div
                                        className={`p-4 rounded-xl border transition-all duration-200 ${
                                          isCompleted
                                            ? "bg-success/5 border-success/30"
                                            : "bg-muted/30 border-border/50 hover:border-primary/30"
                                        }`}
                                      >
                                        <div className="flex items-start gap-3 flex-row-reverse">
                                          <Checkbox
                                            checked={isCompleted}
                                            onCheckedChange={() =>
                                              toggleItemCompletion(item.id)
                                            }
                                            className="mt-1"
                                          />
                                          <CollapsibleTrigger className="flex-1 text-right">
                                            <div className="flex items-center justify-between flex-row-reverse">
                                              <div className="flex items-center gap-2">
                                                <Badge
                                                  variant="outline"
                                                  className={`${getItemTypeBadgeClass(
                                                    item.type
                                                  )} gap-1`}
                                                >
                                                  {getItemIcon(item.type)}
                                                  {getItemTypeLabel(item.type)}
                                                </Badge>
                                                <span
                                                  className={`font-medium ${
                                                    isCompleted
                                                      ? "line-through text-muted-foreground"
                                                      : ""
                                                  }`}
                                                >
                                                  {item.title}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <Badge
                                                  variant="secondary"
                                                  className="text-xs"
                                                >
                                                  <Clock className="h-3 w-3 ml-1" />
                                                  {item.duration}
                                                </Badge>
                                                {openItems.has(item.id) ? (
                                                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                )}
                                              </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              {item.description}
                                            </p>
                                          </CollapsibleTrigger>
                                        </div>

                                        <CollapsibleContent>
                                          {item.resources && item.resources.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-border/50">
                                              <h4 className="text-sm font-medium mb-3 text-right flex items-center gap-2 justify-end">
                                                <BookOpen className="h-4 w-4" />
                                                الموارد المقترحة
                                              </h4>
                                              <div className="space-y-2">
                                                {item.resources.map((resource, idx) => {
                                                  const resourceKey = `${item.id}-resource-${idx}`;
                                                  const isResourceCompleted =
                                                    completedResources.has(resourceKey);

                                                  return (
                                                    <div
                                                      key={idx}
                                                      className={`flex items-center justify-between p-3 rounded-lg border transition-all flex-row-reverse ${
                                                        isResourceCompleted
                                                          ? "bg-success/5 border-success/30"
                                                          : "bg-background border-border/50"
                                                      }`}
                                                    >
                                                      <div className="flex items-center gap-3">
                                                        <Checkbox
                                                          checked={isResourceCompleted}
                                                          onCheckedChange={() =>
                                                            handleCompleteResource(item.id, idx)
                                                          }
                                                        />
                                                        <span
                                                          className={`text-sm ${
                                                            isResourceCompleted
                                                              ? "line-through text-muted-foreground"
                                                              : ""
                                                          }`}
                                                        >
                                                          {resource.name}
                                                        </span>
                                                        {resource.skills && (
                                                          <div className="flex gap-1 flex-wrap">
                                                            {resource.skills.map((skill) => (
                                                              <Badge
                                                                key={skill}
                                                                variant="outline"
                                                                className={`text-xs cursor-pointer transition-all ${
                                                                  acquiredSkills.has(skill)
                                                                    ? "bg-primary/10 border-primary/30 text-primary"
                                                                    : ""
                                                                }`}
                                                                onClick={() => toggleSkill(skill)}
                                                              >
                                                                {skill}
                                                              </Badge>
                                                            ))}
                                                          </div>
                                                        )}
                                                      </div>
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                          handleOpenResource(resource.name)
                                                        }
                                                        className="text-primary hover:text-primary/80"
                                                      >
                                                        <BookOpen className="h-4 w-4" />
                                                      </Button>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            </div>
                                          )}
                                        </CollapsibleContent>
                                      </div>
                                    </Collapsible>
                                  );
                                })}
                              </div>
                            </CardContent>
                          </CollapsibleContent>
                        </Card>
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

          {/* Right Side: Saved Roadmaps Table */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="card-elevated">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between flex-row-reverse">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    المسارات المحفوظة
                  </CardTitle>
                  <Button onClick={handleNewRoadmap} size="sm" className="gap-2">
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
                          selectedRoadmap?.id === roadmap.id ? "bg-primary/5" : ""
                        }`}
                        onClick={() => handleSelectRoadmap(roadmap)}
                      >
                        <TableCell className="text-right">
                          <div>
                            <div className="font-medium text-sm">{roadmap.goal}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-1">
                              <Calendar className="h-3 w-3" />
                              {roadmap.createdAt}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-sm font-medium">{roadmap.progress}%</span>
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${roadmap.progress}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CareerPath;
