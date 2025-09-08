"use client"

import { useEffect, useState } from "react";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { CartItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  totalPrice: number;
  cartItems: CartItem[];
  createdAt: Timestamp;
  status?: 'Active' | 'Cancelled';
};

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      const fetchOrders = async () => {
        setIsLoading(true);
        const q = query(collection(firestore, "orders"), orderBy("createdAt", "desc"));
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
  
  const handleCancelOrder = async (orderId: string) => {
    const orderRef = doc(firestore, "orders", orderId);
    try {
      await updateDoc(orderRef, { status: 'Cancelled' });
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: 'Cancelled' } : order
        )
      );
      toast({
        title: "Order Cancelled",
        description: "The order has been successfully cancelled.",
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem cancelling the order.",
      });
    }
  };


  if (isLoading) {
    return <div className="container mx-auto py-12 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-12 text-center">Please log in to view this page.</div>;
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Admin - All Orders</h1>
      <Card>
        <CardContent className="pt-6">
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className={cn(order.status === 'Cancelled' && 'text-muted-foreground bg-muted/50')}>
                    <TableCell>
                      {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                    </TableCell>
                    <TableCell>
                        <div>{order.name}</div>
                        <div>{order.phone}</div>
                    </TableCell>
                    <TableCell>{`${order.address}, ${order.city}, ${order.state} ${order.zip}`}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {order.cartItems.map(item => (
                            <div key={item.id}>
                                {item.name} <Badge variant="secondary">x{item.quantity}</Badge>
                            </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{order.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                        <Badge variant={order.status === 'Cancelled' ? 'destructive' : 'secondary'}>
                          {order.status || 'Active'}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                        <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={order.status === 'Cancelled'}
                        >
                            Cancel
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">No orders found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
