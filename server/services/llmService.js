import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askLLM(systemContext, userMessage) {
  const response = await genAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemContext },
      { role: "user", content: userMessage }
    ],
    temperature: 0.4
  });

  return response.choices[0].message.content;
}
