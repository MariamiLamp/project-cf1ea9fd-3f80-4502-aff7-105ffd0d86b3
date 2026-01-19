import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "الأحد", applications: 4, views: 12 },
  { name: "الاثنين", applications: 7, views: 18 },
  { name: "الثلاثاء", applications: 5, views: 15 },
  { name: "الأربعاء", applications: 9, views: 24 },
  { name: "الخميس", applications: 12, views: 30 },
  { name: "الجمعة", applications: 3, views: 10 },
  { name: "السبت", applications: 6, views: 14 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-4 border border-border rounded-xl shadow-xl">
        <p className="font-bold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-bold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const RecentActivity = () => {
  return (
    <div
      className="card-elevated p-6 opacity-0 animate-fade-up h-[400px]"
      style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
    >
      <div className="section-header">
        <div>
          <h2 className="section-title">إحصائيات النشاط</h2>
          <p className="text-xs text-muted-foreground mt-1">آخر ٧ أيام</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground font-medium">
              مشاهدات الملف
            </span>
          </div>
          <div className="flex items-center gap-1.5 mr-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground font-medium">
              طلبات التوظيف
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-full pb-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--muted))"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              dx={-10}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="views"
              name="مشاهدات الملف"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorViews)"
            />
            <Area
              type="monotone"
              dataKey="applications"
              name="طلبات التوظيف"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorApps)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
