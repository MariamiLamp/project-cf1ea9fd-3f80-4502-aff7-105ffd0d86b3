import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning";
  delay?: number;
}

const iconStyles = {
  default: "bg-slate-500/10 text-slate-500",
  primary: "bg-blue-500/10 text-blue-500",
  success: "bg-emerald-500/10 text-emerald-500",
  warning: "bg-amber-500/10 text-amber-500",
};

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  delay = 0,
}: StatCardProps) => {
  return (
    <div
      className="p-6 rounded-xl border border-border/50 bg-card shadow-sm opacity-0 animate-fade-up cursor-default hover:shadow-md transition-shadow"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </h3>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            iconStyles[variant]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
