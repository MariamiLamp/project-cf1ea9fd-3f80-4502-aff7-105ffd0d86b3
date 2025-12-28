import { MapPin, Clock, Building2, Bookmark, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  logo?: string;
  isNew?: boolean;
  isSaved?: boolean;
  delay?: number;
}

export const JobCard = ({
  title,
  company,
  location,
  type,
  matchScore,
  logo,
  isNew,
  isSaved,
  delay = 0,
}: JobCardProps) => {
  const getMatchBadgeClass = () => {
    if (matchScore >= 80) return "high";
    if (matchScore >= 60) return "medium";
    return "low";
  };

  return (
    <div
      className="job-card opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Company Logo */}
      <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
        {logo ? (
          <img src={logo} alt={company} className="w-full h-full object-cover" />
        ) : (
          <Building2 className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      {/* Job Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{title}</h3>
              {isNew && (
                <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                  جديد
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          <button
            className={cn(
              "p-2 rounded-lg transition-colors shrink-0",
              isSaved
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {type}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className={cn("match-badge", getMatchBadgeClass())}>
            نسبة التوافق: {matchScore}%
          </span>
          <Link to="/jobs" className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors group">
            التقديم الآن
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
