import { useTranslation } from "react-i18next";
import { Clock, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
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
}

interface ArticleCardProps {
  article: Article;
  onRead: (articleId: string) => void;
}

const ArticleCard = ({ article, onRead }: ArticleCardProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isRTL ? "ar-SA" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group cursor-pointer" onClick={() => onRead(article.id)}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className={cn("absolute top-3", isRTL ? "right-3" : "left-3")}>
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {article.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {article.excerpt}
        </p>
      </CardContent>

      <CardFooter className="flex-col gap-3 border-t pt-4">
        <div className="flex w-full items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {t("blog.readingTime", { minutes: article.readingTime })}
          </span>
        </div>

        <Button
          variant="ghost"
          className="w-full gap-2 group-hover:text-primary"
          onClick={() => onRead(article.id)}
        >
          {t("blog.readArticle")}
          <Arrow className={cn("h-4 w-4 transition-transform", isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
