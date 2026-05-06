import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

const getClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;
  if (!client && apiKey && apiKey !== 'PLACEHOLDER_API_KEY') {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

// Deprecated: Replaced by local searchService
export const getGeminiStylingAdvice = async (
  userMessage: string,
  productsContext: string
): Promise<string> => {
  return "Our local stylist is ready to help!";
};

export const generateSmartImage = async (
  subject: string,
  type: 'product' | 'collection'
): Promise<string | null> => {
  const ai = getClient();
  if (!ai) return null; // Gracefully fail if no key

  const basePrompt = "Professional editorial photography of luxury jewelry, cinematic lighting, soft neutral background, 8k resolution, highly detailed, photorealistic, elegant atmosphere.";

  const prompt = type === 'product'
    ? `Close up shot, ${basePrompt} Subject: ${subject}`
    : `Wide artistic shot, ${basePrompt} Theme: ${subject}, nature inspired texture overlay.`;

  const aspectRatio = type === 'product' ? '1:1' : '16:9';

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Assuming this model exists/is available
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};