// app/(auth)/register.tsx
import { authService } from "@/features/auth/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as z from "zod";

const registerSchema = z.object({
  fullName: z.string().min(3, "Nombre demasiado corto"),
  email: z.string().email("Correo no válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authService.signUp(data);
      Alert.alert("Éxito", "Revisa tu email para confirmar la cuenta.", [
        { text: "OK", onPress: () => router.replace("/(auth)/login") },
      ]);
    } catch (error: any) {
      Alert.alert("Error de Registro", error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#F8FAFC] p-6 justify-center">
      <Text className="text-[#0F172A] text-3xl font-bold mb-8">
        Únete a la élite financiera
      </Text>

      <View className="gap-y-4">
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Nombre Completo"
              className="bg-white p-5 rounded-2xl border border-slate-100"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.fullName && (
          <Text className="text-red-500">{errors.fullName.message}</Text>
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              className="bg-white p-5 rounded-2xl border border-slate-100"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500">{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              className="bg-white p-5 rounded-2xl border border-slate-100"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500">{errors.password.message}</Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-[#0F172A] p-5 rounded-2xl mt-4"
        >
          <Text className="text-white text-center font-bold text-lg">
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
