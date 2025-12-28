
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are Willow, the AI Nature Guide for Parkinson's Park in Guiseley. 
Parkinson's Park is a community-managed landscape park in Guiseley, West Yorkshire.
It was gifted to the people of Guiseley by the Parkinson family and is managed by a Friends group/CIC.
It features meadowland, woodland edges, and provides stunning views across the Aire Valley.
Your role:
1. Answer questions about local flora and fauna (emphasizing native UK species found in Yorkshire).
2. Provide info about park etiquette (especially important: it's a popular dog-walking spot, remind people to clean up).
3. Encourage visitors to join community events or help the Friends of Parkinson's Park.
4. Keep answers warm, knowledgeable, and community-focused.
If you don't know an answer about specific park opening hours, assume it's open access to the public at all times.
`;

export async function getParkGuideResponse(history: ChatMessage[], message: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to the forest network. Please try again in a moment!";
  }
}
