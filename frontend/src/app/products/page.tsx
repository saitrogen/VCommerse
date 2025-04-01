'use client';

import { useAuth } from '../../context/AuthContext';
import { ProductService } from '../../lib/api/products';
import { Product } from '../../lib/types/product';
import { User } from '../../lib/types/user';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  const getSellerName = (seller: string | User) => {
    return typeof seller === 'string' ? seller : seller.name;
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        {user?.role === 'seller' && (
          <Link 
            href="/products/create"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Product
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-bold mt-2">₹{product.price}</p>
            <p className="text-sm text-gray-500 mt-2">
              Stock: {product.stock} | Seller: {getSellerName(product.seller)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}