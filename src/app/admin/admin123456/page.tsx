
"use client"

import { useEffect, useState } from "react";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc, writeBatch, deleteDoc } from "firebase/firestore";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import type { CartItem, Order, OrderStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";


export default function AdminPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);


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
  
  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    const orderRef = doc(firestore, "orders", orderId);
    try {
      await updateDoc(orderRef, { status: status });
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: status } : order
        )
      );
      toast({
        title: "Order Updated",
        description: `The order status has been changed to ${status}.`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem updating the order.",
      });
    }
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    setIsLoading(true);
    try {
      await deleteDoc(doc(firestore, "orders", orderToDelete.id));
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderToDelete.id));
      toast({
        title: "Order Deleted",
        description: `Order #${orderToDelete.id.slice(0,7)} has been successfully deleted.`,
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem deleting the order.",
      });
    } finally {
      setIsLoading(false);
      setOrderToDelete(null);
    }
  };

  const handleDeleteAllOrders = async () => {
    setIsLoading(true);
    try {
      const ordersCollection = collection(firestore, "orders");
      const querySnapshot = await getDocs(ordersCollection);
      
      const batch = writeBatch(firestore);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      setOrders([]);
      toast({
        title: "Success",
        description: "All orders have been deleted.",
      });
    } catch (error) {
      console.error("Error deleting all orders:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem deleting the orders.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
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
  
  const orderStatuses: OrderStatus[] = ['Active', 'Ready', 'Out for Delivery', 'Cancelled'];


  if (isLoading) {
    return <div className="container mx-auto py-12 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-12 text-center">Please log in to view this page.</div>;
  }
  
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-center">Admin - All Orders</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={orders.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete All Orders
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  orders from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAllOrders}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status || 'Active'}
                          </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuContent>
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent>
                                      {orderStatuses.map(status => (
                                        <DropdownMenuItem 
                                            key={status}
                                            onClick={() => handleUpdateStatus(order.id, status)}
                                            disabled={order.status === status}
                                        >
                                            {status}
                                        </DropdownMenuItem>
                                      ))}
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setOrderToDelete(order)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenuPortal>
                          </DropdownMenu>
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

       <AlertDialog open={!!orderToDelete} onOpenChange={(open) => !open && setOrderToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete order <strong>#{orderToDelete?.id.slice(0,7)}</strong> from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteOrder} className="bg-destructive hover:bg-destructive/90">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </>
  );
}
