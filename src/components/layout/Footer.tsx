import { Link } from "react-router-dom";
import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-sidebar text-sidebar-foreground mt-12 mx-6 mb-6 rounded-2xl">
      <div className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">الموارد البشرية</h3>
                <p className="text-xs text-sidebar-foreground/60">منصة التوظيف الذكية</p>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
              نساعدك في العثور على الوظيفة المثالية وبناء مسيرة مهنية ناجحة
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-sidebar-foreground/70 hover:text-white transition-colors">
                  فرص العمل
                </Link>
              </li>
              <li>
                <Link to="/cv-builder" className="text-sm text-sidebar-foreground/70 hover:text-white transition-colors">
                  منشئ السيرة الذاتية
                </Link>
              </li>
              <li>
                <Link to="/cv-check" className="text-sm text-sidebar-foreground/70 hover:text-white transition-colors">
                  فحص السيرة الذاتية
                </Link>
              </li>
              <li>
                <Link to="/interview" className="text-sm text-sidebar-foreground/70 hover:text-white transition-colors">
                  أسئلة المقابلات
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cover-letter" className="text-sm text-sidebar-foreground/70 hover:text-white transition-colors">
                  خطاب التقديم
                </Link>
              </li>
              <li>
                <Link to="/career-path" className="text-sm text-sidebar-foreground/70 hover:text-white transition-colors">
                  المسار المهني
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-sm text-sidebar-foreground/70 hover:text-white transition-colors">
                  سوق القوالب
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-sm text-sidebar-foreground/70 hover:text-white transition-colors">
                  الاشتراكات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                <Mail className="w-4 h-4" />
                <span>support@hr-platform.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                <Phone className="w-4 h-4" />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-sidebar-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sidebar-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sidebar-foreground/60">
            © {new Date().getFullYear()} الموارد البشرية. جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-4">
            <Link to="/settings" className="text-sm text-sidebar-foreground/60 hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <Link to="/settings" className="text-sm text-sidebar-foreground/60 hover:text-white transition-colors">
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
