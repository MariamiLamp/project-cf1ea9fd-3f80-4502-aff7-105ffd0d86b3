import { cn } from "@/lib/utils";

interface CVScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export const CVScoreRing = ({ score, size = 160, strokeWidth = 12 }: CVScoreRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreGradient = () => {
    if (score >= 80) return "url(#successGradient)";
    if (score >= 60) return "url(#warningGradient)";
    return "url(#destructiveGradient)";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "ممتاز";
    if (score >= 60) return "جيد";
    return "يحتاج تحسين";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(152, 60%, 40%)" />
            <stop offset="100%" stopColor="hsl(174, 60%, 40%)" />
          </linearGradient>
          <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(38, 92%, 50%)" />
            <stop offset="100%" stopColor="hsl(28, 85%, 55%)" />
          </linearGradient>
          <linearGradient id="destructiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0, 72%, 51%)" />
            <stop offset="100%" stopColor="hsl(350, 72%, 45%)" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreGradient()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-4xl font-bold", getScoreColor())}>
          {score}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">
          {getScoreLabel()}
        </span>
      </div>
    </div>
  );
};
