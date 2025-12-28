import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  Rocket,
  GraduationCap,
  Briefcase,
  Star
} from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  type: "technology" | "course" | "exercise" | "milestone";
  duration: string;
  completed: boolean;
  resources?: string[];
}

interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  items: RoadmapItem[];
  duration: string;
}

const CareerPath = () => {
  const [goal, setGoal] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [experience, setExperience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[] | null>(null);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [openPhases, setOpenPhases] = useState<Set<string>>(new Set(["phase-1"]));
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleResourceCompletion = (resourceKey: string) => {
    setCompletedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceKey)) {
        newSet.delete(resourceKey);
      } else {
        newSet.add(resourceKey);
      }
      return newSet;
    });
  };

  const generateRoadmap = () => {
    if (!goal.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedRoadmap: RoadmapPhase[] = [
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
              completed: false,
              resources: ["TypeScript Deep Dive", "Effective TypeScript"]
            },
            {
              id: "item-2",
              title: "دورة هندسة البرمجيات",
              description: "فهم مبادئ SOLID وأنماط التصميم",
              type: "course",
              duration: "٤ أسابيع",
              completed: false,
              resources: ["Clean Code", "Design Patterns"]
            },
            {
              id: "item-3",
              title: "بناء مشروع متكامل",
              description: "تطبيق عملي لجميع المفاهيم المتعلمة",
              type: "exercise",
              duration: "٢ أسابيع",
              completed: false
            }
          ]
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
              resources: ["System Design Interview", "Designing Data-Intensive Applications"]
            },
            {
              id: "item-5",
              title: "دورة القيادة التقنية",
              description: "مهارات إدارة الفريق والتواصل الفعال",
              type: "course",
              duration: "٤ أسابيع",
              completed: false,
              resources: ["The Manager's Path", "Staff Engineer"]
            },
            {
              id: "item-6",
              title: "قيادة مراجعة الكود",
              description: "ممارسة مراجعة الكود وتقديم الملاحظات البناءة",
              type: "exercise",
              duration: "مستمر",
              completed: false
            },
            {
              id: "item-7",
              title: "تحسين الأداء",
              description: "تقنيات تحسين أداء التطبيقات",
              type: "technology",
              duration: "٣ أسابيع",
              completed: false
            }
          ]
        },
        {
          id: "phase-3",
          title: "بناء السمعة المهنية",
          description: "تطوير الحضور المهني والمساهمة في المجتمع التقني",
          duration: "٢-٣ أشهر",
          items: [
            {
              id: "item-8",
              title: "المساهمة في مشاريع مفتوحة المصدر",
              description: "المشاركة في مشاريع GitHub معروفة",
              type: "exercise",
              duration: "مستمر",
              completed: false
            },
            {
              id: "item-9",
              title: "كتابة مقالات تقنية",
              description: "مشاركة المعرفة عبر المدونات والمنصات التقنية",
              type: "exercise",
              duration: "مقال شهرياً",
              completed: false
            },
            {
              id: "item-10",
              title: "الحصول على شهادة احترافية",
              description: "شهادة معتمدة في مجال تخصصك",
              type: "milestone",
              duration: "٤ أسابيع",
              completed: false,
              resources: ["AWS Solutions Architect", "Google Cloud Professional"]
            }
          ]
        },
        {
          id: "phase-4",
          title: "الوصول للهدف",
          description: "الخطوات النهائية للوصول إلى المنصب المطلوب",
          duration: "١-٢ شهر",
          items: [
            {
              id: "item-11",
              title: "تحديث السيرة الذاتية",
              description: "إبراز المهارات والإنجازات الجديدة",
              type: "milestone",
              duration: "أسبوع",
              completed: false
            },
            {
              id: "item-12",
              title: "التحضير للمقابلات",
              description: "التدرب على أسئلة المقابلات للمستوى الأعلى",
              type: "exercise",
              duration: "٢ أسابيع",
              completed: false
            },
            {
              id: "item-13",
              title: "التقديم على الفرص",
              description: "البحث والتقديم على الوظائف المناسبة",
              type: "milestone",
              duration: "مستمر",
              completed: false
            }
          ]
        }
      ];
      
      setRoadmap(generatedRoadmap);
      setIsGenerating(false);
    }, 2500);
  };

  const toggleItemCompletion = (itemId: string) => {
    setCompletedItems(prev => {
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
    if (!roadmap) return 0;
    return roadmap.reduce((acc, phase) => acc + phase.items.length, 0);
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

  const resetRoadmap = () => {
    setRoadmap(null);
    setCompletedItems(new Set());
    setOpenPhases(new Set(["phase-1"]));
    setOpenItems(new Set());
  };

  const togglePhase = (phaseId: string) => {
    setOpenPhases(prev => {
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
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">المسار المهني</h1>
            <p className="text-muted-foreground mt-1">
              حدد هدفك المهني واحصل على خارطة طريق مخصصة للوصول إليه
            </p>
          </div>
          {roadmap && (
            <Button variant="outline" onClick={resetRoadmap} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              هدف جديد
            </Button>
          )}
        </div>

        {!roadmap ? (
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
                className="w-full btn-gradient gap-2"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    جاري إنشاء خارطة الطريق...
                  </>
                ) : (
                  <>
                    <Rocket className="h-5 w-5" />
                    إنشاء خارطة الطريق
                  </>
                )}
              </Button>

              {isGenerating && (
                <div className="text-center space-y-3 py-4">
                  <div className="ai-indicator mx-auto">
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                    <span className="text-sm">الذكاء الاصطناعي يحلل ملفك الشخصي...</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Roadmap Display */
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card className="card-elevated bg-gradient-to-l from-primary/5 to-secondary/5">
              <CardContent className="py-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">الهدف: {goal}</h2>
                      <p className="text-sm text-muted-foreground">
                        {getCompletedCount()} من {getTotalItems()} مهمة مكتملة
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-bold text-primary">{getProgressPercentage()}%</div>
                    <div className="text-sm text-muted-foreground">نسبة الإنجاز</div>
                  </div>
                </div>
                <Progress value={getProgressPercentage()} className="h-3" />
              </CardContent>
            </Card>

            {/* Roadmap Phases */}
            <div className="space-y-4">
              {roadmap.map((phase, phaseIndex) => {
                const phaseCompletedCount = phase.items.filter(item => 
                  completedItems.has(item.id)
                ).length;
                const phaseProgress = Math.round((phaseCompletedCount / phase.items.length) * 100);
                const isPhaseOpen = openPhases.has(phase.id);

                return (
                  <Collapsible 
                    key={phase.id} 
                    open={isPhaseOpen}
                    onOpenChange={() => togglePhase(phase.id)}
                  >
                    <Card className="card-elevated overflow-hidden">
                      {/* Phase Header - Collapsible Trigger */}
                      <CollapsibleTrigger asChild>
                        <div className="bg-gradient-to-l from-primary/10 to-transparent p-4 border-b border-border/50 cursor-pointer hover:bg-primary/5 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold
                                ${phaseProgress === 100 ? 'bg-success' : 'bg-gradient-to-br from-primary to-secondary'}`}
                              >
                                {phaseProgress === 100 ? (
                                  <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                  phaseIndex + 1
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-foreground">{phase.title}</h3>
                                <p className="text-sm text-muted-foreground">{phase.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge variant="outline" className="gap-1">
                                <Clock className="h-3 w-3" />
                                {phase.duration}
                              </Badge>
                              <div className="text-sm font-medium text-primary">
                                {phaseCompletedCount}/{phase.items.length}
                              </div>
                              {isPhaseOpen ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                          <Progress value={phaseProgress} className="h-1.5 mt-3" />
                        </div>
                      </CollapsibleTrigger>

                      {/* Phase Items - Collapsible Content */}
                      <CollapsibleContent>
                        <CardContent className="p-4 space-y-3">
                          {phase.items.map((item) => {
                            const isCompleted = completedItems.has(item.id);
                            const isItemOpen = openItems.has(item.id);
                            
                            return (
                              <Collapsible
                                key={item.id}
                                open={isItemOpen}
                                onOpenChange={() => toggleItem(item.id)}
                              >
                                <div 
                                  className={`rounded-xl border transition-all duration-200 ${
                                    isCompleted 
                                      ? 'bg-success/5 border-success/20' 
                                      : 'bg-card border-border hover:border-primary/30 hover:shadow-soft'
                                  }`}
                                >
                                  {/* Item Header - Collapsible Trigger */}
                                  <CollapsibleTrigger asChild>
                                    <div className="p-4 cursor-pointer">
                                      <div className="flex items-center gap-3">
                                        <Checkbox
                                          checked={isCompleted}
                                          onCheckedChange={() => toggleItemCompletion(item.id)}
                                          onClick={(e) => e.stopPropagation()}
                                          className="mt-0"
                                        />
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                              <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                                {item.title}
                                              </h4>
                                              <Badge 
                                                variant="outline" 
                                                className={`text-xs gap-1 ${getItemTypeBadgeClass(item.type)}`}
                                              >
                                                {getItemIcon(item.type)}
                                                {getItemTypeLabel(item.type)}
                                              </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Badge variant="secondary" className="gap-1 text-xs">
                                                <Clock className="h-3 w-3" />
                                                {item.duration}
                                              </Badge>
                                              {isItemOpen ? (
                                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                              ) : (
                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CollapsibleTrigger>

                                  {/* Item Details - Collapsible Content */}
                                  <CollapsibleContent>
                                    <div className="px-4 pb-4 pr-12 space-y-3">
                                      <p className="text-sm text-foreground/80">
                                        {item.description}
                                      </p>
                                      {item.resources && item.resources.length > 0 && (
                                        <div className="space-y-2 pt-2">
                                          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                            <span>المصادر والمراجع</span>
                                          </div>
                                          <div className="space-y-2 mr-6">
                                            {item.resources.map((resource, idx) => {
                                              const resourceKey = `${item.id}-resource-${idx}`;
                                              const isResourceCompleted = completedResources.has(resourceKey);
                                              
                                              return (
                                                <label 
                                                  key={idx} 
                                                  className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-all ${
                                                    isResourceCompleted 
                                                      ? 'bg-success/10 border-success/30' 
                                                      : 'bg-card border-border hover:border-primary/30'
                                                  }`}
                                                >
                                                  <Checkbox
                                                    checked={isResourceCompleted}
                                                    onCheckedChange={() => toggleResourceCompletion(resourceKey)}
                                                  />
                                                  <span className={`text-sm ${
                                                    isResourceCompleted 
                                                      ? 'line-through text-muted-foreground' 
                                                      : 'text-foreground'
                                                  }`}>
                                                    {resource}
                                                  </span>
                                                </label>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </CollapsibleContent>
                                </div>
                              </Collapsible>
                            );
                          })}
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                );
              })}
            </div>

            {/* Completion Celebration */}
            {getProgressPercentage() === 100 && (
              <Card className="card-elevated bg-gradient-to-l from-success/10 to-success/5 border-success/20">
                <CardContent className="py-8 text-center">
                  <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    تهانينا! 🎉
                  </h3>
                  <p className="text-muted-foreground">
                    لقد أكملت جميع المهام في خارطة الطريق. أنت جاهز للوصول إلى هدفك!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CareerPath;
