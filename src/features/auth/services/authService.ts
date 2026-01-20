// src/features/auth/services/authService.ts
import { supabase } from "@/api/supabase";
import { AuthCredentials } from "@/types/database";

export const authService = {
  async signIn({ email, password }: AuthCredentials) {
    if (!password) throw new Error("Contraseña requerida");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signUp({
    email,
    password,
    fullName,
  }: AuthCredentials & { fullName: string }) {
    if (!password) throw new Error("Contraseña requerida");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Los datos pasan a la tabla profiles vía triggers de Supabase
        data: { full_name: fullName },
      },
    });
    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "smartfinance360://dashboard",
      },
    });
    if (error) throw error;
    return data;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "smartfinance360://reset-password",
    });
    if (error) throw error;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
