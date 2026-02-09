import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { articles } from "@/data/articles";
const ArticleDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    t,
    i18n
  } = useTranslation();
  const isRTL = i18n.language === "ar";
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const article = articles.find(a => a.id === id);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isRTL ? "ar-SA" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  };
  if (!article) {
    return <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              {t("blog.articleNotFound", "المقال غير موجود")}
            </h1>
            <Button variant="outline" className="gap-2" onClick={() => navigate("/blog")}>
              <BackArrow className="h-4 w-4" />
              {t("blog.backToBlog", "العودة للمدونة")}
            </Button>
          </div>
        </main>
        <Footer />
      </div>;
  }
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("## ")) {
        return <h2 key={index} className="text-xl font-bold text-foreground mt-8 mb-3">
            {trimmed.replace("## ", "")}
          </h2>;
      }
      if (trimmed.startsWith("- **")) {
        const match = trimmed.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          return <li key={index} className="flex gap-2 text-muted-foreground leading-relaxed mb-2">
              <span className="text-primary mt-1.5 shrink-0">•</span>
              <span>
                <strong className="text-foreground">{match[1]}</strong>
                {match[2] && <>: {match[2]}</>}
              </span>
            </li>;
        }
      }
      if (trimmed.startsWith("- ")) {
        return <li key={index} className="flex gap-2 text-muted-foreground leading-relaxed mb-2">
            <span className="text-primary mt-1.5 shrink-0">•</span>
            <span>{trimmed.replace("- ", "")}</span>
          </li>;
      }
      return <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {trimmed}
        </p>;
    });
  };
  return <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 bg-muted overflow-hidden">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
            <div className="max-w-3xl mx-auto">
              <Badge className="mb-3 bg-primary/90 text-primary-foreground hover:bg-primary">
                {article.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Meta & Content */}
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          {/* Back button */}
          <Button variant="ghost" size="sm" className="gap-2 -mx-2 text-muted-foreground hover:text-foreground" onClick={() => navigate("/blog")}>
            <BackArrow className="h-4 w-4" />
            {t("blog.backToBlog", "العودة للمدونة")}
          </Button>

          {/* Author & Meta */}
          

          <Separator />

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed font-medium border-s-4 border-primary/30 ps-4">
            {article.excerpt}
          </p>

          {/* Content */}
          <article className="prose-custom">
            {article.content ? renderContent(article.content) : <p className="text-muted-foreground">{article.excerpt}</p>}
          </article>

          <Separator className="mt-8" />

          {/* Bottom Navigation */}
          <div className="flex justify-center pb-8">
            <Button variant="outline" className="gap-2" onClick={() => navigate("/blog")}>
              <BackArrow className="h-4 w-4" />
              {t("blog.backToBlog", "العودة للمدونة")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default ArticleDetail;