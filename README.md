Proyek REST API Chatbot - Maja.AI
Selamat datang di dokumentasi resmi untuk REST API Chatbot Maja.AI. Proyek ini dibangun sebagai bagian dari seleksi magang Backend Developer, menggunakan AdonisJS v5 dan PostgreSQL.

API ini berfungsi sebagai jembatan antara antarmuka pengguna (frontend) dan layanan chatbot eksternal, dengan kemampuan untuk menyimpan dan mengelola riwayat percakapan secara persisten.

flowchart Alur Kerja Sistem
Berikut adalah gambaran sederhana mengenai alur data pada aplikasi ini:

              +---------------------------+      +---------------------------------+
Pengguna ---> |       Frontend Chat       | ---> |        AdonisJS API Server      |
              +---------------------------+      +---------------------------------+
                  (1. Kirim Pertanyaan)              |  (2. Simpan Pertanyaan User)
                                                     |
                                                     v
                                             +----------------+
                                             |   PostgreSQL   |
                                             +----------------+
                                                     ^
                                                     |
                                                     |  (5. Simpan Jawaban Bot)
                                                     |
              +---------------------------+      +---------------------------------+
   Jawaban <--|       Frontend Chat       | <--- |        AdonisJS API Server      |
              +---------------------------+      +---------------------------------+
                  (6. Tampilkan Jawaban)             ^
                                                     |
                                                     | (4. Terima Jawaban)
                                                     |
                                             +---------------------------+
                                             |   API Eksternal (Majadigi)  |
                                             +---------------------------+
                                                 (3. Panggil API)

✨ Fitur Utama
Proyek ini mengimplementasikan semua fitur yang disyaratkan, beserta beberapa fitur tambahan untuk "Nilai Plus".

Fitur Wajib
Kirim Pertanyaan (POST /api/questions): Menerima pertanyaan dari pengguna, menyimpannya, memanggil API eksternal, menyimpan jawaban, dan mengembalikannya ke pengguna.

Lihat Semua Percakapan (GET /api/conversations): Menampilkan daftar semua riwayat percakapan yang tersimpan di database.

Lihat Detail Percakapan (GET /api/conversations/:id): Menampilkan detail satu percakapan spesifik beserta seluruh pesannya (dari user dan bot).

Fitur Nilai Plus (Bonus)
✅ Validasi Input: Setiap input yang masuk ke endpoint POST /api/questions divalidasi menggunakan AdonisJS Validator untuk memastikan data sesuai format.

✅ Skema Database Kustom: Semua tabel (conversations dan messages) ditempatkan di dalam skema PostgreSQL kustom bernama chatbot untuk organisasi yang lebih baik.

✅ Filter & Paginasi: Endpoint GET /api/conversations mendukung paginasi (?page=...&limit=...) dan filter berdasarkan session_id.

✅ Rute Tambahan (DELETE): Menambahkan endpoint DELETE /api/conversations/:id untuk menghapus data percakapan.

✅ Dokumentasi Lengkap: Anda sedang membacanya!

🛠️ Teknologi yang Digunakan
Framework: AdonisJS v5

Database: PostgreSQL

Bahasa: TypeScript

HTTP Client: Axios

Runtime: Node.js

🚀 Panduan Instalasi dan Setup
Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

Prasyarat
Node.js: versi 14.x atau lebih tinggi.

NPM atau Yarn.

PostgreSQL: Server database yang aktif.

Langkah-langkah Instalasi
Clone Repositori

git clone https://github.com/username-anda/proyek-chatbot-api.git
cd proyek-chatbot-api

Instal Dependensi

npm install

Konfigurasi Lingkungan (.env)
Salin file .env.example menjadi .env baru.

cp .env.example .env

Kemudian, buka file .env dan sesuaikan konfigurasi database PostgreSQL Anda.

# .env
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=username_postgres_anda
PG_PASSWORD=password_postgres_anda
PG_DB_NAME=chatbot_db

Jalankan Migrasi Database
Pastikan Anda sudah membuat database chatbot_db di PostgreSQL. Kemudian jalankan perintah ini untuk membuat tabel.

node ace migration:run

Jalankan Server

node ace serve --watch

Server akan berjalan di http://127.0.0.1:3333.

📖 Dokumentasi API
Berikut adalah detail untuk setiap endpoint yang tersedia.

1. Kirim Pertanyaan
Endpoint: POST /api/questions

Deskripsi: Mengirim pertanyaan baru. Jika session_id tidak diberikan, sesi baru akan dibuat.

Body (JSON):

{
  "question": "ada layanan apa di majadigi?",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" // Opsional
}

Respons Sukses (200 OK):

{
  "session_id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
  "reply": "Halo! Majadigi adalah platform layanan publik digital..."
}

Respons Gagal (422 Unprocessable Entity):

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

Deskripsi: Mengambil daftar semua percakapan dengan paginasi.

Query Params (Opsional):

page (number): Nomor halaman. Default: 1.

limit (number): Jumlah data per halaman. Default: 10.

session_id (string): Filter berdasarkan ID sesi tertentu.

Contoh URL: http://127.0.0.1:3333/api/conversations?page=1&limit=5

Respons Sukses (200 OK):

{
  "meta": {
    "total": 20,
    "per_page": 5,
    "current_page": 1,
    "last_page": 4,
    ...
  },
  "data": [
    {
      "id": "...",
      "session_id": "...",
      "last_message": "Terima kasih! Ada lagi yang bisa dibantu?",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}

3. Ambil Detail Percakapan
Endpoint: GET /api/conversations/:id

Deskripsi: Mengambil detail satu percakapan beserta seluruh pesannya.

Contoh URL: http://127.0.0.1:3333/api/conversations/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Respons Sukses (200 OK):

{
  "id": "...",
  "session_id": "...",
  "last_message": "...",
  "created_at": "...",
  "updated_at": "...",
  "messages": [
    {
      "id": "...",
      "conversation_id": "...",
      "sender_type": "user",
      "message": "ada layanan apa di majadigi?",
      "created_at": "..."
    },
    {
      "id": "...",
      "conversation_id": "...",
      "sender_type": "bot",
      "message": "Halo! Majadigi adalah platform...",
      "created_at": "..."
    }
  ]
}

Respons Gagal (404 Not Found):

{
  "message": "Percakapan tidak ditemukan."
}

4. Hapus Percakapan
Endpoint: DELETE /api/conversations/:id

Deskripsi: Menghapus sebuah percakapan dan semua pesan terkait.

Respons Sukses (200 OK):

{
  "message": "Percakapan berhasil dihapus."
}

📁 Struktur Proyek
.
├── app/
│   ├── Controllers/Http/ChatbotController.ts  # Logika utama untuk setiap rute
│   ├── Models/                             # Model Lucid untuk interaksi DB
│   │   ├── Conversation.ts
│   │   └── Message.ts
│   └── Validators/PostQuestionValidator.ts    # Aturan validasi input
├── config/
│   └── database.ts                         # Konfigurasi koneksi database
├── database/
│   └── migrations/                         # Skema tabel database
├── start/
│   └── routes.ts                           # Definisi semua endpoint API
├── .env                                    # File konfigurasi lingkungan
└── README.md                               # Dokumentasi ini

Terima kasih telah meninjau proyek ini!