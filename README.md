# Perpustakaan SMAN …… (Katalog Buku)

Website katalog digital perpustakaan sekolah (read-only) berbasis **React (Vite)** + **Node.js/Express** + **MongoDB** + **REST API** + **Chatbot rule-based** (jawaban hanya dari database).

## Struktur Folder

- `backend/` — Express REST API + MongoDB (Mongoose) + seed data
- `frontend/` — React UI (Vite) + Tailwind CSS + React Router

## Prasyarat

- Node.js (disarankan LTS)
- MongoDB berjalan lokal atau MongoDB Atlas connection string

## Setup Backend

Masuk ke folder backend:

```bash
cd backend
npm install
```

Buat file `backend/.env` (lihat contoh di `backend/env.example`):

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/perpustakaan_sman

# (Opsional) Otomatis cari cover_url dari API bookcover
BOOKCOVER_API_BASE=https://bookcover.longitood.com
SEED_FETCH_COVERS=false
```

Seed data contoh (mengisi collection `books`):

```bash
npm run seed
```

Isi/rapikan cover buku otomatis (opsional). Ini berguna kalau kamu input buku lewat MongoDB Compass dan cover_url masih kosong/placeholder:

```bash
npm run enrich:covers
```

Jalankan backend:

```bash
npm run dev
```

Backend akan aktif di `http://localhost:5000`.

## Setup Frontend

Masuk ke folder frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend akan aktif di `http://localhost:5173`.

> Catatan: Vite sudah diset proxy `/api` ke backend (`http://localhost:5000`) via `frontend/vite.config.js`.

## Endpoint API (Backend)

- `GET /api/books/random` — ambil 10 buku random (MongoDB `$sample`)
- `GET /api/books` — ambil semua buku (A–Z default)
  - Query:
    - `genre` (bisa 1 atau banyak, dipisah koma) contoh: `?genre=Novel,Sejarah`
    - `sort=az|za|terbaru|terlama`
- `GET /api/books/search?q=judul` — cari judul (case-insensitive, partial match)
- `GET /api/books/:id` — detail buku
- `POST /api/chatbot` — chatbot rule-based berbasis database
  - Body:
    ```json
    { "message": "Buku novel yang seru apa?" }
    ```
  - Response:
    ```json
    { "reply": "Aku rekomendasikan 5 buku genre Novel berikut: ..." }
    ```

## Catatan Chatbot

- Chatbot **tidak mengarang** judul buku.
- Jika genre/keyword terdeteksi → ambil **maks 5 buku random** dari genre tersebut.
- Jika tidak dikenali / tidak ada buku → balas: **“Aku belum menemukan buku yang cocok di database.”**

## Catatan Cover Buku (Opsional)

Project ini bisa mengisi `cover_url` otomatis menggunakan API open-source **bookcover-api**: [`https://github.com/w3slley/bookcover-api`](https://github.com/w3slley/bookcover-api).


