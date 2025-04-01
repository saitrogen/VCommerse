'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          VCommerce
        </Link>
        <div className="flex space-x-4">
          <Link href="/products" className="hover:text-gray-300">
            Products
          </Link>
          {user ? (
            <>
              {user.role === 'seller' && (
                <Link href="/products/create" className="hover:text-gray-300">
                  Sell
                </Link>
              )}
              <button onClick={logout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}