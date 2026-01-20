// app/_layout.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native"; // Solución nativa
import "react-native-reanimated";

import { supabase } from "@/api/supabase";
import { useAuthStore } from "@/core/authStore";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Ruta de fuentes actualizada según tu estructura en src/assets
  const [loaded, error] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { session, setSession } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    // Sincronización proactiva de la sesión
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    // Middleware de protección de rutas
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      // Forzar login si no hay sesión
      router.replace("/login");
    } else if (session && inAuthGroup) {
      // Redirigir al Dashboard si ya está autenticado
      router.replace("/(tabs)");
    }
  }, [session, segments]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Se definen los grupos. Requiere app/(auth)/_layout.tsx para evitar avisos */}
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
