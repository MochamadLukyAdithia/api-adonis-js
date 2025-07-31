Tentu, ini adalah versi `README.md` yang telah dirapikan dan ditingkatkan agar lebih terstruktur, profesional, dan mudah dibaca.

-----

# 🚀 REST API Chatbot - Maja.AI

Selamat datang di dokumentasi resmi untuk **REST API Chatbot Maja.AI**. Proyek ini merupakan jembatan antara antarmuka pengguna (frontend) dengan layanan chatbot eksternal, yang dilengkapi kemampuan untuk menyimpan dan mengelola riwayat percakapan.

Proyek ini dikembangkan menggunakan **AdonisJS v5** dan **PostgreSQL** sebagai bagian dari proses seleksi untuk posisi Magang Backend Developer.

<img width="1003" height="653" alt="image" src="https://github.com/user-attachments/assets/c9be428b-05d3-4677-9256-32b01f381c31" />

-----

## ✨ Fitur Utama

### ✅ Fitur Wajib

  - **`POST /api/questions`**: Mengirim pertanyaan, menyimpannya, meneruskannya ke API eksternal, menyimpan respons dari bot, dan mengembalikannya ke pengguna.
  - **`GET /api/conversations`**: Menampilkan semua riwayat percakapan yang tersimpan.
  - **`GET /api/conversations/:id`**: Menampilkan detail satu percakapan spesifik beserta seluruh pesannya.

### ⭐ Fitur Bonus

  - **Validasi Input**: Menggunakan `AdonisJS Validator` untuk memastikan integritas data.
  - **Skema Database Kustom**: Desain database yang dioptimalkan untuk kebutuhan chatbot.
  - **Filter & Paginasi**: Pada endpoint `GET /api/conversations` untuk pengelolaan data yang efisien.
  - **`DELETE /api/conversations/:id`**: Endpoint untuk menghapus percakapan.
  - **Dokumentasi Lengkap**: Panduan penggunaan API yang informatif (yang sedang Anda baca).

-----

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | AdonisJS v5 |
| **Bahasa** | TypeScript |
| **Database** | PostgreSQL |
| **Runtime** | Node.js |
| **HTTP Client** | Axios |

-----

## ⚙️ Instalasi dan Setup

