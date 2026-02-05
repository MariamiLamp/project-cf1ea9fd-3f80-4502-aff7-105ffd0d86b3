import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, BookOpen, Bookmark, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ArticleCard, { Article } from "@/components/blog/ArticleCard";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import { useToast } from "@/hooks/use-toast";
const categories = [{
  id: "all",
  labelKey: "blog.allCategories"
}, {
  id: "career",
  labelKey: "blog.categoryCareer"
}, {
  id: "cv",
  labelKey: "blog.categoryCV"
}, {
  id: "interview",
  labelKey: "blog.categoryInterview"
}, {
  id: "skills",
  labelKey: "blog.categorySkills"
}, {
  id: "remote",
  labelKey: "blog.categoryRemote"
}];
const initialArticles: Article[] = [{
  id: "1",
  title: "كيف تكتب سيرة ذاتية احترافية تجذب انتباه مسؤولي التوظيف",
  excerpt: "تعرف على أهم النصائح والاستراتيجيات لكتابة سيرة ذاتية مميزة تبرز مهاراتك وخبراتك بشكل احترافي وتزيد فرصك في الحصول على مقابلة عمل.",
  coverImage: "/placeholder.svg",
  category: "السيرة الذاتية",
  author: {
    name: "أحمد محمد",
    avatar: "/placeholder.svg"
  },
  publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  readingTime: 8,
  isSaved: false
}, {
  id: "2",
  title: "أسرار النجاح في مقابلات العمل: دليلك الشامل",
  excerpt: "من التحضير الجيد إلى الإجابة على الأسئلة الصعبة، اكتشف كل ما تحتاج معرفته للتميز في مقابلات العمل وترك انطباع إيجابي.",
  coverImage: "/placeholder.svg",
  category: "المقابلات",
  author: {
    name: "سارة العلي",
    avatar: "/placeholder.svg"
  },
  publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  readingTime: 12,
  isSaved: true
}, {
  id: "3",
  title: "مهارات القرن الواحد والعشرين التي يبحث عنها أصحاب العمل",
  excerpt: "تعرف على أهم المهارات التقنية والشخصية المطلوبة في سوق العمل الحديث وكيفية تطويرها لتعزيز فرصك المهنية.",
  coverImage: "/placeholder.svg",
  category: "المهارات",
  author: {
    name: "خالد الشمري",
    avatar: "/placeholder.svg"
  },
  publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  readingTime: 10,
  isSaved: false
}, {
  id: "4",
  title: "العمل عن بعد: كيف تبني مسيرة مهنية ناجحة من المنزل",
  excerpt: "نصائح عملية للنجاح في العمل عن بعد، من إدارة الوقت إلى التواصل الفعال مع الفريق والحفاظ على التوازن بين العمل والحياة.",
  coverImage: "/placeholder.svg",
  category: "العمل عن بعد",
  author: {
    name: "منى أحمد",
    avatar: "/placeholder.svg"
  },
  publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  readingTime: 7,
  isSaved: false
}, {
  id: "5",
  title: "خطوات بناء مسار مهني واضح وتحقيق أهدافك",
  excerpt: "دليل شامل لتخطيط مسارك المهني، تحديد أهدافك، وبناء خطة عمل واقعية للوصول إلى النجاح في حياتك العملية.",
  coverImage: "/placeholder.svg",
  category: "التطوير المهني",
  author: {
    name: "يوسف علي",
    avatar: "/placeholder.svg"
  },
  publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  readingTime: 15,
  isSaved: false
}];
const Blog = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    toast
  } = useToast();
  const isRTL = i18n.language === "ar";
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const handleSave = (articleId: string) => {
    setArticles(prev => prev.map(article => article.id === articleId ? {
      ...article,
      isSaved: !article.isSaved
    } : article));
    const article = articles.find(a => a.id === articleId);
    toast({
      title: article?.isSaved ? t("blog.removedFromSaved") : t("blog.addedToSaved")
    });
  };
  const handleRead = (articleId: string) => {
    toast({
      title: t("blog.openingArticle")
    });
  };
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesTab = activeTab === "all" || activeTab === "saved" && article.isSaved;
    return matchesSearch && matchesCategory && matchesTab;
  });
  const featuredArticle = articles[0];
  const regularArticles = activeTab === "all" ? filteredArticles.slice(1) : filteredArticles;
  const savedArticles = articles.filter(a => a.isSaved);
  const popularTopics = ["السيرة الذاتية", "مقابلات العمل", "التطوير المهني", "العمل عن بعد", "المهارات التقنية"];
  return <DashboardLayout>
      <div dir={isRTL ? "rtl" : "ltr"} className="space-y-6">
        {/* Header */}
        <div className={cn("flex flex-col md:flex-row md:items-center md:justify-between gap-4", isRTL && "text-right")}>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("blog.title")}
            </h1>
            <p className="text-muted-foreground">{t("blog.articlesSubtitle")}</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
            <Input placeholder={t("blog.searchArticles")} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={cn(isRTL ? "pr-10" : "pl-10")} />
          </div>
        </div>

        <div className="space-y-6">
          {/* Main Content */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className={cn("w-full", isRTL ? "justify-end" : "justify-start")}>
                <TabsTrigger value="all" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  {t("blog.allArticles")}
                </TabsTrigger>
                <TabsTrigger value="saved" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  {t("blog.saved")}
                  {savedArticles.length > 0 && <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                      {savedArticles.length}
                    </Badge>}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6 space-y-6">
                {/* Featured Article */}
                {featuredArticle && <FeaturedArticle article={featuredArticle} onSave={handleSave} onRead={handleRead} />}

                {/* Category Filter */}
                <div className={cn("flex flex-wrap gap-2", isRTL && "justify-end")}>
                  {categories.map(category => <Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category.id)}>
                      {t(category.labelKey)}
                    </Button>)}
                </div>

                {/* Articles Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  {regularArticles.map(article => <ArticleCard key={article.id} article={article} onSave={handleSave} onRead={handleRead} />)}
                </div>

                {regularArticles.length === 0 && <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">
                        {t("blog.noArticlesFound")}
                      </p>
                    </CardContent>
                  </Card>}
              </TabsContent>

              <TabsContent value="saved" className="mt-6 space-y-6">
                {savedArticles.length > 0 ? <div className="grid gap-6 md:grid-cols-2">
                    {savedArticles.map(article => <ArticleCard key={article.id} article={article} onSave={handleSave} onRead={handleRead} />)}
                  </div> : <Card>
                    <CardContent className="py-12 text-center">
                      <Bookmark className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">
                        {t("blog.noSavedArticles")}
                      </p>
                    </CardContent>
                  </Card>}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>;
};
export default Blog;