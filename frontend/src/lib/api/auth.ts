import axios from 'axios';

const API_BASE = '/api';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin';
  upiId?: string;
}

export const AuthService = {
  register: async (userData: UserData) => {
    const response = await axios.post(`${API_BASE}/auth/register`, userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials);
    return response.data;
  },

  getProfile: async (token: string) => {
    const response = await axios.get(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};