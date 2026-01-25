import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

const PostCard = ({
  post,
  onLike,
  onSave,
  onComment,
  onShare,
}: PostCardProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

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
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div
          className={cn(
            "flex items-start justify-between",
            isRTL && "flex-row-reverse",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              isRTL && "flex-row-reverse",
            )}
          >
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className={cn(isRTL && "text-right")}>
              <h4 className="font-semibold text-foreground">
                {post.author.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {post.author.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? "start" : "end"}>
              <DropdownMenuItem>{t("blog.reportPost")}</DropdownMenuItem>
              <DropdownMenuItem>{t("blog.hidePost")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p
          className={cn(
            "text-foreground whitespace-pre-wrap",
            isRTL && "text-right",
          )}
        >
          {post.content}
        </p>
        {post.image && (
          <div className="mt-4 overflow-hidden rounded-lg">
            <img
              src={post.image}
              alt="Post image"
              className="w-full object-cover max-h-96"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-3 border-t pt-3">
        <div
          className={cn(
            "flex w-full items-center justify-between text-sm text-muted-foreground",
            isRTL && "flex-row-reverse",
          )}
        >
          <span>{t("blog.likesCount", { count: post.likes })}</span>
          <span>{t("blog.commentsCount", { count: post.comments })}</span>
        </div>

        <div
          className={cn(
            "flex w-full items-center justify-between border-t pt-3",
            isRTL && "flex-row-reverse",
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={cn("gap-2", post.isLiked && "text-destructive")}
          >
            <Heart className={cn("h-5 w-5", post.isLiked && "fill-current")} />
            {t("blog.like")}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment(post.id)}
            className="gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            {t("blog.comment")}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSave(post.id)}
            className={cn("gap-2", post.isSaved && "text-primary")}
          >
            <Bookmark
              className={cn("h-5 w-5", post.isSaved && "fill-current")}
            />
            {t("blog.save")}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(post.id)}
            className="gap-2"
          >
            <Share2 className="h-5 w-5" />
            {t("blog.share")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
