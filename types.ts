
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  ingredients?: string;
  weight?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'Bekliyor',
  PREPARING = 'Hazırlanıyor',
  ON_WAY = 'Yolda',
  DELIVERED = 'Teslim Edildi',
  CANCELLED = 'İptal Edildi'
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  total: number;
  customerName: string;
  address: string;
  paymentMethod: 'Nakit' | 'Kart';
  status: OrderStatus;
  createdAt: string;
}
