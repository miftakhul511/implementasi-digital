# Presentasi Tindak Lanjut Media Pembelajaran Interaktif

Presentasi 9 slide berdasarkan gambar tabel yang diberikan, untuk SMA Kemala Bhayangkari 3 Porong. Seluruh kode menggunakan HTML, CSS, dan JavaScript biasa. Tidak membutuhkan instalasi, build, CDN, atau pustaka eksternal.

## Cara membuka

Ekstrak ZIP, lalu buka `index.html` di Chrome, Edge, Firefox, atau Safari modern. Tampilan dan navigasi dapat dipakai tanpa internet. Internet diperlukan ketika membuka tautan MPI dan Google Drive.

## Memasang dua logo

Masukkan logo PNG Anda ke folder `asset` dengan nama tepat:

- `asset/logosekolah.png`
- `asset/logoramah.png`

Kedua logo muncul di bagian atas presentasi pada semua slide. PNG transparan disarankan. Huruf besar/kecil nama file harus sama persis. Sebelum logo ditambahkan, lingkaran bertuliskan SEKOLAH dan RAMAH muncul sebagai penanda. Logo asli tidak disertakan karena belum diberikan.

## Memasang foto diseminasi

Tambahkan foto PNG ke `asset/fotodiseminasi.png` (nama persis, huruf kecil). Foto akan otomatis muncul pada slide 6, Diseminasi, di bawah keterangan sekolah. Klik foto untuk membuka tampilan yang lebih besar; tekan Esc untuk menutup. Foto ditampilkan utuh tanpa pemotongan. Sebelum foto ditambahkan, area tersebut menampilkan penanda dokumentasi.

## Mengunggah ke GitHub Pages

1. Buat repositori GitHub atau buka repositori tujuan.
2. Ekstrak ZIP. Unggah **isi folder** `presentasi-mpi`, bukan file ZIP-nya. Pastikan `index.html` langsung berada di root repositori.
3. Sertakan `styles.css`, `app.js`, `.nojekyll`, dan seluruh folder `asset`.
4. Tambahkan kedua logo sesuai petunjuk di atas, lalu simpan/commit perubahan.
5. Di repositori, buka **Settings → Pages**. Pilih **Deploy from a branch**, branch **main**, folder **/(root)**, lalu simpan. Jika nama branch Anda berbeda, gunakan branch yang memuat file presentasi.
6. Tunggu proses penerbitan selesai dan buka alamat Pages yang ditampilkan GitHub.

Tampilan dan nama menu GitHub dapat berubah. Paket ini menggunakan tautan aset relatif sehingga juga dapat digunakan pada alamat Pages yang memiliki nama repositori di jalurnya.

## Fitur presentasi

- Navigasi tombol panah, indikator slide yang dapat diklik, dan daftar slide.
- Alur waktu interaktif: klik kegiatan untuk membuka rincian.
- Keyboard: panah kiri/kanan, Page Up/Down, spasi untuk maju, Home/End, F untuk layar penuh.
- Tombol A+ untuk memperbesar teks dan A− untuk kembali ke ukuran normal.
- Gambar sumber dapat diperbesar; tekan Esc untuk menutup dialog.
- Tombol cetak pada slide terakhir menampilkan semua slide untuk dicetak atau disimpan sebagai PDF melalui peramban.
- Responsif untuk laptop, proyektor, tablet, dan ponsel. Pada layar kecil, halaman dapat digulir agar teks tidak terpotong.
- Pengaturan gerakan minimal perangkat dihormati; dialog memakai elemen HTML dialog native.

## Mengubah isi

Edit teks di `index.html`, tampilan di `styles.css`, dan interaksi di `app.js`. Jika jumlah slide diubah, sesuaikan array `names` pada `app.js` dan total slide pada footer HTML. Gambar sumber berada di `asset/materi-kegiatan.png`.

## Catatan materi

- Tanggal dan pihak yang terlibat mengikuti gambar sumber.
- Hasil kegiatan kelima belum dicantumkan pada sumber; presentasi mempertahankan keterangan itu tanpa mengklaim laporan sudah selesai.
- Tindak lanjut diseminasi berupa rencana guru menyusun MPI bersama kelompok belajar, bukan klaim bahwa semua MPI telah selesai.
- Tautan MPI dan RPP disalin dari gambar. Isi situs/dokumen serta izin akses eksternal belum diverifikasi.
- Gambar sumber asli disertakan pada slide terakhir untuk pengecekan.

## Struktur

    index.html
    styles.css
    app.js
    README.md
    .nojekyll
    asset/
      fotodiseminasi.png (tambahkan sendiri)
      materi-kegiatan.png
      PETUNJUK-LOGO.txt
      logosekolah.png   (tambahkan sendiri)
      logoramah.png     (tambahkan sendiri)
