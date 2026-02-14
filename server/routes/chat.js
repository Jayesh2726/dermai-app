import express from "express";
import { retrieveRelevantContent } from "../utils/retriever.js";
import { askLLM } from "../services/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  const contextDocs =  retrieveRelevantContent(message);

  const contextText = contextDocs
    .map(doc => `${doc.title}: ${doc.content}`)
    .join("\n\n");

  const systemPrompt = `
You are a dermatology AI assistant.
Use the provided context to answer.

Context:
${contextText}
`;

  const response = await askLLM(systemPrompt, message);

  res.json({ reply: response });
});

export default router;
