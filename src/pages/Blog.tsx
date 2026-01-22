import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, Users, Bookmark } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PostCard, { Post } from "@/components/blog/PostCard";
import CommentSection, { Comment } from "@/components/blog/CommentSection";
import CreatePostCard from "@/components/blog/CreatePostCard";
import { useToast } from "@/hooks/use-toast";

// Mock data
const initialPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "أحمد محمد",
      avatar: "/placeholder.svg",
      title: "مطور برمجيات أول",
    },
    content: "سعيد بالإعلان عن انضمامي لفريق التقنية في شركة رائدة! 🎉\n\nرحلة البحث عن العمل كانت تحدياً، لكن بفضل الإصرار والتعلم المستمر، تحقق الحلم.\n\nنصيحتي للباحثين عن عمل: لا تستسلموا، وطوروا مهاراتكم باستمرار.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 124,
    comments: 18,
    isLiked: false,
    isSaved: false,
  },
  {
    id: "2",
    author: {
      name: "سارة العلي",
      avatar: "/placeholder.svg",
      title: "مديرة موارد بشرية",
    },
    content: "نصائح لمقابلة العمل الناجحة:\n\n1. ابحث عن الشركة جيداً\n2. حضّر أسئلة ذكية\n3. كن واثقاً ولكن متواضعاً\n4. أظهر شغفك بالمجال\n5. تابع بعد المقابلة\n\nما هي نصيحتكم المفضلة؟ 💼",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 89,
    comments: 32,
    isLiked: true,
    isSaved: true,
  },
  {
    id: "3",
    author: {
      name: "خالد الشمري",
      avatar: "/placeholder.svg",
      title: "مستشار توظيف",
    },
    content: "أخطاء شائعة في السيرة الذاتية يجب تجنبها:\n\n❌ معلومات قديمة\n❌ أخطاء إملائية\n❌ تصميم غير احترافي\n❌ عدم تخصيص السيرة للوظيفة\n\nاستخدموا أدوات فحص السيرة الذاتية المتوفرة على المنصة!",
    image: "/placeholder.svg",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 256,
    comments: 45,
    isLiked: false,
    isSaved: false,
  },
];

const initialComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: { name: "منى أحمد", avatar: "/placeholder.svg" },
      content: "مبارك! إنجاز رائع 🎉",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      likes: 5,
      isLiked: false,
    },
    {
      id: "c2",
      author: { name: "يوسف علي", avatar: "/placeholder.svg" },
      content: "ألف مبروك، تستاهل كل خير!",
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      likes: 3,
      isLiked: true,
    },
  ],
  "2": [],
  "3": [],
};

const suggestedUsers = [
  { id: "1", name: "فاطمة الزهراء", title: "مصممة UI/UX", avatar: "/placeholder.svg" },
  { id: "2", name: "محمد العبدالله", title: "مهندس بيانات", avatar: "/placeholder.svg" },
  { id: "3", name: "نورة السالم", title: "محللة أعمال", avatar: "/placeholder.svg" },
];

const Blog = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === "ar";
  
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [comments, setComments] = useState<Record<string, Comment[]>>(initialComments);
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("feed");

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post
      )
    );
    const post = posts.find((p) => p.id === postId);
    toast({
      title: post?.isSaved ? t("blog.removedFromSaved") : t("blog.addedToSaved"),
    });
  };

  const handleComment = (postId: string) => {
    setExpandedComments(expandedComments === postId ? null : postId);
  };

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/blog/post/${postId}`);
    toast({ title: t("blog.linkCopied") });
  };

  const handleAddComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: { name: "أنت", avatar: "/placeholder.svg" },
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      ),
    }));
  };

  const handleCreatePost = (content: string, image?: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: {
        name: "أنت",
        avatar: "/placeholder.svg",
        title: "مستخدم",
      },
      content,
      image,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    setComments((prev) => ({ ...prev, [newPost.id]: [] }));
    toast({ title: t("blog.postPublished") });
  };

  const savedPosts = posts.filter((post) => post.isSaved);

  return (
    <DashboardLayout>
      <div dir={isRTL ? "rtl" : "ltr"} className="space-y-6">
        {/* Header */}
        <div className={cn(isRTL && "text-right")}>
          <h1 className="text-2xl font-bold text-foreground">{t("blog.title")}</h1>
          <p className="text-muted-foreground">{t("blog.subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="feed" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {t("blog.feed")}
                </TabsTrigger>
                <TabsTrigger value="following" className="gap-2">
                  <Users className="h-4 w-4" />
                  {t("blog.following")}
                </TabsTrigger>
                <TabsTrigger value="saved" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  {t("blog.saved")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="mt-6 space-y-6">
                <CreatePostCard onCreatePost={handleCreatePost} />
                {posts.map((post) => (
                  <div key={post.id} className="space-y-0">
                    <PostCard
                      post={post}
                      onLike={handleLike}
                      onSave={handleSave}
                      onComment={handleComment}
                      onShare={handleShare}
                    />
                    {expandedComments === post.id && (
                      <Card className="rounded-t-none border-t-0">
                        <CardContent className="pt-4">
                          <CommentSection
                            postId={post.id}
                            comments={comments[post.id] || []}
                            onAddComment={handleAddComment}
                            onLikeComment={handleLikeComment}
                          />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="following" className="mt-6 space-y-6">
                <CreatePostCard onCreatePost={handleCreatePost} />
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">{t("blog.noFollowingPosts")}</p>
                    <Button variant="outline" className="mt-4">
                      {t("blog.discoverPeople")}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="mt-6 space-y-6">
                {savedPosts.length > 0 ? (
                  savedPosts.map((post) => (
                    <div key={post.id} className="space-y-0">
                      <PostCard
                        post={post}
                        onLike={handleLike}
                        onSave={handleSave}
                        onComment={handleComment}
                        onShare={handleShare}
                      />
                      {expandedComments === post.id && (
                        <Card className="rounded-t-none border-t-0">
                          <CardContent className="pt-4">
                            <CommentSection
                              postId={post.id}
                              comments={comments[post.id] || []}
                              onAddComment={handleAddComment}
                              onLikeComment={handleLikeComment}
                            />
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Bookmark className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">{t("blog.noSavedPosts")}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("blog.suggestedUsers")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedUsers.map((user) => (
                  <div
                    key={user.id}
                    className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}
                  >
                    <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={cn(isRTL && "text-right")}>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.title}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("blog.follow")}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("blog.trendingTopics")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["#التوظيف", "#السيرة_الذاتية", "#مقابلات_العمل", "#التطوير_المهني", "#العمل_عن_بعد"].map(
                  (topic) => (
                    <Button
                      key={topic}
                      variant="ghost"
                      className={cn("w-full justify-start text-primary", isRTL && "justify-end")}
                    >
                      {topic}
                    </Button>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
