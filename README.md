# Digital Seller Super Tools

Digital Seller Super Tools adalah web app/PWA premium untuk digital seller, affiliator, dan penjual produk digital yang ingin bekerja langsung dari HP. Project ini pure frontend: tanpa React, tanpa Node.js, tanpa backend, tanpa database server, dan tanpa library berat.

## Fungsi Project

- Membantu promosi produk affiliate atau produk digital dengan generator angle, hook, caption, CTA, script video, ide konten, prompt AI, dan balasan DM.
- Mencatat pemasukan manual dari banyak sumber seperti WhatsApp, Lynk ID, QRIS, marketplace, affiliate, APK premium, akses AI premium, dan jasa.
- Menampilkan rekap omzet, modal, profit, target bulanan, produk laris, sumber terbesar, metode pembayaran utama, dan chart sederhana.
- Bisa di-install ke layar utama HP sebagai PWA dan tetap bisa dipakai offline setelah dibuka pertama kali.

## Daftar Halaman

1. `index.html` — landing page utama dan pusat navigasi tools.
2. `tools-affiliate.html` — Tools Affiliate / Tools Jualan.
3. `buku-keuangan.html` — Buku Keuangan Digital / Sales Tracker.

## Cara Pakai Landing Page

1. Buka `index.html` di browser.
2. Gunakan tombol **Masuk Tools Affiliate** untuk membuat bahan promosi.
3. Gunakan tombol **Buka Buku Keuangan** untuk mencatat transaksi.
4. Ringkasan penjualan bulan ini akan tampil otomatis dari data localStorage Buku Keuangan.

## Cara Pakai Tools Affiliate

1. Buka `tools-affiliate.html`.
2. Pilih menu tool: Riset Angle Produk, Hook Generator, Caption Generator, CTA Generator, Script Video Pendek, Ide Konten, Prompt AI, Reply Komentar/DM, atau Kalkulator Komisi.
3. Isi field produk, niche, target audiens, masalah audiens, benefit, platform, tone, dan tujuan konten.
4. Klik **Generate Sekarang**.
5. Hasil otomatis tersimpan di **Riwayat Generate**.
6. Dari riwayat, kamu bisa copy hasil, hapus item, export TXT, atau export JSON.

## Cara Pakai Buku Keuangan

1. Buka `buku-keuangan.html`.
2. Pilih bulan aktif dari dropdown atau chip bulan.
3. Masuk ke tab **Tambah Transaksi** untuk mencatat penjualan.
4. Pantau omzet, modal, profit, produk paling laris, sumber terbesar, metode utama, refund, dan transaksi belum lunas di tab **Dashboard**.
5. Gunakan tab **Transaksi** untuk search, filter, sort, edit, hapus, dan duplikat transaksi.
6. Gunakan tab **Produk** untuk menyimpan produk yang sering dijual agar form transaksi bisa terisi otomatis.
7. Gunakan tab **Rekap** untuk melihat performa semua waktu.

## Cara Tambah Transaksi

1. Masuk tab **Tambah Transaksi**.
2. Isi tanggal, nama produk, kategori, sumber penjualan, jumlah terjual, modal, harga jual, diskon, fee admin, metode pembayaran, status, dan catatan.
3. Keuntungan dihitung otomatis dengan rumus:

   ```text
   Keuntungan = (jumlah terjual x harga jual) - modal - diskon - biaya admin
   ```

4. Klik **Simpan Transaksi**.
5. Jika status transaksi adalah **Refund**, transaksi tetap muncul di riwayat tetapi tidak dihitung ke omzet aktif dan profit aktif.

## Mode Tambah Cepat HP

1. Masuk tab **Tambah Transaksi**.
2. Klik **Mode Tambah Cepat HP**.
3. Isi tanggal, nama produk, harga jual, modal, sumber penjualan, dan metode pembayaran.
4. Klik **Simpan Cepat**.

## Cara Lihat Rekap Bulan

1. Pilih bulan aktif dari dropdown atau chip bulan.
2. Tab **Dashboard** dan **Transaksi** otomatis menyesuaikan bulan tersebut.
3. Klik **Copy Ringkasan Bulan** di tab Transaksi untuk menyalin format rekap bulanan siap kirim.
4. Buka tab **Rekap** untuk melihat total semua waktu, rekap omzet per bulan, rekap profit per bulan, bulan terbaik, produk terlaris, sumber terbesar, dan metode pembayaran paling sering.

## Backup, Export, Import

Buka tab **Pengaturan** di Buku Keuangan.

- **Export Semua Data JSON**: mengunduh transaksi, produk cepat, target bulanan, dan setting dark mode.
- **Import JSON**: memasukkan kembali file backup JSON.
- **Export CSV Bulan Aktif**: mengunduh transaksi dari bulan yang sedang dipilih.
- **Export Semua Transaksi CSV**: mengunduh semua transaksi.

## Cara Reset Data

1. Buka `buku-keuangan.html`.
2. Masuk tab **Pengaturan**.
3. Klik **Reset Semua Data**.
4. Ketik `RESET` saat diminta.
5. Semua transaksi, produk cepat, target bulanan, dan riwayat generate akan dihapus dari browser.

## Deploy ke GitHub Pages

1. Push semua file ke repository GitHub.
2. Masuk ke **Settings → Pages**.
3. Pada bagian **Build and deployment**, pilih source branch yang berisi file ini, misalnya `main`.
4. Pilih folder root `/`.
5. Simpan dan tunggu URL GitHub Pages aktif.

## Deploy ke Netlify

1. Login ke Netlify.
2. Pilih **Add new site → Deploy manually**.
3. Drag-and-drop folder project ini ke Netlify.
4. Karena project ini static frontend, tidak perlu build command.
5. Publish directory cukup root project.

## Cara Install ke Layar Utama HP

1. Buka website dari Chrome Android.
2. Tunggu halaman selesai dibuka minimal satu kali agar service worker mencache file.
3. Ketuk menu browser.
4. Pilih **Install app** atau **Add to Home screen**.
5. Buka dari ikon di layar utama untuk pengalaman seperti aplikasi.

## Catatan Data localStorage

Semua data tersimpan di browser/localStorage perangkat pengguna. Data tidak dikirim ke server mana pun. Jika cache/browser dibersihkan, data bisa hilang. Selalu gunakan fitur export JSON untuk backup berkala.
