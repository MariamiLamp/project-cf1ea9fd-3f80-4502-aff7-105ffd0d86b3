import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useCart from "@/hooks/use-cart";
import useAds from "@/hooks/use-ads";

const Checkout = () => {
  const { items, total, clear } = useCart();
  const { add: addAd } = useAds();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const adRequest = location.state?.adRequest;

  const [email, setEmail] = useState("");

  const subtotal = adRequest ? adRequest.price : total;
  const tax = +(subtotal * 0.15).toFixed(2);
  const grandTotal = +(subtotal + tax).toFixed(2);

  const handlePay = () => {
    // Mock payment
    if (adRequest) {
      addAd(adRequest);
      toast({
        title: "تم الدفع بنجاح",
        description: "تم استلام طلب الإعلان وسيتم مراجعته قريباً",
      });
      navigate("/company-dashboard");
    } else {
      toast({
        title: "تم الدفع",
        description: `تم شراء ${
          items.length
        } قالب بنجاح — سيتم إرسال الإيصال إلى ${email || "البريد الإلكتروني"}`,
      });
      clear();
      navigate("/templates");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">الدفع</h1>
            <p className="text-muted-foreground">
              أدخل بيانات الدفع لإتمام الشراء
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الدفع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm">البريد الإلكتروني</label>
                  <Input
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Input placeholder="رقم البطاقة" />
                <Input placeholder="اسم صاحب البطاقة" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="انتهاء (MM/YY)" />
                  <Input placeholder="CVV" />
                </div>

                <Button
                  className="w-full mt-3"
                  onClick={handlePay}
                  disabled={!adRequest && items.length === 0}
                >
                  ادفع الآن
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {adRequest ? (
                    <div className="flex justify-between border-b pb-4">
                      <div>
                        <div className="font-medium">{adRequest.title}</div>
                        <div className="text-muted-foreground text-xs">
                          المدة: {adRequest.duration}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          المكان:{" "}
                          {adRequest.placement === "hero-bottom"
                            ? "تحت الهيرو"
                            : "تحت فحص الـATS"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div>{adRequest.price} ر.س</div>
                      </div>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-muted-foreground text-xs">
                            كمية: {item.quantity}
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{item.price} ر.س</div>
                          <div className="text-muted-foreground text-xs">
                            {(item.price * item.quantity).toFixed(2)} ر.س
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  <div className="pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        المجموع الفرعي
                      </span>
                      <span>{subtotal} ر.س</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        الضريبة (15%)
                      </span>
                      <span>{tax} ر.س</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span>الإجمالي</span>
                      <span className="text-primary">{grandTotal} ر.س</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Checkout;
