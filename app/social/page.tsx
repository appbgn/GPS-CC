'use client';

import React, { useState } from 'react';
import { SocialKPI } from '@/components/social/SocialKPI';
import { UnifiedInbox } from '@/components/social/UnifiedInbox';
import { ConversationView } from '@/components/social/ConversationView';
import { AIAssistant } from '@/components/social/AIAssistant';
import { SocialAnalytics } from '@/components/social/SocialAnalytics';
import { SocialListeningFeed } from '@/components/social/SocialListeningFeed';

export default function SocialMediaCommandCenter() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Social Media Command Center</h1>
        <p className="text-slate-400">Garut Smart Social Media Command Center (SMCC) - AI Monitoring Pelayanan Publik</p>
      </div>

      <SocialKPI />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <SocialListeningFeed />
        </div>
        <div className="lg:col-span-4">
          <SocialAnalytics />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <UnifiedInbox onSelectMessage={setSelectedMessage} />
        </div>
        <div className="lg:col-span-5">
          <ConversationView message={selectedMessage} />
        </div>
        <div className="lg:col-span-3">
          <AIAssistant message={selectedMessage} />
        </div>
      </div>
    </div>
  );
}
