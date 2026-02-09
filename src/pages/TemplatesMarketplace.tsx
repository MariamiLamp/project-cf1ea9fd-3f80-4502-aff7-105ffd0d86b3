import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GuestLayout } from "@/components/layout/GuestLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  FileText,
  FileSignature,
  Briefcase,
  Scale,
  GraduationCap,
  Heart,
  Star,
  Download,
  Eye,
  ShoppingCart,
  Crown,
  Sparkles,
  Filter,
  Grid3X3,
  List,
  Check,
  X,
  Trash2,
  CreditCard,
  Lock,
  Minus,
  Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import useCart from "@/hooks/use-cart";

// Template categories
const categories = [
  { id: "all", label: "الكل", icon: Grid3X3 },
  { id: "cv", label: "السير الذاتية", icon: FileText },
  { id: "cover-letter", label: "خطابات التقديم", icon: FileSignature },
  { id: "business", label: "أعمال تجارية", icon: Briefcase },
  { id: "legal", label: "عقود قانونية", icon: Scale },
  { id: "academic", label: "أكاديمي", icon: GraduationCap },
];

// Mock templates data
const templatesData = [
  // CV Templates
  {
    id: 1,
    name: "سيرة ذاتية احترافية",
    category: "cv",
    price: 0,
    isPremium: false,
    rating: 4.8,
    downloads: 12500,
    preview: "/placeholder.svg",
    description: "تصميم عصري ونظيف مناسب لجميع المجالات المهنية",
    features: ["تصميم متجاوب", "سهل التعديل", "متعدد الصفحات"],
  },
  {
    id: 2,
    name: "سيرة ذاتية تقنية",
    category: "cv",
    price: 29,
    isPremium: true,
    rating: 4.9,
    downloads: 8300,
    preview: "/placeholder.svg",
    description: "مصممة خصيصاً للمطورين ومهندسي البرمجيات",
    features: ["قسم للمهارات التقنية", "عرض المشاريع", "روابط GitHub"],
  },
  {
    id: 3,
    name: "سيرة ذاتية إبداعية",
    category: "cv",
    price: 39,
    isPremium: true,
    rating: 4.7,
    downloads: 5600,
    preview: "/placeholder.svg",
    description: "تصميم إبداعي للمصممين والفنانين",
    features: ["تصميم فريد", "معرض أعمال", "ألوان قابلة للتخصيص"],
  },
  {
    id: 4,
    name: "سيرة ذاتية بسيطة",
    category: "cv",
    price: 0,
    isPremium: false,
    rating: 4.5,
    downloads: 20100,
    preview: "/placeholder.svg",
    description: "تصميم بسيط وأنيق يركز على المحتوى",
    features: ["تصميم نظيف", "سهل القراءة", "صفحة واحدة"],
  },
  // Cover Letter Templates
  {
    id: 5,
    name: "خطاب تقديم رسمي",
    category: "cover-letter",
    price: 0,
    isPremium: false,
    rating: 4.6,
    downloads: 9800,
    preview: "/placeholder.svg",
    description: "خطاب تقديم رسمي مناسب لجميع الوظائف",
    features: ["صيغة رسمية", "هيكل واضح", "نصائح للكتابة"],
  },
  {
    id: 6,
    name: "خطاب تقديم حديث",
    category: "cover-letter",
    price: 19,
    isPremium: true,
    rating: 4.8,
    downloads: 6200,
    preview: "/placeholder.svg",
    description: "تصميم عصري يلفت انتباه مسؤولي التوظيف",
    features: ["تصميم جذاب", "أقسام مميزة", "قابل للتخصيص"],
  },
  // Business Templates
  {
    id: 7,
    name: "خطة عمل شاملة",
    category: "business",
    price: 49,
    isPremium: true,
    rating: 4.9,
    downloads: 3400,
    preview: "/placeholder.svg",
    description: "نموذج شامل لخطة عمل احترافية",
    features: ["تحليل السوق", "الخطة المالية", "استراتيجية التسويق"],
  },
  {
    id: 8,
    name: "عرض تقديمي للمستثمرين",
    category: "business",
    price: 59,
    isPremium: true,
    rating: 4.8,
    downloads: 2100,
    preview: "/placeholder.svg",
    description: "عرض احترافي لجذب المستثمرين",
    features: ["30+ شريحة", "رسوم بيانية", "تصميم أنيق"],
  },
  {
    id: 9,
    name: "فاتورة تجارية",
    category: "business",
    price: 0,
    isPremium: false,
    rating: 4.4,
    downloads: 15600,
    preview: "/placeholder.svg",
    description: "نموذج فاتورة بسيط وفعال",
    features: ["حسابات تلقائية", "شعار الشركة", "متعدد العملات"],
  },
  // Legal Templates
  {
    id: 10,
    name: "عقد عمل",
    category: "legal",
    price: 79,
    isPremium: true,
    rating: 4.9,
    downloads: 4500,
    preview: "/placeholder.svg",
    description: "عقد عمل شامل متوافق مع نظام العمل السعودي",
    features: ["بنود قانونية", "حقوق الطرفين", "قابل للتعديل"],
  },
  {
    id: 11,
    name: "اتفاقية سرية",
    category: "legal",
    price: 49,
    isPremium: true,
    rating: 4.7,
    downloads: 3200,
    preview: "/placeholder.svg",
    description: "اتفاقية عدم إفشاء المعلومات السرية",
    features: ["حماية المعلومات", "مدة السرية", "العقوبات"],
  },
  {
    id: 12,
    name: "عقد إيجار",
    category: "legal",
    price: 39,
    isPremium: true,
    rating: 4.6,
    downloads: 7800,
    preview: "/placeholder.svg",
    description: "عقد إيجار سكني أو تجاري",
    features: ["شروط الإيجار", "حقوق المؤجر والمستأجر", "فسخ العقد"],
  },
  // Academic Templates
  {
    id: 13,
    name: "بحث أكاديمي",
    category: "academic",
    price: 0,
    isPremium: false,
    rating: 4.5,
    downloads: 11200,
    preview: "/placeholder.svg",
    description: "قالب بحث علمي بتنسيق APA",
    features: ["تنسيق صحيح", "مراجع تلقائية", "فهرس المحتويات"],
  },
  {
    id: 14,
    name: "رسالة ماجستير",
    category: "academic",
    price: 29,
    isPremium: true,
    rating: 4.8,
    downloads: 4100,
    preview: "/placeholder.svg",
    description: "قالب رسالة ماجستير متكامل",
    features: ["هيكل كامل", "تنسيق الجامعات", "ملحقات"],
  },
];

