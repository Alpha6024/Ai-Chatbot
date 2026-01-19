import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, useAnimation,AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";


export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [chats, setChats] = useState([]);
  const recognitionRef = useRef(null);
  const [menu,setMenu]=useState(false);
  const location = useLocation();
  const userName = location.state?.userName || "You";
  const aiName = location.state?.aiName || "Charlie";

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/chat/history");
      setChats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveChat = async () => {
    const name = prompt("Enter a name for this chat:");
    if (!name || !messages.length) return;
    try {
      await axios.post("http://localhost:5000/api/chat/save", { name, messages });
      fetchChats();
      alert("Chat saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save chat.");
    }
  };

  const loadChat = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/history/${id}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteChat = async (id) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/chat/history/${id}`);
      fetchChats();
    } catch (err) {
      console.error(err);
    }
  };

  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.voice =
      window.speechSynthesis.getVoices().find((v) => v.lang === "en-US") || null;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported");

    stopSpeaking();

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      sendMessage(text);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  const sendMessage = async (textOverride) => {
    const messageText = textOverride || input;
    if (!messageText.trim()) return;

    stopSpeaking();
    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: messageText, aiName });
      const aiResponse = res.data.text;
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
      speak(aiResponse);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-screen h-screen overflow-hidden bg-gray-50">
      <video className="absolute top-0 left-0 w-full h-full object-cover z-0" src="/robo.mp4" autoPlay muted></video>
      <div onClick={()=>setMenu(true)} className="h-8 w-[7.5vw] hover:bg-gray-400 cursor-pointer flex gap-1 items-center pl-1 bg-gray-500 absolute left-4 top-4 rounded-full">
        <button className="h-7 w-7 bg-white rounded-full"></button>
        <h1 className="text-[14px] text-white cursor-pointer font-semibold">MENU</h1>
      </div>
      <AnimatePresence>
        { menu && (
          <motion.div initial={{x:-100}} animate={{x:0}} transition={{duration:0.5}} exit={{x:-300}} className="absolute top-4 left-4 h-[70vh] bg-white flex flex-col gap-2">
          <button onClick={()=>setMenu(false)} className="cursor-pointer h-7 w-full bg-gray-600 hover:bg-gray-500"><h1 className="text-white font-semibold">EXIT</h1></button> 
        <button
          onClick={() => setMessages([])}
          className="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600"
        >
          + New Chat
        </button>
        <button
          onClick={saveChat}
          className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
        >
          💾 Save
        </button>

        {/* Chat History below buttons */}
        <div className="bg-white p-1 rounded shadow mt-2 max-h-60 overflow-y-auto w-48">
          {chats.map((chat) => (
            <div key={chat._id} className="flex justify-between items-center gap-2 p-1">
              <button
                className="text-left truncate text-sm"
                onClick={() => loadChat(chat._id)}
              >
                {chat.name}
              </button>
              <button className="text-red-500" onClick={() => deleteChat(chat._id)}>
                ❌
              </button>
            </div>
          ))}
        </div>
      </motion.div>)}

      </AnimatePresence>
    
      <div className="absolute bottom-14 flex flex-col bg-white shadow-xl rounded-xl w-full max-w-2xl h-[50%]">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-xs ${
                m.sender === "user"
                  ? "bg-blue-200 self-end ml-auto"
                  : "bg-yellow-200 self-start"
              }`}
            >
             <span className="font-semibold">
  {m.sender === "user" ? `${userName}: ` : `${aiName}: `}
</span>

              {m.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2 p-3 border-t">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or speak..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={() => sendMessage()}
            className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600"
          >
            Send
          </button>
          <button
            onClick={startListening}
            className={`px-3 rounded text-white ${listening ? "bg-red-500" : "bg-green-500"}`}
          >
            🎤
          </button>
          <button
            onClick={() => {
              stopSpeaking();
              setVoiceEnabled((prev) => !prev);
            }}
            className="px-3 py-1 rounded bg-gray-800 text-white"
          >
            {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}
          </button>
        </div>
      </div>
    </div>
  );
}
