'use client';

import React from 'react';
import { BarChart3, TrendingUp, PieChart, Map, Users, ShieldCheck } from 'lucide-react';

export function SocialAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      
      {/* Top Topics */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          Top Kategori & Topik
        </h3>
        <div className="space-y-3">
          {[
            { topic: 'PBG (Persetujuan Bangunan Gedung)', percent: 35 },
            { topic: 'Jalan Rusak & Infrastruktur', percent: 25 },
            { topic: 'SLF (Sertifikat Laik Fungsi)', percent: 15 },
            { topic: 'KRK (Keterangan Rencana Kabupaten)', percent: 12 },
            { topic: 'Lainnya', percent: 13 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>{item.topic}</span>
                <span>{item.percent}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${item.percent}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend & Sentiment */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Sentimen Publik
        </h3>
        <div className="flex items-center justify-center h-[120px] gap-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-slate-700 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }}></div>
            <div className="text-xl font-bold text-white">65%</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Positif (65%)
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-3 h-3 rounded-full bg-slate-400"></span> Netral (25%)
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-3 h-3 rounded-full bg-red-400"></span> Negatif (10%)
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4 text-center">Trend positif meningkat 12% dibandingkan bulan lalu.</p>
      </div>

      {/* Heatmap / Demographics */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Map className="w-4 h-4 text-amber-400" />
          Distribusi Wilayah Keluhan
        </h3>
        <div className="space-y-3">
          {[
            { region: 'Kecamatan Tarogong Kidul', count: 145, trend: 'up' },
            { region: 'Kecamatan Garut Kota', count: 98, trend: 'down' },
            { region: 'Kecamatan Tarogong Kaler', count: 76, trend: 'up' },
            { region: 'Kecamatan Karangpawitan', count: 64, trend: 'up' },
            { region: 'Kecamatan Banyuresmi', count: 42, trend: 'down' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span className="text-slate-300">{item.region}</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{item.count}</span>
                {item.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-red-400" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-emerald-400 rotate-180" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
