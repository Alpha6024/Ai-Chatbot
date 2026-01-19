const express = require("express");
const { chatWithGemini } = require("../controller/chat.controller.js");
const router = express.Router();

router.post("/chat", chatWithGemini);

module.exports = router;
