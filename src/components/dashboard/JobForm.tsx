import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface JobFormData {
  id?: number;
  title: string;
  department: string;
  type: string;
  country: string;
  city: string;
  description: string;
  requirements: string;
  status: string;
}

interface JobFormProps {
  mode: "add" | "edit";
  initialData: JobFormData;
  onSubmit: (data: JobFormData) => void;
  submitLabel?: string;
}

const JobForm: React.FC<JobFormProps> = ({
  mode,
  initialData,
  onSubmit,
  submitLabel,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<JobFormData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleAIByDescription = () => {
    if (!formData.title) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال المسمى الوظيفي أولاً",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const mockDescription = `نبحث عن ${
        formData.title
      } متميز للانضمام إلى فريقنا${
        formData.department ? ` في قسم ${formData.department}` : ""
      }.

المسؤوليات الرئيسية:
• تطوير وصيانة التطبيقات والأنظمة
• التعاون مع الفريق لتحقيق أهداف المشروع
• المشاركة في مراجعة الكود وتحسين الأداء

المتطلبات:
• خبرة لا تقل عن 3 سنوات في المجال
• مهارات تواصل ممتازة
• القدرة على العمل ضمن فريق

المزايا:
• راتب تنافسي
• تأمين صحي شامل
• بيئة عمل محفزة`;

      setFormData({ ...formData, description: mockDescription });
      setIsGenerating(false);
      toast({
        title: "تم التوليد",
        description: "تم إنشاء وصف الوظيفة بنجاح",
      });
    }, 1500);
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2 text-right">
        <Label>المسمى الوظيفي *</Label>
        <Input
          className="text-right"
          placeholder="مثال: مطور واجهات أمامية"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 text-right">
          <Label>القسم *</Label>
          <Select
            dir="rtl"
            value={formData.department}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
          >
            <SelectTrigger className="text-right">
              <SelectValue placeholder="اختر القسم" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="التقنية">التقنية</SelectItem>
              <SelectItem value="التسويق">التسويق</SelectItem>
              <SelectItem value="المالية">المالية</SelectItem>
              <SelectItem value="الإدارة">الإدارة</SelectItem>
              <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
              <SelectItem value="البيانات">البيانات</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 text-right">
          <Label>نوع الدوام *</Label>
          <Select
            dir="rtl"
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="text-right">
              <SelectValue placeholder="اختر النوع" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="دوام كامل">دوام كامل</SelectItem>
              <SelectItem value="دوام جزئي">دوام جزئي</SelectItem>
              <SelectItem value="عن بعد">عن بعد</SelectItem>
              <SelectItem value="عقد">عقد</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 text-right">
          <Label>الدولة *</Label>
          <Select
            dir="rtl"
            value={formData.country}
            onValueChange={(value) =>
              setFormData({ ...formData, country: value })
            }
          >
            <SelectTrigger className="text-right">
              <SelectValue placeholder="اختر الدولة" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="المملكة العربية السعودية">
                المملكة العربية السعودية
              </SelectItem>
              <SelectItem value="الإمارات">الإمارات</SelectItem>
              <SelectItem value="قطر">قطر</SelectItem>
              <SelectItem value="الكويت">الكويت</SelectItem>
              <SelectItem value="مصر">مصر</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 text-right">
          <Label>المدينة *</Label>
          <Input
            className="text-right"
            placeholder="مثال: الرياض، دبي..."
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2 text-right">
        <div className="flex items-center justify-between">
          <Label>وصف الوظيفة</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAIByDescription}
            disabled={isGenerating}
            className="gap-1 h-7 text-xs"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                جاري التوليد...
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" />
                توليد بالذكاء الاصطناعي
              </>
            )}
          </Button>
        </div>
        <Textarea
          placeholder="اكتب وصفاً تفصيلياً للوظيفة أو استخدم الذكاء الاصطناعي..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="text-right"
          rows={6}
        />
      </div>

      <div className="space-y-2 text-right">
        <Label>المتطلبات</Label>
        <Textarea
          placeholder="اكتب متطلبات الوظيفة..."
          value={formData.requirements}
          onChange={(e) =>
            setFormData({ ...formData, requirements: e.target.value })
          }
          className="text-right"
          rows={3}
        />
      </div>

      {mode === "edit" && (
        <div className="space-y-2 text-right">
          <Label>الحالة</Label>
          <Select
            dir="rtl"
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger className="text-right">
              <SelectValue />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="active">نشطة</SelectItem>
              <SelectItem value="paused">متوقفة</SelectItem>
              <SelectItem value="closed">مغلقة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button onClick={() => onSubmit(formData)} className="w-full">
        {submitLabel || (mode === "add" ? "نشر الوظيفة" : "حفظ التغييرات")}
      </Button>
    </div>
  );
};

export default JobForm;
