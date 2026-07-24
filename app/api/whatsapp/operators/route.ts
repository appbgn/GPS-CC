import { NextRequest, NextResponse } from 'next/server';

let operatorsStore = [
  { id: 'op-1', name: 'Admin PUPR (Super Admin)', status: 'online', activeTask: 'Super Admin Operator', email: 'admin.pupr@garutkab.go.id', assignedCount: 4 },
  { id: 'op-2', name: 'Dinda Sekar, S.T.', status: 'busy', activeTask: 'Membalas Chat PBG', email: 'dinda.sekar@garutkab.go.id', assignedCount: 6 },
  { id: 'op-3', name: 'Rizky Maulana', status: 'online', activeTask: 'Verifikasi Dokumen SLF', email: 'rizky.m@garutkab.go.id', assignedCount: 3 },
  { id: 'op-4', name: 'Siti Aisyah', status: 'offline', activeTask: 'Shift Pagi (Offline)', email: 'siti.aisyah@garutkab.go.id', assignedCount: 0 },
  { id: 'op-5', name: 'Agus Setiawan, S.T.', status: 'busy', activeTask: 'Tim Teknis Lapangan', email: 'agus.setiawan@garutkab.go.id', assignedCount: 5 },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    operators: operatorsStore,
    activeOnlineCount: operatorsStore.filter((o) => o.status !== 'offline').length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, operatorId, status, activeTask } = body;

    if (action === 'update_status') {
      const op = operatorsStore.find((o) => o.id === operatorId);
      if (!op) {
        return NextResponse.json({ error: 'Operator tidak ditemukan' }, { status: 404 });
      }

      if (status) op.status = status;
      if (activeTask) op.activeTask = activeTask;

      return NextResponse.json({
        success: true,
        message: 'Status operator berhasil diperbarui',
        operator: op,
      });
    }

    return NextResponse.json({ error: 'Aksi tidak didukung' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
