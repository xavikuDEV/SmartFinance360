// src/types/database.ts

export type TransactionType = "income" | "expense";

export interface AuthCredentials {
  email: string;
  password?: string;
}

export interface Profile {
  id: string;
  full_name: string | null; // Coincide con 02_DB_Schema.sql
  avatar_url: string | null;
  currency: string;
  updated_at: string;
}

export interface Category {
  id: string;
  user_id: string | null;
  name: string;
  icon: string | null;
  color: string | null;
  type: TransactionType;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number; // En JS manejamos como number, en DB es DECIMAL(12,2)
  description: string | null;
  category_id: string;
  date: string;
  is_recurring: boolean;
}
