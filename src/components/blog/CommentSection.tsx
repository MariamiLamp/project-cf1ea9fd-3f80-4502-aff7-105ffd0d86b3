import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, content: string) => void;
  onLikeComment: (postId: string, commentId: string) => void;
}

const CommentSection = ({ postId, comments, onAddComment, onLikeComment }: CommentSectionProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(postId, newComment.trim());
      setNewComment("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language === "ar" ? "ar-SA" : "en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      {/* Add comment */}
      <div className={cn("flex gap-3", isRTL && "flex-row-reverse")}>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>أ</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder={t("blog.writeComment")}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={cn("min-h-[80px] resize-none", isRTL && "text-right")}
          />
          <div className={cn("flex", isRTL ? "justify-start" : "justify-end")}>
            <Button onClick={handleSubmit} size="sm" disabled={!newComment.trim()}>
              <Send className={cn("h-4 w-4", isRTL ? "ml-2 rotate-180" : "mr-2")} />
              {t("blog.send")}
            </Button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className={cn("flex gap-3", isRTL && "flex-row-reverse")}>
            <Avatar className="h-9 w-9">
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className={cn("rounded-lg bg-muted p-3", isRTL && "text-right")}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{comment.author.name}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm text-foreground">{comment.content}</p>
              </div>
              <div className={cn("mt-1 flex items-center gap-4", isRTL && "flex-row-reverse")}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLikeComment(postId, comment.id)}
                  className={cn("h-7 gap-1 text-xs", comment.isLiked && "text-destructive")}
                >
                  <Heart className={cn("h-3.5 w-3.5", comment.isLiked && "fill-current")} />
                  {comment.likes > 0 && comment.likes}
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  {t("blog.reply")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
