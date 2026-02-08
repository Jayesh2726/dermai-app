import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askLLM(systemContext, userMessage) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemContext },
      { role: "user", content: userMessage }
    ],
    temperature: 0.4
  });

  return response.choices[0].message.content;
}
