
import type { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients?: string[];
  aiHint: string;
};

export type Category = {
  name: string;
  icon: string;
  items: Product[];
};

export type Menu = Category[];

export type CartItem = Product & {
  quantity: number;
};

export type OrderStatus = 'Active' | 'Ready' | 'Out for Delivery' | 'Cancelled';

export type Order = {
  id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  totalPrice: number;
  cartItems: CartItem[];
  createdAt: Timestamp;
  status: OrderStatus;
};
