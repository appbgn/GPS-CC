import { NextResponse } from 'next/server';

export async function GET() {
  const analyticsData = {
    overview: {
      totalChatsToday: 142,
      aiAutoResolved: 108,
      operatorHandled: 34,
      avgResponseTimeSeconds: 14,
      satisfactionRatePercent: 98.4,
      activeConnectionMode: 'Baileys Multi-Device (v6.7.8)',
      systemHealth: 'Optimal',
    },
    categoryBreakdown: [
      { category: 'Persetujuan Bangunan Gedung (PBG)', count: 68, percentage: 47.8 },
      { category: 'Sertifikat Laik Fungsi (SLF)', count: 38, percentage: 26.7 },
      { category: 'Keterangan Rencana Kota (KRK)', count: 22, percentage: 15.5 },
      { category: 'Pengaduan & Informasi Publik', count: 14, percentage: 10.0 },
    ],
    hourlyTraffic: [
      { hour: '08:00', messages: 12 },
      { hour: '09:00', messages: 28 },
      { hour: '10:00', messages: 45 },
      { hour: '11:00', messages: 32 },
      { hour: '12:00', messages: 18 },
      { hour: '13:00', messages: 39 },
      { hour: '14:00', messages: 27 },
      { hour: '15:00', messages: 15 },
    ],
    performanceMetrics: {
      aiConfidenceScoreAvg: 96.2,
      activeOperatorsOnline: 4,
      totalPendingQueue: 2,
    },
    lastUpdated: new Date().toISOString(),
  };

  return NextResponse.json(analyticsData);
}
