const express = require('express')
const { chatbotReply } = require('../controllers/chatbotController')

const router = express.Router()

// POST /api/chatbot { message: "..." }
router.post('/', chatbotReply)

module.exports = router


