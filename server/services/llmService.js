import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Text-only chat (used by /api/chat)
 */
export async function askLLM(systemContext, userMessage) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `${systemContext}\n\nUser: ${userMessage}\nAssistant:`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * Vision analysis for dermatology images (Gemini Pro Vision)
 */
export async function analyzeDermatologyImage(imageBuffer) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Convert buffer to base64 and prepare the image part
  const imageBase64 = imageBuffer.toString('base64');
  const imageMimeType = 'image/jpeg'; // adjust if you support PNG/WebP

  const prompt = `You are a dermatology AI assistant. Analyze this skin lesion image. 
Describe the visual characteristics, possible conditions (e.g., benign nevus, melanoma, basal cell carcinoma), 
and indicate urgency (low, moderate, high). Keep the response concise (max 200 words) and professional.`;

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: imageMimeType,
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  return response.text();
}