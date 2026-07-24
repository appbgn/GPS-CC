'use client';

import React, { useState } from 'react';
import { Bot, X, Minus, Send, Sparkles, MessageSquare } from 'lucide-react';

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Halo, Admin PUPR 👋 Ada yang bisa saya bantu hari ini?' },
  ]);

  const quickPrompts = [
    'Ringkasan Permohonan Hari Ini',
    'Permohonan Terbanyak',
    'Prediksi Permohonan Bulan Depan',
    'Pengaduan Terbanyak',
    'Buat Laporan Mingguan',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: query },
      {
        sender: 'bot',
        text: `Menganalisis data "${query}"... Saat ini sistem mencatat permohonan berjalan stabil dengan kepatuhan SLA 97.2%.`,
      },
    ]);
    if (!textToSend) setInput('');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all border border-blue-400/30 group"
          title="Buka AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
          </div>
          <span className="text-xs font-bold tracking-wide">AI ASSISTANT</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 opacity-80 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-88 bg-[#161B22] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border-b border-blue-500/20 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <span className="text-xs font-bold text-white tracking-wider">AI ASSISTANT</span>
          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30 font-mono">
            READY
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Minimize Assistant"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Tutup Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Area */}
      <div className="p-4 flex flex-col gap-3 max-h-[320px] min-h-[180px] overflow-y-auto scrollbar-thin">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col text-xs ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Quick Suggestion Pills */}
        <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-white/5">
          <span className="text-[10px] text-slate-400 font-medium">Saran Pertanyaan:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-left text-[11px] text-blue-200 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/40 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Footer */}
      <div className="p-3 border-t border-white/5 bg-black/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan apa saja..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 flex items-center justify-center transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
