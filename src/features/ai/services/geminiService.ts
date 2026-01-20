// src/features/ai/services/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GEMINI_API_KEY || "",
);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const geminiService = {
  async getFinancialAdvice(expenses: number, income: number, goal: string) {
    // Aplicamos la Regla de Negocio #3 (Anonimización y Disclaimer)
    const prompt = `Eres el Asesor SmartFinance360. Tu tono es motivador pero profesional.
    Datos del usuario: Gastos este mes: €${expenses}, Ingresos: €${income}, Meta actual: ${goal}.
    Analiza si el usuario va por buen camino y da un consejo de máximo 2 frases que sea accionable hoy mismo.
    Disclaimer: Esto es una sugerencia basada en datos, no un consejo financiero legal.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Error:", error);
      return "No puedo analizar tus datos ahora mismo, pero sigue ahorrando.";
    }
  },
};
