import { authService } from "@/features/auth/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
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
      // La navegación se gestiona en el _layout mediante el estado de sesión
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
          <View>
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
              <Text className="text-red-500 ml-2 mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View>
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
              <Text className="text-red-500 ml-2 mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
            className="bg-[#10B981] p-5 rounded-2xl shadow-xl shadow-emerald-200 mt-4"
          >
            <Text className="text-white text-center font-bold text-lg">
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}
