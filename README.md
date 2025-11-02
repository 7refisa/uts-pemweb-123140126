# Sistem Perpustakaan Digital - UTS Pemrograman Web RA
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f7a0ed7c-f26b-4b5f-809b-3cb371a31a8f" />

- **Nama:** Refi Ikhsanti 
- **NIM:** 123140126
- **Kelas:** RA
- **Link Vercel:** https://uts-pemweb-123140126.vercel.app/

## Deskripsi Proyek
Perpustakaan Digital adalah aplikasi web modern untuk manajemen perpustakaan digital yang dibangun menggunakan React dan Vite. Aplikasi ini menyediakan antarmuka yang intuitif dan responsif untuk mengelola koleksi buku, pencarian, dan reading list pribadi.

## Cara Menjalankan Proyek
### 1. Clone Repository
```bash
git clone https://github.com/7refisa/uts-pemweb-123140126.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

## Fitur Utama

### 1. Form Pencarian Buku
Cari buku dengan mudah menggunakan input **title** atau **author**
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2468d53a-2f9b-443e-8141-08e914870f65" />

### 2. Tabel Hasil Pencarian
Tampilan hasil pencarian dalam bentuk tabel dengan informasi:
- Cover buku
- Title (judul)
- Author (penulis)
- Year (tahun terbit)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/728b4ab1-6c8c-41bf-b3d4-5e7693c5fcc3" />

### 3. Detail Buku
Halaman detail lengkap untuk setiap buku dengan:
- Description (deskripsi buku)
- Subject (kategori/topik)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d475b66c-1a18-481b-80b9-8ca9ed5e706f" />

### 4.  Reading List
Fitur untuk menambah atau menghapus buku ke/dari reading list pribadi dengan penyimpanan menggunakan **localStorage**
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/406b9747-0a2e-41e8-9d46-a5fc9af37752" />

### 5. Filter Berdasarkan Subject/Category
Filter buku berdasarkan judul untuk pencarian yang lebih spesifik
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/78285c76-ab3a-4cbd-9aee-543348995fc2" />

## Prasyarat
Pastikan Anda telah menginstall:
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

## Penyimpanan Data
Aplikasi ini menggunakan **localStorage** untuk menyimpan:
- Reading list pengguna
- Preferensi filter
- History pencarian (opsional)
Data tersimpan secara lokal di browser dan tetap ada meskipun halaman di-refresh.

