'use client';

import React, { useEffect, useState } from 'react';
import { Twitter, Instagram, Facebook, RefreshCcw, TrendingUp, ThumbsUp, MessageCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface Mention {
  id: number;
  platform: string;
  author: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  topic: string;
  timestamp: string;
  likes: number;
  retweets: number;
}

interface TrendingTopic {
  name: string;
  count: number;
}

export function SocialListeningFeed() {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [trending, setTrending] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const fetchMentions = async () => {
    try {
      const res = await fetch('/api/social-listening');
      const data = await res.json();
      setMentions(data.mentions);
      setTrending(data.trending);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch social mentions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const init = async () => {
      await fetchMentions();
      interval = setInterval(fetchMentions, 5000);
    };
    init();
    return () => clearInterval(interval);
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4 text-sky-400" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
      default: return <MessageCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Positif</Badge>;
      case 'negative': return <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">Negatif</Badge>;
      default: return <Badge variant="outline" className="bg-slate-500/10 text-slate-400 border-slate-500/20">Netral</Badge>;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 border-b border-slate-700/50 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-white flex items-center gap-2">
              <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-400' : 'text-slate-400'}`} /> 
              Real-time Social Feed
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Mentions PUPR Garut, Jalan, PBG &bull; Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <Badge className="bg-blue-600 text-white hover:bg-blue-500">Live</Badge>
        </div>
        
        {/* Trending Topics */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <TrendingUp className="w-4 h-4 text-blue-400 shrink-0" />
          {trending.map((topic, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 rounded-full px-3 py-1 whitespace-nowrap">
              <span className="text-xs font-medium text-slate-200">{topic.name}</span>
              <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 rounded-full">{topic.count}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 p-2 space-y-3">
        <AnimatePresence>
          {mentions.map((mention) => (
            <motion.div 
              key={mention.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/40 border border-slate-700/50 p-4 rounded-xl hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-800 p-1.5 rounded-full">
                    {getPlatformIcon(mention.platform)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-200">{mention.author}</h3>
                    <div className="text-[10px] text-slate-500">{getTimeAgo(mention.timestamp)}</div>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {mention.topic}
                  </span>
                  {getSentimentBadge(mention.sentiment)}
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                {mention.content}
              </p>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-800/50 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" /> {mention.likes}
                </div>
                <div className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer">
                  <RefreshCcw className="w-3.5 h-3.5" /> {mention.retweets}
                </div>
                {mention.sentiment === 'negative' && (
                   <div className="flex items-center gap-1.5 text-amber-500 ml-auto bg-amber-500/10 px-2 py-1 rounded cursor-pointer hover:bg-amber-500/20 transition-colors">
                     <AlertCircle className="w-3.5 h-3.5" /> Buat Tiket Aduan
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {mentions.length === 0 && !loading && (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            Belum ada mention terbaru
          </div>
        )}
      </div>
    </div>
  );
}
