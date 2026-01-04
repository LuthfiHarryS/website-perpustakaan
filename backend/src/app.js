const express = require('express')
const cors = require('cors')

const booksRouter = require('./routes/books')
const chatbotRouter = require('./routes/chatbot')

function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json({ limit: '1mb' }))

  app.get('/health', (_req, res) => res.json({ ok: true }))

  app.use('/api/books', booksRouter)
  app.use('/api/chatbot', chatbotRouter)

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error(err)
    const status = err.statusCode || 500
    res.status(status).json({
      error: status === 500 ? 'Internal Server Error' : err.message,
    })
  })

  return app
}

module.exports = { createApp }


