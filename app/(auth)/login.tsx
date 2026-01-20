// app/(auth)/login.tsx
import { authService } from "@/features/auth/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Chrome } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Correo no válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authService.signIn(data);
    } catch (error: any) {
      Alert.alert("Error de Acceso", error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#F8FAFC] p-6 justify-center">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 600 }}
      >
        <Text className="text-[#0F172A] text-4xl font-bold mb-2 tracking-tighter">
          SmartFinance<Text className="text-[#10B981]">360</Text>
        </Text>
        <Text className="text-[#475569] text-lg mb-10">
          Tu SaaS premium de finanzas personales.
        </Text>

        <View className="gap-y-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-slate-900"
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 ml-2">{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Contraseña"
                secureTextEntry
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-slate-900"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 ml-2">{errors.password.message}</Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-[#10B981] p-5 rounded-2xl shadow-xl shadow-emerald-200 mt-4"
          >
            <Text className="text-white text-center font-bold text-lg">
              Iniciar Sesión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => authService.signInWithGoogle()}
            className="flex-row items-center justify-center bg-white p-5 rounded-2xl border border-slate-200 mt-2"
          >
            <Chrome size={20} color="#0F172A" />
            <Text className="text-[#0F172A] font-semibold ml-2">
              Continuar con Google
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-between mt-6 px-2">
            {/* Forzamos el tipo para evitar el error del compilador de rutas */}
            <Link href={"/register" as any} asChild>
              <TouchableOpacity>
                <Text className="text-[#475569] font-medium">Crear cuenta</Text>
              </TouchableOpacity>
            </Link>
            <Link href={"/forgot-password" as any} asChild>
              <TouchableOpacity>
                <Text className="text-[#10B981] font-medium">
                  ¿Olvidaste la clave?
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </MotiView>
    </View>
  );
}
