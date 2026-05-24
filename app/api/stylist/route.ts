'use server';

import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, type } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const basePrompt = "Professional editorial photography of luxury jewelry, cinematic lighting, soft neutral background, 8k resolution, highly detailed, photorealistic, elegant atmosphere.";
    const prompt = type === 'product'
      ? `Close up shot, ${basePrompt} Subject: ${subject}`
      : `Wide artistic shot, ${basePrompt} Theme: ${subject}, nature inspired texture overlay.`;
    const aspectRatio = type === 'product' ? '1:1' : '16:9';

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: prompt,
      config: {
        imageConfig: { aspectRatio }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return Response.json({ image: `data:image/png;base64,${part.inlineData.data}` });
        }
      }
    }

    return Response.json({ error: 'No image generated' }, { status: 500 });
  } catch (error) {
    console.error('Gemini API error:', error);
    return Response.json({ error: 'Generation failed' }, { status: 500 });
  }
}