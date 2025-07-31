
# 🚀 Proyek REST API Chatbot - Maja.AI

Selamat datang di dokumentasi resmi untuk REST API Chatbot **Maja.AI**.
Proyek ini dikembangkan sebagai bagian dari seleksi magang Backend Developer, menggunakan **AdonisJS v5** dan **PostgreSQL**.

API ini berfungsi sebagai jembatan antara antarmuka pengguna (frontend) dan layanan chatbot eksternal, dengan kemampuan menyimpan serta mengelola riwayat percakapan secara persisten.

---

## 📊 Flowchart Alur Kerja Sistem

```plaintext
        +---------------------------+      +---------------------------------+
Pengguna → |     Frontend Chat         | →→→→ |      AdonisJS API Server        |
        +---------------------------+      +---------------------------------+
          (1. Kirim Pertanyaan)              |  (2. Simpan Pertanyaan)
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
 Jawaban ← |     Frontend Chat         | ←←←← |      AdonisJS API Server        |
        +---------------------------+      +---------------------------------+
          (6. Tampilkan Jawaban)             ↑
                                             |
                                             | (4. Terima Jawaban)
                                             |
                                     +----------------------------+
                                     |   API Eksternal (Majadigi) |
                                     +----------------------------+
                                           (3. Panggil API)
````

-----

## ✨ Fitur Utama

#### ✅ Fitur Wajib

  - **`POST /api/questions`**
    Kirim pertanyaan, simpan, teruskan ke API eksternal, simpan respons, dan kembalikan ke pengguna.

  - **`GET /api/conversations`**
    Lihat semua riwayat percakapan.

  - **`GET /api/conversations/:id`**
    Lihat detail satu percakapan spesifik beserta pesan-pesannya.

#### ✅ Fitur Bonus

  - Validasi input menggunakan **AdonisJS Validator**.
  - Skema database kustom untuk chatbot.
  - **Filter & paginasi** di endpoint `GET /api/conversations`.
  - Endpoint **`DELETE`** untuk menghapus percakapan.
  - Dokumentasi lengkap (yang sedang Anda baca ini\!).

-----

## 🛠️ Teknologi yang Digunakan

| Komponen    | Teknologi     |
|-------------|---------------|
| **Framework** | AdonisJS v5   |
| **Bahasa** | TypeScript    |
| **Database** | PostgreSQL    |
| **Runtime** | Node.js       |
| **HTTP Client**| Axios         |

-----

## ⚙️ Instalasi & Setup

#### 🧱 Prasyarat

  - Node.js `v14.x` atau lebih tinggi
  - `NPM` atau `Yarn`
  - PostgreSQL server yang sedang berjalan

#### 📥 Langkah-langkah Instalasi

1.  **Clone repositori**

    ```bash
    git clone [https://github.com/username-anda/proyek-chatbot-api.git](https://github.com/username-anda/proyek-chatbot-api.git)
    cd proyek-chatbot-api
    ```

2.  **Instal dependensi**

    ```bash
    npm install
    ```

3.  **Konfigurasi lingkungan**
    Salin file contoh `.env`

    ```bash
    cp .env.example .env
    ```

    Buka dan edit file `.env` dengan kredensial database Anda:

    ```env
    DB_CONNECTION=pg
    PG_HOST=localhost
    PG_PORT=5432
    PG_USER=postgres
    PG_PASSWORD=your_password
    PG_DB_NAME=chatbot_db
    ```

4.  **Jalankan migrasi database**
    Perintah ini akan membuat tabel yang diperlukan di database Anda.

    ```bash
    node ace migration:run
    ```

5.  **Jalankan server pengembangan**

    ```bash
    node ace serve --watch
    ```

    Server akan berjalan di: `http://127.0.0.1:3333`

-----

## 📖 Dokumentasi API

### 1\. Kirim Pertanyaan

  - **Endpoint:** `POST /api/questions`

  - **Deskripsi:** Mengirimkan pertanyaan baru. Jika `session_id` tidak disertakan, sesi baru akan dibuat.

  - **Body Request:**

    ```json
    {
      "question": "ada layanan apa di majadigi?",
      "session_id": "optional-session-id"
    }
    ```

  - **Response Sukses (200 OK):**

    ```json
    {
      "session_id": "uuid-session-id-baru-atau-yang-sudah-ada",
      "reply": "Halo! Majadigi adalah platform layanan publik digital yang menyediakan berbagai macam layanan..."
    }
    ```

  - **Response Gagal (422 Unprocessable Entity):**

    ```json
    {
      "errors": [
        {
          "rule": "required",
          "field": "question",
          "message": "Pertanyaan tidak boleh kosong."
        }
      ]
    }
    ```

### 2\. Ambil Semua Percakapan

  - **Endpoint:** `GET /api/conversations`

  - **Deskripsi:** Mendapatkan daftar semua percakapan dengan paginasi dan filter.

  - **Query Params (opsional):**

      - `page`: Nomor halaman (default: `1`).
      - `limit`: Jumlah item per halaman (default: `10`).
      - `session_id`: Filter berdasarkan ID sesi tertentu.

  - **Contoh URL:**

    ```bash
    [http://127.0.0.1:3333/api/conversations?page=1&limit=5](http://127.0.0.1:3333/api/conversations?page=1&limit=5)
    ```

  - **Response Sukses (200 OK):**

    ```json
    {
      "meta": {
        "total": 20,
        "per_page": 5,
        "current_page": 1,
        "last_page": 4
      },
      "data": [
        {
          "id": "conversation-uuid-1",
          "session_id": "session-uuid-abc",
          "last_message": "Tentu, bisa saya bantu lagi?",
          "created_at": "2025-07-31T10:00:00.000Z",
          "updated_at": "2025-07-31T10:05:00.000Z"
        }
      ]
    }
    ```

### 3\. Ambil Detail Percakapan

  - **Endpoint:** `GET /api/conversations/:id`

  - **Deskripsi:** Mendapatkan detail lengkap dari satu percakapan, termasuk semua pesannya.

  - **Response Sukses (200 OK):**

    ```json
    {
      "id": "conversation-uuid-1",
      "session_id": "session-uuid-abc",
      "created_at": "...",
      "updated_at": "...",
      "messages": [
        {
          "sender_type": "user",
          "message": "Halo, Maja!",
          "created_at": "..."
        },
        {
          "sender_type": "bot",
          "message": "Halo! Ada yang bisa saya bantu?",
          "created_at": "..."
        }
      ]
    }
    ```

  - **Response Gagal (404 Not Found):**

    ```json
    {
      "message": "Percakapan tidak ditemukan."
    }
    ```

### 4\. Hapus Percakapan

  - **Endpoint:** `DELETE /api/conversations/:id`

  - **Deskripsi:** Menghapus sebuah percakapan beserta semua pesan di dalamnya.

  - **Response Sukses (200 OK):**

    ```json
    {
      "message": "Percakapan berhasil dihapus."
    }
    ```

-----

## 🙏 Penutup

Terima kasih telah meninjau proyek ini\!

Silakan beri ⭐ di GitHub jika Anda merasa proyek ini bermanfaat. Untuk pertanyaan atau kontribusi, jangan ragu untuk membuat *issue* atau *pull request*.