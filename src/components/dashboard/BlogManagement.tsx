import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/dashboard/RichTextEditor";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, FileText, FolderOpen } from "lucide-react";

interface BlogCategory {
  id: number;
  name: string;
  articlesCount: number;
}

interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  status: "published" | "draft";
  content: string;
}

const initialCategories: BlogCategory[] = [
  { id: 1, name: "السيرة الذاتية", articlesCount: 5 },
  { id: 2, name: "المقابلات", articlesCount: 3 },
  { id: 3, name: "المهارات", articlesCount: 4 },
  { id: 4, name: "العمل عن بعد", articlesCount: 2 },
  { id: 5, name: "التطوير المهني", articlesCount: 6 },
];

const initialArticles: BlogArticle[] = [
  {
    id: 1,
    title: "كيف تكتب سيرة ذاتية احترافية",
    excerpt: "تعرف على أهم النصائح لكتابة سيرة ذاتية مميزة",
    category: "السيرة الذاتية",
    author: "أحمد محمد",
    publishedAt: "2024-06-20",
    status: "published",
    content: "محتوى المقال...",
  },
  {
    id: 2,
    title: "أسرار النجاح في مقابلات العمل",
    excerpt: "دليلك الشامل للتميز في مقابلات العمل",
    category: "المقابلات",
    author: "سارة العلي",
    publishedAt: "2024-06-18",
    status: "published",
    content: "محتوى المقال...",
  },
  {
    id: 3,
    title: "مهارات القرن الواحد والعشرين",
    excerpt: "أهم المهارات المطلوبة في سوق العمل الحديث",
    category: "المهارات",
    author: "خالد الشمري",
    publishedAt: "2024-06-15",
    status: "draft",
    content: "محتوى المقال...",
  },
];

