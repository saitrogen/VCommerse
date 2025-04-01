import { User } from './user';

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  seller: string | User;
  category: string;
  images?: string[];
  createdAt?: string;
}