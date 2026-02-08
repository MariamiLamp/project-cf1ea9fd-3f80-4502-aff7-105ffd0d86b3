import { useTranslation } from "react-i18next";
import { Clock, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Article } from "./ArticleCard";

interface FeaturedArticleProps {
  article: Article;
  onRead: (articleId: string) => void;
}

const FeaturedArticle = ({ article, onRead }: FeaturedArticleProps) => {
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
    <Card className="overflow-hidden group cursor-pointer" onClick={() => onRead(article.id)}>
      <div className={cn("grid md:grid-cols-2 gap-0", isRTL && "md:direction-rtl")}>
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            variant="secondary"
            className={cn("absolute top-4 bg-background/90 backdrop-blur-sm", isRTL ? "right-4" : "left-4")}
          >
            {t("blog.featured")}
          </Badge>
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <Badge variant="outline" className="mb-3">
              {article.category}
            </Badge>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {article.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{article.author.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {t("blog.readingTime", { minutes: article.readingTime })}
                  </span>
                </div>
              </div>
            </div>

            <Button className="w-full gap-2">
              {t("blog.readArticle")}
              <Arrow className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedArticle;
