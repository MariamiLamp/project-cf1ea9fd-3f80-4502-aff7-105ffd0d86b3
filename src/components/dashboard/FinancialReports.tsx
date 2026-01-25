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

      <Tabs defaultValue="charts" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 flex justify-end flex-wrap gap-1">
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
