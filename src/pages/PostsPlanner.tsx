import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Copy, 
  Plus, 
  Sparkles, 
  Trash2,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Edit,
  Bell,
  CheckCircle,
  Target,
  Repeat,
  ListPlus
} from "lucide-react";
import { format, isSameDay, addDays, addWeeks } from "date-fns";
import { ar } from "date-fns/locale";

interface ScheduledPost {
  id: string;
  content: string;
  platform: string;
  date: Date;
  time: string;
  status: "scheduled" | "posted" | "draft";
  topic?: string;
}

interface GeneratedPost {
  id: string;
  content: string;
  platform: string;
  selected: boolean;
}

const platformIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
};

const platformColors: Record<string, string> = {
  facebook: "bg-blue-500",
  twitter: "bg-sky-500",
  linkedin: "bg-blue-700",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
};

const weekDays = [
  { id: "sunday", label: "الأحد" },
  { id: "monday", label: "الإثنين" },
  { id: "tuesday", label: "الثلاثاء" },
  { id: "wednesday", label: "الأربعاء" },
  { id: "thursday", label: "الخميس" },
  { id: "friday", label: "الجمعة" },
  { id: "saturday", label: "السبت" },
];

const PostsPlanner = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  
  // Post Generator State
  const [generatorForm, setGeneratorForm] = useState({
    topic: "",
    platform: "linkedin",
    tone: "professional",
    includeHashtags: true,
    includeEmojis: true,
    postCount: 1,
  });
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  
  // Scheduling State
  const [scheduleMode, setScheduleMode] = useState<"single" | "recurring">("single");
  const [recurringSettings, setRecurringSettings] = useState({
    selectedDays: ["sunday", "tuesday", "thursday"] as string[],
    time: "09:00",
    weeksCount: 4,
    startDate: new Date(),
  });
  
  // New Post State
  const [newPost, setNewPost] = useState({
    content: "",
    platform: "linkedin",
    date: new Date(),
    time: "09:00",
  });
  
  // Scheduled Posts
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      content: "🚀 هل تبحث عن وظيفة أحلامك؟ تعلم كيف تكتب سيرة ذاتية احترافية تجذب انتباه مسؤولي التوظيف! #توظيف #سيرة_ذاتية #تطوير_مهني",
      platform: "linkedin",
      date: new Date(),
      time: "09:00",
      status: "scheduled",
      topic: "نصائح السيرة الذاتية",
    },
    {
      id: "2",
      content: "5 أسرار لاجتياز مقابلة العمل بنجاح 💼✨ اكتشفها الآن! #مقابلات_العمل #نصائح_مهنية",
      platform: "twitter",
      date: new Date(),
      time: "14:00",
      status: "draft",
      topic: "مقابلات العمل",
    },
    {
      id: "3",
      content: "قصة نجاح: كيف حصل أحمد على وظيفة أحلامه خلال أسبوعين فقط باستخدام منصتنا! 🎯🔥",
      platform: "facebook",
      date: new Date(Date.now() + 86400000),
      time: "10:00",
      status: "scheduled",
      topic: "قصص نجاح",
    },
  ]);

  const generatePostContent = (topic: string, platform: string, tone: string, includeHashtags: boolean, includeEmojis: boolean, variation: number): string => {
    const variations = {
      professional: {
        linkedin: [
          `📊 ${topic}\n\nفي عالم الأعمال المتسارع، يعتبر ${topic} من أهم المهارات التي يجب إتقانها.\n\nإليك 3 نصائح عملية:\n1️⃣ ابدأ بتحديد أهدافك بوضوح\n2️⃣ طور مهاراتك باستمرار\n3️⃣ ابنِ شبكة علاقات قوية\n\n${includeHashtags ? "#تطوير_مهني #نصائح_عملية #تطوير_الذات #مهارات_القيادة" : ""}`,
          `💼 ${topic}\n\nالنجاح في سوق العمل يتطلب التميز في ${topic}.\n\nخطوات أساسية:\n• البحث المستمر عن التطوير\n• بناء سمعة مهنية قوية\n• التواصل الفعال مع الآخرين\n\n${includeHashtags ? "#مهارات_مهنية #تطوير_الذات #نجاح" : ""}`,
          `🎯 ${topic}\n\nكيف تتميز في مجالك؟\n\n✅ تعلم باستمرار\n✅ شارك خبراتك\n✅ ابنِ علاقات مهنية\n\nالتميز في ${topic} ليس صعباً!\n\n${includeHashtags ? "#تميز #نجاح_مهني #تطوير" : ""}`,
        ],
        twitter: [
          `💡 ${topic}\n\nهل تعلم أن 80% من النجاح يعتمد على المثابرة والتعلم المستمر؟\n\n${includeEmojis ? "🎯" : ""} ابدأ اليوم ولا تؤجل!\n\n${includeHashtags ? "#تطوير_مهني #نجاح" : ""}`,
          `🚀 ${topic}\n\n3 مفاتيح للنجاح:\n1. التعلم المستمر\n2. التطبيق العملي\n3. المثابرة\n\n${includeHashtags ? "#تحفيز #نجاح" : ""}`,
          `✨ ${topic}\n\nالنجاح = موهبة + عمل شاق + صبر\n\nهل أنت مستعد للرحلة؟\n\n${includeHashtags ? "#تطوير #نجاح_مهني" : ""}`,
        ],
        facebook: [
          `مرحباً أصدقائي! ${includeEmojis ? "👋" : ""}\n\nأردت أن أشارككم تجربتي في ${topic}...\n\nالنجاح ليس صدفة، بل نتيجة عمل دؤوب وتخطيط سليم. ${includeEmojis ? "💪" : ""}\n\nما هي تجربتكم؟ شاركوني في التعليقات! ${includeEmojis ? "⬇️" : ""}\n\n${includeHashtags ? "#نصائح #تطوير_الذات #نجاح" : ""}`,
          `صباح الخير ${includeEmojis ? "☀️" : ""}\n\nاليوم نتكلم عن ${topic}\n\nتجربتي الشخصية علمتني أن النجاح يحتاج:\n• صبر\n• إصرار\n• تعلم مستمر\n\nشاركونا تجاربكم!\n\n${includeHashtags ? "#تجارب #تعلم" : ""}`,
          `${includeEmojis ? "💡" : ""} نصيحة اليوم عن ${topic}\n\nلا تستسلم أبداً! كل خطوة صغيرة تقربك من هدفك.\n\nمن معي؟ ${includeEmojis ? "✋" : ""}\n\n${includeHashtags ? "#نصائح #تحفيز" : ""}`,
        ],
        instagram: [
          `${includeEmojis ? "✨" : ""} ${topic} ${includeEmojis ? "✨" : ""}\n\n.\n.\n.\n${includeEmojis ? "💡" : ""} اكتشف أسرار النجاح\n${includeEmojis ? "🎯" : ""} حدد أهدافك بوضوح\n${includeEmojis ? "💪" : ""} اعمل بجد واستمرارية\n\n${includeHashtags ? "#تطوير_الذات #نجاح #تحفيز #اقتباسات #motivation #success" : ""}`,
          `${includeEmojis ? "🌟" : ""} ${topic}\n\n.\n.\n.\nالنجاح رحلة وليس وجهة ${includeEmojis ? "🚀" : ""}\n\n${includeHashtags ? "#تحفيز #نجاح #إلهام" : ""}`,
          `${topic} ${includeEmojis ? "💫" : ""}\n\n.\n.\n.\n${includeEmojis ? "✅" : ""} خطوة بخطوة نحو القمة\n\n${includeHashtags ? "#نجاح #تطوير #تحفيز" : ""}`,
        ],
      },
      casual: {
        linkedin: [
          `يا جماعة! ${includeEmojis ? "😊" : ""}\n\nخلونا نحكي عن ${topic}...\n\nالموضوع بسيط: اشتغل صح، وتعلم كل يوم شي جديد ${includeEmojis ? "📚" : ""}\n\nشو رأيكم؟\n\n${includeHashtags ? "#تطوير_مهني #نصائح" : ""}`,
          `مين جرب ${topic}؟ ${includeEmojis ? "🤔" : ""}\n\nأنا من تجربتي، الموضوع محتاج:\n- وقت\n- صبر\n- تركيز\n\nشاركوني!\n\n${includeHashtags ? "#تجارب #تعلم" : ""}`,
          `هلا! ${includeEmojis ? "👋" : ""}\n\n${topic} موضوع مهم جداً\n\nخلوني أقول لكم شي: التعلم ما له نهاية!\n\n${includeHashtags ? "#تطوير #نصائح" : ""}`,
        ],
        twitter: [
          `${topic} ${includeEmojis ? "🔥" : ""}\n\nبكل بساطة: لازم نتعلم ونتطور كل يوم!\n\nمين معي؟ ${includeEmojis ? "✋" : ""}\n\n${includeHashtags ? "#تحفيز #نجاح" : ""}`,
          `يا ناس! ${topic} مهم جداً ${includeEmojis ? "💪" : ""}\n\nخلوا التعلم عادة يومية\n\n${includeHashtags ? "#تعلم #نجاح" : ""}`,
          `${includeEmojis ? "🎯" : ""} ${topic}\n\nالسر؟ المحاولة مرة ومرتين وعشر مرات!\n\n${includeHashtags ? "#إصرار #نجاح" : ""}`,
        ],
        facebook: [
          `السلام عليكم! ${includeEmojis ? "👋😄" : ""}\n\nاليوم بدي أحكيكم عن ${topic}...\n\nالموضوع سهل بس محتاج تركيز ${includeEmojis ? "🎯" : ""}\n\nشو رأيكم؟ شاركونا تجاربكم! ${includeEmojis ? "💬" : ""}\n\n${includeHashtags ? "#نصائح #تجارب #تعلم" : ""}`,
          `أهلاً فيكم ${includeEmojis ? "😊" : ""}\n\n${topic} - موضوع اليوم!\n\nتجربتي: الصبر + العمل = النجاح\n\nمين معي؟\n\n${includeHashtags ? "#تجارب #نصائح" : ""}`,
          `كيفكم؟ ${includeEmojis ? "👋" : ""}\n\nخلونا نحكي عن ${topic}\n\nأنا شايف إنه مهم جداً!\n\nشو رأيكم؟\n\n${includeHashtags ? "#حوار #نقاش" : ""}`,
        ],
        instagram: [
          `${topic} ${includeEmojis ? "💫" : ""}\n\n.\n.\n.\nبكل بساطة، النجاح = عمل + صبر ${includeEmojis ? "💪✨" : ""}\n\n${includeHashtags ? "#تحفيز #نجاح #تطوير_الذات #quotes" : ""}`,
          `${includeEmojis ? "🌈" : ""} ${topic}\n\n.\n.\n.\nخليك إيجابي وامشي للأمام!\n\n${includeHashtags ? "#إيجابية #نجاح" : ""}`,
          `${topic} ${includeEmojis ? "✨" : ""}\n\n.\n.\n.\nالحياة قصيرة، استثمرها صح!\n\n${includeHashtags ? "#حياة #نجاح #تحفيز" : ""}`,
        ],
      },
      motivational: {
        linkedin: [
          `${includeEmojis ? "🌟" : ""} ${topic} ${includeEmojis ? "🌟" : ""}\n\nلا تستسلم أبداً! كل خطوة تقربك من هدفك.\n\n${includeEmojis ? "💪" : ""} الفشل ليس النهاية، بل بداية جديدة\n${includeEmojis ? "🎯" : ""} حدد هدفك واعمل بلا توقف\n${includeEmojis ? "🚀" : ""} النجاح قريب لمن يسعى إليه\n\nابدأ اليوم، ولا تنتظر الغد!\n\n${includeHashtags ? "#تحفيز #إلهام #نجاح #لا_تستسلم #motivation" : ""}`,
          `${includeEmojis ? "🔥" : ""} ${topic}\n\nالطريق للنجاح مليء بالتحديات\n\nلكن تذكر:\n• كل عقبة درس\n• كل فشل خطوة للأمام\n• كل يوم فرصة جديدة\n\n${includeHashtags ? "#تحفيز #قوة #نجاح" : ""}`,
          `${topic} ${includeEmojis ? "⭐" : ""}\n\nاليوم هو أول يوم في بقية حياتك\n\nاصنع الفرق!\n\n${includeHashtags ? "#إلهام #تحفيز #نجاح" : ""}`,
        ],
        twitter: [
          `${includeEmojis ? "🔥" : ""} ${topic}\n\nلا تستسلم! كل يوم هو فرصة جديدة للنجاح ${includeEmojis ? "💪" : ""}\n\n${includeHashtags ? "#تحفيز #إلهام #نجاح" : ""}`,
          `${topic} ${includeEmojis ? "🚀" : ""}\n\nالنجاح ليس للمحظوظين، بل للمثابرين!\n\n${includeHashtags ? "#إصرار #نجاح" : ""}`,
          `${includeEmojis ? "⭐" : ""} ${topic}\n\nأنت أقوى مما تعتقد!\n\nصدق بنفسك ${includeEmojis ? "💪" : ""}\n\n${includeHashtags ? "#تحفيز #قوة" : ""}`,
        ],
        facebook: [
          `${includeEmojis ? "✨🌟" : ""} ${topic} ${includeEmojis ? "🌟✨" : ""}\n\nرسالة اليوم:\n\n"لا يهم كم مرة سقطت، المهم كم مرة نهضت"\n\n${includeEmojis ? "💪" : ""} أنت أقوى مما تعتقد\n${includeEmojis ? "🎯" : ""} أحلامك تستحق المحاولة\n${includeEmojis ? "🚀" : ""} ابدأ الآن!\n\nشارك المنشور لتحفيز غيرك! ${includeEmojis ? "❤️" : ""}\n\n${includeHashtags ? "#تحفيز #إلهام #نجاح #أقوال #حكم" : ""}`,
          `صباح الإلهام ${includeEmojis ? "🌅" : ""}\n\n${topic}\n\nتذكر: النجاح رحلة وليس وجهة!\n\nكل خطوة مهمة ${includeEmojis ? "👣" : ""}\n\n${includeHashtags ? "#تحفيز #إلهام" : ""}`,
          `${includeEmojis ? "🔥" : ""} ${topic}\n\nاليوم قرر أن تكون أفضل نسخة من نفسك!\n\nمين معي؟ ${includeEmojis ? "✋💪" : ""}\n\n${includeHashtags ? "#تحفيز #تطوير_الذات" : ""}`,
        ],
        instagram: [
          `${includeEmojis ? "🔥" : ""} ${topic} ${includeEmojis ? "🔥" : ""}\n\n.\n.\n.\n${includeEmojis ? "💪" : ""} لا تستسلم أبداً\n${includeEmojis ? "🌟" : ""} أنت قادر على تحقيق المستحيل\n${includeEmojis ? "🚀" : ""} ابدأ اليوم!\n\n${includeHashtags ? "#تحفيز #إلهام #نجاح #motivation #success #quotes #اقتباسات" : ""}`,
          `${topic} ${includeEmojis ? "⭐" : ""}\n\n.\n.\n.\nالنجاح يبدأ بخطوة واحدة ${includeEmojis ? "👣" : ""}\n\n${includeHashtags ? "#تحفيز #نجاح #إلهام" : ""}`,
          `${includeEmojis ? "✨" : ""} ${topic}\n\n.\n.\n.\nصدق بنفسك وانطلق! ${includeEmojis ? "🚀" : ""}\n\n${includeHashtags ? "#ثقة #نجاح #تحفيز" : ""}`,
        ],
      },
    };
    
    const toneVariations = variations[tone as keyof typeof variations] || variations.professional;
    const platformVariations = toneVariations[platform as keyof typeof toneVariations] || toneVariations.linkedin;
    const index = variation % platformVariations.length;
    
    return platformVariations[index];
  };

  const handleGeneratePost = async () => {
    if (!generatorForm.topic) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال موضوع المنشور",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const posts: GeneratedPost[] = [];
    for (let i = 0; i < generatorForm.postCount; i++) {
      posts.push({
        id: `gen-${Date.now()}-${i}`,
        content: generatePostContent(
          generatorForm.topic,
          generatorForm.platform,
          generatorForm.tone,
          generatorForm.includeHashtags,
          generatorForm.includeEmojis,
          i
        ),
        platform: generatorForm.platform,
        selected: true,
      });
    }
    
    setGeneratedPosts(posts);
    setIsGenerating(false);
    
    toast({
      title: `تم إنشاء ${posts.length} منشور!`,
      description: "يمكنك نسخها أو جدولتها الآن",
    });
  };

  const handleCopyPost = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ المنشور إلى الحافظة",
    });
  };

  const handleTogglePostSelection = (id: string) => {
    setGeneratedPosts(posts => 
      posts.map(p => p.id === id ? { ...p, selected: !p.selected } : p)
    );
  };

  const handleUpdatePostContent = (id: string, content: string) => {
    setGeneratedPosts(posts =>
      posts.map(p => p.id === id ? { ...p, content } : p)
    );
  };

  const handleDeleteGeneratedPost = (id: string) => {
    setGeneratedPosts(posts => posts.filter(p => p.id !== id));
  };

  const getRecurringDates = (): Date[] => {
    const dates: Date[] = [];
    const startDate = recurringSettings.startDate;
    
    for (let week = 0; week < recurringSettings.weeksCount; week++) {
      const weekStart = addWeeks(startDate, week);
      
      recurringSettings.selectedDays.forEach(day => {
        const dayIndex = weekDays.findIndex(d => d.id === day);
        const currentDayIndex = weekStart.getDay();
        let daysToAdd = dayIndex - currentDayIndex;
        if (daysToAdd < 0) daysToAdd += 7;
        
        const targetDate = addDays(weekStart, daysToAdd);
        if (targetDate >= startDate) {
          dates.push(targetDate);
        }
      });
    }
    
    return dates.sort((a, b) => a.getTime() - b.getTime());
  };

  const handleScheduleSelectedPosts = () => {
    const selectedPosts = generatedPosts.filter(p => p.selected);
    if (selectedPosts.length === 0) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار منشور واحد على الأقل",
        variant: "destructive",
      });
      return;
    }
    
    setIsScheduleDialogOpen(true);
  };

  const handleConfirmSchedule = () => {
    const selectedPosts = generatedPosts.filter(p => p.selected);
    
    if (scheduleMode === "single") {
      // Schedule all posts on selected date
      const newPosts: ScheduledPost[] = selectedPosts.map((post, index) => ({
        id: `${Date.now()}-${index}`,
        content: post.content,
        platform: post.platform,
        date: selectedDate,
        time: `${9 + index}:00`.padStart(5, '0'),
        status: "scheduled" as const,
        topic: generatorForm.topic,
      }));
      
      setScheduledPosts(prev => [...prev, ...newPosts]);
      
      toast({
        title: "تمت الجدولة!",
        description: `تم جدولة ${newPosts.length} منشور في ${format(selectedDate, "dd MMMM yyyy", { locale: ar })}`,
      });
    } else {
      // Recurring schedule
      const recurringDates = getRecurringDates();
      const newPosts: ScheduledPost[] = [];
      
      selectedPosts.forEach((post, postIndex) => {
        recurringDates.forEach((date, dateIndex) => {
          // Distribute posts across dates
          if ((dateIndex + postIndex) % selectedPosts.length === postIndex) {
            newPosts.push({
              id: `${Date.now()}-${postIndex}-${dateIndex}`,
              content: post.content,
              platform: post.platform,
              date: date,
              time: recurringSettings.time,
              status: "scheduled" as const,
              topic: generatorForm.topic,
            });
          }
        });
      });
      
      setScheduledPosts(prev => [...prev, ...newPosts]);
      
      toast({
        title: "تمت الجدولة!",
        description: `تم جدولة ${newPosts.length} منشور على مدار ${recurringSettings.weeksCount} أسابيع`,
      });
    }
    
    setGeneratedPosts([]);
    setGeneratorForm({ ...generatorForm, topic: "" });
    setIsScheduleDialogOpen(false);
  };

  const handleAddPost = () => {
    if (!newPost.content) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال محتوى المنشور",
        variant: "destructive",
      });
      return;
    }

    const post: ScheduledPost = {
      id: Date.now().toString(),
      content: newPost.content,
      platform: newPost.platform,
      date: newPost.date,
      time: newPost.time,
      status: "scheduled",
    };

    setScheduledPosts([...scheduledPosts, post]);
    setNewPost({ content: "", platform: "linkedin", date: new Date(), time: "09:00" });
    setIsAddPostOpen(false);
    
    toast({
      title: "تمت الإضافة!",
      description: "تم إضافة المنشور إلى الجدول",
    });
  };

  const handleDeletePost = (id: string) => {
    setScheduledPosts(scheduledPosts.filter(p => p.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف المنشور من الجدول",
    });
  };

  const handleMarkAsPosted = (id: string) => {
    setScheduledPosts(scheduledPosts.map(p => 
      p.id === id ? { ...p, status: "posted" as const } : p
    ));
    toast({
      title: "تم التحديث",
      description: "تم تحديث حالة المنشور",
    });
  };

  const postsForSelectedDate = scheduledPosts.filter(p => 
    isSameDay(p.date, selectedDate)
  );

  const getDatesWithPosts = () => {
    return scheduledPosts.map(p => p.date);
  };

  const toggleDaySelection = (dayId: string) => {
    setRecurringSettings(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayId)
        ? prev.selectedDays.filter(d => d !== dayId)
        : [...prev.selectedDays, dayId],
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              مخطط المنشورات
            </h1>
            <p className="text-muted-foreground mt-1">
              أنشئ وجدول منشوراتك لمنصات التواصل الاجتماعي
            </p>
          </div>
          <Dialog open={isAddPostOpen} onOpenChange={setIsAddPostOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 ml-2" />
                إضافة منشور جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg" dir="rtl">
              <DialogHeader>
                <DialogTitle>إضافة منشور جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>المحتوى</Label>
                  <Textarea
                    placeholder="اكتب محتوى المنشور..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>المنصة</Label>
                    <Select value={newPost.platform} onValueChange={(v) => setNewPost({ ...newPost, platform: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>الوقت</Label>
                    <Input
                      type="time"
                      value={newPost.time}
                      onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>التاريخ</Label>
                  <Calendar
                    mode="single"
                    selected={newPost.date}
                    onSelect={(date) => date && setNewPost({ ...newPost, date })}
                    className="rounded-md border pointer-events-auto"
                    locale={ar}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPostOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddPost}>
                  إضافة المنشور
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scheduledPosts.filter(p => p.status === "scheduled").length}</p>
                <p className="text-sm text-muted-foreground">منشورات مجدولة</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scheduledPosts.filter(p => p.status === "posted").length}</p>
                <p className="text-sm text-muted-foreground">تم نشرها</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Edit className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scheduledPosts.filter(p => p.status === "draft").length}</p>
                <p className="text-sm text-muted-foreground">مسودات</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{postsForSelectedDate.length}</p>
                <p className="text-sm text-muted-foreground">منشورات اليوم</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="generator" className="space-y-6">
          <div className="flex justify-end">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="calendar" className="gap-2">
                <CalendarIcon className="w-4 h-4" />
                التقويم والجدولة
              </TabsTrigger>
              <TabsTrigger value="generator" className="gap-2">
                <Sparkles className="w-4 h-4" />
                مولد المنشورات
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Generator Tab */}
          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Generated Posts Preview - Now on left */}
              <Card className="bg-card border-border order-2 lg:order-1">
                <CardHeader className="text-right">
                  <CardTitle className="flex items-center justify-end gap-2">
                    <span>المنشورات المُنشأة</span>
                    <Edit className="w-5 h-5 text-primary" />
                    {generatedPosts.length > 0 && (
                      <Badge variant="secondary" className="mr-auto">{generatedPosts.filter(p => p.selected).length} مختار</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-right">
                    اختر المنشورات وجدولها بتواريخ مختلفة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {generatedPosts.length > 0 ? (
                    <>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          {generatedPosts.map((post, index) => (
                            <div 
                              key={post.id} 
                              className={`p-4 rounded-lg border transition-all ${
                                post.selected ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteGeneratedPost(post.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                                <div className="flex items-center gap-3">
                                  <span className="font-medium">منشور {index + 1}</span>
                                  <div className={`w-8 h-8 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white`}>
                                    {platformIcons[post.platform]}
                                  </div>
                                  <Checkbox
                                    checked={post.selected}
                                    onCheckedChange={() => handleTogglePostSelection(post.id)}
                                  />
                                </div>
                              </div>
                              <Textarea
                                value={post.content}
                                onChange={(e) => handleUpdatePostContent(post.id, e.target.value)}
                                rows={6}
                                className="font-medium text-sm text-right"
                                dir="rtl"
                              />
                              <div className="flex justify-end">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleCopyPost(post.content)}
                                  className="mt-2"
                                >
                                  <Copy className="w-3 h-3 ml-1" />
                                  نسخ
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <Button 
                        onClick={handleScheduleSelectedPosts} 
                        className="w-full"
                        disabled={generatedPosts.filter(p => p.selected).length === 0}
                      >
                        <CalendarIcon className="w-4 h-4 ml-2" />
                        جدولة المنشورات المختارة
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                      <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                      <p>أدخل موضوعاً واضغط على "إنشاء المنشورات"</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generator Form - Now on right */}
              <Card className="bg-card border-border order-1 lg:order-2">
                <CardHeader className="text-right">
                  <CardTitle className="flex items-center justify-end gap-2">
                    <span>مولد المنشورات بالذكاء الاصطناعي</span>
                    <Sparkles className="w-5 h-5 text-primary" />
                  </CardTitle>
                  <CardDescription className="text-right">
                    أدخل الموضوع واختر عدد المنشورات لإنشائها
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-right">
                    <Label>موضوع المنشور</Label>
                    <Input
                      className="text-right"
                      placeholder="مثال: نصائح لكتابة سيرة ذاتية احترافية"
                      value={generatorForm.topic}
                      onChange={(e) => setGeneratorForm({ ...generatorForm, topic: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-right">
                      <Label>المنصة</Label>
                      <Select 
                        value={generatorForm.platform} 
                        onValueChange={(v) => setGeneratorForm({ ...generatorForm, platform: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linkedin">
                            <div className="flex items-center gap-2">
                              <Linkedin className="w-4 h-4" />
                              LinkedIn
                            </div>
                          </SelectItem>
                          <SelectItem value="twitter">
                            <div className="flex items-center gap-2">
                              <Twitter className="w-4 h-4" />
                              Twitter
                            </div>
                          </SelectItem>
                          <SelectItem value="facebook">
                            <div className="flex items-center gap-2">
                              <Facebook className="w-4 h-4" />
                              Facebook
                            </div>
                          </SelectItem>
                          <SelectItem value="instagram">
                            <div className="flex items-center gap-2">
                              <Instagram className="w-4 h-4" />
                              Instagram
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 text-right">
                      <Label>نبرة المنشور</Label>
                      <Select 
                        value={generatorForm.tone} 
                        onValueChange={(v) => setGeneratorForm({ ...generatorForm, tone: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">احترافي</SelectItem>
                          <SelectItem value="casual">عادي</SelectItem>
                          <SelectItem value="motivational">تحفيزي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Label className="flex items-center justify-end gap-2">
                      <span>عدد المنشورات</span>
                      <ListPlus className="w-4 h-4" />
                    </Label>
                    <Select 
                      value={generatorForm.postCount.toString()} 
                      onValueChange={(v) => setGeneratorForm({ ...generatorForm, postCount: parseInt(v) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">منشور واحد</SelectItem>
                        <SelectItem value="3">3 منشورات</SelectItem>
                        <SelectItem value="5">5 منشورات</SelectItem>
                        <SelectItem value="7">7 منشورات (أسبوع)</SelectItem>
                        <SelectItem value="10">10 منشورات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-sm">إضافة هاشتاقات</span>
                      <input
                        type="checkbox"
                        checked={generatorForm.includeHashtags}
                        onChange={(e) => setGeneratorForm({ ...generatorForm, includeHashtags: e.target.checked })}
                        className="rounded border-border"
                      />
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-sm">إضافة إيموجي</span>
                      <input
                        type="checkbox"
                        checked={generatorForm.includeEmojis}
                        onChange={(e) => setGeneratorForm({ ...generatorForm, includeEmojis: e.target.checked })}
                        className="rounded border-border"
                      />
                    </label>
                  </div>

                  <Button 
                    onClick={handleGeneratePost} 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                        جاري الإنشاء...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 ml-2" />
                        إنشاء {generatorForm.postCount > 1 ? `${generatorForm.postCount} منشورات` : "المنشور"}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="flex flex-col lg:flex-row-reverse gap-6">
              {/* Calendar - Now on right */}
              <Card className="bg-card border-border w-full lg:w-auto lg:flex-shrink-0">
                <CardHeader className="text-right">
                  <CardTitle className="flex items-center justify-end gap-2">
                    <span>التقويم</span>
                    <CalendarIcon className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border pointer-events-auto"
                    locale={ar}
                    modifiers={{
                      hasPost: getDatesWithPosts(),
                    }}
                    modifiersStyles={{
                      hasPost: {
                        backgroundColor: "hsl(var(--primary) / 0.2)",
                        borderRadius: "50%",
                      },
                    }}
                  />
                  <div className="mt-4 flex items-center justify-end gap-2 text-sm text-muted-foreground">
                    <span>أيام تحتوي على منشورات</span>
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                  </div>
                </CardContent>
              </Card>

              {/* Posts for Selected Date - Now on left */}
              <Card className="bg-card border-border flex-1 min-h-[400px]">
                <CardHeader className="text-right">
                  <CardTitle className="flex items-center justify-end gap-2">
                    <Badge variant="secondary" className="mr-auto">{postsForSelectedDate.length} منشور</Badge>
                    <span>منشورات {format(selectedDate, "dd MMMM yyyy", { locale: ar })}</span>
                    <Clock className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {postsForSelectedDate.length > 0 ? (
                      <div className="space-y-4">
                        {postsForSelectedDate.map((post) => (
                          <Card key={post.id} className="bg-muted/30 border-border">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-2">
                                  <Badge 
                                    variant={
                                      post.status === "posted" ? "default" : 
                                      post.status === "scheduled" ? "secondary" : "outline"
                                    }
                                  >
                                    {post.status === "posted" ? "تم النشر" : 
                                     post.status === "scheduled" ? "مجدول" : "مسودة"}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <p className="font-medium capitalize">{post.platform}</p>
                                    <p className="text-sm text-muted-foreground flex items-center justify-end gap-1">
                                      {post.time}
                                      <Clock className="w-3 h-3" />
                                    </p>
                                  </div>
                                  <div className={`w-10 h-10 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white`}>
                                    {platformIcons[post.platform]}
                                  </div>
                                </div>
                              </div>
                              <p className="mt-3 text-sm whitespace-pre-wrap text-right">{post.content}</p>
                              {post.topic && (
                                <p className="mt-2 text-xs text-muted-foreground text-right">
                                  الموضوع: {post.topic}
                                </p>
                              )}
                              <div className="flex gap-2 mt-4 justify-end">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash2 className="w-3 h-3 ml-1" />
                                  حذف
                                </Button>
                                {post.status !== "posted" && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-green-500 hover:text-green-600"
                                    onClick={() => handleMarkAsPosted(post.id)}
                                  >
                                    <CheckCircle className="w-3 h-3 ml-1" />
                                    تم النشر
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    navigator.clipboard.writeText(post.content);
                                    toast({ title: "تم النسخ!" });
                                  }}
                                >
                                  <Copy className="w-3 h-3 ml-1" />
                                  نسخ
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>لا توجد منشورات مجدولة لهذا اليوم</p>
                          <Button 
                            variant="link" 
                            className="mt-2"
                            onClick={() => setIsAddPostOpen(true)}
                          >
                            إضافة منشور جديد
                          </Button>
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* All Scheduled Posts */}
            <Card className="bg-card border-border">
              <CardHeader className="text-right">
                <CardTitle className="flex items-center justify-end gap-2">
                  <span>جميع المنشورات المجدولة</span>
                  <Bell className="w-5 h-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {scheduledPosts
                      .filter(p => p.status === "scheduled")
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((post) => (
                        <div 
                          key={post.id} 
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedDate(post.date)}
                        >
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post.id);
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-sm font-medium line-clamp-1">{post.content.substring(0, 50)}...</p>
                              <p className="text-xs text-muted-foreground">
                                {format(post.date, "dd MMMM yyyy", { locale: ar })} - {post.time}
                              </p>
                            </div>
                            <div className={`w-8 h-8 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white`}>
                              {platformIcons[post.platform]}
                            </div>
                          </div>
                        </div>
                      ))}
                    {scheduledPosts.filter(p => p.status === "scheduled").length === 0 && (
                      <div className="text-center text-muted-foreground py-8">
                        لا توجد منشورات مجدولة
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              جدولة المنشورات
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Schedule Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={scheduleMode === "single" ? "default" : "outline"}
                onClick={() => setScheduleMode("single")}
                className="flex-1"
              >
                <CalendarIcon className="w-4 h-4 ml-2" />
                تاريخ واحد
              </Button>
              <Button
                variant={scheduleMode === "recurring" ? "default" : "outline"}
                onClick={() => setScheduleMode("recurring")}
                className="flex-1"
              >
                <Repeat className="w-4 h-4 ml-2" />
                جدولة متكررة
              </Button>
            </div>

            {scheduleMode === "single" ? (
              <div className="space-y-4">
                <Label>اختر التاريخ</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border pointer-events-auto mx-auto"
                  locale={ar}
                />
                <p className="text-sm text-muted-foreground text-center">
                  سيتم جدولة {generatedPosts.filter(p => p.selected).length} منشور في {format(selectedDate, "dd MMMM yyyy", { locale: ar })}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>أيام النشر</Label>
                  <div className="flex flex-wrap gap-2">
                    {weekDays.map((day) => (
                      <Button
                        key={day.id}
                        variant={recurringSettings.selectedDays.includes(day.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleDaySelection(day.id)}
                      >
                        {day.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>وقت النشر</Label>
                    <Input
                      type="time"
                      value={recurringSettings.time}
                      onChange={(e) => setRecurringSettings({ ...recurringSettings, time: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>عدد الأسابيع</Label>
                    <Select 
                      value={recurringSettings.weeksCount.toString()} 
                      onValueChange={(v) => setRecurringSettings({ ...recurringSettings, weeksCount: parseInt(v) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">أسبوع واحد</SelectItem>
                        <SelectItem value="2">أسبوعين</SelectItem>
                        <SelectItem value="4">شهر (4 أسابيع)</SelectItem>
                        <SelectItem value="8">شهرين (8 أسابيع)</SelectItem>
                        <SelectItem value="12">3 أشهر (12 أسبوع)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    سيتم جدولة المنشورات على مدار {recurringSettings.weeksCount} أسابيع، 
                    كل {recurringSettings.selectedDays.map(d => weekDays.find(w => w.id === d)?.label).join(" و")} 
                    الساعة {recurringSettings.time}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    إجمالي المنشورات: ~{Math.ceil(getRecurringDates().length * generatedPosts.filter(p => p.selected).length / generatedPosts.filter(p => p.selected).length) || 0} منشور
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleConfirmSchedule}>
              <CheckCircle className="w-4 h-4 ml-2" />
              تأكيد الجدولة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PostsPlanner;
