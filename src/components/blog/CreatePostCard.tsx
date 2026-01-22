import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Link2, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CreatePostCardProps {
  onCreatePost: (content: string, image?: string) => void;
}

const CreatePostCard = ({ onCreatePost }: CreatePostCardProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content.trim());
      setContent("");
      setIsExpanded(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-4">
        <div className={cn("flex gap-3", isRTL && "flex-row-reverse")}>
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>أ</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder={t("blog.whatOnYourMind")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className={cn(
                "resize-none transition-all",
                isRTL && "text-right",
                isExpanded ? "min-h-[120px]" : "min-h-[60px]"
              )}
            />
            {isExpanded && (
              <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
                <div className={cn("flex gap-2", isRTL && "flex-row-reverse")}>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Image className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Link2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
                <div className={cn("flex gap-2", isRTL && "flex-row-reverse")}>
                  <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                    {t("blog.cancel")}
                  </Button>
                  <Button size="sm" onClick={handleSubmit} disabled={!content.trim()}>
                    <Send className={cn("h-4 w-4", isRTL ? "ml-2 rotate-180" : "mr-2")} />
                    {t("blog.publish")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostCard;
