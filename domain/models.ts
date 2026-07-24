export interface DashboardMetrics {
  totalPermohonan: number;
  slaKepatuhan: number;
  hariIni: number;
  bulanIni: number;
  tahunIni: number;
  persentasePenyelesaian: number;
  ikm: number;
  totalPengaduan: number;
  aiActivity: number;
}

export interface LayananKinerja {
  id: string;
  nama: string;
  total: number;
  selesai: number;
  proses: number;
  sla: number;
}

export interface ComplaintData {
  kategori: string;
  jumlah: number;
}
