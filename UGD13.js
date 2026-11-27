class PengirimNotifikasi {
  kirim(tujuan, pesan) {
    throw new Error("Method kirim() wajib diimplementasikan!");
  }
}

class EmailNotifier extends PengirimNotifikasi {
  constructor(nama) {
    super();
    this.nama = nama;
  }

  kirim(tujuan, pesan) {
    console.log(`[EMAIL] ${this.nama} -> ${tujuan}: ${pesan}`);
  }
}

class WhatsAppNotifier extends PengirimNotifikasi {
  constructor(nama) {
    super();
    this.nama = nama;
  }

  kirim(tujuan, pesan) {
    console.log(`[WA] ${this.nama} -> ${tujuan}: ${pesan}`);
  }
}

class PagerRusak extends PengirimNotifikasi {
  constructor(nama) {
    super();
    this.nama = nama;
  }
}

class LayananPesanan {
  constructor(pengirim) {
    LayananPesanan.validasi(pengirim);
    this.pengirim = pengirim;
  }

  static validasi(pengirim) {
    if (!(pengirim instanceof PengirimNotifikasi)) {
      throw new Error("Pengirim harus turunan PengirimNotifikasi!");
    }
  }

  gantiPengirim(pengirimBaru) {
    LayananPesanan.validasi(pengirimBaru);
    this.pengirim = pengirimBaru;
    console.log(`[INFO] Pengirim diganti ke ${pengirimBaru.nama}.`);
  }

  buatPesanan(kodePesanan, tujuan) {
    console.log(`[PESANAN] ${kodePesanan} berhasil dibuat.`);
    this.pengirim.kirim(tujuan, `Pesanan ${kodePesanan} sedang diproses.`);
  }
}

console.log("=== ORDER NOTIFICATION SERVICE ===");

let layanan;

try {
  layanan = new LayananPesanan(new EmailNotifier("Email_3310"));
  layanan.buatPesanan("PSN-01", "budi@mail.com");
} catch (error) {
  console.log("[GAGAL] " + error.message);
}

try {
  layanan.gantiPengirim(new WhatsAppNotifier("WhatsApp_3310"));
  layanan.buatPesanan("PSN-02", "081234567890");
} catch (error) {
  console.log("[GAGAL] " + error.message);
}

try {
  layanan.gantiPengirim(new PagerRusak("Pager_3310"));
  layanan.buatPesanan("PSN-03", "pager-01");
} catch (error) {
  console.log("[GAGAL] " + error.message);
}

try {
  new LayananPesanan({ kirim() {} });
} catch (error) {
  console.log("[GAGAL] " + error.message);
}