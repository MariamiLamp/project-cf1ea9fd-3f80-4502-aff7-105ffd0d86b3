import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import useCart from "@/hooks/use-cart";

const CartPage = () => {
  const { items, remove, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">السلة</h1>
            <p className="text-muted-foreground">
              راجع عناصر سلة التسوق الخاصة بك
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  سلة التسوق فارغة
                </CardContent>
              </Card>
            ) : (
              items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-28 rounded-lg overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                      {item.preview ? (
                        <img
                          src={item.preview}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          معاينة
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                      <div className="text-sm font-bold mt-2">
                        {item.price} ر.س
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.max(1, Number(e.target.value))
                          )
                        }
                        className="w-20"
                      />
                      <Button
                        variant="ghost"
                        onClick={() => remove(item.id)}
                        className="text-destructive"
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span>المجموع</span>
                  <Badge>{total} ر.س</Badge>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => navigate("/checkout")}
                  disabled={items.length === 0}
                >
                  انتقال للدفع
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CartPage;
