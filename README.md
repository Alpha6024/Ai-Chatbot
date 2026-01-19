An advanced AI Chatbot built using the **MERN stack** with **Google Gemini API** integration, featuring voice interactions and rich animations using **Rive**.  

---

## Features

- **AI-Powered Chat**: Powered by Google Gemini API (`gemini-3-flash-preview`) for smart and dynamic conversations.
- **Voice Input & Output**:
  - Speech-to-Text: Users can speak to the bot using browser's SpeechRecognition.
  - Text-to-Speech: Bot responds using browser's built-in TTS for a natural voice experience.
- **Animated UI**: Smooth, interactive animations implemented with **Rive**, making the chatbot more engaging.
- **Frontend**: React + Tailwind CSS for a responsive and modern UI.
- **Backend**: Node.js + Express.js API server.
- **Database**: MongoDB Atlas for storing chat history and user data.
- **Conversation Memory**: Keeps track of previous interactions for contextual responses.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Rive animations
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **AI**: Google Gemini API via `@google/genai` SDK
- **Voice**: Browser SpeechRecognition & SpeechSynthesis

---

## Installation

1. Clone the repository:
git clone https://github.com/Alpha6024/Ai-Chatbot.git
cd Ai-Chatbot

2.Backend
cd backend
npm install

3.Frontend
cd ../frontend
npm install

4.Configure Environment Variables:
MONGO_URI=your_mongodb_connection_string
GENIE_API_KEY=your_gemini_api_key

5.Run Project:
Backend =
cd backend
npm run dev

Frontend =
cd frontend
npm start


<img width="1920" height="1080" alt="chatbot1" src="https://github.com/user-attachments/assets/6eeba872-6006-45fb-9a8a-253e1dee195d" />
<img width="1920" height="1080" alt="chatbot2" src="https://github.com/user-attachments/assets/f8b8e351-3f3d-43c0-83a9-312402667f1d" />
<img width="1920" height="1080" alt="chatbot3" src="https://github.com/user-attachments/assets/88133cca-8178-47d3-8203-bd5e10506330" />
