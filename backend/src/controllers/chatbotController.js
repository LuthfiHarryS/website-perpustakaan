const Book = require('../models/Book')
const { detectGenreFromMessage, formatRecommendations } = require('../utils/chatbot')

async function chatbotReply(req, res, next) {
  try {
    const message = req.body?.message
    const genre = detectGenreFromMessage(message)

    if (!genre) {
      return res.json({ reply: 'Aku belum menemukan buku yang cocok di database.' })
    }

    const books = await Book.aggregate([
      { $match: { genre: genre } },
      { $sample: { size: 5 } },
      { $project: { judul: 1, pengarang: 1 } },
    ])

    if (!books || books.length === 0) {
      return res.json({ reply: 'Aku belum menemukan buku yang cocok di database.' })
    }

    return res.json({ reply: formatRecommendations(genre, books) })
  } catch (err) {
    next(err)
  }
}

module.exports = { chatbotReply }


