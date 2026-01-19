const generateResponse = require("../services/gemini.service");

exports.chatWithGemini = async (req, res) => {
  try {
    const { message, chatHistory = [], aiName = "Charlie" } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    const aiReply = await generateResponse(message, chatHistory, aiName);

    console.log("User message:", message);
    console.log("AI response:", aiReply.text);

    res.json(aiReply); 
  } catch (err) {
    console.error("Chat controller error:", err);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
};
