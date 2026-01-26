
import { GoogleGenAI } from "@google/genai";

export const runAgentTest = async (prompt: string, systemInstruction: string): Promise<string> => {
  // Check if API key is configured.
  // Note: process.env.API_KEY is replaced by string literal at build time via vite.config.ts
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not configured in .env.local. Using mock response.");
    return new Promise(resolve => setTimeout(() => resolve(`[MOCK RESPONSE]
This is a simulation because the GEMINI_API_KEY was not found.

In a production environment, this agent (acting as "${systemInstruction}") would respond to: "${prompt}"

Please configure your .env.local file with a valid key to see real AI responses.`), 800));
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    if (response && response.text) {
        return response.text;
    } else {
        throw new Error("Empty response from Gemini API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Determine if it's a specific error we can help with
    let errorMessage = "Failed to communicate with the Gemini API.";

    if (error instanceof Error) {
        errorMessage += ` Details: ${error.message}`;
        if (error.message.includes("403") || error.message.includes("API key")) {
            errorMessage = "Invalid or missing API Key. Please check your configuration.";
        }
    }

    throw new Error(errorMessage);
  }
};
