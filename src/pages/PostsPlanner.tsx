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
  Target
} from "lucide-react";
import { format, isSameDay } from "date-fns";
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

const PostsPlanner = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  
  // Post Generator State
  const [generatorForm, setGeneratorForm] = useState({
    topic: "",
    platform: "linkedin",
    tone: "professional",
    includeHashtags: true,
    includeEmojis: true,
  });
  const [generatedPost, setGeneratedPost] = useState("");
  
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
    
    const posts: Record<string, Record<string, string>> = {
      professional: {
        linkedin: `📊 ${generatorForm.topic}

في عالم الأعمال المتسارع، يعتبر ${generatorForm.topic} من أهم المهارات التي يجب إتقانها.

إليك 3 نصائح عملية:
1️⃣ ابدأ بتحديد أهدافك بوضوح
2️⃣ طور مهاراتك باستمرار
3️⃣ ابنِ شبكة علاقات قوية

${generatorForm.includeHashtags ? "#تطوير_مهني #نصائح_عملية #تطوير_الذات #مهارات_القيادة" : ""}`,
        twitter: `💡 ${generatorForm.topic}

هل تعلم أن 80% من النجاح يعتمد على المثابرة والتعلم المستمر؟

${generatorForm.includeEmojis ? "🎯" : ""} ابدأ اليوم ولا تؤجل!

${generatorForm.includeHashtags ? "#تطوير_مهني #نجاح" : ""}`,
        facebook: `مرحباً أصدقائي! ${generatorForm.includeEmojis ? "👋" : ""}

أردت أن أشارككم تجربتي في ${generatorForm.topic}...

النجاح ليس صدفة، بل نتيجة عمل دؤوب وتخطيط سليم. ${generatorForm.includeEmojis ? "💪" : ""}

ما هي تجربتكم؟ شاركوني في التعليقات! ${generatorForm.includeEmojis ? "⬇️" : ""}

${generatorForm.includeHashtags ? "#نصائح #تطوير_الذات #نجاح" : ""}`,
        instagram: `${generatorForm.includeEmojis ? "✨" : ""} ${generatorForm.topic} ${generatorForm.includeEmojis ? "✨" : ""}

.
.
.
${generatorForm.includeEmojis ? "💡" : ""} اكتشف أسرار النجاح
${generatorForm.includeEmojis ? "🎯" : ""} حدد أهدافك بوضوح  
${generatorForm.includeEmojis ? "💪" : ""} اعمل بجد واستمرارية

${generatorForm.includeHashtags ? "#تطوير_الذات #نجاح #تحفيز #اقتباسات #motivation #success" : ""}`,
      },
      casual: {
        linkedin: `يا جماعة! ${generatorForm.includeEmojis ? "😊" : ""}

خلونا نحكي عن ${generatorForm.topic}...

الموضوع بسيط: اشتغل صح، وتعلم كل يوم شي جديد ${generatorForm.includeEmojis ? "📚" : ""}

شو رأيكم؟

${generatorForm.includeHashtags ? "#تطوير_مهني #نصائح" : ""}`,
        twitter: `${generatorForm.topic} ${generatorForm.includeEmojis ? "🔥" : ""}

بكل بساطة: لازم نتعلم ونتطور كل يوم!

مين معي؟ ${generatorForm.includeEmojis ? "✋" : ""}

${generatorForm.includeHashtags ? "#تحفيز #نجاح" : ""}`,
        facebook: `السلام عليكم! ${generatorForm.includeEmojis ? "👋😄" : ""}

اليوم بدي أحكيكم عن ${generatorForm.topic}...

الموضوع سهل بس محتاج تركيز ${generatorForm.includeEmojis ? "🎯" : ""}

شو رأيكم؟ شاركونا تجاربكم! ${generatorForm.includeEmojis ? "💬" : ""}

${generatorForm.includeHashtags ? "#نصائح #تجارب #تعلم" : ""}`,
        instagram: `${generatorForm.topic} ${generatorForm.includeEmojis ? "💫" : ""}

.
.
.
بكل بساطة، النجاح = عمل + صبر ${generatorForm.includeEmojis ? "💪✨" : ""}

${generatorForm.includeHashtags ? "#تحفيز #نجاح #تطوير_الذات #quotes" : ""}`,
      },
      motivational: {
        linkedin: `${generatorForm.includeEmojis ? "🌟" : ""} ${generatorForm.topic} ${generatorForm.includeEmojis ? "🌟" : ""}

لا تستسلم أبداً! كل خطوة تقربك من هدفك.

${generatorForm.includeEmojis ? "💪" : ""} الفشل ليس النهاية، بل بداية جديدة
${generatorForm.includeEmojis ? "🎯" : ""} حدد هدفك واعمل بلا توقف
${generatorForm.includeEmojis ? "🚀" : ""} النجاح قريب لمن يسعى إليه

ابدأ اليوم، ولا تنتظر الغد!

${generatorForm.includeHashtags ? "#تحفيز #إلهام #نجاح #لا_تستسلم #motivation" : ""}`,
        twitter: `${generatorForm.includeEmojis ? "🔥" : ""} ${generatorForm.topic}

لا تستسلم! كل يوم هو فرصة جديدة للنجاح ${generatorForm.includeEmojis ? "💪" : ""}

${generatorForm.includeHashtags ? "#تحفيز #إلهام #نجاح" : ""}`,
        facebook: `${generatorForm.includeEmojis ? "✨🌟" : ""} ${generatorForm.topic} ${generatorForm.includeEmojis ? "🌟✨" : ""}

رسالة اليوم:

"لا يهم كم مرة سقطت، المهم كم مرة نهضت"

${generatorForm.includeEmojis ? "💪" : ""} أنت أقوى مما تعتقد
${generatorForm.includeEmojis ? "🎯" : ""} أحلامك تستحق المحاولة
${generatorForm.includeEmojis ? "🚀" : ""} ابدأ الآن!

شارك المنشور لتحفيز غيرك! ${generatorForm.includeEmojis ? "❤️" : ""}

${generatorForm.includeHashtags ? "#تحفيز #إلهام #نجاح #أقوال #حكم" : ""}`,
        instagram: `${generatorForm.includeEmojis ? "🔥" : ""} ${generatorForm.topic} ${generatorForm.includeEmojis ? "🔥" : ""}

.
.
.
${generatorForm.includeEmojis ? "💪" : ""} لا تستسلم أبداً
${generatorForm.includeEmojis ? "🌟" : ""} أنت قادر على تحقيق المستحيل
${generatorForm.includeEmojis ? "🚀" : ""} ابدأ اليوم!

${generatorForm.includeHashtags ? "#تحفيز #إلهام #نجاح #motivation #success #quotes #اقتباسات" : ""}`,
      },
    };
    
    const post = posts[generatorForm.tone]?.[generatorForm.platform] || posts.professional.linkedin;
    setGeneratedPost(post);
    setIsGenerating(false);
    
    toast({
      title: "تم إنشاء المنشور!",
      description: "يمكنك نسخه أو جدولته الآن",
    });
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(generatedPost);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ المنشور إلى الحافظة",
    });
  };

  const handleScheduleGeneratedPost = () => {
    if (!generatedPost) return;
    
    const newScheduledPost: ScheduledPost = {
      id: Date.now().toString(),
      content: generatedPost,
      platform: generatorForm.platform,
      date: selectedDate,
      time: "09:00",
      status: "scheduled",
      topic: generatorForm.topic,
    };
    
    setScheduledPosts([...scheduledPosts, newScheduledPost]);
    setGeneratedPost("");
    setGeneratorForm({ ...generatorForm, topic: "" });
    
    toast({
      title: "تمت الجدولة!",
      description: `سيتم نشر المنشور في ${format(selectedDate, "dd MMMM yyyy", { locale: ar })}`,
    });
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
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="generator" className="gap-2">
              <Sparkles className="w-4 h-4" />
              مولد المنشورات
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="w-4 h-4" />
              التقويم والجدولة
            </TabsTrigger>
          </TabsList>

          {/* Generator Tab */}
          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Generator Form */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    مولد المنشورات بالذكاء الاصطناعي
                  </CardTitle>
                  <CardDescription>
                    أدخل الموضوع واختر المنصة لإنشاء منشور احترافي
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>موضوع المنشور</Label>
                    <Input
                      placeholder="مثال: نصائح لكتابة سيرة ذاتية احترافية"
                      value={generatorForm.topic}
                      onChange={(e) => setGeneratorForm({ ...generatorForm, topic: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
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
                    
                    <div className="space-y-2">
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

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={generatorForm.includeHashtags}
                        onChange={(e) => setGeneratorForm({ ...generatorForm, includeHashtags: e.target.checked })}
                        className="rounded border-border"
                      />
                      <span className="text-sm">إضافة هاشتاقات</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={generatorForm.includeEmojis}
                        onChange={(e) => setGeneratorForm({ ...generatorForm, includeEmojis: e.target.checked })}
                        className="rounded border-border"
                      />
                      <span className="text-sm">إضافة إيموجي</span>
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
                        إنشاء المنشور
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Post Preview */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="w-5 h-5 text-primary" />
                    معاينة المنشور
                  </CardTitle>
                  <CardDescription>
                    يمكنك تعديل المنشور قبل النسخ أو الجدولة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {generatedPost ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full ${platformColors[generatorForm.platform]} flex items-center justify-center text-white`}>
                          {platformIcons[generatorForm.platform]}
                        </div>
                        <span className="font-medium capitalize">{generatorForm.platform}</span>
                      </div>
                      <Textarea
                        value={generatedPost}
                        onChange={(e) => setGeneratedPost(e.target.value)}
                        rows={10}
                        className="font-medium"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleCopyPost} variant="outline" className="flex-1">
                          <Copy className="w-4 h-4 ml-2" />
                          نسخ
                        </Button>
                        <Button onClick={handleScheduleGeneratedPost} className="flex-1">
                          <CalendarIcon className="w-4 h-4 ml-2" />
                          جدولة
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>أدخل موضوعاً واضغط على "إنشاء المنشور"</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Calendar */}
              <Card className="bg-card border-border w-full lg:w-auto lg:flex-shrink-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    التقويم
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
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                    <span>أيام تحتوي على منشورات</span>
                  </div>
                </CardContent>
              </Card>

              {/* Posts for Selected Date */}
              <Card className="bg-card border-border flex-1 min-h-[400px]">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      منشورات {format(selectedDate, "dd MMMM yyyy", { locale: ar })}
                    </span>
                    <Badge variant="secondary">{postsForSelectedDate.length} منشور</Badge>
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
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white`}>
                                    {platformIcons[post.platform]}
                                  </div>
                                  <div>
                                    <p className="font-medium capitalize">{post.platform}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {post.time}
                                    </p>
                                  </div>
                                </div>
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
                              </div>
                              <p className="mt-3 text-sm whitespace-pre-wrap">{post.content}</p>
                              {post.topic && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                  الموضوع: {post.topic}
                                </p>
                              )}
                              <div className="flex gap-2 mt-4">
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
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash2 className="w-3 h-3 ml-1" />
                                  حذف
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  جميع المنشورات المجدولة
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
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${platformColors[post.platform]} flex items-center justify-center text-white`}>
                              {platformIcons[post.platform]}
                            </div>
                            <div>
                              <p className="text-sm font-medium line-clamp-1">{post.content.slice(0, 50)}...</p>
                              <p className="text-xs text-muted-foreground">
                                {format(post.date, "dd MMMM", { locale: ar })} - {post.time}
                              </p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PostsPlanner;
