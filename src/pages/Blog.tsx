import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ArticleCard from "@/components/blog/ArticleCard";
import { articles as initialArticles } from "@/data/articles";

const categories = [
  { id: "all", labelKey: "blog.allCategories" },
  { id: "career", labelKey: "blog.categoryCareer" },
  { id: "cv", labelKey: "blog.categoryCV" },
  { id: "interview", labelKey: "blog.categoryInterview" },
  { id: "skills", labelKey: "blog.categorySkills" },
  { id: "remote", labelKey: "blog.categoryRemote" },
];



const Blog = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = initialArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const regularArticles = filteredArticles;

  const handleRead = (articleId: string) => {
    navigate(`/article/${articleId}`);
  };


  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t("blog.title")}
              </h1>
              <p className="text-muted-foreground">{t("blog.articlesSubtitle")}</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className={cn(
                "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                isRTL ? "right-3" : "left-3"
              )} />
              <Input
                placeholder={t("blog.searchArticles")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(isRTL ? "pr-10" : "pl-10")}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {t(category.labelKey)}
              </Button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} onRead={handleRead} />
            ))}
          </div>

          {regularArticles.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  {t("blog.noArticlesFound")}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;