import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { category, senderName, content, platform } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Sebagai AI Assistant resmi (menggunakan model Gemini) untuk Dinas Pekerjaan Umum dan Penataan Ruang (PUPR) Kabupaten Garut, buatkan draf balasan singkat (maksimal 2 kalimat) untuk pesan masyarakat berikut di platform ${platform}.
    
    Kategori Aduan/Pertanyaan: ${category}
    Nama Pengirim: ${senderName}
    Pesan: ${content}
    
    Gunakan bahasa Indonesia yang sopan, solutif, dan profesional.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}
