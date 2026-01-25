import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableFiltersProps {
  children: ReactNode;
  onClear: () => void;
  onApply?: () => void;
  hasFilters?: boolean;
  className?: string;
}

export const DataTableFilters = ({
  children,
  onClear,
  onApply,
  hasFilters,
  className,
}: DataTableFiltersProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-end justify-start gap-4 p-4 bg-muted/30 rounded-xl border border-border/50",
        className,
      )}
      dir="rtl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1 w-full">
        {children}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {hasFilters && (
          <Button
            variant="ghost"
            onClick={onClear}
            className="gap-2 h-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>مسح التصفية</span>
          </Button>
        )}
        <Button
          onClick={onApply}
          className="gap-2 h-10 px-6 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>تطبيق</span>
        </Button>
      </div>
    </div>
  );
};
