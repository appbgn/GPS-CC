'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight, MessageSquare, Bot, BarChart3, MapPin, AlertTriangle, Clock, Users, BookOpen, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badgeText?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

const ALL_SEARCH_ITEMS: SearchResultItem[] = [
  {
    id: 'wa-1',
    title: 'WhatsApp Business API & Bot Auto-Response',
    category: 'WhatsApp',
    description: 'Pusat kontrol pesan WhatsApp, integrasi bot otomatis, QR code login, dan eskalasi operator.',
    href: '/whatsapp',
    icon: MessageSquare,
    badgeText: 'Live Feed',
    badgeVariant: 'success',
  },
  {
    id: 'ai-1',
    title: 'AI Customer Service Agent',
    category: 'AI CS',
    description: 'Layanan percakapan cerdas berbasis AI untuk menjawab pertanyaan warga Garut 24/7.',
    href: '/ai-cs',
    icon: Bot,
    badgeText: 'Active',
    badgeVariant: 'info',
  },
  {
    id: 'dash-1',
    title: 'Analisis Smart Executive Dashboard',
    category: 'Analisis',
    description: 'Metrik agregat kepuasan publik, statistik SLA harian, dan ringkasan eksekutif.',
    href: '/analisis',
    icon: BarChart3,
    badgeText: 'Analytics',
    badgeVariant: 'info',
  },
  {
    id: 'gis-1',
    title: 'Peta Geospasial & GIS Pemkab Garut',
    category: 'GIS',
    description: 'Pemetaan titik lokasi pengaduan warga, fasilitas umum, dan infrastruktur wilayah Garut.',
    href: '/gis',
    icon: MapPin,
    badgeText: 'Geospatial',
    badgeVariant: 'warning',
  },
  {
    id: 'pengaduan-1',
    title: 'Pusat Pengaduan & Laporan Warga',
    category: 'Pengaduan',
    description: 'Daftar tiket masuk pengaduan warga terkait perizinan, infrastruktur, dan layanan publik.',
    href: '/pengaduan',
    icon: AlertTriangle,
    badgeText: 'Critical',
    badgeVariant: 'danger',
  },
  {
    id: 'sla-1',
    title: 'Monitoring SLA & Respons Time',
    category: 'SLA',
    description: 'Laporan kepatuhan batas waktu penanganan (SLA) per dinas dan instansi daerah.',
    href: '/sla',
    icon: Clock,
    badgeText: '98.2% SLA',
    badgeVariant: 'success',
  },
  {
    id: 'pegawai-1',
    title: 'Manajemen Petugas & Operator CS',
    category: 'Pegawai',
    description: 'Status kehadiran operator, beban kerja tiket, dan performa penanganan petugas.',
    href: '/pegawai',
    icon: Users,
    badgeText: 'Staffing',
    badgeVariant: 'neutral',
  },
  {
    id: 'kb-1',
    title: 'Knowledge Base & Dokumen Regulasi',
    category: 'Knowledge Base',
    description: 'Basis pengetahuan dokumen SOP, peraturan bupati, dan panduan layanan publik.',
    href: '/kb',
    icon: BookOpen,
    badgeText: '12.350 Docs',
    badgeVariant: 'info',
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams?.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [prevQuery, setPrevQuery] = useState(queryParam);

  if (queryParam !== prevQuery) {
    setPrevQuery(queryParam);
    setSearchTerm(queryParam);
  }

  const categories = ['All', ...Array.from(new Set(ALL_SEARCH_ITEMS.map((item) => item.category)))];

  const filteredResults = ALL_SEARCH_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim()) {
      router.replace(`/search?q=${encodeURIComponent(val.trim())}`, { scroll: false });
    } else {
      router.replace('/search', { scroll: false });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-400" />
          Pencarian Lintas Modul Command Center
        </h1>
        <p className="text-sm text-slate-400">
          Cari modul, layanan publik, tiket pengaduan, atau basis pengetahuan di seluruh sistem GPS-CC.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Ketik kata kunci pencarian (misal: WhatsApp, AI, Pengaduan, GIS)..."
          className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-card"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Results count */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
        <span>
          Menampilkan <strong className="text-white">{filteredResults.length}</strong> hasil
          {searchTerm && <> untuk &quot;<span className="text-blue-400">{searchTerm}</span>&quot;</>}
        </span>
        <span className="text-slate-500">System Index: Ready</span>
      </div>

      {/* Results List */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResults.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group glass-card p-5 rounded-xl border border-white/10 hover:border-blue-500/40 hover:bg-white/5 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.category}</span>
                    </div>
                    {item.badgeText && (
                      <Badge variant={item.badgeVariant || 'info'}>{item.badgeText}</Badge>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center text-xs text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                  Buka Modul <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-xl border border-white/10 space-y-3">
          <Layers className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Hasil Tidak Ditemukan</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Tidak ada modul atau layanan yang cocok dengan pencarian &quot;{searchTerm}&quot;. Coba gunakan kata kunci lain seperti &quot;WhatsApp&quot;, &quot;SLA&quot;, atau &quot;GIS&quot;.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[50vh] text-slate-400 text-sm">
        Memuat hasil pencarian...
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
