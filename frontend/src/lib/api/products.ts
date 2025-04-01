import axios from 'axios';
import { Product } from '../types/product';

const API_BASE = '/api';

export const ProductService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE}/products`);
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await axios.get(`${API_BASE}/products/${id}`);
    return response.data;
  },

  createProduct: async (
    productData: Omit<Product, '_id' | 'createdAt'>, 
    token: string
  ): Promise<Product> => {
    const response = await axios.post(`${API_BASE}/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};