import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChevronDown, ChevronUp, Sparkles, Search, Loader2, RefreshCw, Copy, Check, Briefcase, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface GeneratedQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}


const questionsByJobTitle: Record<string, GeneratedQuestion[]> = {
  "مطور واجهات أمامية": [
    {
      id: "fe-1",
      question: "ما الفرق بين CSS Grid و Flexbox؟ متى تستخدم كل منهما؟",
      answer: "Flexbox مصمم للتخطيط في بُعد واحد (صف أو عمود)، بينما Grid مصمم للتخطيط ثنائي الأبعاد (صفوف وأعمدة معاً). استخدم Flexbox للمكونات الصغيرة مثل شريط التنقل، و Grid للتخطيطات الكاملة للصفحة.",
      category: "تقني",
      difficulty: "medium",
    },
    {
      id: "fe-2",
      question: "اشرح مفهوم Virtual DOM في React وكيف يحسن الأداء؟",
      answer: "Virtual DOM هو نسخة خفيفة من DOM الحقيقي محفوظة في الذاكرة. عند حدوث تغييرات، يقارن React بين النسخة الجديدة والقديمة (Diffing) ويحدث فقط العناصر المتغيرة في DOM الحقيقي، مما يقلل العمليات المكلفة.",
      category: "تقني",
      difficulty: "medium",
    },
    {
      id: "fe-3",
      question: "كيف تتعامل مع State Management في تطبيقات React الكبيرة؟",
      answer: "يعتمد الاختيار على حجم التطبيق: Context API للتطبيقات الصغيرة، Redux أو Zustand للتطبيقات الكبيرة. أفضل فصل الـ state إلى: local state للمكونات، global state للبيانات المشتركة، و server state باستخدام React Query.",
      category: "تقني",
      difficulty: "hard",
    },
    {
      id: "fe-4",
      question: "ما هي أفضل الممارسات لتحسين أداء تطبيقات الويب؟",
      answer: "Code splitting و lazy loading للمكونات، تحسين الصور (WebP, lazy loading)، تقليل bundle size، استخدام CDN، تطبيق caching strategies، تجنب re-renders غير الضرورية باستخدام memo و useMemo و useCallback.",
      category: "تقني",
      difficulty: "hard",
    },
    {
      id: "fe-5",
      question: "اشرح كيف يعمل Event Loop في JavaScript؟",
      answer: "JavaScript أحادي الخيط، يستخدم Event Loop لإدارة المهام. الكود المتزامن ينفذ أولاً في Call Stack، المهام غير المتزامنة (setTimeout, Promises) تذهب إلى Web APIs ثم إلى Callback Queue أو Microtask Queue، ثم تنفذ عندما يفرغ الـ Stack.",
      category: "تقني",
      difficulty: "hard",
    },
  ],
  "مهندس برمجيات": [
    {
      id: "se-1",
      question: "اشرح مبادئ SOLID مع أمثلة عملية",
      answer: "S: كل class مسؤول عن شيء واحد. O: مفتوح للتوسيع، مغلق للتعديل. L: الـ subclass يحل محل الـ parent بدون مشاكل. I: واجهات صغيرة ومحددة. D: الاعتماد على abstractions لا implementations.",
      category: "تصميم",
      difficulty: "medium",
    },
    {
      id: "se-2",
      question: "كيف تصمم نظام قابل للتوسع (Scalable System)؟",
      answer: "استخدام microservices، load balancing، horizontal scaling، caching (Redis)، message queues (Kafka/RabbitMQ)، database sharding، CDN للمحتوى الثابت، وتطبيق circuit breaker pattern لمنع cascading failures.",
      category: "تصميم",
      difficulty: "hard",
    },
    {
      id: "se-3",
      question: "ما هي أنماط التصميم (Design Patterns) التي تستخدمها بشكل متكرر؟",
      answer: "Singleton للموارد المشتركة، Factory لإنشاء الكائنات، Observer للإشعارات، Strategy للخوارزميات القابلة للتبديل، Decorator لإضافة سلوكيات ديناميكية، و Repository لفصل منطق البيانات.",
      category: "تصميم",
      difficulty: "medium",
    },
    {
      id: "se-4",
      question: "كيف تضمن جودة الكود في المشاريع؟",
      answer: "Code reviews إلزامية، unit tests مع coverage > 80%، integration tests، linting و formatting تلقائي، CI/CD pipeline، documentation واضحة، و refactoring دوري للـ technical debt.",
      category: "عملي",
      difficulty: "medium",
    },
    {
      id: "se-5",
      question: "اشرح الفرق بين SQL و NoSQL ومتى تستخدم كل منهما؟",
      answer: "SQL: بيانات منظمة، علاقات معقدة، ACID compliance (البنوك). NoSQL: بيانات غير منظمة، scalability أفقي، مرونة في الـ schema (social media, IoT). MongoDB للمستندات، Redis للـ caching، Cassandra للـ time-series.",
      category: "تقني",
      difficulty: "medium",
    },
  ],
  "مصمم تجربة مستخدم": [
    {
      id: "ux-1",
      question: "ما هي عملية التصميم التي تتبعها من البداية للنهاية؟",
      answer: "Discovery (بحث المستخدمين وتحليل المنافسين)، Define (personas و user journeys)، Ideate (sketches و wireframes)، Prototype (تصميم تفاعلي)، Test (usability testing)، Iterate (تحسين مستمر بناءً على الملاحظات).",
      category: "عملي",
      difficulty: "medium",
    },
    {
      id: "ux-2",
      question: "كيف تقيس نجاح التصميم؟",
      answer: "مقاييس كمية: conversion rate, task completion rate, time on task, error rate. مقاييس نوعية: user satisfaction (SUS, NPS), qualitative feedback. A/B testing لمقارنة التصميمات.",
      category: "عملي",
      difficulty: "medium",
    },
    {
      id: "ux-3",
      question: "كيف تتعامل مع متطلبات متناقضة من أصحاب المصلحة؟",
      answer: "استمع لكل الأطراف وافهم أهدافهم الحقيقية، استخدم بيانات المستخدمين كمرجع محايد، قدم حلول وسط مبنية على الأدلة، وركز على أهداف العمل المشتركة.",
      category: "سلوكي",
      difficulty: "medium",
    },
    {
      id: "ux-4",
      question: "ما هي مبادئ Accessibility التي تطبقها؟",
      answer: "WCAG guidelines: contrast ratios كافية، نصوص بديلة للصور، keyboard navigation، screen reader support، تجنب الاعتماد على اللون فقط، وتوفير transcripts للمحتوى الصوتي والمرئي.",
      category: "تقني",
      difficulty: "medium",
    },
    {
      id: "ux-5",
      question: "كيف تجري بحث المستخدمين بميزانية محدودة؟",
      answer: "مقابلات عن بعد (Zoom)، استطلاعات مجانية (Google Forms)، guerrilla testing في الأماكن العامة، تحليل بيانات analytics الموجودة، و competitive analysis للمنافسين.",
      category: "عملي",
      difficulty: "easy",
    },
  ],
  "محلل بيانات": [
    {
      id: "da-1",
      question: "ما هي خطوات تحليل البيانات من البداية للنهاية؟",
      answer: "تحديد المشكلة والأسئلة، جمع البيانات، تنظيف البيانات (handling missing values, outliers)، استكشاف البيانات (EDA)، التحليل الإحصائي أو النمذجة، التصور والعرض، وتقديم التوصيات.",
      category: "عملي",
      difficulty: "medium",
    },
    {
      id: "da-2",
      question: "كيف تتعامل مع البيانات المفقودة أو غير المكتملة؟",
      answer: "أولاً: فهم سبب الفقدان (random, systematic). الخيارات: حذف الصفوف/الأعمدة إذا كانت قليلة، imputation بالمتوسط/الوسيط/المنوال، استخدام algorithms متقدمة مثل KNN imputation، أو إنشاء feature flag للقيم المفقودة.",
      category: "تقني",
      difficulty: "medium",
    },
    {
      id: "da-3",
      question: "اشرح الفرق بين Correlation و Causation مع مثال",
      answer: "Correlation: علاقة إحصائية بين متغيرين. Causation: أحدهما يسبب الآخر. مثال: مبيعات الآيس كريم وحوادث الغرق مرتبطة (correlation) لكن لا يسبب أحدهما الآخر - الطقس الحار هو السبب الحقيقي (confounding variable).",
      category: "تقني",
      difficulty: "medium",
    },
    {
      id: "da-4",
      question: "ما هي أدوات تحليل البيانات التي تتقنها؟",
      answer: "Python (Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn)، SQL للاستعلامات، Excel للتحليل السريع، Tableau/Power BI للتصور، و Jupyter Notebooks للتوثيق والعرض التفاعلي.",
      category: "تقني",
      difficulty: "easy",
    },
    {
      id: "da-5",
      question: "كيف تقدم نتائج تحليل معقدة لجمهور غير تقني؟",
      answer: "ابدأ بالنتيجة الرئيسية (headline)، استخدم visualizations بسيطة وواضحة، تجنب المصطلحات التقنية، اربط النتائج بأهداف العمل، وقدم توصيات عملية قابلة للتنفيذ.",
      category: "سلوكي",
      difficulty: "medium",
    },
  ],
  "مدير مشاريع تقنية": [
    {
      id: "pm-1",
      question: "كيف تتعامل مع scope creep في المشاريع؟",
      answer: "وثيقة نطاق واضحة من البداية، change request process رسمي، تقييم أثر كل تغيير على الوقت والميزانية، التواصل الواضح مع stakeholders، والحفاظ على MoSCoW prioritization.",
      category: "عملي",
      difficulty: "medium",
    },
    {
      id: "pm-2",
      question: "ما الفرق بين Agile و Waterfall ومتى تستخدم كل منهما؟",
      answer: "Waterfall: متطلبات ثابتة، مشاريع قصيرة، قطاعات منظمة (حكومة، بنوك). Agile: متطلبات متغيرة، حاجة لـ feedback سريع، فرق صغيرة. Hybrid approach ممكن حسب المشروع.",
      category: "تقني",
      difficulty: "medium",
    },
    {
      id: "pm-3",
      question: "كيف تحفز فريقك وتحافظ على إنتاجيتهم؟",
      answer: "أهداف واضحة ومشتركة، recognition للإنجازات، إزالة العوائق، توفير فرص النمو، one-on-ones منتظمة، بيئة آمنة للتعبير عن المشاكل، و work-life balance محترم.",
      category: "قيادي",
      difficulty: "medium",
    },
    {
      id: "pm-4",
      question: "صف موقفاً أنقذت فيه مشروعاً متعثراً",
      answer: "استخدم STAR: اشرح الوضع المتأزم، المهمة المطلوبة، الإجراءات التي اتخذتها (تحليل المشكلة، إعادة التخطيط، التواصل مع الأطراف)، والنتيجة الإيجابية مع الدروس المستفادة.",
      category: "سلوكي",
      difficulty: "hard",
    },
    {
      id: "pm-5",
      question: "ما هي مؤشرات الأداء (KPIs) التي تتابعها في المشاريع؟",
      answer: "Velocity و burn-down charts، on-time delivery rate، budget variance، defect density، customer satisfaction، team happiness، و cycle time. الأهم هو اختيار KPIs تتوافق مع أهداف المشروع.",
      category: "عملي",
      difficulty: "medium",
    },
  ],
  "مطور تطبيقات موبايل": [
    {
      id: "mob-1",
      question: "ما الفرق بين Native و Cross-platform development؟",
      answer: "Native (Swift/Kotlin): أداء أفضل، وصول كامل للـ APIs، تجربة مستخدم أصلية، لكن تكلفة أعلى. Cross-platform (React Native/Flutter): كود واحد للمنصتين، تطوير أسرع، لكن قد تحتاج bridges للميزات المتقدمة.",
      category: "تقني",
      difficulty: "medium",
    },
    {
      id: "mob-2",
      question: "كيف تتعامل مع إدارة الذاكرة في تطبيقات الموبايل؟",
      answer: "تجنب memory leaks بإلغاء subscriptions، استخدام weak references حيث مناسب، تحسين الصور (caching, resizing)، lazy loading للمحتوى، و profiling منتظم باستخدام أدوات المنصة.",
      category: "تقني",
      difficulty: "hard",
    },
    {
      id: "mob-3",
      question: "اشرح كيفية عمل offline-first في التطبيقات",
      answer: "تخزين البيانات محلياً (SQLite/Realm)، sync queue للعمليات المعلقة، conflict resolution عند الاتصال، optimistic UI updates، و clear feedback للمستخدم عن حالة الاتصال.",
      category: "تقني",
      difficulty: "hard",
    },
    {
      id: "mob-4",
      question: "كيف تضمن أمان البيانات في تطبيقات الموبايل؟",
      answer: "تشفير البيانات المخزنة (Keychain/Keystore)، HTTPS لكل الاتصالات، certificate pinning، عدم تخزين sensitive data في logs، obfuscation للكود، و secure authentication (OAuth, biometrics).",
      category: "تقني",
      difficulty: "hard",
    },
    {
      id: "mob-5",
      question: "ما هي خطوات نشر التطبيق على App Store/Play Store؟",
      answer: "إعداد developer account، تحضير screenshots و app description، إعداد signing certificates، اختبار على أجهزة حقيقية، التأكد من guidelines compliance، رفع التطبيق، والاستجابة لملاحظات المراجعة.",
      category: "عملي",
      difficulty: "easy",
    },
  ],
};

