// app/(auth)/forgot-password.tsx
import { authService } from "@/features/auth/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    try {
      await authService.resetPassword(email);
      Alert.alert(
        "Enviado",
        "Revisa tu correo para restablecer tu contraseña.",
        [{ text: "Volver al Login", onPress: () => router.back() }],
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#F8FAFC] p-6 justify-center">
      <Text className="text-[#0F172A] text-3xl font-bold mb-4">
        Recuperar acceso
      </Text>
      <Text className="text-[#475569] mb-8">
        Te enviaremos un enlace mágico para entrar.
      </Text>

      <TextInput
        placeholder="Tu email de registro"
        className="bg-white p-5 rounded-2xl border border-slate-100 mb-4"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handleReset}
        className="bg-[#0F172A] p-5 rounded-2xl"
      >
        <Text className="text-white text-center font-bold">Enviar Enlace</Text>
      </TouchableOpacity>
    </View>
  );
}