type CartItem = {
  template: (typeof templatesData)[0];
  quantity: number;
};

const TemplatesMarketplace = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTemplate, setSelectedTemplate] = useState<
    (typeof templatesData)[0] | null
  >(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Cart state (shared via hook)
  const cartHook = useCart();
  const { items: cart, add, remove, clear, total: cartTotal } = cartHook;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const navigate = useNavigate();

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    email: "",
  });

  // Filter templates
  const filteredTemplates = templatesData.filter((template) => {
    const matchesSearch =
      template.name.includes(searchQuery) ||
      template.description.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePreview = (template: (typeof templatesData)[0]) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleDownload = (template: (typeof templatesData)[0]) => {
    if (template.isPremium) {
      toast({
        title: "قالب مميز",
        description: "يرجى شراء القالب للتحميل",
      });
    } else {
      toast({
        title: "جاري التحميل",
        description: `تم بدء تحميل ${template.name}`,
      });
    }
  };

  const handleAddToCart = (template: (typeof templatesData)[0]) => {
    // add to local cart (mapped to useCart shape)
    const exists = cart.find((i) => i.id === template.id);
    if (exists) {
      toast({
        title: "موجود في السلة",
        description: `${template.name} موجود بالفعل في سلة المشتريات`,
      });
    } else {
      add({
        id: template.id,
        name: template.name,
        price: template.price,
        quantity: 1,
        preview: template.preview,
        description: template.description,
      });
      toast({
        title: "تمت الإضافة للسلة",
        description: `تم إضافة ${template.name} إلى سلة المشتريات`,
      });
    }
  };

  const handleRemoveFromCart = (templateId: number) => {
    remove(templateId);
  };

  const cartCount = cart.length;

  const handleCheckout = () => {
    navigate("/cart");
  };

  const Layout = isAuthenticated ? DashboardLayout : GuestLayout;

  return (
    <Layout>
      <div className={`space-y-6 ${!isAuthenticated ? 'container mx-auto px-6 py-8' : ''}`}>
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">سوق القوالب</h1>
              <p className="text-muted-foreground">
                اكتشف مجموعة واسعة من القوالب الاحترافية
              </p>
            </div>
            {/* Cart Button - navigate to /cart */}
            <Button
              variant="outline"
              className="relative gap-2"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              السلة
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -left-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن قالب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2 whitespace-nowrap"
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          عرض {filteredTemplates.length} قالب
        </p>

        {/* Templates Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="group overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Preview Image */}
                <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {template.isPremium && (
                    <Badge className="absolute top-2 right-2 gap-1 bg-amber-500">
                      <Crown className="w-3 h-3" />
                      مميز
                    </Badge>
                  )}
                  {!template.isPremium && (
                    <Badge className="absolute top-2 right-2 gap-1 bg-emerald-500">
                      مجاني
                    </Badge>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handlePreview(template)}
                    >
                      <Eye className="w-4 h-4 ml-1" />
                      معاينة
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs">{template.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="w-3 h-3" />
                      <span className="text-xs">
                        {template.downloads.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="font-bold text-lg">
                    {template.price === 0 ? "مجاني" : `${template.price} ر.س`}
                  </span>
                  <Button
                    size="sm"
                    variant={template.isPremium ? "default" : "outline"}
                    onClick={() =>
                      template.isPremium
                        ? handleAddToCart(template)
                        : handleDownload(template)
                    }
                  >
                    {template.isPremium ? (
                      <>
                        <ShoppingCart className="w-4 h-4 ml-1" />
                        شراء
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 ml-1" />
                        تحميل
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Preview Image */}
                  <div className="relative w-full md:w-48 aspect-video md:aspect-auto bg-muted shrink-0">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    {template.isPremium && (
                      <Badge className="absolute top-2 right-2 gap-1 bg-amber-500">
                        <Crown className="w-3 h-3" />
                        مميز
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            <Check className="w-3 h-3 ml-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">
                            {template.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">
                            {template.downloads.toLocaleString()} تحميل
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-xl">
                        {template.price === 0
                          ? "مجاني"
                          : `${template.price} ر.س`}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreview(template)}
                        >
                          <Eye className="w-4 h-4 ml-1" />
                          معاينة
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            template.isPremium
                              ? handleAddToCart(template)
                              : handleDownload(template)
                          }
                        >
                          {template.isPremium ? (
                            <>
                              <ShoppingCart className="w-4 h-4 ml-1" />
                              شراء
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 ml-1" />
                              تحميل
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg">لا توجد قوالب</h3>
            <p className="text-muted-foreground">
              جرب البحث بكلمات مختلفة أو تغيير الفئة
            </p>
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent
          className="max-w-4xl max-h-[90vh] overflow-y-auto"
          dir="rtl"
        >
          {selectedTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedTemplate.name}
                  {selectedTemplate.isPremium && (
                    <Badge className="gap-1 bg-amber-500">
                      <Crown className="w-3 h-3" />
                      مميز
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {selectedTemplate.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Preview Image */}
                <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={selectedTemplate.preview}
                    alt={selectedTemplate.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">المميزات</h4>
                    <ul className="space-y-2">
                      {selectedTemplate.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-semibold">
                        {selectedTemplate.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="w-5 h-5" />
                      <span>
                        {selectedTemplate.downloads.toLocaleString()} تحميل
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold">
                        {selectedTemplate.price === 0
                          ? "مجاني"
                          : `${selectedTemplate.price} ر.س`}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {selectedTemplate.isPremium ? (
                        <Button
                          className="flex-1 gap-2"
                          onClick={() => {
                            handleAddToCart(selectedTemplate);
                            setIsPreviewOpen(false);
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          إضافة للسلة
                        </Button>
                      ) : (
                        <Button
                          className="flex-1 gap-2"
                          onClick={() => handleDownload(selectedTemplate)}
                        >
                          <Download className="w-4 h-4" />
                          تحميل مجاني
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="left" className="w-full sm:max-w-lg" dir="rtl">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              سلة المشتريات
            </SheetTitle>
            <SheetDescription>
              {cartCount === 0 ? "السلة فارغة" : `${cartCount} عناصر في السلة`}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    لا توجد عناصر في السلة
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsCartOpen(false)}
                  >
                    تصفح القوالب
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-24 bg-muted rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        {item.preview ? (
                          <img
                            src={item.preview}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            معاينة
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        <p className="font-bold text-primary">
                          {item.price} ر.س
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      المجموع الفرعي
                    </span>
                    <span>{cartTotal} ر.س</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الضريبة (15%)</span>
                    <span>{(cartTotal * 0.15).toFixed(2)} ر.س</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي</span>
                    <span>{(cartTotal * 1.15).toFixed(2)} ر.س</span>
                  </div>
                </div>
                <Button
                  className="w-full gap-2"
                  size="lg"
                  onClick={handleCheckout}
                >
                  <CreditCard className="w-5 h-5" />
                  إتمام الشراء
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              الدفع الآمن
            </DialogTitle>
            <DialogDescription>
              أدخل بيانات بطاقتك لإتمام عملية الشراء
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Order Summary */}
            <Card className="p-4 bg-muted/50">
              <h4 className="font-semibold mb-3">ملخص الطلب</h4>
              <div className="space-y-2 text-sm">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span>{item.price} ر.س</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span>{cartTotal} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الضريبة (15%)</span>
                  <span>{(cartTotal * 0.15).toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2">
                  <span>الإجمالي</span>
                  <span className="text-primary">
                    {(cartTotal * 1.15).toFixed(2)} ر.س
                  </span>
                </div>
              </div>
            </Card>

            {/* Payment Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={paymentForm.email}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">رقم البطاقة</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentForm.cardNumber}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        cardNumber: e.target.value,
                      })
                    }
                    className="pl-12"
                  />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">الاسم على البطاقة</Label>
                <Input
                  id="cardName"
                  placeholder="محمد أحمد"
                  value={paymentForm.cardName}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, cardName: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={paymentForm.expiry}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, expiry: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    maxLength={4}
                    value={paymentForm.cvv}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, cvv: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={() => navigate("/checkout")}
            >
              <Lock className="w-4 h-4" />
              ادفع {(cartTotal * 1.15).toFixed(2)} ر.س
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              بياناتك محمية بتشفير SSL 256-bit
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TemplatesMarketplace;