### 🧱 Prasyarat

  - [Node.js](https://nodejs.org/) v14.x atau lebih tinggi
  - [NPM](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)
  - Server PostgreSQL yang aktif dan berjalan

### 📥 Langkah-langkah Instalasi

1.  **Clone repositori ini:**

    ```bash
    git clone https://github.com/username-anda/proyek-chatbot-api.git
    cd proyek-chatbot-api
    ```

2.  **Instal dependensi proyek:**

    ```bash
    npm install
    ```

3.  **Konfigurasi Lingkungan:**
    Salin file `.env.example` menjadi `.env`.

    ```bash
    cp .env.example .env
    ```

    Kemudian, buka dan sesuaikan file `.env` dengan kredensial database Anda:

    ```env
    # --- Database Configuration ---
    DB_CONNECTION=pg
    PG_HOST=localhost
    PG_PORT=5432
    PG_USER=postgres
    PG_PASSWORD=your_secret_password
    PG_DB_NAME=chatbot_db
    ```

4.  **Jalankan Migrasi Database:**
    Perintah ini akan membuat semua tabel yang diperlukan dalam database Anda.

    ```bash
    node ace migration:run
    ```

5.  **Jalankan Server Pengembangan:**
    Server akan aktif dalam mode *watch*, yang berarti akan otomatis me-restart saat ada perubahan kode.

    ```bash
    node ace serve --watch
    ```

    Server akan berjalan di alamat: `http://127.0.0.1:3333`

-----

## 📖 Dokumentasi API

Berikut adalah detail untuk setiap endpoint yang tersedia.

### 1\. Kirim Pertanyaan

  - **Endpoint**: `POST /api/questions`
  - **Deskripsi**: Mengirimkan pertanyaan baru dari pengguna. Jika `session_id` tidak disertakan dalam *body*, sebuah sesi percakapan baru akan dibuat secara otomatis.

**Body Request:**

```json
{
  "question": "ada layanan apa di majadigi?",
  "session_id": "optional-session-id",
  "additional_context": "optional-context"
}
```

\<details\>
\<summary\>\<strong\>✅ Contoh Response Sukses (200 OK)\</strong\>\</summary\>

```json
{
  "session_id": "863b1abc-3989-48f7-98d3-9f5dfb4dd7e0",
  "reply": "Halo! Saya Maja.Ai, asisten informasi publik Jawa Timur. 🌟 Tentu saja, ada banyak layanan data yang tersedia di Jawa Timur. Misalnya, Anda dapat mengakses Open Data Jatim yang menyediakan berbagai data terbuka dari pemerintah Jawa Timur. Selain itu, Klinik Hoaks juga tersedia untuk verifikasi berita dan pengecekan fakta. \n\nJika Anda tertarik dengan data cuaca, BMKG menyediakan layanan Digital Weather untuk sektor lalu lintas, penerbangan, dan maritim. \n\nAda lagi layanan lain seperti Trans Jatim AJAIB untuk monitoring bus, dan Harga Sembako untuk monitoring harga bahan pokok real-time.\n\nApakah ada layanan data tertentu yang ingin Anda ketahui lebih lanjut? 😊"
}
```

\</details\>

\<details\>
\<summary\>\<strong\>❌ Contoh Response Gagal (422 Unprocessable Entity)\</strong\>\</summary\>

```json
{
  "message": "Terjadi kesalahan saat memproses permintaan Anda.",
  "error": "E_VALIDATION_FAILURE: Validation Exception"
}
```

\</details\>

-----

### 2\. Ambil Semua Percakapan

  - **Endpoint**: `GET /api/conversations`
  - **Deskripsi**: Mendapatkan daftar semua percakapan dengan dukungan paginasi dan filter.

**Query Params (Opsional):**

  - `page`: Nomor halaman (default: `1`).
  - `limit`: Jumlah item per halaman (default: `10`).
  - `session_id`: Filter untuk menampilkan percakapan dari ID sesi tertentu.

**Contoh URL:** `http://127.0.0.1:3333/api/conversations?page=1&limit=5`

✅ Contoh Response Sukses (200 OK)

```json
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
      "last_message": "Halo! Saya Maja.Ai...",
      "created_at": "2025-07-31T11:30:55.898+07:00",
      "updated_at": "2025-07-31T11:31:02.852+07:00"
    },
    {
      "id": 7,
      "session_id": "416001b8-5b55-4f52-8e5d-48a9ae4effa6",
      "last_message": "Halo! Saya Maja.Ai...",
      "created_at": "2025-07-31T11:29:07.574+07:00",
      "updated_at": "2025-07-31T11:29:14.011+07:00"
    }
  ]
}
```

-----

### 3\. Ambil Detail Percakapan

  - **Endpoint**: `GET /api/conversations/:id`
  - **Deskripsi**: Mendapatkan detail lengkap dari satu sesi percakapan, termasuk riwayat semua pesan di dalamnya.

✅ Contoh Response Sukses (200 OK)

```json
{
  "id": 3,
  "session_id": "131c75c5-6e9c-4cb4-a52f-3bec0be3c286",
  "last_message": "Haloo! Tentu, saya bisa memberikan informasi tentang Wisata Ranu Pani...",
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
      "message": "Halo! Pelayanan Majadigi sangat baik...",
      "created_at": "2025-07-30T18:30:14.462+07:00",
      "updated_at": "2025-07-30T18:30:14.462+07:00"
    }
  ]
}
```
❌ Contoh Response Gagal (404 Not Found)

```json
{
  "success": false,
  "message": "Percakapan tidak ditemukan"
}
```

-----

### 4\. Hapus Percakapan

  - **Endpoint**: `DELETE /api/conversations/:id`
  - **Deskripsi**: Menghapus sebuah percakapan beserta semua pesan yang terkait di dalamnya secara permanen.

✅ Contoh Response Sukses (200 OK)

```json
{
  "success": true,
  "message": "Conversation dengan ID 3 berhasil dihapus."
}
```

❌ Contoh Response Gagal (404 Not Found)
```json
{
  "success": false,
  "message": "Percakapan tidak ditemukan"
}
```

-----

## 🙏 Penutup

Terima kasih telah meninjau proyek ini. Masukan dan saran sangat kami hargai.

Silakan beri ⭐ di GitHub jika Anda merasa proyek ini bermanfaat. Untuk pertanyaan atau kontribusi, jangan ragu untuk membuat *issue* atau *pull request*.
