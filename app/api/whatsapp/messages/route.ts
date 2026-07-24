import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// In-memory persistent database store for active session
let conversationsStore = [
  {
    id: 'conv-1',
    contactName: 'Ahmad Subagja (Pemohon PBG)',
    contactNumber: '+6281234567890',
    location: 'Tarogong Kaler, Garut',
    lastMessage: 'Assalamualaikum, saya ingin mengurus PBG untuk rumah tinggal. Apa saja persyaratannya ya?',
    timestamp: new Date().toISOString(),
    unreadCount: 1,
    status: 'pending',
    category: 'PBG',
    joinedDate: '14/05/2024 10:10',
    totalChatCount: 2,
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Assalamualaikum, saya ingin mengurus PBG untuk rumah tinggal. Apa saja persyaratannya ya? Terima kasih.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        status: 'read'
      },
      {
        id: 'msg-2',
        sender: 'bot',
        senderName: 'AI Assistant PUPR',
        text: 'Waalaikumsalam Warahmatullahi Wabarakatuh. Terima kasih telah menghubungi Dinas PUPR Kabupaten Garut.\n\nPersyaratan PBG Rumah Tinggal:\n1. KTP Pemohon\n2. Sertifikat / Bukti Kepemilikan Tanah\n3. KRK (Keterangan Rencana Kota)\n4. Gambar Teknis Arsitektur & Struktur\n5. Form Pernyataan Pemilik',
        timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
        status: 'read'
      }
    ],
    notes: ['Pemohon menanyakan persyaratan PBG rumah tinggal tipe 36/72.'],
    tags: ['PBG', 'Rumah Tinggal', 'Garut']
  },
  {
    id: 'conv-2',
    contactName: 'Siti Badriah (SLF Gedung)',
    contactNumber: '+6282198765432',
    location: 'Leles, Garut',
    lastMessage: 'Berapa lama estimasi verifikasi dokumen SLF pabrik kami?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unreadCount: 0,
    status: 'active',
    category: 'SLF',
    joinedDate: '12/05/2024 14:20',
    totalChatCount: 5,
    messages: [
      {
        id: 'msg-101',
        sender: 'user',
        text: 'Berapa lama estimasi verifikasi dokumen SLF pabrik kami?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: 'read'
      }
    ],
    notes: ['Dokumen fisik diserahkan ke loket PUPR Garut tanggal 10 Mei.'],
    tags: ['SLF', 'Pabrik Leles']
  }
];

let botLogsStore = [
  {
    id: 'log-1',
    timestamp: new Date().toISOString(),
    event: 'BAILEYS_SOCKET_READY',
    details: 'Berhasil tersambung ke server Baileys WhatsApp Multi-Device (web.whatsapp.com)',
    level: 'info'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    event: 'MESSAGE_RECEIVED',
    details: 'Pesan masuk dari +6281234567890: "Syarat PBG rumah tinggal"',
    level: 'info'
  }
];

export async function GET() {
  return NextResponse.json({
    conversations: conversationsStore,
    logs: botLogsStore,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, conversationId, text, sender, note, tag } = body;

    if (action === 'send_message') {
      const conv = conversationsStore.find((c) => c.id === conversationId);
      if (!conv) {
        return NextResponse.json({ error: 'Percakapan tidak ditemukan' }, { status: 404 });
      }

      const newMsg = {
        id: `msg-${Date.now()}`,
        sender: sender || 'operator',
        senderName: sender === 'operator' ? 'Admin Operator PUPR' : 'PUPR AI AutoBot',
        text,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      conv.messages.push(newMsg);
      conv.lastMessage = text;
      conv.timestamp = new Date().toISOString();
      conv.totalChatCount = conv.messages.length;

      // Add audit log
      botLogsStore.unshift({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        event: 'MESSAGE_SENT',
        details: `Pesan dikirim ke ${conv.contactNumber} oleh ${newMsg.senderName}: "${text.slice(0, 40)}..."`,
        level: 'info'
      });

      // Try triggering Baileys Standalone endpoint if available
      try {
        await fetch('http://localhost:3001/api/send-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jid: `${conv.contactNumber.replace(/[^0-9]/g, '')}@s.whatsapp.net`, text }),
        });
      } catch {
        // Standalone backend optional
      }

      // If sent by user, optionally trigger real Gemini AI response
      let aiResponseText = null;
      if (sender === 'user') {
        try {
          const apiKey = process.env.GEMINI_API_KEY;
          if (apiKey) {
            const ai = new GoogleGenAI({ apiKey });
            const prompt = `Anda adalah Asisten Virtual Resmi Dinas Pekerjaan Umum dan Penataan Ruang (PUPR) Kabupaten Garut untuk Layanan WhatsApp Center.
Jawablah pertanyaan warga berikut dengan sopan, akurat, dan ringkas dalam Bahasa Indonesia berdasarkan standar pelayanan PBG (Persetujuan Bangunan Gedung) dan SLF (Sertifikat Laik Fungsi) PUPR Garut:

Pertanyaan Warga: "${text}"`;

            const aiRes = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });

            if (aiRes?.text) {
              aiResponseText = aiRes.text;
              const autoBotMsg = {
                id: `msg-ai-${Date.now()}`,
                sender: 'bot' as const,
                senderName: 'AI Assistant PUPR (Gemini 2.5)',
                text: aiResponseText,
                timestamp: new Date().toISOString(),
                status: 'sent' as const
              };
              conv.messages.push(autoBotMsg);
              conv.lastMessage = aiResponseText;

              botLogsStore.unshift({
                id: `log-ai-${Date.now()}`,
                timestamp: new Date().toISOString(),
                event: 'AI_GEMINI_REPLY',
                details: `Jawaban AI Gemini dikirimkan secara otomatis ke ${conv.contactNumber}`,
                level: 'info'
              });
            }
          }
        } catch (aiErr) {
          console.warn('Gemini AI generation warning:', aiErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: newMsg,
        aiReply: aiResponseText,
        updatedConversation: conv
      });
    }

    if (action === 'add_note') {
      const conv = conversationsStore.find((c) => c.id === conversationId);
      if (conv && note) {
        conv.notes = [...(conv.notes || []), note];
        return NextResponse.json({ success: true, notes: conv.notes });
      }
    }

    if (action === 'add_tag') {
      const conv = conversationsStore.find((c) => c.id === conversationId);
      if (conv && tag) {
        conv.tags = Array.from(new Set([...(conv.tags || []), tag]));
        return NextResponse.json({ success: true, tags: conv.tags });
      }
    }

    if (action === 'create_conversation') {
      const newConv = {
        id: `conv-${Date.now()}`,
        contactName: body.contactName || body.contactNumber,
        contactNumber: body.contactNumber,
        location: body.location || 'Garut',
        lastMessage: 'Percakapan baru dibuat oleh Operator PUPR',
        timestamp: new Date().toISOString(),
        unreadCount: 0,
        status: 'active',
        category: body.category || 'Umum',
        joinedDate: new Date().toLocaleString('id-ID'),
        totalChatCount: 0,
        messages: [],
        notes: [],
        tags: ['Baru']
      };
      conversationsStore.unshift(newConv);
      return NextResponse.json({ success: true, conversation: newConv });
    }

    return NextResponse.json({ error: 'Action tidak didukung' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
