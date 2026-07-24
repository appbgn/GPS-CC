import { DashboardMetrics, LayananKinerja, ComplaintData } from '../domain/models';

export class ApiService {
  static async getDashboardMetrics(): Promise<DashboardMetrics> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalPermohonan: 12450,
          slaKepatuhan: 94.5,
          hariIni: 45,
          bulanIni: 1205,
          tahunIni: 12450,
          persentasePenyelesaian: 88.2,
          ikm: 86.4,
          totalPengaduan: 342,
          aiActivity: 5620,
        });
      }, 500);
    });
  }

  static async getLayananKinerja(): Promise<LayananKinerja[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', nama: 'KRK', total: 450, selesai: 400, proses: 50, sla: 95 },
          { id: '2', nama: 'PKKPR', total: 320, selesai: 300, proses: 20, sla: 98 },
          { id: '3', nama: 'Peil Banjir', total: 150, selesai: 120, proses: 30, sla: 85 },
          { id: '4', nama: 'Irigasi', total: 80, selesai: 70, proses: 10, sla: 90 },
          { id: '5', nama: 'RUMIJA', total: 210, selesai: 190, proses: 20, sla: 92 },
          { id: '6', nama: 'Siteplan', total: 340, selesai: 310, proses: 30, sla: 94 },
          { id: '7', nama: 'PBG', total: 1200, selesai: 1000, proses: 200, sla: 82 },
          { id: '8', nama: 'SLF', total: 450, selesai: 380, proses: 70, sla: 86 },
        ]);
      }, 500);
    });
  }

  static async getComplaintData(): Promise<ComplaintData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { kategori: 'Jalan', jumlah: 120 },
          { kategori: 'Drainase', jumlah: 85 },
          { kategori: 'Irigasi', jumlah: 45 },
          { kategori: 'Bangunan Gedung', jumlah: 30 },
          { kategori: 'Tata Ruang', jumlah: 25 },
          { kategori: 'PBG', jumlah: 20 },
          { kategori: 'SLF', jumlah: 17 },
        ]);
      }, 500);
    });
  }
}
