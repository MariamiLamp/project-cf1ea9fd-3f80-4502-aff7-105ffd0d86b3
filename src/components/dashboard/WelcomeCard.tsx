import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomeCardProps {
  userName: string;
}

export const WelcomeCard = ({ userName }: WelcomeCardProps) => {
  const currentHour = new Date().getHours();
  
  const getGreeting = () => {
    if (currentHour < 12) return "صباح الخير";
    if (currentHour < 17) return "مساء الخير";
    return "مساء الخير";
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-primary via-primary to-secondary p-6 md:p-8 text-white opacity-0 animate-fade-up">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/20 translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/80 text-lg">{getGreeting()}،</span>
            <Sparkles className="w-5 h-5 text-accent animate-pulse-soft" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{userName}</h1>
          <p className="text-white/80 max-w-md">
            سيرتك الذاتية جاهزة بنسبة ٨٥٪ - أكمل ملفك الشخصي لتحصل على فرص أفضل
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/cv-builder" className="btn-gradient !bg-white !text-primary hover:!bg-white/90 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            تحسين السيرة الذاتية
          </Link>
          <Link to="/jobs" className="px-6 py-3 rounded-lg border border-white/30 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            استكشف الوظائف
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
