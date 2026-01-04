const dotenv = require('dotenv')
dotenv.config()

const { connectDb } = require('./config/db')
const { createApp } = require('./app')

const PORT = Number(process.env.PORT || 5000)

async function main() {
  await connectDb(process.env.MONGODB_URI)

  const app = createApp()
  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})


