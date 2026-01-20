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
        // Vinculación automática con la tabla profiles vía triggers o metadata
        data: { full_name: fullName },
      },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
