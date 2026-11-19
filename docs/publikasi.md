# Publikasi dan Git Sync

## Siapkan repository

Buat repository GitHub, lalu unggah **isi** folder proyek `artifact-hub` ke root repository. Pastikan `index.html`, `styles.css`, `script.js`, folder `assets`, dan folder `docs` berada di root. Website tidak membutuhkan build atau dependency untuk dijalankan.

## Publikasikan website dengan GitHub Pages

1. Buka **Settings → Pages** pada repository GitHub.
2. Pada **Build and deployment**, pilih **Deploy from a branch**.
3. Pilih branch yang berisi proyek dan folder **/(root)**, lalu simpan.
4. Setelah deployment selesai, buka alamat website yang ditampilkan pada pengaturan Pages.

Ketersediaan GitHub Pages bergantung pada paket dan visibilitas repository GitHub Anda.

## Hubungkan GitBook

1. Di GitBook, buka **Git Sync** dan hubungkan akun GitHub yang memiliki akses ke repository.
2. Pilih repository dan branch yang berisi proyek.
3. Pilih arah sinkronisasi awal dari GitHub ke GitBook apabila repository ini adalah sumber konten yang ingin digunakan. **Periksa pilihan dengan cermat:** arah ini dapat mengganti konten GitBook yang sudah ada.
4. Pada **Content mapping**, petakan space ke direktori `./docs`. Berkas `docs/.gitbook.yaml` menentukan halaman awal dan navigasi melalui `SUMMARY.md`.
5. Mulai sinkronisasi dan periksa halaman di GitBook.

GitBook membaca konten Markdown dan menggunakan tema GitBook. Tampilan HTML, CSS, JavaScript, serta Release Explorer pada GitHub Pages tidak otomatis menjadi tema atau fitur GitBook.

## Menjaga konten tetap selaras

Website dan dokumentasi disimpan dalam repository yang sama, tetapi kontennya terpisah: ubah website di `index.html`, `styles.css`, dan `script.js`; ubah dokumentasi GitBook di `docs`. Saat mengubah penjelasan fitur, perbarui kedua bagian jika diperlukan.
