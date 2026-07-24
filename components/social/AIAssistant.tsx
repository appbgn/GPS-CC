import React from 'react';
import { Bot, Sparkles, BookOpen, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  category: string;
  sentiment: string;
  confidence: number;
  senderName: string;
}

export function AIAssistant({ message }: { message: Message | null }) {
  if (!message) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl h-[600px] flex items-center justify-center p-4 text-center">
        <p className="text-slate-400">Pilih pesan untuk melihat analisis AI</p>
      </div>
    );
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 70) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl h-[600px] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-700/50 bg-slate-800/80 flex items-center gap-2">
        <Bot className="w-5 h-5 text-purple-400" />
        <h2 className="font-semibold text-white">AI Copilot Analysis</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-5">
        
        {/* Intent Analysis */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Intent Detection
          </h3>
          <div className="bg-slate-900/50 border border-slate-700/50 p-3 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Kategori</span>
              <Badge variant="outline" className="bg-slate-800 border-slate-600">{message.category}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">Sentimen</span>
              <span className="text-sm capitalize text-slate-200">{message.sentiment}</span>
            </div>
            <div className="flex justify-between items-center mt-1 pt-2 border-t border-slate-700/50">
              <span className="text-sm text-slate-300">Confidence Score</span>
              <Badge variant="outline" className={getConfidenceColor(message.confidence)}>
                {message.confidence}% {message.confidence >= 90 ? 'High' : message.confidence >= 70 ? 'Medium' : 'Low'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Suggested Reply */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Bot className="w-3 h-3" /> AI Suggested Reply
          </h3>
          <div className="bg-purple-900/10 border border-purple-500/20 p-3 rounded-lg space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1.5 bg-purple-500/20 rounded-bl-lg">
              <Sparkles className="w-3 h-3 text-purple-400" />
            </div>
            <p className="text-sm text-slate-300">
              Sesuai dengan SOP dan panduan, berikut adalah draf balasan yang disarankan:
            </p>
            <div className="bg-slate-900/80 p-3 rounded border border-slate-700 text-sm text-slate-200 italic relative">
              &quot;
              {message.category === 'PBG' && `Halo ${message.senderName}, untuk mengurus Persetujuan Bangunan Gedung (PBG), Anda dapat mendaftar secara online melalui portal SIMBG (simbg.pu.go.id) atau mengunjungi loket pelayanan kami di Mall Pelayanan Publik (MPP) Kabupaten Garut.`}
              {message.category === 'Jalan' && `Halo ${message.senderName}, terima kasih atas laporannya. Terkait kondisi infrastruktur jalan tersebut, segera kami teruskan ke Bidang Bina Marga Dinas PUPR Kabupaten Garut agar dapat dilakukan pengecekan dan penanganan lebih lanjut.`}
              {message.category === 'SLF' && `Halo ${message.senderName}, terima kasih atas apresiasinya. Kami senantiasa berkomitmen untuk memberikan pelayanan publik yang optimal, termasuk dalam proses penerbitan Sertifikat Laik Fungsi (SLF).`}
              {message.category === 'KRK' && `Halo ${message.senderName}, formulir dan persyaratan Keterangan Rencana Kabupaten (KRK) dapat diakses melalui portal resmi Bidang Tata Ruang PUPR Garut atau Bapak/Ibu dapat datang langsung ke kantor kami.`}
              {message.category === 'Irigasi' && `Terima kasih ${message.senderName}! Kami berharap pembangunan infrastruktur irigasi ini dapat memberikan manfaat yang besar bagi peningkatan produktivitas pertanian di Kabupaten Garut.`}
              {message.category === 'Drainase' && `Halo ${message.senderName}, terima kasih infonya. Kami memohon maaf atas gangguan lalu lintas yang terjadi selama proses perbaikan drainase. Pekerjaan ini kami upayakan selesai sesuai target waktu.`}
              {!['PBG', 'Jalan', 'SLF', 'KRK', 'Irigasi', 'Drainase'].includes(message.category) && `Halo ${message.senderName}, terima kasih telah menghubungi Dinas PUPR Kabupaten Garut. Pesan Anda telah kami terima.`}
              &quot;
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-xs py-1.5 rounded transition-colors flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Gunakan Draft
              </button>
              <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs py-1.5 rounded transition-colors">
                Edit Draft
              </button>
            </div>
          </div>
        </div>

        {/* Knowledge Sources */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> Knowledge Sources
          </h3>
          <div className="bg-slate-900/50 border border-slate-700/50 p-3 rounded-lg space-y-2">
            <div className="flex items-start gap-2 p-2 hover:bg-slate-800 rounded transition-colors cursor-pointer group">
              <BookOpen className="w-4 h-4 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-sm text-slate-200 group-hover:text-blue-400 transition-colors">SOP Pelayanan {message.category}</h4>
                <p className="text-xs text-slate-500">Dokumen PDF • Diperbarui 2 bln lalu</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 hover:bg-slate-800 rounded transition-colors cursor-pointer group">
              <BookOpen className="w-4 h-4 text-amber-400 mt-0.5" />
              <div>
                <h4 className="text-sm text-slate-200 group-hover:text-amber-400 transition-colors">Perbup No. 45 Tahun 2023</h4>
                <p className="text-xs text-slate-500">Regulasi Daerah • {message.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Escalation Recommendation */}
        {message.confidence < 80 && (
          <div className="space-y-2 mt-auto">
            <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-amber-400">Rekomendasi Eskalasi</h4>
                <p className="text-xs text-slate-300 mt-1">Tingkat keyakinan AI rendah. Disarankan untuk meneruskan ke Kepala Bidang {message.category}.</p>
                <button className="mt-2 text-xs text-amber-400 border border-amber-400/50 hover:bg-amber-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1">
                  Eskalasi Sekarang <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
