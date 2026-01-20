# 🚀 SmartFinance360: AI-Driven Personal Finance

**SmartFinance360** es una plataforma de gestión financiera de nueva generación construida con un enfoque en la velocidad, la privacidad y la inteligencia artificial proactiva.

## 🛠 Tech Stack (Elite 2026)

- **Framework:** [Expo Router SDK 52+](https://expo.dev/) (New Architecture Enabled).
- **Lenguaje:** TypeScript con tipado estricto para integridad de datos.
- **Backend & Auth:** [Supabase](https://supabase.com/) con Row Level Security (RLS) activo.
- **IA:** [Gemini Pro](https://deepmind.google/technologies/gemini/) para asesoría y categorización automática.
- **UI/UX:** NativeWind v4 (Tailwind CSS) y animaciones de 60fps con Moti.

## 🧠 Business Intelligence & Rules

1. **Seguridad Robusta:** Identidad única vía UUID y verificación obligatoria por Email OTP.
2. **Precisión Contable:** Manejo de montos en `DECIMAL(12,2)` para evitar errores de redondeo.
3. **Privacidad IA:** Anonimización de datos sensibles antes de procesar insights con Gemini Pro.
4. **Zero Latency:** Actualizaciones optimistas vía Zustand y React Query para una experiencia instantánea.

## 🎨 Design System

- **Primary (Emerald):** `#10B981` (Crecimiento).
- **Secondary (Slate):** `#0F172A` (Elegancia).
- **Bordes:** Estilo `rounded-3xl` para un look moderno y amigable.

## 📂 Arquitectura del Proyecto

El proyecto sigue un patrón **Feature-based** para máxima escalabilidad:

- `src/features/auth`: Gestión de sesiones y perfiles.
- `src/features/finance`: Lógica de transacciones y balances.
- `src/features/ai`: Integración con la API de Google Generative AI.
