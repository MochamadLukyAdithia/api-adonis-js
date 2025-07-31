🚀 Proyek REST API Chatbot - Maja.AI
Selamat datang di dokumentasi resmi untuk REST API Chatbot Maja.AI.
Proyek ini dikembangkan sebagai bagian dari seleksi magang Backend Developer, menggunakan AdonisJS v5 dan PostgreSQL.

API ini berfungsi sebagai jembatan antara antarmuka pengguna (frontend) dan layanan chatbot eksternal, dengan kemampuan menyimpan serta mengelola riwayat percakapan secara persisten.

📊 Flowchart Alur Kerja Sistem
pgsql
Copy
Edit
          +---------------------------+      +---------------------------------+
Pengguna → |     Frontend Chat        | →→→→ |      AdonisJS API Server       |
          +---------------------------+      +---------------------------------+
              (1. Kirim Pertanyaan)               |  (2. Simpan Pertanyaan)
                                                  |
                                                  ↓
                                          +----------------+
                                          |   PostgreSQL   |
                                          +----------------+
                                                  ↑
                                                  |
                                                  |  (5. Simpan Jawaban Bot)
                                                  |
          +---------------------------+      +---------------------------------+
  Jawaban ← |     Frontend Chat        | ←←←← |      AdonisJS API Server       |
          +---------------------------+      +---------------------------------+
              (6. Tampilkan Jawaban)              ↑
                                                  |
                                                  | (4. Terima Jawaban)
                                                  |
                                          +----------------------------+
                                          |   API Eksternal (Majadigi) |
                                          +----------------------------+
                                                  (3. Panggil API)
✨ Fitur Utama
Proyek ini mencakup semua fitur wajib dan beberapa fitur bonus untuk nilai tambah.

✅ Fitur Wajib
POST /api/questions
Kirim pertanyaan, simpan, kirim ke API eksternal, simpan respons, dan kembalikan ke pengguna.

GET /api/conversations
Lihat semua riwayat percakapan.

GET /api/conversations/:id
Lihat detail satu percakapan spesifik beserta pesan-pesannya.

✅ Fitur Bonus
Validasi input menggunakan AdonisJS Validator.

Skema database kustom chatbot.

Filter & paginasi di endpoint GET conversations.

Endpoint DELETE untuk menghapus percakapan.

📘 Dokumentasi lengkap (yang sedang Anda baca ini!).

🛠️ Teknologi yang Digunakan
Framework: AdonisJS v5

Bahasa: TypeScript

Database: PostgreSQL

Runtime: Node.js

HTTP Client: Axios

⚙️ Instalasi & Setup
🧱 Prasyarat
Node.js v14.x atau lebih tinggi

NPM atau Yarn

PostgreSQL aktif

📥 Langkah-langkah Instalasi
Clone repositori

bash
Copy
Edit
git clone https://github.com/username-anda/proyek-chatbot-api.git
cd proyek-chatbot-api
Instal dependensi

bash
Copy
Edit
npm install
Konfigurasi lingkungan

bash
Copy
Edit
cp .env.example .env
Edit .env:

pgsql
Copy
Edit
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DB_NAME=chatbot_db
Migrasi database

bash
Copy
Edit
node ace migration:run
Jalankan server

bash
Copy
Edit
node ace serve --watch
Server akan berjalan di http://127.0.0.1:3333.

📖 Dokumentasi API
1. Kirim Pertanyaan
Endpoint: POST /api/questions

Body:

json
Copy
Edit
{
  "question": "ada layanan apa di majadigi?",
  "session_id": "optional-session-id"
}
Response Sukses:

json
Copy
Edit
{
  "session_id": "uuid-session-id",
  "reply": "Halo! Majadigi adalah platform layanan publik digital..."
}
Response Gagal (422):

json
Copy
Edit
{
  "errors": [
    {
      "rule": "required",
      "field": "question",
      "message": "Pertanyaan tidak boleh kosong."
    }
  ]
}
2. Ambil Semua Percakapan
Endpoint: GET /api/conversations

Query Params (opsional):

page: Default 1

limit: Default 10

session_id: Filter berdasarkan ID sesi tertentu

Contoh URL:

bash
Copy
Edit
http://127.0.0.1:3333/api/conversations?page=1&limit=5
Response:

json
Copy
Edit
{
  "meta": {
    "total": 20,
    "per_page": 5,
    "current_page": 1,
    "last_page": 4
  },
  "data": [
    {
      "id": "...",
      "session_id": "...",
      "last_message": "...",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
3. Ambil Detail Percakapan
Endpoint: GET /api/conversations/:id

Response:

json
Copy
Edit
{
  "id": "...",
  "session_id": "...",
  "last_message": "...",
  "created_at": "...",
  "updated_at": "...",
  "messages": [
    {
      "sender_type": "user",
      "message": "...",
      ...
    },
    {
      "sender_type": "bot",
      "message": "...",
      ...
    }
  ]
}
Gagal (404):

json
Copy
Edit
{
  "message": "Percakapan tidak ditemukan."
}
4. Hapus Percakapan
Endpoint: DELETE /api/conversations/:id

Response:

json
Copy
Edit
{
  "message": "Percakapan berhasil dihapus."
}
📁 Struktur Proyek
bash
Copy
Edit
.
├── app/
│   ├── Controllers/Http/ChatbotController.ts
│   ├── Models/
│   │   ├── Conversation.ts
│   │   └── Message.ts
│   └── Validators/PostQuestionValidator.ts
├── config/database.ts
├── database/migrations/
├── start/routes.ts
├── .env
└── README.md
🙏 Penutup
Terima kasih telah meninjau proyek ini!
Silakan beri ⭐️ di GitHub jika Anda merasa proyek ini bermanfaat.
Untuk pertanyaan atau kontribusi, silakan buat issue atau pull request.