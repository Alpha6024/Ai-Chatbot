const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chat.routes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);


mongoose.connect(process.env.DATABASE)
  .then(() => console.log("✅ Database Connected!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const chatSchema = new mongoose.Schema({
  name: String,
  messages: [
    {
      sender: String, // "user" or "ai"
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const ChatHistory = mongoose.model("ChatHistory", chatSchema);

app.post("/api/chat/save", async (req, res) => {
  const { name, messages } = req.body;
  if (!name || !messages || !messages.length) {
    return res.status(400).json({ error: "Name and messages are required" });
  }
  try {
    const chat = new ChatHistory({ name, messages });
    await chat.save();
    res.json({ success: true, chat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save chat" });
  }
});

app.get("/api/chat/history", async (req, res) => {
  try {
    const chats = await ChatHistory.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

app.get("/api/chat/history/:id", async (req, res) => {
  try {
    const chat = await ChatHistory.findById(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

app.delete("/api/chat/history/:id", async (req, res) => {
  try {
    await ChatHistory.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
