export interface Product {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  status: "out_of_stock" | "low_stock" | "in_stock";
  createdAt: string;
}

export type ProductInput = Omit<
  Product,
  "id" | "status" | "createdAt" | "updatedAt"
>;
