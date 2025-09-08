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
  icon: React.ComponentType<{ className?: string }>;
  items: Product[];
};

export type Menu = Category[];

export type CartItem = Product & {
  quantity: number;
};
