🚀 Proyek REST API Chatbot - Maja.AI
Selamat datang di dokumentasi resmi untuk REST API Chatbot Maja.AI. Proyek ini dikembangkan sebagai bagian dari seleksi magang Backend Developer, menggunakan AdonisJS v5 dan PostgreSQL.

API ini berfungsi sebagai jembatan antara antarmuka pengguna (frontend) dan layanan chatbot eksternal, dengan kemampuan menyimpan serta mengelola riwayat percakapan secara persisten.

📊 Flowchart Alur Kerja Sistem
image
✨ Fitur Utama
✅ Fitur Wajib
POST /api/questions Kirim pertanyaan, simpan, teruskan ke API eksternal, simpan respons, dan kembalikan ke pengguna.

GET /api/conversations Lihat semua riwayat percakapan.

GET /api/conversations/:id Lihat detail satu percakapan spesifik beserta pesan-pesannya.

✅ Fitur Bonus
Validasi input menggunakan AdonisJS Validator.
Skema database kustom untuk chatbot.
Filter & paginasi di endpoint GET /api/conversations.
Endpoint DELETE untuk menghapus percakapan.
Dokumentasi lengkap (yang sedang Anda baca ini!).
🛠️ Teknologi yang Digunakan
Komponen	Teknologi
Framework	AdonisJS v5
Bahasa	TypeScript
Database	PostgreSQL
Runtime	Node.js
HTTP Client	Axios
⚙️ Instalasi & Setup
🧱 Prasyarat
Node.js v14.x atau lebih tinggi
NPM atau Yarn
PostgreSQL server yang sedang berjalan
📥 Langkah-langkah Instalasi
Clone repositori

