import React from 'react';
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Bot, User, BarChart2, TrendingUp, Users } from 'lucide-react';

export function SocialKPI() {
  const kpis = [
    { title: 'Mention Hari Ini', value: '1,245', icon: MessageSquare, color: 'text-blue-400' },
    { title: 'Komentar Baru', value: '342', icon: MessageSquare, color: 'text-indigo-400' },
    { title: 'Belum Dijawab', value: '28', icon: AlertCircle, color: 'text-red-400' },
    { title: 'Sudah Dijawab', value: '1,189', icon: CheckCircle2, color: 'text-emerald-400' },
    { title: 'AI Reply', value: '984', icon: Bot, color: 'text-purple-400' },
    { title: 'Manual Reply', value: '205', icon: User, color: 'text-orange-400' },
    { title: 'Response Time', value: '2m 15s', icon: Clock, color: 'text-teal-400' },
    { title: 'SLA Achieved', value: '98.5%', icon: BarChart2, color: 'text-green-400' },
    { title: 'Operator Online', value: '12', icon: Users, color: 'text-blue-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4 mb-6">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex flex-col justify-center items-center text-center hover:bg-slate-800/80 transition-colors">
          <kpi.icon className={`w-6 h-6 mb-2 ${kpi.color}`} />
          <span className="text-xl font-bold text-white">{kpi.value}</span>
          <span className="text-xs text-slate-400 mt-1 leading-tight">{kpi.title}</span>
        </div>
      ))}
    </div>
  );
}
