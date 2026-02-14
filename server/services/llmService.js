import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Text-only chat (used by /api/chat)
 */
export async function askLLM(systemContext, userMessage) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",  // fast & cost effective
    messages: [
      { role: "system", content: systemContext },
      { role: "user", content: userMessage }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

/**
 * Vision analysis for dermatology images
 */
export async function analyzeDermatologyImage(imageBuffer) {
  const base64Image = imageBuffer.toString("base64");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",  // supports vision
    messages: [
      {
        role: "system",
        content: "You are a dermatology AI assistant."
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze this skin lesion image. 
Describe visual characteristics, possible conditions (e.g., benign nevus, melanoma, basal cell carcinoma), 
and indicate urgency (low, moderate, high). Keep response under 200 words and professional.`
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    max_tokens: 300,
  });

  return response.choices[0].message.content;
}
