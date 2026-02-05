import { useTranslation } from "react-i18next";
import { Clock, Calendar, Bookmark, ArrowRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Article } from "./ArticleCard";

interface FeaturedArticleProps {
  article: Article;
  onSave: (articleId: string) => void;
  onRead: (articleId: string) => void;
}

const FeaturedArticle = ({ article, onSave, onRead }: FeaturedArticleProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language === "ar" ? "ar-SA" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Card className="overflow-hidden group cursor-pointer" onClick={() => onRead(article.id)}>
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge 
            variant="secondary" 
            className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
          >
            {t("blog.featured")}
          </Badge>
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <Badge variant="outline" className="mb-3">
              {article.category}
            </Badge>
            <h2 className={cn(
              "text-2xl font-bold mb-3 group-hover:text-primary transition-colors",
              isRTL && "text-right"
            )}>
              {article.title}
            </h2>
            <p className={cn(
              "text-muted-foreground mb-4 line-clamp-3",
              isRTL && "text-right"
            )}>
              {article.excerpt}
            </p>
          </div>

          <div className="space-y-4">
            <div className={cn(
              "flex items-center gap-3",
              isRTL && "flex-row-reverse"
            )}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={cn(isRTL && "text-right")}>
                <p className="font-medium text-sm">{article.author.name}</p>
                <div className={cn(
                  "flex items-center gap-3 text-xs text-muted-foreground",
                  isRTL && "flex-row-reverse"
                )}>
                  <span className={cn("flex items-center gap-1", isRTL && "flex-row-reverse")}>
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className={cn("flex items-center gap-1", isRTL && "flex-row-reverse")}>
                    <Clock className="h-3 w-3" />
                    {t("blog.readingTime", { minutes: article.readingTime })}
                  </span>
                </div>
              </div>
            </div>

            <div className={cn("flex gap-2", isRTL && "flex-row-reverse")}>
              <Button className={cn("flex-1 gap-2", isRTL && "flex-row-reverse")}>
                {t("blog.readArticle")}
                <Arrow className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(article.id);
                }}
                className={cn(article.isSaved && "text-primary")}
              >
                <Bookmark className={cn("h-4 w-4", article.isSaved && "fill-current")} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedArticle;
