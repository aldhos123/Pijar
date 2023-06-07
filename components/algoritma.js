// Representasikan ruang kelas sebagai objek dengan properti nama dan waktu_peminjaman
class RuangKelas {
    constructor(nama, waktu_peminjaman) {
      this.nama = nama;
      this.waktu_peminjaman = waktu_peminjaman;
    }
  }
  
  // Daftar ruang kelas yang tersedia
  let daftarRuangKelas = [
    new RuangKelas("Ruang 1", "09:00 - 10:00"),
    new RuangKelas("Ruang 2", "10:00 - 11:00"),
    new RuangKelas("Ruang 3", "11:00 - 12:00"),
    // Tambahkan ruang kelas lainnya di sini
  ];
  
  // Fungsi untuk melakukan peminjaman ruang kelas
  function pinjamRuangKelas(nama, waktu) {
    // Periksa apakah ruang kelas tersedia pada waktu yang diminta
    let ruangTersedia = daftarRuangKelas.filter((ruang) => {
      return ruang.waktu_peminjaman === waktu;
    });
  
    if (ruangTersedia.length > 0) {
      // Jika ruang kelas tersedia, lakukan peminjaman
      let ruangDipinjam = ruangTersedia[0];
      console.log(`Ruang kelas ${ruangDipinjam.nama} berhasil dipinjam pada jam ${ruangDipinjam.waktu_peminjaman}.`);
      // Lakukan tindakan lain yang diperlukan, seperti menyimpan peminjaman ke database, dsb.
    } else {
      // Jika ruang kelas tidak tersedia pada waktu yang diminta
      console.log(`Ruang kelas tidak tersedia pada jam ${waktu}. Silakan pilih waktu lain.`);
    }
  }
  
  // Contoh penggunaan
  pinjamRuangKelas("Ruang 2", "10:00 - 11:00"); // Output: Ruang kelas Ruang 2 berhasil dipinjam pada jam 10:00 - 11:00.
  pinjamRuangKelas("Ruang 3", "09:00 - 10:00"); // Output: Ruang kelas tidak tersedia pada jam 09:00 - 10:00. Silakan pilih waktu lain.
  