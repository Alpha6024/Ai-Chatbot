let ai;

async function getClient() {
  if (!ai) {
    const { GoogleGenAI } = await import("@google/genai");
    ai = new GoogleGenAI({ apiKey: process.env.APIKEY });
  }
  return ai;
}

async function generateResponse(userMessage, chatHistory = [], aiName = "Charlie") {
  const client = await getClient();

  const messages = [
    ...chatHistory.map((m) => m.text),
    userMessage
  ];

  const response = await client.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: messages
  });

  return {
    text: `${response.text}`,
    originalResponse: response.text
  };
}

module.exports = generateResponse;
