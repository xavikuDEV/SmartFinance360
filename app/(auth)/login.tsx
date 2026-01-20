// app/(auth)/login.tsx
import { authService } from "@/features/auth/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { ArrowRight, Chrome, Lock, Mail } from "lucide-react-native";
import { MotiView } from "moti";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authService.signIn(data);
    } catch (error: any) {
      Alert.alert("Acceso Denegado", "Las credenciales son incorrectas.");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="px-8 pt-10"
          >
            <MotiView
              from={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 800 }}
            >
              <Text className="text-[#0F172A] text-5xl font-bold tracking-tighter">
                Smart<Text className="text-[#10B981] italic">360</Text>
              </Text>
              <Text className="text-slate-500 text-lg mt-2 font-medium">
                Gestión financiera inteligente.
              </Text>
            </MotiView>

            <View className="mt-12 space-y-6">
              <View>
                <Text className="text-[#0F172A] font-semibold mb-2 ml-1">
                  Email
                </Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4">
                  <Mail size={20} color="#64748b" />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        placeholder="tu@email.com"
                        className="flex-1 ml-3 text-[#0F172A] font-medium"
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    )}
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View className="mt-4">
                <Text className="text-[#0F172A] font-semibold mb-2 ml-1">
                  Contraseña
                </Text>
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4">
                  <Lock size={20} color="#64748b" />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        placeholder="••••••••"
                        secureTextEntry
                        className="flex-1 ml-3 text-[#0F172A] font-medium"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-[#0F172A] flex-row justify-center items-center py-5 rounded-2xl shadow-lg mt-8"
              >
                <Text className="text-white font-bold text-lg mr-2">
                  {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
                </Text>
                {!isSubmitting && <ArrowRight size={20} color="white" />}
              </TouchableOpacity>

              <View className="flex-row items-center my-6">
                <View className="flex-1 h-[1px] bg-slate-200" />
                <Text className="mx-4 text-slate-400 font-bold">O</Text>
                <View className="flex-1 h-[1px] bg-slate-200" />
              </View>

              <TouchableOpacity
                onPress={() => authService.signInWithGoogle()}
                className="flex-row items-center justify-center bg-white py-4 rounded-2xl border border-slate-200"
              >
                <Chrome size={20} color="#0F172A" />
                <Text className="text-[#0F172A] font-bold ml-3 text-base">
                  Google
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-10 flex-row justify-between px-1 pb-10">
              <Link href={"/register" as any} asChild>
                <TouchableOpacity>
                  <Text className="text-slate-500 font-medium">
                    Crear cuenta
                  </Text>
                </TouchableOpacity>
              </Link>
              <Link href={"/forgot-password" as any} asChild>
                <TouchableOpacity>
                  <Text className="text-[#10B981] font-bold">
                    ¿Olvidaste la clave?
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
