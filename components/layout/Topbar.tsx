'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Settings, CloudSun, Menu, Search } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { Badge } from '@/components/ui/badge';

export function Topbar() {
  const router = useRouter();
  const [time, setTime] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { toggle, toggleCollapse } = useSidebar();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  useEffect(() => {
    const updateTime = () => {
      setTime(new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date()));
    };
    updateTime();
    const timer = setTimeout(() => setIsMounted(true), 0);
    const interval = setInterval(updateTime, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <header className="h-[100px] flex items-center justify-between px-6 pt-4 pb-2 z-40 w-full relative">
      
      {/* Center-Left: Titles */}
      <div className="flex items-center gap-4">
        <button onClick={toggleCollapse} className="hidden md:block text-slate-300 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <button onClick={toggle} className="md:hidden text-slate-300 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">EXECUTIVE SMART COMMAND CENTER</h1>
          <p className="text-[10px] md:text-sm text-slate-300 font-medium tracking-widest mt-1 uppercase">MONITORING & AI PELAYANAN PUBLIK</p>
          <p className="text-xs text-slate-400 mt-2 hidden md:block">Situ Bagendit, Garut</p>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden lg:flex items-center ml-4 w-64 xl:w-80" suppressHydrationWarning>
          <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari modul, layanan, pengaduan..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-sm"
            suppressHydrationWarning
          />
        </form>
      </div>

      {/* Center-Right: Time & Weather */}
      <div className="hidden xl:flex items-center gap-8 ml-auto mr-8">
        <div className="flex flex-col items-end">
          <p className="text-xs text-slate-300">Selasa, 14 Mei 2024</p>
          <div className="text-3xl font-bold text-white font-mono tracking-wider my-1">
            {isMounted ? time : '10:24:56'} <span className="text-sm text-slate-400 font-sans tracking-normal">WIB</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <CloudSun className="w-5 h-5 text-yellow-400" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold">22°C</span>
              <span className="text-[10px] text-slate-400">Cerah Berawan</span>
            </div>
          </div>
        </div>
        
        <div className="h-16 w-px bg-white/10 mx-2"></div>

        {/* AI Status */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping opacity-50"></div>
            <div className="absolute inset-2 rounded-full border border-blue-400/50"></div>
            <div className="relative z-10 font-bold text-xl text-blue-400">AI</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">AI SYSTEM STATUS</span>
              <Badge variant="success" className="text-[9px] px-2 py-0.5">ONLINE</Badge>
            </div>
            <div className="text-xs text-slate-300"><span className="text-slate-500">Model :</span> Llama 3 8B</div>
            <div className="text-xs text-slate-300"><span className="text-slate-500">Knowledge Base</span> <br/><span className="font-bold text-white">12.350</span> Dokumen</div>
          </div>
        </div>
      </div>

      {/* Far Right: User & Actions */}
      <div className="flex items-center gap-4 border-l border-white/10 pl-4 md:pl-6 h-16">
        <div className="hidden md:flex flex-col gap-3 mr-2">
          <button className="relative text-slate-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">12</span>
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border border-white/20">
             <div className="w-full h-full flex items-center justify-center bg-blue-900 text-white font-bold">AP</div>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-bold text-white">Admin PUPR</span>
            <span className="text-xs text-slate-400">Super Admin</span>
          </div>
        </div>
      </div>
      
    </header>
  );
}
