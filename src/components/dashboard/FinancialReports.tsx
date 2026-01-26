import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  CreditCard,
  Users,
  Download,
  LayoutTemplate,
  Megaphone,
  FileText,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";

interface Payment {
  id: number;
  user: string;
  amount: number;
  type: string;
  status: string;
  date: string;
  details: string;
}

interface FinancialReportsProps {
  payments: Payment[];
  revenueByMonth: any[];
  revenueByType: any[];
  onExport: () => void;
  initialChart?: "revenue" | "distribution" | "comparison";
}

const MONTS_LABELS = [
  "Jan. 2026",
  "Feb. 2026",
  "Mar. 2026",
  "Apr. 2026",
  "May. 2026",
  "Jun. 2026",
  "Jul. 2026",
  "Aug. 2026",
  "Sep. 2026",
  "Oct. 2026",
  "Nov. 2026",
  "Dec. 2026",
];

const REVENUE_TYPES = [
  "Job Seeker",
  "C.V. Writer",
  "Companies",
  "Advertisements",
  "Templets",
];

const REVENUE_OVERVIEW_DATA: Record<
  string,
  Record<string, { qty?: number; amount?: number }>
> = {
  "Job Seeker": {
    "Jan. 2026": { qty: 20, amount: 2000 },
    "Feb. 2026": { qty: 30, amount: 3000 },
  },
  "C.V. Writer": {
    "Jan. 2026": { qty: 15, amount: 1500 },
  },
  Companies: {
    "Jan. 2026": { qty: 10, amount: 1000 },
  },
  Advertisements: {
    "Jan. 2026": { qty: 10, amount: 1000 },
  },
  Templets: {
    "Jan. 2026": { qty: 6, amount: 600 },
  },
};

