# Mengelola artefak

## Menambahkan release

1. Buka repository GitHub yang ingin digunakan sebagai sumber artefak.
2. Buka bagian **Releases**, lalu buat release baru.
3. Tentukan tag, judul, dan catatan release yang menjelaskan perubahan.
4. Lampirkan berkas yang ingin dibagikan, kemudian publikasikan release.
5. Di Artifact Hub, masukkan nama repository dalam format `owner/repository`.

Release Explorer menampilkan hingga 10 release yang dikembalikan oleh GitHub. Hingga lima berkas per release ditampilkan langsung; jika lebih banyak, gunakan tautan release untuk melihat sisanya. Release tanpa berkas tetap ditampilkan.

## Praktik yang disarankan

- Gunakan tag versi yang konsisten dan catatan release yang jelas.
- Periksa isi berkas sebelum mempublikasikannya. Jangan sertakan token, kata sandi, atau data rahasia.
- Repository harus publik agar release dapat dibaca tanpa autentikasi oleh website ini.
- Jika tidak ada hasil, periksa nama repository, status publik, dan apakah release sudah dipublikasikan.
- Permintaan tanpa autentikasi tunduk pada batas API GitHub; coba kembali setelah batas tersebut pulih.
