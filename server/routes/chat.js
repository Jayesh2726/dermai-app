import express from "express";
import { retrieveRelevantContent } from "../utils/retriever.js";
import { askLLM } from "../services/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  const websiteInfo = retrieveRelevantContent(message);

  const systemPrompt = `
You are Dermai, an AI skin assistant.

Use ONLY the following website information to answer:
${websiteInfo}

Rules:
- If the answer is not in the website info, say you are not sure.
- Be friendly and simple.
- Do not diagnose.
`;

  const reply = await askLLM(systemPrompt, message);

  res.json({ reply });
});

export default router;
