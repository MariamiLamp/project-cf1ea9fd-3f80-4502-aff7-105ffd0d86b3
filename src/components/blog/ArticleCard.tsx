import { useTranslation } from "react-i18next";
import { Clock, Calendar, Bookmark, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number;
  isSaved: boolean;
}

interface ArticleCardProps {
  article: Article;
  onSave: (articleId: string) => void;
  onRead: (articleId: string) => void;
}

const ArticleCard = ({ article, onSave, onRead }: ArticleCardProps) => {
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
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {article.category}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onSave(article.id);
            }}
            className={cn(
              "h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-background",
              article.isSaved && "text-primary"
            )}
          >
            <Bookmark className={cn("h-4 w-4", article.isSaved && "fill-current")} />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className={cn(
          "font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors",
          isRTL && "text-right"
        )}>
          {article.title}
        </h3>
      </CardHeader>

      <CardContent className="pb-3">
        <p className={cn(
          "text-muted-foreground text-sm line-clamp-2",
          isRTL && "text-right"
        )}>
          {article.excerpt}
        </p>
      </CardContent>

      <CardFooter className="flex-col gap-3 border-t pt-4">
        <div className={cn(
          "flex w-full items-center justify-between text-xs text-muted-foreground",
          isRTL && "flex-row-reverse"
        )}>
          <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
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

        <Button
          variant="ghost"
          className={cn(
            "w-full gap-2 group-hover:text-primary",
            isRTL && "flex-row-reverse"
          )}
          onClick={() => onRead(article.id)}
        >
          {t("blog.readArticle")}
          <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
