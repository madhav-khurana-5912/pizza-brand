
"use client"

import { useEffect, useState } from "react";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CartItem, Order, OrderStatus } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      const fetchOrders = async () => {
        setIsLoading(true);
        const q = query(
            collection(firestore, "orders"), 
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Order));
        setOrders(fetchedOrders);
        setIsLoading(false);
      };
      fetchOrders();
    } else if (!loading && !user) {
      setIsLoading(false);
    }
  }, [user, loading]);
  
  const getStatusBadgeVariant = (status?: OrderStatus) => {
    switch (status) {
      case 'Cancelled':
        return 'destructive';
      case 'Out for Delivery':
        return 'default';
      case 'Ready':
        return 'secondary';
      default:
        return 'outline';
    }
  };


  if (isLoading) {
    return <div className="container mx-auto py-12 text-center">Loading your orders...</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-12 text-center">Please log in to see your orders.</div>;
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">My Orders</h1>
        <p className="text-lg text-muted-foreground mt-2">
            Here's a list of all your past orders.
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="max-w-4xl mx-auto space-y-6">
            {orders.map((order) => (
                <Card key={order.id} className={cn("shadow-lg", order.status === 'Cancelled' && 'bg-muted/50')}>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <div>
                            <CardTitle className="text-xl">Order #{order.id.slice(0,7)}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-right">
                           <Badge variant={getStatusBadgeVariant(order.status)}>
                             {order.status || 'Active'}
                           </Badge>
                           <p className="text-lg font-bold mt-1">₹{order.totalPrice.toFixed(2)}</p>
                        </div>
                    </CardHeader>
                    <Separator/>
                    <CardContent className="pt-6 space-y-4">
                       {order.cartItems.map(item => (
                           <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative h-14 w-14 rounded-md overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.aiHint}/>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                           </div>
                       ))}
                    </CardContent>
                </Card>
            ))}
        </div>
        ) : (
        <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">You haven't placed any orders yet.</p>
            <Button asChild className="mt-4">
                <Link href="/menu">Start Shopping</Link>
            </Button>
        </div>

      )}
    </div>
  );
}
