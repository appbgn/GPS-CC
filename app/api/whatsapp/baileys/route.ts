import { NextRequest, NextResponse } from 'next/server';
import { BaileysService } from '@/services/baileysService';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const serverUrl = searchParams.get('serverUrl');

  if (serverUrl) {
    try {
      const res = await fetch(`${serverUrl}/api/status`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ source: 'standalone_server', ...data });
      }
    } catch (e: any) {
      return NextResponse.json(
        { 
          source: 'standalone_error', 
          error: `Gagal terhubung ke Server Standalone Baileys (${serverUrl}): ${e?.message}`,
          fallback: await BaileysService.getConnectionStatus()
        },
        { status: 200 }
      );
    }
  }

  // Fallback to local service state
  const status = await BaileysService.getConnectionStatus();
  return NextResponse.json({ source: 'local_simulation', ...status });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, mode, phoneNumber, serverUrl } = body;

    if (serverUrl) {
      try {
        let targetEndpoint = '/api/connect';
        if (action === 'disconnect') targetEndpoint = '/api/disconnect';
        if (action === 'reconnect') targetEndpoint = '/api/reconnect';

        const res = await fetch(`${serverUrl}${targetEndpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode, phoneNumber }),
        });
        if (res.ok) {
          const remoteRes = await res.json();
          return NextResponse.json({ source: 'standalone_server', ...remoteRes });
        }
      } catch (err: any) {
        console.warn('Standalone server connection warning:', err.message);
      }
    }

    if (action === 'connect') {
      const handshake = await BaileysService.startBaileysHandshake(mode || 'qr', phoneNumber);
      return NextResponse.json({ source: 'local_simulation', ...handshake });
    } else if (action === 'reconnect') {
      const handshake = await BaileysService.startBaileysHandshake('qr');
      return NextResponse.json({ source: 'local_simulation', success: true, ...handshake });
    } else if (action === 'confirm') {
      const auth = await BaileysService.confirmAuthentication();
      return NextResponse.json({ source: 'local_simulation', status: auth });
    } else if (action === 'disconnect') {
      const disc = await BaileysService.disconnectBaileys();
      return NextResponse.json({ source: 'local_simulation', status: disc });
    }

    return NextResponse.json({ error: 'Action tidak dikenal' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