export const FinancialReports: React.FC<FinancialReportsProps> = ({
  payments,
  revenueByMonth,
  revenueByType,
  onExport,
  initialChart = "revenue",
}) => {
  const [activeChartGroup, setActiveChartGroup] =
    useState<string>(initialChart);

  const getFilteredTotal = (type: string) => {
    return payments
      .filter((p) => p.type === type)
      .reduce((sum, p) => sum + p.amount, 0)
      .toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <Button
          onClick={onExport}
          variant="outline"
          className="gap-2 order-2 md:order-1"
        >
          <Download className="w-4 h-4" />
          تصدير CSV
        </Button>
        <div className="text-right order-1 md:order-2">
          <h2 className="text-2xl font-bold text-foreground">
            التقارير المالية
          </h2>
          <p className="text-muted-foreground mt-1">
            إجمالي الإيرادات والعمليات المالية عبر المنصة
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className={`border-border/50 cursor-pointer transition-all hover:border-primary/50 ${activeChartGroup === "revenue" ? "border-primary bg-primary/5" : ""}`}
          onClick={() => setActiveChartGroup("revenue")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-end gap-2 text-right">
              إجمالي الإيرادات
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-right">
            <div className="text-3xl font-bold">148,500 ر.س</div>
            <p className="text-xs text-emerald-500 mt-1 flex items-center justify-end gap-1">
              <span>+12% عن الشهر الماضي</span>
              <TrendingUp className="w-3 h-3" />
            </p>
          </CardContent>
        </Card>
        <Card
          className={`border-border/50 cursor-pointer transition-all hover:border-blue-500/50 ${activeChartGroup === "comparison" ? "border-blue-500 bg-blue-500/5" : ""}`}
          onClick={() => setActiveChartGroup("comparison")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-end gap-2 text-right">
              عدد العمليات
              <CreditCard className="w-4 h-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-right">
            <div className="text-3xl font-bold">1,254</div>
            <p className="text-xs text-blue-500 mt-1 flex items-center justify-end gap-1">
              <span>إجمالي العمليات الناجحة</span>
            </p>
          </CardContent>
        </Card>
        <Card
          className={`border-border/50 cursor-pointer transition-all hover:border-purple-500/50 ${activeChartGroup === "distribution" ? "border-purple-500 bg-purple-500/5" : ""}`}
          onClick={() => setActiveChartGroup("distribution")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-end gap-2 text-right">
              متوسط السلة
              <Users className="w-4 h-4 text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-right">
            <div className="text-3xl font-bold">118 ر.س</div>
            <p className="text-xs text-muted-foreground mt-1 text-right">
              لكل عملية شراء
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts" className="space-y-6 w-full overflow-hidden">
        <TabsList className="bg-muted/50 p-1 flex justify-start md:justify-end overflow-x-auto no-scrollbar gap-1 w-full whitespace-nowrap">
          <TabsTrigger value="revenue_overview" className="gap-2">
            <FileText className="w-4 h-4" />
            نظرة عامة على الإيرادات
          </TabsTrigger>
          <TabsTrigger value="templates_pay" className="gap-2">
            <LayoutTemplate className="w-4 h-4" />
            دفعات القوالب
          </TabsTrigger>
          <TabsTrigger value="ads_pay" className="gap-2">
            <Megaphone className="w-4 h-4" />
            دفعات الإعلانات
          </TabsTrigger>
          <TabsTrigger value="subs_pay" className="gap-2">
            <CreditCard className="w-4 h-4" />
            دفعات الاشتراكات
          </TabsTrigger>
          <TabsTrigger value="charts" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            الرسوم البيانية
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue_overview" className="w-full">
          <Card className="card-elevated overflow-hidden border-none shadow-2xl bg-card w-full">
            <CardHeader className="bg-secondary text-white p-4 md:p-6 border-b-4 border-primary">
              <div className="flex items-center justify-between gap-4">
                <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary-light" />
                </div>
                <div className="text-right flex-1 min-w-0">
                  <CardTitle className="text-base md:text-xl font-black tracking-tight truncate">
                    نظرة عامة على الإيرادات (2026)
                  </CardTitle>
                  <p className="text-[10px] md:text-xs text-secondary-foreground/60 mt-0.5 md:mt-1 font-medium truncate">
                    الإحصائيات الشهرية المفصلة حسب نوع الإيرادات
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-muted-foreground/20">
                <Table
                  className="border-collapse min-w-[1600px] w-full"
                  dir="ltr"
                >
                  <TableHeader>
                    <TableRow className="bg-secondary/5 border-b border-border/50">
                      <TableHead
                        className="text-center font-black text-secondary uppercase tracking-widest text-[10px] md:text-xs sticky left-0 bg-card z-30 w-[140px] md:w-[180px] border-r border-border/60 shadow-[4px_0_12px_rgba(0,0,0,0.08)] py-4 md:py-6"
                        rowSpan={2}
                      >
                        Revenue type
                      </TableHead>
                      {MONTS_LABELS.map((month) => (
                        <TableHead
                          key={month}
                          className="text-center border-r border-border/40 font-black text-secondary text-xs md:text-sm last:border-r-0 py-3 md:py-4 bg-muted/20"
                          colSpan={2}
                        >
                          {month}
                        </TableHead>
                      ))}
                    </TableRow>
                    <TableRow className="bg-card border-b border-border/50">
                      {MONTS_LABELS.map((month) => (
                        <React.Fragment key={`${month}-sub`}>
                          <TableHead className="text-center border-r border-border/10 text-[8px] md:text-[9px] uppercase tracking-widest font-black text-muted-foreground/70 py-2 md:py-3">
                            Qty.
                          </TableHead>
                          <TableHead className="text-center border-r border-border/40 text-[8px] md:text-[9px] uppercase tracking-widest font-black text-primary py-2 md:py-3 bg-primary/[0.02] last:border-r-0">
                            Amount
                          </TableHead>
                        </React.Fragment>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="[&_tr:nth-child(even)]:bg-muted/10">
                    {REVENUE_TYPES.map((type) => (
                      <TableRow
                        key={type}
                        className="hover:bg-primary/10 transition-colors group border-b border-border/30 last:border-0"
                      >
                        <TableCell className="font-black border-r border-r border-border/60 sticky left-0 bg-card/95 backdrop-blur-md z-20 w-[140px] md:w-[180px] text-secondary group-hover:text-primary transition-colors shadow-[4px_0_12px_rgba(0,0,0,0.05)] py-4 md:py-5 text-xs md:text-sm">
                          {type}
                        </TableCell>
                        {MONTS_LABELS.map((month) => {
                          const data = REVENUE_OVERVIEW_DATA[type]?.[month];
                          return (
                            <React.Fragment key={`${type}-${month}`}>
                              <TableCell className="text-center border-r border-border/10 text-[10px] md:text-xs font-bold text-muted-foreground/60 py-4 md:py-5">
                                {data?.qty || "—"}
                              </TableCell>
                              <TableCell className="text-center border-r border-border/40 text-[11px] md:text-sm font-black text-foreground py-4 md:py-5 bg-primary/[0.01] last:border-r-0">
                                {data?.amount ? (
                                  <span className="text-primary font-black">
                                    {data.amount.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                    })}
                                  </span>
                                ) : (
                                  <span className="opacity-20 text-[10px] font-medium">
                                    0.00
                                  </span>
                                )}
                              </TableCell>
                            </React.Fragment>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subs_pay">
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/10">
              <div className="flex items-center gap-2 text-primary">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium">
                  إجمالي الاحتراكات: {getFilteredTotal("subscription")} ر.س
                </span>
              </div>
              <CardTitle className="text-lg font-bold text-right">
                دفعات الاشتراكات
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table dir="rtl">
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-20 text-right">ID</TableHead>
                    <TableHead className="text-right">
                      المستخدم / الشركة
                    </TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">التفاصيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .filter((p) => p.type === "subscription")
                    .map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground text-right tracking-tighter">
                          #{p.id}
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          {p.user}
                        </TableCell>
                        <TableCell className="font-bold text-right">
                          {p.amount} ر.س
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              p.status === "completed" ? "default" : "secondary"
                            }
                            className={
                              p.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                                : ""
                            }
                          >
                            {p.status === "completed" ? "مكتمل" : "معلق"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-right text-xs">
                          {p.date}
                        </TableCell>
                        <TableCell className="text-sm text-right">
                          {p.details}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads_pay">
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/10">
              <div className="flex items-center gap-2 text-emerald-500">
                <Megaphone className="w-5 h-5" />
                <span className="text-sm font-medium">
                  إجمالي الإعلانات: {getFilteredTotal("ads")} ر.س
                </span>
              </div>
              <CardTitle className="text-lg font-bold text-right">
                دفعات الإعلانات
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table dir="rtl">
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-20 text-right">ID</TableHead>
                    <TableHead className="text-right">الشركة المعلنة</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">التفاصيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .filter((p) => p.type === "ads")
                    .map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground text-right tracking-tighter">
                          #{p.id}
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          {p.user}
                        </TableCell>
                        <TableCell className="font-bold text-right">
                          {p.amount} ر.س
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              p.status === "completed" ? "default" : "secondary"
                            }
                            className={
                              p.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                                : ""
                            }
                          >
                            {p.status === "completed" ? "مكتمل" : "معلق"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-right text-xs">
                          {p.date}
                        </TableCell>
                        <TableCell className="text-sm text-right">
                          {p.details}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates_pay">
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/10">
              <div className="flex items-center gap-2 text-amber-500">
                <LayoutTemplate className="w-5 h-5" />
                <span className="text-sm font-medium">
                  إجمالي القوالب: {getFilteredTotal("template")} ر.س
                </span>
              </div>
              <CardTitle className="text-lg font-bold text-right">
                دفعات القوالب
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table dir="rtl">
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-20 text-right">ID</TableHead>
                    <TableHead className="text-right">المستخدم</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">التفاصيل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .filter((p) => p.type === "template")
                    .map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground text-right tracking-tighter">
                          #{p.id}
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          {p.user}
                        </TableCell>
                        <TableCell className="font-bold text-right">
                          {p.amount} ر.س
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              p.status === "completed" ? "default" : "secondary"
                            }
                            className={
                              p.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                                : ""
                            }
                          >
                            {p.status === "completed" ? "مكتمل" : "معلق"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-right text-xs">
                          {p.date}
                        </TableCell>
                        <TableCell className="text-sm text-right">
                          {p.details}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(activeChartGroup === "revenue" ||
              activeChartGroup === "comparison") && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg text-right">
                    نمو الإيرادات الشهري
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueByMonth}>
                        <defs>
                          <linearGradient
                            id="revenueColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10b981"
                              stopOpacity={0.1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10b981"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="month"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            direction: "rtl",
                            textAlign: "right",
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill="url(#revenueColor)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {(activeChartGroup === "distribution" ||
              activeChartGroup === "revenue") && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg text-right">
                    توزيع الإيرادات حسب النوع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueByType}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {revenueByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            direction: "rtl",
                            textAlign: "right",
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col gap-2 mr-8 text-right">
                      {revenueByType.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-end gap-2"
                        >
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeChartGroup === "comparison" && (
              <Card className="md:col-span-2 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg text-right">
                    مقارنة الإيرادات الشهرية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueByMonth}>
                        <XAxis
                          dataKey="month"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                          contentStyle={{
                            direction: "rtl",
                            textAlign: "right",
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#3b82f6"
                          radius={[6, 6, 0, 0]}
                          barSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
