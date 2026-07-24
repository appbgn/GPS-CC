import React from 'react';
import { cn } from '@/lib/utils';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { THEME_COLORS } from '@/constants/theme';

interface MetricCardProps {
  title: string;
  subtitle: string;
  value: string;
  trend: string;
  sla: string;
  slaTarget: string;
  icon: React.ReactNode;
  color: string;
  data: number[];
}

export function MetricCard({ title, subtitle, value, trend, sla, slaTarget, icon, color, data }: MetricCardProps) {
  const chartData = (data && data.length > 0 ? data : [10, 20, 15, 25, 30]).map((val, i) => ({
    step: `Point ${i + 1}`,
    value: val,
  }));

  const sanitizedId = title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

  const getChartColor = (colorStr: string) => {
    if (colorStr.includes('blue')) return THEME_COLORS.garutBlue || '#3b82f6';
    if (colorStr.includes('green')) return THEME_COLORS.garutGreen || '#22c55e';
    if (colorStr.includes('yellow') || colorStr.includes('orange') || colorStr.includes('gold')) return THEME_COLORS.garutGold || '#f59e0b';
    if (colorStr.includes('red') || colorStr.includes('rose') || colorStr.includes('danger')) return THEME_COLORS.danger || '#ef4444';
    if (colorStr.includes('cyan')) return '#06b6d4';
    if (colorStr.includes('teal')) return '#14b8a6';
    if (colorStr.includes('purple')) return '#a855f7';
    return THEME_COLORS.info || '#039be5';
  };

  const strokeColor = getChartColor(color);

  return (
    <div className="glass-card p-4 flex flex-col justify-between hover:bg-white/5 transition-all group cursor-pointer relative overflow-hidden rounded-xl border border-white/10 shadow-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-start gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-md", color)}>
          {icon}
        </div>
        <div className="flex-col overflow-hidden">
          <h3 className="font-bold text-white text-sm truncate">{title}</h3>
          <p className="text-[10px] text-slate-400 truncate">{subtitle}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-end justify-between">
        <div className="text-3xl font-bold text-white font-mono">{value}</div>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
           <span className="text-[10px]">▲</span> {trend}
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
        <span>SLA {sla}</span>
        <span className="text-white font-bold">{slaTarget}</span>
      </div>
      
      <div className="h-12 mt-3 -mx-2 -mb-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${sanitizedId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900/90 border border-white/10 px-2 py-1 rounded text-[10px] text-white shadow-md font-mono">
                      {payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={strokeColor} 
              fillOpacity={1} 
              fill={`url(#gradient-${sanitizedId})`} 
              strokeWidth={2}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-in-out"
              activeDot={{ r: 4, fill: strokeColor, stroke: '#0d1117', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
