// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { LayoutDashboard, ReceiptText } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#10B981", // Emerald Primary
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false, // Usaremos headers personalizados por pantalla
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <LayoutDashboard size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Transacciones",
          tabBarIcon: ({ color }) => <ReceiptText size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