export const BlogManagement = () => {
  const { toast } = useToast();
  const [blogTab, setBlogTab] = useState("articles");

  // Articles state
  const [articles, setArticles] = useState<BlogArticle[]>(initialArticles);
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    author: "",
    content: "",
    status: "draft" as "published" | "draft",
  });

  // Categories state
  const [categories, setCategories] = useState<BlogCategory[]>(initialCategories);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: "" });

  // Article handlers
  const handleAddArticle = () => {
    setEditingArticle(null);
    setArticleForm({ title: "", excerpt: "", category: "", author: "", content: "", status: "draft" });
    setIsArticleDialogOpen(true);
  };

  const handleEditArticle = (article: BlogArticle) => {
    setEditingArticle(article);
    setArticleForm({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      content: article.content,
      status: article.status,
    });
    setIsArticleDialogOpen(true);
  };

  const handleSaveArticle = () => {
    if (!articleForm.title.trim() || !articleForm.category) {
      toast({ title: "خطأ", description: "يرجى ملء العنوان والتصنيف", variant: "destructive" });
      return;
    }
    if (editingArticle) {
      setArticles(articles.map((a) => a.id === editingArticle.id ? { ...a, ...articleForm } : a));
      toast({ title: "تم التحديث", description: "تم تحديث المقال بنجاح" });
    } else {
      const newArticle: BlogArticle = {
        id: Date.now(),
        ...articleForm,
        publishedAt: new Date().toISOString().split("T")[0],
      };
      setArticles([newArticle, ...articles]);
      toast({ title: "تمت الإضافة", description: "تم إضافة المقال بنجاح" });
    }
    setIsArticleDialogOpen(false);
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter((a) => a.id !== id));
    setArticleToDelete(null);
    toast({ title: "تم الحذف", description: "تم حذف المقال" });
  };

  // Category handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "" });
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (cat: BlogCategory) => {
    setEditingCategory(cat);
    setCategoryForm({ name: cat.name });
    setIsCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name.trim()) {
      toast({ title: "خطأ", description: "يرجى إدخال اسم التصنيف", variant: "destructive" });
      return;
    }
    if (editingCategory) {
      setCategories(categories.map((c) => c.id === editingCategory.id ? { ...c, name: categoryForm.name } : c));
      toast({ title: "تم التحديث", description: "تم تحديث التصنيف بنجاح" });
    } else {
      const newCat: BlogCategory = { id: Date.now(), name: categoryForm.name, articlesCount: 0 };
      setCategories([...categories, newCat]);
      toast({ title: "تمت الإضافة", description: "تم إضافة التصنيف بنجاح" });
    }
    setIsCategoryDialogOpen(false);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
    setCategoryToDelete(null);
    toast({ title: "تم الحذف", description: "تم حذف التصنيف" });
  };

  return (
    <Card>
      <CardHeader className="text-right">
        <CardTitle className="flex items-center justify-end gap-2">
          <span>إدارة المدونة</span>
          <FileText className="w-5 h-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={blogTab} onValueChange={setBlogTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="articles">المقالات</TabsTrigger>
              <TabsTrigger value="categories">التصنيفات</TabsTrigger>
            </TabsList>
            <Button
              size="sm"
              onClick={blogTab === "articles" ? handleAddArticle : handleAddCategory}
            >
              <Plus className="w-4 h-4 ml-2" />
              {blogTab === "articles" ? "إضافة مقال" : "إضافة تصنيف"}
            </Button>
          </div>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <Table dir="rtl">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">التصنيف</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{article.category}</Badge>
                    </TableCell>
                    <TableCell>{article.publishedAt}</TableCell>
                    <TableCell>
                      <Badge variant={article.status === "published" ? "default" : "outline"}>
                        {article.status === "published" ? "منشور" : "مسودة"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditArticle(article)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setArticleToDelete(article.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {articles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      لا توجد مقالات
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Table dir="rtl">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم التصنيف</TableHead>
                  <TableHead className="text-right">عدد المقالات</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-muted-foreground" />
                        {cat.name}
                      </div>
                    </TableCell>
                    <TableCell>{cat.articlesCount}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCategory(cat)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setCategoryToDelete(cat.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      لا توجد تصنيفات
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        {/* Article Dialog */}
        <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
          <DialogContent dir="rtl" className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-right">
                {editingArticle ? "تعديل المقال" : "إضافة مقال جديد"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-right block">العنوان</Label>
                <Input
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  className="text-right"
                  placeholder="عنوان المقال"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-right block">المقتطف</Label>
                <Input
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="text-right"
                  placeholder="وصف مختصر للمقال"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-right block">التصنيف</Label>
                  <Select
                    value={articleForm.category}
                    onValueChange={(v) => setArticleForm({ ...articleForm, category: v })}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-right block">الحالة</Label>
                  <Select
                    value={articleForm.status}
                    onValueChange={(v) => setArticleForm({ ...articleForm, status: v as "published" | "draft" })}
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="published">منشور</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-right block">المحتوى</Label>
                <RichTextEditor
                  content={articleForm.content}
                  onChange={(html) => setArticleForm({ ...articleForm, content: html })}
                  placeholder="محتوى المقال"
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start gap-2">
              <Button onClick={handleSaveArticle}>
                {editingArticle ? "تحديث" : "إضافة"}
              </Button>
              <Button variant="outline" onClick={() => setIsArticleDialogOpen(false)}>
                إلغاء
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Category Dialog */}
        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-right">
                {editingCategory ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-right block">اسم التصنيف</Label>
                <Input
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ name: e.target.value })}
                  className="text-right"
                  placeholder="اسم التصنيف"
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start gap-2">
              <Button onClick={handleSaveCategory}>
                {editingCategory ? "تحديث" : "إضافة"}
              </Button>
              <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                إلغاء
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Article Delete Confirmation */}
        <AlertDialog open={!!articleToDelete} onOpenChange={(open) => !open && setArticleToDelete(null)}>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader className="text-right">
              <AlertDialogTitle className="text-right">هل أنت متأكد من حذف هذا المقال؟</AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                لا يمكن التراجع عن هذا الإجراء بعد الحذف.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-end gap-2">
              <AlertDialogCancel onClick={() => setArticleToDelete(null)}>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => articleToDelete && handleDeleteArticle(articleToDelete)}
                className="bg-red-600 hover:bg-red-700 mx-0"
              >
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Category Delete Confirmation */}
        <AlertDialog open={!!categoryToDelete} onOpenChange={(open) => !open && setCategoryToDelete(null)}>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader className="text-right">
              <AlertDialogTitle className="text-right">هل أنت متأكد من حذف هذا التصنيف؟</AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                لا يمكن التراجع عن هذا الإجراء بعد الحذف.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-end gap-2">
              <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => categoryToDelete && handleDeleteCategory(categoryToDelete)}
                className="bg-red-600 hover:bg-red-700 mx-0"
              >
                حذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
