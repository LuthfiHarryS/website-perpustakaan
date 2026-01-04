const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, trim: true, index: true },
    pengarang: { type: String, required: true, trim: true },
    sinopsis: { type: String, required: true, trim: true },
    genre: { type: [String], required: true, default: [] },
    tahun_terbit: { type: Number, required: true },
    penerbit: { type: String, required: true, trim: true },
    bahasa: { type: String, required: true, trim: true },
    jumlah_halaman: { type: Number, required: true },
    cover_url: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Book', bookSchema)