const topicQuestions: Record<string, GeneratedQuestion[]> = {
  "react": [
    {
      id: "react-1",
      question: "ما الفرق بين useState و useReducer؟",
      answer: "useState للحالات البسيطة (قيمة واحدة أو بسيطة). useReducer للحالات المعقدة (multiple sub-values، logic معقد، الحالة التالية تعتمد على السابقة). useReducer يفصل الـ logic عن المكون ويسهل الاختبار.",
      category: "React Hooks",
      difficulty: "medium",
    },
    {
      id: "react-2",
      question: "اشرح useEffect و cleanup function",
      answer: "useEffect ينفذ side effects بعد render. Cleanup function تنظف الـ subscriptions قبل إعادة تنفيذ الـ effect أو unmount المكون. مهم لتجنب memory leaks مع event listeners و timers و subscriptions.",
      category: "React Hooks",
      difficulty: "medium",
    },
    {
      id: "react-3",
      question: "ما هو React.memo ومتى تستخدمه؟",
      answer: "React.memo هو HOC يمنع re-render إذا لم تتغير الـ props. استخدمه للمكونات التي تعرض نفس النتيجة مع نفس الـ props وعملية الـ render مكلفة. لا تستخدمه في كل مكان - فقط عند الحاجة الفعلية.",
      category: "Performance",
      difficulty: "medium",
    },
  ],
  "javascript": [
    {
      id: "js-1",
      question: "ما الفرق بين var و let و const؟",
      answer: "var: function-scoped، hoisted، يمكن إعادة التعريف. let: block-scoped، hoisted لكن في TDZ، يمكن إعادة القيمة. const: block-scoped، hoisted في TDZ، لا يمكن إعادة القيمة (لكن objects قابلة للتعديل).",
      category: "أساسيات",
      difficulty: "easy",
    },
    {
      id: "js-2",
      question: "اشرح Closures مع مثال عملي",
      answer: "Closure هي دالة تحتفظ بالوصول لمتغيرات النطاق الخارجي حتى بعد انتهاء تنفيذ الدالة الخارجية. مثال: counter function تحتفظ بقيمة count. مفيدة لـ data privacy و factory functions.",
      category: "متقدم",
      difficulty: "medium",
    },
    {
      id: "js-3",
      question: "ما الفرق بين Promise و async/await؟",
      answer: "Promise: طريقة للتعامل مع العمليات غير المتزامنة باستخدام .then() و .catch(). async/await: syntax sugar فوق Promises تجعل الكود يبدو متزامناً. async/await أسهل للقراءة لكن كلاهما يستخدم Promises داخلياً.",
      category: "غير متزامن",
      difficulty: "medium",
    },
  ],
  "sql": [
    {
      id: "sql-1",
      question: "ما الفرق بين INNER JOIN و LEFT JOIN؟",
      answer: "INNER JOIN: يرجع فقط الصفوف المتطابقة في كلا الجدولين. LEFT JOIN: يرجع كل صفوف الجدول الأيسر مع البيانات المتطابقة من الأيمن (NULL إذا لم يوجد تطابق).",
      category: "Joins",
      difficulty: "easy",
    },
    {
      id: "sql-2",
      question: "اشرح الفرق بين WHERE و HAVING",
      answer: "WHERE: تفلتر الصفوف قبل الـ grouping. HAVING: تفلتر المجموعات بعد GROUP BY. استخدم WHERE للشروط على الصفوف الفردية، و HAVING للشروط على aggregate functions.",
      category: "Filtering",
      difficulty: "medium",
    },
    {
      id: "sql-3",
      question: "كيف تحسن أداء الاستعلامات البطيئة؟",
      answer: "إضافة indexes على الأعمدة المستخدمة في WHERE و JOIN، تجنب SELECT *، استخدام EXPLAIN لتحليل الاستعلام، تجنب functions في WHERE على indexed columns، و denormalization عند الحاجة.",
      category: "Performance",
      difficulty: "hard",
    },
  ],
};

