# Mengenal Artifact Hub

Artifact Hub adalah halaman statis untuk menemukan berkas yang dipublikasikan melalui GitHub Releases. Dokumentasi dalam direktori ini dapat disinkronkan ke GitBook dari repository yang sama.

## Alur kerja

1. Simpan website dan dokumentasi di repository GitHub.
2. Publikasikan artefak sebagai aset pada GitHub Releases.
3. Gunakan GitHub Pages untuk menayangkan website.
4. Hubungkan direktori `docs` ke GitBook melalui Git Sync.

## Menjelajahi release

Di bagian **Release Explorer** pada website, masukkan nama repository publik dalam format `owner/repository`, lalu pilih **Tampilkan**. Website membaca hingga 10 release dari GitHub dan menyediakan tautan ke berkas yang terlampir.

Website tidak meminta atau menyimpan token GitHub. Repository privat tidak dapat dibaca oleh penjelajah ini. GitHub juga membatasi jumlah permintaan tanpa autentikasi.

Lanjutkan ke [Mengelola artefak](artefak.md) atau [Publikasi dan Git Sync](publikasi.md).