git clone [https://github.com/username-anda/proyek-chatbot-api.git](https://github.com/username-anda/proyek-chatbot-api.git)
cd proyek-chatbot-api
Instal dependensi

npm install
Konfigurasi lingkungan Salin file contoh .env

cp .env.example .env
Buka dan edit file .env dengan kredensial database Anda:

DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DB_NAME=chatbot_db
Jalankan migrasi database Perintah ini akan membuat tabel yang diperlukan di database Anda.

node ace migration:run
Jalankan server pengembangan

node ace serve --watch
Server akan berjalan di: http://127.0.0.1:3333

📖 Dokumentasi API
1. Kirim Pertanyaan
Endpoint: POST /api/questions

Deskripsi: Mengirimkan pertanyaan baru. Jika session_id tidak disertakan, sesi baru akan dibuat.

Body Request:

{
  "question": "ada layanan apa di majadigi?",
  "session_id": "optional-session-id",
  "additional_context : "optional" 
}
Response Sukses (200 OK):

  {
    "session_id": "863b1abc-3989-48f7-98d3-9f5dfb4dd7e0",
    "reply": "Halo! Saya Maja.Ai, asisten informasi publik Jawa Timur. 🌟 Tentu saja, ada banyak layanan data yang tersedia di Jawa Timur. Misalnya, Anda dapat mengakses Open Data Jatim yang menyediakan berbagai data terbuka dari            pemerintah Jawa Timur. Selain itu, Klinik Hoaks juga tersedia untuk verifikasi berita dan pengecekan fakta. \n\nJika Anda tertarik dengan data cuaca, BMKG menyediakan layanan Digital Weather untuk sektor lalu lintas,                     penerbangan, dan maritim. \n\nAda lagi layanan lain seperti Trans Jatim AJAIB untuk monitoring bus, dan Harga Sembako untuk monitoring harga bahan pokok real-time.\n\nApakah ada layanan data tertentu yang ingin Anda ketahui               lebih lanjut? 😊"
  }
Response Gagal (422 Unprocessable Entity):

 {
"message": "Terjadi kesalahan saat memproses permintaan Anda.",
"error": "E_VALIDATION_FAILURE: Validation Exception"
}
2. Ambil Semua Percakapan
Endpoint: GET /api/conversations

Deskripsi: Mendapatkan daftar semua percakapan dengan paginasi dan filter.

Query Params (opsional):

page: Nomor halaman (default: 1).
limit: Jumlah item per halaman (default: 10).
session_id: Filter berdasarkan ID sesi tertentu.
Contoh URL:

http://127.0.0.1:3333/api/conversations?page=1
Response Sukses (200 OK):

  {
    "meta": {
      "total": 6,
      "per_page": 10,
      "current_page": 1,
      "last_page": 1,
      "first_page": 1,
      "first_page_url": "/?page=1",
      "last_page_url": "/?page=1",
      "next_page_url": null,
      "previous_page_url": null
    },
    "data": [
      {
        "id": 9,
        "session_id": "863b1abc-3989-48f7-98d3-9f5dfb4dd7e0",
        "last_message": "Halo! Saya Maja.Ai, asisten informasi publik Jawa Timur. 🌟 Tentu saja, ada banyak layanan data yang tersedia di Jawa Timur. Misalnya, Anda dapat mengakses Open Data Jatim yang menyediakan berbagai data terbuka dari pemerintah Jawa Timur. Selain itu, Klinik Hoaks juga tersedia untuk verifikasi berita dan pengecekan fakta. \n\nJika Anda tertarik dengan data cuaca, BMKG menyediakan layanan Digital Weather untuk sektor lalu lintas, penerbangan, dan maritim. \n\nAda lagi layanan lain seperti Trans Jatim AJAIB untuk monitoring bus, dan Harga Sembako untuk monitoring harga bahan pokok real-time.\n\nApakah ada layanan data tertentu yang ingin Anda ketahui lebih lanjut? 😊",
        "created_at": "2025-07-31T11:30:55.898+07:00",
        "updated_at": "2025-07-31T11:31:02.852+07:00"
      },
      {
        "id": 7,
        "session_id": "416001b8-5b55-4f52-8e5d-48a9ae4effa6",
        "last_message": "Halo! Saya Maja.Ai, asisten informasi publik Jawa Timur. 🌟 Tentu saja, ada banyak layanan data yang tersedia di sini. Misalnya, BMKG menyediakan layanan Digital Weather untuk sektor lalu lintas, penerbangan, dan maritim. Selain itu, LAB DATA menyediakan informasi lalu lintas dan kapasitas jalan, yang sangat berguna bagi pembuat kebijakan dan pelaku usaha transportasi.\n\nJika Anda tertarik dengan data cuaca atau informasi lalu lintas, BMKG dan LAB DATA adalah sumber yang sangat baik. Anda juga dapat mengakses Open Data Jatim untuk berbagai informasi publik lainnya.\n\nAda layanan data tertentu yang ingin Anda ketahui lebih lanjut? 😊",
        "created_at": "2025-07-31T11:29:07.574+07:00",
        "updated_at": "2025-07-31T11:29:14.011+07:00"
      },
      {
        "id": 6,
        "session_id": "80c1f572-e6f2-43f8-bcfb-7f9855a6bafe",
        "last_message": "Halo! Saya Maja.Ai, asisten informasi publik Jawa Timur. 🌟 Tentu saja, ada banyak layanan data yang tersedia di sini. Misalnya, BMKG menyediakan layanan Digital Weather untuk sektor lalu lintas, penerbangan, dan maritim. Selain itu, LAB DATA menyediakan informasi lalu lintas dan kapasitas jalan, yang sangat berguna bagi pembuat kebijakan dan pelaku usaha transportasi.\n\nJika Anda tertarik dengan data cuaca atau informasi lalu lintas, BMKG dan LAB DATA adalah sumber yang sangat baik. Anda juga dapat mengakses Open Data Jatim untuk berbagai informasi publik lainnya.\n\nAda layanan data tertentu yang ingin Anda ketahui lebih lanjut? 😊",
        "created_at": "2025-07-31T11:28:00.237+07:00",
        "updated_at": "2025-07-31T11:28:09.796+07:00"
      },
      {
        "id": 5,
        "session_id": "354de604-1ca2-4492-b852-419bf392066b",
        "last_message": "Halo! Saya Maja.Ai, asisten informasi publik Jawa Timur. 🌟 Tentu saja, ada banyak layanan data yang tersedia di sini. Misalnya, BMKG menyediakan layanan Digital Weather untuk sektor lalu lintas, penerbangan, dan maritim. Selain itu, LAB DATA menyediakan informasi lalu lintas dan kapasitas jalan, yang sangat berguna bagi pembuat kebijakan dan pelaku usaha transportasi.\n\nJika Anda tertarik dengan data cuaca atau informasi lalu lintas, BMKG dan LAB DATA adalah sumber yang sangat baik. Anda juga dapat mengakses Open Data Jatim untuk berbagai informasi publik lainnya.\n\nAda layanan data tertentu yang ingin Anda ketahui lebih lanjut? 😊",
        "created_at": "2025-07-31T11:27:23.121+07:00",
        "updated_at": "2025-07-31T11:27:30.178+07:00"
      },
      {
        "id": 4,
        "session_id": "602549ac-a49d-4f3e-900f-ddd621180201",
        "last_message": "Halo! Saya Maja.Ai, asisten informasi publik Jawa Timur. 🌟 Tentu saja, ada banyak layanan data yang tersedia di sini. Misalnya, kami menyediakan layanan Digital Weather untuk sektor lalu lintas, penerbangan, dan maritim. Selain itu, kami juga memiliki layanan LAB DATA yang menyediakan data lalu lintas, informasi rute, dan banyak lagi.\n\nJika Anda ingin tahu lebih lanjut tentang layanan data tertentu, atau ingin petunjuk langkah demi langkah, silakan beri tahu saya! 😊",
        "created_at": "2025-07-31T11:24:13.207+07:00",
        "updated_at": "2025-07-31T11:24:18.977+07:00"
      },
      {
        "id": 3,
        "session_id": "131c75c5-6e9c-4cb4-a52f-3bec0be3c286",
        "last_message": "Haloo! Tentu, saya bisa memberikan informasi tentang Wisata Ranu Pani. Ranu Pani adalah sebuah danau berwarna biru yang terletak di Kabupaten Malang, Jawa Timur. Ini adalah salah satu tujuan wisata yang populer di kawasan ini, terkenal dengan pemandangan alam yang indah dan udara segar.\n\nBerikut adalah beberapa informasi penting tentang Wisata Ranu Pani:\n\n1. **Lokasi**: Ranu Pani terletak di Desa Sendang Biru, Kecamatan Turen, Kabupaten Malang.\n2. **Fasilitas**: Di sekitar danau, Anda bisa menemukan fasilitas seperti tempat parkir, area piknik, dan beberapa warung kecil yang menjual makanan dan minuman ringan.\n3. **Aktivitas**: Anda bisa menikmati berbagai kegiatan di sini, seperti bersepeda, berjalan kaki, atau hanya bersantai dan menikmati pemandangan alam yang indah.\n4. **Waktu Terbaik untuk Kunjungan**: Waktu terbaik untuk mengunjungi Ranu Pani adalah di pagi hari atau sore hari ketika cuacanya sejuk dan ada sedikit kabut di sekitar danau, yang memberikan pemandangan yang lebih romantis.\n\nUntuk mengunjungi Ranu Pani, Anda bisa mengakses informasi lebih lanjut melalui portal pariwisata resmi Jawa Timur atau aplikasi mobile SIDITA. Di sana, Anda bisa menemukan peta, rekomendasi, dan tips untuk kunjungan Anda.\n\nAdakah ada informasi tambahan yang ingin Anda ketahui tentang Wisata Ranu Pani atau adakah hal lain yang bisa saya bantu? 😊",
        "created_at": "2025-07-30T18:30:09.094+07:00",
        "updated_at": "2025-07-30T18:33:19.285+07:00"
      }
    ]
  }
3. Ambil Detail Percakapan
Endpoint: GET /api/conversations/:id

Deskripsi: Mendapatkan detail lengkap dari satu percakapan, termasuk semua pesannya.

Response Sukses (200 OK):

{
    "id": 3,
    "session_id": "131c75c5-6e9c-4cb4-a52f-3bec0be3c286",
    "last_message": "Haloo! Tentu, saya bisa memberikan informasi tentang Wisata Ranu Pani. Ranu Pani adalah sebuah danau berwarna biru yang terletak di Kabupaten Malang, Jawa Timur. Ini adalah salah satu tujuan wisata yang populer di kawasan ini, terkenal dengan pemandangan alam yang indah dan udara segar.\n\nBerikut adalah beberapa informasi penting tentang Wisata Ranu Pani:\n\n1. **Lokasi**: Ranu Pani terletak di Desa Sendang Biru, Kecamatan Turen, Kabupaten Malang.\n2. **Fasilitas**: Di sekitar danau, Anda bisa menemukan fasilitas seperti tempat parkir, area piknik, dan beberapa warung kecil yang menjual makanan dan minuman ringan.\n3. **Aktivitas**: Anda bisa menikmati berbagai kegiatan di sini, seperti bersepeda, berjalan kaki, atau hanya bersantai dan menikmati pemandangan alam yang indah.\n4. **Waktu Terbaik untuk Kunjungan**: Waktu terbaik untuk mengunjungi Ranu Pani adalah di pagi hari atau sore hari ketika cuacanya sejuk dan ada sedikit kabut di sekitar danau, yang memberikan pemandangan yang lebih romantis.\n\nUntuk mengunjungi Ranu Pani, Anda bisa mengakses informasi lebih lanjut melalui portal pariwisata resmi Jawa Timur atau aplikasi mobile SIDITA. Di sana, Anda bisa menemukan peta, rekomendasi, dan tips untuk kunjungan Anda.\n\nAdakah ada informasi tambahan yang ingin Anda ketahui tentang Wisata Ranu Pani atau adakah hal lain yang bisa saya bantu? 😊",
    "created_at": "2025-07-30T18:30:09.094+07:00",
    "updated_at": "2025-07-30T18:33:19.285+07:00",
    "messages": [
      {
        "id": 5,
        "conversation_id": 3,
        "sender_type": "user",
        "message": "apakah pelayanan majadigi bagus?",
        "created_at": "2025-07-30T18:30:09.129+07:00",
        "updated_at": "2025-07-30T18:30:09.129+07:00"
      },
      {
        "id": 6,
        "conversation_id": 3,
        "sender_type": "bot",
        "message": "Halo! Pelayanan Majadigi sangat baik karena platform ini menghadirkan kemudahan akses layanan pemerintah dalam satu pintu untuk memenuhi berbagai kebutuhan masyarakat. Majadigi menyediakan lebih dari 36 layanan publik unggulan Provinsi Jawa Timur dengan simpel, cerdas, dan terhubung sepenuhnya. 🌟\n\nApakah ada layanan tertentu di Majadigi yang ingin Anda ketahui lebih lanjut? 😊",
        "created_at": "2025-07-30T18:30:14.462+07:00",
        "updated_at": "2025-07-30T18:30:14.462+07:00"
      },
      {
        "id": 7,
        "conversation_id": 3,
        "sender_type": "user",
        "message": "berapa 1 + 1",
        "created_at": "2025-07-30T18:31:00.974+07:00",
        "updated_at": "2025-07-30T18:31:00.975+07:00"
      },
      {
        "id": 8,
        "conversation_id": 3,
        "sender_type": "bot",
        "message": "Haloo! Saya Maja.Ai, asisten informasi publik Jawa Timur. Tentu, 1 + 1 sama dengan 2. 😊 Jika Anda ingin informasi lebih lanjut tentang layanan publik atau data pemerintah, saya bisa bantu! 📋",
        "created_at": "2025-07-30T18:31:05.760+07:00",
        "updated_at": "2025-07-30T18:31:05.760+07:00"
      },
      {
        "id": 9,
        "conversation_id": 3,
        "sender_type": "user",
        "message": "dimanakah jawa timur?",
        "created_at": "2025-07-30T18:31:28.240+07:00",
        "updated_at": "2025-07-30T18:31:28.240+07:00"
      },
      {
        "id": 10,
        "conversation_id": 3,
        "sender_type": "bot",
        "message": "Haloo! Jawa Timur adalah provinsi yang terletak di bagian timur Pulau Jawa, Indonesia. Ini adalah provinsi terluas kedua di Indonesia setelah Kalimantan Timur. Pusat pemerintahannya berada di kota Surabaya, yang juga merupakan kota terbesar di provinsi ini. Jawa Timur memiliki berbagai daya tarik wisata, budaya, dan sejarah yang menarik. 🌏\n\nApakah Anda ingin tahu lebih lanjut tentang wisata, layanan publik, atau informasi terkini di Jawa Timur? 😊",
        "created_at": "2025-07-30T18:31:33.452+07:00",
        "updated_at": "2025-07-30T18:31:33.452+07:00"
      },
      {
        "id": 11,
        "conversation_id": 3,
        "sender_type": "user",
        "message": "kamu tau bitcoin nggak",
        "created_at": "2025-07-30T18:32:23.244+07:00",
        "updated_at": "2025-07-30T18:32:23.244+07:00"
      },
      {
        "id": 12,
        "conversation_id": 3,
        "sender_type": "bot",
        "message": "Halo! Ya, saya bisa memberikan informasi tentang berbagai topik terkait Jawa Timur, termasuk layanan publik, dokumen pemerintah, dan akses data. Namun, saya tidak memiliki informasi spesifik tentang Bitcoin. Untuk informasi terkini tentang Bitcoin, mungkin bisa mengunjungi situs web yang mengkhususkan diri dalam mata uang digital. Ada topik lain terkait Jawa Timur yang mungkin Anda minati? 😊",
        "created_at": "2025-07-30T18:32:29.415+07:00",
        "updated_at": "2025-07-30T18:32:29.415+07:00"
      },
      {
        "id": 13,
        "conversation_id": 3,
        "sender_type": "user",
        "message": "jelasakan saya wisata ranu pani",
        "created_at": "2025-07-30T18:33:11.510+07:00",
        "updated_at": "2025-07-30T18:33:11.510+07:00"
      },
      {
        "id": 14,
        "conversation_id": 3,
        "sender_type": "bot",
        "message": "Haloo! Tentu, saya bisa memberikan informasi tentang Wisata Ranu Pani. Ranu Pani adalah sebuah danau berwarna biru yang terletak di Kabupaten Malang, Jawa Timur. Ini adalah salah satu tujuan wisata yang populer di kawasan ini, terkenal dengan pemandangan alam yang indah dan udara segar.\n\nBerikut adalah beberapa informasi penting tentang Wisata Ranu Pani:\n\n1. **Lokasi**: Ranu Pani terletak di Desa Sendang Biru, Kecamatan Turen, Kabupaten Malang.\n2. **Fasilitas**: Di sekitar danau, Anda bisa menemukan fasilitas seperti tempat parkir, area piknik, dan beberapa warung kecil yang menjual makanan dan minuman ringan.\n3. **Aktivitas**: Anda bisa menikmati berbagai kegiatan di sini, seperti bersepeda, berjalan kaki, atau hanya bersantai dan menikmati pemandangan alam yang indah.\n4. **Waktu Terbaik untuk Kunjungan**: Waktu terbaik untuk mengunjungi Ranu Pani adalah di pagi hari atau sore hari ketika cuacanya sejuk dan ada sedikit kabut di sekitar danau, yang memberikan pemandangan yang lebih romantis.\n\nUntuk mengunjungi Ranu Pani, Anda bisa mengakses informasi lebih lanjut melalui portal pariwisata resmi Jawa Timur atau aplikasi mobile SIDITA. Di sana, Anda bisa menemukan peta, rekomendasi, dan tips untuk kunjungan Anda.\n\nAdakah ada informasi tambahan yang ingin Anda ketahui tentang Wisata Ranu Pani atau adakah hal lain yang bisa saya bantu? 😊",
        "created_at": "2025-07-30T18:33:19.280+07:00",
        "updated_at": "2025-07-30T18:33:19.281+07:00"
      }
    ]
  }
Response Gagal (404 Not Found):

  {
    "success": false,
    "message": "Percakapan tidak ditemukan"
  }
4. Hapus Percakapan
Endpoint: DELETE /api/conversations/:id

Deskripsi: Menghapus sebuah percakapan beserta semua pesan di dalamnya.

Response Sukses (200 OK):

  {
    "success": true,
    "message": "Conversation dengan ID 3 berhasil dihapus."
  }
🙏 Penutup
Terima kasih telah meninjau proyek ini!

Silakan beri ⭐ di GitHub jika Anda merasa proyek ini bermanfaat. Untuk pertanyaan atau kontribusi, jangan ragu untuk membuat issue atau pull request.
