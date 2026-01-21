import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  Phone,
  Lock,
  Camera,
  FileText,
  Award,
  Languages,
  Briefcase,
  Plus,
  X,
  Upload,
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageCropper from "@/components/ImageCropper";

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Step 1: Basic Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2: Profile
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);

  // Step 3: Legal Info
  const [taxNumber, setTaxNumber] = useState("");
  const [legalDocuments, setLegalDocuments] = useState<File[]>([]);
  const [documentNames, setDocumentNames] = useState<string[]>([]);

  // Step 3: Documents (Removed)
  // const [cvFile, setCvFile] = useState<File | null>(null);
  // const [certificates, setCertificates] = useState<File[]>([]);

  // Step 4: Experience & Languages (Removed)
  // const [languages, setLanguages] = useState<
  //   { language: string; level: string }[]
  // >([]);
  // const [newLanguage, setNewLanguage] = useState("");
  // const [newLanguageLevel, setNewLanguageLevel] = useState("متوسط");
  // const [experiences, setExperiences] = useState<
  //   { title: string; company: string; duration: string }[]
  // >([]);
  // const [newExpTitle, setNewExpTitle] = useState("");
  // const [newExpCompany, setNewExpCompany] = useState("");
  // const [newExpDuration, setNewExpDuration] = useState("");

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedImage: string) => {
    setProfilePicturePreview(croppedImage);
    setShowCropper(false);
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "company_logo.jpg", {
          type: "image/jpeg",
        });
        setProfilePicture(file);
      });
  };

  const handleLegalDocumentsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setLegalDocuments((prev) => [...prev, ...newFiles]);
      setDocumentNames((prev) => [...prev, ...newFiles.map((f) => f.name)]);
    }
  };

  const removeDocument = (index: number) => {
    setLegalDocuments((prev) => prev.filter((_, i) => i !== index));
    setDocumentNames((prev) => prev.filter((_, i) => i !== index));
  };

  /* Removed unused handlers for Steps 3 & 4 */

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Navigate to login page after successful registration
    navigate("/auth");
  };

  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "المعلومات الأساسية", icon: Building2 },
    { number: 2, title: "الملف التعريفي", icon: Camera },
    { number: 3, title: "المعلومات القانونية", icon: FileText },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            إنشاء حساب شركة
          </h1>
          <p className="text-muted-foreground">
            أنشئ حساب شركتك وابدأ في توظيف أفضل المواهب
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center ${
                  currentStep >= step.number
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep > step.number
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.number
                        ? "bg-primary/20 border-2 border-primary text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs font-medium hidden sm:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  المعلومات الأساسية
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">اسم الشركة</Label>
                    <div className="relative mt-1">
                      <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أدخل اسم الشركة"
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">البريد الإلكتروني للعمل</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hr@company.com"
                        className="pr-10"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 5XX XXX XXXX"
                        className="pr-10"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">كلمة المرور</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="أدخل كلمة المرور"
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="أعد إدخال كلمة المرور"
                        className="pr-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Profile */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  الملف التعريفي للشركة
                </h2>

                <div className="space-y-4">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                        {profilePicturePreview ? (
                          <img
                            src={profilePicturePreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <label
                        htmlFor="profilePicture"
                        className="absolute bottom-0 left-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </label>
                      <input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">شعار الشركة</p>
                  </div>

                  {/* Bio */}
                  <div>
                    <Label htmlFor="bio">نبذة عن الشركة</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="اكتب نبذة مختصرة عن الشركة ومجال عملها..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Step 3: Legal Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  المعلومات القانونية
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                    <div className="relative mt-1">
                      <FileText className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="taxNumber"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                        placeholder="أدخل الرقم الضريبي للشركة"
                        className="pr-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>المستندات القانونية (السجل التجاري، إلخ)</Label>
                    <div className="mt-2">
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors relative">
                        <input
                          type="file"
                          multiple
                          onChange={handleLegalDocumentsChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-2">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="w-6 h-6 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            اسحب وأفلت الملفات هنا أو انقر للاختيار
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, PNG, JPG (الحد الأقصى 5MB للواحد)
                          </p>
                        </div>
                      </div>

                      {documentNames.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {documentNames.map((docName, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <FileText className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm truncate text-foreground">
                                  {docName}
                                </span>
                              </div>
                              <button
                                onClick={() => removeDocument(index)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                السابق
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep} className="flex items-center gap-2">
                  التالي
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="gradient"
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  إنشاء الحساب
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          لديك حساب بالفعل؟{" "}
          <button
            onClick={() => navigate("/auth")}
            className="text-primary hover:underline font-medium"
          >
            تسجيل الدخول
          </button>
        </p>

        {showCropper && tempImage && (
          <ImageCropper
            image={tempImage}
            onCropComplete={onCropComplete}
            onCancel={() => setShowCropper(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyRegistration;
