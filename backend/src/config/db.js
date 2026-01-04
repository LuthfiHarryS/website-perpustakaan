const mongoose = require('mongoose')

async function connectDb(uri) {
  if (!uri) {
    throw new Error(
      'MONGODB_URI is required. Set it in backend/.env (see backend/env.example).',
    )
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('MongoDB connected')
}

module.exports = { connectDb }


