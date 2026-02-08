import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => navigate("/blog")}
          >
            <BackArrow className="h-4 w-4" />
            {t("blog.backToBlog", "Back to Blog")}
          </Button>

          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              {t("blog.articlePlaceholder", "Article content for ID:")} {id}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
