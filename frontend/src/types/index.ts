export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiSuccess<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors?: string[];
}

export type ProductsResponse = {
  products: Product[];
  categories: string[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters?: {
    search: string | null;
    category: string | null;
    sort: string;
  };
};