const InterviewPage = () => {
  const { toast } = useToast();
  
  // Generator state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"job" | "topic">("job");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [expandedGenIndex, setExpandedGenIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState("5");

  const handleGenerate = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال المسمى الوظيفي أو الموضوع",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedQuestions([]);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    let questions: GeneratedQuestion[] = [];
    const count = parseInt(questionCount);

    if (searchType === "job") {
      // Check if we have predefined questions for this job
      const matchedJob = Object.keys(questionsByJobTitle).find(
        job => job.includes(searchQuery) || searchQuery.includes(job)
      );

      if (matchedJob) {
        questions = questionsByJobTitle[matchedJob].slice(0, count);
      } else {
        // Generate generic questions for the job
        questions = [
          {
            id: `gen-1-${Date.now()}`,
            question: `ما هي أهم المهارات المطلوبة لوظيفة ${searchQuery}؟`,
            answer: `المهارات الأساسية تشمل: الخبرة التقنية في المجال، مهارات التواصل، القدرة على حل المشكلات، العمل الجماعي، والتعلم المستمر. يُنصح بالتركيز على المهارات المذكورة في وصف الوظيفة.`,
            category: "عام",
            difficulty: "easy" as const,
          },
          {
            id: `gen-2-${Date.now()}`,
            question: `كيف تتعامل مع التحديات اليومية في وظيفة ${searchQuery}؟`,
            answer: `أحدد أولويات المهام، أتواصل مع الفريق لحل المشكلات، أستخدم أدوات إدارة المشاريع، وأتعلم من التجارب السابقة لتحسين الأداء المستقبلي.`,
            category: "سلوكي",
            difficulty: "medium" as const,
          },
          {
            id: `gen-3-${Date.now()}`,
            question: `ما الذي يميزك عن المرشحين الآخرين لوظيفة ${searchQuery}؟`,
            answer: `ركز على نقاط قوتك الفريدة، خبراتك العملية ذات الصلة، إنجازاتك القابلة للقياس، ومهاراتك الشخصية التي تضيف قيمة للفريق.`,
            category: "عام",
            difficulty: "medium" as const,
          },
          {
            id: `gen-4-${Date.now()}`,
            question: `كيف تحافظ على تطورك المهني في مجال ${searchQuery}؟`,
            answer: `متابعة أحدث الاتجاهات في المجال، حضور المؤتمرات والدورات، القراءة المستمرة، بناء شبكة علاقات مهنية، وتطبيق المعرفة الجديدة في العمل.`,
            category: "تطوير",
            difficulty: "easy" as const,
          },
          {
            id: `gen-5-${Date.now()}`,
            question: `صف مشروعاً ناجحاً قمت به متعلق بـ ${searchQuery}`,
            answer: `استخدم طريقة STAR: اشرح الموقف والتحدي، المهمة المطلوبة، الإجراءات التي اتخذتها، والنتائج الإيجابية مع الأرقام إن أمكن.`,
            category: "سلوكي",
            difficulty: "medium" as const,
          },
        ].slice(0, count);
      }
    } else {
      // Topic-based questions
      const matchedTopic = Object.keys(topicQuestions).find(
        topic => topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 searchQuery.toLowerCase().includes(topic.toLowerCase())
      );

      if (matchedTopic) {
        questions = topicQuestions[matchedTopic].slice(0, count);
      } else {
        // Generate generic topic questions
        questions = [
          {
            id: `topic-1-${Date.now()}`,
            question: `ما هي أساسيات ${searchQuery}؟`,
            answer: `المفاهيم الأساسية تشمل: التعريف والغرض، المكونات الرئيسية، الاستخدامات الشائعة، وأفضل الممارسات في المجال.`,
            category: "أساسيات",
            difficulty: "easy" as const,
          },
          {
            id: `topic-2-${Date.now()}`,
            question: `ما هي التحديات الشائعة في ${searchQuery} وكيف تتعامل معها؟`,
            answer: `التحديات تختلف حسب السياق، لكن عموماً: فهم المتطلبات جيداً، التخطيط المسبق، التعلم من الأخطاء، والاستفادة من خبرات الآخرين.`,
            category: "متقدم",
            difficulty: "medium" as const,
          },
          {
            id: `topic-3-${Date.now()}`,
            question: `كيف تقارن ${searchQuery} مع البدائل الأخرى؟`,
            answer: `المقارنة تعتمد على: الأداء، سهولة الاستخدام، التكلفة، الدعم المجتمعي، والملاءمة للمشروع. لكل خيار مميزاته وعيوبه.`,
            category: "مقارنة",
            difficulty: "medium" as const,
          },
          {
            id: `topic-4-${Date.now()}`,
            question: `ما هي أفضل الممارسات في ${searchQuery}؟`,
            answer: `اتبع المعايير الصناعية، وثق عملك، اختبر باستمرار، تعلم من المجتمع، وابقَ محدثاً مع التطورات الجديدة.`,
            category: "أفضل الممارسات",
            difficulty: "medium" as const,
          },
          {
            id: `topic-5-${Date.now()}`,
            question: `كيف تتعلم ${searchQuery} بشكل فعال؟`,
            answer: `ابدأ بالأساسيات، طبق ما تعلمته في مشاريع صغيرة، اقرأ التوثيق الرسمي، شارك في المجتمعات، واطلب feedback من الخبراء.`,
            category: "تعلم",
            difficulty: "easy" as const,
          },
        ].slice(0, count);
      }
    }

    setGeneratedQuestions(questions);
    setExpandedGenIndex(0);
    setIsGenerating(false);

    toast({
      title: "تم إنشاء الأسئلة!",
      description: `تم إنشاء ${questions.length} سؤال`,
    });
  };

  const handleCopy = (question: GeneratedQuestion) => {
    const text = `السؤال: ${question.question}\n\nالإجابة: ${question.answer}`;
    navigator.clipboard.writeText(text);
    setCopiedId(question.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ السؤال والإجابة",
    });
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-success/10 text-success border-success/20">سهل</Badge>;
      case "medium":
        return <Badge className="bg-warning/10 text-warning border-warning/20">متوسط</Badge>;
      case "hard":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">صعب</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">أسئلة المقابلات</h1>
        <p className="text-muted-foreground">
          استعد لمقابلتك القادمة مع الأسئلة الأكثر شيوعاً والإجابات المثالية
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Form */}
        <Card className="lg:col-span-1 card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              مولد الأسئلة
            </CardTitle>
            <CardDescription>
              أدخل المسمى الوظيفي أو الموضوع التقني لتوليد أسئلة مخصصة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>نوع البحث</Label>
              <Select value={searchType} onValueChange={(v: "job" | "topic") => setSearchType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      مسمى وظيفي
                    </div>
                  </SelectItem>
                  <SelectItem value="topic">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      موضوع تقني
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{searchType === "job" ? "المسمى الوظيفي" : "الموضوع"}</Label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={searchType === "job" ? "مثال: مطور واجهات أمامية" : "مثال: React, JavaScript, SQL"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>عدد الأسئلة</Label>
              <Select value={questionCount} onValueChange={setQuestionCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 أسئلة</SelectItem>
                  <SelectItem value="5">5 أسئلة</SelectItem>
                  <SelectItem value="10">10 أسئلة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !searchQuery.trim()}
              className="w-full btn-gradient"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  توليد الأسئلة
                </>
              )}
            </Button>

            {generatedQuestions.length > 0 && (
              <Button
                variant="outline"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4" />
                إعادة التوليد
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Generated Questions */}
        <div className="lg:col-span-2 space-y-4">
          {isGenerating ? (
            <Card className="card-elevated">
              <CardContent className="py-12 text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">جاري توليد الأسئلة...</p>
                <p className="text-sm text-muted-foreground mt-2">
                  يتم تحليل {searchType === "job" ? "المسمى الوظيفي" : "الموضوع"} وإنشاء أسئلة مخصصة
                </p>
              </CardContent>
            </Card>
          ) : generatedQuestions.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  الأسئلة المُولدة ({generatedQuestions.length})
                </h2>
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="w-3 h-3" />
                  {searchQuery}
                </Badge>
              </div>

              {generatedQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className="card-elevated overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedGenIndex(expandedGenIndex === index ? null : index)}
                    className="w-full p-5 flex items-start justify-between gap-4 text-right"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                            {q.category}
                          </span>
                          {getDifficultyBadge(q.difficulty)}
                        </div>
                        <h3 className="font-semibold text-foreground">{q.question}</h3>
                      </div>
                    </div>
                    {expandedGenIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {expandedGenIndex === index && (
                    <div className="px-5 pb-5 animate-fade-in">
                      <div className="bg-success/5 border border-success/20 rounded-xl p-4 mr-11">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-success">الإجابة المثالية:</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(q)}
                            className="gap-1"
                          >
                            {copiedId === q.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                تم النسخ
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                نسخ
                              </>
                            )}
                          </Button>
                        </div>
                        <p className="text-foreground leading-relaxed">{q.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <Card className="card-elevated">
              <CardContent className="py-12 text-center">
                <HelpCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">أدخل المسمى الوظيفي أو الموضوع وابدأ التوليد</p>
                <p className="text-sm text-muted-foreground mt-2">
                  سيتم إنشاء أسئلة مخصصة مع إجابات مثالية
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPage;
