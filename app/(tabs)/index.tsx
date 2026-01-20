// app/(tabs)/index.tsx
import { MotiView } from "moti";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-[#F8FAFC]">
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        className="p-6 pt-12"
      >
        <Text className="text-[#475569] text-sm font-medium uppercase tracking-widest">
          Balance Total
        </Text>
        <Text className="text-[#0F172A] text-4xl font-bold mt-1">
          €2,450.50
        </Text>

        {/* Card de Resumen con Estética 2026 */}
        <View className="bg-[#0F172A] rounded-3xl p-6 mt-8 shadow-xl">
          <Text className="text-white/70 text-sm">Ahorro este mes</Text>
          <Text className="text-white text-2xl font-semibold">+ €420.00</Text>
          <View className="h-[2px] bg-white/10 my-4" />
          <Text className="text-[#10B981] font-medium">
            ↑ 12% más que el mes pasado
          </Text>
        </View>
      </MotiView>
    </ScrollView>
  );
}
