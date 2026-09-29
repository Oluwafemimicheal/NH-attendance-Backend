import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groqApiKey = process.env["GROQ_API_KEY"];
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

export const aiChat = async (req, res) => {
  const { message, model = "openai/gpt-oss-20b" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!groq) {
    return res.status(500).json({ error: "Groq API client is not initialized" });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: message
        },
      ],
      model: model,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({ error: "AI returned an empty response" });
    }

    res.status(200).json({
      response: aiResponse,
    });
  } catch (error) {
    console.error("Groq API Error:", error);

    if (error.status === 401) {
      return res.status(401).json({ error: "Invalid Groq API Key" });
    }

    res.status(500).json({ error: "AI processing failed" });
  }
};

export const getAiModel = async (req, res) => {
  if (!groq) {
    return res.status(500).json({ error: "Groq API key is not configured" });
  }

  try {
    const models = await groq.models.list();
    res.status(200).json(models);
  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ error: "Failed to fetch models" });
  }
};